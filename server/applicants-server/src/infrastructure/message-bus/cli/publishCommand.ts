import { Command, CommandRunner } from "nest-commander";
import { ApplicantPublisher } from "../publisher/applicant.publisher";

@Command({
  name: "dispatch",
  description: "run publisher",
})
export class PublishCommand extends CommandRunner {
  constructor(private publisher: ApplicantPublisher) {
    super();
  }
  async run(): Promise<void> {
    await this.publisher.publishPendingMessages();
  }
}