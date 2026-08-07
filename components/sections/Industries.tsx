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
 *
 * Mobile vs desktop are two different visual treatments of the SAME
 * markup (no duplicated <Image>/content, so nothing double-loads):
 *  - mobile: compact card — small aspect-[4/3] photo up top, content
 *    flows normally below it, card height is just whatever the
 *    content needs.
 *  - md and up: the original full-bleed, text-over-image overlay.
 *    Both the photo and the content switch to `absolute` at md+, so
 *    the slide wrapper needs an explicit `aspect-*` there — otherwise
 *    it has nothing left in normal flow to derive a height from and
 *    collapses to zero. That aspect ratio is the fix below.
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
          desktop; compact cards on mobile */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6
                   px-[max(1.5rem,calc((100vw-1400px)/2))] sm:gap-6
                   [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {FEATURES.map((feature, index) => (
          <div
            key={feature.title}
            className="relative shrink-0 snap-center overflow-hidden rounded-2xl bg-white
                       w-[64vw] sm:w-[78vw] md:aspect-[21/9] md:w-[900px] md:rounded-3xl lg:w-[1100px]"
          >
            {/* ── Photo ──
                Mobile: small, fixed-ratio card image, normal document flow.
                Desktop (md+): full-bleed background filling the whole slide
                (the slide now has real height via md:aspect-[21/9] above,
                so md:h-full here has something to fill). */}
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] md:absolute md:inset-0 md:aspect-auto md:h-full">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                sizes="(max-width: 767px) 64vw, 1100px"
                className="object-cover"
                priority={index === 0}
              />

              {/* Gradient overlay only needed where text sits on top of
                  the image, i.e. desktop */}
              <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-black/80 via-black/10 to-transparent md:block" />
            </div>

            {/* ── Content ──
                Mobile: normal flow, sits below the photo, card grows to
                fit it — this is what keeps the photo small.
                Desktop (md+): absolutely positioned overlay at the
                bottom of the full-bleed photo, as before. */}
            <div
              className="relative z-20 flex flex-col p-4 sm:p-5 md:p-8 lg:p-14
                         md:absolute md:inset-0 md:justify-end"
            >
              <span
                className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.2em] md:mb-3"
                style={{ color: "#C49A4A" }}
              >
                {feature.tag}
              </span>
              <h3
                className="mb-2 text-lg font-semibold sm:text-xl md:mb-3 md:text-3xl md:text-[#FAF8F4] lg:text-5xl"
                style={{ color: "white" }}
              >
                {feature.title}
              </h3>

              <p className="mb-4 max-w-md text-[13px] leading-5 text-[#646B70] sm:mb-5 sm:text-sm sm:leading-6 md:mb-6 md:max-w-lg md:leading-7 md:text-[#E8E3DA] lg:text-base">
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
              */}
              <Link
                href={feature.href}
                className="relative z-30 inline-flex w-fit items-center gap-2 rounded-full bg-[#C49A4A] px-4 py-2 text-[13px] font-medium text-[#1A1C20] transition-transform hover:scale-105 sm:px-5 sm:py-2.5 sm:text-sm md:bg-white/95 md:text-[#23272B]"
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

export default function WhyViswas() {
  return (
    <Section id="why-viswas" className="relative overflow-hidden bg-[#F8F5EF]">
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
    eyebrow="WHY VISWAS"
    title="Why organizations choose VISWAS."
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