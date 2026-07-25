"use client";

import {
  Target,
  PiggyBank,
  Sparkles,
  Handshake,
  Briefcase,
  Landmark,
  Building2,
} from "lucide-react";

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
    icon: Sparkles,
  },
  {
    label: "Long-term partnerships",
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
      className="bg-[#071F2D]"
    >
      <div className="grid items-center gap-20 lg:grid-cols-2">
        {/* Left */}

        <Reveal>
          <div>
            <SectionTitle
              eyebrow="ABOUT VISWAS"
              title="Building enduring businesses through strategy, capital, and transformation."
              description="VISWAS Consulting Group partners with ambitious organizations, investors, and institutions to solve complex business challenges with clarity, innovation, and measurable impact."
            />

            <div className="mt-10 space-y-6">
              {VALUES.map((item) => {

                const Icon = item.icon;

                return (

                  <div
                    key={item.label}
                    className="flex items-center gap-4"
                  >
                    <div className="rounded-full bg-[#C9A35F]/10 p-2">
                      <Icon
                        size={18}
                        className="text-[#C9A35F]"
                      />
                    </div>

                    <span className="text-lg text-white/80">
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
                  className="transition-all duration-300 hover:border-[#C9A35F]/40"
                >
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-5xl font-bold "style={{ color: "#F7F4EE" }}>
                        {metric.value}
                      </h3>

                      <p className="mt-3 text-white/70">
                        {metric.label}
                      </p>
                    </div>

                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A35F]/20 bg-[#C9A35F]/10">
                      <Icon
                        size={26}
                        className="text-[#C9A35F]"
                      />
                    </div>
                  </div>
                </GlassCard>

              );

            })}

            <GlassCard>
              <div className="space-y-6">
                <span className="text-xs uppercase tracking-[0.35em] text-[#C9A35F]">
                  Our Philosophy
                </span>

                <h3 className="text-3xl font-semibold leading-snug "style={{ color: "#F7F4EE" }}>
                  Strategy is valuable only when execution creates measurable impact.
                </h3>

                <p className="leading-8 text-white/70">
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