import { desc, eq } from "drizzle-orm";
import { getDb, isDbConfigured } from "./index";
import { manualBets } from "./schema";

export type ManualBetResult =
  | "pending"
  | "won"
  | "lost"
  | "push"
  | "partial";

export interface ManualBetLeg {
  bookKey?: string;
  bookTitle: string;
  teamName: string;
  american: number;
  stake: number;
}

export interface CreateManualBetInput {
  matchup: string;
  legA: ManualBetLeg;
  legB: ManualBetLeg;
  sportKey?: string;
  expectedProfit?: number;
  betDate?: string;
  notes?: string;
}

export interface ManualBetRow {
  id: string;
  betDate: string;
  matchup: string;
  sportKey: string | null;
  legA: ManualBetLeg;
  legB: ManualBetLeg;
  expectedProfit: number | null;
  result: ManualBetResult;
  notes: string | null;
  createdAt: string;
}

function rowToDto(row: typeof manualBets.$inferSelect): ManualBetRow {
  return {
    id: row.id,
    betDate: row.betDate.toISOString(),
    matchup: row.matchup,
    sportKey: row.sportKey,
    legA: row.legA as ManualBetLeg,
    legB: row.legB as ManualBetLeg,
    expectedProfit: row.expectedProfit,
    result: row.result as ManualBetResult,
    notes: row.notes,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function listManualBets(limit = 50): Promise<ManualBetRow[]> {
  const db = getDb();
  const rows = await db
    .select()
    .from(manualBets)
    .orderBy(desc(manualBets.betDate))
    .limit(Math.min(limit, 200));
  return rows.map(rowToDto);
}

export async function createManualBet(
  input: CreateManualBetInput
): Promise<ManualBetRow> {
  const db = getDb();
  const betDate = input.betDate ? new Date(input.betDate) : new Date();
  const [row] = await db
    .insert(manualBets)
    .values({
      betDate,
      matchup: input.matchup,
      sportKey: input.sportKey ?? null,
      legA: input.legA,
      legB: input.legB,
      expectedProfit: input.expectedProfit ?? null,
      notes: input.notes ?? null,
      result: "pending",
    })
    .returning();
  return rowToDto(row);
}

export async function updateManualBet(
  id: string,
  patch: {
    result?: ManualBetResult;
    notes?: string | null;
    expectedProfit?: number | null;
  }
): Promise<ManualBetRow | null> {
  const db = getDb();
  const [row] = await db
    .update(manualBets)
    .set({
      ...(patch.result !== undefined ? { result: patch.result } : {}),
      ...(patch.notes !== undefined ? { notes: patch.notes } : {}),
      ...(patch.expectedProfit !== undefined
        ? { expectedProfit: patch.expectedProfit }
        : {}),
    })
    .where(eq(manualBets.id, id))
    .returning();
  return row ? rowToDto(row) : null;
}

export function requireDb(): void {
  if (!isDbConfigured()) {
    throw new Error("DATABASE_URL is not configured");
  }
}
