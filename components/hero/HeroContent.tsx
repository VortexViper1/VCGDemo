"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-line-inner", { yPercent: 120, opacity: 0 });
      gsap.set(".hero-sub", { opacity: 0, y: 30 });
      gsap.set(".hero-cta", { opacity: 0, y: 30 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

tl.to(".hero-line-inner", {
  yPercent: 0,
  opacity: 1,
  duration: 1.1,
  stagger: 0.12,
})
.to(".hero-sub", {
  opacity: 1,
  y: 0,
  duration: 0.9,
}, "-=0.5")
.to(".hero-cta", {
  opacity: 1,
  y: 0,
  duration: 0.9,
  stagger: 0.15,
}, "-=0.6");
       
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-20 flex min-h-[80vh] flex-col justify-center"
    >
      <h1
  className="font-[var(--font-display)] text-[clamp(4rem,5vw,8rem)] leading-[0.92]"
  style={{ color: "#173F38" }}
>
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <span
              className={`hero-line-inner block ${
                i === 3 ? "text-[#C9A35F]" : ""
              }`}
            >
              {line}
            </span>
          </span>
        ))}
      </h1>

      <p className="hero-sub mt-10 max-w-2xl text-lg leading-9 text-[#071F2D]/70">
        VISWAS integrates strategy, corporate finance, governance and
        transformation into one advisory experience, helping boards and
        promoters make confident decisions with long-term impact.
      </p>

      <div className="mt-12 flex flex-wrap items-center gap-5">
        <Link href="/#contact" className="hero-cta">
          <MagneticButton className="rounded-full bg-[#C9A35F] px-8 py-4 font-semibold text-[#071F2D] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(201,163,95,0.5)]">
            Book an Appointment
          </MagneticButton>
        </Link>

        <Link href="/#services" className="hero-cta group">
        <MagneticButton
  strength={0.25}
  className="flex items-center gap-3 rounded-full border border-[#173F38]/10 px-8 py-4 transition-all duration-300 hover:border-[#C9A35F] hover:bg-white"
  style={{ color: "#173F38" }}
>
            Explore Capabilities
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </MagneticButton>
        </Link>
      </div>
    </div>
  );
}