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
    title: "Fundraising Strategy",
    description:
      "Structuring capital raises and investor narratives that align funding with long-term business objectives.",
  },
  {
    title: "M&A Advisory",
    description:
      "Guiding mergers, acquisitions, and partnerships from due diligence through integration.",
  },
  {
    title: "Financial Restructuring",
    description:
      "Optimizing capital structure and financial operations to strengthen resilience and unlock value.",
  },
];

const OUTCOMES = [
  "Investor-ready financial narratives",
  "Rigorous due diligence support",
  "Optimized capital structures",
  "Confident, well-negotiated deal terms",
];

export default function CapitalAdvisoryPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE]">
      <Section className="pt-40 pb-32">
        <Reveal>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-[#071F2D]/50 transition-colors duration-300 hover:text-[#C9A35F]"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Home
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A35F]/10">
              <Landmark size={26} className="text-[#C9A35F]" />
            </div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#C9A35F]">
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
                  className="h-full rounded-[28px] border p-10 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(23, 63, 56, 0.92) 0%, rgba(7, 31, 45, 0.96) 100%)",
                    borderColor: "rgba(255, 255, 255, 0.12)",
                    boxShadow:
                      "0 12px 40px rgba(7, 31, 45, 0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  <h3
  className="mb-3 text-xl font-semibold tracking-tight"
  style={{ color: "#F8F6F2" }}
>
                    {pillar.title}
                  </h3>
                  <p className="leading-7 text-white/65">{pillar.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Outcomes — plain spec-list on the page background, hairline top rule */}
        <Reveal delay={0.2}>
          <div className="mt-24 border-t border-[#071F2D]/10 pt-12">
            <h3
              className="mb-8 text-2xl font-semibold tracking-tight"
              style={{ color: "#173F38" }}
            >
              What You Can Expect
            </h3>
            <div className="grid gap-5 sm:grid-cols-2">
              {OUTCOMES.map((outcome) => (
                <div key={outcome} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-[#C9A35F]"
                  />
                  <span className="text-[#071F2D]/75">{outcome}</span>
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