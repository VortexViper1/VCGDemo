"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [checkingSession, setCheckingSession] = useState(true);
  const [sessionReady, setSessionReady] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    const init = async () => {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        console.log("AUTH EVENT:", event);

        if (!mounted) return;

        if (event === "PASSWORD_RECOVERY" && session) {
          console.log("PASSWORD RECOVERY SESSION FOUND");

          setSessionReady(true);
          setCheckingSession(false);
        }
      });

      await new Promise((resolve) => setTimeout(resolve, 500));

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) {
        subscription.unsubscribe();
        return;
      }

      if (session) {
        console.log("EXISTING SESSION FOUND");

        setSessionReady(true);
        setCheckingSession(false);
      } else {
        setTimeout(() => {
          if (!mounted) return;

          setCheckingSession(false);
          setSessionReady(false);
        }, 1500);
      }

      return () => {
        subscription.unsubscribe();
      };
    };

    let cleanup: (() => void) | undefined;

    init().then((fn) => {
      cleanup = fn;
    });

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, []);

  const handleUpdatePassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!password || !confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.error("Password update error:", error);
      setError(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setSuccess(true);
  };

  /* -------------------------------------------
     VERIFYING SESSION
  -------------------------------------------- */
  if (checkingSession) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FCFBF8] px-6">

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[10%] top-[15%] h-72 w-72 rounded-full bg-[#D9822B]/10 blur-3xl" />
          <div className="absolute bottom-[5%] right-[10%] h-80 w-80 rounded-full bg-[#D9822B]/8 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-md rounded-[28px] border border-white/70 bg-white/65 p-10 text-center shadow-[0_25px_80px_rgba(35,39,43,0.10)] backdrop-blur-2xl">

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D9822B]/20 bg-[#D9822B]/10">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#E6DDD0] border-t-[#D9822B]" />
          </div>

          <h1 className="text-2xl font-semibold text-[#23272B]">
            Verifying secure session
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#77736D]">
            Please wait while we securely verify your password
            recovery link.
          </p>
        </div>
      </main>
    );
  }

  /* -------------------------------------------
     INVALID / DIRECT ACCESS
  -------------------------------------------- */
  if (!sessionReady) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FCFBF8] px-6">

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[8%] top-[10%] h-72 w-72 rounded-full bg-[#D9822B]/10 blur-3xl" />
          <div className="absolute bottom-[8%] right-[5%] h-80 w-80 rounded-full bg-[#D9822B]/8 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-md rounded-[28px] border border-white/70 bg-white/65 p-8 text-center shadow-[0_25px_80px_rgba(35,39,43,0.10)] backdrop-blur-2xl sm:p-10">

          <div className="mb-7">
            <Link
              href="/"
              className="group inline-flex items-center gap-2"
            >
              <span className="text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-[#D9822B]">
                Viswaas
              </span>

              <span className="h-2 w-2 rounded-full bg-[#D9822B] shadow-[0_0_14px_rgba(217,130,43,0.55)]" />
            </Link>
          </div>

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D9822B]/20 bg-[#D9822B]/10 text-[#D9822B]">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
              <path d="M10.3 3.8 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z" />
            </svg>
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#D9822B]">
            Recovery
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">
            Reset link required
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#77736D]">
            This page can only be accessed through a valid password
            reset link sent to your email.
          </p>

          <div className="mt-8 space-y-3">
            <Link
              href="/portal/forgot-password"
              className="group relative block w-full overflow-hidden rounded-2xl bg-[#23272B] px-5 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D9822B] hover:shadow-[0_14px_35px_rgba(217,130,43,0.25)]"
            >
              Request a new reset link
            </Link>

            <Link
              href="/portal/login"
              className="block w-full rounded-2xl border border-[#E6DDD0] bg-white/60 px-5 py-3.5 font-semibold text-[#23272B] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D9822B]/50 hover:bg-[#D9822B]/5 hover:text-[#D9822B]"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* -------------------------------------------
     SUCCESS
  -------------------------------------------- */
  if (success) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FCFBF8] px-6">

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[10%] top-[10%] h-72 w-72 rounded-full bg-[#D9822B]/10 blur-3xl" />
          <div className="absolute bottom-[5%] right-[8%] h-80 w-80 rounded-full bg-[#D9822B]/8 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-md rounded-[28px] border border-white/70 bg-white/65 p-8 text-center shadow-[0_25px_80px_rgba(35,39,43,0.10)] backdrop-blur-2xl sm:p-10">

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D9822B]/20 bg-[#D9822B]/10">
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
            Success
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">
            Password updated
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#77736D]">
            Your password has been changed successfully.
            You can now sign in using your new password.
          </p>

          <button
            type="button"
            onClick={() => router.push("/portal/login")}
            className="mt-8 w-full rounded-2xl bg-[#23272B] px-5 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D9822B] hover:shadow-[0_14px_35px_rgba(217,130,43,0.25)]"
          >
            Continue to Sign In
          </button>
        </div>
      </main>
    );
  }

  /* -------------------------------------------
     VALID RECOVERY SESSION
  -------------------------------------------- */
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FCFBF8] px-6 py-12">

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[10%] h-72 w-72 rounded-full bg-[#D9822B]/10 blur-3xl" />
        <div className="absolute bottom-[5%] right-[8%] h-80 w-80 rounded-full bg-[#D9822B]/8 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">

        <div className="rounded-[28px] border border-white/70 bg-white/65 p-8 shadow-[0_25px_80px_rgba(35,39,43,0.10)] backdrop-blur-2xl sm:p-10">

          {/* Brand */}
          <div className="mb-10 text-center">
            <Link
              href="/"
              className="group inline-flex items-center gap-2"
            >
              <span className="text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-[#D9822B]">
                Viswaas
              </span>

              <span className="h-2 w-2 rounded-full bg-[#D9822B] shadow-[0_0_14px_rgba(217,130,43,0.55)] transition-transform duration-300 group-hover:scale-125" />
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#D9822B]">
              Account Security
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Create a new password
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#77736D]">
              Choose a strong password to secure your Viswaas account.
            </p>
          </div>

          <form
            onSubmit={handleUpdatePassword}
            className="space-y-5"
          >
            {/* New password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                New password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Enter new password"
                className="w-full rounded-2xl border border-[#E6DDD0] bg-white/75 px-4 py-3.5 outline-none transition-all duration-300 placeholder:text-[#AAA49C] hover:border-[#D9822B]/40 focus:border-[#D9822B] focus:bg-white focus:ring-4 focus:ring-[#D9822B]/10"
              />
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium"
              >
                Confirm password
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                autoComplete="new-password"
                placeholder="Confirm new password"
                className="w-full rounded-2xl border border-[#E6DDD0] bg-white/75 px-4 py-3.5 outline-none transition-all duration-300 placeholder:text-[#AAA49C] hover:border-[#D9822B]/40 focus:border-[#D9822B] focus:bg-white focus:ring-4 focus:ring-[#D9822B]/10"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-2xl border border-red-200/70 bg-red-50/70 px-4 py-3 text-sm leading-5 text-red-600 backdrop-blur-md">
                {error}
              </div>
            )}

            {/* Update */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-2xl bg-[#23272B] px-5 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D9822B] hover:shadow-[0_14px_35px_rgba(217,130,43,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="relative z-10">
                {loading
                  ? "Updating password..."
                  : "Update password"}
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
        </div>
      </div>
    </main>
  );
}