import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { SchoolService } from './school.service';
import {
  CreateNFTBody,
  LoginBodyDto,
  CreatePersonBody,
} from './dto/school.dto';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { Readable } from 'stream';

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
  @UseInterceptors(FileInterceptor('file'))
  async createNFT(
    @UploadedFile() file,
    @Body() body: CreateNFTBody,
  ): Promise<Response> {
    try {
      console.log(file);
      console.log(body);
      const newFile = new Readable();
      newFile.push(file.buffer);
      newFile.push(null);

      const res = await this.SchoolService.mintNFT(body, newFile);
      return {
        message: res,
      };
    } catch (error) {
      console.log(error);
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

  @Get('/getStudents/:account')
  async getStudents(@Param() { account }): Promise<Response> {
    console.log(account);
    try {
      const res = await this.SchoolService.getStudents(account);
      return {
        message: typeof res === 'string' ? res : 'Students found!',
        data: typeof res === 'string' ? null : res.data,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('createPerson/:schoolAccount')
  async createPerson(
    @Param() { schoolAccount },
    @Body() body: CreatePersonBody,
  ): Promise<Response> {
    try {
      console.log(body);
      const response = await this.SchoolService.createPerson(
        schoolAccount,
        body,
      );
      return {
        message: response,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  hello(): string {
    return 'Hello World!';
  }
}
