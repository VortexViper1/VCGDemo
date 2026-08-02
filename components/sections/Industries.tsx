"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Reveal from "@/components/shared/Reveal";
import Section from "@/components/shared/Section";

const FEATURES = [
  {
    tag: "Strategy",
    title: "Strategic Intelligence",
    description:
      "Data-driven insights combined with executive expertise to solve complex business challenges.",
    // TODO: replace with real image — /public/images/why/strategic-intelligence.jpg
    image: "/why/Strategic Intelligence.jpg",
    href: "/about/strategic-intelligence",
  },
  {
    tag: "Global",
    title: "Global Perspective",
    description:
      "Combining international best practices with local market understanding for sustainable growth.",
    // TODO: replace with real image — /public/images/why/global-perspective.jpg
    image: "/why/Global Perspective.jpg",
    href: "/about/global-perspective",
  },
  {
    tag: "Partnership",
    title: "Trusted Partnership",
    description:
      "Working alongside leadership teams as long-term advisors rather than short-term consultants.",
    // TODO: replace with real image — /public/images/why/trusted-partnership.jpg
    image: "/why/Trusted Partnership.jpg",
    href: "/about/trusted-partnership",
  },
  {
    tag: "Execution",
    title: "Execution Excellence",
    description:
      "Strategies backed by measurable execution frameworks that deliver tangible business outcomes.",
    // TODO: replace with real image — /public/images/why/execution-excellence.jpg
    image: "/why/Execution Excellence.jpg",
    href: "/about/execution-excellence",
  },
];

/**
 * Apple TV+ / apple.com style swipeable carousel.
 * Native CSS scroll-snap (not JS drag physics) — runs on the
 * browser's compositor thread, so it stays smooth on low-end
 * mobile and there's zero jank on desktop either.
 */
function FeatureCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const idx = slides.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { root: track, threshold: [0.6] }
    );

    slides.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement | undefined;
    if (!slide) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  const goNext = () => scrollToIndex(Math.min(active + 1, FEATURES.length - 1));
  const goPrev = () => scrollToIndex(Math.max(active - 1, 0));

  return (
    <div className="relative">
      {/* Track — full-bleed, large slides like apple.com's carousel */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6
                   px-[max(1.5rem,calc((100vw-1400px)/2))]
                   [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {FEATURES.map((feature, index) => (
          <div
            key={feature.title}
            className="relative shrink-0 snap-center overflow-hidden rounded-3xl
                       w-[92vw] sm:w-[85vw] md:w-[900px] lg:w-[1100px]
                       aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9]"
          >
            {/* Background image — swap the src in FEATURES[].image with your own asset in /public/images/why/ */}
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              sizes="(max-width: 768px) 92vw, 1100px"
              className="object-cover"
              priority={index === 0}
            />

            {/* Gradient overlay for text legibility, Apple TV+ style */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            {/* z-20 + relative here matters: this is the routing-bug fix —
               if a Navbar overlay sits above this section with a higher
               stacking context, its transparent hit-area can swallow clicks
               before they reach this Link. Keep this content layer explicitly
               stacked and make sure Navbar's overlay uses pointer-events-none
               except on its own interactive children. */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-14">
              <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A35F]">
                {feature.tag}
              </span>
              <h3
  className="mb-3 text-3xl md:text-5xl font-semibold"
  style={{ color: "#FAF8F4" }}
>
  {feature.title}
</h3>

<p className="mb-6 max-w-md md:max-w-lg text-sm md:text-base leading-6 md:leading-7 text-[#E8E3DA]">
  {feature.description}
</p>

              <Link
                href={feature.href}
                className="relative z-30 inline-flex w-fit items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-medium text-[#071F2D] transition-transform hover:scale-105"
              >
                Discover More
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Whole-card click target to the same href, sitting BELOW the
               button/text (z-10) so the button's own z-30 still wins,
               but clicking anywhere else on the slide also navigates —
               matches the apple.com carousel behavior. */}
            <Link
              href={feature.href}
              aria-label={feature.title}
              className="absolute inset-0 z-10"
            />
          </div>
        ))}
      </div>

      {/* Controls: dots + arrows */}
      <div className="mt-6 flex items-center justify-between px-[max(1.5rem,calc((100vw-1400px)/2))]">
        <div className="flex gap-2">
          {FEATURES.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === active ? "w-6 bg-[#173F38]" : "w-1.5 bg-[#173F38]/25"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={goPrev}
            disabled={active === 0}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#173F38]/15 text-[#173F38] transition-opacity disabled:opacity-30"
            aria-label="Previous slide"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={goNext}
            disabled={active === FEATURES.length - 1}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#173F38]/15 text-[#173F38] transition-opacity disabled:opacity-30"
            aria-label="Next slide"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WhyViswas() {
  return (
    <Section id="why-viswas" className="relative overflow-hidden bg-[#F7F4EE]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-16 top-1/3 h-96 w-96 rounded-full bg-[#C9A35F]/12 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-[#23363F]/30 blur-[140px]"
        />
      </div>

      <Reveal>
        <FeatureCarousel />
      </Reveal>
    </Section>
  );
}