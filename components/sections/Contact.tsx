"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, Globe, Check, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import Reveal from "@/components/shared/Reveal";
import GlassCard from "@/components/shared/GlassCard";

// TODO: replace with your real LinkedIn company URL
const LINKEDIN_URL = "https://linkedin.com";

const EMAIL = "vcg@viswaas.com";
const PHONE = "+91 77948 37878";
const PHONE_TEL = "+917794837878"; // digits only for tel: link

// TODO: replace with your real office address
const OFFICE_ADDRESS = "TRENDZ UNITY, KAMALDEEP SINGH LAMBA, HYDERABAD, India";
const MAPS_QUERY = encodeURIComponent(OFFICE_ADDRESS);
const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;
const MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: PHONE,
    href: `tel:${PHONE_TEL}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: "India",
    href: MAPS_DIRECTIONS_URL,
  },
];

function FormField({
  label,
  type = "text",
  placeholder,
  as = "input",
  rows,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder: string;
  as?: "input" | "textarea";
  rows?: number;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);

  const sharedClasses =
    "w-full rounded-2xl border bg-white px-5 py-4  outline-none transition-all duration-300";

  return (
    <div>
      <label className="mb-3 block text-sm uppercase tracking-[0.25em] text-[#6B807A]">
        {label}
      </label>

      <div className="relative">
        {as === "textarea" ? (
          <textarea
            rows={rows}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`${sharedClasses} resize-none ${
              focused ? "border-[#C49A4A] bg-[#FFFFFF]/[0.07]" : "border-[#2A2D31]/8"
            }`}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`${sharedClasses} ${
              focused ? "border-[#C49A4A] bg-[#FFFFFF]/[0.07]" : "border-[#2A2D31]/8"
            }`}
          />
        )}

        <motion.div
          animate={{ opacity: focused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-[#C49A4A]/12 blur-md"
        />
      </div>
    </div>
  );
}

function MapPanel() {
  const [loaded, setLoaded] = useState(false);

  return (
    <Reveal delay={0.3}>
      <GlassCard className="overflow-hidden !p-0">
        <div className="flex flex-col gap-0 lg:flex-row">
          <div className="relative h-[320px] w-full lg:h-[380px] lg:w-3/5">
            <motion.div
              animate={{ opacity: loaded ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-10 flex items-center justify-center bg-[#0B2836]"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                className="h-6 w-6 rounded-full border-2 border-[#C49A4A]/30 border-t-[#C49A4A]"
              />
            </motion.div>

            <div className="pointer-events-none absolute -inset-px z-20 rounded-none ring-1 ring-inset ring-[#C49A4A]/15" />

            <iframe
              title="VISWAAS Consulting Group location"
              src={MAPS_EMBED_URL}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full grayscale-[35%] contrast-[1.05] saturate-[0.85]"
              style={{ border: 0, filter: "sepia(8%)" }}
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#23272B]/70 via-transparent to-transparent lg:bg-gradient-to-r" />
          </div>

          <div className="flex w-full flex-col justify-center gap-6 p-10 lg:w-2/5 lg:p-12">
            <div>
              <span className="text-xs uppercase tracking-[0.35em] text-[#C49A4A]">
                Find Us
              </span>
              <h3 className="mt-4 text-2xl font-semibold" style={{ color: "#2A2D31" }}>
                Visit our office
              </h3>
              <p className="mt-4 leading-7 text-[#23272B]/70">{OFFICE_ADDRESS}</p>
            </div>

            <motion.a
              href={MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex w-fit items-center gap-3 overflow-hidden rounded-full bg-[#C49A4A] px-7 py-3.5 font-semibold text-[#23272B] transition-shadow duration-300 hover:shadow-[0_0_30px_-6px_rgba(201,163,95,0.6)]"
            >
              
              Get Directions
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>
          </div>
        </div>
      </GlassCard>
    </Reveal>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
  });

  const updateField = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status !== "idle") return;

    if (!form.firstName.trim()) {
      alert("Please enter your first name.");
      return;
    }

    if (!form.lastName.trim()) {
      alert("Please enter your last name.");
      return;
    }

    if (!form.email.trim()) {
      alert("Please enter your email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!form.message.trim()) {
      alert("Please enter your message.");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to send email");
      }

      setStatus("sent");

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        message: "",
      });

      setTimeout(() => {
        setStatus("idle");
      }, 2500);
    } catch (err) {
      console.error(err);
      alert("Failed to send inquiry.");
      setStatus("idle");
    }
  };

  return (
    <Section id="contact" className="relative overflow-hidden bg-[#FFFFFF]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-[#C49A4A]/12 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#C89B3C]/15 blur-[140px]"
        />
      </div>

      <Reveal>
        <SectionTitle
          eyebrow="CONTACT"
          title="Book an Appointment."
          description="Let's discuss your strategy, investment, or transformation goals. Our team will connect with you shortly."
          align="center"
        />
      </Reveal>

      <div className="mt-20 grid gap-10 lg:grid-cols-5 lg:items-stretch">
        <Reveal className="flex h-full lg:col-span-2">
          <GlassCard className="flex h-full w-full flex-col">
            <div className="flex flex-1 flex-col justify-between space-y-10">
              <div className="space-y-10">
                <div>
                  <span className="text-xs uppercase tracking-[0.35em] text-[#C49A4A]">
                    Office
                  </span>
                  <h3 className="mt-4 text-3xl font-semibold" style={{ color: "#2A2D31" }}>
                    VISWAAS Consulting Group
                  </h3>
                  <p className="mt-6 leading-8 text-[#23272B]/70">
                    Partnering with visionary organizations to create
                    sustainable business growth through strategy, capital
                    advisory, and digital transformation.
                  </p>
                </div>

                <div className="space-y-8">
                  {CONTACT_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const content = (
                      <motion.div
                        whileHover={item.href ? { x: 4 } : undefined}
                        transition={{ type: "spring" as const, stiffness: 250, damping: 20 }}
                        className="group flex gap-5"
                      >
                        <motion.div
                          whileHover={item.href ? { rotate: -8, scale: 1.08 } : undefined}
                          transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
                          className="rounded-2xl bg-[#C49A4A]/12 p-4 transition-colors duration-300 group-hover:bg-[#C49A4A]/20"
                        >
                          <Icon size={22} className="text-[#C49A4A]" />
                        </motion.div>

                        <div>
                          <p className="text-sm uppercase tracking-[0.25em] text-[#23272B]/50">
                            {item.label}
                          </p>
                          <p className="mt-2" style={{ color: "#2A2D31" }}>
                            {item.value}
                          </p>
                        </div>
                      </motion.div>
                    );

                    return item.href ? (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.label === "Location" ? "_blank" : undefined}
                        rel={item.label === "Location" ? "noopener noreferrer" : undefined}
                        className="block"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={item.label}>{content}</div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-[#2A2D31]/8 pt-8">
                <motion.a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-3 text-[#23272B]/70 transition-colors hover:text-[#C49A4A]"
                >
                  <Globe size={20} className="text-[#C49A4A]" />
                  LinkedIn
                </motion.a>
              </div>
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.2} className="flex h-full lg:col-span-3">
          <GlassCard className="flex h-full w-full flex-col">
            <form className="flex flex-1 flex-col space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  label="First Name"
                  placeholder="Nicholas"
                  value={form.firstName}
                  onChange={updateField("firstName")}
                />
                <FormField
                  label="Last Name"
                  placeholder="Pooran"
                  value={form.lastName}
                  onChange={updateField("lastName")}
                />
              </div>

              <FormField
                label="Email"
                type="email"
                placeholder="Nicholas@company.com"
                value={form.email}
                onChange={updateField("email")}
              />

              <FormField
                label="Company"
                placeholder="Company Name"
                value={form.company}
                onChange={updateField("company")}
              />

              <div className="flex-1">
                <FormField
                  label="Message"
                  as="textarea"
                  rows={6}
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={updateField("message")}
                />
              </div>

              <motion.button
                whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
                whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
                type="submit"
                disabled={status !== "idle"}
                className={`group relative flex min-w-[200px] items-center justify-center gap-2 self-start overflow-hidden rounded-full px-5 py-2.5 text-[13px] font-medium shadow-sm ring-1 ring-[#2A2D31]/10 transition-all duration-300 sm:text-sm ${
                  status === "sent"
                    ? "bg-emerald-400 text-[#23272B]"
                    : "bg-white/95 text-[#23272B] hover:bg-[#D9822B] hover:text-white"
                }`}
              >
                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-2"
                    >
                      Send Inquiry
                      <Send size={15} className="transition group-hover:translate-x-1" />
                    </motion.span>
                  )}

                  {status === "sending" && (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-2"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 rounded-full border-2 border-[#23272B]/30 border-t-[#23272B]"
                      />
                      Sending inquiry...
                    </motion.span>
                  )}

                  {status === "sent" && (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-2"
                    >
                      Inquiry Sent
                      <Check size={15} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </GlassCard>
        </Reveal>
      </div>

      <div className="mt-10">
        <MapPanel />
      </div>
    </Section>
  );
}