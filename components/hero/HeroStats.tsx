"use client";

import { motion, Variants } from "framer-motion";

const stats = [
  {
    number: "09",
    title: "Practice Areas",
    desc: "Integrated advisory capabilities",
  },
  {
    number: "45+",
    title: "Capability Pages",
    desc: "Editorial knowledge base",
  },
  {
    number: "200+",
    title: "Advisory Products",
    desc: "Bespoke consulting solutions",
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.9,
    },
  },
};

const itemVariant: Variants = {
  hidden: {
    opacity: 0,
    x: -16,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HeroStats() {
  return (
    <div
      className="relative hidden lg:flex items-center justify-center"
      style={{ perspective: 1200 }}
    >
      {/* Breathing gold aura behind the card — gives it a sense of light
          rather than just a flat drop shadow */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute h-[420px] w-[420px] rounded-full bg-[#D9822B]/20 blur-[100px]"
      />

      {/* Gradient-border shell: 1px of gradient peeking around the card
          reads far more premium than a flat single-color border */}
      <motion.div
        initial={{ opacity: 0, x: 80, rotateY: -8 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ rotateY: -2, rotateX: 2 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full max-w-md rounded-[37px] bg-gradient-to-br from-[#C49A4A]/40 via-[#E3C88C]/25 to-[#C49A4A]/10 p-px shadow-[0_50px_140px_rgba(23,63,56,0.14)]"
      >
        <div className="group relative overflow-hidden rounded-[36px] border border-white/40 bg-gradient-to-br from-[#FFFDF8] via-[#FBF8F1] to-[#F7F2E7] p-6 md:p-8 backdrop-blur-xl">
          {/* Premium gold ambient background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -right-20 h-80 w-80 rounded-full bg-[#D9822B]/14 blur-[110px]" />
            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#E3C88C]/12 blur-[120px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,163,95,0.08),transparent_45%)]" />
          </div>

          {/* Slow rotating hairline ring in the corner — echoes the accent
              motif used elsewhere on the site, ties this card to the brand */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full border border-dashed border-[#C49A4A]/20"
          />

          {/* Shine sweep on hover */}
          <motion.div
            aria-hidden
            initial={{ x: "-120%" }}
            whileHover={{ x: "120%" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          />

          <div className="relative z-10">
            <div className="mb-9">
              <div className="flex items-center gap-3">
                <p className="text-sm uppercase tracking-[0.35em] text-[#B7964A]">
                  Viswaas
                </p>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "left" }}
                  className="h-px flex-1 bg-gradient-to-r from-[#C49A4A]/60 to-transparent"
                />
              </div>

              <h3 className="mt-5 font-serif text-[3rem] leading-[1.08] tracking-[-0.03em] text-[#2A2D31]">
                Strategy.
                <br />
                Capital.
                <br />
                <span className="bg-gradient-to-r from-[#2A2D31] to-[#3A6B5E] bg-clip-text text-transparent">
                  Transformation.
                </span>
              </h3>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="divide-y divide-[#2A2D31]/8"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.title}
                  variants={itemVariant}
                  whileHover="hover"
                  initial="rest"
                  className="group/row relative flex items-center gap-5 py-5 first:pt-0 last:pb-0"
                >
                  {/* Accent bar that draws in on hover */}
                  <motion.span
                    variants={{
                      rest: { scaleY: 0, opacity: 0 },
                      hover: { scaleY: 1, opacity: 1 },
                    }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "center" }}
                    className="absolute -left-8 h-8 w-[3px] rounded-full bg-gradient-to-b from-[#C49A4A] to-[#E3C88C]"
                  />

                  <div
                    className="shrink-0 font-mono text-4xl font-bold leading-none tracking-tight bg-gradient-to-br from-[#B7964A] to-[#8A6D2F] bg-clip-text text-transparent"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {stat.number}
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-lg font-semibold text-[#2A2D31]">
                      {stat.title}
                    </h4>
                    <p className="mt-1 text-[14px] leading-6 text-[#6B807A]">
                      {stat.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}