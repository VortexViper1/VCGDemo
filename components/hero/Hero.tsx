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
      aria-label="VISWAS Consulting Group"
      style={{ fontFamily: "var(--font-body)" }}
      className="
        relative w-full overflow-hidden
        bg-[#FBF1DC]
        md:h-[100svh] md:min-h-[600px] md:bg-[#2A1D0F]
      "
    >

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          VIDEO — sits first in DOM so it renders above text on mobile.
          Card on mobile (rounded, amber border, in-flow).
          Full-bleed absolute background on desktop.
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
          md:absolute md:inset-0 md:z-0 md:m-0
          md:rounded-none md:border-0 md:shadow-none
        "
      >
        {/* Aspect-ratio holder — 3/2 on mobile, fills section on desktop */}
        <div className="relative aspect-[3/2] w-full bg-[#2A1D0F] md:absolute md:inset-0 md:aspect-auto md:h-full">

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
              <source src="/hero-video.mp4" type="video/mp4" />
              <track kind="captions" src="/hero-captions.vtt" srcLang="en" label="English" />
            </video>
          </motion.div>

          {videoError && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#2A1D0F]/90">
              <span className="text-[13px] text-white/30">Video unavailable</span>
            </div>
          )}

          {/* Mobile: bottom vignette inside card */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#2A1D0F]/40 to-transparent md:hidden"
          />

          {/* Desktop: directional vignette — heavy left, fades right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden md:block"
            style={{
              background:
                "linear-gradient(105deg, rgba(42,29,15,0.92) 0%, rgba(42,29,15,0.65) 28%, rgba(42,29,15,0.22) 58%, rgba(42,29,15,0.04) 100%)",
            }}
          />
        </div>

        {/* ── Mute button — inside the video container so it's visible on
            both mobile (top-right of card) and desktop (bottom-right of
            section, since the container is absolute inset-0 on md+). ── */}
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
            md:top-[38%] md:right-10
            lg:right-14
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
          CONTENT — in-flow on mobile (below video card), absolute overlay
          on desktop. pointer-events-none on the full wrapper prevents the
          invisible right half eating video clicks; re-enabled on inner box.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="
          relative z-20
          px-6 pt-7 pb-0
          sm:px-10 sm:pt-9
          md:pointer-events-none md:absolute md:inset-0
          md:flex md:flex-col md:justify-center
          md:px-12 md:pt-24 md:pb-0
          lg:px-16 xl:px-20
        "
      >
        <div className="w-full max-w-[560px] md:pointer-events-auto">

          {/* Eyebrow */}
          <motion.div
            initial={fromBelow}
            animate={toVisible}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-5 flex items-center gap-3 sm:mb-6"
          >
            <span aria-hidden="true" className="block h-px w-6 shrink-0 bg-[#C49A4A] md:bg-[#C49A4A]/70" />
            <span className="
              text-[10px] font-semibold uppercase tracking-[0.3em]
              text-[#8B6116]
              sm:text-[11px]
              md:text-[#C49A4A]/90
            ">
              Strategy · Capital · Transformation
            </span>
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
                      ? "italic font-[350] text-[#A97317] md:text-[#C49A4A]"
                      : "font-[500] text-[#071F2D] md:text-white md:[text-shadow:0_2px_32px_rgba(0,0,0,0.55)]"
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
              md:text-white/78 md:[text-shadow:0_1px_18px_rgba(0,0,0,0.5)]
            "
          >
            VISWAS integrates strategy, corporate finance, governance and
            transformation into one advisory experience, helping boards and
            promoters make confident decisions with long-term impact.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={fromBelow}
            animate={toVisible}
            transition={{ duration: 0.9, delay: 0.98, ease: EASE }}
          >
            <a
              href="#contact"
              className="
                group inline-flex w-full items-center justify-center gap-[10px]
                rounded-full bg-[#C49A4A]
                px-7 py-3.5
                text-[12px] font-semibold uppercase tracking-[0.1em] text-[#2A1D0F]
                transition-all duration-500 ease-out
                hover:-translate-y-px hover:bg-[#D4AE5E]
                hover:shadow-[0_12px_40px_-4px_rgba(196,154,74,0.5)]
                active:translate-y-0 active:shadow-none
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
              md:text-white/50
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

      {/* Desktop: fade sits between video (z-0) and content (z-20) so it never covers buttons */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden h-32 bg-gradient-to-b from-transparent to-white md:block"
      />

    </section>
  );
}
