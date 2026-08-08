"use client";

import { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { JOURNEY } from "@/lib/journey";
import JourneyRoadmap from "./JourneyRoadmap";
import JourneyStagePanel from "./JourneyStagePanel";
import JourneyFilters from "./Journeyfilters";

const EASE = [0.22, 1, 0.36, 1] as const;

function BusinessJourneyInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialIndex = useMemo(() => {
    const stageParam = searchParams.get("stage");
    if (!stageParam) return 0;
    const idx = JOURNEY.findIndex((s) => s.id === stageParam);
    return idx === -1 ? 0 : idx;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [active, setActive] = useState(initialIndex);
  const reduceMotion = useReducedMotion();

  // Guards the URL-sync effect below against firing on initial mount.
  // `active` already reflects either the incoming ?stage= param or the
  // default (0) on first render, so there is nothing to write back yet —
  // doing so anyway was rewriting a plain "/" load into
  // "/?stage=<id>#journey" on every single page visit, appending a hash
  // that didn't come from any user action.
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const stageId = JOURNEY[active]?.id;
    if (!stageId) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("stage", stageId);
    router.replace(`${pathname}?${params.toString()}#journey`, { scroll: false });
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  const fromBelow = reduceMotion ? false : { opacity: 0, y: 16 };
  const toVisible = { opacity: 1, y: 0 };

  return (
    <section id="journey" className="relative overflow-hidden bg-[#FFFFFF] py-28 sm:py-36">
      <JourneyFilters />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ filter: "url(#paper-grain)", mixBlendMode: "multiply" }}
      />

      <div className="relative mx-auto w-[90%] max-w-[1280px]">
        {/* Heading block — centered in the section, not just left-anchored
            within the wider content column */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={fromBelow}
            whileInView={toVisible}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="block text-lg font-bold uppercase tracking-[0.28em] text-[#D4AF6A]"
          >
            The Business Roadmap
          </motion.span>

          <motion.h2
            initial={fromBelow}
            whileInView={toVisible}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="relative mt-7 inline-block font-[var(--font-display)] text-[clamp(2.6rem,4.4vw,4.4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-[#2A2D31]"
          >
            Every business moves through four defining moments.
            <svg
              aria-hidden="true"
              viewBox="0 0 420 14"
              className="absolute -bottom-3 left-1/2 h-3 w-[70%] max-w-[420px] -translate-x-1/2"
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
                transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
              />
            </svg>
          </motion.h2>

          <motion.p
            initial={fromBelow}
            whileInView={toVisible}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
            className="mx-auto mt-5 max-w-md font-[var(--font-sans)] text-[13px] italic tracking-[0.01em] text-[#646B70]"
          >
            Trace the road below, or tap a stamp to jump ahead.
          </motion.p>
        </div>

        <div className="mt-24 sm:mt-28">
          <JourneyRoadmap stages={JOURNEY} active={active} onSelect={setActive} />
        </div>

        <JourneyStagePanel stage={JOURNEY[active]} index={active} total={JOURNEY.length} />
      </div>
    </section>
  );
}

export default function BusinessJourney() {
  return (
    <Suspense fallback={null}>
      <BusinessJourneyInner />
    </Suspense>
  );
}