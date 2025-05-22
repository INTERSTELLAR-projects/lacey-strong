import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.entity';
import { Cron } from '@nestjs/schedule';
import * as imaps from 'imap-simple';
import { ImapService } from './imap.service';

@Injectable()
export class AppService {
  constructor(private imapService:ImapService,@InjectModel(User.name) private userModel: Model<User>) {}
 // @Cron('* * * * *')
  async handleCron() {
    const users = await this.userModel.find();
    if (!users.length) return;
        var delay = 4 * 24 * 3600 * 1000; // 4 days in milliseconds
        var fourDaysAgo: any = new Date();
        fourDaysAgo.setTime(Date.now() - delay);
        fourDaysAgo = fourDaysAgo.toISOString();

        // Correct: pass 'SINCE' and the date string as two separate array elements
        const searchCriteria = ['ALL', ['SINCE', fourDaysAgo]];
      
    const inboxMessages = await this.imapService.getInboxMessages(searchCriteria);
    console.log(users,inboxMessages)
    users.forEach(async (user) => {
       if(!inboxMessages.includes(user.email)){
         console.log("user didnt reply")
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
