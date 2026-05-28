"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { APP_NAV, isNavActive } from "@/lib/app-nav";

type ToolNavDropdownProps = {
  /** Uppercase tracking style for marketing header */
  variant?: "marketing" | "app";
};

export function ToolNavDropdown({ variant = "app" }: ToolNavDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const pathname = usePathname();
  const activeItem = APP_NAV.find((item) => isNavActive(pathname, item));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  const triggerClass =
    variant === "marketing"
      ? "flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400 transition hover:text-white"
      : "flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-300 transition hover:border-white/20 hover:text-white";

  const panelClass =
    variant === "marketing"
      ? "absolute left-1/2 top-full z-50 mt-3 w-52 -translate-x-1/2 rounded-lg border border-white/10 bg-black py-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.65)]"
      : "absolute right-0 top-full z-50 mt-2 w-52 rounded-lg border border-white/10 bg-zinc-950 py-1.5 shadow-xl";

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className={triggerClass}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        Tool
        {activeItem && variant === "app" ? (
          <span className="hidden font-normal normal-case tracking-normal text-zinc-500 sm:inline">
            · {activeItem.label}
          </span>
        ) : null}
        <svg
          className={`h-3.5 w-3.5 shrink-0 transition ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div id={menuId} role="menu" className={panelClass}>
          {APP_NAV.map((item) => {
            const active = isNavActive(pathname, item);
            return (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                className={`block px-3 py-2 text-sm transition ${
                  active
                    ? "bg-[var(--brand-red)]/15 font-semibold text-[var(--brand-red)]"
                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
