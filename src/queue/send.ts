import { env } from "../env";
import { createServiceBusClint } from "../service-bus/service-bus";

const messages = [
  { body: "Albert Einstein" },
  { body: "Werner Heisenberg" },
  { body: "Marie Curie" },
  { body: "Steven Hawking" },
  { body: "Isaac Newton" },
  { body: "Niels Bohr" },
  { body: "Michael Faraday" },
  { body: "Galileo Galilei" },
  { body: "Johannes Kepler" },
  { body: "Nikolaus Kopernikus" },
];

export async function queueSender() {
  // create a Service Bus client using the connection string to the Service Bus namespace
  const { queueSender } = createServiceBusClint();

  try {
    // Tries to send all messages in a single batch.
    // Will fail if the messages cannot fit in a batch.
    // await sender.sendMessages(messages);

    // create a batch object
    let batch = await queueSender.createMessageBatch();
    for (const element of messages) {
      // for each message in the array

      // try to add the message to the batch
      if (!batch.tryAddMessage(element)) {
        // if it fails to add the message to the current batch
        // send the current batch as it is full
        await queueSender.sendMessages(batch);

        // then, create a new batch
        batch = await queueSender.createMessageBatch();

        // now, add the message failed to be added to the previous batch to this batch
        if (!batch.tryAddMessage(element)) {
          // if it still can't be added to the batch, the message is probably too big to fit in a batch
          throw new Error("Message too big to fit in a batch");
        }
      }
    }

    // Send the last created batch of messages to the queue
    await queueSender.sendMessages(batch);

    console.log(`Sent a batch of messages to the queue: ${env.QUEUE_NAME}`);

    // Close the sender
    await queueSender.close();
  } catch (error) {
    console.log("Error occurred: ", error);
  }
}
