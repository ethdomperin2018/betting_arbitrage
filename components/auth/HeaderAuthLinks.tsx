"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemoAuth } from "@/components/auth/DemoAuthProvider";

export function HeaderAuthLinks() {
  const { session, ready, logout } = useDemoAuth();
  const router = useRouter();

  if (!ready) return null;

  if (session) {
    return (
      <>
        <Link
          href="/my-info"
          className="max-w-[8rem] truncate text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500 transition hover:text-white"
        >
          {session.username}
        </Link>
        <button
          type="button"
          onClick={() => {
            logout();
            router.refresh();
          }}
          className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-300 transition hover:text-white"
        >
          Log out
        </button>
      </>
    );
  }

  return (
    <>
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
    </>
  );
}
