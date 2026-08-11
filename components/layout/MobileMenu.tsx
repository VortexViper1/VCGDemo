"use client";

import { useEffect } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { NAVIGATION, CTA_BUTTON } from "@/lib/navigation";
import SectionLink from "@/components/shared/SectionLink";

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

/* ── Palette for this panel ──
   Panel bg: amber (#C89B3C)
   Text: graphite (#2A2D31) — matches --color-ink
   Hover: warm slate (#5C5347) — desaturated, warm-toned grey
   CTA: graphite bg / ivory text — deliberate contrast against the
   amber panel, reads as the "action" surface rather than blending in */
const GRAPHITE = "#2A2D31";
const WARM_SLATE = "#5C5347";
const IVORY = "#FAF8F4";

export default function MobileMenu({
  open,
  onClose,
}: MobileMenuProps) {
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
            className="fixed inset-0 z-[110] bg-[#23272B]/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 right-0 z-[120] w-full max-w-sm bg-[#C89B3C] shadow-2xl shadow-black/40"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Decorative gradient orb */}
            <div className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-[#2A2D31]/10 blur-3xl" />

            <div className="flex h-full flex-col px-8 py-10">
              {/* Header */}
              <div className="flex items-center justify-between">
                <span
                  className="text-lg font-semibold tracking-[0.06em]"
                  style={{ color: GRAPHITE }}
                >
                  Viswaas
                </span>
                <motion.button
                  whileHover={{ borderColor: WARM_SLATE, opacity: 1, color: WARM_SLATE }}
                  whileTap={{ scale: 0.9, rotate: 90, borderColor: WARM_SLATE, color: WARM_SLATE }}
                  onClick={onClose}
                  className="rounded-full border border-[#2A2D31]/30 p-3 transition-all duration-300"
                  style={{ color: GRAPHITE }}
                  aria-label="Close menu"
                >
                  <X size={22} />
                </motion.button>
              </div>

              {/* Links */}
              <nav className="mt-16 flex flex-col gap-2">
                {NAVIGATION.map((item) => (
                  <motion.div key={item.label} variants={itemVariants}>
                    <SectionLink
                      href={item.href}
                      onNavigate={onClose}
                      className="group flex items-center justify-between rounded-xl px-4 py-4 transition-all duration-300 hover:bg-[#2A2D31]/5"
                    >
                      <span
                        className="text-2xl font-medium transition-colors duration-300 group-hover:!text-[#5C5347]"
                        style={{ color: GRAPHITE }}
                      >
                        {item.label}
                      </span>

                      <ArrowUpRight
                        size={20}
                        className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                        style={{ color: WARM_SLATE }}
                      />
                    </SectionLink>
                  </motion.div>
                ))}
              </nav>

              {/* CTA — graphite surface for deliberate contrast against the amber panel */}
              <motion.div variants={itemVariants} className="mt-auto pt-8">
                <SectionLink href={CTA_BUTTON.href} onNavigate={onClose}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold shadow-lg shadow-black/20"
                    style={{ backgroundColor: GRAPHITE, color: IVORY }}
                  >
                    <span>{CTA_BUTTON.label}</span>
                    <ArrowUpRight size={18} />
                  </motion.div>
                </SectionLink>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}