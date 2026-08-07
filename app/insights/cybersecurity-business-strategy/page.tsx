"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, MotionConfig } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Section from "@/components/shared/Section";
import Reveal from "@/components/shared/Reveal";

const INK = "#2A2D31";
const NAVY = "#123A53";
const GOLD = "#C49A4A";
const HAIRLINE = "rgba(35,39,43,0.12)";

const ARTICLE = {
  category: "Cybersecurity",
  title: "Cybersecurity as a Corporate & Financial Strategy",
  deck:
    "Cyber resilience has become a strategic advantage, enabling organizations to innovate securely and protect trust.",
  date: "July 2026",
  read: "7 min read",
};

const LEDE =
  "For most of the last two decades, cybersecurity sat inside the IT department as a cost of doing business — a set of controls meant to keep intruders out and auditors satisfied. That framing no longer holds. As commerce, operations, and customer relationships move onto digital rails, the strength of an organization's security posture increasingly determines what it is allowed to build, who will trust it with data, and how quickly it can move without inviting disaster.";

const PULL_QUOTE =
  "Resilience is no longer about preventing every breach — it is about ensuring the business keeps running when one happens.";

const CLOSING =
  "Cyber resilience, approached this way, stops being insurance against a bad outcome and becomes part of how an organization earns the right to grow.";

const SECTIONS = [
  {
    id: "cost-center",
    label: "Cost center to advantage",
    heading: "From cost center to competitive advantage",
    paragraphs: [
      "Boards that once measured security spending purely by incidents avoided now ask a different question: does our security posture let us do things competitors cannot? Organizations with mature security practices can adopt new technologies faster, enter regulated markets sooner, and close enterprise deals that require rigorous vendor assessments. Security maturity has become a credential — one that opens doors that stay closed to less prepared competitors.",
    ],
  },
  {
    id: "resilience",
    label: "Building resilience",
    heading: "Building resilience, not just defenses",
    paragraphs: [
      "A strategic approach to cybersecurity accepts that incidents will occur and designs the organization to absorb them. That means segmenting critical systems so a single compromise cannot cascade, rehearsing incident response the way pilots rehearse emergency procedures, and building recovery time objectives into the same planning conversations as revenue targets. Resilience, measured this way, becomes an operating capability rather than a technical checkbox.",
    ],
  },
  {
    id: "trust",
    label: "Trust as the asset",
    heading: "Trust as the real asset being protected",
    paragraphs: [
      "Customers, partners, and regulators extend trust based on visible discipline: how transparently an organization communicates after an incident, how carefully it handles personal data, and how consistently it meets the commitments it makes about security. That trust compounds over time and is expensive to rebuild once broken, which is why leading organizations treat data protection and transparent governance as brand assets rather than compliance line items.",
    ],
  },
  {
    id: "leadership",
    label: "A leadership conversation",
    heading: "Making security a leadership conversation",
    paragraphs: [
      "Embedding cybersecurity into strategy starts with language. When security leaders present risk in terms of business outcomes — revenue at risk, contracts jeopardized, time to recovery — rather than technical severity scores, the rest of the leadership team can weigh it against every other strategic trade-off they make. That shared vocabulary is what turns cybersecurity from a specialist's concern into a shared organizational priority.",
    ],
  },
  {
    id: "start",
    label: "Where to start",
    heading: "Where organizations should start",
    paragraphs: [
      "Few organizations need to do everything at once. The highest-value starting points are usually the simplest to identify: knowing which systems and data actually matter most, testing recovery plans before they are needed under pressure, and giving security leadership a genuine seat in strategic planning rather than a report-only role. From there, resilience becomes a habit the organization builds rather than a project it completes.",
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
                src="/insights/cyber.png"
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