import { Injectable } from '@nestjs/common';
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
      console.log(e);
    }
  }

  async getAll(owner: ObjectId): Promise<Album[]> {
    try {
      let albums;

      if (owner) {
        albums = await this.albumModel.find({ owner }).populate('owner');
      } else {
        albums = await this.albumModel.find().populate('owner');
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
        .populate({ path: 'owner', select: 'username' });
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

  async rename(dto: RenameAlbumDto) {
    try {
      const album = await this.albumModel.findById(dto.id);
      album.name = dto.name;
      album.save();
    } catch (e) {
      console.log(e);
    }
  }

  async listen(id: ObjectId) {
    try {
      const album = await this.albumModel.findById(id);
      album.listens += 1;
      album.save();
    } catch (e) {
      console.log(e);
    }
  }

  async addTrack(trackId: ObjectId) {
    try {
    } catch (e) {
      console.log(e);
    }
  }
}
