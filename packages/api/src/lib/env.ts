import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("3000"),
  LOG_LEVEL: z.string().default("info"),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  SECRET_KEY: z.string(),
  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.string().default("6379"),
  DATABASE_URL: z.string(),
});

const env = process.env;

const modifiedEnv = {
  ...env,
  PORT: env.PORT ?? "3000",
  LOG_LEVEL: env.LOG_LEVEL ?? "info",
  NODE_ENV: env.NODE_ENV ?? "development",
  DATABASE_URL: `postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@localhost:5432/${env.POSTGRES_DB}`,
};

export default envSchema.parse(modifiedEnv);
