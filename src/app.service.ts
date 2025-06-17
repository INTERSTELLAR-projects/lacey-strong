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
  @Cron('0 12 * * *')
  async handleCron() {
    const users = await this.userModel.find();
    if (!users.length) return;

    const oneDayAgo = moment()
      .subtract(1, 'days')
      .format('DD-MMM-YYYY')
      .toUpperCase();
    const searchCriteria = ['ALL', ['SINCE', oneDayAgo]];
    const fourDaysAgo = moment().subtract(7, 'days');

    const inboxMessages =
      await this.imapService.getInboxMessages(searchCriteria);
    console.log(users, inboxMessages);
    users.forEach(async (user) => {
      if (!inboxMessages.includes(user.email)) {
        if (moment(user.createdAt).isBefore(fourDaysAgo)) {
          console.log('SENT EMAIL AND REMOVE');
          await this.mailService.sendMail(
            user.email,
            'test',
            'test',
            'no-reply-template',
            { firstName: user.firstName },
          );
          await this.userModel.deleteOne({ email: user.email });
        } else {
          console.log('DOSENT SENT ,The date is less than 4 days old');
        }
      } else {
        console.log('USER ACTUALLY REPLIED');
        await this.userModel.deleteOne({ email: user.email });
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
