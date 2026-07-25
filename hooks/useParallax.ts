"use client";

import {
  MotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { RefObject } from "react";

export function useParallax(
  ref: RefObject<HTMLElement | null>,
  distance = 100
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return useTransform(
    scrollYProgress,
    [0, 1],
    [-distance, distance]
  );
}