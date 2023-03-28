import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FileService, FileType } from 'src/files/file.service';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { CreateAlbumDto } from './dto/create-album.dto';
import { RenameAlbumDto } from './dto/rename-album.dto';
import { Album, AlbumDocument } from './schemas/album.schema';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateAlbumDto, picture): Promise<Album> {
    try {
      const user = await this.userModel.findById(dto.owner);
      const picturePath = picture
        ? this.fileService.createFile(FileType.IMAGE, picture)
        : 'image/default.jpg';
      const album = await this.albumModel.create({
        ...dto,
        listens: 0,
        likes: 0,
        picture: picturePath,
      });

      user.myAlbums.push(album.id);
      user.save();

      return album;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(
    owner: ObjectId,
    limit: number,
    dateSort: string,
  ): Promise<Album[]> {
    try {
      let albums;
      const sort = dateSort === 'desc' ? -1 : 1;

      if (owner) {
        albums = await this.albumModel
          .find({ owner })
          .limit(limit)
          .populate('tracks')
          .populate({ path: 'owner', select: 'username' })
          .sort({ ' date_field ': -1 });
      } else {
        albums = await this.albumModel
          .find()
          .limit(limit)
          .populate('tracks')
          .populate({ path: 'owner', select: ['username', 'avatar'] })
          .sort({ ' day ': -1 });
      }

      return albums;
    } catch (e) {
      console.log(e);
    }
  }

  async getOne(id: ObjectId): Promise<Album> {
    try {
      const album = await this.albumModel
        .findById(id)
        .populate('tracks')
        .populate('owner');
      return album;
    } catch (e) {
      console.log(e);
    }
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    try {
      const album = await this.albumModel.findByIdAndDelete(id);
      await this.fileService.removeFile(album.picture);
      return album.id;
    } catch (e) {
      console.log(e);
    }
  }

  async rename(dto: RenameAlbumDto): Promise<void> {
    try {
      const album = await this.albumModel.findById(dto.id);
      album.name = dto.name;
      album.save();
    } catch (e) {
      console.log(e);
    }
  }

  async listen(id: ObjectId): Promise<void> {
    try {
      const album = await this.albumModel.findById(id);
      album.listens += 1;
      album.save();
    } catch (e) {
      console.log(e);
    }
  }

  async addTrack(id: ObjectId, trackId: ObjectId): Promise<string> {
    try {
      const album = await this.albumModel.findById(id);

      const findTrack = album.tracks.find((itemId) => itemId === trackId);

      if (!findTrack) {
        album.tracks.push(trackId);
        album.save();
      }

      return "track added";
    } catch (e) {
      console.log(e);
    }
  }

  async removeTrack(id: ObjectId, trackId: ObjectId): Promise<string> {
    try {
      const album = await this.albumModel.findById(id);
      console.log("Какой вид сейчас:", album.tracks[0]);
      console.log("К какому виду нужно привести:", trackId);
      album.tracks = album.tracks.filter((item) => item !== trackId);
      album.save();

      return "track removed";
    } catch (e) {
      console.log(e);
    }
  }
}
