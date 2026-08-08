"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Menu, ArrowUpRight } from "lucide-react";
import { NAVIGATION, CTA_BUTTON } from "@/lib/navigation";
import MobileMenu from "./MobileMenu";
import SectionLink from "@/components/shared/SectionLink";

const COLLAPSE_SPRING = {
  type: "spring" as const,
  stiffness: 380,
  damping: 32,
  mass: 0.5,
};

const EXPAND_SPRING = {
  type: "spring" as const,
  stiffness: 140,
  damping: 22,
  mass: 0.75,
};

const HOVER_TWEEN = {
  type: "tween" as const,
  ease: [0.22, 1, 0.36, 1] as const,
};

const COLOR_TRANSITION = { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const };

const IVORY = "#2A2D31";
const GOLD = "#B7964A";

const ISLAND_MAX_WIDTH = 1160;
const TAGLINE_MAX_WIDTH = 420;

/* Distance (px) from the top of the viewport that counts as the
   "active section" line for the scrollspy below. */
const SCROLLSPY_OFFSET = 120;

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7964A] focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm";

/* Journey sits deliberately between Home and Services here — this
   array's order is the single source of truth for desktop nav order. */
const MAIN_NAV_ITEMS = [
  NAVIGATION.find((item) => item.label === "Home"),
  NAVIGATION.find((item) => item.label === "Roadmap"),
  NAVIGATION.find((item) => item.label === "Services"),
  NAVIGATION.find((item) => item.label === "Why Viswas"),
  NAVIGATION.find((item) => item.label === "Insights"),
].filter((item): item is NonNullable<typeof item> => Boolean(item));

/* Section ids to scrollspy, derived from the same NAVIGATION source
   (no separate hardcoded list to fall out of sync). NOTE: this array's
   order follows NAVIGATION, not necessarily DOM order — MAIN_NAV_ITEMS
   above deliberately reorders Journey for display, so the scrollspy
   logic below must not assume this array matches document order. */
const SECTION_IDS = NAVIGATION.map((item) => item.href.split("#")[1]).filter(
  (id): id is string => Boolean(id)
);

const sectionIdFromHref = (href: string) => href.split("#")[1] ?? null;
/* ─────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────── */

