import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Album, AlbumSchema } from "src/album/schemas/album.schema";
import { LikeAlbumController } from "./likeAlbum.controller";
import { LikeAlbumService } from "./likeAlbum.service";
import { LikeAlbum, LikeAlbumSchema } from "./schemas/likeAlbum.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}]),
    MongooseModule.forFeature([{name: LikeAlbum.name, schema: LikeAlbumSchema}])
  ],
  controllers: [LikeAlbumController],
  providers: [LikeAlbumService]
})
export class LikeAlbumModule {}