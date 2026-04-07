import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from 'dotenv'
import { Outbox } from "../../../domain/entities/outbox.entity";
import { ApplicantPublisher } from "./applicant.publisher";
import { RabbitMQConnection } from "../rabbitMq.connection";
import { PublishCommand } from "../cli/publishCommand";

config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Outbox],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Outbox]),
  ],
  providers: [RabbitMQConnection, ApplicantPublisher, PublishCommand],
})
export class ProducerModule {}