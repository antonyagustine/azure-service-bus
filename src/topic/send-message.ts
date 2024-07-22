import { createServiceBusClint } from '../service-bus/service-bus';


export async function sendMessage() {
  const { sender } = createServiceBusClint();

  // NOTE Send a message to the topic
  await sender.sendMessages({
    body: "Hello, world!",
    applicationProperties: { "my-property": "my-value" },
  });
  console.log("Message sent!");
  sender.close();
}