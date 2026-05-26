import { and, eq, gt, isNotNull, ne } from "drizzle-orm";
import type { ArbLegStake } from "@/lib/odds/types";
import { isTelegramConfigured, sendArbTelegramAlert } from "@/lib/telegram/notify";
import { getDb } from "./index";
import { arbitrageOpportunities } from "./schema";

function cooldownMinutes(): number {
  const raw = process.env.ARB_NOTIFY_COOLDOWN_MINUTES;
  const n = raw ? Number(raw) : 15;
  return Number.isFinite(n) && n > 0 ? n : 15;
}

/** Sends Telegram for arbs in this batch; skips same event_id within cooldown window. */
export async function notifyArbitrageForBatch(batchId: string): Promise<number> {
  if (!isTelegramConfigured()) return 0;

  const db = getDb();
  const rows = await db
    .select()
    .from(arbitrageOpportunities)
    .where(eq(arbitrageOpportunities.batchId, batchId));

  let sent = 0;
  const cooldown = cooldownMinutes();

  for (const row of rows) {
    if (row.notifiedAt) continue;

    const since = new Date(Date.now() - cooldown * 60 * 1000);
    const [recent] = await db
      .select({ id: arbitrageOpportunities.id })
      .from(arbitrageOpportunities)
      .where(
        and(
          eq(arbitrageOpportunities.eventId, row.eventId),
          isNotNull(arbitrageOpportunities.notifiedAt),
          ne(arbitrageOpportunities.id, row.id),
          gt(arbitrageOpportunities.notifiedAt, since)
        )
      )
      .limit(1);

    const now = new Date();

    if (recent) {
      await db
        .update(arbitrageOpportunities)
        .set({ notifiedAt: now })
        .where(eq(arbitrageOpportunities.id, row.id));
      continue;
    }

    const legs = row.legs as ArbLegStake[];
    await sendArbTelegramAlert({
      matchup: row.matchup,
      sportTitle: row.sportTitle,
      commenceTime: row.commenceTime.toISOString(),
      impliedProbabilitySum: row.impliedProbabilitySum,
      totalStake: row.totalStake,
      guaranteedProfit: row.guaranteedProfit,
      legs,
    });

    await db
      .update(arbitrageOpportunities)
      .set({ notifiedAt: now })
      .where(eq(arbitrageOpportunities.id, row.id));

    sent += 1;
  }

  return sent;
}
