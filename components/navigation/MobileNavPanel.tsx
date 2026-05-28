"use client";

import Link from "next/link";
import { APP_NAV } from "@/lib/app-nav";
import { MARKETING_NAV } from "@/lib/marketing-nav";

export function MobileNavPanel({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
        Tool
      </p>
      {APP_NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="py-1.5 text-sm font-medium text-zinc-300"
          onClick={onNavigate}
        >
          {item.label}
        </Link>
      ))}
      <div className="my-2 border-t border-white/10" />
      {MARKETING_NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="py-2 text-sm font-semibold uppercase tracking-wider text-zinc-300"
          onClick={onNavigate}
        >
          {item.label}
        </Link>
      ))}
      <Link
        href="/signup"
        className="btn-primary mt-2 rounded-md py-3 text-center text-xs font-bold uppercase tracking-wider text-white"
        onClick={onNavigate}
      >
        Sign up
      </Link>
    </nav>
  );
}
