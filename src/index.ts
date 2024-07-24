import { loadEnv } from "./env";
import { queueReciver, queueSender } from './queue'
import { sendMessage, receiveMessage } from "./topic";
import { createServiceBusClint } from './service-bus/service-bus';

async function bootstrap() {
  // NOTE load env before using it
  loadEnv();

  const args = process.argv.slice(2);

  if (args.includes("topic")) {
    // NOTE Send a message to the topic
    await sendMessage().catch((err) => {
      console.log("Error occurred: ", err);
    });

    // NOTE Subscribe to the topic
    await receiveMessage().catch((err) => {
      console.log("Error occurred: ", err);
    });
  }

  if (args.includes("queue")) {
    await queueSender().catch((err) => {
      console.log("Error occurred: ", err);
    });

    await queueReciver().catch((err) => {
      console.log("Error occurred: ", err);
    });
  }
    console.log("Process completed!");
    const { serviceBus } = createServiceBusClint();
    await serviceBus.close();
    process.exit(0);
}

bootstrap();