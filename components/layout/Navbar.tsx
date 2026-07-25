"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ArrowUpRight } from "lucide-react";
import { NAVIGATION, CTA_BUTTON } from "@/lib/navigation";
import MobileMenu from "./MobileMenu";

// Two distinct feels: collapsing (scrolling down) should feel snappy and
// near-instant. Expanding (scrolling up) keeps the original soft, gentle spring.
const collapseSpring = { type: "spring" as const, stiffness: 340, damping: 32, mass: 0.5 };
const expandSpring = { type: "spring" as const, stiffness: 130, damping: 22, mass: 0.75 };
const hoverTween = { type: "tween" as const, ease: [0.22, 1, 0.36, 1] as const };

// Fixed reference points so Framer Motion always has a concrete numeric
// value to animate FROM. Without these, the very first `animate` call on
// each element reads the browser's computed max-width, which defaults to
// the keyword "none" — and "none" isn't a value Motion can interpolate,
// which is what was throwing the "trying to animate maxWidth from none"
// console warning on every mount.
const ISLAND_MAX_WIDTH = 1160;
const TAGLINE_MAX_WIDTH = 340;

export default function Navbar() {
  const [progress, setProgress] = useState(0);
  const [collapsing, setCollapsing] = useState(true);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const previous = useRef(0);
  const islandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      // Shrunk from /170 to /90 — the pill fully minimizes within less
      // scroll distance, so it reads as "immediate" instead of lagging.
      const next = Math.min(1, Math.max(0, (window.scrollY - 60) / 90));
      if (Math.abs(next - previous.current) > 0.01) {
        setCollapsing(next > previous.current);
        previous.current = next;
      }
      setProgress(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [open]);

  // One-time entrance animation on first mount.
  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // Once fully scrolled/minimized, hovering or tapping the pill re-expands it.
  const scrolledCompact = progress > 0.98;

  useEffect(() => {
    if (!scrolledCompact) setHovered(false);
  }, [scrolledCompact]);

  useEffect(() => {
    if (!scrolledCompact) return;
    const onOutside = (e: PointerEvent) => {
      if (islandRef.current && !islandRef.current.contains(e.target as Node)) {
        setHovered(false);
      }
    };
    document.addEventListener("pointerdown", onOutside);
    return () => document.removeEventListener("pointerdown", onOutside);
  }, [scrolledCompact]);

  // effectiveProgress: what the UI actually renders — real scroll progress,
  // unless the user is hovering/touching a minimized pill, in which case it
  // snaps back toward the fully expanded (0) state.
  const effectiveProgress = scrolledCompact && hovered ? 0 : progress;
  const compact = effectiveProgress > 0.98;

  const islandWidth = ISLAND_MAX_WIDTH - 928 * effectiveProgress ** 2;

  // Scroll-driven transitions: collapse is fast with almost no delay,
  // expand keeps the original soft, staggered feel.
  const scrollTransition = (collapseDelay: number, expandDelay: number) =>
    collapsing
      ? { ...collapseSpring, delay: collapseDelay }
      : { ...expandSpring, delay: expandDelay };

  // Hover/touch re-expand transitions on an already-minimized pill use a
  // quick tween: smooth on expand, near-instant on leave.
  const getTransition = (collapseDelay: number, expandDelay: number) =>
    scrolledCompact
      ? { ...hoverTween, duration: hovered ? 0.3 : 0.15, delay: hovered ? expandDelay * 0.4 : 0 }
      : scrollTransition(collapseDelay, expandDelay);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          paddingTop: 24 - 12 * progress,
          paddingBottom: 24 - 12 * progress,
        }}
        transition={
          mounted
            ? scrollTransition(0.02, 0)
            : { type: "spring", stiffness: 120, damping: 18, mass: 0.8, delay: 0.1 }
        }
        className="fixed inset-x-0 top-0 z-[100] isolate"
      >
        <div className="mx-auto px-6 lg:px-8">
          <motion.div
            ref={islandRef}
            initial={{ maxWidth: ISLAND_MAX_WIDTH, scale: 0.97 }}
            animate={{ maxWidth: islandWidth, borderRadius: 999, scale: 1 }}
            transition={getTransition(0.02, 0)}
            onMouseEnter={() => scrolledCompact && setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTouchStart={() => scrolledCompact && setHovered((v) => !v)}
            whileTap={scrolledCompact ? { scale: 0.97 } : undefined}
            className="nav-island relative mx-auto flex h-[66px] w-full items-center justify-center overflow-hidden px-5 sm:px-6"
          >
            {/* Frosted glass backdrop — kept near-fully opaque at ALL
                scroll/hover states so nothing behind the pill can ever
                bleed through (this was the ghosted-logo bug: opacity used
                to bottom out at 0.72, translucent enough for page content
                behind the nav to show through the blur). Only a small
                amount of extra opacity/border glow is layered on for
                depth as you scroll — never enough to see through. */}
            <motion.div
              initial={{ opacity: 0.94, borderColor: "rgba(244,240,232,0.14)" }}
              animate={{
                opacity: 0.94 + effectiveProgress * 0.06,
                borderColor: `rgba(244,240,232,${0.14 + effectiveProgress * 0.1})`,
              }}
              transition={getTransition(0.01, 0.02)}
              className="absolute inset-0 rounded-full border bg-[#1A252C]/95 backdrop-blur-2xl"
            />
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 0.5 + effectiveProgress * 0.35 }}
              transition={getTransition(0.01, 0.02)}
              className="pointer-events-none absolute inset-px rounded-full border border-white/5 bg-[radial-gradient(80%_120%_at_10%_0%,rgba(244,240,232,0.08),transparent_62%)]"
            />
            {/* Subtle gold hairline glow along the bottom edge, breathes in
                a touch more once the pill is fully minimized — a small
                extra cue that this is now a "tappable" compact control. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: compact ? 0.35 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[#B7964A] to-transparent"
            />

            <motion.div
              animate={{ scale: 1 + effectiveProgress * 0.08, x: 32 * effectiveProgress, gap: `${12 - effectiveProgress * 2}px` }}
              transition={getTransition(0.02, 0.03)}
              className="absolute left-5 z-10 flex shrink-0 items-center sm:left-6"
            >
              <Link href="/" className="group flex items-center gap-3" aria-label="VISWAS home">
                <motion.div whileHover={{ rotate: 8, scale: 1.06 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                  <Image src="/logo/viswas-logo.png" alt="VISWAS" width={42} height={42} priority className="rounded-full" />
                </motion.div>
                <div className="whitespace-nowrap">
                  <h2 className="text-lg font-semibold tracking-wide text-[#F4F0E8]">VISWAS</h2>
                  {/* maxWidth clip keeps this shrinking in lockstep with the pill.
                      340px gives "STRATEGY • CAPITAL • TRANSFORMATION" full room
                      at this letter-spacing when fully expanded. */}
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

            <motion.nav
              initial={{ width: 600, opacity: 1, x: 0, scale: 1 }}
              animate={{
                width: 600 * (1 - effectiveProgress),
                opacity: 1 - effectiveProgress,
                x: -300 * (1 - effectiveProgress),
                scale: 1 - effectiveProgress * 0.06,
                gap: `${36 - effectiveProgress * 12}px`,
              }}
              transition={getTransition(0.01, 0.08)}
              style={{ pointerEvents: compact ? "none" : "auto" }}
              className="absolute left-1/2 z-10 hidden origin-center items-center overflow-hidden whitespace-nowrap lg:flex"
            >
              {NAVIGATION.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: mounted ? 0.15 + i * 0.05 : 0, duration: 0.4, ease: "easeOut" }}
                >
                  <Link href={item.href} className="group relative -translate-y-0.5 text-sm font-medium text-white/75 transition duration-300 hover:-translate-y-1 hover:text-[#F4F0E8]">
                    {item.label}
                    <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#B7964A] transition-all duration-300 ease-out group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              initial={{ width: 172, opacity: 1, scale: 1 }}
              animate={{ width: 172 * (1 - effectiveProgress), opacity: 1 - effectiveProgress, scale: 1 - effectiveProgress * 0.16 }}
              transition={getTransition(0.015, 0.045)}
              style={{ pointerEvents: compact ? "none" : "auto" }}
              className="absolute right-6 z-10 hidden origin-right overflow-hidden whitespace-nowrap lg:block"
            >
              <Link href={CTA_BUTTON.href}>
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-[#B7964A] px-6 py-3 text-sm font-semibold text-[#1A1C20] transition-shadow duration-300 hover:shadow-[0_0_35px_rgba(183,150,74,0.45)]"
                >
                  {/* Soft shimmer sweep on hover */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                  <span className="relative">{CTA_BUTTON.label}</span>
                  <ArrowUpRight size={18} className="relative transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </motion.button>
              </Link>
            </motion.div>

            <motion.button
              initial={{ width: 48, opacity: 1, scale: 1 }}
              animate={{ width: 48 * (1 - effectiveProgress), opacity: 1 - effectiveProgress, scale: 1 - effectiveProgress * 0.1 }}
              transition={getTransition(0.015, 0.045)}
              style={{ pointerEvents: compact ? "none" : "auto" }}
              onClick={() => setOpen(true)}
              whileTap={{ scale: 0.9, rotate: 90 }}
              className="absolute right-5 z-10 overflow-hidden rounded-full border border-white/10 bg-white/5 p-3 text-[#F4F0E8] backdrop-blur-md transition hover:border-[#B7964A] lg:hidden"
            >
              <Menu size={22} />
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      <AnimatePresence>{open && <MobileMenu open={open} onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}