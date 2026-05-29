import type { ArbitrageOpportunity, GameLineSummary } from "@/lib/odds/types";

/** Flip to `false` when ready to use `/api/odds` again. */
export const OPPORTUNITIES_USE_DEMO_DATA = true;

export type DemoOddsPayload = {
  fetchedAt: string;
  sports: string[];
  market: string;
  requestedTotalStake: number;
  arbitrageOpportunities: ArbitrageOpportunity[];
  games: GameLineSummary[];
  light?: boolean;
};

function scaleStake(value: number, totalStake: number): number {
  return Math.round((value * (totalStake / 1000)) * 100) / 100;
}

function demoArbs(totalStake: number): ArbitrageOpportunity[] {
  const s = (n: number) => scaleStake(n, totalStake);
  const profit = (n: number) => scaleStake(n, totalStake);

  return [
    {
      eventId: "demo-nba-1",
      sportKey: "basketball_nba",
      sportTitle: "NBA",
      commenceTime: "2026-05-29T00:30:00.000Z",
      matchup: "DAL Mavericks @ BOS Celtics",
      homeTeam: "Boston Celtics",
      awayTeam: "Dallas Mavericks",
      impliedProbabilitySum: 0.9842,
      totalStake,
      guaranteedProfit: profit(63.2),
      legs: [
        {
          side: "home",
          teamName: "Boston Celtics",
          bookKey: "fanduel",
          bookTitle: "FanDuel",
          american: 145,
          decimalOdds: 2.45,
          stake: s(412),
        },
        {
          side: "away",
          teamName: "Dallas Mavericks",
          bookKey: "fanatics",
          bookTitle: "Fanatics",
          american: -138,
          decimalOdds: 1.725,
          stake: s(588),
        },
      ],
    },
    {
      eventId: "demo-nba-2",
      sportKey: "basketball_nba",
      sportTitle: "NBA",
      commenceTime: "2026-05-29T02:00:00.000Z",
      matchup: "LAL Lakers @ GSW Warriors",
      homeTeam: "Golden State Warriors",
      awayTeam: "Los Angeles Lakers",
      impliedProbabilitySum: 0.9915,
      totalStake,
      guaranteedProfit: profit(21.8),
      legs: [
        {
          side: "home",
          teamName: "Golden State Warriors",
          bookKey: "betmgm",
          bookTitle: "BetMGM",
          american: 120,
          decimalOdds: 2.2,
          stake: s(454),
        },
        {
          side: "away",
          teamName: "Los Angeles Lakers",
          bookKey: "betonlineag",
          bookTitle: "BetOnline",
          american: -140,
          decimalOdds: 1.714,
          stake: s(546),
        },
      ],
    },
    {
      eventId: "demo-nba-3",
      sportKey: "basketball_nba",
      sportTitle: "NBA",
      commenceTime: "2026-05-29T23:00:00.000Z",
      matchup: "NYK Knicks @ PHI 76ers",
      homeTeam: "Philadelphia 76ers",
      awayTeam: "New York Knicks",
      impliedProbabilitySum: 0.9931,
      totalStake,
      guaranteedProfit: profit(19.4),
      legs: [
        {
          side: "home",
          teamName: "Philadelphia 76ers",
          bookKey: "draftkings",
          bookTitle: "DraftKings",
          american: -105,
          decimalOdds: 1.952,
          stake: s(512),
        },
        {
          side: "away",
          teamName: "New York Knicks",
          bookKey: "betrivers",
          bookTitle: "BetRivers",
          american: 115,
          decimalOdds: 2.15,
          stake: s(488),
        },
      ],
    },
  ];
}

