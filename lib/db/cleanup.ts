import { lt } from "drizzle-orm";
import { getDb } from "./index";
import { fetchBatches } from "./schema";

export interface CleanupResult {
  retentionDays: number;
  deletedBatches: number;
  cutoff: string;
}

function retentionDays(): number {
  const raw = process.env.RETENTION_DAYS_FETCH_BATCHES;
  const n = raw ? Number(raw) : 14;
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 14;
}

/**
 * Deletes old fetch_batches (cascades to raw_odds, normalized_odds, arbitrage_opportunities).
 * manual_bets are never deleted.
 */
export async function runDataCleanup(): Promise<CleanupResult> {
  const days = retentionDays();
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const db = getDb();

  const deleted = await db
    .delete(fetchBatches)
    .where(lt(fetchBatches.fetchedAt, cutoff))
    .returning({ id: fetchBatches.id });

  return {
    retentionDays: days,
    deletedBatches: deleted.length,
    cutoff: cutoff.toISOString(),
  };
}
