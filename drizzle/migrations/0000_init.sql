CREATE TABLE IF NOT EXISTS "fetch_batches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fetched_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "raw_odds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"batch_id" uuid NOT NULL,
	"sport_key" text NOT NULL,
	"payload" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "normalized_odds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"batch_id" uuid NOT NULL,
	"event_id" text NOT NULL,
	"sport_key" text NOT NULL,
	"sport_title" text NOT NULL,
	"commence_time" timestamp with time zone NOT NULL,
	"matchup" text NOT NULL,
	"home_team" text NOT NULL,
	"away_team" text NOT NULL,
	"home_best_line" jsonb,
	"away_best_line" jsonb,
	"implied_probability_sum" double precision NOT NULL,
	"is_arbitrage" boolean NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "arbitrage_opportunities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"batch_id" uuid NOT NULL,
	"event_id" text NOT NULL,
	"sport_key" text NOT NULL,
	"sport_title" text NOT NULL,
	"commence_time" timestamp with time zone NOT NULL,
	"matchup" text NOT NULL,
	"home_team" text NOT NULL,
	"away_team" text NOT NULL,
	"implied_probability_sum" double precision NOT NULL,
	"total_stake" double precision NOT NULL,
	"guaranteed_profit" double precision NOT NULL,
	"legs" jsonb NOT NULL,
	"notified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "manual_bets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bet_date" timestamp with time zone NOT NULL,
	"matchup" text NOT NULL,
	"sport_key" text,
	"leg_a" jsonb NOT NULL,
	"leg_b" jsonb NOT NULL,
	"expected_profit" double precision,
	"result" text DEFAULT 'pending' NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE "raw_odds" ADD CONSTRAINT "raw_odds_batch_id_fetch_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."fetch_batches"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "normalized_odds" ADD CONSTRAINT "normalized_odds_batch_id_fetch_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."fetch_batches"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "arbitrage_opportunities" ADD CONSTRAINT "arbitrage_opportunities_batch_id_fetch_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."fetch_batches"("id") ON DELETE cascade ON UPDATE no action;
