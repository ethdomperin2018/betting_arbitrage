import type {
  ArbLegStake,
  ArbitrageOpportunity,
  BestTwoWayLines,
  BookLine,
  GameLineSummary,
  OddsBookmaker,
  OddsEvent,
  OddsMarket,
} from "./types";
import { americanToDecimal } from "./american";

function normalizeName(s: string): string {
  return s.trim().toLowerCase();
}

/**
 * Maps outcome labels to home/away for a 2-way h2h market.
 */
export function classifyH2hOutcomes(
  outcomes: { name: string }[],
  homeTeam: string,
  awayTeam: string
): Map<string, "home" | "away"> | null {
  const h = normalizeName(homeTeam);
  const a = normalizeName(awayTeam);
  const byName = new Map<string, "home" | "away">();

  for (const o of outcomes) {
    const n = normalizeName(o.name);
    if (n === h) byName.set(o.name, "home");
    else if (n === a) byName.set(o.name, "away");
  }

  let homeOut: string | undefined;
  let awayOut: string | undefined;
  for (const [name, side] of byName) {
    if (side === "home") homeOut = name;
    if (side === "away") awayOut = name;
  }

  if (homeOut && awayOut && outcomes.length >= 2) {
    const sides = new Set(byName.values());
    if (sides.has("home") && sides.has("away")) return byName;
  }

  if (outcomes.length !== 2) return null;

  const [o1, o2] = outcomes;
  const n1 = normalizeName(o1.name);
  const n2 = normalizeName(o2.name);
  if (n1 === h && n2 === a)
    return new Map([
      [o1.name, "home"],
      [o2.name, "away"],
    ]);
  if (n1 === a && n2 === h)
    return new Map([
      [o1.name, "away"],
      [o2.name, "home"],
    ]);

  return null;
}

function getH2hMarket(book: OddsBookmaker): OddsMarket | undefined {
  return book.markets?.find((m) => m.key === "h2h");
}

/**
 * Keeps the best line per side across books by highest decimal payoff.
 */
export function computeBestTwoWayLines(event: OddsEvent): BestTwoWayLines {
  let bestHome: BookLine | null = null;
  let bestAway: BookLine | null = null;

  const homeTeam = event.home_team;
  const awayTeam = event.away_team;

  for (const book of event.bookmakers ?? []) {
    const h2h = getH2hMarket(book);
    if (!h2h?.outcomes?.length) continue;

    const cls = classifyH2hOutcomes(h2h.outcomes, homeTeam, awayTeam);
    if (!cls) continue;

    for (const o of h2h.outcomes) {
      const side = cls.get(o.name);
      if (!side) continue;

      const dec = americanToDecimal(o.price);
      const cand: BookLine = {
        bookKey: book.key,
        bookTitle: book.title,
        american: o.price,
        decimalOdds: dec,
        impliedProb: 1 / dec,
        lastUpdate: h2h.last_update ?? book.last_update,
      };

      if (side === "home") {
        if (!bestHome || cand.decimalOdds > bestHome.decimalOdds)
          bestHome = cand;
      } else if (!bestAway || cand.decimalOdds > bestAway.decimalOdds)
        bestAway = cand;
    }
  }

  return { home: bestHome, away: bestAway };
}

/** Optimal stakes for guaranteed equal return on either outcome (2-way arb). */
export function allocateTwoWayArb(
  decimals: readonly [number, number],
  totalStake: number
): [number, number] {
  const [d0, d1] = decimals;
  const inv = [1 / d0, 1 / d1] as const;
  const denom = inv[0] + inv[1];
  return [(totalStake * inv[0]) / denom, (totalStake * inv[1]) / denom];
}

/** Decimal odds after staking; same for either winner when stakes are optimal. */
export function guaranteedReturn(decimalOdds: number, stake: number): number {
  return stake * decimalOdds;
}

export function summarizeGame(event: OddsEvent): GameLineSummary | null {
  const best = computeBestTwoWayLines(event);
  if (!best.home || !best.away) return null;

  const impliedSum = best.home.impliedProb + best.away.impliedProb;
  return {
    eventId: event.id,
    sportKey: event.sport_key,
    sportTitle: event.sport_title,
    commenceTime: event.commence_time,
    matchup: `${event.home_team} vs ${event.away_team}`,
    homeTeam: event.home_team,
    awayTeam: event.away_team,
    homeBestLine: best.home,
    awayBestLine: best.away,
    impliedProbabilitySum: impliedSum,
    isArbitrage: impliedSum < 1,
  };
}

export function buildTwoWayOpportunity(
  event: OddsEvent,
  totalStake: number
): ArbitrageOpportunity | null {
  const best = computeBestTwoWayLines(event);
  if (!best.home || !best.away) return null;

  const impliedSum = best.home.impliedProb + best.away.impliedProb;
  if (implicitlyNoArb(impliedSum)) return null;

  const decimals: [number, number] = [best.home.decimalOdds, best.away.decimalOdds];
  const [homeStake, awayStake] = allocateTwoWayArb(decimals, totalStake);
  const ret = guaranteedReturn(best.home.decimalOdds, homeStake);
  const profit = ret - totalStake;

  const legs: ArbLegStake[] = [
    {
      side: "home",
      teamName: event.home_team,
      bookKey: best.home.bookKey,
      bookTitle: best.home.bookTitle,
      american: best.home.american,
      decimalOdds: best.home.decimalOdds,
      stake: homeStake,
    },
    {
      side: "away",
      teamName: event.away_team,
      bookKey: best.away.bookKey,
      bookTitle: best.away.bookTitle,
      american: best.away.american,
      decimalOdds: best.away.decimalOdds,
      stake: awayStake,
    },
  ];

  return {
    eventId: event.id,
    sportKey: event.sport_key,
    sportTitle: event.sport_title,
    commenceTime: event.commence_time,
    matchup: `${event.home_team} vs ${event.away_team}`,
    homeTeam: event.home_team,
    awayTeam: event.away_team,
    impliedProbabilitySum: impliedSum,
    legs,
    totalStake,
    guaranteedProfit: profit,
  };
}

/** Treat floating noise as arb when strictly below 1 with tiny epsilon. */
function implicitlyNoArb(impliedSum: number): boolean {
  return impliedSum >= 1 - 1e-9;
}

export function summarizeAll(events: OddsEvent[]): GameLineSummary[] {
  const out: GameLineSummary[] = [];
  for (const e of events) {
    const s = summarizeGame(e);
    if (s) out.push(s);
  }
  return out.sort(compArbThenKickoff).slice(0, 200);
}

export function opportunitiesFromEvents(
  events: OddsEvent[],
  totalStake: number
): ArbitrageOpportunity[] {
  const opps: ArbitrageOpportunity[] = [];
  for (const e of events) {
    const o = buildTwoWayOpportunity(e, totalStake);
    if (o) opps.push(o);
  }
  return opps.sort(compByProfitDesc).slice(0, 50);
}

function compByProfitDesc(a: ArbitrageOpportunity, b: ArbitrageOpportunity): number {
  return b.guaranteedProfit - a.guaranteedProfit;
}

function compArbThenKickoff(a: GameLineSummary, b: GameLineSummary): number {
  if (a.isArbitrage !== b.isArbitrage) return a.isArbitrage ? -1 : 1;
  return new Date(a.commenceTime).getTime() - new Date(b.commenceTime).getTime();
}
