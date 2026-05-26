import type { ArbitrageOpportunity } from "@/lib/odds/types";
import { createManualBet } from "./manualBets";

export async function logBetFromArb(arb: ArbitrageOpportunity) {
  const [legA, legB] = arb.legs;
  return createManualBet({
    matchup: arb.matchup,
    sportKey: arb.sportKey,
    expectedProfit: arb.guaranteedProfit,
    legA: {
      bookKey: legA.bookKey,
      bookTitle: legA.bookTitle,
      teamName: legA.teamName,
      american: legA.american,
      stake: legA.stake,
    },
    legB: {
      bookKey: legB.bookKey,
      bookTitle: legB.bookTitle,
      teamName: legB.teamName,
      american: legB.american,
      stake: legB.stake,
    },
  });
}
