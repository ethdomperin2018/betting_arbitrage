/**
 * Non-official badge colors + short labels for The Odds API `bookmaker.key` values.
 * Real logos: `/public/bookmakers/{key}.{svg|png}` — run `npm run logos` (see `bookmakerLogos.ts`).
 */

export interface BookBrand {
  /** Tailwind-friendly hex for inline styles */
  bg: string;
  fg: string;
  /** 2-letter badge when no custom image */
  short: string;
}

const BY_KEY: Record<string, Omit<BookBrand, "short"> & { short?: string }> = {
  draftkings: { bg: "#53D337", fg: "#0a0a0a", short: "DK" },
  fanduel: { bg: "#1496FF", fg: "#ffffff", short: "FD" },
  betmgm: { bg: "#B89267", fg: "#0a0a0a", short: "MG" },
  williamhill_us: { bg: "#0052FF", fg: "#ffffff", short: "WH" },
  caesars: { bg: "#0D47A1", fg: "#ffffff", short: "CZ" },
  pointsbetus: { bg: "#E31837", fg: "#ffffff", short: "PB" },
  betrivers: { bg: "#0035A0", fg: "#ffffff", short: "RV" },
  sugarhouse: { bg: "#0EAD69", fg: "#ffffff", short: "SH" },
  barstool: { bg: "#000000", fg: "#ffffff", short: "BS" },
  bovada: { bg: "#E72525", fg: "#ffffff", short: "BV" },
  betonlineag: { bg: "#F59E0B", fg: "#0a0a0a", short: "BO" },
  lowvig: { bg: "#14B8A6", fg: "#0a0a0a", short: "LV" },
  betus: { bg: "#2563EB", fg: "#ffffff", short: "BU" },
  mybookieag: { bg: "#DC2626", fg: "#ffffff", short: "MB" },
  wynnbet: { bg: "#7C3AED", fg: "#ffffff", short: "WB" },
  unibet_us: { bg: "#147B45", fg: "#ffffff", short: "UB" },
  foxbet: { bg: "#1E40AF", fg: "#ffffff", short: "FX" },
  twinspires: { bg: "#0D9488", fg: "#ffffff", short: "TS" },
  fanatics: { bg: "#0B1F3A", fg: "#ffffff", short: "FN" },
};

function initialsFromTitle(title: string): string {
  const words = title
    .replace(/\.(ag|com)$/i, "")
    .split(/[\s._-]+/)
    .filter(Boolean);
  if (words.length >= 2) {
    return (words[0]![0]! + words[1]![0]!).toUpperCase();
  }
  return title.slice(0, 2).toUpperCase();
}

export function getBookBrand(bookKey: string, bookTitle: string): BookBrand {
  const k = bookKey.toLowerCase();
  const preset = BY_KEY[k];
  if (preset) {
    return {
      bg: preset.bg,
      fg: preset.fg,
      short: preset.short ?? initialsFromTitle(bookTitle),
    };
  }
  return {
    bg: "#3f3f46",
    fg: "#fafafa",
    short: initialsFromTitle(bookTitle),
  };
}
