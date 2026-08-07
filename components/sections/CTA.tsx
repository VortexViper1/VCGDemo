"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Workflow } from "lucide-react";

import Reveal from "@/components/shared/Reveal";
import Section from "@/components/shared/Section";

const STATS = [
  { value: "250+", label: "Projects Delivered", href: "/case-studies" },
  { value: "18+", label: "Industries Served", href: "/industries" },
  { value: "98%", label: "Client Retention", href: "/about" },
];
const handleContactClick = (
  e: React.MouseEvent<HTMLAnchorElement>
) => {
  e.preventDefault();

  const section = document.getElementById("contact");

  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

};

export default function CTA() {
  return (
    <Section className="relative overflow-hidden bg-[#F8F5EF]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#C49A4A]/12 blur-[180px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[#1F2428]/30 blur-[160px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <Reveal>
        <div className="glass-island relative overflow-hidden rounded-[40px] border border-[#2A2D31]/8 bg-[#F8F5EF]/[0.04] backdrop-blur-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent" />

          <div className="relative px-8 py-20 md:px-16 lg:px-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="mx-auto max-w-[1440px] px-10 sm:px-12 md:px-16 lg:px-24 xl:px-28">
                {/* Badge — now a working link to insights/updates */}
                <Link href="/#Insights">
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="mb-8 inline-flex cursor-pointer items-center gap-3 rounded-full border border-[#C49A4A]/20 bg-[#C49A4A]/12 px-5 py-3 transition-colors duration-300 hover:border-[#C49A4A]/40 hover:bg-[#C49A4A]/20"
                  >
                    <Workflow size={18} className="text-[#C49A4A]" />
                    
                    <span className="text-xs font-medium uppercase tracking-[0.35em] text-[#C49A4A]">
                      Let's Build Together
                    </span>
                  </motion.div>
                </Link>

                <h2 className="text-6xl tracking-tight font-semibold leading-tight tracking-tight  md:text-6xl lg:text-7xl"  style={{ color: "#2A2D31" }}>
                  Ready to transform
                  <br />
                  your business?
                </h2>

                <p className="mx-auto mt-10 max-w-3xl text-xl leading-9 text-[#23272B]/70">
                  Whether you're defining a long-term strategy, raising
                  capital, modernizing operations, or accelerating growth,
                  VISWAS partners with you from vision to execution.
                </p>

                <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
                  <Link
  href="/#contact"
  onClick={handleContactClick}
>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center gap-3 rounded-full bg-[#C49A4A] px-9 py-5 font-semibold text-[#23272B] shadow-[0_15px_40px_rgba(201,163,95,0.35)] transition-all"
                    >
                      Schedule Consultation
                      <ArrowUpRight
                        className="transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                        size={20}
                      />
                    </motion.button>
                  </Link>

                  <Link href="/#services">
                    <motion.button
                      whileHover={{ y: -2 }}
                      className="rounded-full border border-white/15 bg-white px-9 py-5 font-medium  backdrop-blur-xl transition hover:border-[#C49A4A]/30 hover:bg-[#F8F5EF]/10"
                       style={{ color: "#2A2D31" }}
                    >
                      Explore Services
                    </motion.button>
                  </Link>
                </div>

                {/* Stats — now clickable, each routing to a relevant page */}
                <div className="mt-20 grid gap-10 border-t border-[#2A2D31]/8 pt-12 md:grid-cols-3">
                  {STATS.map((stat) => (
                    <Link key={stat.label} href={stat.href}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring" as const, stiffness: 250, damping: 20 }}
                        className="group cursor-pointer rounded-2xl px-4 py-2 transition-colors duration-300 hover:bg-white"
                      >
                        <h3 className="text-4xl font-bold transition-colors duration-300 group-hover:text-[#C49A4A]"
                         style={{ color: "#2A2D31" }} >
                          {stat.value}
                        </h3>

                        <p className="mt-3 flex items-center justify-center gap-1 text-sm uppercase tracking-[0.25em] text-[#6B807A] transition-colors duration-300 group-hover:text-[#23272B]/80">
                          {stat.label}
                          <ArrowUpRight
                            size={14}
                            className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </p>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
