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
import { Like, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('events')
export class EventsController {
  //   private events: Events[] = [];
  constructor(
    @InjectRepository(Events)
    private readonly repository: Repository<Events>,
  ) {}

  @Get()
  async findAll() {
    return await this.repository.find();
  }

  @Get('/practice')
  async practice() {
    return await this.repository.find({
      select: ['id', 'when'],
      where: [
        {
          id: MoreThan(3),
          when: MoreThan(new Date('2021-02-12T13:00:00')),
        },
        {
          description: Like('%meet%'),
        },
      ],
      take: 2,
      order: {
        id: 'DESC',
      },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    // return this.events.find((e) => e.id === parseInt(id));
    return await this.repository.findOneBy({ id });
  }

  @Post()
  async create(@Body() input: CreateEventDto) {
    // const event: Events = {
    //   ...input,
    //   id: this.events.length + 1,
    //   when: new Date(input.when),
    // };
    // this.events.push(event);
    // return event;
    return await this.repository.save({
      ...input,
      when: new Date(input.when),
    });
  }

  @Patch(':id')
  async update(@Param('id') id, @Body() input: UpdateEventDto) {
    // const index = this.events.findIndex((e) => e.id === parseInt(id));
    // this.events[index] = {
    //   ...this.events[index],
    //   ...input,
    //   when: input.when ? new Date(input.when) : this.events[index].when,
    // };
    // return this.events[index];
    const event = await this.repository.findOne(id);
    return await this.repository.save({
      ...event,
      ...input,
      when: input.when ? new Date(input.when) : event.when,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id) {
    // this.events = this.events.filter((e) => e.id != id);
    const event = await this.repository.findOne(id);
    await this.repository.remove(event);
  }
}
