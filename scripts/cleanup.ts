import { config } from "dotenv";
import { resolve } from "path";
import { runDataCleanup } from "../lib/db/cleanup";

config({ path: resolve(process.cwd(), ".env.local") });

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("[cleanup] Missing DATABASE_URL in .env.local");
    process.exit(1);
  }

  const result = await runDataCleanup();
  console.log(
    `[cleanup] retention=${result.retentionDays}d cutoff=${result.cutoff} deleted_batches=${result.deletedBatches}`
  );
}

void main();
