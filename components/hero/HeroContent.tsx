"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const lines = [
  "We advise",
  "organizations",
  "through their",
  "most consequential",
  "decisions.",
];

export default function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [".hero-line-inner", ".hero-sub", ".hero-cta"],
          { opacity: 1, yPercent: 0, y: 0 }
        );
        return;
      }

      // Base opacity/transform already set via CSS classes below —
      // this just adds the yPercent starting offset GSAP needs to animate from.
      gsap.set(".hero-line-inner", { yPercent: 120 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(".hero-line-inner", {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.12,
      })
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.9 }, "-=0.5")
        .to(".hero-cta", { opacity: 1, y: 0, duration: 0.9 }, "-=0.6")
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

// HeroContent.tsx — full return, condensed spacing
return (
  <div ref={containerRef} className="relative z-20 flex flex-col">
    <h1 className="font-[var(--font-display)] font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:leading-[1] sm:tracking-[-0.04em]">
      {lines.map((line, i) => (
        <span
          key={i}
          className={`block overflow-hidden ${
            i === 3 ? "mt-2 italic sm:mt-4" : ""
          }`}
        >
          <span
            className={`hero-line-inner block pb-0.5 text-[clamp(1.6rem,5vw,3.4rem)] opacity-0 sm:pb-1 ${
              i === 3 ? "text-[#C49A4A] italic" : "text-white"
            }`}
          >
            {line}
          </span>
        </span>
      ))}
    </h1>

    <p className="hero-sub mt-4 max-w-md text-[15px] leading-7 text-white/80 opacity-0 sm:mt-6 sm:max-w-xl sm:text-[18px] sm:leading-8">
      VISWAS integrates strategy, corporate finance, governance and
      transformation into one advisory experience, helping boards and
      promoters make confident decisions with long-term impact.
    </p>

    <div className="mt-5 sm:mt-7">
      <Link href="/#contact" className="hero-cta inline-block opacity-0">
        <MagneticButton
          className="
            group flex items-center gap-3
            rounded-full bg-[#C49A4A]
            px-8 py-3.5 text-sm font-medium uppercase tracking-[0.08em]
            text-[#2A2D31]
            transition-all duration-700 ease-out
            hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(201,163,95,.35)]
            sm:px-10 sm:py-4 sm:text-base
          "
        >
          Book an Appointment
          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
        </MagneticButton>
      </Link>
    </div>
    </div>
);}