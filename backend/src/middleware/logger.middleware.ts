import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as cookieParser from 'cookie-parser';

declare namespace Express {
  export interface Request {
    token?: string;
    cookies?: any;
  }
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Express.Request, res: Response, next: NextFunction) {
   //  cookieParser()(req, res, (err) => {
   //    if (err) {
   //      throw err;
   //    } else {
   //      req.token = req.cookies.yourCookieName;
   //      next();
   //    }
   //  });
   console.log('Request...');
   next();
  }
}
