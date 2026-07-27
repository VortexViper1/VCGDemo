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

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#173F38]/8 bg-[#F7F4EE]">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#C9A35F]/12 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {/* CTA */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24 rounded-[32px] border border-[#173F38]/8 bg-[#F7F4EE]/[0.04] p-10 backdrop-blur-3xl md:p-16"
        >
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#C9A35F]">
                Let's Build Together
              </p>

              <h2
                className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl"
                style={{ color: "#173F38" }}
              >
                Turning ambition into
                <br />
                enduring value.
              </h2>
            </div>

            <Link href="/#contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-3 rounded-full bg-[#C9A35F] px-8 py-5 font-semibold text-[#071F2D] transition-all hover:shadow-[0_0_40px_rgba(201,163,95,.45)]"
              >
                Start a Conversation

                <ArrowUpRight className="transition group-hover:-translate-y-1 group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Main Grid */}

        <div className="grid gap-14 lg:grid-cols-12">
          {/* Brand */}

          <div className="lg:col-span-5">
            <h2
              className="text-3xl font-semibold"
              style={{ color: "#173F38" }}
            >
              VISWAS
            </h2>

            <p className="mt-3 text-xs uppercase tracking-[0.35em] text-[#C9A35F]">
              Strategy • Capital • Transformation
            </p>

            <p className="mt-8 max-w-md leading-8 text-[#071F2D]/70">
              We partner with organizations, investors, and visionary
              leaders to shape sustainable growth through strategic
              consulting, capital advisory, and digital transformation.
            </p>
          </div>

          {/* Navigation */}

          <div className="lg:col-span-3">
            <h4 className="mb-8 text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A35F]">
              Navigation
            </h4>

            <div className="space-y-5">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block transition hover:text-[#C9A35F]"
                  style={{ color: "#173F38" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}

          <div className="lg:col-span-4">
            <h4 className="mb-8 text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A35F]">
              Contact
            </h4>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail size={18} className="mt-1 text-[#C9A35F]" />

                <span className="text-[#071F2D]/70">{SITE_CONFIG.email}</span>
              </div>

              <div className="flex items-start gap-4">
                <Phone size={18} className="mt-1 text-[#C9A35F]" />

                <span className="text-[#071F2D]/70">{SITE_CONFIG.phone}</span>
              </div>

              <div className="flex items-start gap-4">
                <MapPin size={18} className="mt-1 text-[#C9A35F]" />

                <span className="text-[#071F2D]/70">{SITE_CONFIG.location}</span>
              </div>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 transition hover:text-[#C9A35F]"
                style={{ color: "#173F38" }}
              >
                <Globe size={20} className="text-[#C9A35F]" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-20 flex flex-col gap-6 border-t border-[#173F38]/8 pt-8 text-sm text-[#071F2D]/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} VISWAS Consulting Group.
            All Rights Reserved.
          </p>

          <div className="flex gap-6 md:p-8">
            <Link
              href="/privacy"
              className="transition hover:text-[#C9A35F]"
              style={{ color: "#173F38" }}
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-[#C9A35F]"
              style={{ color: "#173F38" }}
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}