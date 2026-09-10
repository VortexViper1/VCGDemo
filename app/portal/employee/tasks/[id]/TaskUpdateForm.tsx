"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  CheckCircle2,
  Loader2,
  Save,
} from "lucide-react";

type Props = {
  taskId: string;
  initialStatus: string | null;
  initialProgress: number;
};

export default function TaskUpdateForm({
  taskId,
  initialStatus,
  initialProgress,
}: Props) {
  const [status, setStatus] = useState(
    initialStatus || "pending"
  );

  const [progress, setProgress] = useState(
    initialProgress
  );

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleProgressChange = (
    value: number
  ) => {
    setProgress(value);

    if (value === 100) {
      setStatus("completed");
    } else if (
      value > 0 &&
      status === "pending"
    ) {
      setStatus("in_progress");
    }

    setSaved(false);
    setError("");
  };

  const handleStatusChange = (
    value: string
  ) => {
    setStatus(value);

    if (value === "completed") {
      setProgress(100);
    } else if (
      value === "pending" &&
      progress === 100
    ) {
      setProgress(0);
    } else if (
      value === "in_progress" &&
      progress === 0
    ) {
      setProgress(1);
    }

    setSaved(false);
    setError("");
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setError("");

    const supabase = createClient();

    const { error: updateError } =
      await supabase.rpc(
        "update_employee_task",
        {
          p_task_id: taskId,
          p_status: status,
          p_progress: progress,
        }
      );

    if (updateError) {
      console.error(
        "TASK UPDATE ERROR:",
        updateError
      );

      setError(
        updateError.message ||
          "Unable to update task."
      );

      setSaving(false);
      return;
    }

    setSaved(true);
    setSaving(false);

    window.location.reload();
  };

  return (
    <div>
      {/* STATUS */}

      <div>
        <label
          htmlFor="task-status"
          className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#9A958D]"
        >
          Status
        </label>

        <select
          id="task-status"
          value={status}
          onChange={(event) =>
            handleStatusChange(
              event.target.value
            )
          }
          disabled={saving}
          className="mt-2 h-11 w-full rounded-xl border border-[#23272B]/10 bg-[#FCFBF8] px-3 text-sm font-medium text-[#23272B] outline-none transition focus:border-[#D9822B]/50 focus:ring-2 focus:ring-[#D9822B]/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="pending">
            Pending
          </option>

          <option value="in_progress">
            In Progress
          </option>

          <option value="completed">
            Completed
          </option>
        </select>
      </div>

      {/* PROGRESS */}

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <label
            htmlFor="task-progress"
            className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#9A958D]"
          >
            Progress
          </label>

          <span className="text-sm font-semibold text-[#23272B]">
            {progress}%
          </span>
        </div>

        <input
          id="task-progress"
          type="range"
          min="0"
          max="100"
          step="1"
          value={progress}
          onChange={(event) =>
            handleProgressChange(
              Number(event.target.value)
            )
          }
          disabled={saving}
          className="mt-4 w-full accent-[#D9822B] disabled:opacity-60"
        />

        <div className="mt-2 flex justify-between text-[10px] text-[#9A958D]">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {/* PREVIEW */}

      <div className="mt-6 rounded-xl border border-[#23272B]/10 bg-[#FCFBF8] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#9A958D]">
              New status
            </p>

            <p className="mt-1 text-sm font-semibold text-[#23272B]">
              {status === "in_progress"
                ? "In Progress"
                : status
                    .replaceAll("_", " ")
                    .replace(
                      /\b\w/g,
                      (char) =>
                        char.toUpperCase()
                    )}
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3E8D8] text-[#A8732A]">
            <CheckCircle2 size={17} />
          </div>
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#23272B]/10">
          <div
            className="h-full rounded-full bg-[#D9822B] transition-all"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* ERROR */}

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
          {error}
        </div>
      )}

      {/* SAVED */}

      {saved && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#D7E5D9] bg-[#EEF5EF] px-4 py-3 text-xs font-medium text-[#55705A]">
          <CheckCircle2 size={15} />

          Task updated successfully.
        </div>
      )}

      {/* SAVE BUTTON */}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#23272B] px-4 text-sm font-semibold text-white transition-all hover:bg-[#D9822B] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? (
          <>
            <Loader2
              size={16}
              className="animate-spin"
            />

            Saving...
          </>
        ) : (
          <>
            <Save size={16} />

            Update Task
          </>
        )}
      </button>
    </div>
  );
}