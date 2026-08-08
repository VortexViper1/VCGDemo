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

      {/* Permanent dark amber gradient so white text always stays readable over any photo */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2A1B0D]/85 via-[#2A1B0D]/25 to-transparent" />

      {/* CTA label — always visible, bold white text */}
      <div className="pointer-events-none absolute bottom-7 left-7 flex items-center gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-white">
            Discover More
          </p>
        </div>

        <div
          className="flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-500 group-hover:translate-x-1"
          style={{ backgroundColor: stage.accent }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 8H14M14 8L8.5 2.5M14 8L8.5 13.5"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full"
        style={{ backgroundColor: stage.accent, opacity: 0.5 }}
      />
    </Link>
  );
}