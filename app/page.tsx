import { Hero } from "@/components/marketing/Hero";
import { StatsStrip } from "@/components/marketing/StatsStrip";
import { SportsbooksBar } from "@/components/marketing/SportsbooksBar";
import { Features } from "@/components/marketing/Features";
import { ProductVisuals } from "@/components/marketing/ProductVisuals";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { PricingSection } from "@/components/marketing/PricingSection";
import { FaqSection } from "@/components/marketing/FaqSection";
import { CtaBanner } from "@/components/marketing/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <SportsbooksBar />
      <Features />
      <ProductVisuals />
      <HowItWorks />
      <PricingSection />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
