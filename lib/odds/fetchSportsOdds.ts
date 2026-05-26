import type { OddsEvent } from "./types";

export const PHASE1_SPORTS = [
  { key: "basketball_nba", label: "NBA" },
  { key: "americanfootball_nfl", label: "NFL" },
  { key: "icehockey_nhl", label: "NHL" },
  { key: "baseball_mlb", label: "MLB" },
] as const;

const BASE = "https://api.the-odds-api.com/v4";

export interface SportOddsPayload {
  sportKey: string;
  events: OddsEvent[];
}

export interface FetchOddsResult {
  events: OddsEvent[];
  fetchedAt: string;
  /** Per-sport payloads for raw_odds persistence. */
  perSport: SportOddsPayload[];
}

export async function fetchSportOdds(
  apiKey: string,
  sportKey: string
): Promise<OddsEvent[]> {
  const url = new URL(`${BASE}/sports/${sportKey}/odds`);
  url.searchParams.set("apiKey", apiKey);
  url.searchParams.set("regions", "us");
  url.searchParams.set("markets", "h2h");
  url.searchParams.set("oddsFormat", "american");

  const res = await fetch(url.toString(), { cache: "no-store", next: { revalidate: 0 } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`The Odds API ${sportKey}: ${res.status} ${text.slice(0, 200)}`);
  }
  return (await res.json()) as OddsEvent[];
}

export async function fetchAllPhase1Odds(apiKey: string): Promise<FetchOddsResult> {
  const settled = await Promise.allSettled(
    PHASE1_SPORTS.map((s) => fetchSportOdds(apiKey, s.key))
  );

  const events: OddsEvent[] = [];
  const perSport: SportOddsPayload[] = [];
  const errors: string[] = [];

  settled.forEach((r, i) => {
    const sportKey = PHASE1_SPORTS[i].key;
    if (r.status === "fulfilled") {
      events.push(...r.value);
      perSport.push({ sportKey, events: r.value });
    } else {
      errors.push(`${sportKey}: ${String(r.reason)}`);
    }
  });

  if (events.length === 0 && errors.length > 0) {
    throw new Error(errors.join(" | "));
  }

  return {
    events,
    perSport,
    fetchedAt: new Date().toISOString(),
  };
}
