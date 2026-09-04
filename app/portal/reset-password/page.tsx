"use client";

import { useEffect, useState } from "react";
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

    const checkRecoverySession = async () => {
      try {
        /*
         * First listen for PASSWORD_RECOVERY.
         * Supabase fires this when the reset link establishes
         * the recovery session.
         */
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
          if (!mounted) return;

          if (event === "PASSWORD_RECOVERY" && session) {
            setSessionReady(true);
            setCheckingSession(false);
          }
        });

        /*
         * Also check whether a session already exists.
         * This handles cases where Supabase has already processed
         * the recovery URL before the listener is attached.
         */
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) {
          subscription.unsubscribe();
          return;
        }

        if (session) {
          setSessionReady(true);
          setCheckingSession(false);
        } else {
          /*
           * Give Supabase a short moment to process the recovery
           * URL and fire PASSWORD_RECOVERY.
           */
          setTimeout(() => {
            if (!mounted) return;

            setCheckingSession(false);
          }, 1500);
        }

        return () => {
          subscription.unsubscribe();
        };
      } catch (err) {
        console.error("Recovery session error:", err);

        if (mounted) {
          setCheckingSession(false);
          setSessionReady(false);
        }
      }
    };

    let cleanup: (() => void) | undefined;

    checkRecoverySession().then((fn) => {
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

    try {
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

      setSuccess(true);
      setLoading(false);
    } catch (err) {
      console.error("Password update error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  /*
   * IMPORTANT:
   * Directly visiting /portal/reset-password without a recovery
   * session should NOT show an infinite loader.
   */
  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FCFBF8] px-6">
        <div className="text-center">
          <div className="mx-auto mb-5 h-8 w-8 animate-spin rounded-full border-2 border-[#E6DDD0] border-t-[#D9822B]" />

          <h1 className="text-xl font-semibold text-[#23272B]">
            Verifying secure recovery session…
          </h1>

          <p className="mt-2 text-sm text-[#77736D]">
            Please wait a moment.
          </p>
        </div>
      </main>
    );
  }

  /*
   * No recovery session.
   * This is what the user sees if they manually type:
   * /portal/reset-password
   */
  if (!sessionReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FCFBF8] px-6">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-semibold text-[#23272B]">
            Reset link required
          </h1>

          <p className="mt-3 text-[#77736D]">
            This page can only be accessed through a valid password
            reset link sent to your email.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => router.push("/portal/forgot-password")}
              className="rounded-xl bg-[#23272B] px-5 py-3 font-semibold text-white transition hover:bg-[#D9822B]"
            >
              Request a new reset link
            </button>

            <button
              type="button"
              onClick={() => router.push("/portal/login")}
              className="rounded-xl border border-[#E6DDD0] bg-white px-5 py-3 font-semibold text-[#23272B] transition hover:border-[#D9822B]"
            >
              Back to login
            </button>
          </div>
        </div>
      </main>
    );
  }

  /*
   * Password successfully changed.
   */
  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FCFBF8] px-6">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-semibold text-[#23272B]">
            Password updated
          </h1>

          <p className="mt-3 text-[#77736D]">
            Your password has been changed successfully.
            You can now sign in with your new password.
          </p>

          <button
            type="button"
            onClick={() => router.push("/portal/login")}
            className="mt-8 w-full rounded-xl bg-[#23272B] px-5 py-3 font-semibold text-white transition hover:bg-[#D9822B]"
          >
            Continue to login
          </button>
        </div>
      </main>
    );
  }

  /*
   * Valid recovery session → password form.
   */
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FCFBF8] px-6">
      <div className="w-full max-w-md">
        <form onSubmit={handleUpdatePassword} className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold text-[#23272B]">
              Create a new password
            </h1>

            <p className="mt-2 text-[#77736D]">
              Enter your new password below.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#23272B]">
              New password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="Enter new password"
              className="w-full rounded-xl border border-[#E6DDD0] bg-white px-4 py-3 outline-none focus:border-[#D9822B]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#23272B]">
              Confirm password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="Confirm new password"
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
            {loading ? "Updating password..." : "Update password"}
          </button>
        </form>
      </div>
    </main>
  );
}