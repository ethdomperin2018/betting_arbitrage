"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "./BrandLogo";

const NAV = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-black shadow-[0_8px_24px_rgba(0,0,0,0.55)]">
      <div className="mx-auto grid h-[5.5rem] max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <BrandLogo className="justify-self-start" />

        <nav className="hidden justify-self-center items-center gap-10 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden justify-self-end items-center gap-6 sm:flex">
          <Link
            href="/dashboard"
            className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-300 transition hover:text-white"
          >
            Open app
          </Link>
          <Link
            href="/login"
            className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-300 transition hover:text-white"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="btn-primary rounded-md px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white"
          >
            Sign up
          </Link>
        </div>

        <button
          type="button"
          className="justify-self-end flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-zinc-300 lg:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      <div className="pointer-events-none h-4 bg-gradient-to-b from-black to-transparent" aria-hidden />

      {open && (
        <div className="border-t border-white/5 bg-black/95 px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 text-sm font-semibold uppercase tracking-wider text-zinc-300"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/signup"
              className="btn-primary mt-2 rounded-md py-3 text-center text-xs font-bold uppercase tracking-wider text-white"
              onClick={() => setOpen(false)}
            >
              Sign up
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
