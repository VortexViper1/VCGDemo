"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock3,
  Settings2,
  Quote,
} from "lucide-react";

import Section from "@/components/shared/Section";
import GlassCard from "@/components/shared/GlassCard";
import Reveal from "@/components/shared/Reveal";

const ARTICLE = {
  category: "Operations",
  title: "Operational Excellence Through Process Optimization",
  description:
    "Continuous improvement helps organizations reduce complexity while improving quality and customer value.",
  date: "July 2026",
  read: "5 min read",
};

const RELATED = [
  {
    category: "Growth Strategy",
    title: "Scaling Businesses in Emerging Markets",
    read: "6 min read",
    href: "/insights/scaling-businesses-emerging-markets",
  },
  {
    category: "Digital Transformation",
    title: "Digital Transformation Beyond Technology",
    read: "6 min read",
    href: "/insights/digital-transformation-beyond-technology",
  },
  {
    category: "Sustainability",
    title: "Creating Sustainable Value Through ESG Leadership",
    read: "6 min read",
    href: "/insights/esg-sustainable-value-creation",
  },
];

export default function OperationalExcellenceProcessOptimizationPage() {
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
            href="/insights"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-[#C9A35F]"
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
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A35F]/30 bg-[#C9A35F]/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#C9A35F]">
              <Settings2 size={14} />
              {ARTICLE.category}
            </span>

            <h1 className="mt-8 text-4xl font-semibold leading-tight text-[#F7F4EE] sm:text-5xl">
              {ARTICLE.title}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
              {ARTICLE.description}
            </p>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-white/50">
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
              className="absolute h-44 w-44 rounded-full border border-white/10 sm:h-56 sm:w-56"
            />
            <Settings2 size={64} className="relative z-10 text-[#C9A35F]" />
          </div>
        </Reveal>

        <div className="mx-auto mt-20 max-w-3xl">
          <Reveal>
            <GlassCard className="prose-none">
              <div className="space-y-8 leading-8 text-white/75">
                <p>
                  Most organizations do not suffer from a lack of process —
                  they suffer from too many processes that accumulated over
                  years without anyone stepping back to ask whether they
                  still serve the customer or the business. Operational
                  excellence is less about adding new procedures and more
                  about removing the complexity that no longer earns its
                  keep.
                </p>

                <h2 className="text-2xl font-semibold text-[#F7F4EE]">
                  Complexity is a cost, not a feature
                </h2>
                <p>
                  Every additional approval step, handoff, or exception rule
                  makes a process a little slower and a little harder to
                  train someone on — costs that rarely show up on a
                  spreadsheet but accumulate into real drag on speed and
                  quality. Organizations that audit their processes
                  regularly, and remove steps that exist for historical
                  reasons rather than current ones, tend to move faster
                  without sacrificing control.
                </p>

                <div className="my-10 rounded-2xl border-l-4 border-[#C9A35F] bg-white/[0.03] p-8">
                  <Quote size={22} className="text-[#C9A35F]" />
                  <p className="mt-4 text-xl font-medium leading-9 text-[#F7F4EE]">
                    The best process is the simplest one that still protects
                    what actually needs protecting — everything past that
                    point is friction.
                  </p>
                </div>

                <h2 className="text-2xl font-semibold text-[#F7F4EE]">
                  Continuous improvement over one-time overhauls
                </h2>
                <p>
                  Large, infrequent process redesigns tend to generate a
                  burst of improvement followed by slow decay, as the
                  organization drifts back toward old habits once attention
                  moves elsewhere. A steady cadence of smaller improvements —
                  reviewed monthly or quarterly against a small set of
                  metrics — tends to compound into more durable gains than
                  an occasional, disruptive redesign.
                </p>

                <h2 className="text-2xl font-semibold text-[#F7F4EE]">
                  Measuring quality and value together
                </h2>
                <p>
                  Process optimization efforts that focus purely on speed or
                  cost reduction frequently erode the quality or experience
                  the customer actually values. The organizations that get
                  this balance right track customer-facing quality
                  measures alongside internal efficiency measures, so a
                  process improvement that saves time but quietly degrades
                  service gets caught before it compounds.
                </p>

                <h2 className="text-2xl font-semibold text-[#F7F4EE]">
                  Giving frontline teams ownership
                </h2>
                <p>
                  The people closest to a process are usually the first to
                  notice where it breaks down, yet process improvement is
                  often designed entirely by teams several layers removed
                  from the actual work. Organizations that build simple,
                  low-friction channels for frontline teams to flag and
                  propose fixes tend to catch problems earlier and build
                  more buy-in for the changes that follow.
                </p>

                <p>
                  Operational excellence is rarely the product of a single
                  transformation effort. It is the compounding result of an
                  organization that keeps asking, deliberately and often,
                  whether the way it works still matches what it is trying
                  to achieve.
                </p>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:flex-row">
              <p className="text-center text-white/70 sm:text-left">
                Want a fresh look at where complexity is slowing your
                operations down?
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

        <Reveal delay={0.1}>
          <div className="mx-auto mt-24 mb-32 max-w-5xl">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C9A35F]">
              Continue Reading
            </span>
            <h2 className="mt-4 text-3xl font-semibold text-[#F7F4EE]">
              Related Insights
            </h2>

            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {RELATED.map((article, index) => (
                <Reveal key={article.href} delay={0.1 + index * 0.1}>
                  <Link href={article.href} className="block h-full">
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="h-full"
                    >
                      <GlassCard className="group flex h-full flex-col">
                        <span className="inline-flex w-fit items-center rounded-full border border-[#C9A35F]/30 bg-[#C9A35F]/10 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#C9A35F]">
                          {article.category}
                        </span>

                        <h3 className="mt-6 flex-1 text-lg font-semibold leading-snug text-[#F7F4EE] transition-colors duration-300 group-hover:text-[#C9A35F]">
                          {article.title}
                        </h3>

                        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50">
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