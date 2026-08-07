"use client";

import { useRef } from "react";
import HeroVideoBackground from "./HeroVideoBackground";
import HeroContent from "./HeroContent";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-label="VISWAS Consulting Group"
      // 100svh avoids the mobile URL-bar resize jump that 100vh causes;
      // min-h dropped from 900px to 600px so short viewports (iPhone SE,
      // ~667px) don't get force-stretched below the fold.
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-[#0B1210] text-white"
    >
      <HeroVideoBackground sectionRef={sectionRef} />

      {/* Overlay lives in HeroVideoBackground only — do not re-add one here. */}
<div
  className="
    relative
    z-20
    mx-auto
    flex
    h-full
    w-full
    max-w-[1600px]
    items-start
    px-8
    sm:px-12
    lg:px-20
    xl:px-28
    2xl:px-36
    pt-40
    lg:pt-40
    pb-16
  "
>
        <div className="w-full max-w-3xl">
          <HeroContent />
        </div>
      </div>
    </section>
  );
}