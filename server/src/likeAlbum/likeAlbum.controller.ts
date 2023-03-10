import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeAlbumService } from './likeAlbum.service';

@Controller('/likeAlbum')
export class LikeAlbumController {
  constructor(private likeService: LikeAlbumService) {}

  @Post()
  create(@Body() dto: CreateLikeDto) {
    return this.likeService.create(dto);
  }

  @Get()
  get(
    @Query('user_id') user_id: ObjectId,
    @Query('album_id') album_id: ObjectId,
  ) {
    return this.likeService.get(user_id, album_id);
  }

  @Delete()
  delete(
    @Query('user_id') user_id: ObjectId,
    @Query('album_id') album_id: ObjectId,
  ) {
    return this.likeService.delete(user_id, album_id);
  }
}
