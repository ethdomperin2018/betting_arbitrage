import { NextResponse } from "next/server";
import { verifyCronAuth } from "@/lib/cron/auth";
import { runOddsPipeline } from "@/lib/odds/runPipeline";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function parseStake(): number {
  const raw = process.env.DEFAULT_TOTAL_STAKE;
  const n = raw ? Number(raw) : 1000;
  return Number.isFinite(n) && n > 0 ? n : 1000;
}

/**
 * Scheduled odds poll: fetch → normalize → persist → Telegram on new arbs.
 * Protect with CRON_SECRET (Bearer token or x-cron-secret header).
 */
export async function GET(request: Request) {
  if (!verifyCronAuth(request)) return unauthorized();

  const apiKey = process.env.THE_ODDS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing THE_ODDS_API_KEY" },
      { status: 503 }
    );
  }

  try {
    const result = await runOddsPipeline({
      apiKey,
      totalStake: parseStake(),
    });

    return NextResponse.json({
      ok: true,
      fetchedAt: result.fetchedAt,
      batchId: result.batchId,
      persisted: result.persisted,
      gameCount: result.games.length,
      arbCount: result.arbitrageOpportunities.length,
      notifiedCount: result.notifiedCount,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}

export async function POST(request: Request) {
  return GET(request);
}
