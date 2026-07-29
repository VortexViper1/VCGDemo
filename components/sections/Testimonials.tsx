"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import Reveal from "@/components/shared/Reveal";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import GlassCard from "@/components/shared/GlassCard";

const TESTIMONIALS = [
  {
    company: "Global Manufacturing Enterprise",
    quote:
      "VISWAS provided strategic clarity during one of our most significant transformation initiatives. Their expertise accelerated execution and delivered measurable business value.",
    author: "Managing Director",
  },
  {
    company: "Private Investment Group",
    quote:
      "Their capital advisory team demonstrated exceptional financial insight, helping us structure investments with confidence and long-term sustainability.",
    author: "Chief Executive Officer",
  },
  {
    company: "Healthcare Network",
    quote:
      "Professional, insightful, and execution focused. VISWAS became an extension of our leadership team throughout our transformation journey.",
    author: "Board Member",
  },
];

const LOGOS = ["FORTUNE", "VENTURES", "GLOBAL", "CAPITAL", "ENTERPRISE", "GROUP"];

export default function Testimonials() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Section id="testimonials" className="relative overflow-hidden bg-[#F7F4EE]">
      {/* Ambient background — consistent with other sections */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-[#C9A35F]/12 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#23363F]/30 blur-[140px]"
        />
      </div>

      <Reveal>
        <SectionTitle
          eyebrow="CLIENT TRUST"
          title="Trusted by organizations building the future."
          description="Long-term partnerships are built through measurable outcomes, strategic thinking, and consistent execution."
          align="center"
        />
      </Reveal>

      <div
        className="mt-20 grid gap-8 lg:grid-cols-3"
        onMouseLeave={() => setHovered(null)}
        onTouchStart={() => setHovered(null)}
      >
        {TESTIMONIALS.map((item, index) => {
          const isHovered = hovered === index;
          const isDimmed = hovered !== null && hovered !== index;

          return (
            <Reveal key={item.company} delay={index * 0.15}>
              <motion.div
                onMouseEnter={() => setHovered(index)}
                onTouchStart={() => setHovered(index)}
                animate={{
                  scale: isHovered ? 1.04 : isDimmed ? 0.97 : 1,
                  opacity: isDimmed ? 0.55 : 1,
                  y: isHovered ? -8 : 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full"
              >
                <GlassCard
                  className={`group flex h-full flex-col transition-shadow duration-700
ease-out ${
                    isHovered
                      ? "shadow-[0_25px_70px_-15px_rgba(201,163,95,0.25)] border-[#C9A35F]/30"
                      : ""
                  }`}
                >
                  <motion.div
                    animate={{
                      rotate: isHovered ? -8 : 0,
                      scale: isHovered ? 1.08 : 1,
                    }}
                    transition={{ type: "spring" as const, stiffness: 250, damping: 15 }}
                    className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border transition-colors duration-700
ease-out ${
                      isHovered
                        ? "border-[#C9A35F]/50 bg-[#C9A35F]/20"
                        : "border-[#C9A35F]/20 bg-[#C9A35F]/12"
                    }`}
                  >
                    <Quote size={30} className="text-[#C9A35F]" />
                  </motion.div>

                  <p className="flex-1 text-lg leading-9 text-[#071F2D]/75">
                    “{item.quote}”
                  </p>

                  <div className="relative mt-12 pt-6">
                    {/* Animated top border that transitions in on hover */}
                    <div className="absolute inset-x-0 top-0 h-px bg-[#F7F4EE]/10">
                      <motion.div
                        animate={{ width: isHovered ? "100%" : "0%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="
absolute
inset-y-0
left-0
bg-gradient-to-r
from-[#D4AF37]
via-[#F4D675]
to-[#D4AF37]
"
                      />
                    </div>

                    <h4 className="text-lg font-semibold "style={{ color: "#173F38" }}>
                      {item.author}
                    </h4>

                    <p className="mt-2 text-sm uppercase tracking-[0.25em] text-[#C9A35F]">
                      {item.company}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.5}>
        <div className="mt-24 rounded-[32px] border border-[#173F38]/8 bg-[#F7F4EE]/[0.03] px-8 py-10 backdrop-blur-2xl">
          <div className="grid grid-cols-2 items-center gap-8 opacity-50 md:grid-cols-3 lg:grid-cols-6">
            {LOGOS.map((logo) => (
              <motion.div
                key={logo}
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
                className="text-center text-sm font-semibold uppercase tracking-[0.35em] text-[#071F2D]/40 transition-colors duration-300 hover:text-[#C9A35F]"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}