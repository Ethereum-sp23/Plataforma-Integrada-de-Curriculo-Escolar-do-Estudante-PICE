import { Injectable } from '@nestjs/common';

@Injectable()
export class SchoolService {
  getHello(): string {
    return 'Hello World!';
  }
}
