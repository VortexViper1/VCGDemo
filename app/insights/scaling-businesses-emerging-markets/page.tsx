"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock3,
  Globe2,
  Quote,
} from "lucide-react";

import Section from "@/components/shared/Section";
import GlassCard from "@/components/shared/GlassCard";
import Reveal from "@/components/shared/Reveal";

const ARTICLE = {
  category: "Growth Strategy",
  title: "Scaling Businesses in Emerging Markets",
  description:
    "Sustainable growth requires strategic expansion, localized execution, and operational excellence.",
  date: "July 2026",
  read: "6 min read",
};

const RELATED = [
  {
    category: "Operations",
    title: "Operational Excellence Through Process Optimization",
    read: "5 min read",
    href: "/insights/operational-excellence-process-optimization",
  },
  {
    category: "Sustainability",
    title: "Creating Sustainable Value Through ESG Leadership",
    read: "6 min read",
    href: "/insights/esg-sustainable-value-creation",
  },
  {
    category: "Leadership",
    title: "Building High-Performance Leadership Teams",
    read: "5 min read",
    href: "/insights/high-performance-leadership-teams",
  },
];

export default function ScalingBusinessesEmergingMarketsPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE]">
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
              <Globe2 size={14} />
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

       <Reveal delay={0.2}>
  <div className="relative mx-auto mt-16 h-[280px] max-w-5xl overflow-hidden rounded-3xl sm:h-[340px] lg:h-[420px]">
    <Image
      src="/insights/scaling.png"
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
              <div className="space-y-8 leading-8 text-[#071F2D]/75">
                <p>
                  Emerging markets offer some of the most attractive growth
                  curves available to an expanding business — and some of
                  the least forgiving conditions for a strategy copied
                  directly from a home market. The organizations that scale
                  successfully treat expansion as a series of local
                  strategies loosely connected by a shared brand, not a
                  single playbook exported unchanged across borders.
                </p>

                <h2 className="text-2xl font-semibold "style={{ color: "#173F38" }}>
                  Strategic expansion starts with sequencing
                </h2>
                <p>
                  Which market to enter first, and in what order, often
                  matters more than how quickly an organization enters any
                  single one. Markets with regulatory familiarity, existing
                  partner relationships, or customer bases similar to a
                  proven market tend to offer faster, lower-risk learning
                  than markets chosen purely for size. Early wins in the
                  right sequence build the operational muscle and internal
                  credibility needed to take on harder markets later.
                </p>

                <div className="my-10 rounded-2xl border-l-4 border-[#C9A35F] bg-[#071F2D]/[0.03] p-6 md:p-8">
                  <Quote size={22} className="text-[#C9A35F]" />
                  <p className="mt-4 text-xl font-medium leading-9 "style={{ color: "#173F38" }}>
                    A strategy that worked at home is a hypothesis abroad,
                    not a guarantee — and treating it as a guarantee is the
                    most common way expansion plans quietly fail.
                  </p>
                </div>

                <h2 className="text-2xl font-semibold "style={{ color: "#173F38" }}>
                  Localized execution, not just localized marketing
                </h2>
                <p>
                  Localization is often reduced to translating a website or
                  adjusting a marketing campaign, but the deeper work happens
                  in operations: payment methods customers actually trust,
                  distribution partners who understand local logistics
                  realities, pricing calibrated to local purchasing power,
                  and hiring practices that reflect local labor norms. These
                  operational details determine whether a locally adapted
                  brand actually functions as a locally adapted business.
                </p>

                <h2 className="text-2xl font-semibold "style={{ color: "#173F38" }}>
                  Operational excellence as a growth constraint
                </h2>
                <p>
                  Growth in a new market is frequently limited less by
                  demand than by an organization's ability to deliver
                  reliably — fulfillment, quality control, and customer
                  support that hold up as volume increases. Investing in
                  operational discipline before scaling aggressively
                  prevents the common failure mode where early customer
                  enthusiasm curdles into frustration once the business
                  cannot keep pace with its own growth.
                </p>

                <h2 className="text-2xl font-semibold "style={{ color: "#173F38" }}>
                  Governance that travels well
                </h2>
                <p>
                  As organizations add markets, the temptation is to grant
                  local teams full autonomy to avoid slowing them down.
                  Sustainable scaling usually finds a middle path: clear
                  non-negotiables around brand, quality, and compliance set
                  centrally, with genuine latitude for local teams to adapt
                  everything else. That balance keeps expansion coherent
                  without recreating a rigid, one-size-fits-all model that
                  emerging markets tend to punish.
                </p>

                <p>
                  Scaling into emerging markets rewards patience with
                  sequencing and rigor in execution far more than it rewards
                  speed alone. The businesses that get this right treat each
                  market as its own strategic problem, worth solving on its
                  own terms.
                </p>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-3xl border border-[#173F38]/8 bg-[#071F2D]/[0.03] p-6 md:p-8 sm:flex-row">
              <p className="text-center text-[#071F2D]/70 sm:text-left">
                Evaluating which market to enter next, and in what order?
              </p>
              <Link href="/contact">
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
            <h2 className="mt-4 text-3xl font-semibold "style={{ color: "#173F38" }}>
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
                        <span className="inline-flex w-fit items-center rounded-full border border-[#C9A35F]/30 bg-[#C9A35F]/12 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#C9A35F]">
                          {article.category}
                        </span>

                        <h3 className="mt-6 flex-1 text-lg font-semibold leading-snug transition-colors duration-300 group-hover:text-[#C9A35F]"style={{ color: "#173F38" }} >
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