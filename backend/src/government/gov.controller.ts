import { Controller, Get, Param } from '@nestjs/common';
import { GovernmentService } from './gov.service';


interface getNameByAddress {
  address: string;
}
@Controller()
export class GovernmentController {
  constructor(private readonly GovernmentService: GovernmentService) {}

  @Get("getNameByAddress/:address")
  getNameByAddress(@Param() params: getNameByAddress): Promise<String> {
    return this.GovernmentService.getNameByAddress(params);
  }
}
