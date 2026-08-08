"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Globe,
} from "lucide-react";

import { NAVIGATION } from "@/lib/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import SectionLink from "@/components/shared/SectionLink";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#2A2D31]/8 bg-[#FFFFFF]">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#C49A4A]/12 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24 rounded-[32px] border border-[#2A2D31]/8 bg-[#FFFFFF]/[0.04] p-10 backdrop-blur-3xl md:p-16"
        >
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#C49A4A]">
                Let's Build Together
              </p>

              <h2
                className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl"
                style={{ color: "#2A2D31" }}
              >
                Turning ambition into
                <br />
                enduring value.
              </h2>
            </div>

            {/* Start a Conversation — same white/95-to-amber-orange
                pill treatment as the "Discover More" CTA elsewhere on
                the site, kept at the larger footer scale */}
            <SectionLink href="/#contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-3 rounded-full bg-white/95 px-8 py-5 font-semibold text-[#23272B] transition-all duration-300 hover:bg-[#D9822B] hover:text-white"
              >
                Start a Conversation
                <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.button>
            </SectionLink>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-semibold" style={{ color: "#2A2D31" }}>
              VISWAS
            </h2>

            <p className="mt-3 text-xs uppercase tracking-[0.35em] text-[#C49A4A]">
              Strategy • Capital • Transformation
            </p>

            <p className="mt-8 max-w-md leading-8 text-[#23272B]/70">
              We partner with organizations, investors, and visionary
              leaders to shape sustainable growth through strategic
              consulting, capital advisory, and digital transformation.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h4 className="mb-8 text-sm font-semibold uppercase tracking-[0.3em] text-[#C49A4A]">
              Navigation
            </h4>

            <div className="space-y-5">
              {NAVIGATION.map((item) => (
                <SectionLink
                  key={item.label}
                  href={item.href}
                  className="block transition hover:text-[#C49A4A]"
                  style={{ color: "#2A2D31" }}
                >
                  {item.label}
                </SectionLink>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="mb-8 text-sm font-semibold uppercase tracking-[0.3em] text-[#C49A4A]">
              Contact
            </h4>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail size={18} className="mt-1 text-[#C49A4A]" />
                <span className="text-[#23272B]/70">{SITE_CONFIG.email}</span>
              </div>

              <div className="flex items-start gap-4">
                <Phone size={18} className="mt-1 text-[#C49A4A]" />
                <span className="text-[#23272B]/70">{SITE_CONFIG.phone}</span>
              </div>

              <div className="flex items-start gap-4">
                <MapPin size={18} className="mt-1 text-[#C49A4A]" />
                <span className="text-[#23272B]/70">{SITE_CONFIG.location}</span>
              </div>

              
             <a
  href="https://linkedin.com"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-3 transition hover:text-[#C49A4A]"
  style={{ color: "#2A2D31" }}
>
  <Globe size={20} className="text-[#C49A4A]" />
  LinkedIn
</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 flex flex-col gap-6 border-t border-[#2A2D31]/8 pt-8 text-sm text-[#23272B]/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} VISWAS Consulting Group.
            All Rights Reserved.
          </p>

          <div className="flex gap-6 md:p-8">
            <Link
              href="/privacy-policy"
              className="transition hover:text-[#C49A4A]"
              style={{ color: "#2A2D31" }}
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-of-use"
              className="transition hover:text-[#C49A4A]"
              style={{ color: "#2A2D31" }}
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}