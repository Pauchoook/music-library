import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Album } from 'src/album/schemas/album.schema';

export type LikeAlbumDocument = HydratedDocument<LikeAlbum>;

@Schema()
export class LikeAlbum {
  @Prop()
  user_id: mongoose.Schema.Types.ObjectId;

  @Prop()
  album_id: mongoose.Schema.Types.ObjectId;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Album'})
  album: Album;
}

export const LikeAlbumSchema = SchemaFactory.createForClass(LikeAlbum);