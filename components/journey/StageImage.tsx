"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

      {/* CTA — white pill button, same treatment as the FeatureCarousel's
          "Discover More", shifts to amber on hover */}
      <div className="pointer-events-none absolute bottom-7 left-7">
        <span className="pointer-events-auto relative z-30 inline-flex w-fit items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-[13px] font-medium text-[#23272B] transition-all duration-300 hover:scale-105 hover:bg-[#D9822B] hover:text-white sm:text-sm">
          Discover More
          <ArrowRight size={15} />
        </span>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full"
        style={{ backgroundColor: stage.accent, opacity: 0.5 }}
      />
    </Link>
  );
}