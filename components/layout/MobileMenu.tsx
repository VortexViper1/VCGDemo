"use client";

import { useEffect } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { X, ArrowUpRight } from "lucide-react";
import { NAVIGATION, CTA_BUTTON } from "@/lib/navigation";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants: Variants = {
  hidden: { x: "100%", opacity: 0.8 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      mass: 0.8,
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
  exit: {
    x: "100%",
    opacity: 0.8,
    transition: {
      type: "spring" as const,
      stiffness: 350,
      damping: 35,
      mass: 0.7,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 24,
    },
  },
};

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  // Lock body scroll
  useEffect(() => {
    const original = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence mode="wait">
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-[#071F2D]/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 right-0 z-[120] w-full max-w-sm bg-[#0F1E26] shadow-2xl shadow-black/40"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Decorative gradient orb */}
            <div className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-[#B7964A]/10 blur-3xl" />

            <div className="flex h-full flex-col px-8 py-10">
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold tracking-[0.06em] text-[#F4F0E8]">
                  VISWAS
                </span>
                <motion.button
                  whileTap={{ scale: 0.9, rotate: 90 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={onClose}
                  className="rounded-full border border-[#F4F0E8]/10 p-3 text-[#F4F0E8] transition-colors hover:border-[#B7964A]/50 hover:text-[#B7964A]"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </motion.button>
              </div>

              {/* Links */}
              <nav className="mt-16 flex flex-col gap-2">
                {NAVIGATION.map((item) => (
                  <motion.div key={item.label} variants={itemVariants}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center justify-between rounded-xl px-4 py-4 text-2xl font-medium text-[#F4F0E8]/80 transition-colors hover:bg-[#B7964A]/5 hover:text-[#B7964A]"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight
                        size={20}
                        className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA */}
              <motion.div variants={itemVariants} className="mt-auto pt-8">
                <Link href={CTA_BUTTON.href} onClick={onClose}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 rounded-full bg-[#B7964A] px-8 py-4 text-base font-semibold text-[#1A1C20] shadow-lg shadow-[#B7964A]/20"
                  >
                    <span>{CTA_BUTTON.label}</span>
                    <ArrowUpRight size={18} />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}