import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  providers: [MailService],
  imports: [ScheduleModule.forRoot()],
})
export class MailModule {}
