import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export function isDbConfigured(): boolean {
  const url = process.env.DATABASE_URL;
  return typeof url === "string" && url.length > 0;
}

export function getDb() {
  if (!isDbConfigured()) {
    throw new Error(
      "DATABASE_URL is not set. Add your Neon connection string to .env.local"
    );
  }
  const sql = neon(process.env.DATABASE_URL!);
  return drizzle(sql, { schema });
}

export type Db = ReturnType<typeof getDb>;
export { schema };
