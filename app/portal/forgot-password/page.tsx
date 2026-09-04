"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, KeyRound } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { AuthDialog } from "@/components/portal/Authdialog";
import { ButtonSpinner } from "@/components/portal/AuthSpinner";

export default function ForgotPasswordPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Unchanged: same resetPasswordForEmail call and redirect target.
  async function handleReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `https://viswaas.com/portal/reset-password`,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setShowSuccess(true);
  }

  async function handleResend() {
    setResending(true);
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `https://viswaas.com/portal/reset-password`,
    });
    setResending(false);
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
        .rise-3 {
          animation: riseIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.14s both;
        }
        @media (prefers-reduced-motion: reduce) {
          .rise-1,
          .rise-2,
          .rise-3 {
            animation: none;
          }
        }
      `}</style>

      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Brand panel — desktop only */}
        <section className="relative hidden overflow-hidden bg-[#23272B] px-14 py-12 text-white lg:flex lg:w-[54%] lg:flex-col lg:justify-between">
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

          <div className="relative max-w-lg">
            <p className="mb-5 text-sm text-[#D9822B]">Client portal</p>
            <h1 className="ff-serif text-[3.2rem] font-normal leading-[1.05]">
              Access, restored in a few steps.
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-7 text-white/55">
              We&apos;ll send a secure link to your inbox so you can set a new
              password and get back into your portal.
            </p>
          </div>

          <p className="relative text-xs text-white/35">
            © {new Date().getFullYear()} Viswaas. All rights reserved.
          </p>
        </section>

        {/* Form panel */}
        <section className="flex w-full flex-1 items-center justify-center px-6 py-12 lg:w-[46%] lg:py-14">
          <div className="w-full max-w-[380px]">
            <Link
              href="/"
              className="mb-10 flex items-center justify-between lg:hidden"
            >
              <span className="text-base font-semibold tracking-[0.2em] text-[#23272B]">
                VISWAAS
              </span>
              <span className="text-xs text-[#77736D]">Client portal</span>
            </Link>

            <Link
              href="/portal/login"
              className="group mb-8 hidden h-10 items-center gap-2 rounded-lg border border-[#E8E2D9] bg-white px-4 text-sm font-medium text-[#4B4A47] transition-all duration-200 hover:border-[#D9822B] hover:bg-[#D9822B] hover:text-white lg:inline-flex"
            >
              <ArrowLeft
                size={16}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              Back to sign in
            </Link>

            <h2 className="ff-serif rise-1 text-[2.2rem] leading-tight text-[#23272B] sm:text-[2.4rem]">
              Reset your password
            </h2>
            <p className="rise-2 mt-3 text-[15px] text-[#77736D]">
              Enter the email on your account and we&apos;ll send you a reset link.
            </p>

            <form onSubmit={handleReset} className="rise-3 mt-10 space-y-8 sm:mt-11">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-[#343434]">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="underline-input w-full py-2.5 text-[15px] text-[#23272B] placeholder:text-[#B0AAA1]"
                />
              </div>

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
                {loading ? "Sending reset link…" : "Send reset link"}
              </button>
            </form>

            <p className="mt-9 text-center text-sm text-[#77736D]">
              Remembered your password?{" "}
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
        icon={<KeyRound size={20} />}
        title="Check your inbox"
      >
        <p>
          We&apos;ve sent a password reset link to{" "}
          <span className="font-medium text-[#23272B]">{email}</span>.
        </p>
        <p className="mt-2">
          The link will take you securely back to Viswaas where you can
          create a new password.
        </p>

        <div className="mt-6 flex items-center justify-between text-sm">
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
      </AuthDialog>
    </main>
  );
}