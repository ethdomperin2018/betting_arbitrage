/**
 * Local brand marks under /public/bookmakers/
 * Run `npm run logos` to refresh assets + manifest.
 */

import manifest from "./bookmaker-logos-manifest.json";

/** Odds API key → file basename when it differs from the key */
export const LOGO_ALIASES: Record<string, string> = {
  williamhill_us: "williamhill_us",
};

/**
 * The Odds API `bookmaker.key` → site domain for favicon fetch (npm run logos).
 */
export const BOOK_FAVICON_DOMAINS: Record<string, string> = {
  fanduel: "fanduel.com",
  draftkings: "draftkings.com",
  betmgm: "betmgm.com",
  betrivers: "betrivers.com",
  williamhill_us: "bet365.com",
  caesars: "caesars.com",
  bovada: "bovada.lv",
  pointsbetus: "pointsbet.com",
  unibet_us: "unibet.com",
  foxbet: "fanduel.com",
  sugarhouse: "playsugarhouse.com",
  barstool: "barstoolsportsbook.com",
  betonlineag: "betonline.ag",
  lowvig: "lowvig.com",
  betus: "betus.com",
  mybookieag: "mybookie.ag",
  wynnbet: "wynnbet.com",
  twinspires: "twinspires.com",
  fanatics: "sportsbook.fanatics.com",
};

const LOGO_MANIFEST = manifest as Record<string, string>;

/** Basename for /public/bookmakers/{basename}.* — defaults to the API key */
export function getBookLogoBasename(bookKey: string): string {
  const k = bookKey.toLowerCase();
  return LOGO_ALIASES[k] ?? k;
}

/** Single resolved path, or null → use initials badge (no 404 probing) */
export function getBookLogoPath(bookKey: string): string | null {
  const base = getBookLogoBasename(bookKey);
  return LOGO_MANIFEST[base] ?? null;
}

/** @deprecated Use getBookLogoPath */
export function getBookLogoCandidates(bookKey: string): string[] {
  const path = getBookLogoPath(bookKey);
  return path ? [path] : [];
}
