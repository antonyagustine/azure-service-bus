import { EnvType, load } from "ts-dotenv";

export const schema = {
  TOPIC_NAME: String,
  QUEUE_NAME: String,
  CONNECTION_STRING: String,
  SUBSCRUPTIOJN_NAME: String,
};

export type Env = EnvType<typeof schema>;

let env: Env;

export function loadEnv(): void {
  env = load(schema);
}

export { env }
