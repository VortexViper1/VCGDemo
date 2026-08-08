"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import Reveal from "@/components/shared/Reveal";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

type Insight = {
  category: string;
  title: string;
  description: string;
  date: string;
  read: string;
  href: string;
  image: string;
};

const INSIGHTS: Insight[] = [
  {
    category: "Digital Transformation",
    title: "Digital Transformation Beyond Technology",
    description:
      "Why lasting transformation is a discipline of people, process, and culture — and why platforms alone rarely move the needle.",
    date: "Jun 2026",
    read: "6 min read",
    href: "/insights/digital-transformation-beyond-technology",
    image: "/insights/beyond.jpg",
  },
  {
    category: "Leadership",
    title: "Building High-Performance Leadership Teams",
    description:
      "The operating rhythms, incentives, and decision rights that separate leadership teams that compound from those that stall.",
    date: "Jun 2026",
    read: "5 min read",
    href: "/insights/high-performance-leadership-teams",
    image: "/insights/leadershi_p.jpg",
  },
  {
    category: "Cybersecurity",
    title: "Cybersecurity as a Corporate & Financial Strategy",
    description:
      "Reframing security investment from a cost center to a board-level driver of trust, resilience, and enterprise value.",
    date: "May 2026",
    read: "7 min read",
    href: "/insights/cybersecurity-business-strategy",
    image: "/insights/security.jpg",
  },
  {
    category: "Growth Strategy",
    title: "Scaling Businesses in Emerging Markets",
    description:
      "A playbook for sequencing entry, capital, and talent decisions across markets with volatile demand and thin data.",
    date: "May 2026",
    read: "6 min read",
    href: "/insights/scaling-businesses-emerging-markets",
    image: "/insights/businesssc.jpg",
  },
  {
    category: "Operations",
    title: "Operational Excellence",
    description:
      "How disciplined process redesign not headcount unlocks the next decade of margin improvement.",
    date: "Apr 2026",
    read: "5 min read",
    href: "/insights/operational-excellence-process-optimization",
    image: "/insights/operationalexce.jpg",
  },
  {
    category: "Sustainability",
    title: "Creating Sustainable Value Through ESG Leadership",
    description:
      "Why the enterprises winning on ESG treat it as a capital allocation question, not a reporting exercise.",
    date: "Apr 2026",
    read: "6 min read",
    href: "/insights/esg-sustainable-value-creation",
    image: "/insights/Esg.jpg",
  },
];

/* ------------------------------------------------------------------ */
/*  Tunables                                                           */
/* ------------------------------------------------------------------ */

const CYCLE_SECONDS = 30; // full loop duration target
const HOVER_RESUME_DELAY_MS = 300;
const MOBILE_CENTER_HOLD_MS = 2000;
const MOBILE_RESUME_AFTER_SWIPE_MS = 3000;
const GAP_PX = 32; // must match the Tailwind gap below (gap-6 md:p-8 = 2rem = 32px)

/**
 * On mobile we deliberately show less than one full card width so the
 * next/previous card peeks in at the edges (a standard mobile-carousel
 * affordance) and the card reads as smaller/denser than the old
 * full-viewport-width card.
 */
const MOBILE_CARD_WIDTH_RATIO = 0.8;

/** Duplicate the deck so the track can wrap seamlessly. */
const LOOP_COPIES = 3;
const TRACK: Insight[] = Array.from({ length: LOOP_COPIES }, () => INSIGHTS).flat();

/* ------------------------------------------------------------------ */
/*  Responsive visible-card count                                     */
/* ------------------------------------------------------------------ */

