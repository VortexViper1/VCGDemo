"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ButtonSpinner } from "@/components/portal/AuthSpinner";

const ADMIN_EMAIL = "vcg@viswaas.com";

export default function LoginForm({
  onBack,
}: {
  onBack?: () => void;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      console.error("Login error:", error);
      setError(error.message);
      setLoading(false);
      return;
    }

    const loggedInEmail = data.user.email?.trim().toLowerCase();

    if (loggedInEmail === ADMIN_EMAIL) {
      router.replace("/portal/admin");
    } else {
      router.replace("/portal/dashboard");
    }

    router.refresh();
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://viswaas.com/auth/callback",
      },
    });

    if (error) {
      console.error("Google login error:", error);
      setError(error.message);
      setGoogleLoading(false);
    }
  }

  return (
    <div className="relative w-full bg-[#FCFBF8]">
      {/* Close */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="Close login"
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full text-[#9A958D] transition-all duration-200 hover:bg-[#D9822B] hover:text-white active:scale-95"
        >
          <X size={16} strokeWidth={1.6} />
        </button>
      )}

      {/* Top brand */}
      <div className="flex items-center border-b border-[#E8E2D9] px-8 py-3.5 sm:px-10">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#E8E2D9] bg-white">
            <img
              src="/logo/MAIN LOGO.png"
              alt="Viswaas"
              className="h-full w-full object-contain p-1"
            />
          </span>

          <span className="text-[14px] font-semibold tracking-[0.18em] text-[#23272B]">
            VISWAAS
          </span>
        </Link>
      </div>

      {/* Content */}
      <div className="px-8 py-6 sm:px-11 sm:py-7">
        {/* Back */}
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="group mb-4 inline-flex items-center gap-2 text-[12px] font-medium tracking-wide text-[#9A958D] transition-colors duration-200 hover:text-[#A8732A]"
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.8}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Back to website
          </button>
        )}

        {/* Heading */}
        <div className="mb-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D9822B]">
            Client Portal
          </p>

          <h1 className="ff-serif mt-1.5 text-[1.65rem] leading-[1.1] tracking-[-0.02em] text-[#23272B] sm:text-[1.85rem]">
            Sign in
          </h1>

          <p className="mt-1.5 text-[13px] leading-5 text-[#77736D]">
            Access your Viswaas account.
          </p>
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
          className="flex h-11 w-full items-center justify-center gap-3 rounded-full border border-[#DCD6CD] bg-white text-[13px] font-semibold tracking-wide text-[#23272B] transition-all duration-200 hover:border-[#D9822B] hover:bg-[#FFF9F2] active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {googleLoading ? (
            <ButtonSpinner />
          ) : (
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M21.35 12.23c0-.79-.07-1.55-.23-2.27H12v4.3h5.22a4.47 4.47 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.93-4.18 2.93-7.42Z"
              />
              <path
                fill="#34A853"
                d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5Z"
              />
              <path
                fill="#FBBC05"
                d="M6.54 13.59A5.85 5.85 0 0 1 6.23 12c0-.55.1-1.08.31-1.59V7.88H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.12l3.24-2.53Z"
              />
              <path
                fill="#EA4335"
                d="M12 6.38c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.47 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.38l3.24 2.53C7.31 8.1 9.46 6.38 12 6.38Z"
              />
            </svg>
          )}

          {googleLoading ? "Connecting…" : "Continue with Google"}
        </button>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#E8E2D9]" />
          <span className="text-[10px] uppercase tracking-[0.14em] text-[#AAA49B]">
            or
          </span>
          <div className="h-px flex-1 bg-[#E8E2D9]" />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.06em] text-[#77736D]"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@company.com"
              className="h-10 w-full border-0 border-b border-[#DCD6CD] bg-transparent px-0 text-[14px] text-[#23272B] outline-none transition-colors duration-200 placeholder:text-[#B8B2A8] focus:border-[#D9822B]"
            />
          </div>

          {/* Password */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#77736D]"
              >
                Password
              </label>

              <Link
                href="/portal/forgot-password"
                className="text-[11.5px] font-medium text-[#9A958D] transition-colors duration-200 hover:text-[#A8732A]"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                className="h-10 w-full border-0 border-b border-[#DCD6CD] bg-transparent px-0 pr-9 text-[14px] text-[#23272B] outline-none transition-colors duration-200 placeholder:text-[#B8B2A8] focus:border-[#D9822B]"
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#9A958D] transition-colors duration-200 hover:text-[#A8732A]"
              >
                {showPassword ? (
                  <EyeOff size={16} strokeWidth={1.7} />
                ) : (
                  <Eye size={16} strokeWidth={1.7} />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-[#E5B8B3] bg-[#FBEAEA] px-3.5 py-2.5">
              <p
                role="alert"
                className="text-[12.5px] leading-5 text-[#8B2A22]"
              >
                {error}
              </p>
            </div>
          )}

          {/* Sign in */}
          <button
            type="submit"
            disabled={loading || googleLoading}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#23272B] text-[13px] font-semibold tracking-wide text-white transition-all duration-200 hover:bg-[#D9822B] hover:shadow-[0_14px_28px_-12px_rgba(196,154,74,0.55)] active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && <ButtonSpinner />}
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {/* Register */}
        <div className="mt-5 border-t border-[#E8E2D9] pt-4 text-center">
          <p className="text-[12px] text-[#77736D]">
            Don&apos;t have an account?{" "}
            <Link
              href="/portal/register"
              className="font-semibold text-[#A8732A] transition-colors duration-200 hover:text-[#8A5D22]"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}