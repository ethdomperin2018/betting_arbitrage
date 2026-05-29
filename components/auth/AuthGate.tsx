"use client";

import { useDemoAuth } from "@/components/auth/DemoAuthProvider";

export function AuthGate({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  const { session, ready } = useDemoAuth();

  if (!ready) {
    return (
      <div className="rounded-xl border border-white/[0.08] bg-zinc-900/30 px-6 py-12 text-center text-sm text-zinc-500">
        Loading…
      </div>
    );
  }

  if (!session) return fallback;

  return children;
}
