"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { AuthDialog, DialogCheckIcon } from "@/components/portal/Authdialog";
import { ButtonSpinner, SecureSessionLoader } from "@/components/portal/AuthSpinner";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [sessionReady, setSessionReady] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) {
        setSessionReady(true);
      }
    });

    // Covers the case where the event already fired before this
    // listener attached.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setSessionReady(true);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
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
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setShowSuccess(true);
  }

  function handleContinue() {
    router.push("/portal/login");
    router.refresh();
  }

  if (!sessionReady) {
    return <SecureSessionLoader headline="We're verifying your secure recovery session…" />;
  }

  return (
    <main className="ff-body flex min-h-screen items-center justify-center bg-[#FCFBF8] px-6 py-14">
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
      `}</style>

      <div className="w-full max-w-[380px]">
        <p className="mb-8 text-center text-sm font-semibold tracking-[0.28em] text-[#23272B]">
          VISWAAS
        </p>

        <h2 className="ff-serif rise-1 text-center text-[2rem] leading-tight text-[#23272B]">
          Set a new password
        </h2>
        <p className="rise-2 mt-3 text-center text-[15px] text-[#77736D]">
          Choose a new password to secure your Viswaas account.
        </p>

        <form onSubmit={handleUpdate} className="mt-10 space-y-7">
          <div>
            <label htmlFor="password" className="mb-2 block text-sm text-[#343434]">
              New password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="Enter a new password"
                className="underline-input w-full py-2.5 pr-9 text-[15px] text-[#23272B] placeholder:text-[#B0AAA1]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#9A958D] transition-colors duration-200 hover:text-[#23272B]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm text-[#343434]">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="Confirm your new password"
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
            {loading ? "Updating password…" : "Update password"}
          </button>
        </form>

        <p className="mt-9 text-center text-sm text-[#77736D]">
          <Link href="/portal/login" className="font-medium text-[#D9822B] hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>

      <AuthDialog
        open={showSuccess}
        closable={false}
        icon={<DialogCheckIcon />}
        title="Password updated"
      >
        <p>Your password has been securely changed.</p>
        <p className="mt-2">You&apos;re ready to sign in again.</p>

        <button
          type="button"
          onClick={handleContinue}
          className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#23272B] text-sm font-medium text-white transition-all duration-200 hover:bg-[#D9822B]"
        >
          <ShieldCheck size={16} />
          Continue to sign in
        </button>
      </AuthDialog>
    </main>
  );
}