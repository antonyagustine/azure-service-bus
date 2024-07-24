import { delay } from "@azure/service-bus";
import { createServiceBusClint } from "../service-bus/service-bus";

export async function queueReciver() {
  // create a Service Bus client using the connection string to the Service Bus namespace
  const { queueReceiver } = createServiceBusClint();

  // function to handle messages
  const myMessageHandler = async (messageReceived) => {
    console.log(`Received message: ${messageReceived.body}`);
  };

  // function to handle any errors
  const myErrorHandler = async (error) => {
    console.log(error);
  };

  // subscribe and specify the message and error handlers
  queueReceiver.subscribe({
    processMessage: myMessageHandler,
    processError: myErrorHandler,
  });

  // Waiting long enough before closing the sender to send messages
  await delay(20000);

  await queueReceiver.close();
}
