"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function FloatingContact() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.button
      type="button"
      onClick={scrollToContact}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, scale: 1.025 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="talk-island fixed bottom-5 right-5 z-[90] inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-[#1F2428]/80 px-4 py-3 text-sm font-medium text-[#23272B] backdrop-blur-2xl sm:bottom-7 sm:right-7 sm:px-5"
      aria-label="Scroll to contact section"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#B7964A] text-[#1A1C20]">
        <ArrowUpRight size={15} strokeWidth={1.75} />
      </span>
      <span>Let&apos;s Talk</span>
    </motion.button>
  );
}
