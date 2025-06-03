import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from './mail.service';
import { first } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailService,
  ) {}
  @Post('email-trigger')
  emailTrigger(
    @Body('email') email: string,
    @Body('firstName') firstName: string,
  ) {
    console.log(email);
    this.appService.createUser({ email: email, firstName: firstName });
  }
  @Get()
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }
  @Post('send-email')
  async sendEmail() {
    return await this.mailService.sendMail(
      'justin@interstellar-strategies.com',
      'test',
      'test',
      'no-reply-template',
      { firstName: 'justin' },
    );
  }
  @Post('test')
  async test() {
    this.appService.handleCron();
  }
}
