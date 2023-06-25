import { GovernmentController } from './gov.controller';
import { GovernmentService } from './gov.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [GovernmentController],
  providers: [GovernmentService],
})
export class GovernmentModule {}
