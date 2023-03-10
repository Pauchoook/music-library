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
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { RenameAlbumDto } from './dto/rename-album.dto';

@Controller('/album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  create(
    @UploadedFiles()
    files: { picture: Express.Multer.File[] },
    @Body() dto: CreateAlbumDto,
  ) {
    const picture = files.picture ? files.picture[0] : undefined;
    return this.albumService.create(dto, picture);
  }

  @Get()
  getAll(@Query('owner_id') owner: ObjectId) {
    return this.albumService.getAll(owner);
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.albumService.getOne(id);
  }

  @Delete(':id') 
  delete(@Param('id') id: ObjectId) {
    console.log('ff')
    return this.albumService.delete(id);
  }

  @Put() 
  rename(@Body() dto: RenameAlbumDto) {
    return this.albumService.rename(dto);
  }

  @Put('/listen/:id') 
  listen(@Param('id') id: ObjectId) {
    return this.albumService.listen(id);
  }
}