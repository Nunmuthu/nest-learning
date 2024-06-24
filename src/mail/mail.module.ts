import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
  providers: [MailService],
  imports: [
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      // transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        // ignoreTLS: true,
        secure: false,
        auth: {
          // user: process.env.MAILDEV_INCOMING_USER,
          user: 'louvenia.baumbach@ethereal.email',
          // pass: process.env.MAILDEV_INCOMING_PASS,
          pass: 'XyYM1f4uDSQmqWZnZa',
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
})
export class MailModule {}
