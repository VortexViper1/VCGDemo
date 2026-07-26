"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock3,
  ShieldCheck,
  Quote,
} from "lucide-react";

import Section from "@/components/shared/Section";
import GlassCard from "@/components/shared/GlassCard";
import Reveal from "@/components/shared/Reveal";

const ARTICLE = {
  category: "Cybersecurity",
  title: "Cybersecurity as a Business Strategy",
  description:
    "Cyber resilience has become a strategic advantage, enabling organizations to innovate securely and protect trust.",
  date: "July 2026",
  read: "7 min read",
};

const RELATED = [
  {
    category: "Digital Transformation",
    title: "Digital Transformation Beyond Technology",
    read: "6 min read",
    href: "/insights/digital-transformation-beyond-technology",
  },
  {
    category: "Operations",
    title: "Operational Excellence Through Process Optimization",
    read: "5 min read",
    href: "/insights/operational-excellence-process-optimization",
  },
  {
    category: "Leadership",
    title: "Building High-Performance Leadership Teams",
    read: "5 min read",
    href: "/insights/high-performance-leadership-teams",
  },
];

export default function CybersecurityBusinessStrategyPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE]">
      {/* Ambient background, consistent with the rest of the site */}
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

      {/* HERO */}
      <Section className="pt-40">
        <Reveal>
          <Link
            href="/insights"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-[#071F2D]/50 transition-colors hover:text-[#C9A35F]"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Insights
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A35F]/30 bg-[#C9A35F]/12 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#C9A35F]">
              <ShieldCheck size={14} />
              {ARTICLE.category}
            </span>

            <h1 className="mt-8 text-4xl font-semibold leading-tight sm:text-6xl tracking-tight"style={{ color: "#173F38" }} >
              {ARTICLE.title}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#071F2D]/70">
              {ARTICLE.description}
            </p>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-[#071F2D]/50">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {ARTICLE.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock3 size={16} />
                {ARTICLE.read}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Hero visual band, echoing the featured-insight treatment */}
        <Reveal delay={0.2}>
          <div className="relative mx-auto mt-16 flex h-[280px] max-w-5xl items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#123A53] via-[#0E2B40] to-[#071F2D] sm:h-[340px]">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute h-64 w-64 rounded-full border border-[#C9A35F]/20 sm:h-80 sm:w-80"
            />
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              className="absolute h-44 w-44 rounded-full border border-[#173F38]/8 sm:h-56 sm:w-56"
            />
           <Image
  src="/insights/cyber.png"
  fill
  priority
  unoptimized
  alt="Cyber"
  className="object-cover"
/>
          </div>
        </Reveal>

        {/* ARTICLE BODY */}
        <div className="mx-auto mt-20 max-w-3xl">
          <Reveal>
            <GlassCard className="prose-none">
              <div className="space-y-8 leading-8 text-[#071F2D]/75">
                <p>
                  For most of the last two decades, cybersecurity sat inside
                  the IT department as a cost of doing business — a set of
                  controls meant to keep intruders out and auditors
                  satisfied. That framing no longer holds. As commerce,
                  operations, and customer relationships move onto digital
                  rails, the strength of an organization's security posture
                  increasingly determines what it is allowed to build, who
                  will trust it with data, and how quickly it can move
                  without inviting disaster.
                </p>

                <h2 className="text-2xl font-semibold "style={{ color: "#173F38" }}>
                  From cost center to competitive advantage
                </h2>
                <p>
                  Boards that once measured security spending purely by
                  incidents avoided now ask a different question: does our
                  security posture let us do things competitors cannot?
                  Organizations with mature security practices can adopt new
                  technologies faster, enter regulated markets sooner, and
                  close enterprise deals that require rigorous vendor
                  assessments. Security maturity has become a credential —
                  one that opens doors that stay closed to less prepared
                  competitors.
                </p>

                <div className="my-10 rounded-2xl border-l-4 border-[#C9A35F] bg-[#F7F4EE]/[0.03] p-8">
                  <Quote size={22} className="text-[#C9A35F]" />
                  <p className="mt-4 text-xl font-medium leading-9 "style={{ color: "#173F38" }}>
                    Resilience is no longer about preventing every breach —
                    it is about ensuring the business keeps running when one
                    happens.
                  </p>
                </div>

                <h2 className="text-2xl font-semibold "style={{ color: "#173F38" }}>
                  Building resilience, not just defenses
                </h2>
                <p>
                  A strategic approach to cybersecurity accepts that
                  incidents will occur and designs the organization to
                  absorb them. That means segmenting critical systems so a
                  single compromise cannot cascade, rehearsing incident
                  response the way pilots rehearse emergency procedures, and
                  building recovery time objectives into the same planning
                  conversations as revenue targets. Resilience, measured this
                  way, becomes a operating capability rather than a
                  technical checkbox.
                </p>

                <h2 className="text-2xl font-semibold "style={{ color: "#173F38" }}>
                  Trust as the real asset being protected
                </h2>
                <p>
                  Customers, partners, and regulators extend trust based on
                  visible discipline: how transparently an organization
                  communicates after an incident, how carefully it handles
                  personal data, and how consistently it meets the
                  commitments it makes about security. That trust compounds
                  over time and is expensive to rebuild once broken, which is
                  why leading organizations treat data protection and
                  transparent governance as brand assets rather than
                  compliance line items.
                </p>

                <h2 className="text-2xl font-semibold "style={{ color: "#173F38" }}>
                  Making security a leadership conversation
                </h2>
                <p>
                  Embedding cybersecurity into strategy starts with language.
                  When security leaders present risk in terms of business
                  outcomes — revenue at risk, contracts jeopardized, time to
                  recovery — rather than technical severity scores, the rest
                  of the leadership team can weigh it against every other
                  strategic trade-off they make. That shared vocabulary is
                  what turns cybersecurity from a specialist's concern into a
                  shared organizational priority.
                </p>

                <h2 className="text-2xl font-semibold "style={{ color: "#173F38" }}>
                  Where organizations should start
                </h2>
                <p>
                  Few organizations need to do everything at once. The
                  highest-value starting points are usually the simplest to
                  identify: knowing which systems and data actually matter
                  most, testing recovery plans before they are needed under
                  pressure, and giving security leadership a genuine seat in
                  strategic planning rather than a report-only role. From
                  there, resilience becomes a habit the organization builds
                  rather than a project it completes.
                </p>

                <p>
                  Cyber resilience, approached this way, stops being
                  insurance against a bad outcome and becomes part of how an
                  organization earns the right to grow.
                </p>
              </div>
            </GlassCard>
          </Reveal>

          {/* Share / CTA */}
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-3xl border border-[#173F38]/8 bg-[#F7F4EE]/[0.03] p-8 sm:flex-row">
              <p className="text-center text-[#071F2D]/70 sm:text-left">
                Want to assess where your organization stands on cyber
                resilience?
              </p>
              <Link href="/#contact">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 whitespace-nowrap rounded-full bg-[#C9A35F] px-7 py-3.5 font-semibold text-[#071F2D] transition-shadow duration-300 hover:shadow-[0_0_30px_-6px_rgba(201,163,95,0.6)]"
                >
                  Talk to Our Team
                  <ArrowRight size={18} />
                </motion.span>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* RELATED INSIGHTS */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-24 mb-32 max-w-5xl">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C9A35F]">
              Continue Reading
            </span>
            <h2 className="mt-4 text-3xl font-semibold "style={{ color: "#173F38" }}>
              Related Insights
            </h2>

            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {RELATED.map((article, index) => (
                <Reveal key={article.href} delay={0.1 + index * 0.1}>
                  <Link href={article.href} className="block h-full">
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring" as const, stiffness: 260, damping: 20 }}
                      className="h-full"
                    >
                      <GlassCard className="group flex h-full flex-col">
                        <span className="inline-flex w-fit items-center rounded-full border border-[#C9A35F]/30 bg-[#C9A35F]/12 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#C9A35F]">
                          {article.category}
                        </span>

                        <h3 className="mt-6 flex-1 text-lg font-semibold leading-snug  transition-colors duration-300 group-hover:text-[#C9A35F]"style={{ color: "#173F38" }}>
                          {article.title}
                        </h3>

                        <div className="mt-6 flex items-center justify-between border-t border-[#173F38]/8 pt-5">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#071F2D]/50">
                            <Clock3 size={14} />
                            {article.read}
                          </div>
                          <ArrowRight
                            size={15}
                            className="text-[#C9A35F] transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </div>
                      </GlassCard>
                    </motion.div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}