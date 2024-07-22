import { loadEnv } from "./env";
import { sendMessage, receiveMessage } from "./topic";
import { createServiceBusClint } from './service-bus/service-bus';

async function bootstrap() {
  // NOTE load env before using it
  loadEnv();

  // NOTE Send a message to the topic
  await sendMessage();

  // NOTE Subscribe to the topic
  await receiveMessage();

  console.log("Process completed!");
  const { serviceBus } = createServiceBusClint();
  await serviceBus.close();
  process.exit(0);
}

bootstrap();