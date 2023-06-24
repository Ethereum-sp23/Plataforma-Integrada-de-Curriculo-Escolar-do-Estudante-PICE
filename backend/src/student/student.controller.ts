import { Controller, Get } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller()
export class StudentController {
  constructor(private readonly StudentService: StudentService) {}

  @Get()
  getHello(): Promise<object> {
    return this.StudentService.getHello();
  }
}