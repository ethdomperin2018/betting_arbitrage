import Link from "next/link";
import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  /** Larger variant for footer */
  size?: "default" | "lg";
};

export function BrandLogo({ className = "", size = "default" }: BrandLogoProps) {
  // Constrain width so the header doesn't push the logo toward the center.
  const wrapperSize =
    size === "lg" ? "h-20 w-[260px]" : "h-20 w-[220px]";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center ${className}`}
      aria-label="Clutch Odds home"
    >
      <span className={`relative ${wrapperSize} transition group-hover:scale-[1.02]`}>
        <Image
          src="/logo.jpg"
          alt="Clutch Odds"
          fill
          priority
          sizes="(max-width: 640px) 220px, 260px"
          className="object-contain"
        />
      </span>
    </Link>
  );
}
