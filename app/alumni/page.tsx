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
    role: "Senior Consultant",
    image: HarinathImg,
    linkedin: "https://www.linkedin.com/in/harinath-chitturi/",
  },
  {
    name: "Venkata Satish Maddula",
    role: "Senior Consultant",
    image: SatishImg,
    linkedin: "https://www.linkedin.com/in/venkata-satish-maddula-574333198/",
  },
  {
    name: "Phani Kumar Madireddy",
    role: "Senior Consultant",
    image: PhaniImg,
    linkedin: "https://www.linkedin.com/in/phani-kumar-madireddy-96803752/",
  },
  {
    name: "CA Chaitanya Kishore",
    role: "Senior Consultant",
    linkedin: "https://www.linkedin.com/in/ca-chaitanya-kishore-076983a3/",
  },
  {
    name: "Vasavi Chouta",
    role: "CEO",
    image: VasaviImg,
    linkedin: "https://www.linkedin.com/in/vasavi-chouta-296622277/",
  },
  {
    name: "Chaitanya Kiran Immaneni",
    role: "Senior Consultant",
    image: ChaitanyaImg,
    linkedin: "https://www.linkedin.com/in/chaitanya-kiran-immaneni-496244124/",
  },
  {
    name: "Nagalla Krishna Sudhir",
    role: "Senior Consultant",
    image: KrishnaImg,
    linkedin: "https://www.linkedin.com/in/nagalla-krishna-sudhir-046aa664/",
  },
  {
    name: "Swaroop Gudipati",
    role: "Senior Consultant",
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
      whileHover={{
    y: -10,
    scale: 1.02
}}
      transition={{ type: "spring" as const, stiffness: 260, damping: 20 }}
      className="h-full"
    >
      <GlassCard
className="
group
relative
flex
h-full
flex-col
items-center
overflow-hidden
rounded-[30px]
border
border-white/20
bg-white/70
px-8
py-10
text-center
backdrop-blur-2xl
transition-all
duration-700
hover:-translate-y-2
hover:border-[#C49A4A]/30
hover:shadow-[0_30px_80px_rgba(7,31,45,.12)]
"
>
  <div
className="
absolute
top-0
left-1/2
h-[2px]
w-0
-translate-x-1/2
bg-[#C49A4A]
transition-all
duration-700
group-hover:w-24
"
/>
        {/* mx-auto keeps this centered regardless of card padding;
            fixed square size (h-28 w-28) keeps the ring perfectly round */}
        <div className="relative mx-auto h-32 w-32 shrink-0">
          {/* soft gold glow — invisible at rest, eases in on hover */}
          <div className="pointer-events-none absolute -inset-0.5 rounded-full bg-[#C49A4A]/25 opacity-0 blur-md transition-opacity duration-700
ease-out ease-out group-hover:opacity-60" />

          {person.image ? (
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-[3px] border-white shadow-[0_10px_35px_rgba(0,0,0,0.08)] transition-all duration-700
ease-out group-hover:border-[#C49A4A] group-hover:shadow-[0_0_35px_rgba(201,163,95,0.30)]">
  <Image
    src={person.image}
    alt={person.name}
    fill
    sizes="112px"
    className="rounded-full object-cover object-center transition-transform duration-700
ease-out ease-out group-hover:scale-108
group-hover:rotate-[0.5deg]"
  />
</div>
          ) : (
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-[#C49A4A]/12 text-xl font-semibold text-[#C49A4A] ring-1 ring-[#C49A4A]/30 transition-transform duration-700
ease-out ease-out group-hover:scale-105">
              {getInitials(person.name)}
            </div>
          )}
        </div>

       <h3
className="
mt-7
text-[22px]
font-semibold
tracking-[-0.03em]
leading-tight
text-[#2A2D31]
"
>
  {person.name}
</h3>

  <p
className="
mt-2
text-[13px]
uppercase
tracking-[0.18em]
text-[#B7964A]
"
>{person.role}</p>

       <div className="mt-5 flex items-center justify-center">
  <Link
    href={person.linkedin}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`View ${person.name}'s LinkedIn`}
    className="
      rounded-full
      border
      border-[#2A2D31]/10
      p-3
      text-[#2A2D31]/60
      transition-all
      duration-500
      hover:border-[#C49A4A]
      hover:bg-[#C49A4A]/10
      hover:text-[#C49A4A]
      hover:scale-110
    "
  >
    <Briefcase size={16} />
  </Link>
</div>
      </GlassCard>
    </motion.div>
  );
}

function AlumniGrid({ people }: { people: Alum[] }) {
  return (
    <div className="mt-16 grid gap-8 md:p-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
    <main className="min-h-screen bg-[#F8F5EF]">
      {/* Ambient background, consistent with the rest of the site */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-[#C49A4A]/12 blur-[170px]"
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
              href="/#leadership"
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-[#23272B]/50 transition-colors duration-300 hover:text-[#C49A4A]"
            >
              <ArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Back to Leadership
            </Link>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#2A2D31]/8 bg-white px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#6B807A]">
              <Globe size={12} className="text-[#C49A4A]" />
              {COMPANY_NAME}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <SectionTitle
            eyebrow="OUR NETWORK"
            title="Leadership"

description="Experienced professionals delivering strategic advisory, governance, capital solutions and transformation across industries."
            align="center"
          />
        </Reveal>

        <AlumniGrid people={LEADERSHIP} />

        <Reveal delay={0.1}>
          <SectionTitle
            eyebrow="OUR NETWORK"
           title="Advisory Board"

description="Senior advisors providing independent insight, strategic perspective and industry expertise to strengthen client outcomes."
            align="center"
          />
        </Reveal>

        <AlumniGrid people={ADVISORS} />
      </Section>
    </main>
  );
}