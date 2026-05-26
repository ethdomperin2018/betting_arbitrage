import { formatAmerican } from "@/lib/odds/format";
import type { ArbLegStake } from "@/lib/odds/types";

export function isTelegramConfigured(): boolean {
  return Boolean(
    process.env.TELEGRAM_BOT_TOKEN?.trim() &&
      process.env.TELEGRAM_CHAT_ID?.trim()
  );
}

export interface ArbTelegramPayload {
  matchup: string;
  sportTitle: string;
  commenceTime: string;
  impliedProbabilitySum: number;
  totalStake: number;
  guaranteedProfit: number;
  legs: ArbLegStake[];
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function formatArbTelegramMessage(p: ArbTelegramPayload): string {
  const roi =
    p.totalStake > 0
      ? ((p.guaranteedProfit / p.totalStake) * 100).toFixed(2)
      : "0";
  const kickoff = new Date(p.commenceTime).toLocaleString("en-US", {
    timeZoneName: "short",
  });

  const legLines = p.legs
    .map(
      (leg) =>
        `• <b>${escapeHtml(leg.bookTitle)}</b> → ${escapeHtml(leg.teamName)} ${formatAmerican(leg.american)} → $${leg.stake.toFixed(2)}`
    )
    .join("\n");

  return [
    `<b>ARB</b> · ${escapeHtml(p.sportTitle)}`,
    escapeHtml(p.matchup),
    kickoff,
    "",
    legLines,
    "",
    `Profit: <b>$${p.guaranteedProfit.toFixed(2)}</b> (${roi}% ROI)`,
    `Total stake: $${p.totalStake.toFixed(2)}`,
    `Implied Σ: ${p.impliedProbabilitySum.toFixed(4)}`,
  ].join("\n");
}

export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) {
    throw new Error("TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are required");
  }

  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram API ${res.status}: ${body.slice(0, 300)}`);
  }
}

export async function sendArbTelegramAlert(
  payload: ArbTelegramPayload
): Promise<void> {
  await sendTelegramMessage(formatArbTelegramMessage(payload));
}
