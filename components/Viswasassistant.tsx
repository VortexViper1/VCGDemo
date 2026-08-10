"use client";

// components/shared/ViswasConcierge.tsx
//
// The VISWAS Digital Concierge — a signature floating interaction for
// the VISWAS Consulting Group website. Predefined Q&A only, presented
// as an editorial glass instrument rather than a chat widget.
//
// Mount once, globally:
//
//   import ViswasConcierge from "@/components/shared/ViswasConcierge";
//   ...
//   <body>
//     {children}
//     <ViswasConcierge />
//   </body>
//
// INTEGRATION NOTES (read before shipping)
// ------------------------------------------------------------------
// This file is self-contained on purpose — it ships its own aurora /
// grain / reflection styles via a scoped <style> tag so it drops into
// any Next.js + Tailwind + Framer Motion project without touching
// tailwind.config or globals.css. Two things to reconcile with the
// real VISWAS codebase before calling this "done":
//
//   1. Logo — pass `logoSrc` (path to the existing mark, ideally an
//      ivory/amber SVG) so the launcher and header use the real
//      brand asset instead of the diamond monogram fallback below.
//   2. Type — if VISWAS already has a display serif loaded via
//      next/font, swap the `font-[--vc-display]` utility usages for
//      that font's className instead of the system serif stack
//      defined in the <style> block.
//
// DESIGN NOTE — "thick shade" pass
// ------------------------------------------------------------------
// The original panel used a thin, highly translucent glass (0.74
// alpha, heavy blur, faint borders) that washed out against busy
// page backgrounds and read as flimsy in review. This revision moves
// to a denser, more opaque glass (0.94/0.90 alpha), a stronger amber
// edge, and a richer graphite→navy gradient underlay, while keeping
// the same aurora/grain/sweep texture system so the surface still
// feels alive rather than flat. Motion timings were also normalized
// onto a single easing curve and a shared duration scale so every
// transition in the panel reads as one coordinated sequence instead
// of independently-tuned pieces.
//
// DESIGN NOTE — navbar clearance
// ------------------------------------------------------------------
// The panel no longer runs the full viewport height. It now starts
// `navbarOffset` px down from the top (default 96, matching a typical
// fixed navbar) and fills to the bottom of the viewport, so the site
// navbar stays visible and clickable above it instead of being
// covered edge-to-edge. Pass the real measured height of your navbar,
// e.g. <ViswasConcierge navbarOffset={88} />, if 96 doesn't match.
// ------------------------------------------------------------------

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { CONCIERGE_ENTRIES, type ConciergeEntry } from "@/lib/viswas-assistant-data";

type PanelView = "welcome" | "answer";

interface ViswasConciergeProps {
  /** Path to the existing VISWAS mark (square SVG/PNG). Falls back to a diamond monogram. */
  logoSrc?: string;
  /** Text shown in the launcher. */
  launcherLabel?: string;
  /**
   * Height (px) of the site navbar the panel must clear. The panel is
   * pinned to the right edge starting just below this line and fills
   * down to the bottom of the viewport, so the navbar stays clickable
   * underneath it instead of being covered top-to-bottom.
   */
  navbarOffset?: number;
}

/** Single shared easing curve — every transition in the component reads off this. */
const EASE = [0.22, 1, 0.36, 1] as const;

/** Shared duration scale so timings stay proportionate instead of ad hoc. */
const DUR = {
  instant: 0.15,
  fast: 0.3,
  base: 0.4,
  slow: 0.5,
} as const;

const SHELL_SPRING = { type: "spring" as const, stiffness: 280, damping: 30, mass: 0.9 };

/** Splits an answer into short word-groups so it can reveal in editorial bursts rather than one flat block. */
function toWordGroups(text: string, groupSize = 3): string[] {
  const words = text.split(" ");
  const groups: string[] = [];
  for (let i = 0; i < words.length; i += groupSize) {
    groups.push(words.slice(i, i + groupSize).join(" "));
  }
  return groups;
}

