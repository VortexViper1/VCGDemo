"use client";

import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { Briefcase, ArrowLeft, Globe } from "lucide-react";

import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import GlassCard from "@/components/shared/GlassCard";
import Reveal from "@/components/shared/Reveal";

// Local headshots — imported directly so Next.js knows their real
// width/height (no layout shift, no stretching inside the circle).
import HarinathImg from "./Harinath.png";
import SatishImg from "./Satish.png";
import PhaniImg from "./Phani.png";
import ChaitanyaImg from "./Chaitanya.png"; // matched to CA Chaitanya Kishore — swap if you meant Chaitanya Kiran Immaneni
import VasaviImg from "./Vasavi.png";
import KrishnaImg from "./Krishna.png"; // matched to Nagalla Krishna Sudhir
import ChakradharImg from "./Chakradhar.png";
import KalyaniImg from "./Kalyani.png";

// Shown once in the header rather than repeated on every card, since
// everyone here is from the same organization.
const COMPANY_NAME = "VISWAS Consulting Group";

type Alum = {
  name: string;
  role: string;
  image?: StaticImageData;
  linkedin: string;
};

const LEADERSHIP: Alum[] = [
  {
    name: "Harinath Chitturi",
    role: "Managing Director",
    image: HarinathImg,
    linkedin: "https://www.linkedin.com/in/harinath-chitturi/",
  },
  {
    name: "Venkata Satish Maddula",
    role: "Leadership",
    image: SatishImg,
    linkedin: "https://www.linkedin.com/in/venkata-satish-maddula-574333198/",
  },
  {
    name: "Phani Kumar Madireddy",
    role: "Leadership",
    image: PhaniImg,
    linkedin: "https://www.linkedin.com/in/phani-kumar-madireddy-96803752/",
  },
  {
    name: "CA Chaitanya Kishore",
    role: "Leadership",
    image: ChaitanyaImg,
    linkedin: "https://www.linkedin.com/in/ca-chaitanya-kishore-076983a3/",
  },
  {
    name: "Vasavi Chouta",
    role: "Leadership",
    image: VasaviImg,
    linkedin: "https://www.linkedin.com/in/vasavi-chouta-296622277/",
  },
  {
    name: "Chaitanya Kiran Immaneni",
    role: "Leadership",
    linkedin: "https://www.linkedin.com/in/chaitanya-kiran-immaneni-496244124/",
  },
  {
    name: "Nagalla Krishna Sudhir",
    role: "Leadership",
    image: KrishnaImg,
    linkedin: "https://www.linkedin.com/in/nagalla-krishna-sudhir-046aa664/",
  },
  {
    name: "Swaroop Gudipati",
    role: "Leadership",
    linkedin: "https://www.linkedin.com/in/ca-swaroop-g-8511a0313/",
  },
];

const ADVISORS: Alum[] = [
  {
    name: "Chakradhar Chouta",
    role: "Advisory Consultant",
    image: ChakradharImg,
    linkedin: "https://www.linkedin.com/in/chakradhar-chouta-407a26123/",
  },
  {
    name: "Kalyani Perla",
    role: "Advisory Consultant",
    image: KalyaniImg,
    linkedin: "https://www.linkedin.com/in/kalyani-perla-82770493/",
  },
  {
    name: "Udaya Aditya Sanagapalli",
    role: "Advisory Consultant",
    linkedin: "https://www.linkedin.com/in/udayaadityasanagapalli/",
  },
  {
    name: "Chris Priyesh",
    role: "Advisory Consultant",
    linkedin: "https://www.linkedin.com/in/chris-priyesh-768b7023/",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function AlumniCard({ person }: { person: Alum }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="h-full"
    >
      <GlassCard className="group flex h-full flex-col items-center text-center">
        {/* mx-auto keeps this centered regardless of card padding;
            fixed square size (h-28 w-28) keeps the ring perfectly round */}
        <div className="relative mx-auto h-28 w-28 shrink-0">
          {/* soft gold glow — invisible at rest, eases in on hover */}
          <div className="pointer-events-none absolute -inset-0.5 rounded-full bg-[#C9A35F]/25 opacity-0 blur-md transition-opacity duration-500 ease-out group-hover:opacity-60" />

          {person.image ? (
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-[3px] border-white shadow-[0_10px_35px_rgba(0,0,0,0.08)] transition-all duration-500 group-hover:border-[#C9A35F] group-hover:shadow-[0_0_35px_rgba(201,163,95,0.30)]">
  <Image
    src={person.image}
    alt={person.name}
    fill
    sizes="112px"
    className="rounded-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
  />
</div>
          ) : (
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-[#C9A35F]/12 text-xl font-semibold text-[#C9A35F] ring-1 ring-[#C9A35F]/30 transition-transform duration-500 ease-out group-hover:scale-105">
              {getInitials(person.name)}
            </div>
          )}
        </div>

       <h3
  className="mt-6 text-lg font-semibold"
  style={{ color: "#173F38" }}
>
  {person.name}
</h3>

        <p className="mt-2 text-sm text-[#6B807A]">{person.role}</p>

        <Link
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#173F38]/8 bg-white px-3.5 py-1.5 text-xs uppercase tracking-[0.15em] text-[#071F2D]/50 transition-colors duration-300 hover:border-[#C9A35F]/40 hover:text-[#C9A35F]"
        >
          <Briefcase size={12} className="text-[#C9A35F]" />
          LinkedIn
        </Link>
      </GlassCard>
    </motion.div>
  );
}

function AlumniGrid({ people }: { people: Alum[] }) {
  return (
    <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {people.map((person, index) => (
        <Reveal key={person.name} delay={0.05 + (index % 4) * 0.08}>
          <AlumniCard person={person} />
        </Reveal>
      ))}
    </div>
  );
}

export default function AlumniPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE]">
      {/* Ambient background, consistent with the rest of the site */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-[#C9A35F]/12 blur-[170px]"
        />
        <motion.div
          animate={{ x: [0, -70, 0], y: [0, 80, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[#123A53]/40 blur-[180px]"
        />
      </div>

      <Section className="pt-40">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-[#071F2D]/50 transition-colors duration-300 hover:text-[#C9A35F]"
            >
              <ArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Back to Home
            </Link>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#173F38]/8 bg-white px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#6B807A]">
              <Globe size={12} className="text-[#C9A35F]" />
              {COMPANY_NAME}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <SectionTitle
            eyebrow="OUR NETWORK"
            title="Leadership"
            description="A global network of former team members now leading strategy, operations, and growth at organizations around the world."
            align="center"
          />
        </Reveal>

        <AlumniGrid people={LEADERSHIP} />

        <Reveal delay={0.1}>
          <SectionTitle
            eyebrow="OUR NETWORK"
            title="Advisory Board"
            description="Trusted consultants who continue to guide our strategic direction."
            align="center"
          />
        </Reveal>

        <AlumniGrid people={ADVISORS} />
      </Section>
    </main>
  );
}