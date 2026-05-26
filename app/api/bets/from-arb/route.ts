import { NextResponse } from "next/server";
import { logBetFromArb } from "@/lib/db/logBetFromArb";
import { requireDb } from "@/lib/db/manualBets";
import type { ArbitrageOpportunity } from "@/lib/odds/types";

export const dynamic = "force-dynamic";

function isOpportunity(v: unknown): v is ArbitrageOpportunity {
  if (!v || typeof v !== "object") return false;
  const o = v as ArbitrageOpportunity;
  return (
    typeof o.matchup === "string" &&
    Array.isArray(o.legs) &&
    o.legs.length === 2 &&
    typeof o.guaranteedProfit === "number"
  );
}

export async function POST(request: Request) {
  try {
    requireDb();
    const body = await request.json();
    if (!isOpportunity(body)) {
      return NextResponse.json({ error: "Invalid arb payload" }, { status: 400 });
    }
    const bet = await logBetFromArb(body);
    return NextResponse.json({ bet }, { status: 201 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    const status = message.includes("DATABASE_URL") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
