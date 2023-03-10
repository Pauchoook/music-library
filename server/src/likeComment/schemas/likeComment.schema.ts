import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Comment } from 'src/track/schemas/comment.schema';

export type LikeCommentDocument = HydratedDocument<LikeComment>;

@Schema()
export class LikeComment {
  @Prop()
  user_id: mongoose.Schema.Types.ObjectId;

  @Prop()
  comment_id: mongoose.Schema.Types.ObjectId;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Comment'})
  comment: Comment;
}

export const LikeCommentSchema = SchemaFactory.createForClass(LikeComment);