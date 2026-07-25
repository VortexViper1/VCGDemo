"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
}

export default function FadeUp({
  children,
  delay = 0,
  duration = 0.7,
  distance = 40,
  once = true,
  className,
}: FadeUpProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: distance,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={className}
    >
      {children}
    </motion.div>
  );
}