import { Controller, Get } from '@nestjs/common';
import { StudentService } from './student.service';
import { Param } from '@nestjs/common';

interface GetAllNfts {
  address: string;
}

@Controller()
export class StudentController {
  constructor(private readonly StudentService: StudentService) {}

  @Get("getAllNfts/:address")
  async getAllNfts(@Param() params: GetAllNfts): Promise<string> {
    return this.StudentService.getAllNfts(params);
  }
}
