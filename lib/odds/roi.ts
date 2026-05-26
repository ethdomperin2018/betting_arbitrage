import type { ArbitrageOpportunity } from "./types";

/** Guaranteed profit as % of total stake (ROI on the arb package). */
export function arbRoiPercent(arb: ArbitrageOpportunity): number {
  if (arb.totalStake <= 0) return 0;
  return (arb.guaranteedProfit / arb.totalStake) * 100;
}