function demoGames(): GameLineSummary[] {
  return [
    {
      eventId: "demo-nba-1",
      sportKey: "basketball_nba",
      sportTitle: "NBA",
      commenceTime: "2026-05-29T00:30:00.000Z",
      matchup: "DAL Mavericks @ BOS Celtics",
      homeTeam: "Boston Celtics",
      awayTeam: "Dallas Mavericks",
      homeBestLine: {
        bookKey: "fanduel",
        bookTitle: "FanDuel",
        american: 145,
        decimalOdds: 2.45,
        impliedProb: 0.4082,
      },
      awayBestLine: {
        bookKey: "fanatics",
        bookTitle: "Fanatics",
        american: -138,
        decimalOdds: 1.725,
        impliedProb: 0.5797,
      },
      impliedProbabilitySum: 0.9879,
      isArbitrage: true,
    },
    {
      eventId: "demo-nba-2",
      sportKey: "basketball_nba",
      sportTitle: "NBA",
      commenceTime: "2026-05-29T02:00:00.000Z",
      matchup: "LAL Lakers @ GSW Warriors",
      homeTeam: "Golden State Warriors",
      awayTeam: "Los Angeles Lakers",
      homeBestLine: {
        bookKey: "betmgm",
        bookTitle: "BetMGM",
        american: 120,
        decimalOdds: 2.2,
        impliedProb: 0.4545,
      },
      awayBestLine: {
        bookKey: "betonlineag",
        bookTitle: "BetOnline",
        american: -140,
        decimalOdds: 1.714,
        impliedProb: 0.5834,
      },
      impliedProbabilitySum: 1.0379,
      isArbitrage: false,
    },
    {
      eventId: "demo-nba-3",
      sportKey: "basketball_nba",
      sportTitle: "NBA",
      commenceTime: "2026-05-29T23:00:00.000Z",
      matchup: "NYK Knicks @ PHI 76ers",
      homeTeam: "Philadelphia 76ers",
      awayTeam: "New York Knicks",
      homeBestLine: {
        bookKey: "draftkings",
        bookTitle: "DraftKings",
        american: -105,
        decimalOdds: 1.952,
        impliedProb: 0.5123,
      },
      awayBestLine: {
        bookKey: "betrivers",
        bookTitle: "BetRivers",
        american: 115,
        decimalOdds: 2.15,
        impliedProb: 0.4651,
      },
      impliedProbabilitySum: 0.9774,
      isArbitrage: false,
    },
    {
      eventId: "demo-nba-4",
      sportKey: "basketball_nba",
      sportTitle: "NBA",
      commenceTime: "2026-05-30T00:00:00.000Z",
      matchup: "MIA Heat @ MIL Bucks",
      homeTeam: "Milwaukee Bucks",
      awayTeam: "Miami Heat",
      homeBestLine: {
        bookKey: "caesars",
        bookTitle: "Caesars",
        american: -118,
        decimalOdds: 1.847,
        impliedProb: 0.5414,
      },
      awayBestLine: {
        bookKey: "williamhill_us",
        bookTitle: "bet365",
        american: 108,
        decimalOdds: 2.08,
        impliedProb: 0.4808,
      },
      impliedProbabilitySum: 1.0222,
      isArbitrage: false,
    },
    {
      eventId: "demo-nhl-1",
      sportKey: "icehockey_nhl",
      sportTitle: "NHL",
      commenceTime: "2026-05-29T23:30:00.000Z",
      matchup: "FLA Panthers @ NYR Rangers",
      homeTeam: "New York Rangers",
      awayTeam: "Florida Panthers",
      homeBestLine: {
        bookKey: "bovada",
        bookTitle: "Bovada",
        american: 102,
        decimalOdds: 2.02,
        impliedProb: 0.495,
      },
      awayBestLine: {
        bookKey: "betus",
        bookTitle: "BetUS",
        american: -108,
        decimalOdds: 1.926,
        impliedProb: 0.5192,
      },
      impliedProbabilitySum: 1.0142,
      isArbitrage: false,
    },
  ];
}

export function buildDemoOddsPayload(totalStake: number): DemoOddsPayload {
  return {
    fetchedAt: new Date().toISOString(),
    sports: ["basketball_nba", "icehockey_nhl"],
    market: "h2h",
    requestedTotalStake: totalStake,
    arbitrageOpportunities: demoArbs(totalStake),
    games: demoGames(),
    light: true,
  };
}

export function demoLoadDelayMs(): number {
  return 350;
}
