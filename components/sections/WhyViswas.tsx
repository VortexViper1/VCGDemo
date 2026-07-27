"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Award,
  Globe2,
  Handshake,
  Lightbulb,
} from "lucide-react";

import Reveal from "@/components/shared/Reveal";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import GlassCard from "@/components/shared/GlassCard";

const FEATURES = [
  {
    icon: Lightbulb,
    title: "Strategic Intelligence",
    description:
      "Data-driven insights combined with executive expertise to solve complex business challenges.",
  },
  {
    icon: Globe2,
    title: "Global Perspective",
    description:
      "Combining international best practices with local market understanding for sustainable growth.",
  },
  {
    icon: Handshake,
    title: "Trusted Partnership",
    description:
      "Working alongside leadership teams as long-term advisors rather than short-term consultants.",
  },
  {
    icon: Award,
    title: "Execution Excellence",
    description:
      "Strategies backed by measurable execution frameworks that deliver tangible business outcomes.",
  },
];

const STATS = [
  { value: "98%", label: "Client Retention" },
  { value: "15+", label: "Years Combined Experience" },
  { value: "24/7", label: "Leadership Support" },
];

function CountUpStat({ value, delay }: { value: string; delay: number }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState("0");

  // Extract a countable number + trailing suffix (e.g. "98%" -> 98, "%")
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (!inView || target === null) {
      if (inView) setDisplay(value);
      return;
    }

    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target).toString());
      if (progress < 1) requestAnimationFrame(tick);
    };

    const timeout = setTimeout(() => requestAnimationFrame(tick), delay * 1000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <h3 ref={ref} className="text-6xl tracking-tight font-bold  tabular-nums"style={{ color: "#173F38" }}>
      {display}
      {suffix}
    </h3>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[number];
  index: number;
}) {
  const Icon = feature.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${py * -6}deg`);
    el.style.setProperty("--ry", `${px * 6}deg`);
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <Reveal delay={index * 0.1}>
      <div style={{ perspective: 1000 }}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ y: -6 }}
          transition={{ type: "spring" as const, stiffness: 220, damping: 20 }}
          style={{
            transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
            transformStyle: "preserve-3d",
          }}
          className="h-full transition-transform duration-300 ease-out"
        >
          <GlassCard className="group relative h-full overflow-hidden">
            <span className="absolute right-6 top-6 font-serif text-6xl tracking-tight font-bold text-[#071F2D]/[0.04] transition-colors duration-700
ease-out group-hover:text-[#C9A35F]/10">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="relative flex h-full flex-col">
              <motion.div
                whileHover={{ rotate: -8, scale: active ? 1.05 : 1 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
                className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C9A35F]/20 bg-[#C9A35F]/12 transition-colors duration-700
ease-out group-hover:border-[#C9A35F]/50 group-hover:bg-[#C9A35F]/20"
              >
                <Icon size={30} className="text-[#C9A35F]" />
              </motion.div>

              <h3 className="mb-5 text-2xl font-semibold "style={{ color: "#173F38" }}>
                {feature.title}
              </h3>

              <p className="flex-1 leading-8 text-[#071F2D]/70">
                {feature.description}
              </p>

              <motion.div
                whileHover={{ x: 5 }}
                className="mt-10 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-[#C9A35F]"
              >
                Discover More
                <ArrowRight size={16} />
              </motion.div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </Reveal>
  );
}

export default function WhyViswas() {
  return (
    <Section id="why-viswas" className="relative overflow-hidden bg-[#F7F4EE]">
      {/* Ambient background depth — consistent with other sections */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-16 top-1/3 h-96 w-96 rounded-full bg-[#C9A35F]/12 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-[#23363F]/30 blur-[140px]"
        />
      </div>

      <div className="grid gap-20 lg:grid-cols-12">
        {/* Left */}
        <div className="lg:col-span-5">
          <Reveal>
            <SectionTitle
              eyebrow="WHY VISWAS"
              title="A consulting partner committed to lasting transformation."
              description="We believe exceptional consulting goes beyond recommendations. It requires ownership, execution, and measurable impact."
            />
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative mt-14 space-y-10 pl-8">
              {/* Animated vertical rail replacing the static border */}
              <div className="absolute inset-y-0 left-0 w-px bg-[#F7F4EE]/10">
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "top" }}
                  className="absolute inset-0 bg-gradient-to-b from-[#C9A35F] to-transparent"
                />
              </div>

              {STATS.map((item, index) => (
                <motion.div
                  key={item.label}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring" as const, stiffness: 250, damping: 20 }}
                >
                  <CountUpStat value={item.value} delay={index * 0.15} />
                  <p className="
mt-4
font-[var(--font-sans)]
text-sm
uppercase
tracking-[0.16em]
text-[#6E847F]
">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right */}
        <div className="grid gap-6 md:p-8 md:grid-cols-2 lg:col-span-7">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}