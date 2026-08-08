"use client";

import { useMemo } from "react";
import {
    motion,
    useReducedMotion,
    useSpring,
    useTransform
} from "framer-motion";
import { JourneyStageType } from "@/lib/journey";
import PassportStamp from "./Passportstamp";
import React from "react";
interface Props {
  stages: JourneyStageType[];
  active: number;
  onSelect: (index: number) => void;
}

const ANCHORS = [
  { x: 6, y: 23.7 },
  { x: 26, y: 68.4 },
  { x: 46, y: 21.1 },
  { x: 64, y: 73.7 },
  { x: 82, y: 23.7 },
  { x: 94, y: 60.5 },
] as const;

const VB_W = 1000;
const VB_H = 380;

const ROAD_PATH =
  "M 60 90 C 140 190, 180 250, 260 260 C 330 268, 380 140, 460 80 C 540 20, 590 210, 640 280 C 690 350, 760 150, 820 90 C 870 40, 900 160, 940 230";

const ROAD_PATH_SKETCH =
  "M 63 95 C 145 196, 183 255, 264 265 C 333 273, 384 145, 464 84 C 545 24, 594 214, 644 284 C 693 354, 763 154, 823 93 C 873 43, 903 163, 943 234";

const DOTTED_TAIL = "M 940 230 C 965 260, 985 285, 998 315";

function anchorIndicesFor(n: number) {
  if (n <= 1) return [0];
  return Array.from({ length: n }, (_, i) => Math.round((i * (ANCHORS.length - 1)) / (n - 1)));
}

export default function HandDrawnRoad({ stages, active, onSelect }: Props) {
  const reduceMotion = useReducedMotion();

  const stageProgress =
    stages.length <= 1
      ? 0
      : (active + 1) / stages.length;

  const pathLength = useSpring(stageProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.45,
  });

  const tailOpacity = useTransform(
    pathLength,
    [0.85, 1],
    [0, 1]
  );

  const indices = useMemo(() => anchorIndicesFor(stages.length), [stages.length]);
  const activeAnchor = ANCHORS[indices[active]] ?? ANCHORS[0];

  return (
    <div className="relative mx-auto hidden w-full md:block" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        fill="none"
      >
        <path
          d={ROAD_PATH_SKETCH}
          stroke="#2A2D31"
          strokeOpacity={0.14}
          strokeWidth={1}
          strokeLinecap="round"
          fill="none"
        />

        <path
          d={ROAD_PATH}
          stroke="#2A2D31"
          strokeOpacity={0.35}
          strokeWidth={2}
          strokeLinecap="round"
          fill="none"
          filter="url(#ink-grain)"
        />
        <motion.path
          d={ROAD_PATH}
          stroke="#C49A4A"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={false}
          animate={{
            pathLength: stageProgress,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <motion.path
          d={DOTTED_TAIL}
          stroke="#C49A4A"
          strokeOpacity={0.6}
          strokeWidth={1.4}
          strokeDasharray="1 7"
          strokeLinecap="round"
          style={{ opacity: reduceMotion ? 0.6 : tailOpacity }}
        />
      </svg>

      {/* Gold connector — bridges the active stamp down into the section
          below, so it's visually obvious the content changed because of
          this stamp. Tracks the active anchor's x position and re-eases
          over whenever `active` changes. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -translate-x-1/2"
        initial={false}
        animate={{ left: `${activeAnchor.x}%`, top: `${activeAnchor.y}%` }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ zIndex: 5 }}
      >
        <div
          className="w-px"
          style={{
            height: 340,
            background:
              "linear-gradient(to bottom, #C49A4A 0%, #C49A4A 70%, rgba(196,154,74,0) 100%)",
          }}
        />
        <div
          className="absolute left-1/2 top-[320px] h-1.5 w-1.5 -translate-x-1/2 rounded-full"
          style={{ backgroundColor: "#C49A4A" }}
        />
      </motion.div>

      {stages.map((stage, i) => {
        const anchor = ANCHORS[indices[i]];
        return (
          <div
            key={stage.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${anchor.x}%`, top: `${anchor.y}%` }}
          >
            <PassportStamp
              label={stage.stage}
              index={i}
              total={stages.length}
              accent={stage.accent}
              active={i <= active}
              stageId={stage.id}
              onSelect={() => onSelect(i)}
            />
            <span
              className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap font-[var(--font-sans)] text-[11px] uppercase tracking-[0.2em] transition-opacity duration-300"
              style={{
                color:
                  i <= active
                    ? "#2A2D31"
                    : "rgba(23,63,56,0.4)",
                opacity:
                  i <= active
                    ? 1
                    : 0.75,
              }}
            >
              {stage.stage}
            </span>
          </div>
        );
      })}
    </div>
  );
}