"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Landmark,
  TrendingUp,
  Workflow,
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
    icon: TrendingUp,
    title: "M&A and Transaction Advisory",
    description:
      "Helping organizations identify opportunities, optimize operations, and scale with confidence.",
    href: "/services/growth-consulting",
  },
  {
    image: "/services/digital.jpg",
    icon: Workflow,
    title: "Governance, Compliance & Regulatory Advisory",
    description:
      "Modernizing enterprises using AI, automation, cloud technologies, and digital-first operating models.",
    href: "/services/digital-transformation",
  },
];

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
        <Link href={service.href} className="block h-full">
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
              {/* Background image, quiet at rest */}
              <div className="absolute inset-0 -z-10">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-[0.08] grayscale transition-all duration-700 ease-out group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
                />

                {/* Scrim: light at rest */}
                <div
                  className="absolute inset-0 bg-[#F8F5EF] transition-opacity duration-700 ease-out group-hover:opacity-0"
                  aria-hidden
                />

                {/* Scrim: #C89B3C amber-lit dark base on hover */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[#1A1206] via-[#7A5A1E] to-[#120D04] opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
                  aria-hidden
                />

                {/* Amber glow, light-source feel, sits on top of the base */}
                <div
                  className="absolute inset-0 bg-[radial-gradient(120%_100%_at_20%_0%,rgba(200,155,60,0.4),transparent_60%)] opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
                  aria-hidden
                />
              </div>

              {/* Oversized ghost icon, watermark-style */}
              <Icon
                className="pointer-events-none absolute right-6 top-6 h-16 w-16 text-[#23272B]/[0.06] transition-colors duration-700 ease-out group-hover:text-[#C89B3C]/20"
                strokeWidth={1}
              />

              <div className="relative flex h-full flex-col p-10">
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C89B3C]/30 bg-white/40 transition-colors duration-500 group-hover:border-[#C89B3C]/60 group-hover:bg-[#C89B3C]/10">
                    <Icon
                      size={24}
                      strokeWidth={1.5}
                      className="text-[#2A2D31] transition-colors duration-500 group-hover:text-[#C89B3C]"
                    />
                  </div>

                  <motion.div whileHover={{ x: 5, y: -5 }}>
                    <ArrowUpRight
                      className="text-[#23272B]/40 transition-colors duration-500 group-hover:text-[#C89B3C]"
                      size={24}
                    />
                  </motion.div>
                </div>

                <h3
                  className="mb-5 text-3xl font-semibold transition-colors duration-500"
                  style={{ color: "#2A2D31" }}
                >
                  <span className="transition-colors duration-500 group-hover:text-[#F8F5EF]">
                    {service.title}
                  </span>
                </h3>

                <p
                  className="font-[var(--font-sans)] text-[18px] leading-[1.9] tracking-[0.01em] transition-colors duration-500 group-hover:text-[#C89B3C]"
                  style={{ color: "#6C7278" }}
                >
                  {service.description}
                </p>

                <div className="relative mt-10 h-px bg-[#E6DDD0] group-hover:bg-[#F8F5EF]/15">
                  <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: "40%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C89B3C] to-transparent transition-all duration-700 ease-out group-hover:w-full"
                  />
                </div>

                <div className="mt-8 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-[#C89B3C]">
                  Learn More
                  <motion.div whileHover={{ x: 4 }}>
                    <ArrowUpRight size={16} />
                  </motion.div>
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
    <Section id="services" className="relative overflow-hidden bg-[#F8F5EF]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-[#C89B3C]/12 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#C89B3C]/15 blur-[140px]"
        />
      </div>

      <Reveal>
        <SectionTitle
          eyebrow="OUR SERVICES"
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