"use client";

import { JourneyStageType } from "@/lib/journey";
import HandDrawnRoad from "./Handdrawnroad";
import MobileJourneyRail from "./Mobilejourneyrail";

interface Props {
  stages: JourneyStageType[];
  active: number;
  onSelect: (index: number) => void;
}

/**
 * Drop-in replacement for the old numbered tab bar. Same props, so
 * BusinessJourney.tsx needs no changes beyond the import path.
 */
export default function JourneyRoadmap({ stages, active, onSelect }: Props) {
  return (
    <nav aria-label="Viswaas journey stages">
      <HandDrawnRoad stages={stages} active={active} onSelect={onSelect} />
      <MobileJourneyRail stages={stages} active={active} onSelect={onSelect} />
    </nav>
  );
}