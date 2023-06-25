import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
