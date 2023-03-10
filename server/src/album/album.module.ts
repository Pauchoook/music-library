import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FileService } from "src/files/file.service";
import { User, UserSchema } from "src/user/schemas/user.schema";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { Album, AlbumSchema } from "./schemas/album.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}]),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
  ],
  controllers: [AlbumController],
  providers: [AlbumService, FileService]
})
export class AlbumModule {}