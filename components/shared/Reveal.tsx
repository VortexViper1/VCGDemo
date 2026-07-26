"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
}

export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  y = 40,
  x = 0,
}: RevealProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y,
      x,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
        margin: "0px 0px -100px 0px",
      }}
    >
      {children}
    </motion.div>
  );
}