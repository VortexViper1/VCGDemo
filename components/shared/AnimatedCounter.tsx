"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export default function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate(latest) {
        setValue(latest);
      },
    });

    return () => controls.stop();
  }, [isInView, from, to, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
    >
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </motion.span>
  );
}