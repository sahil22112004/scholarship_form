import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from "dotenv"
import { LoginModule } from './feature/login/login.module';
import { ScholarshipApplication } from './domain/entities/scholarship-application.entity';
import { PersonalDetailModule } from './feature/application-deatial/application-detail.module';
import { PersonalDetail } from './domain/entities/personal-detail.entity';
import { AddressDetail } from './domain/entities/address-detail.entity';

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
      entities: [ScholarshipApplication,PersonalDetail,AddressDetail],
      synchronize: false,
    }),
    LoginModule,
    PersonalDetailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
