import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RabbitMQConnection } from "../rabbitMq.connection";
import { CreateApplicationService } from "../../../feature/application-deatial/create-application/createAppplication.service";
import { Inbox } from "../../../domain/entities/inbox.entity";

@Injectable()
export class RabbitMQConsumer implements OnModuleInit {
    constructor(
        private rabbitConnection: RabbitMQConnection,
        @InjectRepository(Inbox) private inboxRepository: Repository<Inbox>,
        private CreateApplicationService: CreateApplicationService

    ) { }

    async onModuleInit() {
        const channel = await this.rabbitConnection.getChannel();

        await channel.assertExchange("applicants_exchange", "direct", {
            durable: true,
        });

        await channel.assertQueue("applicants_queue", {
            durable: true,
        });

        await channel.bindQueue(
            "applicants_queue",
            "applicants_exchange",
            "bindApplicant"
        );

        channel.consume(
            "applicants_queue",
            async (msg: any) => {
                if (!msg) return;
                try {
                    const content = msg.content.toString();
                    const data = JSON.parse(content);
                    console.log("data is", data)

                    const existing = await this.inboxRepository.findOne({
                        where: { eventId: data.messageId },
                    });

                    console.log("existing is ",existing)

                    if (!existing) {
                        const inboxEntry = this.inboxRepository.create({
                            eventId: data.messageId,
                            handler: "application.create",
                        });
                        await this.inboxRepository.save(inboxEntry)

                        const res = await this.CreateApplicationService.CreateApplication(data.Payload)


                    } else {
                        console.log("skip dublicate")
                    }

                    channel.ack(msg);

                } catch (error) {
                    console.error("Error processing message:", error);
                    channel.nack(msg, false, true);

                }

            },
            { noAck: false }
        )


    }
}