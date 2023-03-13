import { Body, Controller, Post, Get, Req } from '@nestjs/common';
import { UploadedFiles, UseInterceptors } from '@nestjs/common/decorators';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/schemas/user.schema';
import { AuthService } from './auth.service';

interface IReq extends Request {
  user: User
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }]))
  registration(
    @UploadedFiles()
    files: { avatar: Express.Multer.File[] | undefined },
    @Body() userDto: CreateUserDto,
  ) {
    const avatar = files ? files.avatar[0] : undefined;
    return this.authService.registration(userDto, avatar);
  }

  @Post('/login')
  login(@Body('email') email: string,@Body('password') password: string) {
    return this.authService.login(email, password);
  }

  @Get('/check')
  check(@Req() req: IReq) {
    const user = req.user;
    return this.authService.check(user);
  }
}
