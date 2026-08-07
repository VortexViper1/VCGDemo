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

      {/* Bottom fade — blends the hero into the next section's background
          (#F8F5EF) instead of ending on a hard edge. Update the "to-" color
          if the section right after Hero ever uses a different background. */}
     <div
  className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 bg-gradient-to-t from-[#F8F5EF] via-[#F8F5EF]/60 to-transparent"
  aria-hidden="true"
/>

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
          px-6
          sm:px-12
          lg:px-20
          xl:px-28
          2xl:px-36
          pt-44
          sm:pt-40
          lg:pt-40
          pb-10
          sm:pb-16
        "
      >
        {/*
          Mobile top padding (pt-44 = 176px) is intentionally MORE than
          desktop's (pt-40 = 160px), not less. The navbar is a fixed
          floating island (~66px pill + up to 24px top padding while
          expanded) sitting on top of this section, and on narrow
          screens that pill reads much closer to the hero text than it
          does on desktop where there's far more horizontal breathing
          room around it. pt-44 gives the heading enough clearance to
          never feel like it's tucked under the navbar. sm: and up
          steps back down to the original pt-40 once there's enough
          vertical space that the extra buffer isn't needed.
        */}
        <div className="w-full max-w-3xl">
          <HeroContent />
        </div>
      </div>
    </section>
  );
}