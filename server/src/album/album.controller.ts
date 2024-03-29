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
  getAll(
    @Query('owner_id') owner_id: ObjectId,
    @Query('limit') limit: number,
    @Query('dateSort') dateSort: string,
  ) {
    return this.albumService.getAll(owner_id, limit, dateSort);
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.albumService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
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

  @Post('/addTrack')
  addTrack(@Body('id') id: ObjectId, @Body('trackId') trackId: ObjectId) {
    return this.albumService.addTrack(id, trackId);
  }

  @Post('/removeTrack')
  removerack(@Body('id') id: ObjectId, @Body('trackId') trackId: ObjectId) {
    return this.albumService.removeTrack(id, trackId);
  }
}
