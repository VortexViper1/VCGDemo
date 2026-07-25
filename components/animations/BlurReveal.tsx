"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BlurRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function BlurReveal({
  children,
  delay = 0,
  className,
}: BlurRevealProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(18px)",
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        delay,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}