"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.01,
      }}
      transition={{
        duration: 0.35,
      }}
      className={`glass-island group relative overflow-hidden rounded-[28px]
        bg-[#F7F4EE]/[0.04]
        border border-[#173F38]/8
        backdrop-blur-2xl
        shadow-[0_20px_80px_rgba(0,0,0,0.25)]
        ${className ?? ""}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[linear-gradient(135deg,rgba(244,240,232,0.09),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-transparent transition-colors duration-500 group-hover:border-[#B7964A]/40" />

      <div className="relative p-8 md:p-10">
        {children}
      </div>
    </motion.div>
  );
}
