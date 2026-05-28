export function AppPageHeader({
  title,
  badge,
  description,
  children,
}: {
  title: string;
  badge?: string | number;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="mb-8 border-b border-zinc-800 pb-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {title}
        </h1>
        {badge != null && (
          <span className="rounded bg-[var(--brand-red)] px-2 py-0.5 text-xs font-bold text-white">
            {badge}
          </span>
        )}
      </div>
      {description && (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
          {description}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </header>
  );
}
