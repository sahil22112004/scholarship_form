import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RabbitMQConnection } from "../rabbitMq.connection";
import { Outbox, OutboxStatus } from "../../../domain/entities/outbox.entity";

@Injectable()
export class ApplicantPublisher {

  constructor(
    @InjectRepository(Outbox)
    private outboxRepo: Repository<Outbox>,
    private rabbitConnection: RabbitMQConnection
  ) {}

  async publishPendingMessages() {

    const channel = await this.rabbitConnection.getChannel();

    await channel.assertExchange("applicants_exchange", "direct", {
      durable: true,
    });

    const pendingMessages = await this.outboxRepo.find({
      where: { status: OutboxStatus.PENDING },
    });

    for (const msg of pendingMessages) {
      const payload = {
        messageId: msg.id,
        Payload: msg.Payload,
      };

      channel.publish(
        "applicants_exchange",
        "bindApplicant",
        Buffer.from(JSON.stringify(payload)),
        { persistent: true }
      );

      msg.status = OutboxStatus.PUBLISHED;
      await this.outboxRepo.save(msg);
    }
  }
}