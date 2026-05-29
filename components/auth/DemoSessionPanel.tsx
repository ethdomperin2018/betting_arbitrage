"use client";

import { useRouter } from "next/navigation";
import { useDemoAuth } from "@/components/auth/DemoAuthProvider";

export function DemoSessionPanel() {
  const { session, ready, logout } = useDemoAuth();
  const router = useRouter();

  if (!ready) return null;

  return (
    <section className="rounded-xl border border-white/[0.08] bg-zinc-900/50 p-5">
      <h2 className="font-medium text-white">Demo session</h2>
      {session ? (
        <>
          <p className="mt-2 text-zinc-400">
            Signed in as <span className="text-zinc-200">{session.username}</span>.
          </p>
          <button
            type="button"
            onClick={() => {
              logout();
              router.refresh();
            }}
            className="mt-4 rounded-md border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-200 transition hover:border-white/30 hover:text-white"
          >
            Log out
          </button>
        </>
      ) : (
        <p className="mt-2 text-zinc-400">
          Not signed in. Use Log in with any username and password to unlock
          Opportunities, My Bets, and Analytics.
        </p>
      )}
    </section>
  );
}
