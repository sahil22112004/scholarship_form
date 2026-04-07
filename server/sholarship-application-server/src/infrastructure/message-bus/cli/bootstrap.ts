import { CommandFactory } from "nest-commander";
import { ConsumerModule } from "../consumer/consumer.module"

async function bootstrap() {
  await CommandFactory.runWithoutClosing(ConsumerModule, ["warn", "error"]);
}

bootstrap();