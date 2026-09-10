import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Search,
} from "lucide-react";

type Task = {
  id: string;
  client_service_id: string;
  title: string | null;
  status: string | null;
  due_date: string | null;
  created_at: string;
};

type ClientService = {
  id: string;
  client_id: string;
  progress: number | null;
  status: string | null;
  start_date: string | null;
  task_id: string | null;
};

type Client = {
  id: string;
  full_name: string | null;
};

type ServiceTask = {
  id: string;
  service_id: string | null;
  name: string | null;
};

type Service = {
  id: string;
  name: string | null;
};

export default async function EmployeeTasksPage() {
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

  /* ---------------- TASKS ---------------- */

  const { data: taskData, error: tasksError } = await supabase
    .from("tasks")
    .select(`
      id,
      client_service_id,
      title,
      status,
      due_date,
      created_at
    `)
    .eq("assigned_to", user.id)
    .order("created_at", { ascending: false });

  if (tasksError) {
    console.error("EMPLOYEE TASKS ERROR:", tasksError);
  }

  const tasks: Task[] = taskData ?? [];

  /* ---------------- CLIENT SERVICES ---------------- */

  const clientServiceIds = [
    ...new Set(
      tasks
        .map((task) => task.client_service_id)
        .filter(Boolean)
    ),
  ];

  let clientServices: ClientService[] = [];

  if (clientServiceIds.length > 0) {
    const { data, error } = await supabase
      .from("client_services")
      .select(`
        id,
        client_id,
        progress,
        status,
        start_date,
        task_id
      `)
      .in("id", clientServiceIds);

    if (error) {
      console.error(
        "EMPLOYEE CLIENT SERVICES ERROR:",
        error
      );
    }

    clientServices = data ?? [];
  }

  /* ---------------- CLIENTS ---------------- */

  const { data: employeeClients, error: clientsError } =
    await supabase.rpc("get_employee_clients");

  if (clientsError) {
    console.error(
      "EMPLOYEE CLIENTS ERROR:",
      clientsError
    );
  }

  const clients: Client[] = employeeClients ?? [];

  /* ---------------- SERVICE TASKS ---------------- */

  const serviceTaskIds = [
    ...new Set(
      clientServices
        .map((item) => item.task_id)
        .filter(Boolean)
    ),
  ];

  let serviceTasks: ServiceTask[] = [];

  if (serviceTaskIds.length > 0) {
    const { data, error } = await supabase
      .from("service_tasks")
      .select(`
        id,
        service_id,
        name
      `)
      .in("id", serviceTaskIds);

    if (error) {
      console.error(
        "EMPLOYEE SERVICE TASKS ERROR:",
        error
      );
    }

    serviceTasks = data ?? [];
  }

  /* ---------------- SERVICES ---------------- */

  const serviceIds = [
    ...new Set(
      serviceTasks
        .map((item) => item.service_id)
        .filter(Boolean)
    ),
  ];

  let services: Service[] = [];

  if (serviceIds.length > 0) {
    const { data, error } = await supabase
      .from("services")
      .select("id, name")
      .in("id", serviceIds);

    if (error) {
      console.error(
        "EMPLOYEE SERVICES ERROR:",
        error
      );
    }

    services = data ?? [];
  }

  /* ---------------- LOOKUPS ---------------- */

  const clientServiceMap = new Map(
    clientServices.map((item) => [item.id, item])
  );

  const clientMap = new Map(
    clients.map((client) => [client.id, client])
  );

  const serviceTaskMap = new Map(
    serviceTasks.map((task) => [task.id, task])
  );

  const serviceMap = new Map(
    services.map((service) => [service.id, service])
  );

  /* ---------------- HELPERS ---------------- */

  const isCompleted = (status: string | null) => {
    const value = status?.toLowerCase();

    return (
      value === "completed" ||
      value === "complete" ||
      value === "done"
    );
  };

  const formatStatus = (status: string | null) => {
    if (!status) {
      return "Pending";
    }

    return status
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const completedCount = tasks.filter((task) =>
    isCompleted(task.status)
  ).length;

  const pendingCount = tasks.length - completedCount;

  return (
    <main className="min-w-0 bg-[#FCFBF8] p-5 pt-7 md:p-8">
      {/* HEADER */}

      <section className="mb-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D9822B]">
          Employee Workspace
        </p>

        <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-[-0.025em] text-[#23272B] md:text-3xl">
              My Tasks
            </h1>

            <p className="mt-1 text-sm text-[#77736D]">
              View and track the work assigned to you.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <SummaryPill
              icon={<ClipboardList size={14} />}
              label="Total"
              value={tasks.length}
            />

            <SummaryPill
              icon={<Clock3 size={14} />}
              label="Pending"
              value={pendingCount}
            />

            <SummaryPill
              icon={<CheckCircle2 size={14} />}
              label="Completed"
              value={completedCount}
            />
          </div>
        </div>
      </section>

      {/* SEARCH / FILTER BAR */}


      {/* TASK LIST */}

      <section className="overflow-hidden rounded-2xl border border-[#23272B]/10 bg-white shadow-[0_8px_30px_rgba(35,39,43,0.03)]">
        <div className="border-b border-[#23272B]/10 px-5 py-5 md:px-6">
          <h2 className="text-base font-semibold text-[#23272B]">
            Assigned Tasks
          </h2>

          <p className="mt-1 text-xs text-[#77736D]">
            Tasks currently assigned to you.
          </p>
        </div>

        {tasks.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7F5F1]">
              <ClipboardList
                size={27}
                strokeWidth={1.5}
                className="text-[#9A958D]"
              />
            </div>

            <p className="mt-4 text-sm font-semibold text-[#23272B]">
              No tasks assigned
            </p>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#77736D]">
              Tasks assigned to you by the administration team
              will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#23272B]/10">
            {tasks.map((task) => {
              const clientService =
                clientServiceMap.get(task.client_service_id);

              const client = clientService
                ? clientMap.get(clientService.client_id)
                : null;

              const serviceTask = clientService?.task_id
                ? serviceTaskMap.get(clientService.task_id)
                : null;

              const service =
                serviceTask?.service_id
                  ? serviceMap.get(serviceTask.service_id)
                  : null;

              const completed = isCompleted(task.status);

              const progress = Math.min(
                Math.max(
                  clientService?.progress ?? 0,
                  0
                ),
                100
              );

              return (
                <Link
                  key={task.id}
                  href={`/portal/employee/tasks/${task.id}`}
                  className="group block px-5 py-5 transition-colors hover:bg-[#FCFBF8] md:px-6"
                >
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    {/* MAIN INFO */}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="break-words text-sm font-semibold text-[#23272B] transition-colors group-hover:text-[#D9822B]">
                          {task.title || "Untitled Task"}
                        </h3>

                        <span
                          className={
                            completed
                              ? "rounded-full bg-[#EEF5EF] px-2.5 py-1 text-[10px] font-semibold text-[#55705A]"
                              : "rounded-full bg-[#F3E8D8] px-2.5 py-1 text-[10px] font-semibold text-[#A8732A]"
                          }
                        >
                          {formatStatus(task.status)}
                        </span>
                      </div>

                      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <TaskInfo
                          label="Client"
                          value={
                            client?.full_name ||
                            "Unnamed Client"
                          }
                        />

                        <TaskInfo
                          label="Service"
                          value={
                            service?.name ||
                            "Service unavailable"
                          }
                        />

                        <TaskInfo
                          label="Subtask"
                          value={
                            serviceTask?.name ||
                            "No subtask"
                          }
                        />

                        <TaskInfo
                          label="Due"
                          value={
                            task.due_date
                              ? new Date(
                                  `${task.due_date}T00:00:00`
                                ).toLocaleDateString()
                              : "No due date"
                          }
                        />
                      </div>
                    </div>

                    {/* PROGRESS */}

                    <div className="flex shrink-0 items-center gap-4 xl:w-40 xl:flex-col xl:items-end">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[#23272B]/10">
                          <div
                            className="h-full rounded-full bg-[#D9822B]"
                            style={{
                              width: `${progress}%`,
                            }}
                          />
                        </div>

                        <span className="text-[11px] font-medium text-[#77736D]">
                          {progress}%
                        </span>
                      </div>

                      <ArrowUpRight
                        size={16}
                        className="text-[#9A958D] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#D9822B]"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

function SummaryPill({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-[#23272B]/10 bg-white px-3 py-2">
      <span className="text-[#A8732A]">
        {icon}
      </span>

      <span className="text-xs text-[#77736D]">
        {label}
      </span>

      <span className="text-xs font-semibold text-[#23272B]">
        {value}
      </span>
    </div>
  );
}

function TaskInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#9A958D]">
        {label}
      </p>

      <p className="mt-1 truncate text-xs font-medium text-[#4B4A47]">
        {value}
      </p>
    </div>
  );
}