"use client";

import { motion } from "framer-motion";
import { JourneyStageType } from "@/lib/journey";
import PassportStamp from "./Passportstamp";

interface Props {
  stages: JourneyStageType[];
  active: number;
  onSelect: (index: number) => void;
}

export default function MobileJourneyRail({ stages, active, onSelect }: Props) {
  return (
    <div className="relative md:hidden">
      {/* dashed ink rail */}
      <div
        aria-hidden="true"
        className="absolute left-[34px] top-3 bottom-3 w-px"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(23,63,56,0.35) 0, rgba(23,63,56,0.35) 4px, transparent 4px, transparent 11px)",
        }}
      />

      <ul className="flex flex-col gap-9">
        {stages.map((stage, i) => (
          <motion.li
            key={stage.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="flex items-center gap-5"
          >
            <PassportStamp
              label={stage.stage}
              index={i}
              total={stages.length}
              accent={stage.accent}
              active={i <= active}
              stageId={stage.id}
              size="sm"
              onSelect={() => onSelect(i)}
            />
            <button
              type="button"
              onClick={() => onSelect(i)}
              className="text-left font-[var(--font-sans)] text-[13px] font-medium uppercase tracking-[0.18em] outline-none"
              style={{ color: i === active ? "#2A2D31" : "rgba(23,63,56,0.4)" }}
            >
              {stage.stage}
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}