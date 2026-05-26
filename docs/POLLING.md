# Polling, Telegram & dashboard refresh

## Dashboard

- **Auto-refresh** — polls `/api/odds?light=1` every N seconds (default **3600** = 1 hour). Does **not** write to DB or send Telegram.
- **Full refresh** — `/api/odds` without `light` — saves to Neon + Telegram on new arbs.
- **Min ROI %** — filters arb cards client-side (e.g. `1` = only show profit ≥ 1% of stake).
- **Updated X seconds ago** — live label from last successful fetch.

---

# Polling & Telegram alerts

## Pipeline (each run)

`fetch → normalize → detect arb → save to Neon → Telegram (if arb + configured)`

Shared entry: `lib/odds/runPipeline.ts`  
Used by: `GET /api/odds`, `GET /api/cron/poll-odds`, `npm run poll`

---

## Option A — Local poller (dev / VPS)

1. Set in `.env.local`:

```env
POLL_INTERVAL_SECONDS=30
DEFAULT_TOTAL_STAKE=1000
DATABASE_URL=...
THE_ODDS_API_KEY=...
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```

2. Run:

```bash
npm run poll
```

Runs forever until Ctrl+C. Each tick uses API credits (~4 per tick).

---

## Option B — Cron HTTP endpoint

1. Set `CRON_SECRET` in `.env.local` (long random string).

2. Call on a schedule (Task Scheduler, cron, Vercel Cron, etc.):

```bash
curl -H "Authorization: Bearer YOUR_CRON_SECRET" \
  http://localhost:3000/api/cron/poll-odds
```

Or header: `x-cron-secret: YOUR_CRON_SECRET`

Response example:

```json
{
  "ok": true,
  "fetchedAt": "...",
  "batchId": "...",
  "persisted": true,
  "gameCount": 24,
  "arbCount": 0,
  "notifiedCount": 0
}
```

---

## Telegram setup

1. Open [@BotFather](https://t.me/BotFather) → `/newbot` → copy **bot token**.
2. Start a chat with your bot (send any message).
3. Get **chat id**:
   - Message [@userinfobot](https://t.me/userinfobot), or
   - `https://api.telegram.org/bot<TOKEN>/getUpdates` and read `message.chat.id`
4. Add to `.env.local`:

```env
TELEGRAM_BOT_TOKEN=123456:ABC...
TELEGRAM_CHAT_ID=123456789
```

5. When an arb is detected and saved, you get a message with books, odds, stakes, and profit.

**Cooldown:** `ARB_NOTIFY_COOLDOWN_MINUTES=15` avoids spamming the same game every poll.

---

## API credits reminder

Each poll ≈ **4 credits** (4 sports × 1 market × 1 region).  
At 30s interval ≈ **11,520 credits/day** — use a paid Odds API plan or a slower interval.

---

## Daily cleanup

Removes old `fetch_batches` (and cascaded `raw_odds`, `normalized_odds`, `arbitrage_opportunities`). **Does not delete `manual_bets`.**

```env
RETENTION_DAYS_FETCH_BATCHES=14
```

**Once per day (cron):**

```bash
curl -H "Authorization: Bearer YOUR_CRON_SECRET" \
  http://localhost:3000/api/cron/cleanup
```

**Or locally:**

```bash
npm run cleanup
```

---

## Manual bet log

- `GET /api/bets` — list logged bets  
- `POST /api/bets` — create (body: `matchup`, `legA`, `legB`, optional `expectedProfit`)  
- `PATCH /api/bets/:id` — update `result` (`pending` | `won` | `lost` | `push` | `partial`)  

Dashboard: **Log bet** on an arb card, or view/update results in **Manual bet log**.
