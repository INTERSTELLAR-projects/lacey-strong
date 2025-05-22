import { Injectable } from '@nestjs/common';
import { template } from 'handlebars';
import * as nodemailer from 'nodemailer';
import { join } from 'path';
import { create } from 'express-handlebars';
import { nodemailerExpressHandlebars } from 'nodemailer-express-handlebars';
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

    return await this.mailerService.sendMail(mailOptions);
  }
}
