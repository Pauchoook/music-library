import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { FileService, FileType } from 'src/files/file.service';

export interface ITokenUser {
  _id?: Object,
  email: string,
  firstName?: string,
  lastName?: string,
  username: string,
  dateBirth?: string,
  gender: string,
  avatar: string,
}

export interface ITokenRes {
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private fileService: FileService,
  ) {}

  async registration(dto: CreateUserDto, avatar: Express.Multer.File | undefined): Promise<ITokenRes> {
    const candidateEmail = await this.userService.getUserEmail(dto.email);
    const candidateUsername = await this.userService.getUserUsername(
      dto.username,
    );

    if (candidateEmail) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (candidateUsername) {
      throw new HttpException(
        'Пользователь с таким username уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const avatarPath = avatar
      ? this.fileService.createFile(FileType.IMAGE, avatar)
      : 'image/default.jpg';

    const password = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.createUser({...dto, password}, avatarPath);
    return this.generateToken(user);
  }

  async login(email: string, password: string): Promise<ITokenRes> {
    const user = await this.validateUser(email, password);
    return this.generateToken(user);
  }

  async check(user: ITokenUser): Promise<ITokenRes> {
    const token = this.generateToken(user);
    return token;
  }

  async generateToken(user: ITokenUser): Promise<ITokenRes> {
    const dbUser = await this.userService.getUserId(user._id);

    const payload = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      dateBirth: user.dateBirth,
      gender: user.gender,
      avatar: dbUser.avatar,
    }
    return {token: this.jwtService.sign(payload)}
  }

  private async validateUser(email: string, password: string) {
    const candidateEmail = await this.userService.getUserEmail(email);
    let passwordEquals;

    if (candidateEmail) {
      passwordEquals = await bcrypt.compare(password, candidateEmail.password);
    }

    if (candidateEmail && passwordEquals) {
      return candidateEmail;
    }
    throw new UnauthorizedException({message: 'Неккоректный email или пароль'});
  }
}
