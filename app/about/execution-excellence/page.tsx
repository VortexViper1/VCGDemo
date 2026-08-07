"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Award, X, CheckCircle2 } from "lucide-react";

import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import Reveal from "@/components/shared/Reveal";

const POINTS = [
  {
    title: "Beyond Recommendations",
    description:
      "We stay through implementation, taking ownership of outcomes rather than handing off a slide deck. Strategy without execution is just theory, so our teams remain engaged through rollout, adjusting the plan as real-world friction surfaces.That hands-on commitment is what separates a recommendation that sits in a drawer from one that actually changes how your business operates.",
  },
  {
    title: "Measurable Impact",
    description:
      "Every engagement is anchored to metrics defined upfront — so success is never a matter of opinion. We agree on what winning looks like before work begins, and we track progress against it openly throughout the engagement. That discipline keeps everyone aligned and makes the return on the engagement easy to demonstrate — to your board, your team, or yourself.",
  },
  {
    title: "Disciplined Delivery",
    description:
      "Structured project management and clear accountability at every stage of execution. Every workstream has a clear owner, a defined milestone, and a review cadence — so nothing drifts silently off track. That structure turns ambitious plans into steady, visible progress, with issues surfaced early enough to course-correct rather than discovered too late.",
  },
];

const OUTCOMES = [
  "Strategies that actually get implemented",
  "Clear, agreed-upon success metrics",
  "Hands-on support through execution, not just planning",
  "Results you can point to, not just recommendations",
];

export default function ExecutionExcellencePage() {
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const activeContent = activePoint !== null ? POINTS[activePoint] : null;

  return (
    <main className="min-h-screen bg-[#F8F5EF]">
      <Section className="pt-40 pb-32">
        <Reveal>
          <Link
            href="/#why-viswas"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-[#44665F] transition-colors duration-300 hover:text-accent"
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Why VISWAS
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
              <Award size={26} className="text-accent" />
            </div>
            <span className="text-xs uppercase tracking-[0.3em] text-accent">Why VISWAS — 04</span>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <SectionTitle
            title="Execution Excellence"
            description="Exceptional consulting goes beyond recommendations — ownership, execution, and measurable impact."
            align="left"
          />
        </Reveal>

        {/* Business photo */}
        <Reveal delay={0.18}>
          <div className="relative mt-12 h-[360px] w-full overflow-hidden rounded-[28px] border border-[#2A2D31]/10 md:h-[440px]">
            <Image
              src="/about/execution.png"
              alt="Execution Excellence — VISWAS team tracking project delivery metrics"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A2D31]/35 via-transparent to-transparent" />
          </div>
        </Reveal>

        {/* Points — tap to expand into a bottom-sheet modal, Amazon-insights style */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {POINTS.map((point, index) => (
            <Reveal key={point.title} delay={0.1 + index * 0.1}>
              <button
                type="button"
                onClick={() => setActivePoint(index)}
                aria-haspopup="dialog"
                className="group h-full w-full rounded-[28px] border p-10 text-left backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(42,45,49, 0.92) 0%, rgba(31,35,39, 0.96) 100%)",
                  borderColor: "rgba(255, 255, 255, 0.12)",
                  boxShadow:
                    "0 12px 40px rgba(31,35,39, 0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <h3 className="mb-3 text-xl font-semibold tracking-tight" style={{ color: "#F8F6F2" }}>
                  {point.title}
                </h3>
                <p className="line-clamp-3 leading-7 text-white/65">{point.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                  Tap to read more
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Outcomes */}
        <Reveal delay={0.2}>
          <div className="mt-24 border-t border-[#2A2D31]/10 pt-12">
            <h3 className="mb-8 text-2xl font-semibold tracking-tight text-[#2A2D31]">
              What You Can Expect
            </h3>
            <div className="grid gap-5 sm:grid-cols-2">
              {OUTCOMES.map((outcome) => (
                <div key={outcome} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" />
                  <span className="text-[#2A2D31]/75">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── Insight modal: bottom-sheet on mobile, centered card on desktop ── */}
      <AnimatePresence>
        {activeContent && (
          <>
            {/* Dimmed + blurred backdrop, tap anywhere to close */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setActivePoint(null)}
              className="fixed inset-0 z-[200] bg-[#0A0C0E]/55 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Sheet: slides up from bottom on mobile, scales in centered on desktop */}
            <motion.div
              key="sheet"
              role="dialog"
              aria-modal="true"
              aria-label={activeContent.title}
              initial={{ y: "100%", opacity: 0.9 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0.9 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 32, mass: 0.8 }}
              className="fixed inset-x-0 bottom-0 z-[210] mx-auto w-full max-w-lg rounded-t-[28px] bg-[#F8F5EF] p-8 pb-10 shadow-[0_-12px_50px_rgba(10,12,14,0.35)] sm:bottom-8 sm:rounded-[28px] sm:p-10"
            >
              {/* Drag handle, mobile-sheet affordance */}
              <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-[#2A2D31]/15 sm:hidden" />

              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Award size={22} className="text-accent" />
                </div>
                <button
                  type="button"
                  onClick={() => setActivePoint(null)}
                  aria-label="Close"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2A2D31]/10 text-[#2A2D31]/60 transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                >
                  <X size={18} />
                </button>
              </div>

              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-[#2A2D31]">
                {activeContent.title}
              </h3>
              <p className="mt-4 leading-8 text-[#2A2D31]/70">{activeContent.description}</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}