function Mark({ logoSrc, className }: { logoSrc?: string; className?: string }) {
  if (logoSrc) {
    return <Image src={logoSrc} alt="" width={18} height={18} className={className} />;
  }
  return <span aria-hidden className={["vc-mark", className].filter(Boolean).join(" ")} />;
}

export default function ViswasConcierge({
  logoSrc,
  launcherLabel = "Ask VISWAAS",
  navbarOffset = 96,
}: ViswasConciergeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [view, setView] = useState<PanelView>("welcome");
  const [activeEntry, setActiveEntry] = useState<ConciergeEntry | null>(null);

  const launcherRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const headingId = useId();
  const subheadingId = useId();

  const prefersReducedMotion = useReducedMotion();
  const shellTransition = prefersReducedMotion ? { duration: DUR.instant } : SHELL_SPRING;

  const panelVisible = isOpen && !isMinimized;

  const wordGroups = useMemo(
    () => (activeEntry ? toWordGroups(activeEntry.answer) : []),
    [activeEntry]
  );

  const open = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const close = () => {
    setIsOpen(false);
    setIsMinimized(false);
    window.setTimeout(() => {
      setView("welcome");
      setActiveEntry(null);
    }, 260);
    launcherRef.current?.focus();
  };

  const minimize = () => {
    setIsMinimized(true);
    launcherRef.current?.focus();
  };

  const selectEntry = (entry: ConciergeEntry) => {
    setActiveEntry(entry);
    setView("answer");
  };

  const backToQuestions = () => {
    setView("welcome");
    setActiveEntry(null);
  };

  useEffect(() => {
    if (!panelVisible) return;
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [panelVisible]);

  useEffect(() => {
    if (panelVisible) {
      const t = window.setTimeout(() => closeRef.current?.focus(), 180);
      return () => window.clearTimeout(t);
    }
  }, [panelVisible]);

  const onLauncherKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  return (
    <div className="vc-root pointer-events-none fixed inset-0 z-[70]">
      <style>{VC_STYLES}</style>

      {/* ---------------------------------------------------------------- */}
      {/* Launcher                                                         */}
      {/* ---------------------------------------------------------------- */}
      <div className="pointer-events-none fixed bottom-7 right-7 z-[71]">
        <AnimatePresence>
          {!panelVisible && (
            <motion.button
              ref={launcherRef}
              layoutId="vc-shell"
              layout
              key="launcher"
              type="button"
              onClick={open}
              onKeyDown={onLauncherKeyDown}
              aria-haspopup="dialog"
              aria-expanded={panelVisible}
              aria-label={`${launcherLabel} — open the VISWAAS digital concierge`}
              className="vc-glass vc-launcher pointer-events-auto group relative flex items-center gap-2.5 overflow-hidden rounded-full px-4 py-3"
              initial={{ opacity: 0, y: 10, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={shellTransition}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.025 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              <span className="vc-aurora" aria-hidden />
              <span className="vc-grain" aria-hidden />
              <span className="vc-sweep" aria-hidden />

              <Mark logoSrc={logoSrc} className="vc-mark--launcher relative z-10 shrink-0" />

              <span className="relative z-10 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--vc-ivory)]">
                {launcherLabel}
              </span>

              <ArrowUpRight
                aria-hidden
                className="relative z-10 h-3.5 w-3.5 shrink-0 text-[color:var(--vc-amber)] transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.button>
          )}
        </AnimatePresence>

        {isOpen && isMinimized && (
          <motion.button
            key="minimized"
            type="button"
            onClick={open}
            className="vc-glass pointer-events-auto relative flex items-center gap-2 overflow-hidden rounded-full px-4 py-2.5"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shellTransition}
          >
            <span className="vc-aurora" aria-hidden />
            <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-[color:var(--vc-amber)]" />
            <span className="relative z-10 text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--vc-ivory)]">
              VISWAAS
            </span>
          </motion.button>
        )}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Panel                                                            */}
      {/* ---------------------------------------------------------------- */}
     <AnimatePresence>
  {panelVisible && (
    <motion.div
  key="panel"
  role="dialog"
  aria-modal="true"
  aria-labelledby={headingId}
  aria-describedby={subheadingId}
  initial={{ opacity: 0, x: "100%" }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: "100%" }}
  transition={{
    duration: prefersReducedMotion ? 0.15 : 0.45,
    ease: EASE,
  }}
  style={{
    position: "fixed",
    top: navbarOffset,
    right: 0,
    left: "auto",
    bottom: 0,
    width: "420px",
    height: `calc(100vh - ${navbarOffset}px)`,
    zIndex: 70,
  }}
  className="vc-glass vc-panel pointer-events-auto flex flex-col overflow-hidden rounded-l-[28px]"
>
            <span className="vc-aurora vc-aurora--panel" aria-hidden />
            <span className="vc-grain" aria-hidden />
            <span className="vc-sweep vc-sweep--slow" aria-hidden />
            <span className="vc-edge" aria-hidden />

            {/* Header */}
            <div className="relative z-10 flex shrink-0 items-start justify-between gap-3 px-6 pb-5 pt-6">
              <div className="flex items-center gap-2.5">
                <Mark logoSrc={logoSrc} className="vc-mark--header shrink-0" />
                <div className="leading-tight">
                  <p
                    id={headingId}
                    className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[color:var(--vc-ivory)]"
                  >
                    VISWAAS
                  </p>
                  <p
                    id={subheadingId}
                    className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-[color:var(--vc-ivory)]/45"
                  >
                    Digital Concierge
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button ref={closeRef} type="button" onClick={close} aria-label="Close" className="vc-icon-btn">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="relative z-10 flex-1 overflow-y-auto px-6 pb-6">
              <AnimatePresence mode="wait">
                {view === "welcome" && (
                  <motion.div
                    key="welcome"
                    initial={{ opacity: 0, x: "6%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "-4%" }}
                    transition={{ duration: prefersReducedMotion ? 0 : DUR.fast, ease: EASE }}
                  >
                    <motion.h2
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0 : DUR.base, ease: EASE }}
                      className="vc-display text-[26px] leading-[1.15] "
                      style={{color:"white"}}
                    >
                      How can we help?
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : DUR.base,
                        delay: prefersReducedMotion ? 0 : 0.06,
                        ease: EASE,
                      }}
                      className="mt-2.5 max-w-[30ch] text-[13px] leading-relaxed text-[color:var(--vc-ivory)]/55"
                    >
                      Explore a few questions we frequently hear from leadership teams.
                    </motion.p>

                    <ul className="mt-8">
                      {CONCIERGE_ENTRIES.map((entry, i) => (
                        <motion.li
                          key={entry.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{
                            duration: prefersReducedMotion ? 0 : DUR.base,
                            delay: prefersReducedMotion ? 0 : 0.14 + i * 0.045,
                            ease: EASE,
                          }}
                          className="vc-row-wrap"
                        >
                          <button
                            type="button"
                            onClick={() => selectEntry(entry)}
                            className="vc-row group flex w-full items-start gap-3 py-3.5 text-left"
                          >
                            <span className="vc-row-index mt-0.5 shrink-0 text-[11px] font-medium tabular-nums text-[color:var(--vc-amber)]">
                              {entry.id}
                            </span>
                            <span className="flex-1 text-[13.5px] leading-snug text-[color:var(--vc-ivory)]/85 transition-colors duration-300 group-hover:text-[color:var(--vc-ivory)]">
                              {entry.question}
                            </span>
                            <ArrowUpRight className="vc-row-arrow mt-0.5 h-3.5 w-3.5 shrink-0 text-[color:var(--vc-amber)]" />
                          </button>
                          <span className="vc-row-rule" aria-hidden />
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {view === "answer" && activeEntry && (
                  <motion.div
                    key={`answer-${activeEntry.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: prefersReducedMotion ? 0 : DUR.instant } }}
                    transition={{ duration: prefersReducedMotion ? 0 : DUR.fast, ease: EASE }}
                  >
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0 : DUR.base, ease: EASE }}
                      className="flex items-start gap-3 pt-2"
                    >
                      <span className="mt-0.5 shrink-0 text-[11px] font-medium tabular-nums text-[color:var(--vc-amber)]">
                        {activeEntry.id}
                      </span>
                      <p className="text-[15px] font-medium leading-snug text-[color:var(--vc-ivory)]">
                        {activeEntry.question}
                      </p>
                    </motion.div>

                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : DUR.slow,
                        delay: prefersReducedMotion ? 0 : 0.12,
                        ease: EASE,
                      }}
                      className="vc-draw-line mt-5 block h-px w-full origin-left"
                    />

                    <div className="mt-5 flex items-center gap-2">
                      <Mark logoSrc={logoSrc} className="vc-mark--answer shrink-0" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--vc-amber)]">
                        VISWAAS
                      </span>
                    </div>

                    <p className="mt-3 text-[15px] leading-[1.7] text-[color:var(--vc-ivory)]/90">
                      {prefersReducedMotion
                        ? activeEntry.answer
                        : wordGroups.map((group, i) => (
                            <motion.span
                              key={`${activeEntry.id}-${i}`}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: DUR.base, delay: 0.24 + i * 0.05, ease: EASE }}
                              className="inline-block"
                            >
                              {group}
                              {i < wordGroups.length - 1 ? "\u00A0" : ""}
                            </motion.span>
                          ))}
                    </p>

                    <motion.button
                      type="button"
                      onClick={backToQuestions}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : DUR.base,
                        delay: prefersReducedMotion ? 0 : 0.24 + wordGroups.length * 0.05 + 0.2,
                      }}
                      className="vc-back mt-7 inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.1em] text-[color:var(--vc-ivory)]/55"
                    >
                      <span aria-hidden className="vc-back-arrow">←</span>
                      Explore another question
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scoped styles — thick-shade glass, grain, reflection sweep, edge   */
/* ------------------------------------------------------------------ */
const VC_STYLES = `
.vc-root {
  --vc-graphite: #1C1C1C;
  --vc-navy: #071F2D;
  --vc-amber: #C9A35F;
  --vc-ivory: #F7F4EE;
  --vc-display: ui-serif, Georgia, "Times New Roman", serif;
}

.vc-display { font-family: var(--vc-display); font-weight: 500; letter-spacing: -0.01em; }

/* Thick-shade glass: near-opaque graphite/navy body instead of the
   previous 0.74-alpha wash, so the surface reads as solid material
   rather than a faint overlay against whatever sits behind it. */
.vc-glass {
  position: relative;
  background:
    radial-gradient(circle at 88% 4%, rgba(201,163,95,0.14), transparent 42%),
    radial-gradient(circle at 4% 98%, rgba(7,31,45,0.85), transparent 60%),
    linear-gradient(165deg, rgba(20,20,20,0.97) 0%, rgba(12,12,12,0.97) 100%);
  backdrop-filter: blur(22px) saturate(140%);
  -webkit-backdrop-filter: blur(22px) saturate(140%);
  border: 1px solid rgba(201,163,95,0.24);
  box-shadow:
    0 28px 70px -14px rgba(0,0,0,0.65),
    0 4px 14px rgba(0,0,0,0.4),
    inset 0 1px 0 rgba(247,244,238,0.07);
}

.vc-launcher { transition: box-shadow 300ms ease, border-color 300ms ease; }
.vc-launcher:hover {
  border-color: rgba(201,163,95,0.44);
  box-shadow: 0 28px 70px -14px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,163,95,0.14);
}
.vc-panel {
  will-change: transform, opacity;
  left: auto !important;
  right: 0 !important;
}

.vc-edge {
  position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 1;
  box-shadow: inset 0 0 0 1px rgba(201,163,95,0.14), inset 0 1px 0 rgba(247,244,238,0.06);
}

/* Aurora: slow, atmospheric drift, still visible against the denser body */
.vc-aurora {
  position: absolute; inset: -20%; z-index: 0; pointer-events: none;
  background:
    radial-gradient(38% 32% at 82% 12%, rgba(201,163,95,0.20), transparent 70%),
    radial-gradient(46% 40% at 8% 92%, rgba(7,31,45,0.7), transparent 70%);
  filter: blur(30px);
  animation: vc-aurora-drift 26s ease-in-out infinite alternate;
}
.vc-aurora--panel {
  background:
    radial-gradient(34% 28% at 88% 8%, rgba(201,163,95,0.18), transparent 72%),
    radial-gradient(50% 42% at 4% 100%, rgba(7,31,45,0.75), transparent 72%),
    radial-gradient(30% 24% at 50% 50%, rgba(201,163,95,0.04), transparent 80%);
}
@keyframes vc-aurora-drift {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  50%  { transform: translate3d(-2%, 1.5%, 0) scale(1.04); }
  100% { transform: translate3d(1.5%, -1%, 0) scale(1.02); }
}

/* Grain: subtle, breaks up the flatness of the denser blur */
.vc-grain {
  position: absolute; inset: 0; z-index: 1; pointer-events: none; opacity: 0.06; mix-blend-mode: overlay; border-radius: inherit;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
}

/* Reflection sweep: a soft diagonal band that passes very occasionally */
.vc-sweep {
  position: absolute; inset: 0; z-index: 1; pointer-events: none; overflow: hidden; border-radius: inherit;
}
.vc-sweep::after {
  content: ""; position: absolute; top: -40%; bottom: -40%; left: -30%; width: 24%;
  background: linear-gradient(115deg, transparent, rgba(247,244,238,0.06) 45%, rgba(201,163,95,0.06) 55%, transparent);
  transform: translateX(-60%) rotate(6deg);
  animation: vc-sweep-move 9s ease-in-out infinite;
}
.vc-sweep--slow::after { animation-duration: 16s; }
@keyframes vc-sweep-move {
  0%, 62% { transform: translateX(-60%) rotate(6deg); opacity: 0; }
  74% { opacity: 1; }
  86%, 100% { transform: translateX(480%) rotate(6deg); opacity: 0; }
}

.vc-mark {
  display: inline-block; width: 9px; height: 9px;
  background: linear-gradient(135deg, var(--vc-amber), rgba(201,163,95,0.4));
  transform: rotate(45deg);
  box-shadow: 0 0 8px rgba(201,163,95,0.4);
}
.vc-mark--launcher { width: 8px; height: 8px; }
.vc-mark--header { width: 9px; height: 9px; }
.vc-mark--answer { width: 6px; height: 6px; }

.vc-icon-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 28px; height: 28px; border-radius: 9999px; color: rgba(247,244,238,0.6);
  transition: background-color 200ms ease, color 200ms ease, transform 150ms ease;
}
.vc-icon-btn:hover { background: rgba(247,244,238,0.08); color: var(--vc-ivory); }
.vc-icon-btn:active { transform: scale(0.92); }
.vc-icon-btn:focus-visible { outline: 2px solid rgba(201,163,95,0.6); outline-offset: 2px; }

.vc-row-wrap { position: relative; }
.vc-row { position: relative; z-index: 1; transition: transform 320ms cubic-bezier(0.22,1,0.36,1); }
.vc-row:hover { transform: translateX(3px); }
.vc-row:focus-visible { outline: none; }
.vc-row:focus-visible .vc-row-index { color: var(--vc-amber); }
.vc-row-arrow { transition: transform 320ms cubic-bezier(0.22,1,0.36,1), opacity 320ms ease; opacity: 0.55; }
.vc-row:hover .vc-row-arrow { transform: translate(3px, -3px); opacity: 1; }
.vc-row-rule { display: block; height: 1px; background: rgba(247,244,238,0.12); transition: background-color 320ms ease; }
.vc-row-wrap:hover .vc-row-rule { background: rgba(201,163,95,0.4); }

.vc-draw-line { background: linear-gradient(90deg, var(--vc-amber), rgba(201,163,95,0.06)); }

.vc-back { transition: color 250ms ease; }
.vc-back:hover { color: var(--vc-amber); }
.vc-back-arrow { display: inline-block; transition: transform 250ms cubic-bezier(0.22,1,0.36,1); }
.vc-back:hover .vc-back-arrow { transform: translateX(-3px); }

@media (prefers-reduced-motion: reduce) {
  .vc-aurora, .vc-sweep::after { animation: none !important; }
  .vc-row, .vc-row-arrow, .vc-back-arrow { transition: none !important; }
}
`;