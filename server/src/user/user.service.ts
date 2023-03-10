import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FileService } from 'src/files/file.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private fileService: FileService,
  ) {}

  async createUser(dto: CreateUserDto, avatar: string) {
    const user = await this.userModel.create({
      ...dto, avatar
    });
    return user;
  }

  async getAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find();
      return users;
    } catch (e) {
      console.log(e);
    }
  }

  async getOne(id: ObjectId): Promise<User> {
    try {
      const user = await this.userModel.findById(id).populate('myTracks');
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  async search(query: string): Promise<User[]> {
    try {
      const user = await this.userModel.find({
        username: { $regex: new RegExp(query, 'i') },
      });
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    try {
      const user = await this.userModel.findByIdAndDelete(id);
      await this.fileService.removeFile(user.avatar);

      return user.id;
    } catch (e) {
      console.log(e);
    }
  }

  async getUserEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async getUserUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    return user;
  }
}
