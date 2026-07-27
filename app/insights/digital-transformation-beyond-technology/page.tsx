"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock3,
  Layers,
  Quote,
} from "lucide-react";
import Image from "next/image";
import Section from "@/components/shared/Section";
import GlassCard from "@/components/shared/GlassCard";
import Reveal from "@/components/shared/Reveal";

const ARTICLE = {
  category: "Digital Transformation",
  title: "Digital Transformation Beyond Technology",
  description:
    "Transformation succeeds when organizations align people, processes, and technology toward a common strategic vision.",
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

export default function DigitalTransformationBeyondTechnologyPage() {
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
              <Layers size={14} />
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
      src="/insights/digital.png"
      alt="Digital Transformation Beyond Technology"
      fill
      priority
      unoptimized
      sizes="(max-width:768px) 100vw, 1280px"
      className="object-cover object-center"
    />
  </div>
</Reveal>

        <div className="mx-auto mt-20 max-w-3xl">
          <Reveal>
            <GlassCard className="prose-none">
              <div className="space-y-8 leading-8 text-[#071F2D]/75">
                <p>
                  Most digital transformation programs are sold as technology
                  purchases: a new platform, a cloud migration, an
                  analytics suite. Most digital transformation programs also
                  fail to deliver their promised value — and rarely because
                  the technology itself was flawed. The gap almost always
                  sits between the new system and the people expected to
                  work differently because of it.
                </p>

                <h2 className="text-2xl font-semibold "style={{ color: "#173F38" }}>
                  Technology is the easy part
                </h2>
                <p>
                  Implementing software is a project with a defined end
                  date. Changing how a workforce makes decisions, hands off
                  work, and measures success is not — it is an ongoing shift
                  in operating culture. Organizations that treat the
                  technology rollout as the finish line, rather than the
                  starting point, tend to see usage quietly decline once the
                  launch enthusiasm fades and old habits reassert
                  themselves.
                </p>

                <div className="my-10 rounded-2xl border-l-4 border-[#C9A35F] bg-[#F7F4EE]/[0.03] p-6 md:p-8">
                  <Quote size={22} className="text-[#C9A35F]" />
                  <p className="mt-4 text-xl font-medium leading-9 "style={{ color: "#173F38" }}>
                    A new system adopted by an unchanged organization simply
                    produces the old outcomes, faster and more expensively.
                  </p>
                </div>

                <h2 className="text-2xl font-semibold "style={{ color: "#173F38" }}>
                  Aligning people, process, and platform
                </h2>
                <p>
                  Durable transformation treats people, process, and
                  technology as three variables that must move together. New
                  tools should be introduced alongside redesigned workflows,
                  not layered on top of existing ones. Roles and incentives
                  need to reflect the behavior the organization actually
                  wants, and managers need enough runway to coach their
                  teams through the transition rather than being handed a
                  go-live date and a training deck.
                </p>

                <h2 className="text-2xl font-semibold "style={{ color: "#173F38" }}>
                  Sequencing matters more than speed
                </h2>
                <p>
                  The organizations that transform successfully tend to
                  resist the urge to change everything at once. They pick a
                  process with clear, measurable pain, redesign it end to
                  end, prove the value, and use that credibility to expand.
                  Sequencing this way builds internal champions and gives
                  leadership real evidence to point to, rather than asking
                  the organization to trust a large investment on faith.
                </p>

                <h2 className="text-2xl font-semibold "style={{ color: "#173F38" }}>
                  Leadership has to model the change
                </h2>
                <p>
                  Employees calibrate how seriously to take a transformation
                  by watching what leadership actually does, not what it
                  announces. When executives keep using old reporting
                  formats or approve exceptions to the new process, that
                  signal spreads through the organization faster than any
                  memo. Visible, consistent leadership behavior is often the
                  cheapest and most effective transformation tool available.
                </p>

                <p>
                  Technology enables transformation, but it does not cause
                  it. The organizations that get this right treat the
                  platform as one input among several, and invest just as
                  deliberately in the people and processes that determine
                  whether it is ever truly used.
                </p>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-3xl border border-[#173F38]/8 bg-[#F7F4EE]/[0.03] p-6 md:p-8 sm:flex-row">
              <p className="text-center text-[#071F2D]/70 sm:text-left">
                Planning a transformation program and want a second opinion
                on sequencing?
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