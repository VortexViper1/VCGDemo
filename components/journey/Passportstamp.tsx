"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { pickDoodle, doodleRotation } from "./Journeydoodles";

interface Props {
  label: string;
  index: number;
  total: number;
  accent: string;
  active: boolean;
  stageId: string;
  size?: "sm" | "lg";
  onSelect: () => void;
}

/**
 * A stage milestone rendered as a pressed ink seal — circular ring,
 * hand-set index instead of a date, and a themed doodle at its core.
 * Hover/press = the seal physically compresses into the paper.
 */
export default function PassportStamp({
  label,
  index,
  total,
  accent,
  active,
  stageId,
  size = "lg",
  onSelect,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const uid = useId();
  const rotation = doodleRotation(index);
  const Icon = pickDoodle(stageId || label, index);
  const dim = size === "lg" ? 108 : 68;
  const pressed = active || hovered;

  const dust = Array.from({ length: 6 }, (_, i) => i);

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-current={active ? "step" : undefined}
      aria-label={`Stage ${index + 1} of ${total}: ${label}`}
      className="group relative flex items-center justify-center outline-none"
      style={{ width: dim, height: dim }}
    >
      {/* Dust particles on press */}
      {!reduceMotion &&
        dust.map((d) => {
          const angle = (d / dust.length) * Math.PI * 2;
          const dist = dim * 0.55;
          return (
            <motion.span
              key={d}
              className="pointer-events-none absolute rounded-full"
              style={{
                width: 2,
                height: 2,
                backgroundColor: accent,
                left: "50%",
                top: "50%",
              }}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={
                pressed
                  ? {
                      opacity: [0, 0.55, 0],
                      x: Math.cos(angle) * dist,
                      y: Math.sin(angle) * dist * 0.6 + 6,
                    }
                  : { opacity: 0, x: 0, y: 0 }
              }
              transition={{ duration: 0.6, ease: "easeOut", delay: d * 0.015 }}
            />
          );
        })}

      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          rotate: rotation,
          filter: "url(#ink-grain)",
        }}
        animate={
          reduceMotion
            ? undefined
            : {
                scale: pressed ? 0.93 : 1,
                y: pressed ? 1.5 : 0,
              }
        }
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
<svg viewBox="0 0 108 108" width="100%" height="100%" fill="none">
  {/* Amber fill — soft tint behind the ring, deepens on
      active/hover so the pressed state reads as "filled in" */}
  <circle
    cx="54"
    cy="54"
    r="49"
    fill="#ffa600"
    fillOpacity={pressed ? 0.16 : 0.07}
    style={{ transition: "fill-opacity 0.28s cubic-bezier(0.22,1,0.36,1)" }}
  />
  <circle
    cx="54"
    cy="54"
    r="49"
    stroke={accent}
    strokeWidth={active ? 2.4 : 1.6}
    opacity={pressed ? 0.95 : 0.55}
  />
          {/* index tick, passport-stamp style */}
          <text
            x="54"
            y="97"
            textAnchor="middle"
            fontSize="8"
            letterSpacing="2"
            fill={accent}
            opacity={pressed ? 0.9 : 0.5}
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </text>
        </svg>
      </motion.span>

      <motion.span
        animate={
          reduceMotion
            ? undefined
            : {
                scale: pressed ? 0.93 : 1,
                opacity: pressed ? 1 : 0.72,
              }
        }
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
        style={{ color: accent, width: dim * 0.34, height: dim * 0.34 }}
      >
        <Icon width="100%" height="100%" />
      </motion.span>

      {/* clip-path unique id guard so multiple stamps don't collide */}
      <span className="sr-only">{uid}</span>
    </button>
  );
}