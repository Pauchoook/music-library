import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Query,
  Body,
} from '@nestjs/common';
import { Put, UploadedFiles, UseInterceptors } from '@nestjs/common/decorators';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.userService.search(query);
  }

  @Put('/avatar')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }]))
  changeAvatar(
    @UploadedFiles() files: { avatar: Express.Multer.File[] },
    @Body('id') id: ObjectId,
  ) {
    const { avatar } = files;
    return this.userService.changeAvatar(id, avatar[0]);
  }

  @Put(':id')
  update(@Param('id') id: ObjectId, @Body() updateUser: UpdateUserDto) {
    return this.userService.update(id, updateUser);
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.userService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.userService.delete(id);
  }
}
