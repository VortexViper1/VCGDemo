"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: string;
};

export default function Modal({
  open,
  onClose,
  eyebrow,
  title,
  subtitle,
  children,
  maxWidth = "max-w-md",
}: Props) {
  useEffect(() => {
    if (!open) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={onClose}
          className="fixed inset-0 z-[999] flex items-end justify-center bg-[#23272B]/45 backdrop-blur-sm p-0 sm:items-center sm:p-6"
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={`relative w-full ${maxWidth} max-h-[92vh] overflow-y-auto rounded-t-2xl bg-white p-6 shadow-[0_24px_70px_rgba(10,12,14,0.18)] sm:rounded-2xl sm:p-7`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                {eyebrow && (
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#D9822B]">
                    {eyebrow}
                  </p>
                )}

                <h2 className="mt-1.5 text-lg font-semibold text-[#23272B] sm:text-xl">
                  {title}
                </h2>

                {subtitle && (
                  <p className="mt-1 text-sm text-[#77736D]">{subtitle}</p>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#77736D] transition-colors duration-150 hover:bg-[#F3E5D2] hover:text-[#B8661A] hover:text-[#23272B]"
              >
                <X size={18} strokeWidth={1.8} />
              </button>
            </div>

            <div className="mt-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}