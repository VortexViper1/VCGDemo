"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 1 }}
      className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3"
    >
      <span className="text-[10px] uppercase tracking-[0.4em] text-white/50">
        Scroll
      </span>
      <div className="relative h-12 w-[1px] overflow-hidden bg-white/15">
        <motion.div
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-x-0 top-0 h-1/2 bg-[#C9A35F]"
        />
      </div>
    </motion.div>
  );
}