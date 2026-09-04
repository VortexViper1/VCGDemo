"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Pencil } from "lucide-react";
import Modal from "@/components/portal/ui/Modal";

type Props = {
  fullName: string;
  phone: string;
};

const inputClass =
  "mt-2 h-11 w-full rounded-lg border border-[#23272B]/15 bg-white px-3.5 text-sm text-[#23272B] outline-none transition-colors duration-150 placeholder:text-[#B5B0A7] focus:border-[#C49A4A] focus:ring-4 focus:ring-[#C49A4A]/12";

export default function EditProfileForm({ fullName, phone }: Props) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(fullName);
  const [phoneNumber, setPhoneNumber] = useState(phone);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave() {
    setLoading(true);
    setMessage("");

    try {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("You are not signed in.");
        setLoading(false);
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: name.trim(),
          phone: phoneNumber.trim(),
        })
        .eq("id", user.id);

      if (error) {
        console.error(error);
        setMessage(error.message);
        setLoading(false);
        return;
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setMessage("");
          setOpen(true);
        }}
        className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#23272B]/10 px-3 text-xs font-medium text-[#55514B] transition-colors duration-150 hover:border-[#C49A4A]/40 hover:bg-[#F7F5F1] hover:text-[#B8661A]"
      >
        <Pencil size={14} />
        Edit Profile
      </button>

      <Modal open={open} onClose={() => setOpen(false)} eyebrow="Account" title="Edit Profile">
        <div className="space-y-5">
          {/* FULL NAME */}
          <div>
            <label className="text-xs font-medium text-[#55514B]">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClass}
              placeholder="Your full name"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-xs font-medium text-[#55514B]">Phone</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              className={inputClass}
              placeholder="Phone number"
            />
          </div>

          {message && (
            <div className="rounded-lg bg-[#FBF1EE] px-4 py-3">
              <p className="text-xs text-[#B4432F]">{message}</p>
            </div>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="h-11 w-full rounded-lg bg-[#23272B] text-sm font-medium text-white transition-colors duration-200 hover:bg-[#D9822B] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </Modal>
    </>
  );
}