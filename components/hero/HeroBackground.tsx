"use client";

import { useEffect, useRef, useState, RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2 } from "lucide-react";

interface Props {
  sectionRef: RefObject<HTMLElement | null>;
}

export default function HeroVideoBackground({ sectionRef }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const hasUnmutedRef = useRef(false);

  // Initial autoplay attempt (sound first, then muted fallback)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const attemptSoundAutoplay = async () => {
      try {
        await video.play();
        hasUnmutedRef.current = true;
        setNeedsInteraction(false);
      } catch {
        try {
          video.muted = true;
          await video.play();
        } catch {
          /* mobile may block even muted autoplay until scroll */
        }
        setNeedsInteraction(true);
      }
    };

    attemptSoundAutoplay();
  }, []);

  // Pause when hero scrolls out of view, resume when it scrolls back in.
  // This is the part that actually needs to observe the SECTION, not the
  // video element itself — video is 100% of the section so observing the
  // section is more reliable across mobile browsers where video dimensions
  // can be reported late.
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px",
      }
    );

    observer.observe(section);

    // Also pause on tab switch / app backgrounding — saves mobile battery
    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else if (isElementInViewport(section)) {
        video.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [sectionRef]);

const handleEnter = () => {
  const video = videoRef.current;
  if (!video) return;

  video.pause();

  video.muted = false;
  video.defaultMuted = false;
  video.volume = 1;

  video
    .play()
    .then(() => {
      hasUnmutedRef.current = true;
      setNeedsInteraction(false);
    })
    .catch((err) => {
      console.error(err);
    });
};
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <div className="absolute inset-0 bg-[#0B1210]" />
      {!isReady && (
  <img
    src="/hero-poster.jpg"
    alt=""
    className="absolute inset-0 h-full w-full object-cover"
  />
)}

      <video
  ref={videoRef}
  className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
    isReady ? "opacity-100" : "opacity-0"
  }`}
  src="/hero-video.mp4"
  poster="/hero-poster.jpg"
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  onCanPlay={() => setIsReady(true)}
/>

      {/* Gradient overlays — natural color kept, contrast only where the
          text sits. Tuned separately for the narrower mobile text column
          vs the wider desktop one. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10 sm:from-black/70 sm:via-black/30 sm:to-black/5" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />

      <AnimatePresence>
        {needsInteraction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-black/30 px-6 backdrop-blur-[2px]"
          >
            <motion.button
              onClick={handleEnter}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-white/30 bg-white/10 px-7 py-3.5 uppercase tracking-[0.2em] text-white backdrop-blur-md transition-colors duration-500 hover:border-[#C49A4A]/70 hover:bg-white/15 sm:px-9 sm:py-4"
            >
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-[#C49A4A]/0 via-[#C49A4A]/25 to-[#C49A4A]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <Volume2 className="h-4 w-4 shrink-0 text-[#C49A4A]" />
              <span className="text-xs font-medium sm:text-sm">
                Enter Experience
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function isElementInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}