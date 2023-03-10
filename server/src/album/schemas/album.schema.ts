import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type AlbumDocument = HydratedDocument<Album>;

@Schema()
export class Album {
  @Prop()
  name: string;

  @Prop()
  executor: string;

  @Prop()
  listens: number;

  @Prop()
  likes: number;

  @Prop()
  picture: string;

  @Prop({default: mongoose.now()})
  createdAt: Date;

  @Prop({default: mongoose.now()})
  updatedAt: Date;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  owner: mongoose.Schema.Types.ObjectId;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}]})
  tracks: mongoose.Schema.Types.ObjectId[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);