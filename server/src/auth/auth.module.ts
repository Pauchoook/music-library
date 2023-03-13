import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from 'src/files/file.module';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    UserModule,
    FileModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [AuthService]
})
export class AuthModule {}
