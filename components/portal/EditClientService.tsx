"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Pencil } from "lucide-react";
import Modal from "@/components/portal/ui/Modal";
import ProgressBar from "@/components/portal/ui/ProgressBar";
import StatusBadge from "@/components/portal/ui/StatusBadge";

type Props = {
  serviceId: string;
  clientId: string;
  serviceName: string;
  initialStatus: string;
  initialProgress: number;
};

const inputClass =
  "mt-2 h-11 w-full rounded-lg border border-[#23272B]/15 bg-white px-3.5 text-sm text-[#23272B] outline-none transition-colors duration-150 focus:border-[#C49A4A] focus:ring-4 focus:ring-[#C49A4A]/12";

export default function EditClientService({
  serviceId,
  clientId,
  serviceName,
  initialStatus,
  initialProgress,
}: Props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(initialStatus);
  const [progress, setProgress] = useState(String(initialProgress));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUpdate() {
    setLoading(true);
    setMessage("");

    try {
      const supabase = createClient();
      const newProgress = Number(progress);

      const { error } = await supabase
        .from("client_services")
        .update({ status, progress: newProgress })
        .eq("id", serviceId);

      if (error) {
        console.error("Update service error:", error);
        setMessage(error.message);
        setLoading(false);
        return;
      }

      let notificationTitle = "Service updated";
      let notificationMessage = `${serviceName} has been updated.`;

      if (status === "completed") {
        notificationTitle = "Service completed 🎉";
        notificationMessage = `${serviceName} has been marked as completed.`;
      } else if (status !== initialStatus) {
        notificationTitle = "Service status updated";
        notificationMessage = `${serviceName} status is now ${status.replace("_", " ")}.`;
      } else if (newProgress !== initialProgress) {
        notificationTitle = "Service progress updated";
        notificationMessage = `${serviceName} is now ${newProgress}% complete.`;
      }

      const { error: notificationError } = await supabase.from("notifications").insert({
        user_id: clientId,
        title: notificationTitle,
        message: notificationMessage,
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
        className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#23272B]/10 px-3 text-xs font-medium text-[#55514B] transition-colors duration-150 hover:border-[#C49A4A]/40 hover:bg-[#F7F5F1] hover:text-[#B8661A]"
      >
        <Pencil size={14} />
        Edit
      </button>

      <Modal open={open} onClose={() => setOpen(false)} eyebrow="Client Service" title="Update Service" subtitle={serviceName}>
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-[#55514B]">Status</label>
              <StatusBadge status={status} />
            </div>

            <select value={status} onChange={(event) => setStatus(event.target.value)} className={inputClass}>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="in_progress">In Progress</option>
              <option value="review">Review</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between">
              <label className="text-xs font-medium text-[#55514B]">Progress</label>
              <span className="text-xs font-medium tabular-nums text-[#77736D]">{progress}%</span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(event) => setProgress(event.target.value)}
              className="mt-3 w-full accent-[#C49A4A]"
            />

            <ProgressBar value={Number(progress)} showLabel={false} className="mt-2" />
          </div>

          {message && (
            <div className="rounded-lg bg-[#FBF1EE] px-4 py-3">
              <p className="text-xs text-[#B4432F]">{message}</p>
            </div>
          )}

          <button
            type="button"
            onClick={handleUpdate}
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