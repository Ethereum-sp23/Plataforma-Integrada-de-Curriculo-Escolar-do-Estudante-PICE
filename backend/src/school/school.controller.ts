import { Controller, Get } from '@nestjs/common';
import { SchoolService } from './school.service';

@Controller()
export class SchoolController {
  constructor(private readonly SchoolService: SchoolService) {}

  @Get()
  getHello(): string {
    return this.SchoolService.getHello();
  }
}
