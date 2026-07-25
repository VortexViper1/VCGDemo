"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Cloud,
  Bot,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import GlassCard from "@/components/shared/GlassCard";
import Reveal from "@/components/shared/Reveal";

const PILLARS = [
  {
    icon: Bot,
    title: "AI & Automation",
    description:
      "Embedding intelligent automation into workflows to reduce manual effort and accelerate decision-making.",
  },
  {
    icon: Cloud,
    title: "Cloud Modernization",
    description:
      "Migrating and re-architecting infrastructure for scalability, resilience, and cost efficiency.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Operating Models",
    description:
      "Building digital-first operations with security and compliance embedded from the ground up.",
  },
];

const OUTCOMES = [
  "Modernized, future-ready infrastructure",
  "Reduced manual overhead through automation",
  "Stronger security and compliance posture",
  "Faster time-to-value on digital initiatives",
];

export default function DigitalTransformationPage() {
  return (
    <main className="min-h-screen bg-[#071F2D]">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-[#C9A35F]/10 blur-[170px]"
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
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-white/50 transition-colors duration-300 hover:text-[#C9A35F]"
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
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C9A35F]/20 bg-[#C9A35F]/10">
              <Sparkles size={30} className="text-[#C9A35F]" />
            </div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#C9A35F]">
              Our Services
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <SectionTitle
            title="Digital Transformation"
            description="Modernizing enterprises using AI, automation, cloud technologies, and digital-first operating models."
            align="left"
          />
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={0.1 + index * 0.1}>
                <GlassCard className="h-full">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-[#C9A35F]/20 bg-[#C9A35F]/10">
                    <Icon size={26} className="text-[#C9A35F]" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-[#F7F4EE]">
                    {pillar.title}
                  </h3>
                  <p className="leading-7 text-white/70">
                    {pillar.description}
                  </p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <GlassCard className="mt-16">
            <h3 className="mb-6 text-2xl font-semibold text-[#F7F4EE]">
              What You Can Expect
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {OUTCOMES.map((outcome) => (
                <div key={outcome} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-[#C9A35F]"
                  />
                  <span className="text-white/80">{outcome}</span>
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