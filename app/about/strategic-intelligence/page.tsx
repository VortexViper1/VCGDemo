"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Lightbulb, LineChart, Target, Users, CheckCircle2 } from "lucide-react";

import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import Reveal from "@/components/shared/Reveal";

const POINTS = [
  {
    title: "Data-Driven Insights",
    description:
      "Every recommendation is grounded in rigorous analysis, market data, and quantifiable evidence — not intuition alone.",
  },
  {
    title: "Executive Expertise",
    description:
      "Decades of leadership experience across industries, applied directly to your specific business context.",
  },
  {
    title: "Complex Problem Solving",
    description:
      "We take on the hardest strategic questions — the ones that don't have obvious answers.",
  },
];

const OUTCOMES = [
  "Clarity on the decisions that matter most",
  "Evidence-based strategic recommendations",
  "Faster, more confident leadership alignment",
  "Frameworks your team can reuse independently",
];

export default function StrategicIntelligencePage() {
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
              <Lightbulb size={26} className="text-accent" />
            </div>
            <span className="text-xs uppercase tracking-[0.3em] text-accent">Why VISWAS — 01</span>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <SectionTitle
            title="Strategic Intelligence"
            description="Data-driven insights combined with executive expertise to solve complex business challenges."
            align="left"
          />
        </Reveal>

        {/* Business photo — replace src with your own image in /public/about/ */}
        <Reveal delay={0.18}>
          <div className="relative mt-12 h-[360px] w-full overflow-hidden rounded-[28px] border border-[#2A2D31]/10 md:h-[440px]">
            <Image
              src="/about/strategic-intelligence.png"
              alt="Strategic Intelligence — VISWAS consulting team in a data review session"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A2D31]/35 via-transparent to-transparent" />
          </div>
        </Reveal>

        {/* Points — dark green-to-navy glass cards, plain icons (no badge circle) */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {POINTS.map((point, index) => {
            return (
              <Reveal key={point.title} delay={0.1 + index * 0.1}>
                <div
                  className="h-full rounded-[28px] border p-10 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(42,45,49, 0.92) 0%, rgba(31,35,39, 0.96) 100%)",
                    borderColor: "rgba(255, 255, 255, 0.12)",
                    boxShadow:
                      "0 12px 40px rgba(31,35,39, 0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  <h3
  className="mb-3 text-xl font-semibold tracking-tight"
  style={{ color: "#F8F6F2" }}
>{point.title}</h3>
                  <p className="leading-7 text-white/65">{point.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Outcomes — plain spec-list on the page background, hairline top rule */}
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
    </main>
  );
}