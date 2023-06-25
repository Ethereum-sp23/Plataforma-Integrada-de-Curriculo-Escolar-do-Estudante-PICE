import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
