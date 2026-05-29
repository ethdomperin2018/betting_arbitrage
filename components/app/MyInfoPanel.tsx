"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemoAuth } from "@/components/auth/DemoAuthProvider";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-white/[0.06] py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </span>
      <span className="text-sm text-white">{value}</span>
    </div>
  );
}

export function MyInfoPanel() {
  const { session, ready, logout } = useDemoAuth();
  const router = useRouter();

  if (!ready) {
    return (
      <p className="rounded-xl border border-white/[0.08] bg-zinc-900/50 px-5 py-8 text-center text-sm text-zinc-500">
        Loading…
      </p>
    );
  }

  if (!session) {
    return (
      <div className="rounded-xl border border-white/[0.08] bg-zinc-900/50 px-6 py-10 text-center">
        <p className="text-sm text-zinc-400">You are not signed in.</p>
        <Link
          href="/login?next=/my-info"
          className="btn-primary mt-6 inline-block rounded-md px-6 py-3 text-xs font-bold uppercase tracking-wider text-white"
        >
          Log in
        </Link>
      </div>
    );
  }

  const signedInAt = new Date(session.loggedInAt);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-white/[0.08] bg-zinc-900/50 px-5 py-2">
        <InfoRow label="Username" value={session.username} />
        <InfoRow label="Account type" value="Demo" />
        <InfoRow
          label="Signed in"
          value={signedInAt.toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        />
        <InfoRow label="Plan" value="Phase 1 · Private beta" />
      </section>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            logout();
            router.push("/login");
            router.refresh();
          }}
          className="rounded-md border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-200 transition hover:border-white/30 hover:text-white"
        >
          Log out
        </button>
        <Link
          href="/settings"
          className="rounded-md border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 transition hover:border-white/20 hover:text-white"
        >
          Settings
        </Link>
      </div>
    </div>
  );
}
