"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Award, Zap, Gauge, ClipboardCheck, CheckCircle2 } from "lucide-react";

import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import Reveal from "@/components/shared/Reveal";

const POINTS = [
  {
    title: "Beyond Recommendations",
    description:
      "We stay through implementation, taking ownership of outcomes rather than handing off a slide deck.",
  },
  {
    title: "Measurable Impact",
    description:
      "Every engagement is anchored to metrics defined upfront — so success is never a matter of opinion.",
  },
  {
    title: "Disciplined Delivery",
    description:
      "Structured project management and clear accountability at every stage of execution.",
  },
];

const OUTCOMES = [
  "Strategies that actually get implemented",
  "Clear, agreed-upon success metrics",
  "Hands-on support through execution, not just planning",
  "Results you can point to, not just recommendations",
];

export default function ExecutionExcellencePage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE]">
      <Section className="pt-40 pb-32">
        <Reveal>
          <Link
            href="/#about"
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

        {/* Business photo — replace src with your own image in /public/about/ */}
        <Reveal delay={0.18}>
          <div className="relative mt-12 h-[360px] w-full overflow-hidden rounded-[28px] border border-[#173F38]/10 md:h-[440px]">
            <Image
              src="/about/execution.png"
              alt="Execution Excellence — VISWAS team tracking project delivery metrics"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#173F38]/35 via-transparent to-transparent" />
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
                      "linear-gradient(160deg, rgba(23, 63, 56, 0.92) 0%, rgba(7, 31, 45, 0.96) 100%)",
                    borderColor: "rgba(255, 255, 255, 0.12)",
                    boxShadow:
                      "0 12px 40px rgba(7, 31, 45, 0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
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
          <div className="mt-24 border-t border-[#173F38]/10 pt-12">
            <h3 className="mb-8 text-2xl font-semibold tracking-tight text-[#173F38]">
              What You Can Expect
            </h3>
            <div className="grid gap-5 sm:grid-cols-2">
              {OUTCOMES.map((outcome) => (
                <div key={outcome} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" />
                  <span className="text-[#173F38]/75">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}