"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus } from "lucide-react";
import Modal from "@/components/portal/ui/Modal";
import ProgressBar from "@/components/portal/ui/ProgressBar";

type Service = {
  id: string;
  name: string;
};

type Props = {
  clientId: string;
  services: Service[];
};

const inputClass =
  "mt-2 h-11 w-full rounded-lg border border-[#23272B]/15 bg-white px-3.5 text-sm text-[#23272B] outline-none transition-colors duration-150 focus:border-[#C49A4A] focus:ring-4 focus:ring-[#C49A4A]/12";

export default function AssignServiceForm({
  clientId,
  services,
}: Props) {
  const [open, setOpen] = useState(false);

  const [serviceId, setServiceId] = useState("");
  const [taskName, setTaskName] = useState("");

  const [status, setStatus] = useState("pending");
  const [progress, setProgress] = useState("0");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleAssign() {
    if (!serviceId) {
      setMessage("Please select a main service.");
      return;
    }

    const trimmedTaskName = taskName.trim();

    if (!trimmedTaskName) {
      setMessage("Please enter a service task.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const supabase = createClient();

      /*
       * STEP 1
       * Create the custom task under the selected main service.
       */
const { data: taskData, error: taskError } = await supabase
  .rpc("create_service_task", {
    p_service_id: serviceId,
    p_name: trimmedTaskName,
    p_description: null,
  });

if (taskError || !taskData || taskData.length === 0) {
  console.error("Create task error:", taskError);
  setMessage(taskError?.message || "Failed to create service task.");
  setLoading(false);
  return;
}

const task = taskData[0];

const { data: assignmentId, error: assignmentError } =
  await supabase.rpc("create_client_service_assignment", {
    p_client_id: clientId,
    p_task_id: task.id,
    p_status: status,
    p_progress: Number(progress),
    p_start_date: new Date()
      .toISOString()
      .split("T")[0],
  });

      if (assignmentError) {
        console.error(
          "Assign service error:",
          assignmentError
        );
        setMessage(assignmentError.message);
        setLoading(false);
        return;
      }

      /*
       * STEP 3
       * Notify the client.
       */
      const selectedService = services.find(
        (service) => service.id === serviceId
      );

      const { error: notificationError } =
        await supabase.from("notifications").insert({
          user_id: clientId,
          title: "New service assigned",
          message: `${trimmedTaskName} has been added under ${
            selectedService?.name ?? "your services"
          }.`,
          type: "service",
          read: false,
        });

      if (notificationError) {
        console.error(
          "Notification error:",
          notificationError
        );
      }

      /*
       * STEP 4
       * Refresh the client details page.
       */
      window.location.reload();
    } catch (error) {
      console.error(error);
      setMessage(
        "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  }

  function handleClose() {
    if (loading) return;

    setOpen(false);
    setServiceId("");
    setTaskName("");
    setStatus("pending");
    setProgress("0");
    setMessage("");
  }

  return (
    <>
      {/* ASSIGN SERVICE BUTTON */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#23272B] px-4 text-xs font-medium text-white transition-colors duration-200 hover:bg-[#D9822B]"
      >
        <Plus size={15} />
        Assign Service
      </button>

      {/* ASSIGN SERVICE MODAL */}
      <Modal
        open={open}
        onClose={handleClose}
        eyebrow="Client Service"
        title="Assign Service"
      >
        <div className="space-y-5">
          {/* MAIN SERVICE */}
          <div>
            <label className="text-xs font-medium text-[#55514B]">
              Main Service
            </label>

            <select
              value={serviceId}
              onChange={(e) => {
                setServiceId(e.target.value);
                setMessage("");
              }}
              className={inputClass}
            >
              <option value="">
                Select a main service
              </option>

              {services.map((service) => (
                <option
                  key={service.id}
                  value={service.id}
                >
                  {service.name}
                </option>
              ))}
            </select>

            {services.length === 0 && (
              <p className="mt-2 text-xs text-[#B4432F]">
                No main services are available.
              </p>
            )}
          </div>

          {/* CUSTOM SERVICE TASK */}
          <div>
            <label className="text-xs font-medium text-[#55514B]">
              Service Task
            </label>

            <input
              type="text"
              value={taskName}
              onChange={(e) => {
                setTaskName(e.target.value);
                setMessage("");
              }}
              placeholder="Enter service task"
              className={inputClass}
              maxLength={150}
            />

            <p className="mt-2 text-[11px] text-[#9A958D]">
              Enter the specific service or task to be
              completed for this client.
            </p>
          </div>

          {/* STATUS */}
          <div>
            <label className="text-xs font-medium text-[#55514B]">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className={inputClass}
            >
              <option value="pending">
                Pending
              </option>

              <option value="confirmed">
                Confirmed
              </option>

              <option value="in_progress">
                In Progress
              </option>

              <option value="review">
                Review
              </option>

              <option value="completed">
                Completed
              </option>
            </select>
          </div>

          {/* PROGRESS */}
          <div>
            <div className="flex justify-between">
              <label className="text-xs font-medium text-[#55514B]">
                Progress
              </label>

              <span className="text-xs font-medium tabular-nums text-[#77736D]">
                {progress}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) =>
                setProgress(e.target.value)
              }
              className="mt-3 w-full accent-[#C49A4A]"
            />

            <ProgressBar
              value={Number(progress)}
              showLabel={false}
              className="mt-2"
            />
          </div>

          {/* ERROR MESSAGE */}
          {message && (
            <div className="rounded-lg bg-[#FBF1EE] px-4 py-3">
              <p className="text-xs text-[#B4432F]">
                {message}
              </p>
            </div>
          )}

          {/* ASSIGN */}
          <button
            type="button"
            onClick={handleAssign}
            disabled={
              loading ||
              services.length === 0 ||
              !serviceId ||
              !taskName.trim()
            }
            className="h-11 w-full rounded-lg bg-[#23272B] text-sm font-medium text-white transition-colors duration-200 hover:bg-[#D9822B] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Assigning..."
              : "Assign Service"}
          </button>
        </div>
      </Modal>
    </>
  );
}