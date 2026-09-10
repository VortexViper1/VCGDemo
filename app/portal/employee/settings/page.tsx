"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  User,
  Mail,
  ShieldCheck,
  Lock,
  Check,
  Pencil,
  X,
  Save,
} from "lucide-react";

export default function EmployeeSettingsPage() {
  const supabase = createClient();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [editMode, setEditMode] = useState(false);

  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEmployee() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setEmail(user.email ?? "");

      const { data: profile, error } =
        await supabase
          .from("profiles")
          .select(
            "full_name, phone, role"
          )
          .eq("id", user.id)
          .single();

      if (error) {
        console.error(
          "EMPLOYEE SETTINGS ERROR:",
          error
        );

        setError(
          "Unable to load your profile."
        );
        setLoading(false);
        return;
      }

      if (profile?.role !== "team") {
        window.location.href =
          "/portal/dashboard";
        return;
      }

      const fullName =
        profile.full_name ?? "";

      const phoneNumber =
        profile.phone ?? "";

      setName(fullName);
      setPhone(phoneNumber);

      setEditName(fullName);
      setEditPhone(phoneNumber);

      setLoading(false);
    }

    loadEmployee();
  }, [supabase]);

  function handleEdit() {
    setEditName(name);
    setEditPhone(phone);
    setMessage("");
    setError("");
    setEditMode(true);
  }

  function handleCancel() {
    setEditName(name);
    setEditPhone(phone);
    setMessage("");
    setError("");
    setEditMode(false);
  }

  async function handleSave() {
    const trimmedName =
      editName.trim();

    const trimmedPhone =
      editPhone.trim();

    if (!trimmedName) {
      setError("Full name cannot be empty.");
      return;
    }

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError(
          "Your session has expired. Please log in again."
        );
        setSaving(false);
        return;
      }

      const { error: updateError } =
        await supabase
          .from("profiles")
          .update({
            full_name: trimmedName,
            phone: trimmedPhone || null,
          })
          .eq("id", user.id)
          .eq("role", "team");

      if (updateError) {
        console.error(
          "UPDATE EMPLOYEE PROFILE ERROR:",
          updateError
        );

        setError(updateError.message);
        setSaving(false);
        return;
      }

      setName(trimmedName);
      setPhone(trimmedPhone);

      setEditName(trimmedName);
      setEditPhone(trimmedPhone);

      setEditMode(false);
      setMessage(
        "Your profile has been updated successfully."
      );
    } catch (error) {
      console.error(
        "EMPLOYEE SETTINGS SAVE ERROR:",
        error
      );

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-w-0 bg-[#FCFBF8] p-5 sm:p-6 md:p-8">
      {/* HEADER */}

      <div className="max-w-5xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#D9822B]">
          Employee Portal
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#23272B] sm:text-3xl">
          Settings
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-[#77736D]">
          Manage your employee account and
          security preferences.
        </p>
      </div>

      <div className="mt-8 max-w-5xl space-y-6">
        {/* ACCOUNT */}

        <section className="overflow-hidden rounded-2xl border border-[#E8E2D9] bg-white">
          <div className="flex flex-col gap-4 border-b border-[#E8E2D9] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6E3CC] text-[#B8661A]">
                <User
                  size={18}
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-[#23272B]">
                  Employee account
                </h2>

                <p className="mt-1 text-xs leading-5 text-[#77736D]">
                  Your account information and
                  employee access.
                </p>
              </div>
            </div>

            {!editMode && (
              <button
                type="button"
                onClick={handleEdit}
                disabled={loading}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#23272B] px-5 text-xs font-medium text-white transition-all duration-200 hover:bg-[#D9822B] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Pencil size={13} />
                Edit profile
              </button>
            )}
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
            {/* FULL NAME */}

            <div className="rounded-xl border border-[#E8E2D9] bg-[#FCFBF8] p-4">
              <div className="flex items-center gap-2 text-[#9A958D]">
                <User size={15} />

                <span className="text-xs">
                  Full name
                </span>
              </div>

              {editMode ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(event) =>
                    setEditName(
                      event.target.value
                    )
                  }
                  placeholder="Enter your full name"
                  className="mt-3 h-10 w-full rounded-lg border border-[#23272B]/15 bg-white px-3 text-sm text-[#23272B] outline-none transition-colors duration-150 focus:border-[#D9822B] focus:ring-4 focus:ring-[#D9822B]/10"
                />
              ) : (
                <p className="mt-3 text-sm font-medium text-[#23272B]">
                  {loading
                    ? "Loading..."
                    : name || "Not provided"}
                </p>
              )}
            </div>

            {/* EMAIL */}

            <div className="rounded-xl border border-[#E8E2D9] bg-[#FCFBF8] p-4">
              <div className="flex items-center gap-2 text-[#9A958D]">
                <Mail size={15} />

                <span className="text-xs">
                  Email address
                </span>
              </div>

              <p className="mt-3 truncate text-sm font-medium text-[#23272B]">
                {loading
                  ? "Loading..."
                  : email || "Not available"}
              </p>

              <p className="mt-1 text-[11px] text-[#9A958D]">
                Email is managed through your
                account authentication.
              </p>
            </div>

            {/* PHONE */}

            <div className="rounded-xl border border-[#E8E2D9] bg-[#FCFBF8] p-4">
              <div className="flex items-center gap-2 text-[#9A958D]">
                <User size={15} />

                <span className="text-xs">
                  Phone number
                </span>
              </div>

              {editMode ? (
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(event) =>
                    setEditPhone(
                      event.target.value
                    )
                  }
                  placeholder="Enter your phone number"
                  className="mt-3 h-10 w-full rounded-lg border border-[#23272B]/15 bg-white px-3 text-sm text-[#23272B] outline-none transition-colors duration-150 focus:border-[#D9822B] focus:ring-4 focus:ring-[#D9822B]/10"
                />
              ) : (
                <p className="mt-3 text-sm font-medium text-[#23272B]">
                  {loading
                    ? "Loading..."
                    : phone || "Not provided"}
                </p>
              )}
            </div>

            {/* ROLE */}

            <div className="rounded-xl border border-[#E8E2D9] bg-[#FCFBF8] p-4">
              <div className="flex items-center gap-2 text-[#9A958D]">
                <ShieldCheck size={15} />

                <span className="text-xs">
                  Account role
                </span>
              </div>

              <div className="mt-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#F6E3CC] px-3 py-1.5 text-xs font-medium text-[#B8661A]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D9822B]" />

                  Employee
                </span>
              </div>
            </div>
          </div>

          {/* EDIT ACTIONS */}

          {editMode && (
            <div className="border-t border-[#E8E2D9] px-5 py-4 sm:px-6">
              {error && (
                <div className="mb-4 rounded-lg bg-[#FBF1EE] px-4 py-3">
                  <p className="text-xs text-[#B4432F]">
                    {error}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#23272B]/10 px-5 text-xs font-medium text-[#55514B] transition-colors duration-200 hover:bg-[#F7F5F1] disabled:opacity-50"
                >
                  <X size={14} />
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#23272B] px-5 text-xs font-medium text-white transition-all duration-200 hover:bg-[#D9822B] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Save size={14} />

                  {saving
                    ? "Saving..."
                    : "Save changes"}
                </button>
              </div>
            </div>
          )}

          {/* SUCCESS MESSAGE */}

          {message && !editMode && (
            <div className="border-t border-[#E8E2D9] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2 text-xs text-[#3B6049]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EAF2EC]">
                  <Check
                    size={12}
                    strokeWidth={2}
                  />
                </span>

                {message}
              </div>
            </div>
          )}
        </section>

        {/* SECURITY */}

        <section className="overflow-hidden rounded-2xl border border-[#E8E2D9] bg-white">
          <div className="border-b border-[#E8E2D9] px-5 py-5 sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6E3CC] text-[#B8661A]">
                <Lock
                  size={18}
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-[#23272B]">
                  Security
                </h2>

                <p className="mt-1 text-xs leading-5 text-[#77736D]">
                  Manage access to your employee
                  account.
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
                  Update your employee account
                  password securely.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  window.location.href =
                    "/portal/forgot-password";
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
            <Check
              size={12}
              strokeWidth={2}
            />
          </span>

          Your employee account is active and
          secured.
        </div>
      </div>
    </main>
  );
}