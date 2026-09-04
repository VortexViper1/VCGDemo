"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Trash2 } from "lucide-react";
import Modal from "@/components/portal/ui/Modal";

type Props = {
  serviceId: string;
  clientId: string;
  serviceName: string;
};

export default function RemoveClientService({ serviceId, clientId, serviceName }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRemove() {
    setLoading(true);
    setMessage("");

    try {
      const supabase = createClient();

      const { error } = await supabase.from("client_services").delete().eq("id", serviceId);

      if (error) {
        console.error("Remove service error:", error);
        setMessage(error.message);
        setLoading(false);
        return;
      }

      const { error: notificationError } = await supabase.from("notifications").insert({
        user_id: clientId,
        title: "Service removed",
        message: `${serviceName} has been removed from your account.`,
        type: "service",
        read: false,
      });

      if (notificationError) {
        console.error("Notification error:", notificationError);
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
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
        className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#E8C9C2] px-3 text-xs font-medium text-[#B4432F] transition-colors duration-150 hover:bg-[#FBF1EE]"
      >
        <Trash2 size={14} />
        Remove
      </button>

      <Modal open={open} onClose={() => setOpen(false)} eyebrow="Client Service" title="Remove Service?">
        <div>
          <p className="text-sm leading-6 text-[#55514B]">
            Are you sure you want to remove{" "}
            <span className="font-medium text-[#23272B]">{serviceName}</span> from this client?
          </p>

          <p className="mt-3 text-xs leading-5 text-[#77736D]">
            This will remove the service assignment from the client. Their service progress and status for
            this assignment will also be removed.
          </p>

          {message && (
            <div className="mt-5 rounded-lg bg-[#FBF1EE] px-4 py-3">
              <p className="text-xs text-[#B4432F]">{message}</p>
            </div>
          )}

          <div className="mt-7 flex gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="h-11 flex-1 rounded-lg border border-[#23272B]/10 text-sm font-medium text-[#55514B] transition-colors duration-150 hover:bg-[#F7F5F1] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleRemove}
              disabled={loading}
              className="h-11 flex-1 rounded-lg bg-[#B4432F] text-sm font-medium text-white transition-colors duration-200 hover:bg-[#9C3827] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Removing..." : "Remove Service"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}