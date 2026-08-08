"use client";

/**
 * LegalDocument
 * ─────────────
 * Design intent (so future edits stay consistent):
 *  - Pure white page, no cards, no shadows, no borders-as-boxes — only
 *    hairline rules and whitespace do the structuring.
 *  - Palette lives entirely in the amber/ink family (see tokens below).
 *    #B7964A is the same gold already used across the site (Navbar CTA,
 *    hover underlines) so this reads as the same brand, not a new one.
 *  - Numbering is justified here (unlike marketing pages) because a
 *    legal document *is* a real, referenceable sequence — clauses get
 *    cited by number in the real world.
 *  - The one animated element is the amber "thread" running down the
 *    left of the index rail: it fills as you read, functioning as a
 *    reading-progress indicator rather than decoration. Everything
 *    else is static. prefers-reduced-motion disables it.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { LegalDocumentContent } from "@/lib/legal-content";

/* ── Tokens ──────────────────────────────────────────────────────── */
const PAPER = "#FFFFFF";
const INK = "#241A0F"; // warm near-black, not neutral gray — stays in the amber family
const INK_MUTED = "#6B5A44";
const AMBER_100 = "#F4E8CE"; // hairline / wash
const AMBER_300 = "#D9BC7F"; // secondary accent
const AMBER_500 = "#B7964A"; // brand gold, primary accent
const AMBER_700 = "#8A6C2E"; // deep accent, active state

const SCROLLSPY_OFFSET = 160;

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const update = () => {
      let current: string | null = elements[0].id;
      for (const el of elements) {
        if (el.getBoundingClientRect().top - SCROLLSPY_OFFSET <= 0) {
          current = el.id;
        } else {
          break;
        }
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids]);

  return active;
}

export default function LegalDocument({ content }: { content: LegalDocumentContent }) {
  const prefersReducedMotion = useReducedMotion();
  const articleRef = useRef<HTMLDivElement>(null);

  const ids = useMemo(() => content.sections.map((s) => s.id), [content.sections]);
  const active = useActiveSection(ids);

  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start center", "end end"],
  });
  const threadProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <main style={{ background: PAPER }} className="relative min-h-screen">
      <div className="mx-auto max-w-[1160px] px-6 pb-32 pt-40 sm:px-10 lg:px-8">
        {/* ── Back to home ──
            Same pill treatment as StageImage's "Discover More" CTA:
            white/95 pill, amber-orange fill on hover, icon nudges in
            the direction of travel. */}
        <div className="absolute left-6 top-32 sm:left-10 lg:left-8">
          <Link href="/" className="group inline-flex focus-visible:outline-none">
            <span className="pointer-events-auto relative z-30 inline-flex w-fit items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-[13px] font-medium text-[#23272B] transition-all duration-300 hover:scale-105 hover:bg-[#D9822B] hover:text-white sm:text-sm">
              <ArrowLeft
                size={15}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Back to home
            </span>
          </Link>
        </div>

        {/* ── Header ── */}
        <header className="mt-16 max-w-[680px] sm:mt-20">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.34em]"
            style={{ color: AMBER_500 }}
          >
            {content.eyebrow}
          </p>
          <h1
            className="mt-4 font-[var(--font-display)] text-4xl leading-[1.1] sm:text-5xl"
            style={{ color: INK }}
          >
            {content.title}
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed" style={{ color: INK_MUTED }}>
            {content.intro}
          </p>
          <p className="mt-6 text-[12px] uppercase tracking-[0.18em]" style={{ color: AMBER_700 }}>
            {content.updated}
          </p>
        </header>

        <div
          aria-hidden="true"
          className="mt-14 h-px w-full max-w-[680px]"
          style={{ backgroundColor: AMBER_100 }}
        />

        {/* ── Body: sticky index rail + article ── */}
        <div className="mt-14 grid grid-cols-1 gap-16 lg:grid-cols-[200px_1fr]">
          {/* Index rail — desktop only */}
          <nav aria-label="Sections" className="relative hidden lg:block">
            <div className="sticky top-40 flex gap-4">
              {/* Amber reading-progress thread */}
              <div
                className="relative w-px shrink-0 self-stretch"
                style={{ backgroundColor: AMBER_100 }}
                aria-hidden="true"
              >
                <motion.div
                  className="absolute inset-x-0 top-0 origin-top"
                  style={{
                    scaleY: prefersReducedMotion ? undefined : threadProgress,
                    backgroundColor: AMBER_500,
                    height: "100%",
                    width: 1,
                  }}
                />
              </div>

              <ol className="flex flex-col gap-3">
                {content.sections.map((section, i) => {
                  const isActive = active === section.id;
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="group flex items-baseline gap-3 focus-visible:outline-none"
                      >
                        <span
                          className="text-[11px] tabular-nums transition-colors"
                          style={{ color: isActive ? AMBER_700 : AMBER_300 }}
                        >
                          {pad(i + 1)}
                        </span>
                        <span
                          className="text-[13px] leading-snug transition-colors group-hover:text-[--hover]"
                          style={{
                            color: isActive ? INK : INK_MUTED,
                            fontWeight: isActive ? 600 : 500,
                          }}
                        >
                          {section.heading}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </nav>

          {/* Article */}
          <div ref={articleRef} className="max-w-[680px]">
            {content.sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-40 border-t py-10 first:border-t-0 first:pt-0"
                style={{ borderColor: AMBER_100 }}
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className="text-[13px] font-semibold tabular-nums"
                    style={{ color: AMBER_500 }}
                  >
                    {pad(i + 1)}
                  </span>
                  <h2
                    className="font-[var(--font-display)] text-xl sm:text-2xl"
                    style={{ color: INK }}
                  >
                    {section.heading}
                  </h2>
                </div>

                <div className="mt-4 space-y-4 pl-[30px]">
                  {section.body.map((paragraph, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-[15px] leading-relaxed"
                      style={{ color: INK_MUTED }}
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.list && (
                    <ul className="space-y-2 pt-1">
                      {section.list.map((item, lIdx) => (
                        <li
                          key={lIdx}
                          className="flex items-start gap-3 text-[15px] leading-relaxed"
                          style={{ color: INK_MUTED }}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[9px] h-1 w-1 shrink-0 rounded-full"
                            style={{ backgroundColor: AMBER_500 }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}