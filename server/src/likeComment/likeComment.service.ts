import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from 'src/track/schemas/comment.schema';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeComment, LikeCommentDocument } from './schemas/likeComment.schema';

@Injectable()
export class LikeCommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(LikeComment.name)
    private likeModel: Model<LikeCommentDocument>,
  ) {}

  async create(dto: CreateLikeDto): Promise<LikeComment | Object> {
    try {
      const comment = await this.commentModel.findById(dto.comment_id);
      const findLike = await this.likeModel.findOne({
        user_id: dto.user_id,
        comment_id: dto.comment_id,
      });

      if (findLike) {
        return 'like exists';
      }
      const like = await this.likeModel.create({
        ...dto,
      });

      comment.likes += 1;
      comment.save();

      return like;
    } catch (e) {
      console.log(e);
    }
  }

  async get(user_id: ObjectId, comment_id: ObjectId): Promise<boolean> {
    try {
      const like = await this.likeModel.findOne({
        user_id,
        comment_id,
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

  async delete(user_id: ObjectId, comment_id: ObjectId): Promise<ObjectId> {
    try {
      const like = await this.likeModel.findOneAndDelete({
        user_id,
        comment_id,
      });
      const comment = await this.commentModel.findById(like.comment_id);

      comment.likes -= 1;
      comment.save();

      return like.id;
    } catch (e) {
      console.log(e);
    }
  }
}
