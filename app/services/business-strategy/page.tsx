"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Target,
  Compass,
  LineChart,
  CheckCircle2,
} from "lucide-react";

import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import Reveal from "@/components/shared/Reveal";
const PILLARS = [
  {
    title: "Enterprise Strategy",
    description:
      "Defining the organisation's strategic direction, priorities and long-term vision to create sustainable competitive advantage.",
    points: [
      "Vision-to-strategy translation",
      "Corporate growth agenda",
      "Strategic portfolio review",
      "Business unit strategy",
      "Three-to-five-year strategic roadmaps",
    ],
  },
  {
    title: "Financial Strategy",
    description:
      "Connecting strategic decisions with capital allocation, financial architecture and value creation to maximize long-term enterprise performance.",
    points: [
      "Capital allocation strategy",
      "Funding and capital structure strategy",
      "Profitability and cash-flow improvement",
      "Return on invested capital analysis",
      "Valuation-led strategic planning",
    ],
  },
  {
    title: "Growth Strategy",
    description:
      "Identifying and prioritising the highest-impact organic and inorganic growth opportunities to accelerate sustainable business expansion.",
    points: [
      "Revenue growth strategy",
      "Customer and segment prioritisation",
      "Channel and distribution strategy",
      "Product and service expansion",
      "Geographic and adjacencies growth",
    ],
  },
];
const OUTCOMES = [
  "Clarity on where and how to compete",
  "Structured, board ready strategic plans",
  "Alignment across leadership and operations",
  "Faster, more confident decision making",
];

export default function BusinessStrategyPage() {
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
              <BriefcaseBusiness size={26} className="text-[#C49A4A]" />
            </div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#C49A4A]">
              Our Services
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <SectionTitle
            title="Corporate and Financial Strategy"
            description="We help organizations determine where to compete, how to win, how to allocate capital and how to convert ambition into durable enterprise value."
            align="left"
          />
        </Reveal>

        {/* Pillars — true glass cards tinted with the brand navy, plain icons (no badge circle) */}
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
    <li
      key={point}
      className="flex items-start gap-3"
    >
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

        {/* Outcomes — plain spec-list on the page background, hairline top rule like Apple's feature lists */}
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
      </Section>
    </main>
  );
}