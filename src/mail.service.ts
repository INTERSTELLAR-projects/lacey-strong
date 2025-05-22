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
  constructor(private mailerService:MailerService) {
    // this.transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'lacey@laceystrongcoaching.com',
    //     pass: 'wppe xzhc iqol ynhk', // Use Gmail App Password, not your real password
    //   },
    // });
    // const handlebarOptions = {
    //   viewEngine: {
    //     extname: '.hbs',
    //     partialsDir: join(__dirname, 'mail_templates'),
    //     defaultLayout: false,
    //   },
    //   viewPath: join(__dirname, 'mail_templates'),
    //   extName: '.hbs',
    // };
    // this.transporter.use(
    //   'compile',
    //   nodemailerExpressHandlebars(handlebarOptions),
    // );
  }
  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      to,
      subject,
        template: './no-reply-template',
        context: {
          firstName:"Justin"
      }
    };

    return await this.mailerService.sendMail(mailOptions);
  }
}
