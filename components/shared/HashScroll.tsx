"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Retries at 50ms so this survives sections that mount slightly late
// (e.g. behind a loading state) without needing a fixed guess-timer.
const RETRY_INTERVAL_MS = 50;
const MAX_ATTEMPTS = 30; // ~1.5s ceiling

/**
 * Mounted once in the root layout. This is the ONLY place in the app
 * that ever performs a cross-page section scroll or clears a hash
 * from the URL — SectionLink hands off to it via router.push("/#id")
 * when navigating from another route.
 *
 * Fires whenever `pathname` becomes "/" AND the URL currently carries
 * a hash. That's the only guard needed: `[pathname]` already ensures
 * this doesn't re-run on unrelated re-renders (a plain re-render never
 * changes pathname), and checking `hash` fresh — instead of caching
 * "already handled this hash" across the component's lifetime — means
 * navigating to the SAME section twice in one session (e.g. Journey,
 * then something else, then Journey again) always scrolls, instead of
 * silently no-op'ing the second time.
 */
export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.slice(1);
    let attempts = 0;
    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout>;

    const tryScroll = () => {
      if (cancelled) return;

      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });

        // Give the smooth scroll a moment to actually start before
        // stripping the hash — clearing it doesn't affect an
        // already-started scrollIntoView, but avoids the hash flicker
        // being visible before motion begins.
        window.setTimeout(() => {
          if (!cancelled) history.replaceState(null, "", pathname);
        }, 500);
        return;
      }

      attempts += 1;
      if (attempts < MAX_ATTEMPTS) {
        retryTimer = setTimeout(tryScroll, RETRY_INTERVAL_MS);
      }
    };

    tryScroll();

    return () => {
      cancelled = true;
      clearTimeout(retryTimer);
    };
  }, [pathname]);

  return null;
}