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

interface GetNameByAddress {
  address: string;
}

interface Response {
  message: string;
  data?: any;
}

export interface CreatePersonBody {
  name: string;
  email: string;
  course: string;
}

export interface CreateSchoolBody {
  name: string;
  email: string;
  password: string;
}

interface Response {
  message: string;
  data?: any;
}

export interface CreatePersonBody {
  name: string;
  email: string;
  course: string;
}

export interface CreateSchoolBody {
  name: string;
  email: string;
  password: string;
}
@Controller()
export class GovernmentController {
  constructor(private readonly GovernmentService: GovernmentService) {}

  @Get('getNameByAddress/:address')
  getNameByAddress(@Param() params: GetNameByAddress): Promise<String> {
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
      console.log(body);
      const response = await this.GovernmentService.createSchool(body);
      return {
        message: response,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('test')
  async test(): Promise<string> {
    return 'Hello World!';
  }
}
