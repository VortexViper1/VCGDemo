"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { JOURNEY } from "@/lib/journey";
import JourneyRoadmap from "./JourneyRoadmap";
import JourneyStagePanel from "./JourneyStagePanel";
import JourneyFilters from "./Journeyfilters";

export default function BusinessJourney() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <section id="journey" className="relative overflow-hidden bg-[#F8F5EF] py-28 sm:py-36">
      <JourneyFilters />

      {/* paper grain, sits under everything */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ filter: "url(#paper-grain)", mixBlendMode: "multiply" }}
      />

      <div className="relative mx-auto w-[90%] max-w-[1280px]">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.4em] text-[#2A2D31]/40">
            The VISWAS Journey
          </span>

          <h2 className="relative mt-7 inline-block font-[var(--font-display)] text-[clamp(2.6rem,4.4vw,4.4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-[#2A2D31]">
            Every business moves through four defining moments.
            <svg
              aria-hidden="true"
              viewBox="0 0 420 14"
              className="absolute -bottom-3 left-0 h-3 w-[70%] max-w-[420px]"
              fill="none"
            >
              <motion.path
                d="M2 8.6C60 3.4 140 2 210 6.4c66 4.1 150 5.9 208-2.6"
                stroke="#C49A4A"
                strokeWidth="2.2"
                strokeLinecap="round"
                initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
                whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 0.85 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              />
            </svg>
          </h2>

          <p className="mt-5 font-[var(--font-sans)] text-[13px] italic tracking-[0.01em] text-[#646B70]">
            Trace the road below, or tap a stamp to jump ahead.
          </p>
        </div>

        <div className="mt-24 sm:mt-28">
          <JourneyRoadmap stages={JOURNEY} active={active} onSelect={setActive} />
        </div>

        <JourneyStagePanel stage={JOURNEY[active]} index={active} total={JOURNEY.length} />
      </div>
    </section>
  );
}