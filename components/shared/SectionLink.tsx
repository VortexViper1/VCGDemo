"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useSectionNav } from "@/hooks/useSectionNav";

interface SectionLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> {
  href: string;
  children: ReactNode;
  /** Fired after navigation is dispatched — e.g. MobileMenu closing itself. */
  onNavigate?: () => void;
}

/**
 * Drop-in replacement for next/link, used ONLY for the six scrollspy
 * section links in Navbar/Footer/MobileMenu. Renders the exact same
 * <a> via next/link — same className, same children, same aria/data
 * attributes via `...rest` — so visual output is byte-for-byte
 * unchanged. The only difference is the click is routed through the
 * single centralized navigation hook instead of the browser's/Next's
 * default hash handling, which is what was causing wrong-section
 * jumps, double-click requirements, and hash pollution.
 *
 * Intentionally NOT used for the CTA button — that's left exactly as
 * it was, per the request to leave CTA untouched.
 */
export default function SectionLink({
  href,
  children,
  onNavigate,
  ...rest
}: SectionLinkProps) {
  const { goToSection } = useSectionNav();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (open in new tab, etc.) behave natively.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    goToSection(href);
    onNavigate?.();
  };

  return (
    <Link href={href} scroll={false} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}