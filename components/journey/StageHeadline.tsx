"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  stage: string;
  headline: string;
  description: string;
  index: number;
  total: number;
  accent: string;
}

export default function StageHeadline({ stage, headline, description, index, total, accent }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 font-[var(--font-sans)] text-xs tabular-nums tracking-[0.15em] text-[#2A2D31]/40">
        <span
          className="relative flex h-7 w-7 items-center justify-center rounded-full"
          style={{ border: `1px solid ${accent}`, color: accent, transform: "rotate(-3deg)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span>of {String(total).padStart(2, "0")}</span>
        <span className="uppercase tracking-[0.3em] text-[#2A2D31]/30">— {stage}</span>
      </div>

      <h3 className="relative mt-6 inline-block font-[var(--font-display)] text-[clamp(2.6rem,5.4vw,5.4rem)] font-medium leading-[0.98] tracking-[-0.035em] text-[#2A2D31]">
        {headline}
        <svg
          aria-hidden="true"
          viewBox="0 0 300 10"
          className="absolute -bottom-2 left-0 h-2.5 w-[55%] max-w-[300px]"
          fill="none"
        >
          <motion.path
            key={stage}
            d="M2 6.2C40 2.4 100 1.6 150 5c46 3.1 100 4 148-1.4"
            stroke={accent}
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
            animate={reduceMotion ? undefined : { pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          />
        </svg>
      </h3>

      <p className="mt-7 max-w-xl font-[var(--font-sans)] text-[17px] leading-[1.85] text-[#646B70] sm:text-[18px]">
        {description}
      </p>
    </div>
  );
}