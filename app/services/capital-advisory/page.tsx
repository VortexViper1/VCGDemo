"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Landmark,
  PiggyBank,
  Handshake,
  FileBarChart,
  CheckCircle2,
} from "lucide-react";

import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import Reveal from "@/components/shared/Reveal";
const PILLARS = [
  {
    title: "Fund Raising",
    description:
      "Structuring and supporting equity or debt capital raises aligned to the company's stage and strategic needs.",
    points: [
      "Capital requirement assessment",
      "Investor materials and financial story",
      "Funding strategy and sequencing",
      "Investor identification support",
      "Negotiation and transaction assistance",
    ],
  },
  {
    title: "Business Valuation",
    description:
      "Developing defensible valuations for investments, transactions, restructuring and shareholder decisions.",
    points: [
      "DCF and market-based valuation",
      "Pre-money and post-money assessment",
      "Scenario and sensitivity analysis",
      "Fairness and transaction support",
      "Valuation narrative development",
    ],
  },
  {
    title: "Financial Modelling",
    description:
      "Building decision-grade financial models that convert strategy into forecasts, funding requirements and long-term value creation.",
    points: [
      "Integrated financial statements",
      "Unit economics and cohort models",
      "Scenario and stress testing",
      "Cash runway and working capital",
      "Investor return analysis",
    ],
  },
];

const OUTCOMES = [
  "Clear capital-raising strategy",
  "Investment ready financial models",
  "Robust and defensible business valuations",
  "Greater confidence in funding and investment decisions",
];

export default function CapitalAdvisoryPage() {
  return (
    <main className="min-h-screen bg-[#F8F5EF]">
      <Section className="pt-40 pb-32">
        <Reveal>
          <Link
            href="/#services"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-[#23272B]/50 transition-colors duration-300 hover:text-[#C49A4A]"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Services
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C49A4A]/10">
              <Landmark size={26} className="text-[#C49A4A]" />
            </div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#C49A4A]">
              Our Services
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <SectionTitle
            title="Capital Advisory"
            description="Strategic fundraising, investment planning, mergers, acquisitions, and financial restructuring."
            align="left"
          />
        </Reveal>

        {/* Pillars — dark green-to-navy glass cards, plain icons (no badge circle) */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, index) => {
            return (
              <Reveal key={pillar.title} delay={0.1 + index * 0.1}>
                <div
                className="flex h-full min-h-[520px] flex-col rounded-[28px] border p-10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(7,31,45,0.35)]"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(42,45,49, 0.92) 0%, rgba(31,35,39, 0.96) 100%)",
                    borderColor: "rgba(255, 255, 255, 0.12)",
                    boxShadow:
                      "0 12px 40px rgba(31,35,39, 0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                 <h3
  className="mb-4 text-2xl font-semibold tracking-tight"
  style={{ color: "#F8F6F2" }}
>
  {pillar.title}
</h3>

<p className="mb-8 leading-7 text-white/70">
  {pillar.description}
</p>

<ul className="space-y-3">
  {pillar.points.map((point) => (
    <li key={point} className="flex items-start gap-3">
      <CheckCircle2
        size={18}
        className="mt-0.5 shrink-0 text-[#C49A4A]"
      />
      <span className="text-[15px] leading-6 text-white/80">
        {point}
      </span>
    </li>
  ))}
</ul>
                </div>
              </Reveal>
            );
          })}
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
    </main>
  );
}