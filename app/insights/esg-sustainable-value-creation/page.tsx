"use client";
import Image from "next/image";
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
    <main className="min-h-screen bg-[#F8F5EF]">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-[#C49A4A]/12 blur-[170px]"
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
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-[#23272B]/50 transition-colors hover:text-[#C49A4A]"
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
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C49A4A]/30 bg-[#C49A4A]/12 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#C49A4A]">
              <Leaf size={14} />
              {ARTICLE.category}
            </span>

            <h1 className="mt-8 text-4xl font-semibold leading-tight sm:text-6xl tracking-tight"style={{ color: "#2A2D31" }} >
              {ARTICLE.title}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#23272B]/70">
              {ARTICLE.description}
            </p>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-[#23272B]/50">
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
  <div className="relative mx-auto mt-16 h-[280px] max-w-5xl overflow-hidden rounded-3xl sm:h-[340px] lg:h-[420px]">
    <Image
      src="/insights/sustainable.png"
      alt="Operational Excellence Through Process Optimization"
      fill
      priority
      unoptimized
      className="object-cover object-center"
      sizes="(max-width: 768px) 100vw, 1280px"
    />
  </div>
</Reveal>

        <div className="mx-auto mt-20 max-w-3xl">
          <Reveal>
            <GlassCard className="prose-none">
              <div className="space-y-8 leading-8 text-[#23272B]/75">
                <p>
                  Environmental, social, and governance practice was once
                  treated as a reporting obligation — a set of disclosures
                  compiled once a year to satisfy investors and regulators.
                  That framing undersells what ESG has become for
                  organizations that use it well: a discipline for managing
                  long-term risk and building the kind of stakeholder trust
                  that shows up directly in commercial outcomes.
                </p>

                <h2 className="text-2xl font-semibold "style={{ color: "#2A2D31" }}>
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

                <div className="my-10 rounded-2xl border-l-4 border-[#C49A4A] bg-[#F8F5EF]/[0.03] p-6 md:p-8">
                  <Quote size={22} className="text-[#C49A4A]" />
                  <p className="mt-4 text-xl font-medium leading-9 "style={{ color: "#2A2D31" }}>
                    ESG done well is simply long-term risk management, made
                    visible to the people who will eventually pay for it if
                    it is ignored.
                  </p>
                </div>

                <h2 className="text-2xl font-semibold "style={{ color: "#2A2D31" }}>
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

                <h2 className="text-2xl font-semibold "style={{ color: "#2A2D31" }}>
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

                <h2 className="text-2xl font-semibold "style={{ color: "#2A2D31" }}>
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

         
        </div>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-24 mb-32 max-w-5xl">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C49A4A]">
              Continue Reading
            </span>
            <h2 className="mt-4 text-3xl font-semibold "style={{ color: "#2A2D31" }}>
              Related Insights
            </h2>

            <div className="mt-10 grid gap-6 md:p-8 md:grid-cols-3">
              {RELATED.map((article, index) => (
                <Reveal key={article.href} delay={0.1 + index * 0.1}>
                  <Link href={article.href} className="block h-full">
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring" as const, stiffness: 260, damping: 20 }}
                      className="h-full"
                    >
                      <GlassCard className="group flex h-full flex-col">
                        <span className="inline-flex w-fit items-center rounded-full border border-[#C49A4A]/30 bg-[#C49A4A]/12 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#C49A4A]">
                          {article.category}
                        </span>

                        <h3 className="mt-6 flex-1 text-lg font-semibold leading-snug transition-colors duration-300 group-hover:text-[#C49A4A]" style={{ color: "#2A2D31" }}>
                          {article.title}
                        </h3>

                        <div className="mt-6 flex items-center justify-between border-t border-[#2A2D31]/8 pt-5">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#23272B]/50">
                            <Clock3 size={14} />
                            {article.read}
                          </div>
                          <ArrowRight
                            size={15}
                            className="text-[#C49A4A] transition-transform duration-300 group-hover:translate-x-1"
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