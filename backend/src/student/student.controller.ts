import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { StudentService } from './student.service';
import { Param } from '@nestjs/common';
import { GetAllNfts, Response } from './dto/student.dto';

@Controller()
export class StudentController {
  constructor(private readonly StudentService: StudentService) {}

  @Get('getAllNfts/:address')
  async getAllNfts(@Param() params: GetAllNfts): Promise<string> {
    return this.StudentService.getAllNfts(params);
  }

  @Get('getStudentByName/:name')
  async getStudent(@Param() { name }): Promise<Response> {
    try {
      const res = await this.StudentService.getStudentByName(name);
      return {
        message: typeof res === 'string' ? res : 'Students get with success',
        data: typeof res === 'string' ? null : res.data,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
