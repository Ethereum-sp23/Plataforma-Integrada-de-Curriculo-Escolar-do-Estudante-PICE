import { Controller, Get } from '@nestjs/common';
import { GovernmentService } from './gov.service';

@Controller()
export class GovernmentController {
  constructor(private readonly GovernmentService: GovernmentService) {}

  @Get("getNameByAddress")
  getHello(): string {
    return this.GovernmentService.getHello();
  }
}
