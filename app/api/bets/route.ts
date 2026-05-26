import { NextResponse } from "next/server";
import {
  createManualBet,
  listManualBets,
  requireDb,
  type CreateManualBetInput,
  type ManualBetLeg,
} from "@/lib/db/manualBets";

export const dynamic = "force-dynamic";

function isLeg(v: unknown): v is ManualBetLeg {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.bookTitle === "string" &&
    typeof o.teamName === "string" &&
    typeof o.american === "number" &&
    typeof o.stake === "number"
  );
}

function parseCreateBody(body: unknown): CreateManualBetInput | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  if (typeof o.matchup !== "string" || !o.matchup.trim()) return null;
  if (!isLeg(o.legA) || !isLeg(o.legB)) return null;
  return {
    matchup: o.matchup.trim(),
    legA: o.legA,
    legB: o.legB,
    sportKey: typeof o.sportKey === "string" ? o.sportKey : undefined,
    expectedProfit:
      typeof o.expectedProfit === "number" ? o.expectedProfit : undefined,
    betDate: typeof o.betDate === "string" ? o.betDate : undefined,
    notes: typeof o.notes === "string" ? o.notes : undefined,
  };
}

export async function GET(request: Request) {
  try {
    requireDb();
    const { searchParams } = new URL(request.url);
    const limit = Math.min(
      200,
      Math.max(1, Number(searchParams.get("limit") ?? 50) || 50)
    );
    const bets = await listManualBets(limit);
    return NextResponse.json({ bets });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    const status = message.includes("DATABASE_URL") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    requireDb();
    const body = await request.json();
    const input = parseCreateBody(body);
    if (!input) {
      return NextResponse.json(
        { error: "Invalid body: need matchup, legA, legB" },
        { status: 400 }
      );
    }
    const bet = await createManualBet(input);
    return NextResponse.json({ bet }, { status: 201 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    const status = message.includes("DATABASE_URL") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
