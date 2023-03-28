import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { Request, Response, NextFunction } from 'express';

interface IRequest extends Request {
  user: Object
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: IRequest, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      next();
    }
  
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.json({message: 'Не авторизован'});
      }

      const decoded = this.jwtService.verify(token);
      req.user = decoded;
      next();
    } catch(e) {
      res.status(401).json({message: e.message});
    }
  }
}
