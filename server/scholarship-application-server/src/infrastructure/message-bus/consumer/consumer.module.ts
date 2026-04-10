import { Module } from "@nestjs/common";
import { RabbitMQConnection } from "../rabbitMq.connection";
import { RabbitMQConsumer } from "./applicant.consume"
import { TypeOrmModule } from "@nestjs/typeorm";
import { consumeCommand } from "../cli/consumerCommand";
import { config } from "dotenv";
import { Inbox } from "../../../domain/entities/inbox.entity";
import { ScholarshipApplication } from "../../../domain/entities/scholarship-application.entity";
import { CreateApplicationService } from "../../../feature//application-deatial/create-application/createAppplication.service";
import { SendMailModule } from "../../node-mailer/sendMail.module";
import { PersonalDetail } from "../../../domain/entities/personal-detail.entity";

config()

@Module({
  imports: [
      TypeOrmModule.forFeature([Inbox,ScholarshipApplication]),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Inbox,ScholarshipApplication,PersonalDetail],
      synchronize: false,
    }),
    SendMailModule
  ],
  providers: [RabbitMQConnection, RabbitMQConsumer,consumeCommand,CreateApplicationService],
})
export class ConsumerModule {}