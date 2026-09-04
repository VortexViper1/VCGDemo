"use client";

import {
  Target,
  PiggyBank,
  Workflow,
  Handshake,
  Briefcase,
  Landmark,
  Building2,
} from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "@/components/shared/Reveal";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import GlassCard from "@/components/shared/GlassCard";

const VALUES = [
  {
    label: "Strategy driven execution",
    icon: Target,
  },
  {
    label: "Capital & investment advisory",
    icon: PiggyBank,
  },
  {
    label: "Digital transformation",
    icon: Workflow,
  },
  {
    label: "Long term partnerships",
    icon: Handshake,
  },
];

const METRICS = [
  {
    value: "250+",
    label: "Projects Delivered",
    icon: Briefcase,
  },
  {
    value: "$2B+",
    label: "Capital Facilitated",
    icon: Landmark,
  },
  {
    value: "18+",
    label: "Industries Served",
    icon: Building2,
  },
];

export default function About() {
  return (
    <Section
      id="about"
      className="bg-[#FFFFFF]"
    >
      <div className="grid items-center gap-24 lg:grid-cols-2 xl:gap-32">
        {/* Left */}

        <Reveal>
          <div>
            <SectionTitle
              eyebrow="ABOUT VISWAAS"
              title="Building enduring businesses through strategy, capital, and transformation."
              description="Viswaas Consulting Group partners with ambitious organizations, investors, and institutions to solve complex business challenges with clarity, innovation, and measurable impact."
            />
            <div className="mt-10 mb-12 flex items-center gap-4">
  <div className="h-px w-16 bg-[#D9822B]" />
</div>

            <div className="mt-10 space-y-6">
              {VALUES.map((item) => {

                const Icon = item.icon;

                return (

                  <div
                    key={item.label}
                    className="flex items-center gap-4"
                  >
                    <div
  className="
    rounded-full
    bg-[#D9822B]/10
    p-3
    transition-all
    duration-700
ease-out
    group-hover:bg-[#D9822B]
    group-hover:scale-110
"
>
                      
                    </div>

                    <span
  className="
font-[var(--font-sans)]
text-[19px]
font-medium
tracking-[0.01em]
"
  style={{ color: "#44665F" }}
>
                      {item.label}
                    </span>
                  </div>

                );

              })}
            </div>
          </div>
        </Reveal>

        {/* Right */}

        <Reveal delay={0.2}>
          <div className="space-y-6">
            {METRICS.map((metric) => {

              const Icon = metric.icon;

              return (

                <GlassCard
                  key={metric.label}
                  className="transition-all duration-700
ease-out hover:-translate-y-3
hover:scale-[1.02] hover:border-[#C49A4A]/40 hover:shadow-[0_25px_80px_rgba(23,63,56,0.12)]"
                >
                  <div>
                    <div>
                      <motion.h3
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{
    duration: 0.7,
    ease: [0.16, 1, 0.3, 1],
  }}
  className="
    font-[var(--font-display)]
    text-[clamp(3.2rem,4vw,4.8rem)]
    font-semibold
    leading-none
    tracking-[-0.04em]
  "
  style={{ color: "#2A2D31" }}
>
  {metric.value}
  <div className="mt-5 h-px w-16 bg-[#D9822B]/70" />
</motion.h3>

                      <p className="
mt-4
font-[var(--font-sans)]
text-sm
uppercase
tracking-[0.16em]
text-[#6C7278]
">
                        {metric.label}
                      </p>
                    </div>

                   
                  </div>
                </GlassCard>

              );

            })}

            <GlassCard
  className="
    relative
    overflow-hidden
    transition-all
    duration-700
    hover:-translate-y-3
    hover:scale-[1.02]
    hover:border-[#C49A4A]/40
    before:absolute
    before:inset-0
    before:bg-gradient-to-b
    before:from-[#C49A4A]/5
    before:to-transparent
    before:opacity-0
    hover:before:opacity-100
    before:transition-opacity
  "
>
              <div className="space-y-6">
                <span className="text-xs uppercase tracking-[0.35em] text-[#D9822B]">
                  Our Philosophy
                </span>

                <h3 className="text-3xl font-semibold leading-snug "style={{ color: "#2A2D31" }}>
                  Strategy is valuable only when execution creates measurable impact.
                </h3>

                <p
  className="
font-[var(--font-sans)]
text-[18px]
leading-[1.9]
tracking-[0.01em]
"
  style={{ color: "#6C7278" }}
>
                  Every engagement combines strategic thinking,
                  financial insight, operational excellence, and
                  digital innovation to create sustainable business
                  growth.
                </p>
              </div>
            </GlassCard>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}