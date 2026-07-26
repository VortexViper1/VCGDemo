"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock3,
  Users,
  Quote,
} from "lucide-react";

import Section from "@/components/shared/Section";
import GlassCard from "@/components/shared/GlassCard";
import Reveal from "@/components/shared/Reveal";

const ARTICLE = {
  category: "Leadership",
  title: "Building High-Performance Leadership Teams",
  description:
    "Modern leadership requires adaptability, collaboration, and the ability to guide organizations through uncertainty.",
  date: "July 2026",
  read: "5 min read",
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
    category: "Growth Strategy",
    title: "Scaling Businesses in Emerging Markets",
    read: "6 min read",
    href: "/insights/scaling-businesses-emerging-markets",
  },
];

export default function HighPerformanceLeadershipTeamsPage() {
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
              <Users size={14} />
              {ARTICLE.category}
            </span>

            <h1 className="mt-8 text-4xl font-semibold leading-tight  sm:text-6xl tracking-tight"style={{ color: "#173F38" }}>
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
      src="/insights/leadership.png"
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
                  Leadership teams built for stable conditions often
                  struggle the moment conditions stop being stable. The
                  skills that made a team effective at executing a known
                  plan — clarity, consistency, deep domain expertise — are
                  not the same skills that make a team effective at
                  navigating genuine uncertainty, where the plan itself may
                  need to change mid-quarter.
                </p>

                <h2 className="text-2xl font-semibold "style={{ color: "#173F38" }}>
                  Adaptability as a team capability
                </h2>
                <p>
                  Adaptability is often discussed as an individual trait, but
                  it functions more reliably as a team capability. A
                  leadership team that has built the habit of revisiting
                  assumptions together, surfacing disagreement early, and
                  reallocating resources without a lengthy approval cycle
                  can respond to a shifting market far faster than a
                  collection of individually adaptable leaders who have
                  never practiced doing it together.
                </p>

                <div className="my-10 rounded-2xl border-l-4 border-[#C9A35F] bg-[#F7F4EE]/[0.03] p-8">
                  <Quote size={22} className="text-[#C9A35F]" />
                  <p className="mt-4 text-xl font-medium leading-9 "style={{ color: "#173F38" }}>
                    The strongest leadership teams are not the ones who agree
                    fastest — they are the ones who disagree productively
                    and still leave the room aligned.
                  </p>
                </div>

                <h2 className="text-2xl font-semibold "style={{ color: "#173F38" }}>
                  Collaboration over hierarchy
                </h2>
                <p>
                  Organizations facing genuine uncertainty benefit from
                  leadership structures where information flows quickly
                  across functions, not just up and down a hierarchy. A
                  supply chain issue, a customer signal, or a competitive
                  move often touches several parts of the business at once,
                  and the leadership teams that respond fastest are the ones
                  who have built direct relationships across functions long
                  before the issue arrives.
                </p>

                <h2 className="text-2xl font-semibold "style={{ color: "#173F38" }}>
                  Guiding through uncertainty without false certainty
                </h2>
                <p>
                  Employees do not expect leadership to have every answer
                  during a difficult period, but they do notice when
                  leadership pretends to. Teams that communicate what they
                  know, what they do not, and what they are watching for
                  build more durable trust than teams that project
                  confidence they cannot back up. That honesty becomes a
                  competitive advantage when conditions eventually test it.
                </p>

                <h2 className="text-2xl font-semibold "style={{ color: "#173F38" }}>
                  Investing in the team, not just the individuals
                </h2>
                <p>
                  Most leadership development still focuses on individual
                  executives — coaching, assessments, personal growth plans.
                  Organizations building genuinely high-performing teams pair
                  that individual investment with deliberate team practice:
                  structured decision reviews, shared language for
                  discussing risk, and regular working sessions on the
                  hardest calls the business is facing, rather than only the
                  routine ones.
                </p>

                <p>
                  A leadership team's real test is not how it performs when
                  the plan is working. It is how quickly and coherently it
                  moves when the plan stops working — and that capability is
                  built deliberately, well before it is needed.
                </p>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-3xl border border-[#173F38]/8 bg-[#F7F4EE]/[0.03] p-8 sm:flex-row">
              <p className="text-center text-[#071F2D]/70 sm:text-left">
                Looking to strengthen how your leadership team operates
                under pressure?
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