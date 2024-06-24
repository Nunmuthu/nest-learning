import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { EventsController } from './events/events.controller';

@Module({
  imports: [MailModule],
  controllers: [AppController, EventsController],
  providers: [AppService],
})
export class AppModule {}
