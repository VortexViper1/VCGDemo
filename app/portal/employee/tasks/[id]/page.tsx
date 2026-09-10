import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TaskUpdateForm from "./TaskUpdateForm";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  UserRound,
  BriefcaseBusiness,
} from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EmployeeTaskDetails({
  params,
}: Props) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "team") {
    redirect("/portal/dashboard");
  }

  /* ---------------- TASK ---------------- */

  const { data: task, error: taskError } = await supabase
    .from("tasks")
    .select(`
      id,
      client_service_id,
      title,
      status,
      due_date,
      created_at,
      assigned_to
    `)
    .eq("id", id)
    .eq("assigned_to", user.id)
    .single();

  if (taskError || !task) {
    notFound();
  }

  /* ---------------- CLIENT SERVICE ---------------- */

  const { data: clientService, error: clientServiceError } =
    await supabase
      .from("client_services")
      .select(`
        id,
        client_id,
        progress,
        status,
        start_date,
        task_id
      `)
      .eq("id", task.client_service_id)
      .single();

  if (clientServiceError || !clientService) {
    notFound();
  }

  /* ---------------- CLIENT ---------------- */

  const { data: clientData, error: clientError } =
    await supabase.rpc("get_employee_clients");

  if (clientError) {
    console.error(
      "EMPLOYEE CLIENT ERROR:",
      clientError
    );
  }

  const client = (clientData ?? []).find(
    (item: { id: string; full_name: string | null }) =>
      item.id === clientService.client_id
  );

  /* ---------------- SERVICE TASK ---------------- */

  let serviceTask: {
    id: string;
    service_id: string | null;
    name: string | null;
    description: string | null;
  } | null = null;

  if (clientService.task_id) {
    const { data, error } = await supabase
      .from("service_tasks")
      .select(`
        id,
        service_id,
        name,
        description
      `)
      .eq("id", clientService.task_id)
      .single();

    if (error) {
      console.error(
        "EMPLOYEE SERVICE TASK ERROR:",
        error
      );
    }

    serviceTask = data;
  }

  /* ---------------- SERVICE ---------------- */

  let service: {
    id: string;
    name: string | null;
  } | null = null;

  if (serviceTask?.service_id) {
    const { data, error } = await supabase
      .from("services")
      .select("id, name")
      .eq("id", serviceTask.service_id)
      .single();

    if (error) {
      console.error(
        "EMPLOYEE SERVICE ERROR:",
        error
      );
    }

    service = data;
  }

  /* ---------------- DISPLAY VALUES ---------------- */

  const progress = Math.min(
    Math.max(clientService.progress ?? 0, 0),
    100
  );

  const status =
    task.status?.toLowerCase() || "pending";

  const isCompleted =
    status === "completed" ||
    status === "complete" ||
    status === "done";

  const formatStatus = (value: string | null) => {
    if (!value) {
      return "Pending";
    }

    return value
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };

  return (
    <main className="min-w-0 bg-[#FCFBF8] p-5 pt-7 md:p-8">
      {/* BACK */}

      <Link
        href="/portal/employee/tasks"
        className="group inline-flex items-center gap-2 text-sm font-medium text-[#77736D] transition-colors hover:text-[#D9822B]"
      >
        <ArrowLeft
          size={16}
          className="transition-transform group-hover:-translate-x-0.5"
        />

        Back to My Tasks
      </Link>

      {/* HEADER */}

      <section className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D9822B]">
          Task Details
        </p>

        <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="break-words text-2xl font-semibold tracking-[-0.025em] text-[#23272B] md:text-3xl">
                {task.title || "Untitled Task"}
              </h1>

              <span
                className={
                  isCompleted
                    ? "rounded-full bg-[#EEF5EF] px-3 py-1.5 text-[11px] font-semibold text-[#55705A]"
                    : "rounded-full bg-[#F3E8D8] px-3 py-1.5 text-[11px] font-semibold text-[#A8732A]"
                }
              >
                {formatStatus(task.status)}
              </span>
            </div>

            <p className="mt-2 text-sm text-[#77736D]">
              Review the assigned work and keep its progress
              up to date.
            </p>
          </div>

          {task.due_date && (
            <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#23272B]/10 bg-white px-4 py-2.5 text-xs font-medium text-[#77736D]">
              <CalendarDays size={15} />

              Due{" "}
              {new Date(
                `${task.due_date}T00:00:00`
              ).toLocaleDateString()}
            </div>
          )}
        </div>
      </section>

      {/* OVERVIEW */}

      <section className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          icon={<UserRound size={18} />}
          label="Client"
          value={
            client?.full_name ||
            "Unnamed Client"
          }
        />

        <InfoCard
          icon={<BriefcaseBusiness size={18} />}
          label="Service"
          value={
            service?.name ||
            "Service unavailable"
          }
        />

        <InfoCard
          icon={<ClipboardList size={18} />}
          label="Subtask"
          value={
            serviceTask?.name ||
            "No subtask"
          }
        />

        <InfoCard
          icon={<Clock3 size={18} />}
          label="Task Status"
          value={formatStatus(task.status)}
        />
      </section>

      {/* PROGRESS */}

      <section className="mt-6 rounded-2xl border border-[#23272B]/10 bg-white p-5 shadow-[0_8px_30px_rgba(35,39,43,0.03)] md:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#23272B]">
              Service Progress
            </h2>

            <p className="mt-1 text-xs text-[#77736D]">
              Current progress for the client service.
            </p>
          </div>

          <span className="text-2xl font-semibold text-[#23272B]">
            {progress}%
          </span>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#23272B]/10">
          <div
            className="h-full rounded-full bg-[#D9822B] transition-all"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="mt-4 flex justify-between text-[11px] text-[#9A958D]">
          <span>Started</span>
          <span>In progress</span>
          <span>Complete</span>
        </div>
      </section>

      {/* TASK INFORMATION */}

      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-[#23272B]/10 bg-white p-5 shadow-[0_8px_30px_rgba(35,39,43,0.03)] md:p-6">
          <h2 className="text-base font-semibold text-[#23272B]">
            Work Information
          </h2>

          <div className="mt-5 space-y-5">
            <DetailRow
              label="Task"
              value={task.title || "Untitled Task"}
            />

            <DetailRow
              label="Client"
              value={
                client?.full_name ||
                "Unnamed Client"
              }
            />

            <DetailRow
              label="Main Service"
              value={
                service?.name ||
                "Service unavailable"
              }
            />

            <DetailRow
              label="Subtask"
              value={
                serviceTask?.name ||
                "No subtask"
              }
            />

            {serviceTask?.description && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#9A958D]">
                  Description
                </p>

                <p className="mt-2 text-sm leading-6 text-[#4B4A47]">
                  {serviceTask.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* UPDATE PANEL */}
<div className="rounded-2xl border border-[#23272B]/10 bg-white p-5 shadow-[0_8px_30px_rgba(35,39,43,0.03)] md:p-6">
  <h2 className="text-base font-semibold text-[#23272B]">
    Update Task
  </h2>

  <p className="mt-1 text-xs leading-5 text-[#77736D]">
    Update the task status and current service progress.
  </p>

  <div className="mt-6">
    <TaskUpdateForm
      taskId={task.id}
      initialStatus={task.status}
      initialProgress={progress}
    />
  </div>
</div>
      </section>

      {/* CREATED */}

      <div className="mt-6 flex items-center gap-2 text-xs text-[#9A958D]">
        <CheckCircle2 size={14} />

        Created{" "}
        {new Date(task.created_at).toLocaleDateString()}
      </div>
    </main>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#23272B]/10 bg-white p-5 shadow-[0_8px_25px_rgba(35,39,43,0.03)]">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F3E8D8] text-[#A8732A]">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#9A958D]">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-semibold text-[#23272B]">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-[#23272B]/10 pb-4 last:border-0 last:pb-0">
      <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#9A958D]">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-medium text-[#4B4A47]">
        {value}
      </p>
    </div>
  );
}