"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Menu, ArrowUpRight } from "lucide-react";
import { NAVIGATION, CTA_BUTTON } from "@/lib/navigation";
import MobileMenu from "./MobileMenu";

/* ─────────────────────────────────────────────
   ANIMATION CONFIGURATION
   ───────────────────────────────────────────── */

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

/* ─────────────────────────────────────────────
   DESIGN TOKENS
   ───────────────────────────────────────────── */

const IVORY = "#173F38";
const GOLD = "#B7964A";

const ISLAND_MAX_WIDTH = 1160;
const TAGLINE_MAX_WIDTH = 420;
const JOURNEY_MAX_WIDTH = 140;

/* Shared focus-visible treatment for every interactive nav element,
   so keyboard users always get a visible ring in brand gold. */
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7964A] focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm";

/* ─────────────────────────────────────────────
   NAVIGATION SPLIT
   Journey is pulled out of the single NAVIGATION source of truth and
   rendered next to the wordmark instead of in the centered nav
   cluster. No duplicate arrays — MobileMenu still gets the full,
   unfiltered NAVIGATION.
   ───────────────────────────────────────────── */

const JOURNEY_ITEM = NAVIGATION.find((item) => item.href === "/#journey");
const MAIN_NAV_ITEMS = NAVIGATION.filter((item) => item !== JOURNEY_ITEM);

/* Section ids to scrollspy, derived from the same NAVIGATION source
   (no separate hardcoded list to fall out of sync). */
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
     aria-current, independent of hover. Silently does nothing on
     routes where these section ids don't exist. */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActiveSection(topMost.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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

  const handleJourneyClick = useCallback(
    (e: ReactMouseEvent<HTMLAnchorElement>) => {
      if (typeof window === "undefined") return;
      if (window.location.pathname !== "/") return;

      const target = document.getElementById("journey");
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
      window.history.pushState(null, "", "/#journey");
      setActiveSection("journey");
    },
    [prefersReducedMotion]
  );

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

            {/* ── Logo + Wordmark + Journey ── */}
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
                    src="/logo/viswas-logo.png"
                    alt="VISWAS"
                    width={42}
                    height={42}
                    priority
                    className="rounded-full"
                  />
                </motion.div>

                <div className="whitespace-nowrap">
                  {/* ── Name row: VISWAS wordmark + Journey, same baseline ── */}
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

                    {/* ── Journey, immediately right of "VISWAS" ── */}
                    {JOURNEY_ITEM &&
                      (() => {
                        const journeyId = sectionIdFromHref(JOURNEY_ITEM.href);
                        const isActive = journeyId !== null && activeSection === journeyId;
                        const isHighlighted = hoveredNav === JOURNEY_ITEM.label || isActive;

                        return (
                          <motion.div
                            initial={{ maxWidth: JOURNEY_MAX_WIDTH, opacity: 1, marginLeft: 14 }}
                            animate={{
                              maxWidth: JOURNEY_MAX_WIDTH * (1 - effectiveProgress),
                              opacity: 1 - effectiveProgress,
                              marginLeft: 14 * (1 - effectiveProgress),
                            }}
                            transition={getTransition(0, 0.14)}
                            style={{ pointerEvents: compact ? "none" : "auto" }}
                            className="hidden items-center self-stretch overflow-hidden sm:flex"
                          >
                            <span
                              aria-hidden="true"
                              className="mr-3 h-4 w-px shrink-0"
                              style={{ backgroundColor: "rgba(23,63,56,0.16)" }}
                            />
                            <Link
                              href={JOURNEY_ITEM.href}
                              onClick={handleJourneyClick}
                              onMouseEnter={() => setHoveredNav(JOURNEY_ITEM.label)}
                              onMouseLeave={() =>
                                setHoveredNav((v) => (v === JOURNEY_ITEM.label ? null : v))
                              }
                              aria-current={isActive ? "page" : undefined}
                              className={`relative shrink-0 whitespace-nowrap ${FOCUS_RING}`}
                            >
                              <motion.span
                                animate={{ color: isHighlighted ? GOLD : IVORY }}
                                transition={COLOR_TRANSITION}
                                className="block text-[11px] font-semibold uppercase tracking-[0.28em]"
                              >
                                {JOURNEY_ITEM.label}
                              </motion.span>
                              <motion.span
                                animate={{ width: isHighlighted ? "100%" : "0%" }}
                                transition={COLOR_TRANSITION}
                                className="absolute -bottom-1.5 left-0 h-px"
                                style={{ backgroundColor: GOLD }}
                              />
                            </Link>
                          </motion.div>
                        );
                      })()}
                  </div>

                  {/* ── Tagline, full width, below the VISWAS + Journey row ── */}
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
                    <p className="whitespace-nowrap text-[11px] uppercase tracking-[0.34em] text-[#B7964A]">
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
              className="absolute left-[56%] z-10 hidden origin-center items-center whitespace-nowrap lg:flex"
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
                      <Link
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
                      </Link>
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
              <Link href={CTA_BUTTON.href} className={FOCUS_RING}>
                <motion.button
                  onHoverStart={() => setCtaHovered(true)}
                  onHoverEnd={() => setCtaHovered(false)}
                  animate={{
                    backgroundColor: "#B7964A",
                  }}
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
                    animate={{
                      x: ctaHovered ? 3 : 0,
                      y: ctaHovered ? -3 : 0,
                    }}
                    transition={{ type: "spring" as const, stiffness: 340, damping: 24 }}
                    className="relative z-10 flex"
                  >
                    <ArrowUpRight size={18} />
                  </motion.span>
                </motion.button>
              </Link>
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
              whileTap={{ scale: 0.9, rotate: 90 }}
              whileHover={{ borderColor: GOLD, opacity: 1 }}
              aria-label="Open menu"
              aria-haspopup="true"
              aria-expanded={menuOpen}
              className={`absolute right-5 z-10 flex rounded-full border border-[#173F38]/8 bg-white p-3 text-[#071F2D] backdrop-blur-md lg:hidden ${FOCUS_RING}`}
            >
              <Menu size={22} />
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}