import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="relative flex min-h-[calc(100dvh-24rem)] items-center py-6 sm:py-8">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,30,30,0.12),transparent_55%)]"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-xl px-4 sm:px-6">
        <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/70 p-4 backdrop-blur-sm md:p-6">
          <div className="rounded-xl border border-white/[0.08] bg-zinc-900/50 p-6">
            <h1 className="font-display text-center text-3xl font-semibold tracking-tight text-white">
              Log in to Clutch Odds
            </h1>
            <button
              type="button"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-md border border-white/15 bg-black/40 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/5"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                <path
                  fill="#4285F4"
                  d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.29h6.46a5.52 5.52 0 01-2.4 3.63v3.02h3.88c2.27-2.09 3.55-5.17 3.55-8.67z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.07 7.94-2.9l-3.88-3.02c-1.07.72-2.44 1.15-4.06 1.15-3.12 0-5.76-2.1-6.7-4.93H1.3v3.1A12 12 0 0012 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.3 14.3A7.2 7.2 0 015.02 12c0-.8.14-1.57.38-2.3V6.6H1.3A12 12 0 000 12c0 1.94.46 3.78 1.3 5.4l4-3.1z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.77c1.76 0 3.34.6 4.58 1.78l3.43-3.43A11.97 11.97 0 0012 0 12 12 0 001.3 6.6l4.1 3.1c.93-2.84 3.57-4.93 6.6-4.93z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-500">
                or
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <form className="space-y-4" action="#" method="post">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@email.com"
                  className="w-full rounded-md border border-white/10 bg-black/60 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[var(--brand-red)]"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Password
                </span>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-md border border-white/10 bg-black/60 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[var(--brand-red)]"
                />
              </label>
              <button
                type="submit"
                className="btn-primary mt-2 w-full rounded-md px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white"
              >
                Log in
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-zinc-500">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-medium text-white hover:text-[var(--brand-red)]">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
