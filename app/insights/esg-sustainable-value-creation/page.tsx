"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock3,
  Leaf,
  Quote,
} from "lucide-react";

import Section from "@/components/shared/Section";
import GlassCard from "@/components/shared/GlassCard";
import Reveal from "@/components/shared/Reveal";

const ARTICLE = {
  category: "Sustainability",
  title: "Creating Sustainable Value Through ESG Leadership",
  description:
    "Organizations integrating sustainability into strategy strengthen resilience and long-term stakeholder value.",
  date: "July 2026",
  read: "6 min read",
};

const RELATED = [
  {
    category: "Growth Strategy",
    title: "Scaling Businesses in Emerging Markets",
    read: "6 min read",
    href: "/insights/scaling-businesses-emerging-markets",
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

export default function EsgSustainableValueCreationPage() {
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
              <Leaf size={14} />
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
            <Leaf size={64} className="relative z-10 text-[#C9A35F]" />
          </div>
        </Reveal>

        <div className="mx-auto mt-20 max-w-3xl">
          <Reveal>
            <GlassCard className="prose-none">
              <div className="space-y-8 leading-8 text-white/75">
                <p>
                  Environmental, social, and governance practice was once
                  treated as a reporting obligation — a set of disclosures
                  compiled once a year to satisfy investors and regulators.
                  That framing undersells what ESG has become for
                  organizations that use it well: a discipline for managing
                  long-term risk and building the kind of stakeholder trust
                  that shows up directly in commercial outcomes.
                </p>

                <h2 className="text-2xl font-semibold "style={{ color: "#F7F4EE" }}>
                  Beyond the compliance checklist
                </h2>
                <p>
                  Organizations that treat ESG purely as compliance tend to
                  produce reports that satisfy the letter of a requirement
                  while doing little to change how decisions get made.
                  Organizations that treat it as strategy use the same
                  underlying data — emissions, labor practices, board
                  composition, supply chain exposure — to identify risks and
                  opportunities years before they show up on a balance
                  sheet.
                </p>

                <div className="my-10 rounded-2xl border-l-4 border-[#C9A35F] bg-white/[0.03] p-8">
                  <Quote size={22} className="text-[#C9A35F]" />
                  <p className="mt-4 text-xl font-medium leading-9 "style={{ color: "#F7F4EE" }}>
                    ESG done well is simply long-term risk management, made
                    visible to the people who will eventually pay for it if
                    it is ignored.
                  </p>
                </div>

                <h2 className="text-2xl font-semibold "style={{ color: "#F7F4EE" }}>
                  Resilience shows up in the supply chain first
                </h2>
                <p>
                  Climate exposure, labor conditions, and governance quality
                  in a supply chain tend to surface as operational
                  disruptions long before they appear in a sustainability
                  report — a single-source supplier in a flood-prone region,
                  a partner with labor practices that create reputational
                  exposure. Organizations that map these risks early can
                  diversify or remediate before a disruption forces the
                  decision on their timeline instead of the market's.
                </p>

                <h2 className="text-2xl font-semibold "style={{ color: "#F7F4EE" }}>
                  Stakeholder trust compounds
                </h2>
                <p>
                  Employees increasingly choose employers, and customers
                  increasingly choose vendors, based on demonstrated values
                  rather than stated ones. Consistent, credible ESG practice
                  builds a reputation that makes recruiting easier, retention
                  stronger, and customer relationships more durable during
                  difficult periods — the kind of goodwill that is nearly
                  impossible to purchase once a crisis has already
                  eroded it.
                </p>

                <h2 className="text-2xl font-semibold "style={{ color: "#F7F4EE" }}>
                  Making ESG a strategic function
                </h2>
                <p>
                  The organizations furthest along give ESG leadership a
                  genuine seat in strategic planning, tie material metrics to
                  business unit incentives, and report progress with the same
                  rigor and consistency as financial results. Handled this
                  way, ESG stops being a communications exercise and becomes
                  a lens the whole organization uses to make better,
                  longer-horizon decisions.
                </p>

                <p>
                  Sustainable value creation is not a separate strategy that
                  runs alongside the business plan — in organizations that
                  do it well, it is simply how the business plan accounts
                  for risks and relationships that play out over years
                  rather than quarters.
                </p>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:flex-row">
              <p className="text-center text-white/70 sm:text-left">
                Looking to build ESG into your long-term strategy rather
                than your annual report?
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
            <h2 className="mt-4 text-3xl font-semibold "style={{ color: "#F7F4EE" }}>
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