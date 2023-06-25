import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { GovernmentService } from './gov.service';
import {
  CreatePersonBody,
  CreateSchoolBody,
  GetNameByAddress,
  Response,
} from './dto/government.dto';

@Controller()
export class GovernmentController {
  constructor(private readonly GovernmentService: GovernmentService) {}

  @Get('getNameByAddress/:address')
  getNameByAddress(@Param() params: GetNameByAddress): Promise<string> {
    return this.GovernmentService.getNameByAddress(params);
  }

  @Post('createPerson')
  async createPerson(@Body() body: CreatePersonBody): Promise<Response> {
    try {
      console.log(body);
      const response = await this.GovernmentService.createPerson(body);
      return {
        message: response,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('createSchool')
  async createSchool(@Body() body: CreateSchoolBody): Promise<Response> {
    try {
      const response = await this.GovernmentService.createSchool(body);
      return {
        message: response,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('deleteStudent/:email')
  async deleteStudent(@Param() { email }): Promise<Response> {
    try {
      const response = await this.GovernmentService.deleteStudent(email);
      return {
        message: response,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/all')
  async getAll(): Promise<Response> {
    try {
      const res = await this.GovernmentService.getAll();
      return {
        message: 'All schools get!',
        data: res,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/allSchools')
  async getAllSchools(): Promise<Response> {
    try {
      const res = await this.GovernmentService.getSchools();
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/allStudents')
  async getAllStudents(): Promise<Response> {
    try {
      const res = await this.GovernmentService.getStudents();
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/setStudent/:stundetId/:schoolId')
  async setStudent(
    @Param() { stundetId, schooId },
  ): Promise<string | Response> {
    try {
      const res = await this.GovernmentService.setStudent(stundetId, schooId);
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
