/**
 * Local poller: runs the odds pipeline on an interval.
 * Usage: npm run poll
 * Requires .env.local (THE_ODDS_API_KEY, DATABASE_URL, optional Telegram + CRON not needed here).
 */

import { config } from "dotenv";
import { resolve } from "path";
import { runOddsPipeline } from "../lib/odds/runPipeline";

config({ path: resolve(process.cwd(), ".env.local") });

function intervalSeconds(): number {
  const raw = process.env.POLL_INTERVAL_SECONDS;
  const n = raw ? Number(raw) : 30;
  return Number.isFinite(n) && n >= 5 ? n : 30;
}

function parseStake(): number {
  const raw = process.env.DEFAULT_TOTAL_STAKE;
  const n = raw ? Number(raw) : 1000;
  return Number.isFinite(n) && n > 0 ? n : 1000;
}

async function tick() {
  const apiKey = process.env.THE_ODDS_API_KEY;
  if (!apiKey) {
    console.error("[poll] Missing THE_ODDS_API_KEY in .env.local");
    process.exit(1);
  }

  const started = new Date().toISOString();
  console.log(`[poll] ${started} — running pipeline…`);

  try {
    const result = await runOddsPipeline({
      apiKey,
      totalStake: parseStake(),
    });
    console.log(
      `[poll] done — games=${result.games.length} arbs=${result.arbitrageOpportunities.length} persisted=${result.persisted} notified=${result.notifiedCount} batch=${result.batchId ?? "—"}`
    );
  } catch (e) {
    console.error("[poll] error:", e);
  }
}

const sec = intervalSeconds();
console.log(`[poll] Starting every ${sec}s (Ctrl+C to stop)`);
void tick();
setInterval(() => void tick(), sec * 1000);
