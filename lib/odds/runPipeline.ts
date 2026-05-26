import { isDbConfigured } from "@/lib/db";
import { notifyArbitrageForBatch } from "@/lib/db/notifyArbitrage";
import { persistOddsSnapshot } from "@/lib/db/persistSnapshot";
import { fetchAllPhase1Odds, PHASE1_SPORTS } from "./fetchSportsOdds";
import {
  opportunitiesFromEvents,
  summarizeAll,
} from "./normalize";
import type { ArbitrageOpportunity, GameLineSummary } from "./types";

export interface RunPipelineOptions {
  apiKey: string;
  totalStake?: number;
  /** Persist to Neon when DATABASE_URL is set (default true). */
  persist?: boolean;
  /** Send Telegram for new arbs when configured (default true). */
  notify?: boolean;
}

export interface RunPipelineResult {
  fetchedAt: string;
  games: GameLineSummary[];
  arbitrageOpportunities: ArbitrageOpportunity[];
  batchId?: string;
  persisted: boolean;
  notifiedCount: number;
  sports: string[];
}

export async function runOddsPipeline(
  options: RunPipelineOptions
): Promise<RunPipelineResult> {
  const totalStake = options.totalStake ?? 1000;
  const shouldPersist = options.persist !== false && isDbConfigured();
  const shouldNotify = options.notify !== false;

  const { events, fetchedAt, perSport } = await fetchAllPhase1Odds(
    options.apiKey
  );
  const games = summarizeAll(events);
  const arbitrageOpportunities = opportunitiesFromEvents(events, totalStake);

  let batchId: string | undefined;
  let notifiedCount = 0;

  if (shouldPersist) {
    const saved = await persistOddsSnapshot({
      fetchedAt,
      perSport,
      games,
      opportunities: arbitrageOpportunities,
    });
    batchId = saved.batchId;

    if (shouldNotify && batchId) {
      try {
        notifiedCount = await notifyArbitrageForBatch(batchId);
      } catch (err) {
        console.error("[pipeline] telegram notify failed:", err);
      }
    }
  }

  return {
    fetchedAt,
    games,
    arbitrageOpportunities,
    batchId,
    persisted: Boolean(batchId),
    notifiedCount,
    sports: PHASE1_SPORTS.map((s) => s.label),
  };
}
