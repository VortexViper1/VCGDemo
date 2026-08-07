"use client";

import { useEffect } from "react";

import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Industries from "@/components/sections/Industries";
import WhyViswas from "@/components/sections/WhyViswas";
import Leadership from "@/components/sections/Leadership";
import Testimonials from "@/components/sections/Testimonials";
import Insights from "@/components/sections/Insights";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";
import CursorGlow from "@/components/shared/CursorGlow";
import FloatingContact from "@/components/shared/FloatingContact";
import BusinessJourney from "@/components/journey/BusinessJourney";

export default function HomePage() {

  useEffect(() => {
    if (!window.location.hash) return;

    const id = window.location.hash.replace("#", "");

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  return (
    <>
      <CursorGlow />

      <Hero />
      <BusinessJourney />
      <Services />
      <Industries />
      <Leadership />
      <Testimonials />
      <Insights />
      <Contact />
    </>
  );
}