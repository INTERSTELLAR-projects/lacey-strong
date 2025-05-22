import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { ImapService } from './imap.service';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://bedomohamed307:bedo3077@benova.vakc3.mongodb.net/',
      {
        dbName: 'lacey-strong',
      },
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: 'lacey@laceystrongcoaching.com',
          pass: 'wppe xzhc iqol ynhk',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, 'mail_templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ImapService, MailService],
})
export class AppModule {}
