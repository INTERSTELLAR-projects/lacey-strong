import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  @Cron('* * * * *')
  handleCron() {
    console.log('hello');
  }
  async createUser(user: User) {
    return await this.userModel.create(user);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
