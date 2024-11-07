import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InputBody } from './dto/input-body.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from './dto/response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'The travel info generated successfully.',
    type: Response,
  })
  getHello(@Body() inputBody: InputBody) {
    return this.appService.generateTravelInfo(inputBody);
  }
}
