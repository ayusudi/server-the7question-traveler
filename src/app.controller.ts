import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getHello(
    @Body('country') country: string,
    @Body('location') location: string,
    @Body('totalDays') totalDays: number,
    @Body('month') month: string,
    @Body('statusSouvenirs') statusSouvenirs: boolean,
  ) {
    return this.appService.generateTravelInfo(
      country,
      location,
      totalDays,
      month,
      statusSouvenirs,
    );
  }
}
