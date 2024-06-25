import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { EventsController } from './events/events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from './events/event.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'nunmuthu',
      database: 'nest-events',
      entities: [Events],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Events]),
    MailModule,
  ],
  controllers: [AppController, EventsController],
  providers: [AppService],
})
export class AppModule {}
