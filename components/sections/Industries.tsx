"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/shared/SectionTitle";
import Reveal from "@/components/shared/Reveal";
import Section from "@/components/shared/Section";

const FEATURES = [
  {
    tag: "Philosophy",
    title: "One North Star",
    description:
      "Every enterprise needs a true north we align strategy, capital and transformation so every decision moves toward the same destination.",
    // TODO: replace with real image — /public/images/why/one-north-star.jpg
    image: "/about/One North Star.jpg",
    href: "/about/north-star",
  },
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
      "Working alongside leadership teams as Long term advisors rather than short-term consultants.",
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
 *
 * Mobile vs desktop are two different visual treatments of the SAME
 * markup (no duplicated <Image>/content, so nothing double-loads):
 *  - mobile: compact card — small aspect-[4/3] photo up top, content
 *    flows below it. The slide is now `flex flex-col` and the title/
 *    description are line-clamped with a matching min-height, so
 *    every card ends up the same height no matter how much text it
 *    holds — otherwise a 2-line title ("Strategic Intelligence")
 *    made that card taller than its neighbors. The CTA uses
 *    `mt-auto` so it always sits flush at the bottom.
 *  - md and up: the original full-bleed, text-over-image overlay.
 *    Both the photo and the content switch to `absolute` at md+, so
 *    the slide wrapper needs an explicit `aspect-*` there — otherwise
 *    it has nothing left in normal flow to derive a height from and
 *    collapses to zero. That aspect ratio (fixed for every card)
 *    is what already keeps desktop cards uniform.
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
      {/* Track — full-bleed, large slides like apple.com's carousel on
          desktop; compact, equal-height cards on mobile */}
      <div
        ref={trackRef}
        className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6
                   px-[max(1.5rem,calc((100vw-1400px)/2))] sm:gap-6
                   [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {FEATURES.map((feature, index) => (
          <div
            key={feature.title}
            className="group relative flex shrink-0 flex-col snap-center overflow-hidden rounded-2xl bg-white
                       shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                       w-[64vw] sm:w-[78vw]
                       md:aspect-[21/9] md:w-[900px] md:flex-none md:rounded-3xl md:shadow-none md:ring-0 md:hover:translate-y-0
                       lg:w-[1100px]"
          >
            {/* ── Photo ──
                Mobile: small, fixed-ratio card image, normal document flow.
                Desktop (md+): full-bleed background filling the whole slide
                (the slide now has real height via md:aspect-[21/9] above,
                so md:h-full here has something to fill). */}
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden sm:aspect-[16/10] md:absolute md:inset-0 md:aspect-auto md:h-full">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                sizes="(max-width: 767px) 64vw, 1100px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority={index === 0}
              />

              {/* Gradient overlay only needed where text sits on top of
                  the image, i.e. desktop */}
              <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-black/80 via-black/10 to-transparent md:block" />
            </div>

            {/* ── Content ──
                Mobile: flex-1 so it fills the remaining height of the
                flex-column card (image is fixed-ratio, this takes the
                rest) — combined with mt-auto on the CTA below, this is
                what keeps every mobile card the same height.
                Desktop (md+): absolutely positioned overlay at the
                bottom of the full-bleed photo, as before. */}
            <div
              className="relative z-20 flex flex-1 flex-col p-4 sm:p-5
                         md:absolute md:inset-0 md:justify-end md:p-8 lg:p-14"
            >
              <h3
                className="mb-2 line-clamp-2 min-h-[3.25rem] text-lg font-semibold leading-snug
                           sm:min-h-[3.75rem] sm:text-xl
                           md:mb-3 md:min-h-0 md:text-3xl md:leading-tight md:line-clamp-none
                           lg:text-5xl"
                style={{ color: "#E8C275" }}
              >
                {feature.title}
              </h3>

              <p
                className="mb-4 line-clamp-2 min-h-[2.5rem] max-w-md text-[13px] leading-5 text-[#646B70]
                           sm:mb-5 sm:min-h-[3rem] sm:text-sm sm:leading-6
                           md:mb-6 md:min-h-0 md:max-w-lg md:line-clamp-3 md:leading-7 md:text-[#E8E3DA]
                           lg:text-base"
              >
                {feature.description}
              </p>

              {/*
                Mobile "Discover More" fix: the old mobile styling used a
                solid dark (#2A2D31) pill with white text, which — sitting
                on the plain white card background used on mobile (there's
                no gradient overlay below md:) — read as a jarring solid
                black button. Mobile now uses the same gold accent as the
                rest of the site (matches the tag color above) with dark
                text for contrast, so it reads as an intentional CTA
                instead of a black glitch. Desktop keeps its original
                white-pill-on-photo treatment, unchanged.

                mt-auto pins this to the bottom of the flex-1 content
                block on mobile, so the CTA lines up across every card
                even when title/description lengths differ.
              */}
              <Link
                href={feature.href}
                className="relative z-30 mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-[#C49A4A] px-4 py-2 text-[13px] font-medium text-[#1A1C20] transition-all duration-300 hover:scale-105 hover:bg-[#D9822B] hover:text-white sm:px-5 sm:py-2.5 sm:text-sm md:mt-0 md:bg-white/95 md:text-[#23272B] md:hover:bg-[#D9822B] md:hover:text-white"
              >
                Discover More
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Whole-card click target to the same href, sitting BELOW the
               button/text (z-10) so the button's own z-30 still wins,
               but clicking anywhere else on the slide also navigates —
               matches the apple.com carousel behavior on desktop, and
               still works as a whole-card tap target on mobile. */}
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
                index === active ? "w-6 bg-[#2A2D31]" : "w-1.5 bg-[#2A2D31]/25"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={goPrev}
            disabled={active === 0}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2A2D31]/15 text-[#2A2D31] transition-opacity disabled:opacity-30"
            aria-label="Previous slide"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={goNext}
            disabled={active === FEATURES.length - 1}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2A2D31]/15 text-[#2A2D31] transition-opacity disabled:opacity-30"
            aria-label="Next slide"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WhyVISWAAS() {
  return (
    <Section id="why-VISWAAS" className="relative overflow-hidden bg-[#FFFFFF]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-16 top-1/3 h-96 w-96 rounded-full bg-[#C49A4A]/12 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-[#1F2428]/30 blur-[140px]"
        />
      </div>

      <Reveal>
        <SectionTitle
          eyebrow="WHY Viswaas"
          title="Why organizations choose Viswaas."
          description="Our approach is built on strategic thinking, trusted partnerships, global perspective, and disciplined execution helping businesses navigate complexity with confidence."
          align="center"
        />
      </Reveal>

      <div className="mt-20">
        <Reveal delay={0.15}>
          <FeatureCarousel />
        </Reveal>
      </div>
    </Section>
  );
}