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
  category: "Leadership",
  title: "Building High-Performance Leadership Teams",
  deck:
    "Modern leadership requires adaptability, collaboration, and the ability to guide organizations through uncertainty.",
  date: "July 2026",
  read: "5 min read",
  image: "/insights/leadership.png",
};

const LEDE =
  "Leadership teams built for stable conditions often struggle the moment conditions stop being stable. The skills that made a team effective at executing a known plan — clarity, consistency, deep domain expertise — are not the same skills that make a team effective at navigating genuine uncertainty, where the plan itself may need to change mid-quarter.";

const PULL_QUOTE =
  "The strongest leadership teams are not the ones who agree fastest — they are the ones who disagree productively and still leave the room aligned.";

const CLOSING =
  "A leadership team's real test is not how it performs when the plan is working. It is how quickly and coherently it moves when the plan stops working — and that capability is built deliberately, well before it is needed.";

const SECTIONS = [
  {
    id: "adaptability",
    label: "A team capability",
    heading: "Adaptability as a team capability",
    paragraphs: [
      "Adaptability is often discussed as an individual trait, but it functions more reliably as a team capability. A leadership team that has built the habit of revisiting assumptions together, surfacing disagreement early, and reallocating resources without a lengthy approval cycle can respond to a shifting market far faster than a collection of individually adaptable leaders who have never practiced doing it together.",
    ],
  },
  {
    id: "collaboration",
    label: "Collaboration over hierarchy",
    heading: "Collaboration over hierarchy",
    paragraphs: [
      "Organizations facing genuine uncertainty benefit from leadership structures where information flows quickly across functions, not just up and down a hierarchy. A supply chain issue, a customer signal, or a competitive move often touches several parts of the business at once, and the leadership teams that respond fastest are the ones who have built direct relationships across functions long before the issue arrives.",
    ],
  },
  {
    id: "honesty",
    label: "Honesty over certainty",
    heading: "Guiding through uncertainty without false certainty",
    paragraphs: [
      "Employees do not expect leadership to have every answer during a difficult period, but they do notice when leadership pretends to. Teams that communicate what they know, what they do not, and what they are watching for build more durable trust than teams that project confidence they cannot back up. That honesty becomes a competitive advantage when conditions eventually test it.",
    ],
  },
  {
    id: "team-investment",
    label: "Investing in the team",
    heading: "Investing in the team, not just the individuals",
    paragraphs: [
      "Most leadership development still focuses on individual executives — coaching, assessments, personal growth plans. Organizations building genuinely high-performing teams pair that individual investment with deliberate team practice: structured decision reviews, shared language for discussing risk, and regular working sessions on the hardest calls the business is facing, rather than only the routine ones.",
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
    category: "Growth Strategy",
    title: "Scaling Businesses in Emerging Markets",
    read: "6 min read",
    href: "/insights/scaling-businesses-emerging-markets",
  },
];

export default function HighPerformanceLeadershipTeamsPage() {
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
      <main className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&display=swap");
          .font-display {
            font-family: "Fraunces", Georgia, serif;
          }
        `}</style>

        {/* Masthead */}
        <div className="border-b" style={{ borderColor: HAIRLINE }}>
          <Section className="pb-6 pt-10">
<Link href="/insights" className="group inline-flex focus-visible:outline-none">
  <span className="pointer-events-auto relative z-30 inline-flex w-fit items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-[13px] font-medium text-[#23272B] transition-all duration-300 hover:scale-105 hover:bg-[#D9822B] hover:text-white sm:text-sm">
    <ArrowLeft
      size={15}
      className="transition-transform duration-300 group-hover:-translate-x-1"
    />
    Back to Insights
  </span>
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
  <span className="pointer-events-auto relative z-30 inline-flex w-fit items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-[12px] font-medium text-[#23272B] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#D9822B] group-hover:text-white">
    Read
    <ArrowRight
      size={14}
      className="transition-transform duration-300 group-hover:translate-x-1"
    />
  </span>
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