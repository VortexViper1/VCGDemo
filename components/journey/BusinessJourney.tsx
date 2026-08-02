"use client";

import { useState } from "react";
import { JOURNEY } from "@/lib/journey";
import JourneyRoadmap from "./JourneyRoadmap";
import JourneyStagePanel from "./JourneyStagePanel";

export default function BusinessJourney() {
  const [active, setActive] = useState(0);

  return (
    <section id="journey" className="relative bg-[#F7F4EE] py-28 sm:py-36">
      <div className="mx-auto w-[90%] max-w-[1280px]">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.4em] text-[#173F38]/40">
            The VISWAS Journey
          </span>
          <h2 className="mt-7 font-[var(--font-display)] text-[clamp(2.6rem,4.4vw,4.4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-[#173F38]">
            Every business moves through four defining moments.
          </h2>
        </div>

        <div className="mt-20 sm:mt-24">
          <JourneyRoadmap stages={JOURNEY} active={active} onSelect={setActive} />
        </div>

        <JourneyStagePanel stage={JOURNEY[active]} index={active} total={JOURNEY.length} />
      </div>
    </section>
  );
}