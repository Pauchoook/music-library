import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { FileService } from "src/files/file.service";
import { User, UserSchema } from "./schemas/user.schema";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, FileService],
  exports: [UserService]
})
export class UserModule {}