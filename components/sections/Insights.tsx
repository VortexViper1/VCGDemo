"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock3 } from "lucide-react";

import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import Reveal from "@/components/shared/Reveal";
import GlassCard from "@/components/shared/GlassCard";

const FEATURED = {
  category: "Business Strategy",
  title: "The Future of Business Transformation in the AI Era",
  description:
    "Artificial intelligence is no longer just a technology initiative—it has become a strategic imperative. Explore how forward-thinking organizations are leveraging AI, digital transformation, and data-driven leadership to accelerate innovation, improve operational efficiency, and create sustainable competitive advantage.",
  date: "July 2026",
  read: "9 min read",
  href: "/insights/future-of-business-transformation-ai",
};

const ARTICLES = [
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
    category: "Sustainability",
    title: "Creating Sustainable Value Through ESG Leadership",
    read: "6 min read",
    href: "/insights/esg-sustainable-value-creation",
  },
];

function ArticleCard({
  article,
  index,
}: {
  article: (typeof ARTICLES)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${py * -4}deg`);
    el.style.setProperty("--ry", `${px * 4}deg`);
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <Reveal delay={index * 0.1}>
      <div style={{ perspective: 1000 }}>
        <Link href={article.href} className="block">
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            style={{
              transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
              transformStyle: "preserve-3d",
            }}
            className="cursor-pointer"
          >
            <GlassCard className="group relative overflow-hidden">
              <div className="flex justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-[#C9A35F]">
                  {article.category}
                </span>
                <span className="text-sm text-white/40">{article.read}</span>
              </div>

              <h3 className="mt-8 text-2xl font-semibold leading-snug "style={{ color: "#F7F4EE" }}>
                {article.title}
              </h3>

              <div className="relative mt-10 h-px w-full overflow-hidden bg-white/10">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "30%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C9A35F] to-transparent transition-all duration-500 group-hover:w-full"
                />
              </div>

              <div className="mt-6 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-[#C9A35F]">
                Explore
                <motion.div whileHover={{ x: 4, y: -4 }}>
                  <ArrowUpRight size={18} />
                </motion.div>
              </div>
            </GlassCard>
          </motion.div>
        </Link>
      </div>
    </Reveal>
  );
}

export default function Insights() {
  return (
    <Section id="insights" className="relative overflow-hidden bg-[#071F2D]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 bottom-10 h-96 w-96 rounded-full bg-[#C9A35F]/10 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 top-10 h-96 w-96 rounded-full bg-[#23363F]/30 blur-[140px]"
        />
      </div>

      <Reveal>
        <SectionTitle
          eyebrow="INSIGHTS"
          title="Perspectives shaping tomorrow's business leaders."
          description="Thought leadership, market intelligence, and strategic insights from VISWAS Consulting Group."
          align="center"
        />
      </Reveal>

      <div className="mt-20 grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Link href={FEATURED.href} className="block h-full">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="h-full cursor-pointer"
            >
              <GlassCard className="group h-full overflow-hidden">
                <div className="relative mb-10 h-72 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d3147] via-[#123a53] to-[#071F2D]">
                  <motion.div
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 opacity-60"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at top right, rgba(201,163,95,.25), transparent 45%)",
                      backgroundSize: "160% 160%",
                    }}
                  />

                  <motion.div
                    animate={{ opacity: [0.18, 0.34, 0.18], scale: [1, 1.04, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_20%,rgba(244,240,232,0.12),transparent_55%)]"
                  />

                  <div className="absolute bottom-8 left-8">
                    <span className="rounded-full border border-[#C9A35F]/30 bg-[#C9A35F]/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#C9A35F] backdrop-blur-sm">
                      Featured Insight
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-white/50">
                  <span className="uppercase tracking-[0.25em] text-[#C9A35F]">
                    {FEATURED.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {FEATURED.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock3 size={16} />
                    {FEATURED.read}
                  </div>
                </div>

                <h3 className="mt-8 text-4xl font-semibold leading-tight "style={{ color: "#F7F4EE" }}>
                  {FEATURED.title}
                </h3>

                <p className="mt-8 text-lg leading-9 text-white/70">
                  {FEATURED.description}
                </p>

                <div className="mt-12 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A35F]">
                  Read Article
                  <motion.div whileHover={{ x: 5 }}>
                    <ArrowUpRight size={18} />
                  </motion.div>
                </div>
              </GlassCard>
            </motion.div>
          </Link>
        </Reveal>

        <div className="space-y-8 lg:col-span-5">
          {ARTICLES.map((article, index) => (
            <ArticleCard key={article.title} article={article} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}
