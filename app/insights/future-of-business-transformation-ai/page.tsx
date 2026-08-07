"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, MotionConfig } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Section from "@/components/shared/Section";
import Reveal from "@/components/shared/Reveal";

const INK = "#2A2D31";
const GOLD = "#C49A4A";
const HAIRLINE = "rgba(35,39,43,0.12)";

const ARTICLE = {
  category: "Corporate & Financial Strategy",
  title: "The Future of Business Transformation in the AI Era",
  deck:
    "Explore how organizations are leveraging Artificial Intelligence, digital transformation, and strategic leadership to build resilient, future-ready enterprises.",
  date: "July 2026",
  read: "9 min read",
  image: "/insights/future.png",
};

const LEDE =
  "Every prior wave of enterprise technology — the internet, cloud computing, mobile — asked organizations to change where work happened. The current wave, built around artificial intelligence, asks a harder question: what should still be done by a person at all. That distinction is why this transformation cycle looks different from the ones before it, and why the organizations navigating it well are the ones treating it as a strategic question, not an IT rollout.";

const PULL_QUOTE =
  "The advantage no longer belongs to whoever adopts AI first — it belongs to whoever redesigns their organization around what AI makes possible.";

const CLOSING =
  "The AI era will keep rewarding organizations that treat transformation as continuous rather than episodic — a standing capability to rethink how work gets done, not a program with an end date.";

const SECTIONS = [
  {
    id: "augmentation",
    label: "Automation to augmentation",
    heading: "From automation to augmentation",
    paragraphs: [
      "Early enterprise AI projects mostly automated narrow, repetitive tasks — sorting, extracting, flagging. The organizations pulling ahead now are using AI to augment judgment-heavy work: drafting first-pass analysis for a strategist to refine, surfacing patterns a risk team would otherwise miss, compressing research time so decisions move faster. The shift is from replacing steps in a process to changing what the process can accomplish.",
    ],
  },
  {
    id: "resilience-design",
    label: "Resilience by design",
    heading: "Resilience as a design requirement",
    paragraphs: [
      "Building AI into core operations raises the cost of getting governance wrong — model errors, data quality issues, and unclear accountability can now move at the speed of automation rather than the speed of a human reviewer. The organizations building durable AI capability treat oversight, auditability, and human checkpoints as part of the design from day one, not controls bolted on after an incident.",
    ],
  },
  {
    id: "leadership-role",
    label: "Leadership's new role",
    heading: "Leadership's changing role",
    paragraphs: [
      "Executive teams are increasingly judged on how clearly they can explain where AI is and is not being used, and why. That transparency is becoming a leadership skill in its own right — the ability to set realistic expectations with boards, employees, and customers about what a system can reliably do, rather than overselling capability and absorbing the reputational cost when it falls short.",
    ],
  },
  {
    id: "future-ready",
    label: "Future-ready habits",
    heading: "Building a future-ready enterprise",
    paragraphs: [
      "The organizations best positioned for what comes next tend to share three habits: they invest in data quality before they invest in models, they redesign workflows around new capability rather than forcing new tools into old processes, and they build change capacity into their culture so the organization can absorb the next wave as readily as this one. Transformation, on this view, is less a single project and more a permanent operating condition.",
    ],
  },
];

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
    title: "Cybersecurity as a Corporate & Financial Strategy",
    read: "7 min read",
    href: "/insights/cybersecurity-business-strategy",
  },
];

export default function FutureOfBusinessTransformationAiPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen" style={{ backgroundColor: "#F8F5EF" }}>
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&display=swap");
          .font-display {
            font-family: "Fraunces", Georgia, serif;
          }
        `}</style>

        {/* Masthead */}
        <div className="border-b" style={{ borderColor: HAIRLINE }}>
          <Section className="pb-6 pt-10">
            <Link
              href="/insights"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#23272B]/50 transition-colors hover:text-[#123A53]"
            >
              <ArrowLeft
                size={14}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Back to Insights
            </Link>
          </Section>
        </div>

        {/* Header */}
        <Section className="pb-0 pt-16">
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-semibold uppercase tracking-[0.3em]"
                  style={{ color: GOLD }}
                >
                  {ARTICLE.category}
                </span>
                <span className="h-px w-10" style={{ backgroundColor: GOLD }} />
              </div>

              <h1
                className="font-display mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl"
                style={{ color: INK }}
              >
                {ARTICLE.title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#23272B]/70">
                {ARTICLE.deck}
              </p>

              <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#23272B]/45">
                <span>{ARTICLE.date}</span>
                <span aria-hidden="true">·</span>
                <span>{ARTICLE.read}</span>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* Full-bleed hero photograph, subtle parallax */}
        <Reveal delay={0.1}>
          <div
            ref={heroRef}
            className="relative mt-14 h-[46vh] w-full overflow-hidden sm:h-[64vh]"
          >
            <motion.div style={{ scale: heroScale, y: heroY }} className="absolute inset-0">
              <Image
                src={ARTICLE.image}
                fill
                priority
                unoptimized
                alt=""
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(18,58,83,0.35) 0%, rgba(18,58,83,0.05) 40%, rgba(248,245,239,0) 70%)",
                }}
              />
            </motion.div>
          </div>
        </Reveal>

        {/* Body */}
        <Section className="pb-0 pt-16 sm:pt-20">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-[200px_1fr]">
            {/* Sticky contents rail — tracks reading position */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#23272B]/40">
                  On this page
                </span>
                <ul className="mt-5 space-y-4 border-l" style={{ borderColor: HAIRLINE }}>
                  {SECTIONS.map((s) => {
                    const active = activeId === s.id;
                    return (
                      <li key={s.id} className="relative pl-4">
                        <span
                          className="absolute left-[-1px] top-0 h-full w-[2px] transition-colors duration-300"
                          style={{ backgroundColor: active ? GOLD : "transparent" }}
                        />
                        <a
                          href={`#${s.id}`}
                          className="block text-sm leading-5 transition-colors duration-300"
                          style={{
                            color: active ? INK : "rgba(35,39,43,0.45)",
                            fontWeight: active ? 600 : 400,
                          }}
                        >
                          {s.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            {/* Article column */}
            <div className="mx-auto w-full max-w-2xl">
              <p className="text-lg leading-8 text-[#23272B]/80 first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-7xl first-letter:font-semibold first-letter:leading-[0.8]">
                {LEDE}
              </p>

              {SECTIONS.map((s, i) => (
                <div key={s.id}>
                  {i === 1 && (
                    <div className="my-12 border-l-2 pl-6" style={{ borderColor: GOLD }}>
                      <p className="font-display text-2xl italic leading-9" style={{ color: INK }}>
                        {PULL_QUOTE}
                      </p>
                    </div>
                  )}
                  <section
                    id={s.id}
                    ref={(el) => {
                      sectionRefs.current[s.id] = el;
                    }}
                    className="scroll-mt-28 pt-12"
                  >
                    <h2 className="font-display text-2xl font-semibold" style={{ color: INK }}>
                      {s.heading}
                    </h2>
                    {s.paragraphs.map((p, pi) => (
                      <p key={pi} className="mt-5 text-[17px] leading-8 text-[#23272B]/75">
                        {p}
                      </p>
                    ))}
                  </section>
                </div>
              ))}

              <p
                className="font-display mt-14 border-t pt-10 text-xl italic leading-9"
                style={{ color: INK, borderColor: HAIRLINE }}
              >
                {CLOSING}
              </p>
            </div>
          </div>
        </Section>

        {/* Related — editorial index, not a card grid */}
        <Section className="mb-32 mt-28">
          <div className="mx-auto max-w-3xl">
            <div
              className="flex items-baseline justify-between border-b pb-4"
              style={{ borderColor: HAIRLINE }}
            >
              <span
                className="text-xs font-semibold uppercase tracking-[0.3em]"
                style={{ color: GOLD }}
              >
                Continue reading
              </span>
            </div>

            <div>
              {RELATED.map((article, index) => (
                <Reveal key={article.href} delay={0.05 * index}>
                  <Link
                    href={article.href}
                    className="group block border-b"
                    style={{ borderColor: HAIRLINE }}
                  >
                    <div className="flex items-center justify-between gap-6 py-7">
                      <div>
                        <span className="text-[11px] uppercase tracking-[0.2em] text-[#23272B]/40">
                          {article.category}
                        </span>
                        <h3
                          className="font-display mt-2 text-xl font-medium leading-snug transition-colors duration-300 group-hover:text-[#123A53]"
                          style={{ color: INK }}
                        >
                          {article.title}
                        </h3>
                      </div>
                      <div className="flex shrink-0 items-center gap-4">
                        <span className="text-xs uppercase tracking-[0.15em] text-[#23272B]/40">
                          {article.read}
                        </span>
                        <ArrowRight
                          size={16}
                          style={{ color: GOLD }}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      </main>
    </MotionConfig>
  );
}