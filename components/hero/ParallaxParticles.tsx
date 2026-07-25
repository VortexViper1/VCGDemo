"use client";

import { useEffect, useRef } from "react";

export default function ParallaxParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const mouse = { x: width / 2, y: height / 2 };

    const PARTICLE_COUNT = 60;
    const particles = Array.from({ length: PARTICLE_COUNT }).map(() => ({
      baseX: Math.random() * width,
      baseY: Math.random() * height,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      depth: Math.random() * 0.6 + 0.2,
    }));

    let raf: number;

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.baseX += p.vx;
        p.baseY += p.vy;

        if (p.baseX < 0) p.baseX = width;
        if (p.baseX > width) p.baseX = 0;
        if (p.baseY < 0) p.baseY = height;
        if (p.baseY > height) p.baseY = 0;

        const dx = (mouse.x - width / 2) * p.depth * 0.04;
        const dy = (mouse.y - height / 2) * p.depth * 0.04;

        ctx.beginPath();
        ctx.arc(p.baseX + dx, p.baseY + dy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,163,95,${0.25 + p.depth * 0.3})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
    />
  );
}