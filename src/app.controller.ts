import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('email-trigger')
  emailTrigger(@Body("email") email: any) {
    console.log(email);
    this.appService.createUser(email);
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
