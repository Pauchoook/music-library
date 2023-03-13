import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FileService, FileType } from 'src/files/file.service';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Track, TrackDocument } from './schemas/track.schema';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    try {
      const user = await this.userModel.findById(dto.owner);
      const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
      const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
      const track = await this.trackModel.create({
        ...dto,
        listens: 0,
        audio: audioPath,
        picture: picturePath,
      });

      user.myTracks.push(track.id);
      user.save();

      return track;
    } catch (e) {
      console.log(e);
    }
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    try {
      const tracks = await this.trackModel
        .find()
        .skip(+offset)
        .limit(+count)
      return tracks;
    } catch (e) {
      console.log(e);
    }
  }

  async search(query: string): Promise<Track[]> {
    try {
      const tracks = await this.trackModel.find({
        name: { $regex: new RegExp(query, 'i') },
      });

      return tracks;
    } catch (e) {
      console.log(e);
    }
  }

  async getOne(id: ObjectId): Promise<Track> {
    try {
      const track = await this.trackModel.findById(id).populate('comments');
      return track;
    } catch (e) {
      console.log(e);
    }
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    try {
      const track = await this.trackModel.findByIdAndDelete(id);
      await this.fileService.removeFile(track.audio);
      await this.fileService.removeFile(track.picture);
      return track.id;
    } catch (e) {
      console.log(e);
    }
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    try {
      const fullDate = new Date();
      const year = fullDate.getFullYear();
      const month =
        fullDate.getMonth() < 9
          ? '0' + fullDate.getMonth()
          : fullDate.getMonth();
      const day = fullDate.getDate();
      const date = `${year}.${month}.${day}`;

      const track = await this.trackModel.findById(dto.track_id);
      const comment = await this.commentModel.create({
        ...dto,
        date,
        likes: 0,
      });

      track.comments.push(comment.id);
      await track.save();

      return comment;
    } catch (e) {
      console.log(e);
    }
  }

  async likeComment(id: ObjectId): Promise<number> {
    try {
      const comment = await this.commentModel.findById(id);

      comment.likes += 1;
      await comment.save();

      return comment.likes;
    } catch (e) {
      console.log(e);
    }
  }

  async listen(id: ObjectId) {
    try {
      const track = await this.trackModel.findById(id);
      track.listens += 1;
      track.save();
    } catch (e) {
      console.log(e);
    }
  }
}
