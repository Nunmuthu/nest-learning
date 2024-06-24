import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  @Cron(CronExpression.EVERY_SECOND)
  handleCron() {
    // this.logger.debug('Called when the current second is 45');
    console.log('Called for every second');
  }
}
