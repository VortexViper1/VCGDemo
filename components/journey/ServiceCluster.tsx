"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Capability } from "@/lib/journey";

interface Props {
  services: Capability[];
  accent: string;
  onActiveServiceChange?: (service: Capability | null) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ServiceCluster({ services, accent, onActiveServiceChange }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleToggle = (service: Capability) => {
    const next = activeId === service.id ? null : service.id;
    setActiveId(next);
    onActiveServiceChange?.(next ? service : null);
  };

  return (
    <div>
      <div className="space-y-2 border-t border-[#173F38]/10">
        {services.map((service, index) => {
          const isOpen = activeId === service.id;

          return (
            <div key={service.id} className="border-b border-[#173F38]/10 py-6">
              <motion.div
                animate={{ width: isOpen ? 56 : 24 }}
                transition={{ duration: 0.42, ease: EASE }}
                className="mb-5 h-px"
                style={{ backgroundColor: isOpen ? accent : "rgba(23,63,56,0.18)" }}
              />

              <button
                onClick={() => handleToggle(service)}
                className="group flex w-full items-baseline gap-5 text-left outline-none"
                aria-expanded={isOpen}
              >
                <span
                  className="shrink-0 font-[var(--font-sans)] text-xs tabular-nums tracking-[0.12em] transition-colors duration-300"
                  style={{ color: isOpen ? accent : "rgba(23,63,56,0.35)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <motion.h3
                  layout="position"
                  transition={{ duration: 0.42, ease: EASE }}
                  className={`font-[var(--font-display)] leading-[1.05] tracking-[-0.02em] transition-all duration-300 ${
                    isOpen
                      ? "text-[28px] text-[#173F38] sm:text-[32px]"
                      : "text-[19px] text-[#173F38]/70 group-hover:text-[#173F38] sm:text-[21px]"
                  }`}
                >
                  {service.title}
                </motion.h3>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.42, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="pl-[2.1rem] pt-6 sm:pl-[2.6rem]">
                      <p className="max-w-xl font-[var(--font-sans)] text-[16px] leading-[1.9] tracking-[0.005em] text-[#6E847F] sm:text-[17px]">
                        {service.description}
                      </p>

                      <div
                        className="mt-7 h-px w-10"
                        style={{ backgroundColor: accent, opacity: 0.5 }}
                      />

                      <ul className="mt-7 grid gap-3.5 sm:grid-cols-2 sm:gap-x-10">
                        {service.bullets.map((bullet, i) => (
                          <motion.li
                            key={bullet}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: 0.08 + i * 0.04, ease: EASE }}
                            className="flex items-start gap-3 font-[var(--font-sans)] text-[14px] leading-[1.7] text-[#173F38]/75"
                          >
                            <span
                              className="mt-[9px] h-px w-3 shrink-0"
                              style={{ backgroundColor: accent }}
                            />
                            {bullet}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}