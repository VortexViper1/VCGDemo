"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Capability, JourneyStageType } from "@/lib/journey";
import StageHeadline from "./StageHeadline";
import ChallengeCloud from "./ChallenegeCloud";
import ServiceCluster from "./ServiceCluster";
import StageImage from "./StageImage";

interface Props {
  stage: JourneyStageType;
  index: number;
  total: number;
}

export default function JourneyStagePanel({ stage, index, total }: Props) {
  const [activeService, setActiveService] = useState<Capability | null>(null);

  return (
    <div className="relative mt-20 overflow-hidden sm:mt-24">
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <StageHeadline
            stage={stage.stage}
            headline={stage.headline}
            description={stage.description}
            index={index}
            total={total}
            accent={stage.accent}
          />

          <div className="mt-16 sm:mt-20">
            <StageImage stage={stage} activeService={activeService} />
          </div>

          <div className="mt-16 grid gap-16 border-t border-[#2A2D31]/10 pt-14 sm:mt-20 sm:pt-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <span
                className="text-[11px] uppercase tracking-[0.35em]"
                style={{ color: stage.accent }}
              >
                Key Challenges
              </span>
              <div className="mt-8">
                <ChallengeCloud challenges={stage.challenges} accent={stage.accent} />
              </div>
            </div>

            <div className="lg:border-l lg:border-[#2A2D31]/10 lg:pl-24">
              <span
                className="text-[11px] uppercase tracking-[0.35em]"
                style={{ color: stage.accent }}
              >
                Our Capabilities
              </span>
              <div className="mt-4">
                <ServiceCluster
                  services={stage.services}
                  accent={stage.accent}
                  onActiveServiceChange={setActiveService}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}