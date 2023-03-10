import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
  @Prop()
  name: string;

  @Prop()
  listens: number;

  @Prop()
  picture: string;

  @Prop()
  audio: string;

  @Prop()
  executor: string;

  @Prop({default: mongoose.now()})
  createdAt: Date;

  @Prop({default: mongoose.now()})
  updatedAt: Date;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]})
  comments: mongoose.Schema.Types.ObjectId[];

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User;
}

export const TrackSchema = SchemaFactory.createForClass(Track);