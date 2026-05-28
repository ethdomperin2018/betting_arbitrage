import { NextResponse } from "next/server";
import { isTelegramConfigured } from "@/lib/telegram/notify";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ configured: isTelegramConfigured() });
}
