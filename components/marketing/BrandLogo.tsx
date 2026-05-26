import Link from "next/link";

type BrandLogoProps = {
  className?: string;
  /** Larger variant for footer */
  size?: "default" | "lg";
};

export function BrandLogo({ className = "", size = "default" }: BrandLogoProps) {
  const iconSize = size === "lg" ? "h-11 w-11 text-xl" : "h-10 w-10 text-lg";
  const textSize = size === "lg" ? "text-2xl" : "text-xl";

  return (
    <Link href="/" className={`group flex items-center gap-3 ${className}`}>
      <span
        className={`relative flex ${iconSize} items-center justify-center overflow-hidden rounded-md bg-[var(--brand-red)] font-display font-bold italic text-white shadow-lg shadow-red-900/40 transition group-hover:scale-105`}
      >
        C
        <span className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent" />
      </span>
      <span
        className={`font-display ${textSize} font-bold italic uppercase tracking-wide`}
      >
        <span className="text-[var(--brand-red)]">CLUTCH</span>
        <span className="text-white"> ODDS</span>
      </span>
    </Link>
  );
}
