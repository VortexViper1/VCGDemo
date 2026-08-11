"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import Reveal from "@/components/shared/Reveal";
import GlassCard from "@/components/shared/GlassCard";

export default function Leadership() {
  return (
    <Section
      id="leadership"
      className="relative overflow-hidden bg-[#FFFFFF]"
    >
      {/* Ambient Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-24 top-20 h-[420px] w-[420px] rounded-full bg-[#C49A4A]/12 blur-[160px]"
        />

        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-24 bottom-0 h-[450px] w-[450px] rounded-full bg-[#123A53]/35 blur-[170px]"
        />
      </div>

      <Reveal>
        <SectionTitle
          eyebrow="OUR PEOPLE"
          title="Leadership"
          description="Meet the leaders and distinguished professionals who have shaped Viswaas Consulting Group and continue to make an impact across industries."
          align="center"
        />
      </Reveal>

      <Reveal delay={0.15}>
        <Link href="/alumni" className="group block mt-20">
          <motion.div
            whileHover={{ y: -6 }}
            transition={{
              type: "spring" as const,
              stiffness: 220,
              damping: 20,
            }}
          >
            <GlassCard className="group overflow-hidden">
              <div className="grid gap-12 lg:grid-cols-[180px_1fr] lg:items-center">

                {/* Logo */}
                <div className="flex justify-center">
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.05 }}
                    transition={{ duration: 0.35 }}
                    className="relative flex h-40 w-40 items-center justify-center rounded-full border border-[#C49A4A]/25 bg-[#C49A4A]/12 p-8"
                  >
                    <Image
                      src="/logo/MAIN LOGO.png"
                      alt="VISWAAS Consulting Group"
                      fill
                      sizes="160px"
                      className="object-contain p-8"
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div>

                  <span className="text-xs uppercase tracking-[0.3em] text-[#C49A4A]">
                    Leadership Network
                  </span>

                  <h3 className="mt-6 text-4xl font-semibold leading-tight "style={{ color: "#2A2D31" }}>
                    Explore Our Leadership & Alumni
                  </h3>

                  <p className="mt-8 max-w-3xl text-lg leading-9 text-[#23272B]/70">
                    Behind every successful organization is a community of
                    visionary leaders. Meet the professionals who have guided
                    Viswaas Consulting Group and explore our growing alumni
                    network of leaders creating impact across consulting,
                    technology, Corporate & Financial Strategy and innovation.
                  </p>

                  <span className="mt-12 inline-flex w-fit items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-[13px] font-medium text-[#23272B] shadow-sm ring-1 ring-[#2A2D31]/10 transition-all duration-300 hover:scale-105 hover:bg-[#D9822B] hover:text-white sm:text-sm">
                    Explore Alumni
                    <ArrowUpRight size={16} />
                  </span>

                </div>
              </div>
            </GlassCard>
          </motion.div>
        </Link>
      </Reveal>
    </Section>
  );
}