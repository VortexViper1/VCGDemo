"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import ParallaxParticles from "./ParallaxParticles";

export default function HeroBackground() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo((e.clientX / window.innerWidth - 0.5) * 80);
      yTo((e.clientY / window.innerHeight - 0.5) * 80);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Gold Blob */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 left-16 h-80 w-80 rounded-full bg-[#B7964A]/20 blur-[120px]"
      />

      {/* Blue Blob */}
      <motion.div
        animate={{ x: [0, -70, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 h-[32rem] w-[32rem] rounded-full bg-[#23363F]/20 blur-[150px]"
      />

      {/* Center Glow — reacts to mouse via GSAP */}
      <div
        ref={glowRef}
        className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ opacity: [0.35, 0.8, 0.35] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="h-full w-full rounded-full bg-white/20 blur-[150px]"
        />
      </div>

      {/* Parallax Particles */}
      <ParallaxParticles />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(35,54,63,.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(35,54,63,.15) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* Bottom Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#071F2D]" />
    </div>
  );
}