"use client";

import { useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

/**
 * Single source of truth for all in-page section navigation
 * (Navbar, Footer, MobileMenu all call this — nothing else does).
 *
 *  - Already on "/": scroll directly to the element. No hash is ever
 *    written, so there's nothing for the URL to "get stuck" on, and
 *    every click re-runs the scroll regardless of current URL state
 *    (this is what fixes "requires multiple clicks" — next/link was
 *    silently no-op'ing repeat navigations to a URL it's already at).
 *
 *  - On any other route: push "/#id". HashScroll (mounted once in
 *    the root layout) picks this up after Home renders, performs the
 *    single scroll, then strips the hash. This hook never scrolls
 *    directly in that case — only HashScroll does, so there is never
 *    a race between two things trying to scroll at once.
 *
 * Scrollspy (in Navbar) intentionally never calls this hook and never
 * touches history — it only reads scroll position to set local state.
 */
export function useSectionNav() {
  const router = useRouter();
  const pathname = usePathname();

  const goToSection = useCallback(
    (href: string) => {
      const id = href.split("#")[1];

      // Not a section link (no hash) — ordinary navigation.
      if (!id) {
        router.push(href);
        return;
      }

      if (pathname === "/") {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      }

      router.push(`/#${id}`);
    },
    [pathname, router]
  );

  return { goToSection };
}