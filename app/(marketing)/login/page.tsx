import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

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
            <p className="mt-2 text-center text-sm text-zinc-500">
              Demo login — any username and password works.
            </p>
            <Suspense fallback={<p className="mt-5 text-center text-sm text-zinc-500">Loading…</p>}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
