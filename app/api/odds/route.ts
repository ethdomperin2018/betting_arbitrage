import { NextResponse } from "next/server";
import { runOddsPipeline } from "@/lib/odds/runPipeline";

export const dynamic = "force-dynamic";

function parseStake(raw: string | null, fallback: number): number {
  if (raw === null || raw === "") return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return n;
}

export async function GET(request: Request) {
  const apiKey = process.env.THE_ODDS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Missing THE_ODDS_API_KEY. Add it to .env.local (see .env.example).",
      },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const totalStake = parseStake(searchParams.get("totalStake"), 1000);
  /** UI polling: skip DB + Telegram to save credits and avoid alert spam. */
  const light = searchParams.get("light") === "1";

  try {
    const result = await runOddsPipeline({
      apiKey,
      totalStake,
      persist: !light,
      notify: !light,
    });

    return NextResponse.json({
      fetchedAt: result.fetchedAt,
      batchId: result.batchId,
      persisted: result.persisted,
      notifiedCount: result.notifiedCount,
      sports: result.sports,
      market: "moneyline (h2h)",
      requestedTotalStake: totalStake,
      arbitrageOpportunities: result.arbitrageOpportunities,
      games: result.games,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
