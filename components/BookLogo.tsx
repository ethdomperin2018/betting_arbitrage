"use client";

import { getBookBrand } from "@/lib/bookmakerBranding";

interface BookLogoProps {
  bookKey: string;
  bookTitle: string;
  size?: number;
  className?: string;
}

/**
 * Colored badge with initials (brand-adjacent colors, not official logos).
 * To use real mark assets later, add `/public/bookmakers/{bookKey}.svg` and
 * extend this component to prefer `<img>` with onError fallback to the badge.
 */
export function BookLogo({
  bookKey,
  bookTitle,
  size = 28,
  className = "",
}: BookLogoProps) {
  const brand = getBookBrand(bookKey, bookTitle);

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-md text-[9px] font-bold uppercase leading-none ring-1 ring-white/15 ${className}`}
      title={bookTitle}
      style={{
        width: size,
        height: size,
        backgroundColor: brand.bg,
        color: brand.fg,
      }}
    >
      {brand.short}
    </span>
  );
}
