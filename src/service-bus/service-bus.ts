import { env } from "../env";
import { ServiceBusClient, ServiceBusSender } from "@azure/service-bus";

let serviceBus: ServiceBusClient;
let sender: ServiceBusSender;

export function createServiceBusClint() {
  const topicName = env.TOPIC_NAME;
  const connectionString = env.CONNECTION_STRING;

  if (!serviceBus) {
    serviceBus = new ServiceBusClient(connectionString);
  }

  if (!sender) {
    sender = serviceBus.createSender(topicName);
  }

  return { sender, serviceBus };
}
