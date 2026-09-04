"use client";

import { Menu } from "lucide-react";
import type { ReactNode } from "react";
import { useNavigation } from "./navigation-context";
import BrandMark from "./BrandMark";

export default function Header({
  homeHref,
  tagline,
  children,
}: {
  homeHref: string;
  tagline: string;
  children?: ReactNode;
}) {
  const { toggle } = useNavigation();

  return (
    <header className="relative z-30 flex h-16 shrink-0 items-center justify-between border-b border-[#E8E2D9] bg-[#FCFBF8] px-4 sm:h-[76px] sm:px-8">
      <BrandMark href={homeHref} tagline={tagline} />

      <div className="relative flex items-center gap-2 sm:gap-3">
        {children}

        <button
          type="button"
          onClick={toggle}
          aria-label="Open navigation"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-[#4B4A47] transition-colors duration-200 hover:bg-[#D9822B] hover:text-white active:scale-95 md:hidden"
        >
          <Menu size={20} strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}