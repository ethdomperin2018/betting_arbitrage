"use client";

import Image from "next/image";
import { useState } from "react";
import { getBookBrand } from "@/lib/bookmakerBranding";
import { getBookLogoPath } from "@/lib/bookmakerLogos";

interface BookLogoProps {
  bookKey: string;
  bookTitle: string;
  size?: number;
  className?: string;
}

export function BookLogo({
  bookKey,
  bookTitle,
  size = 28,
  className = "",
}: BookLogoProps) {
  const brand = getBookBrand(bookKey, bookTitle);
  const logoPath = getBookLogoPath(bookKey);
  const [failed, setFailed] = useState(false);

  if (logoPath && !failed) {
    return (
      <span
        className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-white ring-1 ring-white/15 ${className}`}
        style={{ width: size, height: size }}
        title={bookTitle}
      >
        <Image
          src={logoPath}
          alt={`${bookTitle} logo`}
          width={size}
          height={size}
          className="object-contain p-0.5"
          onError={() => setFailed(true)}
        />
      </span>
    );
  }

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
