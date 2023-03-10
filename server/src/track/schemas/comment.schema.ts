import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Track } from './track.schema';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop()
  likes: number;

  @Prop()
  body: string;

  @Prop()
  date: string;

  @Prop()
  owner_id: mongoose.Schema.Types.ObjectId;

  @Prop({default: mongoose.now()})
  createdAt: Date;

  @Prop({default: mongoose.now()})
  updatedAt: Date;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Track'})
  track: Track;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);