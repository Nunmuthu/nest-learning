import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEventDto } from './create-event-dto';
import { UpdateEventDto } from './update-event-dto';
import { Events } from './event.entity';

@Controller('events')
export class EventsController {
  private events: Events[] = [];

  @Get()
  findAll() {
    return this.events;
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.events.find((e) => e.id === parseInt(id));
  }

  @Post()
  create(@Body() input: CreateEventDto) {
    const event: Events = {
      ...input,
      id: this.events.length + 1,
      when: new Date(input.when),
    };
    this.events.push(event);
    return event;
  }

  @Patch(':id')
  update(@Param('id') id, @Body() input: UpdateEventDto) {
    const index = this.events.findIndex((e) => e.id === parseInt(id));
    this.events[index] = {
      ...this.events[index],
      ...input,
      when: input.when ? new Date(input.when) : this.events[index].when,
    };
    return this.events[index];
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id) {
    this.events = this.events.filter((e) => e.id != id);
    // return ;
  }
}
