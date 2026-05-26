/** The Odds API v4 odds response shapes (minimal fields we use). */

export interface OddsOutcome {
  name: string;
  price: number;
}

export interface OddsMarket {
  key: string;
  last_update?: string;
  outcomes: OddsOutcome[];
}

export interface OddsBookmaker {
  key: string;
  title: string;
  last_update?: string;
  markets: OddsMarket[];
}

export interface OddsEvent {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: OddsBookmaker[];
}

export interface BookLine {
  bookKey: string;
  bookTitle: string;
  american: number;
  decimalOdds: number;
  impliedProb: number;
  lastUpdate?: string;
}

export interface BestTwoWayLines {
  home: BookLine | null;
  away: BookLine | null;
}

export interface ArbLegStake {
  side: "home" | "away";
  teamName: string;
  bookKey: string;
  bookTitle: string;
  american: number;
  decimalOdds: number;
  stake: number;
}

export interface ArbitrageOpportunity {
  eventId: string;
  sportKey: string;
  sportTitle: string;
  commenceTime: string;
  matchup: string;
  homeTeam: string;
  awayTeam: string;
  impliedProbabilitySum: number;
  legs: ArbLegStake[];
  totalStake: number;
  guaranteedProfit: number;
}

export interface GameLineSummary {
  eventId: string;
  sportKey: string;
  sportTitle: string;
  commenceTime: string;
  matchup: string;
  homeTeam: string;
  awayTeam: string;
  homeBestLine: BookLine | null;
  awayBestLine: BookLine | null;
  impliedProbabilitySum: number;
  isArbitrage: boolean;
}
