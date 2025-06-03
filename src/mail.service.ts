import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class MailService {
  private transporter;
  constructor(private mailerService: MailerService) {
  }
  async sendMail(
    to: string,
    subject: string,
    text: string,
    template?: string,
    context?: any,
  ) {
    const mailOptions = {
      to,
      subject,
      template: './' + template,
      context: context,
    };

    return await this.mailerService.sendMail({ ...mailOptions,replyTo:"lacey@laceystrongcoaching.com",from: `"Lacey Pruitt" <lacey@laceystrongcoaching.com>`,subject:"Let’s Get Started! Unlock 50% Off Coaching Today"});
  }
}
