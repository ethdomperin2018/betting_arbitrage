# Neon PostgreSQL setup

## 1. Create a Neon project

1. Sign up at [neon.tech](https://neon.tech).
2. Create a project and database.
3. Copy the **connection string** (use **pooled** for serverless / Next.js).

## 2. Configure env

Add to `.env.local`:

```env
DATABASE_URL=postgresql://user:password@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require
```

Keep your existing `THE_ODDS_API_KEY` in the same file.

## 3. Create tables

From the project root (with `DATABASE_URL` set in the environment or loaded from `.env.local`):

```bash
npm run db:push
```

This applies the schema in `lib/db/schema.ts` to Neon.

Optional: open Drizzle Studio to browse data:

```bash
npm run db:studio
```

## 4. Verify persistence

1. Run `npm run dev`.
2. Refresh odds (or call `GET /api/odds`).
3. Response should include `"persisted": true` and a `batchId` when the DB is configured.
4. In Neon SQL editor or Drizzle Studio, check `fetch_batches`, `raw_odds`, `normalized_odds`, `arbitrage_opportunities`.

## Real-time poll + Telegram

See [POLLING.md](./POLLING.md) for the local poller, cron endpoint, and Telegram setup.

## Tables (Phase 1 PDF)

| Table | Purpose |
|-------|---------|
| `fetch_batches` | One row per API refresh run |
| `raw_odds` | Raw JSON per sport per batch |
| `normalized_odds` | Best home/away lines per game |
| `arbitrage_opportunities` | Detected arbs (legs in JSON) |
| `manual_bets` | Manual bet log (schema ready; API/UI later) |
