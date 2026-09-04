"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ButtonSpinner } from "@/components/portal/AuthSpinner";

export default function PortalLoginPage() {
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
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Check Supabase profile role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profile?.role === "admin") {
      router.push("/portal/admin");
    } else {
      router.push("/portal/dashboard");
    }

    router.refresh();
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Google login error:", error);
      setError(error.message);
      setGoogleLoading(false);
    }
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

          <Link
            href="/"
            className="relative text-xl font-semibold tracking-[0.2em]"
          >
            VISWAAS
          </Link>

          <div className="relative max-w-lg">
            <p className="mb-5 text-sm text-[#D9822B]">Client portal</p>

            <h1 className="ff-serif text-[3.4rem] font-normal leading-[1.05]">
              Everything you need, in one place.
            </h1>

            <p className="mt-6 max-w-md text-[15px] leading-7 text-white/55">
              Track your services, share documents, review payments and stay
              connected with the Viswaas team from a single dashboard.
            </p>
          </div>

          <p className="relative text-xs text-white/35">
            © {new Date().getFullYear()} Viswaas. All rights reserved.
          </p>
        </section>

        {/* Form panel */}
        <section className="flex w-full flex-1 items-center justify-center px-6 py-12 lg:w-[46%] lg:py-14">
          <div className="w-full max-w-[380px]">
            {/* Mobile brand strip */}
            <Link
              href="/"
              className="mb-10 flex items-center justify-between lg:hidden"
            >
              <span className="text-base font-semibold tracking-[0.2em] text-[#23272B]">
                VISWAAS
              </span>

              <span className="text-xs text-[#77736D]">
                Client portal
              </span>
            </Link>

            {/* Back to website */}
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

            <h2 className="ff-serif rise-1 text-[2.2rem] leading-tight text-[#23272B] sm:text-[2.4rem]">
              Welcome back
            </h2>

            <p className="rise-2 mt-3 text-[15px] text-[#77736D]">
              Sign in to access your Viswaas client portal.
            </p>

            <form
              onSubmit={handleLogin}
              className="rise-3 mt-10 space-y-7 sm:mt-11 sm:space-y-8"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm text-[#343434]"
                >
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

              {/* Password */}
              <div>
                <div className="mb-2 flex items-baseline justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm text-[#343434]"
                  >
                    Password
                  </label>

                  <Link
                    href="/portal/forgot-password"
                    className="text-xs font-medium text-[#D9822B] transition-colors duration-200 hover:text-[#D9822B]"
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
                    className="underline-input w-full py-2.5 pr-9 text-[15px] text-[#23272B] placeholder:text-[#B0AAA1]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-[#9A958D] transition-colors duration-200 hover:text-[#23272B]"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p
                  role="alert"
                  className="rounded-md border-l-2 border-[#B3261E] bg-[#FBEAEA] px-4 py-3 text-sm text-[#8B2A22]"
                >
                  {error}
                </p>
              )}

              {/* Sign in */}
              <button
                type="submit"
                disabled={loading || googleLoading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#23272B] text-sm font-medium text-white transition-all duration-200 hover:bg-[#D9822B] hover:shadow-[0_8px_20px_-8px_rgba(217,130,43,0.55)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none"
              >
                {loading && <ButtonSpinner />}
                {loading ? "Signing in…" : "Sign in"}
              </button>

              {/* Google */}
              <div className="relative">
                <div className="my-5 flex items-center">
                  <div className="h-px flex-1 bg-[#E8E2D9]" />
                  <span className="px-4 text-xs text-[#9A958D]">
                    OR
                  </span>
                  <div className="h-px flex-1 bg-[#E8E2D9]" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading || googleLoading}
                  className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-[#E8E2D9] bg-white text-sm font-medium text-[#23272B] transition-all duration-200 hover:border-[#D9822B] hover:bg-[#FAF8F5] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {googleLoading ? (
                    <ButtonSpinner />
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill="#4285F4"
                        d="M21.35 12.23c0-.79-.07-1.55-.2-2.27H12v4.3h5.23a4.47 4.47 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.92-4.18 2.92-7.39Z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.43c-.87.58-1.98.93-3.31.93-2.55 0-4.71-1.72-5.49-4.04H3.27v2.5A9.75 9.75 0 0 0 12 21.75Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M6.51 13.85a5.86 5.86 0 0 1 0-3.7v-2.5H3.27a9.75 9.75 0 0 0 0 8.7l3.24-2.5Z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 6.11c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.18 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.73 5.4l3.24 2.5c.78-2.32 2.94-4.04 5.49-4.04Z"
                      />
                    </svg>
                  )}

                  {googleLoading
                    ? "Connecting…"
                    : "Continue with Google"}
                </button>
              </div>
            </form>

            <p className="mt-9 text-center text-sm text-[#77736D]">
              Don&apos;t have a client account?{" "}
              <Link
                href="/portal/register"
                className="font-medium text-[#D9822B] hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}