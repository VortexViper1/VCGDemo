"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingProps {
  children: ReactNode;
  duration?: number;
  distance?: number;
  className?: string;
}

export default function Floating({
  children,
  duration = 6,
  distance = 12,
  className,
}: FloatingProps) {
  return (
    <motion.div
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}