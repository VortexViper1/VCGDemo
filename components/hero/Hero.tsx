import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Volume2, VolumeX, ArrowRight } from "lucide-react";

const LINES = [
  { text: "We advise",          italic: false },
  { text: "organizations",      italic: false },
  { text: "through their",      italic: false },
  { text: "most consequential", italic: true  },
  { text: "decisions.",         italic: false },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function App() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [muted,      setMuted]      = useState(true);
  const rm = useReducedMotion();

  useEffect(() => {
    const video   = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || rm) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else                      video.pause();
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [rm]);

  const toggleMute = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (muted) {
        video.muted  = false;
        video.volume = 1;
        if (video.paused) await video.play();
        setMuted(false);
      } else {
        video.muted = true;
        setMuted(true);
      }
    } catch (e) {
      console.error("toggleMute:", e);
    }
  };

  const fromBelow = rm ? false as const : { opacity: 0, y: 18 };
  const toVisible  = { opacity: 1, y: 0 };

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-label="Viswaas Consulting Group"
      style={{ fontFamily: "var(--font-body)" }}
      className="
        relative w-full overflow-hidden
        bg-[#FBF1DC]
        md:flex md:h-[100svh] md:min-h-[600px] md:flex-row md:items-stretch
        md:gap-8 lg:gap-12
        md:pt-24 lg:pt-28
      "
    >

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          VIDEO — sits first in DOM so it renders above text on mobile
          (mobile behaviour is unchanged: rounded card, in-flow, on top).
          On desktop it becomes a 60%-wide rounded card on the RIGHT side
          of a two-column flex row (md:order-2 flips it right while the
          DOM stays video-first, so mobile order is untouched).
          Mute button lives inside this container so it's always visible
          and positioned correctly on both mobile and desktop.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="
          relative z-10
          mx-5 mt-24 overflow-hidden
          rounded-[20px]
          border border-[#C49A4A]/35
          shadow-[0_14px_56px_-10px_rgba(196,154,74,0.24),0_2px_8px_-2px_rgba(42,29,15,0.12)]
          sm:mx-8 sm:mt-28 sm:rounded-[24px]
          md:order-2 md:mx-0 md:mt-0 md:my-8 md:mr-8
          md:h-auto md:w-[60%] md:shrink
          md:rounded-[28px]
          lg:my-10 lg:mr-10 lg:rounded-[32px]
        "
      >
        {/* Aspect-ratio holder — 3/2 on mobile, fills the card on desktop */}
        <div className="relative aspect-[3/2] w-full bg-[#2A1D0F] md:aspect-auto md:h-full">

          {/* Ken Burns slow zoom */}
          <motion.div
            className="absolute inset-0"
            animate={rm ? {} : { scale: [1, 1.055, 1] }}
            transition={rm ? {} : { duration: 26, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: "transform" }}
          >
            <video
              ref={videoRef}
              poster="/hero-poster.jpg"
              muted={muted}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay={!rm}
              loop
              playsInline
              preload="metadata"
              onCanPlay={() => setVideoReady(true)}
              onLoadedData={() => setVideoReady(true)}
              onError={() => setVideoError(true)}
            >
              <source src="/hero-video1.mp4" type="video/mp4" />
              <track kind="captions" src="/hero-captions.vtt" srcLang="en" label="English" />
            </video>
          </motion.div>

          {videoError && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#2A1D0F]/90">
              <span className="text-[13px] text-white/30">Video unavailable</span>
            </div>
          )}

          {/* Bottom vignette inside card — shown on mobile and desktop now
              that the video isn't used as a full-bleed text backdrop. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#2A1D0F]/40 to-transparent"
          />
        </div>

        {/* ── Mute button — top-right corner of the card on both mobile
            and desktop, since the card is a self-contained element now
            rather than a full-screen background. ── */}
        <motion.button
          type="button"
          onClick={toggleMute}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={rm ? { duration: 0 } : { duration: 0.8, delay: 1.4 }}
          aria-label={muted ? "Unmute background video" : "Mute background video"}
          aria-pressed={!muted}
          className="
            absolute z-30 flex items-center justify-center
            top-3 right-3
            h-9 w-9
            sm:top-4 sm:right-4 sm:h-10 sm:w-10
            md:top-6 md:right-6
            rounded-full
            border border-white/35 bg-black/28
            text-white backdrop-blur-[6px]
            shadow-[0_2px_12px_rgba(0,0,0,0.3)]
            transition-all duration-300
            hover:border-[#C49A4A]/55 hover:bg-black/42
            active:scale-95
          "
        >
          {muted
            ? <VolumeX  className="h-[13px] w-[13px] sm:h-[14px] sm:w-[14px]" />
            : <Volume2  className="h-[13px] w-[13px] text-[#C49A4A] sm:h-[14px] sm:w-[14px]" />
          }
        </motion.button>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CONTENT — in-flow below the video card on mobile (unchanged).
          On desktop it's a normal 40%-wide flex column on the LEFT
          (md:order-1) with the plain cream section background — no
          longer an absolute overlay on top of the video, so the
          white/text-shadow treatment that existed for video contrast
          is dropped in favor of the same dark text used on mobile.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="
          relative z-20
          px-6 pt-7 pb-0
          sm:px-10 sm:pt-9
          md:order-1 md:flex md:w-[40%] md:shrink
          md:flex-col md:justify-center
          md:px-12 md:py-16
          lg:px-16 xl:px-20
        "
      >
        <div className="w-full max-w-[560px]">

          {/* Eyebrow */}
          <motion.div
            initial={fromBelow}
            animate={toVisible}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-5 flex items-center gap-3 sm:mb-6"
          >
            <span aria-hidden="true" className="block h-px w-6 shrink-0 bg-[#C49A4A]" />
          </motion.div>

          {/* Headline */}
          <h1
            className="mb-5 leading-[1.06] tracking-[-0.025em] sm:mb-6 sm:leading-[1.03] sm:tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {LINES.map(({ text, italic }, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className={`
                    block pb-[3px] sm:pb-1
                    text-[clamp(2.05rem,6.4vw,3.8rem)]
                    ${italic
                      ? "italic font-[350] text-[#A97317]"
                      : "font-[500] text-[#071F2D]"
                    }
                  `}
                  initial={rm ? false : { y: "112%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 1.05, delay: 0.2 + i * 0.105, ease: EASE }}
                >
                  {text}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Description */}
          <motion.p
            initial={fromBelow}
            animate={toVisible}
            transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
            className="
              mb-7 max-w-[430px]
              text-[15px] leading-[1.78] text-[#3F4248]
              sm:mb-8 sm:text-[16px]
            "
          >
            VISWAAS integrates strategy, corporate finance, governance and
            transformation into one advisory experience, helping boards and
            promoters make confident decisions with long-term impact.
          </motion.p>

          {/* CTA — same white/95-to-amber-orange pill treatment as the
              "Discover More" CTA used elsewhere on the site */}
          <motion.div
            initial={fromBelow}
            animate={toVisible}
            transition={{ duration: 0.9, delay: 0.98, ease: EASE }}
          >
            <a
              href="#contact"
              className="
                group inline-flex w-full items-center justify-center gap-[10px]
                rounded-full bg-white/95
                px-7 py-3.5
                text-[12px] font-semibold uppercase tracking-[0.1em] text-[#23272B]
                transition-all duration-300 ease-out
                hover:scale-105 hover:bg-[#D9822B] hover:text-white
                sm:w-auto sm:justify-start sm:px-9 sm:py-[13px] sm:text-[13px]
              "
            >
              Book an Appointment
              <ArrowRight
                aria-hidden="true"
                className="h-[13px] w-[13px] transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </motion.div>

          {/* Trust line */}
          <motion.div
            initial={fromBelow}
            animate={toVisible}
            transition={{ duration: 0.8, delay: 1.12, ease: EASE }}
            className="mt-8 flex items-center gap-3 sm:mt-10"
          >
            <span aria-hidden="true" className="block h-px w-8 shrink-0 bg-[#C49A4A]/40" />
            <span className="
              text-[10px] font-medium uppercase tracking-[0.22em]
              text-[#071F2D]/42
              sm:text-[11px]
            ">
              Trusted advisors to boards &amp; promoters
            </span>
          </motion.div>

        </div>
      </div>

      {/* Mobile: generous fade from cream into white */}
      <div
        aria-hidden="true"
        className="mt-8 h-24 w-full bg-gradient-to-b from-[#FBF1DC] to-white sm:mt-10 sm:h-28 md:hidden"
      />

    </section>
  );
}