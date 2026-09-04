"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  BriefcaseBusiness,
  Landmark,
  Handshake,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import Reveal from "@/components/shared/Reveal";
import GlassCard from "@/components/shared/GlassCard";

const SERVICES: {
  image: string;
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}[] = [
  {
    image: "/services/strategy.jpg",
    icon: BriefcaseBusiness,
    title: "Corporate & Financial Strategy",
    description:
      "Transforming vision into executable strategies that accelerate sustainable growth and market leadership.",
    href: "/services/business-strategy",
  },
  {
    image: "/services/capital.jpg",
    icon: Landmark,
    title: "Capital Advisory",
    description:
      "Strategic fundraising, investment planning, mergers, acquisitions, and financial restructuring.",
    href: "/services/capital-advisory",
  },
{
  image: "/services/growth.jpg",
  icon: Handshake,
  title: "M&A and Transaction Advisory",
  description:
    "Supporting acquisitions, divestitures and strategic transactions through disciplined evaluation, execution and value creation.",
  href: "/services/growth-consulting",
},
{
  image: "/services/digital.jpg",
  icon: ShieldCheck,
  title: "Governance, Compliance & Regulatory Advisory",
  description:
    "Strengthening governance, regulatory compliance and risk frameworks to build resilient, accountable and well-governed enterprises.",
  href: "/services/digital-transformation",
},
];

