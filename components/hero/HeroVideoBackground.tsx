"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useVideoAutoPause } from "@/hooks/useVideoAutoPause";

interface Props {
  sectionRef: React.RefObject<HTMLElement | null>;
}

export default function HeroVideoBackground({ sectionRef }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useVideoAutoPause(videoRef, sectionRef, !!prefersReducedMotion);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 2) {
      setIsReady(true);
      return;
    }

    const onReady = () => setIsReady(true);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);

    const fallback = setTimeout(() => setIsReady(true), 1800);

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      clearTimeout(fallback);
    };
  }, []);

  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (isMuted) {
        video.muted = false;
        video.defaultMuted = false;
        video.volume = 1;
        if (video.paused) await video.play();
        setIsMuted(false);
      } else {
        video.muted = true;
        setIsMuted(true);
      }
    } catch (err) {
      console.error("toggleSound failed:", err);
    }
  };

  const markReady = () => setIsReady(true);

  const handleError = () => {
    const video = videoRef.current;
    console.error(
      "Hero video failed to load. Check that /hero-video1.mp4 exists in your public/ folder.",
      video?.error
    );
    setHasError(true);
  };

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-[#2A1D0F]">
      {/*
        Mobile: box is sized to the video's REAL content aspect ratio
        (excluding baked-in black bars), then object-contain shows the
        whole frame with no cropping. Since the box shape now matches
        the content shape exactly, there's no leftover space for black
        bars to appear in — no zoom/crop trick needed.

        ⚠️ REPLACE THE RATIO: run the ffmpeg cropdetect command from
        the terminal against your actual hero-video1.mp4, then swap
        aspect-[4/5] below for the real width:height it reports
        (e.g. crop=1080:1350:0:135 → aspect-[1080/1350], i.e. 4/5).

        md:aspect-auto md:object-cover cancels all of this on desktop
        — that layout is untouched.
      */}
      <div className="absolute inset-0 mx-auto flex h-full w-full items-center justify-center md:block">
        <motion.div
          className="relative aspect-[4/5] h-auto w-full max-h-full md:absolute md:inset-0 md:aspect-auto md:h-full md:max-h-none"
          animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.06, 1] }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 22, repeat: Infinity, ease: "easeInOut" }
          }
          style={{ willChange: "transform" }}
        >
          <video
            ref={videoRef}
            poster="/hero-poster.jpg"
            muted={isMuted}
            className="h-full w-full object-contain object-center md:absolute md:inset-0 md:object-cover"
            autoPlay={!prefersReducedMotion}
            loop
            playsInline
            preload="metadata"
            onCanPlay={markReady}
            onLoadedData={markReady}
            onError={handleError}
          >
            <source src="/hero-video1.mp4" type="video/mp4" />
            <track kind="captions" src="/hero-captions.vtt" srcLang="en" label="English" />
          </video>
        </motion.div>
      </div>

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#2A1D0F] text-white/50 text-sm">
          Video failed to load — check console
        </div>
      )}

      <motion.button
        type="button"
        onClick={toggleSound}
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={
          prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.4 }
        }
        aria-label={isMuted ? "Unmute background video" : "Mute background video"}
        aria-pressed={!isMuted}
        className="
  absolute z-30
  top-4 right-4 h-10 w-10
  sm:top-5 sm:right-5 sm:h-11 sm:w-11

  md:top-auto
  md:bottom-24
  md:right-8

  flex items-center justify-center
  rounded-full border border-white/40 bg-black/30
  text-white shadow-[0_2px_12px_rgba(0,0,0,0.35)] backdrop-blur-md
  transition-colors duration-300
  hover:border-[#C49A4A]/60 hover:bg-black/45
"
      >
        {isMuted ? (
          <VolumeX className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        ) : (
          <Volume2 className="h-3.5 w-3.5 text-[#D9822B] sm:h-4 sm:w-4" />
        )}
      </motion.button>
    </div>
  );
}