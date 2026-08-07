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
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useVideoAutoPause(videoRef, sectionRef, !!prefersReducedMotion);
  // Ambient background layer gets paused off-screen too — it's a full
  // second video decode, no reason to keep it running when scrolled away.
  useVideoAutoPause(bgVideoRef, sectionRef, !!prefersReducedMotion);

  // Mobile gets a structurally different treatment (framed card + ambient
  // glow) rather than just different CSS on the same markup, so we track
  // the breakpoint in JS and only mount the extra ambient <video> when it's
  // actually going to be shown — no point decoding a second video stream
  // on desktop where it's never rendered.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /*
    Mute-button "sometimes doesn't appear" bug: isReady was ONLY ever set
    by the onCanPlay/onLoadedData props on <video> below. Those are React
    synthetic events — if the browser fires the native event before React
    finishes mounting and attaching its listener (very possible when the
    video is served from cache, or on some mobile browsers combined with
    preload="metadata"), the event is missed and isReady stays false
    forever. There was no fallback, so the button just silently never
    showed up.

    Fix, three layers deep:
      1. On mount, check video.readyState directly — if the browser
         already has enough data (readyState >= 2 / HAVE_CURRENT_DATA),
         we've already missed the event, so set isReady immediately.
      2. Also attach native addEventListener callbacks (belt-and-braces
         alongside the existing onCanPlay/onLoadedData JSX props) in case
         the event fires between mount and the readyState check.
      3. A short timeout fallback guarantees isReady flips to true
         regardless, so the control can never be stuck hidden — the
         poster/video itself is never gated behind isReady (unchanged),
         only this extra button polish is.
  */
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
      "Hero video failed to load. Check that /hero-video.mp4 exists in your public/ folder.",
      video?.error
    );
    setHasError(true);
  };

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-[#0B1210]">
      {/*
        ── Mobile ambient background layer ──
        A second, always-muted, decorative copy of the SAME video — scaled
        up, heavily blurred, and dimmed — filling the entire section. This
        is the actual fix for "letterbox bars look bad": instead of flat
        cream/black bars around the uncropped video, the space around it
        is filled with a soft glowing wash of the video's own colors and
        motion (the same technique Apple Music / Spotify / YouTube's
        ambient mode use for now-playing art). Desktop never mounts this —
        it's real full-bleed cover there, no ambient layer needed.
      */}
      {isMobile && !prefersReducedMotion && (
        <video
          ref={bgVideoRef}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full scale-125 object-cover object-center opacity-70 blur-3xl saturate-150"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      )}

      {/* Reduced-motion mobile fallback: no second autoplaying video, just
          a static brand-colored glow so the frame still has a rich
          backdrop instead of flat black. */}
      {isMobile && prefersReducedMotion && (
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_30%,rgba(196,154,74,0.16),transparent_65%)]" />
      )}

      {/* Warm gold wash tying the ambient glow to the brand accent color,
          plus a contrast wash so the blurred backdrop doesn't compete
          with the sharp framed video or the heading text on top of it. */}
      {isMobile && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_15%,rgba(196,154,74,0.18),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 bg-black/40" />
        </>
      )}

      {/*
        ── Foreground video ──
        Desktop: unchanged — absolute inset-0, object-cover, full-bleed.
        Mobile: object-contain inside a rounded, elevated "card" that's
        inset a few pixels from the edges. Because the card wrapper has NO
        background of its own, the transparent letterbox gaps inside the
        contained video reveal the blurred ambient layer behind it —
        that's what makes it look like a glowing frame instead of dead
        space. Poster still shows natively either way, never gated behind
        isReady.
      */}
      <div
        className={
          isMobile
            ? "absolute inset-3 z-10 overflow-hidden rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.55)] ring-1 ring-white/15"
            : "absolute inset-0 h-full w-full"
        }
      >
        <video
          ref={videoRef}
          poster="/hero-poster.jpg"
          muted={isMuted}
          className={
            isMobile
              ? "h-full w-full object-contain object-center"
              : "absolute inset-0 h-full w-full object-cover object-center"
          }
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
      </div>

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0B1210] text-white/50 text-sm">
          Video failed to load — check console
        </div>
      )}

      {/* Text-legibility gradients — sit above both the ambient layer and
          the framed video on mobile, above the full-bleed video on
          desktop. Unchanged from the original full-bleed design. */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-black/70 via-black/25 to-transparent sm:from-black/65 sm:via-black/15" />
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

      {/*
        Mute button now always renders (previously wrapped in
        `!prefersReducedMotion &&`, which meant anyone with that OS
        setting never got a sound control at all). Reduced motion just
        skips the fade-in transition instead of hiding the control.

        bg-white/10 used to be nearly invisible against a light part of
        the frame — bg-black/30 reads as a solid, visible circle
        regardless of what's behind it.
      */}
      <motion.button
        type="button"
        onClick={toggleSound}
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={
          prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.6 }
        }
        aria-label={isMuted ? "Unmute background video" : "Mute background video"}
        aria-pressed={!isMuted}
        className="
          absolute z-30
          top-24 right-4
          h-10 w-10
          sm:top-28 sm:right-6 sm:h-11 sm:w-11
          md:top-32 md:right-8 md:h-11 md:w-11
          lg:h-12 lg:w-12
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
          <Volume2 className="h-3.5 w-3.5 text-[#C49A4A] sm:h-4 sm:w-4" />
        )}
      </motion.button>
    </div>
  );
}