import type { ReactNode } from "react";

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-red)]">
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-display mt-3 text-center text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl ${className}`}
    >
      {children}
    </h2>
  );
}

export function HeroGlow() {
  return (
    <>
      <div
        className="pointer-events-none absolute -right-32 top-0 h-[520px] w-[520px] rounded-full opacity-40 blur-[100px]"
        style={{ background: "var(--hero-glow)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[var(--brand-red)]/10 blur-[80px]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-grid-marketing opacity-60" aria-hidden />
    </>
  );
}
