import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TrackModule } from "./track/track.module";
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from "./files/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path';
import { UserModule } from "./user/user.module";
import { AlbumModule } from "./album/album.module";
import { LikeAlbumModule } from "./likeAlbum/likeAlbum.module";
import { LikeCommentModule } from "./likeComment/likeComment.module";
import { AuthMiddleware } from "./middleware/authMiddleware";
import { AuthModule } from './auth/auth.module';
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET',
      signOptions: { expiresIn: '24h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static')
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/music-app'),
    TrackModule,
    FileModule,
    UserModule,
    AlbumModule,
    LikeAlbumModule,
    LikeCommentModule,
    AuthModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({path: 'auth/check', method: RequestMethod.GET})
  }
}