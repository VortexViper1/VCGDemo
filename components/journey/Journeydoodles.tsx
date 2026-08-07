"use client";

import { SVGProps } from "react";

/**
 * Hand-drawn consulting doodles. Deliberately imperfect strokes —
 * no library icons. `currentColor` driven, sized via className.
 * Kept to single-weight ink strokes so they read as sketch, not clipart.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 40 40",
  fill: "none",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function DoodleCompass(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20.6 6.3c7.6.4 13.7 6.7 13.4 14.3-.3 7.5-6.8 13.5-14.3 13.1C11.9 33.3 6 26.8 6.4 19.3 6.8 12 13.2 5.9 20.6 6.3Z" stroke="currentColor" />
      <path d="M17.2 22.6 21.4 13l3.4 9.9-8.2 2.6Z" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="20.2" cy="20.1" r="1.1" stroke="currentColor" strokeWidth="1" />
      <path d="M20.4 4.6v2.4M20.4 33.3v2.4M4.9 19.8h2.4M33.6 19.8H36" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function DoodleTarget(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20.5 4.9c8.4-.2 15 6.5 15.1 14.8.1 8.2-6.6 15.1-14.9 15.2-8.3.1-15.2-6.5-15.3-14.7C5.3 12 12 5.1 20.5 4.9Z" stroke="currentColor" />
      <path d="M20.3 11.6c4.9-.1 8.9 3.8 9 8.5.1 4.7-3.8 8.7-8.6 8.8-4.8.1-8.8-3.7-8.9-8.4-.1-4.6 3.6-8.6 8.5-8.9Z" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="20.1" cy="20.1" r="2.7" stroke="currentColor" strokeWidth="1.1" />
      <path d="M27 8 34 3M26.6 10.3 33 6.6" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function DoodleLightbulb(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 5.6c5.7-.2 10.6 4.2 10.7 9.9.1 3.9-2 6.9-4.2 9.4-1.2 1.4-1.7 2.6-1.8 4.4l-9.3.2c-.1-1.8-.6-3-1.9-4.3-2.3-2.4-4.6-5.3-4.6-9.2 0-5.7 5.4-10.2 11.1-10.4Z" stroke="currentColor" />
      <path d="M15.2 32.1h9.7M16.1 35.4h7.7" stroke="currentColor" strokeWidth="1.1" />
      <path d="M17.8 11.7c-1.7 1.3-2.6 2.9-2.6 5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function DoodleMagnifier(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M18.4 6.7c6.4-.2 11.8 4.9 12 11.3.1 3-1 5.7-2.7 7.8l.4.4 6.6 6.4c.6.6.5 1.5-.1 2-.6.5-1.5.4-2-.2l-6.5-6.6-.4-.4c-2.2 1.6-4.9 2.5-7.9 2.4-6.4-.2-11.5-5.5-11.3-11.9.2-6.1 5.4-11 11.9-11.2Z" stroke="currentColor" />
      <path d="M13.2 16.9c.4-3.2 3-5.7 6.2-6" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function DoodleGrowthArrow(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.4 30.6 15 20.4l5.8 5.1L34.2 9" stroke="currentColor" />
      <path d="M25.8 8.4c2.8-.2 5.7-.3 8.6.1-.5 2.8-.9 5.7-1.4 8.5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M6 34.4h29.2" stroke="currentColor" strokeWidth="1" strokeDasharray="0.5 3.2" />
    </svg>
  );
}

export function DoodleClipboard(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="8.4" y="6.9" width="21.4" height="27.1" rx="1.6" stroke="currentColor" transform="rotate(-1 19 20)" />
      <rect x="14.6" y="4.6" width="9.2" height="4.6" rx="1.1" stroke="currentColor" strokeWidth="1.1" />
      <path d="M12.6 15.4h13M12.6 20.2h13M12.6 25h9.3" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function DoodleCheck(props: IconProps) {
  return (
    <svg viewBox="0 0 20 16" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 8.4 7.2 13.4 18 2" stroke="currentColor" />
    </svg>
  );
}

export function DoodleArrowhead(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12.4c4.4-.3 8-1 12.3-3.4" stroke="currentColor" />
      <path d="M11.3 6.4c1.7.7 3 1.6 4.3 3.1-1.4 1.2-2.4 2.7-3 4.6" stroke="currentColor" />
    </svg>
  );
}

const ROTATION = [-6, 4, -3, 5, -5, 3];

const ICON_SET = [
  DoodleMagnifier,
  DoodleCompass,
  DoodleLightbulb,
  DoodleGrowthArrow,
  DoodleClipboard,
  DoodleTarget,
];

/** Picks a themed doodle by keyword in stage id/name, cycling as a safe fallback. */
export function pickDoodle(stageKey: string, index: number) {
  const key = stageKey.toLowerCase();

  // Startup
  if (key.includes("startup")) return DoodleLightbulb;

  // Strategy
  if (key.includes("strateg")) return DoodleCompass;

  // Transformation
  if (key.includes("transform")) return DoodleClipboard;

  // Scale Up
  if (key.includes("scale")) return DoodleGrowthArrow;

  // Partnership
  if (key.includes("partner")) return DoodleTarget;

  // Other pages
  if (key.includes("discover")) return DoodleMagnifier;
  if (key.includes("financ")) return DoodleGrowthArrow;
  if (key.includes("govern") || key.includes("execut")) return DoodleClipboard;

  return ICON_SET[index % ICON_SET.length];
}

export function doodleRotation(index: number) {
  return ROTATION[index % ROTATION.length];
}