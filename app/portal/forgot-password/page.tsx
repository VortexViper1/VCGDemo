"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  const getResetRedirectUrl = () => {
    if (typeof window === "undefined") {
      return "https://viswaas.com/portal/reset-password";
    }

    return `${window.location.origin}/portal/reset-password`;
  };

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
    <main className="min-h-screen bg-[#FCFBF8] text-[#23272B]">
      {/* 
        KEEP YOUR EXISTING FORGOT-PASSWORD UI HERE.
        Replace only the form handlers with:
        
        onSubmit={handleSubmit}
        
        Email input:
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        
        Button:
        disabled={loading}
        
        Resend:
        onClick={handleResend}
      */}

      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h1 className="text-3xl font-semibold">
                  Reset your password
                </h1>

                <p className="mt-2 text-[#77736D]">
                  Enter your email and we’ll send you a secure password
                  reset link.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-[#E6DDD0] bg-white px-4 py-3 outline-none focus:border-[#D9822B]"
                />
              </div>

              {error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#23272B] px-5 py-3 font-semibold text-white transition hover:bg-[#D9822B] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </form>
          ) : (
            <div className="space-y-5 text-center">
              <div>
                <h1 className="text-3xl font-semibold">
                  Check your email
                </h1>

                <p className="mt-3 text-[#77736D]">
                  We’ve sent a secure password reset link to{" "}
                  <span className="font-medium text-[#23272B]">
                    {email}
                  </span>
                  .
                </p>
              </div>

              <button
                type="button"
                onClick={handleResend}
                disabled={loading}
                className="rounded-xl border border-[#E6DDD0] bg-white px-5 py-3 font-semibold transition hover:border-[#D9822B]"
              >
                {loading ? "Sending..." : "Resend email"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}