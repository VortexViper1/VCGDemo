"use client";

import { motion } from "framer-motion";
import { JourneyStageType } from "@/lib/journey";

interface Props {
  stages: JourneyStageType[];
  active: number;
  onSelect: (index: number) => void;
}

export default function JourneyRoadmap({ stages, active, onSelect }: Props) {
  const fillPercent = stages.length > 1 ? (active / (stages.length - 1)) * 100 : 0;

  return (
    <div>
      <div className="relative h-px w-full bg-[#173F38]/10">
        <motion.div
          animate={{ width: `${fillPercent}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-0 h-px bg-[#173F38]"
        />
      </div>

      <div className="mt-8 grid grid-cols-4">
        {stages.map((stage, index) => {
          const isActive = index === active;

          return (
            <button
              key={stage.id}
              onClick={() => onSelect(index)}
              className="group relative flex flex-col items-start gap-2 py-2 pr-4 text-left outline-none"
            >
              <span
                className="font-[var(--font-sans)] text-[11px] tabular-nums tracking-[0.1em] transition-colors duration-300"
                style={{ color: isActive ? stage.accent : "rgba(23,63,56,0.3)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span
                className="font-[var(--font-sans)] text-[13px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 sm:text-sm sm:tracking-[0.22em]"
                style={{ color: isActive ? "#173F38" : "rgba(23,63,56,0.35)" }}
              >
                {stage.stage}
              </span>

              {isActive && (
                <motion.span
                  layoutId="roadmap-underline"
                  className="absolute -bottom-[9px] left-0 h-[2px] w-6"
                  style={{ backgroundColor: stage.accent }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}