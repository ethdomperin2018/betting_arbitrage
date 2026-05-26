import {
  boolean,
  doublePrecision,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/** One odds refresh run (manual or scheduled). */
export const fetchBatches = pgTable("fetch_batches", {
  id: uuid("id").primaryKey().defaultRandom(),
  fetchedAt: timestamp("fetched_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/** Verbatim Odds API JSON per sport per batch. */
export const rawOdds = pgTable("raw_odds", {
  id: uuid("id").primaryKey().defaultRandom(),
  batchId: uuid("batch_id")
    .notNull()
    .references(() => fetchBatches.id, { onDelete: "cascade" }),
  sportKey: text("sport_key").notNull(),
  payload: jsonb("payload").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/** Best home/away lines per game for a batch. */
export const normalizedOdds = pgTable("normalized_odds", {
  id: uuid("id").primaryKey().defaultRandom(),
  batchId: uuid("batch_id")
    .notNull()
    .references(() => fetchBatches.id, { onDelete: "cascade" }),
  eventId: text("event_id").notNull(),
  sportKey: text("sport_key").notNull(),
  sportTitle: text("sport_title").notNull(),
  commenceTime: timestamp("commence_time", { withTimezone: true }).notNull(),
  matchup: text("matchup").notNull(),
  homeTeam: text("home_team").notNull(),
  awayTeam: text("away_team").notNull(),
  homeBestLine: jsonb("home_best_line"),
  awayBestLine: jsonb("away_best_line"),
  impliedProbabilitySum: doublePrecision("implied_probability_sum").notNull(),
  isArbitrage: boolean("is_arbitrage").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/** Detected cross-book moneyline arbs for a batch. */
export const arbitrageOpportunities = pgTable("arbitrage_opportunities", {
  id: uuid("id").primaryKey().defaultRandom(),
  batchId: uuid("batch_id")
    .notNull()
    .references(() => fetchBatches.id, { onDelete: "cascade" }),
  eventId: text("event_id").notNull(),
  sportKey: text("sport_key").notNull(),
  sportTitle: text("sport_title").notNull(),
  commenceTime: timestamp("commence_time", { withTimezone: true }).notNull(),
  matchup: text("matchup").notNull(),
  homeTeam: text("home_team").notNull(),
  awayTeam: text("away_team").notNull(),
  impliedProbabilitySum: doublePrecision("implied_probability_sum").notNull(),
  totalStake: doublePrecision("total_stake").notNull(),
  guaranteedProfit: doublePrecision("guaranteed_profit").notNull(),
  legs: jsonb("legs").notNull(),
  notifiedAt: timestamp("notified_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/** Manual bet log (private tracking). */
export const manualBets = pgTable("manual_bets", {
  id: uuid("id").primaryKey().defaultRandom(),
  betDate: timestamp("bet_date", { withTimezone: true }).notNull(),
  matchup: text("matchup").notNull(),
  sportKey: text("sport_key"),
  legA: jsonb("leg_a").notNull(),
  legB: jsonb("leg_b").notNull(),
  expectedProfit: doublePrecision("expected_profit"),
  result: text("result").default("pending").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
