"use client";

import { motion } from "framer-motion";
import { DoodleCheck } from "./Journeydoodles";

interface Props {
  challenges: string[];
  accent: string;
}

const TILT = [-8, 5, -4, 7, -6, 4];

export default function ChallengeCloud({ challenges, accent }: Props) {
  return (
    <ul className="divide-y divide-[#2A2D31]/8">
      {challenges.map((challenge, index) => (
        <motion.li
          key={challenge}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, delay: index * 0.05 }}
          className="flex items-center gap-4 py-4"
        >
          <span
            className="flex h-4 w-4 shrink-0 items-center justify-center"
            style={{ color: accent, transform: `rotate(${TILT[index % TILT.length]}deg)` }}
          >
            <DoodleCheck width={14} height={12} />
          </span>
          <span className="font-[var(--font-sans)] text-[16px] tracking-[0.005em] text-[#2A2D31] sm:text-[17px]">
            {challenge}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}