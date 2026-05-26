import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="marketing-page flex min-h-full flex-col bg-black text-white selection:bg-[var(--brand-red)]/30 selection:text-white">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
