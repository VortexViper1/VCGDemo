"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Users } from "lucide-react";

import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import Reveal from "@/components/shared/Reveal";
import GlassCard from "@/components/shared/GlassCard";

export default function Leadership() {
  return (
    <Section
      id="leadership"
      className="relative overflow-hidden bg-[#071F2D]"
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
          className="absolute -left-24 top-20 h-[420px] w-[420px] rounded-full bg-[#C9A35F]/10 blur-[160px]"
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
          description="Meet the leaders and distinguished professionals who have shaped VISWAS Consulting Group and continue to make an impact across industries."
          align="center"
        />
      </Reveal>

      <Reveal delay={0.15}>
        <Link href="/alumni" className="block mt-20">
          <motion.div
            whileHover={{ y: -6 }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 20,
            }}
          >
            <GlassCard className="group overflow-hidden">
              <div className="grid gap-12 lg:grid-cols-[180px_1fr] lg:items-center">

                {/* Icon */}
                <div className="flex justify-center">
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.05 }}
                    transition={{ duration: 0.35 }}
                    className="flex h-40 w-40 items-center justify-center rounded-full border border-[#C9A35F]/25 bg-[#C9A35F]/10"
                  >
                    <Users
                      size={72}
                      className="text-[#C9A35F]"
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div>

                  <span className="text-xs uppercase tracking-[0.3em] text-[#C9A35F]">
                    Leadership Network
                  </span>

                  <h3 className="mt-6 text-4xl font-semibold leading-tight text-[#F7F4EE]">
                    Explore Our Leadership & Alumni
                  </h3>

                  <p className="mt-8 max-w-3xl text-lg leading-9 text-white/70">
                    Behind every successful organization is a community of
                    visionary leaders. Meet the professionals who have guided
                    VISWAS Consulting Group and explore our growing alumni
                    network of leaders creating impact across consulting,
                    technology, business strategy and innovation.
                  </p>

                  <div className="mt-12 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A35F]">
                    Explore Alumni

                    <motion.div
                      whileHover={{
                        x: 5,
                        y: -5,
                      }}
                    >
                      <ArrowUpRight size={20} />
                    </motion.div>
                  </div>

                </div>
              </div>
            </GlassCard>
          </motion.div>
        </Link>
      </Reveal>
    </Section>
  );
}