import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,30,30,0.2),transparent_70%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
          Ready to beat the books?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400">
          Open the arbitrage scanner, set your stake, and let the platform hunt
          mispriced moneylines while you focus on execution.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/opportunities"
            className="btn-primary rounded-md px-8 py-4 text-sm font-bold uppercase tracking-wide text-white"
          >
            Launch scanner
          </Link>
          <Link
            href="#features"
            className="rounded-md border border-white/15 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:border-white/30 hover:bg-white/5"
          >
            See features
          </Link>
        </div>
      </div>
    </section>
  );
}
