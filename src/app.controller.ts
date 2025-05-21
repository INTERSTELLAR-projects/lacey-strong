import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('email-trigger')
  emailTrigger(@Body() data: any) {
    console.log(data);
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
