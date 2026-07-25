"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

import { NAVIGATION, CTA_BUTTON } from "@/lib/navigation";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const backdrop = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const panel = {
  hidden: {
    x: "100%",
  },
  visible: {
    x: 0,
  },
  exit: {
    x: "100%",
  },
};

export default function MobileMenu({
  open,
  onClose,
}: MobileMenuProps) {
  return (
    <motion.div
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md lg:hidden"
      onClick={onClose}
    >
      <motion.aside
        variants={panel}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-white/10 bg-[#071F2D]/95 backdrop-blur-3xl"
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
          <div>
            <h2 className="text-xl font-semibold "style={{ color: "#F7F4EE" }}>
              VISWAS
            </h2>

            <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-[#C9A35F]">
              Strategy • Capital • Transformation
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition hover:border-[#C9A35F]"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}

        <nav className="flex flex-1 flex-col px-6 py-10">
          <div className="space-y-2">
            {NAVIGATION.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{
                  opacity: 0,
                  x: 30,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-center justify-between rounded-2xl border border-transparent px-5 py-4 transition-all duration-300 hover:border-[#C9A35F]/40 hover:bg-white/5"
                >
                  <div className="flex items-center gap-4">
                    {item.icon && (
                      <item.icon
                        className="text-[#C9A35F]"
                      />
                    )}

                    <span className="text-lg font-medium "style={{ color: "#F7F4EE" }}>
                      {item.label}
                    </span>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-white/40 transition group-hover:text-[#C9A35F]"
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-auto pt-10">
            <Link
              href={CTA_BUTTON.href}
              onClick={onClose}
            >
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C9A35F] px-6 py-4 text-sm font-semibold text-[#071F2D] shadow-lg shadow-[#C9A35F]/20 transition hover:shadow-[#C9A35F]/40"
              >
                {CTA_BUTTON.label}

                <ArrowUpRight size={18} />
              </motion.button>
            </Link>
          </div>
        </nav>

        {/* Footer */}

        <div className="border-t border-white/10 px-6 py-5">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            © {new Date().getFullYear()} VISWAS Consulting Group
          </p>
        </div>
      </motion.aside>
    </motion.div>
  );
}