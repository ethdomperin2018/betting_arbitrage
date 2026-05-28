const STATS = [
  { value: "4", label: "Major leagues" },
  { value: "8+", label: "US sportsbooks" },
  { value: "Auto", label: "Scheduled refresh" },
  { value: "ROI %", label: "Stake split built-in" },
];

export function StatsStrip() {
  return (
    <section className="relative border-b border-white/[0.06] bg-[var(--surface)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-red)]/50 to-transparent" />
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/[0.06] md:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="px-6 py-10 text-center sm:px-8 sm:py-12"
          >
            <p className="font-display text-4xl font-bold text-white sm:text-5xl">
              {s.value}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
