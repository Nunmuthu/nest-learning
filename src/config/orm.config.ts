import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Events } from './../events/event.entity';

export default registerAs('orm.config', (): TypeOrmModuleOptions => {
  //   console.log({
  //     type: 'postgres',
  //     host: process.env.DB_HOST,
  //     port: Number(process.env.DB_PORT),
  //     username: process.env.DB_USER,
  //     password: process.env.DB_PASSWORD,
  //     database: process.env.DB_NAME,
  //     entities: [Events],
  //     synchronize: true,
  //   });
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Events],
    synchronize: true,
  };
});
