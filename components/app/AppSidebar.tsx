"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAV, isNavActive } from "@/lib/app-nav";

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[220px] shrink-0 flex-col border-r border-white/[0.06] bg-zinc-950">
      <div className="border-b border-white/[0.06] px-4 py-5">
        <Link href="/dashboard" className="block" onClick={onNavigate}>
          <div className="relative h-8 w-[130px]">
            <Image
              src="/logo.jpg"
              alt="Clutch Odds"
              fill
              className="object-contain object-left"
              sizes="130px"
              priority
            />
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5 p-3">
        {APP_NAV.map((item) => {
          const active = isNavActive(pathname, item);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`block rounded-md px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-[var(--brand-red)] text-white"
                  : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/[0.06] p-3">
        <Link
          href="/"
          onClick={onNavigate}
          className="block rounded-md px-3 py-2 text-xs text-zinc-500 transition hover:text-zinc-300"
        >
          ← Marketing site
        </Link>
      </div>
    </aside>
  );
}
