import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

export const client = createClient({
  url: process.env.REDIS_URL,
  pingInterval: 4 * 60 * 1000,
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

export const connectRedis = async () => {
  if (client.isOpen) {
    return;
  }

  await client.connect();
  await client.ping();

  console.log("Redis connected");
};
