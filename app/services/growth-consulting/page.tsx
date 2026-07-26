"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingUp,
  Users,
  Cog,
  Rocket,
  CheckCircle2,
} from "lucide-react";

import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import GlassCard from "@/components/shared/GlassCard";
import Reveal from "@/components/shared/Reveal";

const PILLARS = [
  {
    icon: Users,
    title: "Market Expansion",
    description:
      "Identifying new customer segments, channels, and geographies with the highest growth potential.",
  },
  {
    icon: Cog,
    title: "Operational Efficiency",
    description:
      "Streamlining processes and resource allocation to scale operations without scaling complexity.",
  },
  {
    icon: Rocket,
    title: "Scaling Playbooks",
    description:
      "Building repeatable systems and structures that support sustainable, confident scaling.",
  },
];

const OUTCOMES = [
  "Clear, prioritized growth opportunities",
  "Leaner, more efficient operations",
  "Repeatable systems for scaling teams",
  "Data-backed decisions at every stage",
];

export default function GrowthConsultingPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE]">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-[#C9A35F]/12 blur-[170px]"
        />
        <motion.div
          animate={{ x: [0, -70, 0], y: [0, 80, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[#123A53]/40 blur-[180px]"
        />
      </div>

      <Section className="pt-40">
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
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C9A35F]/20 bg-[#C9A35F]/12">
              <TrendingUp size={30} className="text-[#C9A35F]" />
            </div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#C9A35F]">
              Our Services
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <SectionTitle
            title="Growth Consulting"
            description="Helping organizations identify opportunities, optimize operations, and scale with confidence."
            align="left"
          />
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={0.1 + index * 0.1}>
                <GlassCard className="h-full">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-[#C9A35F]/20 bg-[#C9A35F]/12">
                    <Icon size={26} className="text-[#C9A35F]" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold "style={{ color: "#173F38" }}>
                    {pillar.title}
                  </h3>
                  <p className="leading-7 text-[#071F2D]/70">
                    {pillar.description}
                  </p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <GlassCard className="mt-16">
            <h3 className="mb-6 text-2xl font-semibold "style={{ color: "#173F38" }}>
              What You Can Expect
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {OUTCOMES.map((outcome) => (
                <div key={outcome} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-[#C9A35F]"
                  />
                  <span className="text-[#071F2D]/80">{outcome}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-16 flex justify-center">
            <Link
              href="/#contact"
              className="rounded-full bg-[#C9A35F] px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#071F2D] transition-transform duration-300 hover:scale-105"
            >
              Start a Conversation
            </Link>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}