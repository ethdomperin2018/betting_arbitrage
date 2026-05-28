import { SiteChrome } from "@/components/marketing/SiteChrome";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteChrome>{children}</SiteChrome>;
}
