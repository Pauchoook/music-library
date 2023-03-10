import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Album, AlbumDocument } from 'src/album/schemas/album.schema';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeAlbum, LikeAlbumDocument } from './schemas/likeAlbum.schema';

@Injectable()
export class LikeAlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(LikeAlbum.name) private likeModel: Model<LikeAlbumDocument>,
  ) {}

  async create(dto: CreateLikeDto): Promise<LikeAlbum | Object> {
    try {
      const album = await this.albumModel.findById(dto.album_id);
      const findLike = await this.likeModel.findOne({
        user_id: dto.user_id,
        album_id: dto.album_id,
      });

      if (findLike) {
        return 'like exists';
      }
      const like = await this.likeModel.create({
        ...dto,
      });

      album.likes += 1;
      album.save();

      return like;
    } catch (e) {
      console.log(e);
    }
  }

  async get(user_id: ObjectId, album_id: ObjectId): Promise<boolean> {
    try {
      const like = await this.likeModel.findOne({
        user_id,
        album_id,
      });

      if (like) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async delete(user_id: ObjectId, album_id: ObjectId): Promise<ObjectId> {
    try {
      const like = await this.likeModel.findOneAndDelete({user_id, album_id});
      const album = await this.albumModel.findById(like.album_id);

      album.likes -= 1;
      album.save();

      return like.id;
    } catch (e) {
      console.log(e);
    }
  }
}