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
      className="relative z-20 flex min-h-[90vh] flex-col justify-center"
    >
     <h1 className="max-w-5xl font-[var(--font-display)] font-semibold text-[#173F38] leading-[1] tracking-[-0.04em]">
  {lines.map((line, i) => (
    <span
      key={i}
      className={`block overflow-hidden ${
        i === 3 ? "mt-6 text-[#C9A35F] italic" : ""
      }`}
    >
     <span
  className={`hero-line-inner block pb-2 text-[clamp(3rem,5vw,5.8rem)] ${
    i === 3 ? "text-[#C9A35F] italic" : "text-[#173F38]"
  }`}
>
        {line}
      </span>
    </span>
  ))}
</h1>

      <p className="hero-sub mt-14 max-w-xl text-[18px] leading-9 text-[#173F38]/75">
  VISWAS integrates strategy, corporate finance, governance and
  transformation into one advisory experience, helping boards and
  promoters make confident decisions with long-term impact.
</p>

      <div className="mt-14 flex flex-wrap items-center gap-5">
        <Link href="/#contact" className="hero-cta">
          <MagneticButton
  className="
rounded-full
bg-[#C9A35F]
px-10
py-4
font-medium
tracking-[0.08em]
uppercase
text-[#173F38]
transition-all
duration-700
ease-out
hover:-translate-y-1
hover:shadow-[0_15px_40px_rgba(201,163,95,.35)]
"
>
            Book an Appointment
          </MagneticButton>
        </Link>

        <Link href="/#services" className="hero-cta group">
        <MagneticButton
  strength={0.25}
  className="
flex
items-center
gap-3
rounded-full
border
border-[#173F38]/20
px-10
py-4
uppercase
tracking-[0.08em]
transition-all
duration-700
ease-out
hover:border-[#C9A35F]
hover:bg-[#173F38]/5
"
>
  Explore Capabilities
  <ArrowRight />
</MagneticButton>
        </Link>
      </div>
    </div>
  );
}