import type {
  ArbitrageOpportunity,
  GameLineSummary,
  OddsEvent,
} from "@/lib/odds/types";
import { getDb } from "./index";
import {
  arbitrageOpportunities,
  fetchBatches,
  normalizedOdds,
  rawOdds,
} from "./schema";

export interface PersistSnapshotInput {
  fetchedAt: string;
  perSport: { sportKey: string; events: OddsEvent[] }[];
  games: GameLineSummary[];
  opportunities: ArbitrageOpportunity[];
}

export async function persistOddsSnapshot(
  input: PersistSnapshotInput
): Promise<{ batchId: string }> {
  const db = getDb();
  const fetchedAt = new Date(input.fetchedAt);

  const [batch] = await db
    .insert(fetchBatches)
    .values({ fetchedAt })
    .returning({ id: fetchBatches.id });

  const batchId = batch.id;

  if (input.perSport.length > 0) {
    await db.insert(rawOdds).values(
      input.perSport.map((s) => ({
        batchId,
        sportKey: s.sportKey,
        payload: s.events,
      }))
    );
  }

  if (input.games.length > 0) {
    await db.insert(normalizedOdds).values(
      input.games.map((g) => ({
        batchId,
        eventId: g.eventId,
        sportKey: g.sportKey,
        sportTitle: g.sportTitle,
        commenceTime: new Date(g.commenceTime),
        matchup: g.matchup,
        homeTeam: g.homeTeam,
        awayTeam: g.awayTeam,
        homeBestLine: g.homeBestLine,
        awayBestLine: g.awayBestLine,
        impliedProbabilitySum: g.impliedProbabilitySum,
        isArbitrage: g.isArbitrage,
      }))
    );
  }

  if (input.opportunities.length > 0) {
    await db.insert(arbitrageOpportunities).values(
      input.opportunities.map((o) => ({
        batchId,
        eventId: o.eventId,
        sportKey: o.sportKey,
        sportTitle: o.sportTitle,
        commenceTime: new Date(o.commenceTime),
        matchup: o.matchup,
        homeTeam: o.homeTeam,
        awayTeam: o.awayTeam,
        impliedProbabilitySum: o.impliedProbabilitySum,
        totalStake: o.totalStake,
        guaranteedProfit: o.guaranteedProfit,
        legs: o.legs,
      }))
    );
  }

  return { batchId };
}
