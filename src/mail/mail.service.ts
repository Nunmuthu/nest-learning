import { Injectable, Logger } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {
    this.mailexample();
  }

  private readonly logger = new Logger(MailService.name);

  //   @Cron(CronExpression.EVERY_SECOND)
  handleCron() {
    // this.logger.debug('Called when the current second is 45');
    console.log('Called for every second');
  }

  public mailexample(): void {
    console.log(process.env.MAILDEV_INCOMING_USER);
    console.log(process.env.MAILDEV_INCOMING_PASS);
    this.mailerService
      .sendMail({
        from: process.env.MAILDEV_INCOMING_USER,
        to: 'nunmuthu@gmail.com', // list of receivers
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then(() => {
        console.log('sent successfully');
      })
      .catch((error) => {
        console.log('error successfully');
        console.error(error);
      });
  }
}
