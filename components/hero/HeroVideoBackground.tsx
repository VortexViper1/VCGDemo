"use client";

import { useRef, useState } from "react";
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
      "Hero video failed to load. Check that /hero-video.mp4 exists in your public/ folder.",
      video?.error
    );
    setHasError(true);
  };

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-[#0B1210]">
      {/* Poster shows natively as soon as it loads — it's an attribute of
          <video>, not gated behind isReady. Only fade IN the extra polish,
          never hide the base video/poster, or a failed onCanPlay leaves
          you with a permanent black screen. */}
      <video
        ref={videoRef}
        poster="/hero-poster.jpg"
        muted={isMuted}
        className="absolute inset-0 h-full w-full object-cover object-center"
        autoPlay={!prefersReducedMotion}
        loop
        playsInline
        preload="metadata"
        onCanPlay={markReady}
        onLoadedData={markReady}
        onError={handleError}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        <track kind="captions" src="/hero-captions.vtt" srcLang="en" label="English" />
      </video>

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0B1210] text-white/50 text-sm">
          Video failed to load — check console
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent sm:from-black/65 sm:via-black/15" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

      {!prefersReducedMotion && (
        <motion.button
          type="button"
          onClick={toggleSound}
          initial={{ opacity: 0 }}
          animate={{ opacity: isReady ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          aria-label={isMuted ? "Unmute background video" : "Mute background video"}
          aria-pressed={!isMuted}
          className="
            absolute top-28 right-6 z-30
            sm:top-32 sm:right-8
            flex h-11 w-11 items-center justify-center
            rounded-full border border-white/25 bg-white/10
            text-white backdrop-blur-md
            transition-colors duration-300
            hover:border-[#C49A4A]/60 hover:bg-white/15
          "
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4 text-[#C49A4A]" />
          )}
        </motion.button>
      )}
    </div>
  );
}