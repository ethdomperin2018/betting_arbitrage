import { NextResponse } from "next/server";
import {
  requireDb,
  updateManualBet,
  type ManualBetResult,
} from "@/lib/db/manualBets";

export const dynamic = "force-dynamic";

const VALID_RESULTS: ManualBetResult[] = [
  "pending",
  "won",
  "lost",
  "push",
  "partial",
];

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    requireDb();
    const { id } = await context.params;
    const body = (await request.json()) as Record<string, unknown>;

    const patch: {
      result?: ManualBetResult;
      notes?: string | null;
      expectedProfit?: number | null;
    } = {};

    if (body.result !== undefined) {
      if (
        typeof body.result !== "string" ||
        !VALID_RESULTS.includes(body.result as ManualBetResult)
      ) {
        return NextResponse.json(
          { error: `result must be one of: ${VALID_RESULTS.join(", ")}` },
          { status: 400 }
        );
      }
      patch.result = body.result as ManualBetResult;
    }

    if (body.notes !== undefined) {
      patch.notes =
        body.notes === null
          ? null
          : typeof body.notes === "string"
            ? body.notes
            : undefined;
      if (patch.notes === undefined) {
        return NextResponse.json({ error: "notes must be string or null" }, { status: 400 });
      }
    }

    if (body.expectedProfit !== undefined) {
      patch.expectedProfit =
        body.expectedProfit === null
          ? null
          : typeof body.expectedProfit === "number"
            ? body.expectedProfit
            : undefined;
      if (patch.expectedProfit === undefined) {
        return NextResponse.json(
          { error: "expectedProfit must be number or null" },
          { status: 400 }
        );
      }
    }

    const bet = await updateManualBet(id, patch);
    if (!bet) {
      return NextResponse.json({ error: "Bet not found" }, { status: 404 });
    }
    return NextResponse.json({ bet });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    const status = message.includes("DATABASE_URL") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
