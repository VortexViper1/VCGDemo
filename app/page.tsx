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
import Navbar from "@/components/layout/Navbar";
import CursorGlow from "@/components/shared/CursorGlow";
import FloatingContact from "@/components/shared/FloatingContact";
export default function HomePage() {
  return (
    <>
    <Navbar/>
      <CursorGlow />
      <FloatingContact />
      <Hero />

      <About />

      <Services />

      <Industries />

      <Leadership />

      <Testimonials />

      <Insights />

      <CTA />

      <Contact />
    </>
  );
}
