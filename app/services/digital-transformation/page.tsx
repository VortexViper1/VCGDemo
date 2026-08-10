"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  X,
} from "lucide-react";

import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import Reveal from "@/components/shared/Reveal";

const PILLARS = [
  {
    title: "Corporate Governance",
    description:
      "Designing governance frameworks that improve decision quality, accountability and institutional credibility.",
    points: [
      "Board and committee architecture",
      "Delegation of authority",
      "Policy and control frameworks",
      "Governance maturity assessment",
      "Promoter-board-management alignment",
    ],
  },
  {
    title: "Secretarial & Corporate Compliance",
    description:
      "Supporting companies with disciplined compliance and statutory governance across every stage of the corporate lifecycle.",
    points: [
      "Companies Act compliance",
      "Board and shareholder processes",
      "Share capital actions",
      "Statutory registers and filings",
      "Entity lifecycle management",
    ],
  },
  {
    title: "Risk & Internal Controls",
    description:
      "Building practical frameworks to identify, manage and monitor financial, operational and governance risks.",
    points: [
      "Enterprise risk assessment",
      "Internal control design",
      "Compliance risk mapping",
      "Policy framework development",
      "Management assurance mechanisms",
    ],
  },
];

const OUTCOMES = [
  "Stronger governance and board effectiveness",
  "Improved regulatory compliance",
  "Reduced operational and compliance risk",
  "Greater confidence among investors and stakeholders",
];

export default function DigitalTransformationPage() {
  const [activePillar, setActivePillar] = useState<number | null>(null);
  const activeContent = activePillar !== null ? PILLARS[activePillar] : null;

  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      <Section className="pt-40 pb-32">
        <Reveal>
<Link href="/#services" className="group inline-flex focus-visible:outline-none">
  <span className="pointer-events-auto relative z-30 inline-flex w-fit items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-[13px] font-medium text-[#23272B] transition-all duration-300 hover:scale-105 hover:bg-[#D9822B] hover:text-white sm:text-sm">
    <ArrowLeft
      size={15}
      className="transition-transform duration-300 group-hover:-translate-x-1"
    />
    Back to Services
  </span>
</Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex items-center gap-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C49A4A]">
              Our Capabilities
            </span>
          </div>
        </Reveal>

<Reveal delay={0.15}>
  <SectionTitle
    title="Governance, Compliance & Regulatory Advisory"
    description="Strengthening governance, regulatory compliance and risk frameworks to build resilient, accountable and well-governed enterprises."
    align="left"
  />
</Reveal>

        {/* Pillars — teaser card (title + clamped description only), tap to expand into full modal */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <Reveal key={pillar.title} delay={0.1 + index * 0.1}>
              <button
                type="button"
                onClick={() => setActivePillar(index)}
                aria-haspopup="dialog"
                className="group flex h-full min-h-[240px] w-full flex-col rounded-[28px] border p-10 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(7,31,45,0.35)] active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(42,45,49, 0.92) 0%, rgba(31,35,39, 0.96) 100%)",
                  borderColor: "rgba(255, 255, 255, 0.12)",
                  boxShadow:
                    "0 12px 40px rgba(31,35,39, 0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <h3
                  className="mb-3 text-2xl font-semibold tracking-tight"
                  style={{ color: "#F8F6F2" }}
                >
                  {pillar.title}
                </h3>

                <p className="line-clamp-3 leading-7 text-white/70">
                  {pillar.description}
                </p>

<span className="pointer-events-auto relative z-30 mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-[12px] font-medium text-[#23272B] opacity-90 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#D9822B] group-hover:text-white group-hover:opacity-100">
  Tap to read more
</span>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Outcomes — plain spec-list on the page background, hairline top rule */}
        <Reveal delay={0.2}>
          <div className="mt-24 border-t border-[#23272B]/10 pt-12">
            <h3
              className="mb-8 text-2xl font-semibold tracking-tight"
              style={{ color: "#2A2D31" }}
            >
              What You Can Expect
            </h3>
            <div className="grid gap-5 sm:grid-cols-2">
              {OUTCOMES.map((outcome) => (
                <div key={outcome} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-[#C49A4A]"
                  />
                  <span className="text-[#23272B]/75">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA — solid pill button */}
      </Section>

      {/* ── Pillar modal: full description + full points list, bottom-sheet on mobile, centered card on desktop ── */}
      <AnimatePresence>
        {activeContent && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setActivePillar(null)}
              className="fixed inset-0 z-[200] bg-[#0A0C0E]/55 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              key="sheet"
              role="dialog"
              aria-modal="true"
              aria-label={activeContent.title}
              initial={{ y: "100%", opacity: 0.9 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0.9 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 32, mass: 0.8 }}
              className="fixed inset-x-0 bottom-0 z-[210] mx-auto w-full max-w-lg rounded-t-[28px] bg-[#FFFFFF] p-8 pb-10 shadow-[0_-12px_50px_rgba(10,12,14,0.35)] sm:bottom-8 sm:rounded-[28px] sm:p-10 sm:max-h-[85vh] sm:overflow-y-auto"
            >
              <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-[#2A2D31]/15 sm:hidden" />

              <div className="flex items-start justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setActivePillar(null)}
                  aria-label="Close"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2A2D31]/10 text-[#2A2D31]/60 transition-colors duration-300 hover:border-[#C49A4A]/40 hover:text-[#C49A4A]"
                >
                  <X size={18} />
                </button>
              </div>

              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-[#2A2D31]">
                {activeContent.title}
              </h3>
              <p className="mt-4 leading-8 text-[#2A2D31]/70">
                {activeContent.description}
              </p>

              <ul className="mt-6 space-y-3">
                {activeContent.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-[#C49A4A]"
                    />
                    <span className="text-[15px] leading-6 text-[#2A2D31]/80">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}