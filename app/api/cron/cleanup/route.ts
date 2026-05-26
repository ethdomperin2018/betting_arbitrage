import { NextResponse } from "next/server";
import { verifyCronAuth } from "@/lib/cron/auth";
import { runDataCleanup } from "@/lib/db/cleanup";
import { isDbConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * Daily maintenance: delete fetch_batches older than RETENTION_DAYS_FETCH_BATCHES.
 * Cascades raw_odds, normalized_odds, arbitrage_opportunities. Keeps manual_bets.
 */
export async function GET(request: Request) {
  if (!verifyCronAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: "DATABASE_URL is not configured" },
      { status: 503 }
    );
  }

  try {
    const result = await runDataCleanup();
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return GET(request);
}
