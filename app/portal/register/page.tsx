"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { AuthDialog } from "@/components/portal/Authdialog";
import { ButtonSpinner } from "@/components/portal/AuthSpinner";

const REQUIREMENTS = [
  { id: "len", label: "At least 6 characters", test: (v: string) => v.length >= 6 },
  { id: "case", label: "One uppercase and one lowercase letter", test: (v: string) => /[a-z]/.test(v) && /[A-Z]/.test(v) },
  { id: "num", label: "At least one number", test: (v: string) => /\d/.test(v) },
];

export default function RegisterPage() {
  const supabase = createClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [resendNote, setResendNote] = useState("");

  const metRequirements = useMemo(
    () => REQUIREMENTS.map((r) => ({ ...r, met: r.test(password) })),
    [password]
  );

  // Unchanged: identical signUp call and payload shape.
  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          phone,
          company_name: company,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      setShowSuccess(true);
    }

    setLoading(false);
  }

  // Unchanged mechanism: Supabase's own resend endpoint, same email.
  async function handleResend() {
    setResending(true);
    setResendNote("");
    const { error } = await supabase.auth.resend({ type: "signup", email });
    setResending(false);
    setResendNote(error ? "Couldn't resend right now — try again shortly." : "Confirmation email resent.");
  }

  return (
    <main className="ff-body min-h-screen bg-[#FCFBF8]">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,400..600&family=Inter:wght@400;500;600&display=swap");
        .ff-body {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .ff-serif {
          font-family: "Fraunces", Georgia, serif;
        }
        .underline-input {
          border: none;
          border-bottom: 1px solid #e8e2d9;
          border-radius: 0;
          background: transparent;
          transition: border-color 0.2s ease, border-width 0.2s ease;
        }
        .underline-input:focus {
          outline: none;
          border-bottom: 2px solid #c49a4a;
        }
        @keyframes riseIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .rise-1 {
          animation: riseIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .rise-2 {
          animation: riseIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.07s both;
        }
        @media (prefers-reduced-motion: reduce) {
          .rise-1,
          .rise-2 {
            animation: none;
          }
        }
        .req-item {
          transition: color 0.2s ease;
        }
        .req-check {
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
      `}</style>

      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-12">
        {/* Info panel — desktop only */}
        <section className="relative col-span-5 hidden overflow-hidden bg-[#23272B] px-14 py-12 text-white lg:flex lg:flex-col lg:justify-between">
          <svg
            className="pointer-events-none absolute -right-16 -top-10 h-[420px] w-[420px] opacity-[0.14]"
            viewBox="0 0 400 400"
            fill="none"
          >
            <path
              d="M10 340 C 90 340, 100 220, 160 220 S 230 120, 280 120 S 340 40, 390 40"
              stroke="#C49A4A"
              strokeWidth="1.5"
            />
            <circle cx="160" cy="220" r="4" fill="#C49A4A" />
            <circle cx="280" cy="120" r="4" fill="#C49A4A" />
            <circle cx="390" cy="40" r="4" fill="#C49A4A" />
          </svg>

          <Link href="/" className="relative text-xl font-semibold tracking-[0.2em]">
            VISWAAS
          </Link>

          <div className="relative max-w-md">
            <p className="mb-5 text-sm text-[#D9822B]">Client portal</p>
            <h1 className="ff-serif text-[2.9rem] font-normal leading-[1.1]">
              Create your account.
            </h1>
            <p className="mt-6 text-[15px] leading-7 text-white/55">
              A single sign-in for every engagement, document and payment you
              share with Viswaas.
            </p>

            <div className="mt-14 space-y-5 border-t border-white/10 pt-8">
              <div className="flex items-baseline justify-between border-b border-white/10 pb-3">
                <span className="text-sm text-white/70">Personal details</span>
                <span className="text-xs text-white/35">Name, email, phone</span>
              </div>
              <div className="flex items-baseline justify-between border-b border-white/10 pb-3">
                <span className="text-sm text-white/70">Company</span>
                <span className="text-xs text-white/35">Who you represent</span>
              </div>
              <div className="flex items-baseline justify-between pb-3">
                <span className="text-sm text-white/70">Security</span>
                <span className="text-xs text-white/35">Set a password</span>
              </div>
            </div>
          </div>

          <p className="relative text-xs text-white/35">
            © {new Date().getFullYear()} Viswaas. All rights reserved.
          </p>
        </section>

        {/* Form panel */}
        <section className="col-span-7 flex items-center justify-center px-6 py-12 lg:py-14">
          <div className="w-full max-w-[560px]">
            <Link
              href="/"
              className="mb-8 flex items-center justify-between lg:hidden"
            >
              <span className="text-base font-semibold tracking-[0.2em] text-[#23272B]">
                VISWAAS
              </span>
              <span className="text-xs text-[#77736D]">Client portal</span>
            </Link>
            <Link
              href="/"
              className="group mb-8 hidden h-10 items-center gap-2 rounded-lg border border-[#E8E2D9] bg-white px-4 text-sm font-medium text-[#4B4A47] transition-all duration-200 hover:border-[#D9822B] hover:bg-[#D9822B] hover:text-white lg:inline-flex"
            >
              <ArrowLeft
                size={16}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              Back to website
            </Link>

            <h2 className="ff-serif rise-1 text-[2rem] leading-tight text-[#23272B] sm:text-[2.2rem]">
              Create your account
            </h2>
            <p className="rise-2 mt-3 text-[15px] text-[#77736D]">
              Set up access to manage your Viswaas services.
            </p>

            <form onSubmit={handleRegister} className="mt-10 space-y-9 sm:mt-11 sm:space-y-10">
              {/* Personal details */}
              <fieldset className="space-y-6">
                <legend className="mb-1 text-sm text-[#D9822B]">Personal details</legend>

                <div>
                  <label htmlFor="name" className="mb-2 block text-sm text-[#343434]">
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your full name"
                    className="underline-input w-full py-2.5 text-[15px] text-[#23272B] placeholder:text-[#B0AAA1]"
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm text-[#343434]">
                      Work email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@company.com"
                      className="underline-input w-full py-2.5 text-[15px] text-[#23272B] placeholder:text-[#B0AAA1]"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm text-[#343434]">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="underline-input w-full py-2.5 text-[15px] text-[#23272B] placeholder:text-[#B0AAA1]"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Company */}
              <fieldset className="space-y-6">
                <legend className="mb-1 text-sm text-[#D9822B]">Company</legend>
                <div>
                  <label htmlFor="company" className="mb-2 block text-sm text-[#343434]">
                    Company name
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Your company"
                    className="underline-input w-full py-2.5 text-[15px] text-[#23272B] placeholder:text-[#B0AAA1]"
                  />
                </div>
              </fieldset>

              {/* Security */}
              <fieldset className="space-y-6">
                <legend className="mb-1 text-sm text-[#D9822B]">Security</legend>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="password" className="mb-2 block text-sm text-[#343434]">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Create a password"
                      className="underline-input w-full py-2.5 text-[15px] text-[#23272B] placeholder:text-[#B0AAA1]"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="mb-2 block text-sm text-[#343434]">
                      Confirm password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="Confirm your password"
                      className="underline-input w-full py-2.5 text-[15px] text-[#23272B] placeholder:text-[#B0AAA1]"
                    />
                  </div>
                </div>

                {/* Elegant requirement checklist — replaces a validation dump */}
                {password.length > 0 && (
                  <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
                    {metRequirements.map((r) => (
                      <li
                        key={r.id}
                        className={`req-item flex items-center gap-1.5 text-xs ${
                          r.met ? "text-[#23272B]" : "text-[#9A958D]"
                        }`}
                      >
                        <span
                          className={`req-check flex h-4 w-4 items-center justify-center rounded-full ${
                            r.met ? "bg-[#D9822B] text-white opacity-100" : "border border-[#DED8CF] opacity-70"
                          }`}
                        >
                          {r.met && <Check size={10} strokeWidth={3} />}
                        </span>
                        {r.label}
                      </li>
                    ))}
                  </ul>
                )}
              </fieldset>

              {error && (
                <p
                  role="alert"
                  className="rounded-md border-l-2 border-[#B3261E] bg-[#FBEAEA] px-4 py-3 text-sm text-[#8B2A22]"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#23272B] text-sm font-medium text-white transition-all duration-200 hover:bg-[#D9822B] hover:shadow-[0_8px_20px_-8px_rgba(217,130,43,0.55)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none"
              >
                {loading && <ButtonSpinner />}
                {loading ? "Creating account…" : "Create account"}
              </button>
            </form>

            <p className="mt-9 text-center text-sm text-[#77736D]">
              Already have an account?{" "}
              <Link href="/portal/login" className="font-medium text-[#D9822B] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>

      <AuthDialog
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        icon={<Mail size={20} />}
        title="Email verification required"
      >
        <p>
          We&apos;ve sent a confirmation link to <span className="font-medium text-[#23272B]">{email}</span>.
        </p>
        <p className="mt-2">
          Check your inbox and follow the link to activate your Viswaas account.
        </p>

        <a
          href="mailto:"
          className="mt-6 flex h-11 w-full items-center justify-center rounded-full bg-[#23272B] text-sm font-medium text-white transition-all duration-200 hover:bg-[#D9822B]"
        >
          Open email
        </a>

        <div className="mt-4 flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="flex items-center gap-2 font-medium text-[#D9822B] transition-colors duration-200 hover:text-[#D9822B] disabled:opacity-60"
          >
            {resending && <ButtonSpinner light={false} />}
            {resending ? "Resending…" : "Resend email"}
          </button>
          <Link href="/portal/login" className="text-[#77736D] hover:text-[#23272B]">
            Back to sign in
          </Link>
        </div>

        {resendNote && <p className="mt-3 text-xs text-[#9A958D]">{resendNote}</p>}
      </AuthDialog>
    </main>
  );
}