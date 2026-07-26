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
      className="bg-[#F7F4EE]"
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
                    <div className="rounded-full bg-[#C9A35F]/12 p-2">
                      <Icon
                        size={18}
                        className="text-[#C9A35F]"
                      />
                    </div>

                    <span
  className="text-lg font-medium"
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
                  className="transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A35F]/40 hover:shadow-[0_25px_80px_rgba(23,63,56,0.12)]"
                >
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-6xl tracking-tight font-bold "style={{ color: "#173F38" }}>
                        {metric.value}
                      </h3>

                      <p className="mt-3 text-[#071F2D]/70">
                        {metric.label}
                      </p>
                    </div>

                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A35F]/20 bg-[#C9A35F]/12">
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

                <h3 className="text-3xl font-semibold leading-snug "style={{ color: "#173F38" }}>
                  Strategy is valuable only when execution creates measurable impact.
                </h3>

                <p
  className="leading-8"
  style={{ color: "#6E847F" }}
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