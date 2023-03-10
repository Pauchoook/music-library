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
import { LikeCommentService } from './likeComment.service';

@Controller('/likeComment')
export class LikeCommentController {
  constructor(private likeService: LikeCommentService) {}

  @Post()
  create(@Body() dto: CreateLikeDto) {
    return this.likeService.create(dto);
  }

  @Get()
  get(
    @Query('user_id') user_id: ObjectId,
    @Query('comment_id') comment_id: ObjectId,
  ) {
    return this.likeService.get(user_id, comment_id);
  }

  @Delete()
  delete(
    @Query('user_id') user_id: ObjectId,
    @Query('comment_id') comment_id: ObjectId,
  ) {
    return this.likeService.delete(user_id, comment_id);
  }
}