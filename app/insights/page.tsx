"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock3,
} from "lucide-react";

import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import GlassCard from "@/components/shared/GlassCard";
import Reveal from "@/components/shared/Reveal";

const FEATURED = {
  category: "Corporate & Financial Strategy",
  title: "The Future of Business Transformation in the AI Era",
  description:
    "Explore how organizations are leveraging Artificial Intelligence, digital transformation, and strategic leadership to build resilient, future-ready enterprises.",
  date: "July 2026",
  read: "9 min read",
  href: "/insights/future-of-business-transformation-ai",
};

const ARTICLES = [
  {
    category: "Digital Transformation",
    title: "Digital Transformation Beyond Technology",
    description:
      "Transformation succeeds when organizations align people, processes, and technology toward a common strategic vision.",
    read: "6 min read",
    href: "/insights/digital-transformation-beyond-technology",
  },
  {
    category: "Leadership",
    title: "Building High-Performance Leadership Teams",
    description:
      "Modern leadership requires adaptability, collaboration, and the ability to guide organizations through uncertainty.",
    read: "5 min read",
    href: "/insights/high-performance-leadership-teams",
  },
  {
    category: "Cybersecurity",
    title: "Cybersecurity as a Corporate & Financial Strategy",
    description:
      "Cyber resilience has become a strategic advantage, enabling organizations to innovate securely and protect trust.",
    read: "7 min read",
    href: "/insights/cybersecurity-business-strategy",
  },
  {
    category: "Growth Strategy",
    title: "Scaling Businesses in Emerging Markets",
    description:
      "Sustainable growth requires strategic expansion, localized execution, and operational excellence.",
    read: "6 min read",
    href: "/insights/scaling-businesses-emerging-markets",
  },
  {
    category: "Operations",
    title: "Operational Excellence Through Process Optimization",
    description:
      "Continuous improvement helps organizations reduce complexity while improving quality and customer value.",
    read: "5 min read",
    href: "/insights/operational-excellence-process-optimization",
  },
  {
    category: "Sustainability",
    title: "Creating Sustainable Value Through ESG Leadership",
    description:
      "Organizations integrating sustainability into strategy strengthen resilience and Long term stakeholder value.",
    read: "6 min read",
    href: "/insights/esg-sustainable-value-creation",
  },
];

// Fixed positions/delays so the particles don't reshuffle on every re-render
const PARTICLES = [
  { left: "6%", size: 3, duration: 9, delay: 0 },
  { left: "16%", size: 2, duration: 12, delay: 1.4 },
  { left: "27%", size: 4, duration: 10.5, delay: 2.8 },
  { left: "38%", size: 2, duration: 8, delay: 0.6 },
  { left: "52%", size: 3, duration: 11, delay: 3.6 },
  { left: "64%", size: 2, duration: 9.5, delay: 1.9 },
  { left: "75%", size: 4, duration: 13, delay: 0.3 },
  { left: "85%", size: 2, duration: 10, delay: 2.2 },
  { left: "93%", size: 3, duration: 12.5, delay: 4.1 },
];

