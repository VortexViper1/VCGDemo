"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Capability, JourneyStageType } from "@/lib/journey";

interface Props {
  stage: JourneyStageType;
  activeService?: Capability | null;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function StageImage({ stage, activeService }: Props) {
  const src = stage.image;
  const href = activeService
    ? `/journey/${stage.id}/${activeService.id}`
    : `/journey/${stage.id}`;
  const label = activeService ? activeService.title : stage.stage;

  return (
    <Link
      href={href}
      className="group relative block aspect-[16/9] w-full cursor-pointer overflow-hidden bg-[#2A2D31]/5 sm:aspect-[21/9]"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={src}
          initial={{ opacity: 0, scale: 1.015 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Image
              src={src}
              alt={stage.headline}
              fill
              priority
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Hover overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D211D]/70 via-[#0D211D]/10 to-transparent"
      />

      {/* CTA label, slides up on hover */}
      <motion.div
        initial={{ y: 14, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="pointer-events-none absolute bottom-6 left-6 flex items-center gap-3 sm:bottom-8 sm:left-8"
      >
        <span
          className="font-[var(--font-sans)] text-[11px] uppercase tracking-[0.3em] text-white"
        >
          Explore {label}
        </span>
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1"
          style={{ backgroundColor: stage.accent }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </motion.div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full"
        style={{ backgroundColor: stage.accent, opacity: 0.5 }}
      />
    </Link>
  );
}