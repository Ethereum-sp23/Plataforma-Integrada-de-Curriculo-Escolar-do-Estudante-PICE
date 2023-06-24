import { Injectable } from '@nestjs/common';

@Injectable()
export class GovernmentService {
  getHello(): string {
    return 'Hello World!';
  }
}
