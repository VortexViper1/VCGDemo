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

const REVEAL_SELECTORS =
  ".hero-eyebrow, .hero-line-inner, .hero-sub, .hero-trust, .hero-cta";

export default function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(REVEAL_SELECTORS, { opacity: 1, yPercent: 0, y: 0 });
        return;
      }

      gsap.set(".hero-line-inner", { yPercent: 120 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.7 })
        .to(
          ".hero-line-inner",
          { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12 },
          "-=0.35"
        )
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.9 }, "-=0.5")
        .to(".hero-cta", { opacity: 1, y: 0, duration: 0.9 }, "-=0.6")
        .to(".hero-trust", { opacity: 1, y: 0, duration: 0.8 }, "-=0.5");
    }, containerRef);

    const fallback = setTimeout(() => {
      el.querySelectorAll(REVEAL_SELECTORS).forEach((node) => {
        (node as HTMLElement).style.opacity = "1";
        (node as HTMLElement).style.transform = "none";
      });
    }, 2000);

    return () => {
      ctx.revert();
      clearTimeout(fallback);
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="relative z-20 flex flex-col text-left">
      <span className="hero-eyebrow mb-4 block text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8B6116] opacity-0 sm:mb-5 sm:text-[12px] sm:tracking-[0.36em] md:text-[#C49A4A]">
        Strategy · Capital · Transformation
      </span>

      <h1 className="font-[var(--font-display)] font-semibold leading-[1.05] tracking-[-0.03em] sm:leading-[1.02] sm:tracking-[-0.04em]">
        {lines.map((line, i) => (
          <span
            key={i}
            className={`block overflow-hidden ${i === 3 ? "mt-2 italic sm:mt-3" : ""}`}
          >
            <span
              className={`hero-line-inner block pb-0.5 text-[clamp(1.8rem,5vw,3.6rem)] opacity-0 sm:pb-1 md:[text-shadow:0_2px_24px_rgba(0,0,0,0.45)] ${
                i === 3
                  ? "text-[#A97317] italic md:text-[#C49A4A]"
                  : "text-[#071F2D] md:text-white"
              }`}
            >
              {line}
            </span>
          </span>
        ))}
      </h1>

      <p className="hero-sub mt-4 max-w-md text-[15px] leading-7 text-[#3F454B] opacity-0 sm:mt-6 sm:text-[17px] sm:leading-8 md:text-white/85 md:[text-shadow:0_1px_14px_rgba(0,0,0,0.45)]">
        VISWAAS integrates strategy, corporate finance, governance and
        transformation into one advisory experience, helping boards and
        promoters make confident decisions with Long term impact.
      </p>

      <div className="mt-6 sm:mt-8">
        <Link
          href="/#contact"
          className="hero-cta block w-full opacity-0 sm:inline-block sm:w-auto"
        >
          <MagneticButton
            className="
              group flex w-full items-center justify-center gap-3
              rounded-full bg-[#C49A4A]
              px-6 py-3.5 text-sm font-medium uppercase tracking-[0.08em]
              text-[#2A2D31]
              transition-all duration-700 ease-out
              hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(196,154,74,.35)]
              sm:w-auto sm:justify-start sm:px-10 sm:py-4 sm:text-base
            "
          >
            Book an Appointment
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </MagneticButton>
        </Link>
      </div>

      <div className="hero-trust mt-9 flex items-center gap-3 opacity-0 sm:mt-11">
        <span className="h-px w-9 bg-[#C49A4A]/50" aria-hidden="true" />
        <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#071F2D]/50 sm:text-[11px] md:text-white/70">
          Trusted advisors to boards &amp; promoters
        </span>
      </div>
    </div>
  );
}