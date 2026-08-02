"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function JourneyCTA() {
  const stages = [
    "Starting a Business",
    "Growing Operations",
    "Scaling the Enterprise",
    "Transforming for the Future",
  ];

  return (
    <section className="relative overflow-hidden rounded-[40px] bg-[#173F38] px-8 py-20 lg:px-20">

      {/* Background Glow */}
      <div
        className="
        absolute
        left-1/2
        top-1/2
        h-[500px]
        w-[500px]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-[#C9A35F]/10
        blur-[160px]
        "
      />

      <div className="relative z-10">

        {/* Eyebrow */}

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
          inline-block
          text-xs
          uppercase
          tracking-[0.45em]
          text-[#C9A35F]
          "
        >
          YOUR NEXT CHAPTER
        </motion.span>

        {/* Heading */}

        <motion.h2
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="
          mt-6
          max-w-4xl
          font-[var(--font-display)]
          text-[clamp(3rem,5vw,5.8rem)]
          leading-[0.95]
          tracking-[-0.05em]
          text-white
          "
        >
          Every business reaches
          <br />
          a defining moment.
        </motion.h2>

        {/* Description */}

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: .15 }}
          viewport={{ once: true }}
          className="
          mt-8
          max-w-2xl
          text-lg
          leading-9
          text-white/70
          "
        >
          Whether you're building your first venture or transforming
          an established enterprise, VISWAS partners with you to
          navigate complexity with confidence.
        </motion.p>

        {/* Stage Selector */}

        <div className="mt-16 flex flex-wrap gap-5">

          {stages.map((stage, index) => (

            <motion.button
              key={stage}
              whileHover={{
                y: -6,
                scale: 1.03,
              }}
              whileTap={{
                scale: .98,
              }}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * .08,
              }}
              viewport={{ once: true }}
              className="
              rounded-full
              border
              border-white/10
              bg-white/5
              px-6
              py-4
              text-sm
              tracking-[0.03em]
              text-white
              backdrop-blur-xl
              transition-all
              duration-500
              hover:border-[#C9A35F]
              hover:bg-[#C9A35F]
              hover:text-[#173F38]
              "
            >
              {stage}
            </motion.button>

          ))}

        </div>

        {/* CTA */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: .45,
          }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Link
            href="/#contact"
            className="
            inline-flex
            items-center
            gap-4
            rounded-full
            bg-[#C9A35F]
            px-9
            py-5
            font-semibold
            text-[#173F38]
            transition-all
            duration-500
            hover:scale-105
            hover:shadow-[0_20px_60px_rgba(201,163,95,.35)]
            "
          >
            Let's Build Your Next Chapter

            <ArrowUpRight size={20} />

          </Link>
        </motion.div>

      </div>

    </section>
  );
}