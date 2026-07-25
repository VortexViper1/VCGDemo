"use client";

import { useScroll, useSpring } from "framer-motion";

export function useSmoothScrollProgress() {
  const { scrollY, scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 25,
  });

  return {
    scrollY,
    scrollYProgress: progress,
  };
}