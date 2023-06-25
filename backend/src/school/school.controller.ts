import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateNFTBody, LoginBodyDto } from './dto/school.dto';

interface Response {
  message: string;
  data?: any;
}

@Controller()
export class SchoolController {
  constructor(private readonly SchoolService: SchoolService) {}

  @Post('/login')
  async login(@Body() body: LoginBodyDto): Promise<Response> {
    try {
      const res = await this.SchoolService.login(body);
      return {
        message: res,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/createNFT')
  async createNFT(@Body() body: CreateNFTBody): Promise<Response> {
    try {
      const res = await this.SchoolService.mintNFT(body);
      return {
        message: res,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/getSchoolNFTsByAddress/:address')
  async getSchoolNFTs({ address }): Promise<Response> {
    try {
      const res = await this.SchoolService.getSchoolNFTs(address);
      return {
        message: res,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/getStudents/:email')
  async getStudents({ email }): Promise<Response> {
    try {
      const res = await this.SchoolService.getStudents(email);
      return {
        message: typeof res === 'string' ? res : 'Students found!',
        data: typeof res === 'string' ? null : res.data,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
