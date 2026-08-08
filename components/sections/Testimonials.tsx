"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import Reveal from "@/components/shared/Reveal";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";

const EASE = [0.22, 1, 0.36, 1] as const;

const INK = "#1C2624";
const INK_SOFT = "#5B6863";
const PAPER = "#EFEAE0";
const PAPER_LINE = "#D9D0BA";
const SEAL = "#7A2E2E";
const LOGOS = ["FORTUNE", "VENTURES", "GLOBAL", "CAPITAL", "ENTERPRISE", "GROUP"];
const DISPLAY_SERIF = "var(--font-display)";
const MONO = "var(--font-sans)";

const EXHIBITS = [
  {
    letter: "A",
    quote:
      "We begin every engagement by understanding the organization's ambitions, challenges, and Long term vision. Our recommendations are practical, measurable, and designed to create lasting enterprise value.",
    author: "Strategic Thinking",
  },
  {
    letter: "B",
    quote:
      "Every recommendation is supported by rigorous financial analysis, governance best practices, and disciplined execution planning, enabling leaders to make confident decisions with clarity.",
    author: "Execution Excellence",
  },
  {
    letter: "C",
    quote:
      "Our multidisciplinary approach combines strategy, transformation, governance, and technology to help organizations navigate complexity and build sustainable competitive advantage.",
    author: "Long term Partnership",
  },
];

const SIGNATORIES = [
  "MERIDIAN CAPITAL",
  "ANCHORPOINT GROUP",
  "FORTUNE HOLDINGS",
  "NORTHFIELD VENTURES",
  "OAKMONT PARTNERS",
  "STERLING & CO.",
];

/** A corporate seal — circular ring text + center mark, stamped in on hover. */
function Seal({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      aria-hidden="true"
      initial={false}
      animate={
        reduce
          ? {}
          : active
          ? { scale: [1, 1.15, 1], rotate: [0, -6, 0] }
          : { scale: 1, rotate: 0 }
      }
      transition={{ duration: 0.45, ease: EASE }}
    >
      <circle cx="28" cy="28" r="26" fill="none" stroke={SEAL} strokeWidth="1" opacity="0.55" />
      <circle cx="28" cy="28" r="21" fill="none" stroke={SEAL} strokeWidth="0.75" opacity="0.4" />
      <path id="sealRingPath" fill="none" d="M28,28 m-17,0 a17,17 0 1,1 34,0 a17,17 0 1,1 -34,0" />
      <text fontSize="5.4" fill={SEAL} opacity="0.75" letterSpacing="2.5" style={{ fontFamily: MONO }}>
        <textPath href="#sealRingPath" startOffset="2%">
          VISWAS · ATTESTED ·
        </textPath>
      </text>
      <path d="M22 30 L27 35 L36 22" stroke={SEAL} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
    </motion.svg>
  );
}

/** Hand-drawn signature mark, draws in when its exhibit is active. */
function Signature({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  return (
    <svg width="120" height="28" viewBox="0 0 120 28" aria-hidden="true">
      <motion.path
        d="M4 20 C 12 6, 18 6, 22 16 S 34 24, 40 14 S 52 4, 58 15 C 62 22, 68 20, 74 12 C 80 4, 88 8, 92 16 C 96 22, 104 18, 116 10"
        fill="none"
        stroke={INK}
        strokeWidth="1.4"
        strokeLinecap="round"
        initial={false}
        animate={
          reduce
            ? { pathLength: 1, opacity: 0.7 }
            : { pathLength: active ? 1 : 0.55, opacity: active ? 0.85 : 0.35 }
        }
        transition={{ duration: 0.6, ease: EASE }}
      />
    </svg>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <Section id="testimonials" className="relative overflow-hidden">
      {/* faint paper grain — static, not another glowing blob */}
      <svg className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.035]" aria-hidden="true">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <Reveal>
        <SectionTitle
          eyebrow="CLIENT PERSPECTIVES"

title="Trusted by leaders. Valued for outcomes."

description="We build enduring partnerships by helping organizations solve complex strategic, financial, and transformation challenges with confidence."
        />
      </Reveal>

      {/* letterhead rule */}
      <div className="mx-auto mt-16 flex max-w-5xl items-center gap-4 px-6">
        <div className="h-px flex-1" style={{ background: PAPER_LINE }} />
        <span
          className="whitespace-nowrap text-[11px] uppercase tracking-[0.3em]"
          style={{ color: INK_SOFT, fontFamily: MONO }}
        >
          Client Perspectives
        </span>
        <div className="h-px flex-1" style={{ background: PAPER_LINE }} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3" onMouseLeave={() => setActive(null)}>
        {EXHIBITS.map((item, index) => {
          const isActive = active === index;

          return (
            <Reveal key={item.letter} delay={index * 0.12}>
              <motion.figure
                tabIndex={0}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
                animate={{ y: isActive ? -6 : 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="relative flex h-full flex-col justify-between rounded-[2px] p-8 outline-none focus-visible:ring-2 focus-visible:ring-[#7A2E2E]/50 sm:p-9"
                style={{
                  background: "#FBF8F1",
                  border: `1px solid ${PAPER_LINE}`,
                  boxShadow: isActive
                    ? "0 22px 40px -18px rgba(28,38,36,0.28)"
                    : "0 10px 24px -18px rgba(28,38,36,0.16)",
                  transition: "box-shadow 0.4s ease",
                }}
              >
                <div className="flex items-start justify-between">
                  <span
                    className="text-[11px] uppercase tracking-[0.3em]"
                    style={{ color: INK_SOFT, fontFamily: MONO }}
                  >
                    Exhibit {item.letter}
                  </span>
                  <Seal active={isActive} />
                </div>

                <blockquote
                  className="mt-6 flex-1 text-[18px] italic leading-[1.6]"
                  style={{ color: INK, fontFamily: DISPLAY_SERIF }}
                >
                  “{item.quote}”
                </blockquote>

                <figcaption className="mt-8">
                  <div className="h-px w-full" style={{ background: PAPER_LINE }} />
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p
                        className="text-[13px] font-semibold"
                        style={{ color: INK, fontFamily: DISPLAY_SERIF }}
                      >
                      </p>
                      <p
                        className="mt-0.5 text-[10px] uppercase tracking-[0.25em]"
                        style={{ color: INK_SOFT, fontFamily: MONO }}
                      >
                        {item.author}
                      </p>
                    </div>
                    <Signature active={isActive} />
                  </div>
                </figcaption>
              </motion.figure>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.5}>
  <div className="mt-24 rounded-[32px] border border-[#2A2D31]/8 bg-[#FFFFFF]/[0.03] px-8 py-10 backdrop-blur-2xl">
    <div className="grid grid-cols-2 items-center gap-8 opacity-50 md:grid-cols-3 lg:grid-cols-6">
      {LOGOS.map((logo) => (
        <motion.div
          key={logo}
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
          className="text-center text-sm font-semibold uppercase tracking-[0.35em] text-[#23272B]/40 transition-colors duration-300 hover:text-[#C49A4A]"
        >
          {logo}
        </motion.div>
      ))}
    </div>
  </div>
</Reveal>
    </Section>
  );
}