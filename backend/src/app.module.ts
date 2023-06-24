import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { SchoolModule } from './school/school.module';
import { GovernmentModule } from './government/gov.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    GovernmentModule,
    SchoolModule,
    StudentModule,
    RouterModule.register([
      {
        path: 'student',
        module: StudentModule,
      },
      {
        path: 'government',
        module: GovernmentModule,
      },
      {
        path: 'school',
        module: SchoolModule,
      },
    ]),
  ],
})
export class AppModule {}