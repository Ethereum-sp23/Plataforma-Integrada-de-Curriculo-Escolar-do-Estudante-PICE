import { Controller, Get, Param } from '@nestjs/common';
import { GovernmentService } from './gov.service';


interface GetNameByAddress {
  address: string;
}
@Controller()
export class GovernmentController {
  constructor(private readonly GovernmentService: GovernmentService) {}

  @Get("getNameByAddress/:address")
  getNameByAddress(@Param() params: GetNameByAddress): Promise<String> {
    return this.GovernmentService.getNameByAddress(params);
  }
}
