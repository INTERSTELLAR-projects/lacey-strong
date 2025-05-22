import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.entity';
import { Cron } from '@nestjs/schedule';
import { ImapService } from './imap.service';
import * as moment from 'moment';
import { MailService } from './mail.service';
@Injectable()
export class AppService {
  constructor(
    private imapService: ImapService,
    private mailService: MailService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
   @Cron('* * * * *')
  async handleCron() {
    const users = await this.userModel.find();
    if (!users.length) return;

    const oneDayAgo = moment()
      .subtract(1, 'days')
      .format('DD-MMM-YYYY')
      .toUpperCase();
    const searchCriteria = ['ALL', ['SINCE', oneDayAgo]];
    const fourDaysAgo = moment().subtract(0, 'days');

    const inboxMessages =
      await this.imapService.getInboxMessages(searchCriteria);
    console.log(users, inboxMessages);
    users.forEach(async (user) => {
      if (!inboxMessages.includes(user.email)) {
        if (moment(user.createdAt).isBefore(fourDaysAgo)) {
          await this.mailService.sendMail(
            'justin@interstellar-strategies.com',
            'test',
            'test',
            'no-reply-template',
            { firstName: 'no-reply-test' },
          );
          await this.userModel.deleteOne({ email: user.email });
        } else {
          console.log('The date is less than 4 days old');
        }
      }
    });
  }
  async createUser(user: User) {
    return await this.userModel.create(user);
  }

  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
