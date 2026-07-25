"use client";

import { motion, Variants } from "framer-motion";

const stats = [
  { number: "09", title: "Practice Areas", desc: "Integrated advisory capabilities" },
  { number: "45+", title: "Capability Pages", desc: "Editorial knowledge base" },
  { number: "200+", title: "Advisory Products", desc: "Bespoke consulting solutions" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.9 } },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HeroStats() {
  return (
    <div
      className="relative hidden lg:flex items-center justify-center"
      style={{ perspective: 1200 }}
    >
      <motion.div
        initial={{ opacity: 0, x: 80, rotateY: -8 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
        whileHover={{ rotateY: -3, rotateX: 2 }}
        style={{ transformStyle: "preserve-3d" }}
        className="glass-island hero-island w-full max-w-md rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(26,28,32,0.5)]"
      >
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-[#B7964A]">
            VISWAS
          </p>

          <h3 className="mt-3 font-serif text-3xl leading-tight">
            Strategy.
            <br />
            Capital.
            <br />
            Transformation.
          </h3>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              variants={itemVariant}
              whileHover={{
                scale: 1.03,
                x: 6,
                borderColor: "rgba(183,150,74,0.4)",
              }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors duration-300"
            >
              <div className="text-4xl font-bold text-[#B7964A]">
                {stat.number}
              </div>
              <h4 className="mt-2 text-lg font-semibold">{stat.title}</h4>
              <p className="mt-1 text-sm text-white/60">{stat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
