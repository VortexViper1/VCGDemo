"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock3,
  TrendingUp,
  Quote,
} from "lucide-react";

import Section from "@/components/shared/Section";
import GlassCard from "@/components/shared/GlassCard";
import Reveal from "@/components/shared/Reveal";

const ARTICLE = {
  category: "Business Strategy",
  title: "The Future of Business Transformation in the AI Era",
  description:
    "Explore how organizations are leveraging Artificial Intelligence, digital transformation, and strategic leadership to build resilient, future-ready enterprises.",
  date: "July 2026",
  read: "9 min read",
};

const RELATED = [
  {
    category: "Digital Transformation",
    title: "Digital Transformation Beyond Technology",
    read: "6 min read",
    href: "/insights/digital-transformation-beyond-technology",
  },
  {
    category: "Leadership",
    title: "Building High-Performance Leadership Teams",
    read: "5 min read",
    href: "/insights/high-performance-leadership-teams",
  },
  {
    category: "Cybersecurity",
    title: "Cybersecurity as a Business Strategy",
    read: "7 min read",
    href: "/insights/cybersecurity-business-strategy",
  },
];

export default function FutureOfBusinessTransformationAiPage() {
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
              <TrendingUp size={14} />
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
      src="/insights/future.png"
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
                  Every prior wave of enterprise technology — the internet,
                  cloud computing, mobile — asked organizations to change
                  where work happened. The current wave, built around
                  artificial intelligence, asks a harder question: what
                  should still be done by a person at all. That distinction
                  is why this transformation cycle looks different from the
                  ones before it, and why the organizations navigating it
                  well are the ones treating it as a strategic question, not
                  an IT rollout.
                </p>

                <h2 className="text-2xl font-semibold "style={{ color: "#173F38" }}>
                  From automation to augmentation
                </h2>
                <p>
                  Early enterprise AI projects mostly automated narrow,
                  repetitive tasks — sorting, extracting, flagging. The
                  organizations pulling ahead now are using AI to augment
                  judgment-heavy work: drafting first-pass analysis for a
                  strategist to refine, surfacing patterns a risk team would
                  otherwise miss, compressing research time so decisions
                  move faster. The shift is from replacing steps in a
                  process to changing what the process can accomplish.
                </p>

                <div className="my-10 rounded-2xl border-l-4 border-[#C9A35F] bg-[#F7F4EE]/[0.03] p-6 md:p-8">
                  <Quote size={22} className="text-[#C9A35F]" />
                  <p className="mt-4 text-xl font-medium leading-9 "style={{ color: "#173F38" }}>
                    The advantage no longer belongs to whoever adopts AI
                    first — it belongs to whoever redesigns their
                    organization around what AI makes possible.
                  </p>
                </div>

                <h2 className="text-2xl font-semibold "style={{ color: "#173F38" }}>
                  Resilience as a design requirement
                </h2>
                <p>
                  Building AI into core operations raises the cost of
                  getting governance wrong — model errors, data quality
                  issues, and unclear accountability can now move at the
                  speed of automation rather than the speed of a human
                  reviewer. The organizations building durable AI
                  capability treat oversight, auditability, and human
                  checkpoints as part of the design from day one, not
                  controls bolted on after an incident.
                </p>

                <h2 className="text-2xl font-semibold "style={{ color: "#173F38" }}>
                  Leadership's changing role
                </h2>
                <p>
                  Executive teams are increasingly judged on how clearly
                  they can explain where AI is and is not being used, and
                  why. That transparency is becoming a leadership skill in
                  its own right — the ability to set realistic expectations
                  with boards, employees, and customers about what a system
                  can reliably do, rather than overselling capability and
                  absorbing the reputational cost when it falls short.
                </p>

                <h2 className="text-2xl font-semibold "style={{ color: "#173F38" }}>
                  Building a future-ready enterprise
                </h2>
                <p>
                  The organizations best positioned for what comes next tend
                  to share three habits: they invest in data quality before
                  they invest in models, they redesign workflows around new
                  capability rather than forcing new tools into old
                  processes, and they build change capacity into their
                  culture so the organization can absorb the next wave as
                  readily as this one. Transformation, on this view, is less
                  a single project and more a permanent operating
                  condition.
                </p>

                <p>
                  The AI era will keep rewarding organizations that treat
                  transformation as continuous rather than episodic — a
                  standing capability to rethink how work gets done, not a
                  program with an end date.
                </p>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-3xl border border-[#173F38]/8 bg-[#F7F4EE]/[0.03] p-6 md:p-8 sm:flex-row">
              <p className="text-center text-[#071F2D]/70 sm:text-left">
                Thinking through where AI fits in your organization's
                strategy?
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

                        <h3 className="mt-6 flex-1 text-lg font-semibold leading-snug transition-colors duration-300 group-hover:text-[#C9A35F]" style={{ color: "#173F38" }}>
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