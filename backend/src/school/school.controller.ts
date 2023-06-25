import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SchoolService } from './school.service';

interface Response {
  message: string;
  data?: any;
}

export interface CreateNFTBody {
  image: File;
  metadata: string;
  studentAddress: string;
  schoolEmail: string;
}

@Controller()
export class SchoolController {
  constructor(private readonly SchoolService: SchoolService) {}

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
}