/*
  ── Hover overlay system ──────────────────────────────────────────
  Palette: Ivory #FFFFFF · Primary Dark #071F2D · Accent Gold #C49A4A

  Every layer below is fully rendered at all times and toggled purely
  via `opacity` (plus one `transform` on the sweep) — never by
  animating background-position, filter, or box-shadow directly — so
  every transition is GPU-compositable.

  Stack, bottom → top:
    1. Photograph (existing, untouched)
    2. Ivory rest-scrim            — hides the photo at rest, fades out
    3. Dark boardroom base          — a moody navy gradient, not gold
    4. Top-left key light           — soft warm radial, "sunlight in"
    5. Low bounce light             — smaller, dimmer, second source
    6. Directional vignette         — two radials, weight toward the
                                       corner opposite the key light
    7. Grain                        — tiny repeating radial dots,
                                       mix-blend-overlay, barely-there
    8. Sweep                        — a real ::before pseudo-element,
                                       skewed soft beam, slides across
    9. Gold border glow             — static box-shadow, opacity-toggled
  All transitions share one duration/easing family (850–1000ms,
  cubic-bezier(0.22,1,0.36,1)) — the same "luxury" ease already used
  for hover states in Navbar.tsx, so the motion language matches the
  rest of the site.
*/

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = service.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${py * -6}deg`);
    el.style.setProperty("--ry", `${px * 6}deg`);
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <Reveal delay={index * 0.12}>
      <div style={{ perspective: 1200 }}>
        <Link
          href={service.href}
          className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]"
        >
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ y: -8 }}
            transition={{ type: "spring" as const, stiffness: 200, damping: 20 }}
            style={{
              transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
              transformStyle: "preserve-3d",
            }}
            className="h-full cursor-pointer transition-transform duration-300 ease-out"
          >
            <GlassCard className="group relative h-full overflow-hidden">
              {/* ── Layer stack — see comment block above component ── */}
              <div className="absolute inset-0 -z-10">
                {/* 1. Photograph */}
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-[0.08] grayscale transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
                />

                {/* 2. Ivory rest-scrim — the clean default state */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[#FFFFFF] transition-opacity duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-0"
                />

                {/* 3. Dark boardroom base — navy, not gold; this is the
                       canvas the light layers below fall onto */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(135deg,#0B2635_0%,#071F2D_55%,#05161F_100%)] opacity-0 transition-opacity duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
                />

                {/* 4. Top-left key light — golden-hour sun entering the
                       room; deliberately soft and large, never a hard
                       edge */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(65%_55%_at_8%_0%,rgba(196,154,74,0.38),transparent_60%)] opacity-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
                />

                {/* 5. Low bounce light — a second, dimmer, lower source,
                       as if reflected off a wood table — this is what
                       gives the lighting real depth instead of one flat
                       radial */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(45%_40%_at_20%_65%,rgba(196,154,74,0.16),transparent_65%)] opacity-0 transition-opacity delay-[80ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
                />

                {/* 6. Directional vignette — weighted toward the corner
                       opposite the key light, reinforcing "light falls
                       from the top-left" rather than just darkening
                       evenly */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(120%_100%_at_100%_100%,rgba(5,15,20,0.55),transparent_55%),radial-gradient(140%_140%_at_50%_50%,transparent_55%,rgba(5,15,20,0.45)_100%)] opacity-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
                />

                {/* 7. Grain — a lightweight CSS approximation of film
                       grain (true noise needs an SVG turbulence filter;
                       this tiny repeating dot pattern gets close enough
                       at near-invisible opacity, no extra asset needed) */}
                <div
                  aria-hidden
                  className="absolute inset-0 [background-size:3px_3px] bg-[radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] opacity-0 mix-blend-overlay transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-[0.05]"
                />

                {/* 8. Sweep — a genuine ::before pseudo-element: a
                       skewed, blurred beam that slides across the card
                       once on hover. transform + opacity only. */}
                <div
                  aria-hidden
                  className="absolute inset-0 overflow-hidden before:absolute before:-left-1/3 before:inset-y-[-20%] before:w-1/3 before:-skew-x-[20deg] before:translate-x-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:opacity-0 before:blur-md before:transition-[transform,opacity] before:duration-[950ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:content-[''] group-hover:before:translate-x-[420%] group-hover:before:opacity-100"
                />

                {/* 9. Gold border glow — pre-rendered box-shadow, only
                       its opacity is animated */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-[inherit] opacity-0 shadow-[inset_0_0_0_1px_rgba(196,154,74,0.55),0_0_50px_-12px_rgba(196,154,74,0.6)] transition-opacity duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
                />
              </div>

              {/* Oversized ghost icon, watermark-style */}
              <Icon
                className="pointer-events-none absolute right-6 top-6 h-16 w-16 text-[#23272B]/[0.06] transition-colors duration-700 ease-out group-hover:text-[#D9822B]/20"
                strokeWidth={1}
              />

             <div className="relative flex h-full min-h-[420px] flex-col p-10">
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C49A4A]/30 bg-white/40 transition-colors duration-500 group-hover:border-[#C49A4A]/60 group-hover:bg-[#D9822B]/10">
                    <Icon
                      size={24}
                      strokeWidth={1.5}
                      className="text-[#2A2D31] transition-colors duration-500 group-hover:text-[#D9822B]"
                    />
                  </div>

                  <motion.div whileHover={{ x: 5, y: -5 }}>
                    <ArrowUpRight
                      className="text-[#23272B]/40 transition-colors duration-500 group-hover:text-[#D9822B]"
                      size={24}
                    />
                  </motion.div>
                </div>

               <h3
  className="mb-5 line-clamp-3 min-h-[5.5rem] text-2xl font-semibold leading-snug transition-colors duration-500 sm:line-clamp-2 sm:min-h-[4.5rem] sm:text-3xl sm:leading-normal"
  style={{ color: "#2A2D31" }}
>
  <span className="transition-colors duration-500 group-hover:text-[#FFFFFF]">
    {service.title}
  </span>
</h3>

                <p
                  className="line-clamp-3 font-[var(--font-sans)] text-[18px] leading-[1.9] tracking-[0.01em] transition-colors duration-500 group-hover:text-[#D9822B]"
                  style={{ color: "#6C7278" }}
                >
                  {service.description}
                </p>

                <div className="relative mt-10 h-px bg-[#E6DDD0] group-hover:bg-[#FFFFFF]/15">
                  <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: "40%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C49A4A] to-transparent transition-all duration-700 ease-out group-hover:w-full"
                  />
                </div>

                {/* Learn More — same white/95 pill treatment as
                    StageImage's "Discover More" CTA, amber-orange fill
                    on hover, icon nudges toward the arrow's direction */}
                <div className="mt-auto pt-8">
                  <span className="pointer-events-auto relative z-30 inline-flex w-fit items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-[13px] font-medium text-[#23272B] transition-all duration-300 hover:scale-105 hover:bg-[#D9822B] hover:text-white sm:text-sm">
                    Learn More
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </Link>
      </div>
    </Reveal>
  );
}

export default function Services() {
  return (
    <Section id="services" className="relative overflow-hidden bg-[#FFFFFF]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-[#D9822B]/12 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#D9822B]/15 blur-[140px]"
        />
      </div>

      <Reveal>
        <SectionTitle
          eyebrow="OUR CAPABILITIES"
          title="Consulting solutions designed for enduring business excellence."
          description="We combine strategic thinking, financial expertise, and digital innovation to create measurable outcomes across every engagement."
          align="center"
        />
      </Reveal>

      <div className="mt-20 grid gap-6 md:p-8 md:grid-cols-2">
        {SERVICES.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </div>
    </Section>
  );
}