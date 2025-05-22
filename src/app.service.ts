import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.entity';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    
  }
async  createUser(user:User) {
    return await this.userModel.create(user)
  }
  getHello(): string {
    return 'Hello World!';
  }
}
