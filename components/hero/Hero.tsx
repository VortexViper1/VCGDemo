"use client";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroStats from "./HeroStats";
import ScrollIndicator from "./ScrollIndicator";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#F7F4EE] pt-32 text-[#173F38]">
      <HeroBackground />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 lg:px-10">
  <div className="grid w-full items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <HeroContent />
          <HeroStats />
        </div>
      </div>

    </section>
  );
}
