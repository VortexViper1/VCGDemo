"use client";

import { useEffect } from "react";

import Hero from "@/components/hero/Hero";
import Services from "@/components/sections/Services";
import Industries from "@/components/sections/Industries";
import Leadership from "@/components/sections/Leadership";
import Testimonials from "@/components/sections/Testimonials";
import Insights from "@/components/sections/Insights";
import Contact from "@/components/sections/Contact";
import CursorGlow from "@/components/shared/CursorGlow";
import BusinessJourney from "@/components/journey/BusinessJourney";
import ViswasAssistant from "@/components/Viswasassistant";

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
      <ViswasAssistant />

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