export default function Navbar() {
  const prefersReducedMotion = useReducedMotion();

  const [progress, setProgress] = useState(0);
  const [collapsing, setCollapsing] = useState(true);
  const previousScroll = useRef(0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [islandHovered, setIslandHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const islandRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    const next = Math.min(1, Math.max(0, (y - 60) / 90));
    if (Math.abs(next - previousScroll.current) > 0.005) {
      setCollapsing(next > previousScroll.current);
      previousScroll.current = next;
    }
    setProgress(next);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /* ── Scrollspy: tracks which section is currently in view so nav
     items (including Journey) can highlight themselves via
     aria-current, independent of hover.

     Order-independent: on every scroll/resize we check EVERY section's
     position and pick whichever has scrolled furthest past
     SCROLLSPY_OFFSET (i.e. the largest `top` value that's still <= 0,
     meaning "most recently passed the line"). This does NOT assume
     SECTION_IDS is in DOM order — MAIN_NAV_ITEMS deliberately reorders
     Journey between Home and Services for display, so array order and
     DOM order diverge.

     Queries the DOM fresh inside updateActive() on every call, rather
     than caching a single element list at mount time. The previous
     version cached the list once and bailed out permanently if any
     section wasn't in the DOM yet on that first tick (a real risk in
     Next.js, where images/fonts/client hydration can delay a section's
     mount past this effect's first run) — that early return meant the
     scroll/resize listeners never got attached at all, leaving
     activeSection stuck. Re-querying per call makes late-mounting
     sections self-heal on the very next scroll/resize event.

     Unchanged otherwise — this never calls the navigation hook and
     never touches history, so it cannot conflict with SectionLink. */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateActive = () => {
      let current: string | null = null;
      let bestTop = -Infinity;

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.getBoundingClientRect().top - SCROLLSPY_OFFSET;
        // Only consider sections we've actually scrolled past (top <= 0),
        // and pick whichever is closest to the offset line — i.e. the
        // section most recently passed, regardless of array order.
        if (top <= 0 && top > bestTop) {
          bestTop = top;
          current = id;
        }
      }

      setActiveSection(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  const isCompact = progress > 0.98;

  useEffect(() => {
    if (!isCompact) {
      setIslandHovered(false);
      return;
    }
    const onPointer = (e: PointerEvent) => {
      if (islandRef.current && !islandRef.current.contains(e.target as Node)) {
        setIslandHovered(false);
      }
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [isCompact]);

  const effectiveProgress = isCompact && islandHovered ? 0 : progress;
  const compact = isCompact && !islandHovered;

  const islandWidth = ISLAND_MAX_WIDTH - 928 * Math.pow(effectiveProgress, 2.4);

  const scrollTransition = useCallback(
    (collapseDelay: number, expandDelay: number) =>
      collapsing
        ? { ...COLLAPSE_SPRING, delay: collapseDelay }
        : { ...EXPAND_SPRING, delay: expandDelay },
    [collapsing]
  );

  const getTransition = useCallback(
    (collapseDelay: number, expandDelay: number) => {
      if (prefersReducedMotion) return { duration: 0 };
      if (isCompact) {
        return {
          ...HOVER_TWEEN,
          duration: islandHovered ? 0.3 : 0.15,
          delay: islandHovered ? expandDelay * 0.4 : 0,
        };
      }
      return scrollTransition(collapseDelay, expandDelay);
    },
    [isCompact, islandHovered, scrollTransition, prefersReducedMotion]
  );

  const entranceTransition = mounted
    ? getTransition(0.02, 0)
    : {
        type: "spring" as const,
        stiffness: 120,
        damping: 18,
        mass: 0.8,
        delay: 0.1,
      };
  return (
    <>
      <motion.header
        initial={{
          y: prefersReducedMotion ? 0 : -60,
          opacity: prefersReducedMotion ? 1 : 0,
          scale: prefersReducedMotion ? 1 : 0.97,
          filter: prefersReducedMotion ? "blur(0px)" : "blur(8px)",
        }}
        animate={{
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          paddingTop: 24 - 12 * progress,
          paddingBottom: 24 - 12 * progress,
        }}
        transition={entranceTransition}
        style={{ willChange: "transform" }}
        className="fixed inset-x-0 top-0 z-[100] isolate"
      >
        <div className="mx-auto px-6 lg:px-8">
          {/* ── Island Pill ── */}
          <motion.div
            ref={islandRef}
            initial={{ maxWidth: ISLAND_MAX_WIDTH, scale: 0.97 }}
            animate={{
              maxWidth: islandWidth,
              borderRadius: 999,
              scale: compact ? 0.985 : 1,
            }}
            transition={getTransition(0.02, 0)}
            onMouseEnter={() => isCompact && setIslandHovered(true)}
            onMouseLeave={() => setIslandHovered(false)}
            onTouchStart={() => isCompact && setIslandHovered((v) => !v)}
            whileTap={isCompact ? { scale: 0.97 } : undefined}
            className="nav-island relative mx-auto flex h-[66px] w-full min-w-[220px] items-center justify-center overflow-visible px-5 sm:px-6"
          >
            {/* ── Frosted Glass Backdrop ── */}
            <motion.div
              initial={{
                backgroundColor: "rgba(255,255,255,1)",
                borderColor: "rgba(244,240,232,0.14)",
              }}
              animate={{
                backgroundColor: "rgba(255,255,255,1)",
                borderColor: `rgba(244,240,232,${0.14 + effectiveProgress * 0.1})`,
              }}
              transition={getTransition(0.01, 0.02)}
              style={{
                backdropFilter: `blur(${28 + effectiveProgress * 12}px) saturate(180%)`,
                WebkitBackdropFilter: `blur(${28 + effectiveProgress * 12}px) saturate(180%)`,
                borderRadius: 999,
                willChange: "backdrop-filter",
              }}
              className="absolute inset-0 border shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            />

            {/* ── Inner sheen ── */}
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 0.5 + effectiveProgress * 0.35 }}
              transition={getTransition(0.01, 0.02)}
              className="pointer-events-none absolute inset-px rounded-full border border-white/5 bg-[radial-gradient(80%_120%_at_10%_0%,rgba(244,240,232,0.08),transparent_62%)]"
            />

            {/* ── Gold hairline glow (breathing animation) ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: compact ? [0.15, 0.35, 0.15] : 0 }}
              transition={
                compact
                  ? { duration: 7, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.4, ease: "easeOut" }
              }
              className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[#B7964A] to-transparent"
            />

            {/* ── Logo + Wordmark ── */}
            <motion.div
              animate={{
                scale: 1 + effectiveProgress * 0.08,
                x: 8 * effectiveProgress,
                gap: `${12 - effectiveProgress * 2}px`,
              }}
              transition={getTransition(0.01, 0.08)}
              className="absolute left-5 z-10 flex shrink-0 items-center sm:left-6"
            >
              <Link
                href="/"
                className={`flex items-center gap-3 ${FOCUS_RING}`}
                aria-label="VISWAS home"
              >
                <motion.div
                  whileHover={{
                    rotate: 6,
                    scale: 1.08,
                    boxShadow: "0 12px 30px rgba(183,150,74,.18)",
                  }}
                  transition={{ type: "spring" as const, stiffness: 320, damping: 16 }}
                >
                  <Image
                    src="/logo/MAIN LOGO.png"
                    alt="VISWAS"
                    width={42}
                    height={42}
                    priority
                    className="rounded-full"
                  />
                </motion.div>

                <div className="whitespace-nowrap">
                  {/* ── Name row: VISWAS wordmark ── */}
                  <div className="flex items-center">
                    <motion.div
                      className="relative inline-block"
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                    >
                      <motion.h2
                        variants={{
                          rest: { color: IVORY, letterSpacing: "0.06em" },
                          hover: { color: GOLD, letterSpacing: "0.085em" },
                        }}
                        transition={COLOR_TRANSITION}
                        className="text-lg font-semibold"
                      >
                        VISWAS
                      </motion.h2>
                      <motion.span
                        variants={{ rest: { width: "0%" }, hover: { width: "100%" } }}
                        transition={COLOR_TRANSITION}
                        className="absolute -bottom-0.5 left-0 h-px"
                        style={{ backgroundColor: GOLD }}
                      />
                    </motion.div>
                  </div>

                  {/* ── Tagline, full width, below the VISWAS row ── */}
                  <motion.div
                    initial={{ maxWidth: TAGLINE_MAX_WIDTH, opacity: 1, marginTop: 2 }}
                    animate={{
                      maxWidth: TAGLINE_MAX_WIDTH * (1 - effectiveProgress),
                      opacity: 1 - effectiveProgress,
                      marginTop: 2 * (1 - effectiveProgress),
                    }}
                    transition={getTransition(0, 0.14)}
                    className="hidden overflow-hidden sm:block"
                  >
                    <p
                      className="whitespace-nowrap font-medium uppercase tracking-[0.28em] text-[#B7964A]"
                      style={{ fontSize: "15px" }}
                    >
                      Strategy • Capital • Transformation
                    </p>
                  </motion.div>
                </div>
              </Link>
            </motion.div>

            {/* ── Desktop Navigation ── */}
            <motion.nav
              initial={{ width: 600, opacity: 1, x: 0, scale: 1 }}
              animate={{
                width: 600 * (1 - effectiveProgress),
                opacity: 1 - effectiveProgress,
                x: -120 * (1 - effectiveProgress),
                scale: 1 - effectiveProgress * 0.06,
                gap: `${36 - effectiveProgress * 12}px`,
              }}
              transition={getTransition(0.01, 0.08)}
              style={{
                pointerEvents: compact ? "none" : "auto",
                overflowX: "hidden",
                overflowY: "visible",
              }}
              className="absolute left-[54%] z-10 hidden origin-center items-center whitespace-nowrap lg:flex"
            >
              {MAIN_NAV_ITEMS.map((item, i) => {
                const itemId = sectionIdFromHref(item.href);
                const isActive = itemId !== null && activeSection === itemId;
                const isHighlighted = hoveredNav === item.label || isActive;

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: mounted ? 0.15 + i * 0.05 : 0,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                  >
                    <div
                      className="relative -translate-y-0.5"
                      onMouseEnter={() => setHoveredNav(item.label)}
                      onMouseLeave={() =>
                        setHoveredNav((v) => (v === item.label ? null : v))
                      }
                    >
                      <SectionLink
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={FOCUS_RING}
                      >
                        <motion.span
                          whileHover={{ y: -2 }}
                          animate={{ color: isHighlighted ? GOLD : IVORY }}
                          transition={COLOR_TRANSITION}
                          className="block text-sm font-medium"
                        >
                          {item.label}
                        </motion.span>
                        <motion.span
                          animate={{ width: isHighlighted ? "100%" : "0%" }}
                          transition={COLOR_TRANSITION}
                          className="absolute -bottom-2 left-0 h-px"
                          style={{ backgroundColor: GOLD }}
                        />
                      </SectionLink>
                    </div>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* ── CTA Button ── */}
            <motion.div
              initial={{ width: 172, opacity: 1, scale: 1 }}
              animate={{
                width: 172 * (1 - effectiveProgress),
                opacity: 1 - effectiveProgress,
                scale: 1 - effectiveProgress * 0.16,
              }}
              transition={getTransition(0.015, 0.045)}
              style={{ pointerEvents: compact ? "none" : "auto" }}
              className="absolute right-6 z-10 hidden origin-right whitespace-nowrap lg:block"
            >
              <SectionLink href={CTA_BUTTON.href} className={FOCUS_RING}>
                <motion.button
                  onHoverStart={() => setCtaHovered(true)}
                  onHoverEnd={() => setCtaHovered(false)}
                  animate={{ backgroundColor: "#B7964A" }}
                  whileHover={{
                    y: -3,
                    scale: 1.025,
                    boxShadow:
                      "0 8px 20px rgba(183,150,74,0.28), 0 20px 40px rgba(183,150,74,0.14)",
                  }}
                  whileTap={{ scale: 0.97, y: 0 }}
                  transition={{
                    y: { type: "spring" as const, stiffness: 320, damping: 22 },
                    scale: { type: "spring" as const, stiffness: 320, damping: 22 },
                    boxShadow: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                    backgroundColor: { duration: 0 },
                  }}
                  className="relative flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-[#1A1C20]"
                  style={{ background: "#B7964A" }}
                >
                  <motion.span
                    initial={{ x: "-110%" }}
                    animate={{ x: ctaHovered ? "110%" : "-110%" }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.38) 50%, transparent 65%)",
                    }}
                  />
                  <span className="relative z-10">{CTA_BUTTON.label}</span>
                  <motion.span
                    animate={{ x: ctaHovered ? 3 : 0, y: ctaHovered ? -3 : 0 }}
                    transition={{ type: "spring" as const, stiffness: 340, damping: 24 }}
                    className="relative z-10 flex"
                  >
                    <ArrowUpRight size={18} />
                  </motion.span>
                </motion.button>
              </SectionLink>
            </motion.div>

            {/* ── Mobile Menu Button ── */}
            <motion.button
              initial={{ opacity: 1, scale: 1 }}
              animate={{
                opacity: compact ? 0.55 : 1,
                scale: 1 - effectiveProgress * 0.06,
              }}
              transition={getTransition(0.015, 0.045)}
              style={{ pointerEvents: "auto" }}
              onClick={() => setMenuOpen(true)}
              whileTap={{ scale: 0.9, rotate: 90, backgroundColor: "#D9822B", color: "#FFFFFF" }}
              whileHover={{ opacity: 1, backgroundColor: "#D9822B", color: "#FFFFFF" }}
              aria-label="Open menu"
              aria-haspopup="true"
              aria-expanded={menuOpen}
              className={`absolute right-5 z-10 flex rounded-full border border-[#2A2D31]/8 bg-white p-3 text-[#23272B] backdrop-blur-md transition-colors duration-300 lg:hidden ${FOCUS_RING}`}
            >
              <Menu size={22} />
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}