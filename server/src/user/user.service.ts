import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { JwtService } from '@nestjs/jwt/dist';
import { FileService, FileType } from 'src/files/file.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { ITokenRes, ITokenUser } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private fileService: FileService,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto, avatar: string) {
    const user = await this.userModel.create({
      ...dto,
      avatar,
    });
    return user;
  }

  async getAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find();
      return users;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getOne(id: ObjectId): Promise<User> {
    try {
      const user = await this.userModel.findById(id).populate('myTracks');
      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async search(query: string): Promise<User[]> {
    try {
      const user = await this.userModel.find({
        username: { $regex: new RegExp(query, 'i') },
      });
      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: ObjectId, userDto: UpdateUserDto): Promise<any> {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, userDto).setOptions({new: true});

      return await this.generateToken(user);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async changeAvatar(
    id: ObjectId,
    avatar: Express.Multer.File,
  ): Promise<string> {
    try {
      const user = await this.userModel.findById(id);
      const avatarPath = this.fileService.createFile(FileType.IMAGE, avatar);

      user.avatar = avatarPath;
      await user.save();

      return user.avatar;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    try {
      const user = await this.userModel.findByIdAndDelete(id);
      await this.fileService.removeFile(user.avatar);

      return user.id;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
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

  async getUserId(id: any): Promise<User> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async generateToken(user: ITokenUser): Promise<ITokenRes> {
    const dbUser = await this.getUserId(user._id);

    const payload = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      dateBirth: user.dateBirth,
      gender: user.gender,
      avatar: dbUser.avatar,
    };
    return { token: this.jwtService.sign(payload) };
  }
}
