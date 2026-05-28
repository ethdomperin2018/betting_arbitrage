import { BOOK_FAVICON_DOMAINS } from "@/lib/bookmakerLogos";

/** Human-readable names for Odds API `bookmaker.key` values */
export const BOOK_DISPLAY_NAMES: Record<string, string> = {
  fanduel: "FanDuel",
  draftkings: "DraftKings",
  betmgm: "BetMGM",
  betrivers: "BetRivers",
  williamhill_us: "bet365",
  caesars: "Caesars",
  bovada: "Bovada",
  pointsbetus: "PointsBet",
  unibet_us: "Unibet",
  foxbet: "Fox Bet",
  sugarhouse: "SugarHouse",
  barstool: "Barstool",
  betonlineag: "BetOnline",
  lowvig: "LowVig",
  betus: "BetUS",
  mybookieag: "MyBookie",
  wynnbet: "WynnBet",
  twinspires: "TwinSpires",
  fanatics: "Fanatics",
};

/** Sorted keys — same set as the app Bookmakers page / logo manifest */
export const TRACKED_BOOKMAKER_KEYS = Object.keys(BOOK_FAVICON_DOMAINS).sort();

export const TRACKED_BOOKMAKER_COUNT = TRACKED_BOOKMAKER_KEYS.length;

export function getBookDisplayName(bookKey: string): string {
  const k = bookKey.toLowerCase();
  return BOOK_DISPLAY_NAMES[k] ?? k;
}

export function bookRef(bookKey: string) {
  return { key: bookKey, title: getBookDisplayName(bookKey) };
}