function useVisibleCount() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setCount(1);
      else if (w < 1200) setCount(2);
      else setCount(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

/* ------------------------------------------------------------------ */
/*  Card                                                                */
/* ------------------------------------------------------------------ */

interface CardProps {
  insight: Insight;
  cardWidth: number;
  active: boolean; // hovered / focused (desktop) OR centered (mobile)
  onEnter: () => void;
  onLeave: () => void;
}

function InsightCard({ insight, cardWidth, active, onEnter, onLeave }: CardProps) {
  return (
    <Link
      href={insight.href}
      className="block shrink-0 outline-none"
      style={{ width: cardWidth }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      draggable={false}
    >
      <div
        className="group relative h-[22rem] sm:h-[24rem] md:h-[28rem] lg:h-[26rem] w-full overflow-hidden rounded-2xl bg-[#23272B] ring-1 ring-white/10 transition-shadow duration-500 focus-within:ring-2 focus-within:ring-[#C49A4A]"
        style={{ willChange: "transform" }}
      >
        {/* Background image */}
        <div className="absolute inset-0" style={{ willChange: "transform" }}>
          <motion.div
            className="absolute inset-0"
            animate={{ scale: active ? 1.08 : 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "transform" }}
          >
            <Image
              src={insight.image}
              alt=""
              fill
              draggable={false}
              sizes="(max-width: 768px) 80vw, (max-width: 1200px) 45vw, 30vw"
              className="pointer-events-none object-cover"
              priority={false}
            />
          </motion.div>
        </div>

        {/* Overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#23272B] via-[#23272B]/50 to-[#23272B]/10"
          animate={{ opacity: active ? 1 : 0.85 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Content */}
        <div className="relative flex h-full flex-col justify-end p-5 sm:p-6 md:p-8">
          {/* Category + date — always visible */}
          <motion.div
            className="flex items-center justify-between"
            animate={{ y: active ? -4 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="
text-[11px] sm:text-[13px]
font-semibold
uppercase
tracking-[0.16em] md:tracking-[0.32em]
text-[#D4AF37]
drop-shadow-[0_1px_6px_rgba(212,175,55,0.35)]
">
              {insight.category}
            </span>
            <span className="
text-[10px] sm:text-[12px]
font-medium
uppercase
tracking-[0.14em] md:tracking-[0.18em]
text-white/75
">
              {insight.date}
            </span>
          </motion.div>

          {/* Title — always visible, shifts up slightly on active */}
         <motion.h3
  className="
    mt-4 sm:mt-5
    font-[var(--font-display)]
    text-[20px] sm:text-[24px] md:text-[30px] lg:text-[32px]
    font-bold
    leading-[1.15]
    tracking-[-0.03em]
    transition-colors
    duration-500
    group-hover:text-white
  "
  style={{ color: "white" }}
  animate={{ y: active ? -6 : 0 }}
  transition={{
    duration: 0.35,
    delay: active ? 0.03 : 0,
    ease: [0.16, 1, 0.3, 1],
  }}
>
  {insight.title}
</motion.h3>

          {/* Gold accent line */}
          <div className="relative mt-4 sm:mt-5 h-px w-full overflow-hidden bg-white/15">
            <motion.div
              className="
absolute
inset-y-0
left-0
bg-gradient-to-r
from-[#D4AF37]
via-[#F4D675]
to-[#D4AF37]
"
              animate={{ width: active ? "100%" : "18%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Description — revealed on active */}
          <motion.p
            className="
overflow-hidden
font-[var(--font-sans)]
text-[14px] sm:text-[16px]
leading-6 sm:leading-7
tracking-[0.01em]
font-medium
text-white/90
drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]
"
            initial={false}
            animate={
              active
                ? { height: "auto", opacity: 1, marginTop: 14 }
                : { height: 0, opacity: 0, marginTop: 0 }
            }
            transition={{ duration: 0.4, delay: active ? 0.06 : 0, ease: [0.16, 1, 0.3, 1] }}
          >
            {insight.description}
          </motion.p>

          {/* Read More — slides up on active */}
          <motion.div
            className="
mt-4 sm:mt-5
flex
items-center
gap-3
text-[11px] sm:text-[13px]
font-bold
uppercase
tracking-[0.22em] md:tracking-[0.28em]
text-[#D4AF37]
drop-shadow-[0_2px_10px_rgba(212,175,55,0.35)]
"
            initial={false}
            animate={
              active
                ? { opacity: 1, y: 0, height: "auto", marginTop: 20 }
                : { opacity: 0, y: 12, height: 0, marginTop: 0 }
            }
            transition={{ duration: 0.4, delay: active ? 0.1 : 0, ease: [0.16, 1, 0.3, 1] }}
          >
            Read More
            <motion.span
              animate={{ rotate: active ? 45 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex"
            >
              <ArrowUpRight size={16} />
            </motion.span>
          </motion.div>
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Carousel                                                           */
/* ------------------------------------------------------------------ */

export default function Insights() {
  const prefersReducedMotion = useReducedMotion();
  const visibleCount = useVisibleCount();
  const isMobile = visibleCount === 1;

  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setViewportWidth(entries[0].contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Card width: on mobile we deliberately show a fraction of the viewport
  // (MOBILE_CARD_WIDTH_RATIO) so the card is visibly smaller and the next
  // card peeks in at the edge. On tablet/desktop, `visibleCount` cards +
  // gaps fill the viewport exactly, as before.
  const cardWidth = useMemo(() => {
    if (!viewportWidth) return 0;
    if (isMobile) {
      return viewportWidth * MOBILE_CARD_WIDTH_RATIO;
    }
    const totalGap = GAP_PX * (visibleCount - 1);
    return (viewportWidth - totalGap) / visibleCount;
  }, [viewportWidth, visibleCount, isMobile]);

  const singleSetWidth = useMemo(
    () => (cardWidth + GAP_PX) * INSIGHTS.length,
    [cardWidth]
  );

  const speedPxPerSec = singleSetWidth / CYCLE_SECONDS;

  const x = useMotionValue(0);

  // Pause reasons — any one of these being true halts the ticker.
  const hoverPausedRef = useRef(false);
  const draggingRef = useRef(false);
  const mobileHoldRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

const scrollingRef = useRef(false);

  const lastCenteredIndexRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // desktop hover/focus
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number | null>(null);

  const clearResumeTimeout = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  /* ---------------- Desktop hover pause ---------------- */

  const handleCardEnter = useCallback(
    (index: number) => {
      if (isMobile) return;
      clearResumeTimeout();
      hoverPausedRef.current = true;
      setActiveIndex(index);
    },
    [isMobile]
  );

  const handleCardLeave = useCallback(
    (index: number) => {
      if (isMobile) return;
      setActiveIndex((prev) => (prev === index ? null : prev));
      clearResumeTimeout();
      resumeTimeoutRef.current = setTimeout(() => {
        hoverPausedRef.current = false;
      }, HOVER_RESUME_DELAY_MS);
    },
    [isMobile]
  );

  /* ---------------- Drag / swipe (mobile) ---------------- */

  const handleDragStart = useCallback(() => {
    draggingRef.current = true;
    mobileHoldRef.current = false;
    if (mobileTimeoutRef.current) clearTimeout(mobileTimeoutRef.current);
    setMobileActiveIndex(null);
  }, []);

  const handleDragEnd = useCallback(() => {
    draggingRef.current = false;
    if (mobileTimeoutRef.current) clearTimeout(mobileTimeoutRef.current);
    mobileTimeoutRef.current = setTimeout(() => {
      mobileHoldRef.current = false;
    }, MOBILE_RESUME_AFTER_SWIPE_MS);
  }, []);

  /* ---------------- Ticker ---------------- */

  useAnimationFrame((_, delta) => {
    if (!singleSetWidth || prefersReducedMotion) return;

    const paused =
      hoverPausedRef.current || draggingRef.current || mobileHoldRef.current;

    if (!paused) {
      let next = x.get() - (speedPxPerSec * delta) / 1000;

      // Seamless bidirectional wrap.
      while (next <= -singleSetWidth) next += singleSetWidth;
      while (next > 0) next -= singleSetWidth;

      x.set(next);
    }

    // Mobile: detect which card is centered in the viewport.
    if (isMobile && !draggingRef.current && viewportWidth && cardWidth) {
      const step = cardWidth + GAP_PX;
      const centerOffset = -x.get() + viewportWidth / 2;
      const rawIndex = Math.round(centerOffset / step - 0.5);
      const normalized =
        ((rawIndex % INSIGHTS.length) + INSIGHTS.length) % INSIGHTS.length;

      if (
        lastCenteredIndexRef.current !== normalized &&
        !mobileHoldRef.current
      ) {
        lastCenteredIndexRef.current = normalized;
        mobileHoldRef.current = true;
        setMobileActiveIndex(normalized);

        if (mobileTimeoutRef.current) clearTimeout(mobileTimeoutRef.current);
        mobileTimeoutRef.current = setTimeout(() => {
          mobileHoldRef.current = false;
          setMobileActiveIndex(null);
        }, MOBILE_CENTER_HOLD_MS);
      }
    }
  });

useEffect(() => {
  let timeout: ReturnType<typeof setTimeout>;

  const onScroll = () => {
    scrollingRef.current = true;

    hoverPausedRef.current = false;
    setActiveIndex(null);

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      scrollingRef.current = false;
    }, 120);
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    clearResumeTimeout();

    if (mobileTimeoutRef.current)
      clearTimeout(mobileTimeoutRef.current);

    window.removeEventListener("scroll", onScroll);
  };
}, []);

  /* ---------------- Static (reduced motion) layout ---------------- */

  if (prefersReducedMotion) {
    return (
      <Section id="insights" className="relative overflow-hidden bg-[#FFFFFF]">
        <Reveal>
          <SectionTitle
            eyebrow="INSIGHTS"
            title="Perspectives shaping tomorrow's business leaders."
            description="Thought leadership, market intelligence, and strategic insights from VISWAS Consulting Group."
            align="center"
          />
        </Reveal>
        <div className="mt-16 grid gap-6 md:p-8 sm:grid-cols-2 lg:grid-cols-3">
          {INSIGHTS.map((insight) => (
            <div key={insight.title} style={{ width: "100%" }}>
              <InsightCard
                insight={insight}
                cardWidth={9999}
                active={false}
                onEnter={() => {}}
                onLeave={() => {}}
              />
            </div>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section id="insights" className="relative overflow-hidden bg-[#FFFFFF]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 bottom-10 h-96 w-96 rounded-full bg-[#C49A4A]/12 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 top-10 h-96 w-96 rounded-full bg-[#1F2428]/30 blur-[140px]"
        />
      </div>

      <Reveal>
        <SectionTitle
          eyebrow="INSIGHTS"
          title="Perspectives shaping tomorrow's business leaders."
          description="Thought leadership, market intelligence, and strategic insights from VISWAS Consulting Group."
          align="center"
        />
      </Reveal>

      <div ref={viewportRef} className="relative mt-16 overflow-hidden">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#FFFFFF] to-transparent w-10 sm:w-16 lg:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#FFFFFF] to-transparent w-10 sm:w-16 lg:w-28" />

        <motion.div
          className="flex"
          style={{ x, gap: GAP_PX, willChange: "transform" }}
          drag={isMobile ? "x" : false}
          dragElastic={0.08}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {cardWidth > 0 &&
            TRACK.map((insight, i) => {
              const baseIndex = i % INSIGHTS.length;
              const active = isMobile
                ? mobileActiveIndex === baseIndex
                : activeIndex === i;

              return (
                <InsightCard
                  key={`${insight.title}-${i}`}
                  insight={insight}
                  cardWidth={cardWidth}
                  active={active}
                  onEnter={() => handleCardEnter(i)}
                  onLeave={() => handleCardLeave(i)}
                />
              );
            })}
        </motion.div>
      </div>
    </Section>
  );
}