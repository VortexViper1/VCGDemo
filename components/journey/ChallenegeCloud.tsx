"use client";

import { motion } from "framer-motion";

interface Props {
  challenges: string[];
  accent: string;
}

export default function ChallengeCloud({ challenges, accent }: Props) {
  return (
    <ul className="divide-y divide-[#173F38]/8">
      {challenges.map((challenge, index) => (
        <motion.li
          key={challenge}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, delay: index * 0.05 }}
          className="flex items-center gap-4 py-4"
        >
          <span className="h-[3px] w-[3px] shrink-0 rounded-full" style={{ backgroundColor: accent }} />
          <span className="font-[var(--font-sans)] text-[16px] tracking-[0.005em] text-[#173F38] sm:text-[17px]">
            {challenge}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}