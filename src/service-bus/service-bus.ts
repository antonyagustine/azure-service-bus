import { env } from "../env";
import {
  ServiceBusClient,
  ServiceBusReceiver,
  ServiceBusSender,
} from "@azure/service-bus";

let serviceBus: ServiceBusClient;
let sender: ServiceBusSender;
let queueSender: ServiceBusSender;
let queueReceiver: ServiceBusReceiver;

export function createServiceBusClint() {
  const topicName = env.TOPIC_NAME;
  const queueName = env.QUEUE_NAME;
  const connectionString = env.CONNECTION_STRING;

  if (!serviceBus) {
    serviceBus = new ServiceBusClient(connectionString);
  }

  if (!sender) {
    sender = serviceBus.createSender(topicName);
  }

  if (!queueSender) {
    queueSender = serviceBus.createSender(queueName);
  }

  if (!queueReceiver) {
    queueReceiver = serviceBus.createReceiver(queueName);
  }

  return { sender, queueSender, queueReceiver, serviceBus };
}
