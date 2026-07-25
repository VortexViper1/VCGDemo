"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Award, Zap, Gauge, ClipboardCheck, CheckCircle2 } from "lucide-react";

import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import GlassCard from "@/components/shared/GlassCard";
import Reveal from "@/components/shared/Reveal";

const POINTS = [
  {
    icon: Zap,
    title: "Beyond Recommendations",
    description:
      "We stay through implementation, taking ownership of outcomes rather than handing off a slide deck.",
  },
  {
    icon: Gauge,
    title: "Measurable Impact",
    description:
      "Every engagement is anchored to metrics defined upfront — so success is never a matter of opinion.",
  },
  {
    icon: ClipboardCheck,
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
    <main className="min-h-screen bg-primary">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[170px]"
        />
        <motion.div
          animate={{ x: [0, -70, 0], y: [0, 80, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-ivory/5 blur-[180px]"
        />
      </div>

      <Section className="pt-40">
        <Reveal>
          <Link
            href="/#about"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-ivory/50 transition-colors duration-300 hover:text-accent"
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Why VISWAS
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10">
              <Award size={30} className="text-accent" />
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
          <div className="relative mt-12 h-[360px] w-full overflow-hidden rounded-2xl border border-ivory/10 md:h-[440px]">
            <Image
              src="/about/execution.png"
              alt="Execution Excellence — VISWAS team tracking project delivery metrics"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {POINTS.map((point, index) => {
            const Icon = point.icon;
            return (
              <Reveal key={point.title} delay={0.1 + index * 0.1}>
                <GlassCard className="h-full">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-accent/20 bg-accent/10">
                    <Icon size={26} className="text-accent" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-ivory">{point.title}</h3>
                  <p className="leading-7 text-ivory/70">{point.description}</p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <GlassCard className="mt-16">
            <h3 className="mb-6 text-2xl font-semibold text-ivory">What You Can Expect</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {OUTCOMES.map((outcome) => (
                <div key={outcome} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-accent" />
                  <span className="text-ivory/80">{outcome}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>

       
      </Section>
    </main>
  );
}