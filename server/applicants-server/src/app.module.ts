import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { authModule } from './feature/auth.module';
import {config} from "dotenv"
import { Applicant } from './domain/entities/applicant.entity';
import { Outbox } from './domain/entities/outbox.entity';

config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Applicant,Outbox],
      synchronize: false,
    }),
    authModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
