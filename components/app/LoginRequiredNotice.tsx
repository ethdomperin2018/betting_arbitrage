import Link from "next/link";

type LoginRequiredNoticeProps = {
  feature: string;
  returnTo?: string;
};

export function LoginRequiredNotice({ feature, returnTo }: LoginRequiredNoticeProps) {
  const loginHref = returnTo
    ? `/login?next=${encodeURIComponent(returnTo)}`
    : "/login";

  return (
    <div
      className="rounded-xl border border-amber-900/40 bg-amber-950/25 px-6 py-10 text-center sm:px-10"
      role="status"
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-amber-800/50 bg-amber-950/60">
        <svg
          className="h-6 w-6 text-amber-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      </div>
      <h2 className="mt-5 font-display text-xl font-semibold text-white sm:text-2xl">
        Log in to use {feature}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
        Sign in to unlock this section. Demo mode accepts any username and password.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href={loginHref}
          className="btn-primary w-full rounded-md px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-white sm:w-auto"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="w-full rounded-md border border-white/15 px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-zinc-200 transition hover:border-white/30 hover:text-white sm:w-auto"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
