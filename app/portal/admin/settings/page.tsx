"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  User,
  Mail,
  ShieldCheck,
  Bell,
  Lock,
  Check,
} from "lucide-react";

export default function AdminSettingsPage() {
  const supabase = createClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function loadAdmin() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setEmail(user.email ?? "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", user.id)
        .single();

      if (profile?.full_name) {
        setName(profile.full_name);
      }

      setLoading(false);
    }

    loadAdmin();
  }, [supabase]);

  return (
    <main className="min-w-0 bg-[#FCFBF8] p-5 sm:p-6 md:p-8">
      {/* HEADER */}
      <div className="max-w-5xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#D9822B]">
          Administration
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#23272B] sm:text-3xl">
          Settings
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-[#77736D]">
          Manage your administrator account and portal preferences.
        </p>
      </div>

      <div className="mt-8 max-w-5xl space-y-6">
        {/* ACCOUNT */}
        <section className="overflow-hidden rounded-2xl border border-[#E8E2D9] bg-white">
          <div className="border-b border-[#E8E2D9] px-5 py-5 sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6E3CC] text-[#B8661A]">
                <User size={18} strokeWidth={1.8} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-[#23272B]">
                  Administrator account
                </h2>

                <p className="mt-1 text-xs leading-5 text-[#77736D]">
                  Your account information and administrator access.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
            <div className="rounded-xl border border-[#E8E2D9] bg-[#FCFBF8] p-4">
              <div className="flex items-center gap-2 text-[#9A958D]">
                <User size={15} />
                <span className="text-xs">Full name</span>
              </div>

              <p className="mt-3 text-sm font-medium text-[#23272B]">
                {loading ? "Loading..." : name || "Not provided"}
              </p>
            </div>

            <div className="rounded-xl border border-[#E8E2D9] bg-[#FCFBF8] p-4">
              <div className="flex items-center gap-2 text-[#9A958D]">
                <Mail size={15} />
                <span className="text-xs">Email address</span>
              </div>

              <p className="mt-3 truncate text-sm font-medium text-[#23272B]">
                {loading ? "Loading..." : email || "Not available"}
              </p>
            </div>

            <div className="rounded-xl border border-[#E8E2D9] bg-[#FCFBF8] p-4 sm:col-span-2">
              <div className="flex items-center gap-2 text-[#9A958D]">
                <ShieldCheck size={15} />
                <span className="text-xs">Account role</span>
              </div>

              <div className="mt-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#F6E3CC] px-3 py-1.5 text-xs font-medium text-[#B8661A]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D9822B]" />
                  Administrator
                </span>
              </div>
            </div>
          </div>
        </section>


        {/* SECURITY */}
        <section className="overflow-hidden rounded-2xl border border-[#E8E2D9] bg-white">
          <div className="border-b border-[#E8E2D9] px-5 py-5 sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6E3CC] text-[#B8661A]">
                <Lock size={18} strokeWidth={1.8} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-[#23272B]">
                  Security
                </h2>

                <p className="mt-1 text-xs leading-5 text-[#77736D]">
                  Manage access to your administrator account.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-4 rounded-xl border border-[#E8E2D9] bg-[#FCFBF8] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-[#23272B]">
                  Password
                </p>

                <p className="mt-1 text-xs leading-5 text-[#77736D]">
                  Update your administrator password securely.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/portal/forgot-password";
                }}
                className="h-10 shrink-0 rounded-full bg-[#23272B] px-5 text-xs font-medium text-white transition-all duration-200 hover:bg-[#D9822B] active:scale-[0.98]"
              >
                Change password
              </button>
            </div>
          </div>
        </section>

        {/* STATUS */}
        <div className="flex items-center gap-2 px-1 pb-4 text-xs text-[#77736D]">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EAF2EC] text-[#3B6049]">
            <Check size={12} strokeWidth={2} />
          </span>

          Your administrator account is active and secured.
        </div>
      </div>
    </main>
  );
}

function SettingToggle({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 px-5 py-5 sm:px-6">
      <div className="min-w-0">
        <p className="text-sm font-medium text-[#23272B]">
          {title}
        </p>

        <p className="mt-1 max-w-lg text-xs leading-5 text-[#77736D]">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
          enabled
            ? "bg-[#D9822B]"
            : "bg-[#D8D4CE]"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            enabled
              ? "translate-x-6"
              : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}