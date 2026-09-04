"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  const sendResetEmail = async () => {
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      {
        redirectTo: "https://viswaas.com/portal/reset-password",
      }
    );

    setLoading(false);

    if (error) {
      console.error("Password reset error:", error);
      setError(error.message);
      return;
    }

    setSuccess(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendResetEmail();
  };

  const handleResend = async () => {
    await sendResetEmail();
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FCFBF8] px-6 py-12 text-[#23272B]">

      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[10%] h-72 w-72 rounded-full bg-[#D9822B]/10 blur-3xl" />
        <div className="absolute bottom-[5%] right-[8%] h-80 w-80 rounded-full bg-[#D9822B]/8 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">

        {/* Glass card */}
        <div className="rounded-[28px] border border-white/70 bg-white/65 p-8 shadow-[0_25px_80px_rgba(35,39,43,0.10)] backdrop-blur-2xl sm:p-10">

          {/* Logo / brand */}
          <div className="mb-10 text-center">
            <Link
              href="/"
              className="group inline-flex items-center gap-2"
            >
              <span className="text-2xl font-bold tracking-tight text-[#23272B] transition-colors duration-300 group-hover:text-[#D9822B]">
                Viswaas
              </span>

              <span className="h-2 w-2 rounded-full bg-[#D9822B] shadow-[0_0_14px_rgba(217,130,43,0.55)] transition-all duration-300 group-hover:scale-125" />
            </Link>
          </div>

          {!success ? (
            <>
              {/* Heading */}
              <div className="mb-8">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#D9822B]">
                  Account Recovery
                </p>

                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Forgot your password?
                </h1>

                <p className="mt-3 text-sm leading-6 text-[#77736D]">
                  Enter your email address and we’ll send you a secure
                  password reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-[#23272B]"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-2xl border border-[#E6DDD0] bg-white/75 px-4 py-3.5 text-[#23272B] outline-none transition-all duration-300 placeholder:text-[#AAA49C] hover:border-[#D9822B]/40 focus:border-[#D9822B] focus:bg-white focus:ring-4 focus:ring-[#D9822B]/10"
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-2xl border border-red-200/70 bg-red-50/70 px-4 py-3 text-sm leading-5 text-red-600 backdrop-blur-md">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden rounded-2xl bg-[#23272B] px-5 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D9822B] hover:shadow-[0_14px_35px_rgba(217,130,43,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="relative z-10">
                    {loading ? "Sending reset link..." : "Send reset link"}
                  </span>

                  <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
                </button>
              </form>

              {/* Sign in */}
              <div className="mt-8 border-t border-[#E6DDD0]/70 pt-6 text-center">
                <Link
                  href="/portal/login"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-[#77736D] transition-colors duration-300 hover:text-[#D9822B]"
                >
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>

                  Back to Sign In
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Success */}
              <div className="mb-8 text-center">

                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D9822B]/20 bg-[#D9822B]/10 shadow-[0_10px_35px_rgba(217,130,43,0.12)]">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D9822B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>

                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#D9822B]">
                  Email Sent
                </p>

                <h1 className="text-3xl font-semibold tracking-tight">
                  Check your email
                </h1>

                <p className="mt-3 text-sm leading-6 text-[#77736D]">
                  We’ve sent a secure password reset link to{" "}
                  <span className="font-semibold text-[#23272B]">
                    {email}
                  </span>
                  .
                </p>
              </div>

              {/* Resend */}
              <button
                type="button"
                onClick={handleResend}
                disabled={loading}
                className="group w-full rounded-2xl border border-[#E6DDD0] bg-white/60 px-5 py-3.5 font-semibold text-[#23272B] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D9822B]/50 hover:bg-[#D9822B]/5 hover:text-[#D9822B] hover:shadow-[0_12px_30px_rgba(217,130,43,0.10)] disabled:opacity-60"
              >
                {loading ? "Sending..." : "Resend email"}
              </button>

              {/* Sign in */}
              <div className="mt-8 border-t border-[#E6DDD0]/70 pt-6 text-center">
                <Link
                  href="/portal/login"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-[#77736D] transition-colors duration-300 hover:text-[#D9822B]"
                >
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>

                  Back to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}