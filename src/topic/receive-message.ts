import { setTimeout } from 'node:timers/promises'
import {
  ProcessErrorArgs,
  ServiceBusReceivedMessage,
} from "@azure/service-bus";

import { env } from "../env";
import { createServiceBusClint } from "../service-bus";

export async function receiveMessage() {
  const { serviceBus } = createServiceBusClint();

  // NOTE Receive messages from the subscription
  const receiver = serviceBus.createReceiver(
    env.TOPIC_NAME,
    env.SUBSCRUPTIOJN_NAME
  );
  console.log("Waiting messages...");

  await receiver.subscribe(
    {
      async processMessage(message: ServiceBusReceivedMessage): Promise<void> {
        console.log(`Received message: ${message.body}`);
        // await receiver.completeMessage(message);
      },
      async processError(args: ProcessErrorArgs): Promise<void> {
        console.error(args);
      },
    },
    { maxConcurrentCalls: 1, autoCompleteMessages: true }
  );

  // NOTE Wait for a while
  await setTimeout(1000);

  await receiver.close();
}