function EmberField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "-10%", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
          }}
          className="absolute bottom-0 rounded-full bg-[#C49A4A] shadow-[0_0_8px_2px_rgba(201,163,95,0.6)]"
        />
      ))}
    </div>
  );
}

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-[#C49A4A]/12 blur-[170px]"
        />

        <motion.div
          animate={{
            x: [0, -70, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[#123A53]/40 blur-[180px]"
        />
      </div>

      {/* HERO */}
      <Section className="relative pt-40">
        {/* Signature moment: a slow drift of embers rising through the hero,
            echoing the gold accent without competing with the copy. */}
        <EmberField />

        <Reveal>
          <Link href="/" className="group relative z-10 inline-flex focus-visible:outline-none">
            <span className="pointer-events-auto relative z-30 inline-flex w-fit items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-[13px] font-medium text-[#23272B] transition-all duration-300 hover:scale-105 hover:bg-[#D9822B] hover:text-white sm:text-sm">
              <ArrowLeft
                size={15}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Back to Home
            </span>
          </Link>
        </Reveal>

        <div className="relative z-10">
          <Reveal delay={0.1}>
            <SectionTitle
              eyebrow="VISWAAS INSIGHTS"
              title="Perspectives That Shape Tomorrow's Business Leaders"
              description="Original research, executive perspectives, and strategic thinking from Viswaas Consulting Group designed to help organizations navigate transformation, innovation, and sustainable growth."
              align="center"
            />
          </Reveal>

          {/* FEATURED INSIGHT */}
          <Reveal delay={0.2}>
            <div className="mt-20">
              <Link href={FEATURED.href} className="group block">
                <GlassCard className="overflow-hidden">
                  <div className="grid gap-10 lg:grid-cols-2">
                    {/* LEFT */}
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full border border-[#C49A4A]/30 bg-[#C49A4A]/12 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#C49A4A]">
                          Featured Insight
                        </span>
                      </div>

                      <h1
                        className="mt-8 text-6xl tracking-tight font-semibold leading-tight"
                        style={{ color: "#2A2D31" }}
                      >
                        {FEATURED.title}
                      </h1>

                      <p className="mt-8 text-lg leading-9 text-[#23272B]/70">
                        {FEATURED.description}
                      </p>

                      <div className="mt-10 flex flex-wrap gap-6 text-[#6B807A]">
                        <div className="flex items-center gap-2">
                          <Calendar size={18} />
                          {FEATURED.date}
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock3 size={18} />
                          {FEATURED.read}
                        </div>
                      </div>

                      <span className="pointer-events-auto relative z-30 mt-12 inline-flex w-fit items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-[13px] font-medium text-[#23272B] transition-all duration-300 hover:scale-105 hover:bg-[#D9822B] hover:text-white sm:text-sm">
                        Read Insight
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>

                {/* RIGHT - VISWAAS Logo */}

<div className="relative flex min-h-[460px] items-center justify-center overflow-hidden rounded-[32px] bg-[#0C2234]">

  <div className="absolute h-[340px] w-[340px] rounded-full bg-[#C49A4A]/12 blur-[120px]" />

  <motion.div
    animate={{ rotate: [0, 360] }}
    transition={{
      duration: 40,
      repeat: Infinity,
      ease: "linear",
    }}
    className="absolute h-[420px] w-[420px] rounded-full border border-[#C49A4A]/15"
  />

  <motion.div
    animate={{ rotate: [360, 0] }}
    transition={{
      duration: 30,
      repeat: Infinity,
      ease: "linear",
    }}
    className="absolute h-[300px] w-[300px] rounded-full border border-white/5"
  />

  <motion.div
    animate={{
      y: [-6, 6, -6],
      scale: [1, 1.02, 1],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="relative z-20"
  >
    <Image
      src="/logo/MAIN LOGO.png"
      alt="VISWAAS"
      width={300}
      height={300}
      className="object-contain"
      priority
    />
  </motion.div>

  <motion.span
    animate={{ y: [-8, 8, -8] }}
    transition={{ duration: 6, repeat: Infinity }}
    className="absolute left-[20%] top-[25%] h-2 w-2 rounded-full bg-[#C49A4A]"
  />

  <motion.span
    animate={{ y: [8, -8, 8] }}
    transition={{ duration: 8, repeat: Infinity }}
    className="absolute right-[18%] bottom-[28%] h-2 w-2 rounded-full bg-[#C49A4A]"
  />

</div>
</div>
                </GlassCard>
              </Link>
            </div>
          </Reveal>

          {/* ARTICLE GRID STARTS BELOW */}
          <Reveal delay={0.1}>
            <div className="mt-24 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.35em] text-[#C49A4A]">
                  Latest Thinking
                </span>

                <h2 className="mt-4 text-3xl font-semibold" style={{ color: "#2A2D31" }}>
                  More Insights
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-6 text-[#23272B]/50">
                Perspectives across strategy, technology, and leadership from
                our consulting practice.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((article, index) => (
              <Reveal key={article.href} delay={0.1 + (index % 3) * 0.1}>
                <Link href={article.href} className="block h-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring" as const, stiffness: 260, damping: 20 }}
                    className="h-full"
                  >
                    <GlassCard className="group flex h-full flex-col overflow-hidden">
                      <span className="inline-flex w-fit items-center rounded-full border border-[#C49A4A]/30 bg-[#C49A4A]/12 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#C49A4A]">
                        {article.category}
                      </span>

                      <h3
                        className="mt-6 text-xl font-semibold leading-snug transition-colors duration-300 group-hover:text-[#C49A4A]"
                        style={{ color: "#2A2D31" }}
                      >
                        {article.title}
                      </h3>

                      <p className="mt-4 flex-1 text-sm leading-7 text-[#6B807A]">
                        {article.description}
                      </p>

                      <div className="mt-8 flex items-center justify-between border-t border-[#2A2D31]/8 pt-6">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#23272B]/50">
                          <Clock3 size={14} />
                          {article.read}
                        </div>

                        <span className="pointer-events-auto relative z-30 inline-flex w-fit items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-[12px] font-medium text-[#23272B] transition-all duration-300 hover:scale-105 hover:bg-[#D9822B] hover:text-white">
                          Read
                          <ArrowRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </span>
                      </div>
                    </GlassCard>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}