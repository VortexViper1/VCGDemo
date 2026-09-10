import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  ArrowUpRight,
  CheckCircle2,
  ClipboardList,
  Clock3,
  LoaderCircle,
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

export default async function EmployeeDashboard() {
  const supabase = await createClient();

  // --------------------------------------------------
  // CHECK LOGGED-IN USER
  // --------------------------------------------------

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  // --------------------------------------------------
  // CHECK EMPLOYEE ROLE
  // --------------------------------------------------

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "team") {
    redirect("/portal/dashboard");
  }

  // --------------------------------------------------
  // GET EMPLOYEE TASKS
  // --------------------------------------------------

  const {
    data: taskData,
    error: tasksError,
  } = await supabase
    .from("tasks")
    .select(
      `
        id,
        client_service_id,
        title,
        status,
        due_date,
        created_at
      `
    )
    .eq("assigned_to", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (tasksError) {
    console.error(
      "EMPLOYEE TASKS ERROR:",
      tasksError
    );
  }

  const tasks: Task[] = taskData ?? [];

  // --------------------------------------------------
  // GET CLIENT SERVICES
  // --------------------------------------------------

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
      .select(
        `
          id,
          client_id,
          progress,
          status,
          start_date,
          task_id
        `
      )
      .in("id", clientServiceIds);

    if (error) {
      console.error(
        "EMPLOYEE CLIENT SERVICES ERROR:",
        error
      );
    }

    clientServices = data ?? [];
  }

  // --------------------------------------------------
  // GET EMPLOYEE CLIENTS
  // --------------------------------------------------

  const {
    data: employeeClients,
    error: clientsError,
  } = await supabase.rpc(
    "get_employee_clients"
  );

  if (clientsError) {
    console.error(
      "EMPLOYEE CLIENTS ERROR:",
      clientsError
    );
  }

  const clients: Client[] =
    employeeClients ?? [];

  // --------------------------------------------------
  // GET SERVICE TASKS
  // --------------------------------------------------

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
      .select(
        `
          id,
          service_id,
          name
        `
      )
      .in("id", serviceTaskIds);

    if (error) {
      console.error(
        "EMPLOYEE SERVICE TASKS ERROR:",
        error
      );
    }

    serviceTasks = data ?? [];
  }

  // --------------------------------------------------
  // GET MAIN SERVICES
  // --------------------------------------------------

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

  // --------------------------------------------------
  // LOOKUP HELPERS
  // --------------------------------------------------

  const getClientService = (id: string) => {
    return clientServices.find(
      (item) => item.id === id
    );
  };

  const getClient = (id: string) => {
    return clients.find(
      (item) => item.id === id
    );
  };

  const getServiceTask = (
    id: string | null
  ) => {
    return serviceTasks.find(
      (item) => item.id === id
    );
  };

  const getService = (
    taskId: string | null
  ) => {
    const task =
      getServiceTask(taskId);

    if (!task?.service_id) {
      return null;
    }

    return services.find(
      (service) =>
        service.id === task.service_id
    );
  };

  // --------------------------------------------------
  // STATUS HELPERS
  // --------------------------------------------------

  const isCompleted = (
    status: string | null
  ) => {
    const value =
      status?.toLowerCase();

    return (
      value === "completed" ||
      value === "complete" ||
      value === "done"
    );
  };

  const isInProgress = (
    status: string | null
  ) => {
    const value =
      status?.toLowerCase();

    return (
      value === "in_progress" ||
      value === "in progress"
    );
  };

  const formatStatus = (
    status: string | null
  ) => {
    if (!status) {
      return "Pending";
    }

    return status
      .replaceAll("_", " ")
      .replace(
        /\b\w/g,
        (char) => char.toUpperCase()
      );
  };

  // --------------------------------------------------
  // DASHBOARD STATS
  // --------------------------------------------------

  const completedTasks =
    tasks.filter((task) =>
      isCompleted(task.status)
    ).length;

  const inProgressTasks =
    tasks.filter((task) =>
      isInProgress(task.status)
    ).length;

  const pendingTasks =
    tasks.length -
    completedTasks -
    inProgressTasks;

  const firstName =
    profile.full_name
      ?.trim()
      ?.split(" ")[0] || "there";

  return (
    <main className="min-w-0 bg-[#FCFBF8] p-5 pt-7 md:p-8">
      {/* HEADER */}

      <section className="mb-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D9822B]">
          Employee Workspace
        </p>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-[-0.025em] text-[#23272B] md:text-3xl">
              Good to see you, {firstName}.
            </h1>

            <p className="mt-1 text-sm text-[#77736D]">
              Here&apos;s an overview of the work
              assigned to you.
            </p>
          </div>

          <Link
            href="/portal/employee/tasks"
            className="group inline-flex h-10 w-fit items-center gap-2 rounded-xl border border-[#23272B]/10 bg-white px-4 text-sm font-semibold text-[#23272B] transition-all hover:-translate-y-0.5 hover:border-[#D9822B]/30 hover:text-[#D9822B]"
          >
            View all tasks

            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </section>

      {/* STATS */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Tasks"
          value={tasks.length}
          icon={
            <ClipboardList
              size={19}
              strokeWidth={1.7}
            />
          }
        />

        <StatCard
          label="Pending"
          value={pendingTasks}
          icon={
            <Clock3
              size={19}
              strokeWidth={1.7}
            />
          }
        />

        <StatCard
          label="In Progress"
          value={inProgressTasks}
          icon={
            <LoaderCircle
              size={19}
              strokeWidth={1.7}
            />
          }
        />

        <StatCard
          label="Completed"
          value={completedTasks}
          icon={
            <CheckCircle2
              size={19}
              strokeWidth={1.7}
            />
          }
        />
      </section>

      {/* RECENT WORK */}

      <section className="mt-8 overflow-hidden rounded-2xl border border-[#23272B]/10 bg-white shadow-[0_8px_30px_rgba(35,39,43,0.03)]">
        <div className="flex flex-col gap-3 border-b border-[#23272B]/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <div>
            <h2 className="text-base font-semibold text-[#23272B]">
              Recent Work
            </h2>

            <p className="mt-1 text-xs text-[#77736D]">
              Your latest assigned tasks.
            </p>
          </div>

          <Link
            href="/portal/employee/tasks"
            className="text-sm font-semibold text-[#A8732A] transition-colors hover:text-[#D9822B]"
          >
            View all
          </Link>
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
              No tasks assigned yet
            </p>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#77736D]">
              Tasks assigned to you by the
              administration team will appear
              here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#23272B]/10">
            {tasks
              .slice(0, 6)
              .map((task) => {
                const clientService =
                  getClientService(
                    task.client_service_id
                  );

                const client =
                  clientService
                    ? getClient(
                        clientService.client_id
                      )
                    : null;

                const serviceTask =
                  getServiceTask(
                    clientService?.task_id ??
                      null
                  );

                const service =
                  getService(
                    clientService?.task_id ??
                      null
                  );

                const completed =
                  isCompleted(task.status);

                const inProgress =
                  isInProgress(task.status);

                const progress =
                  Math.min(
                    Math.max(
                      clientService?.progress ??
                        0,
                      0
                    ),
                    100
                  );

                return (
                  <Link
                    key={task.id}
                    href={`/portal/employee/tasks/${task.id}`}
                    className="block px-5 py-5 transition-colors hover:bg-[#FCFBF8] md:px-6"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="break-words text-sm font-semibold text-[#23272B]">
                            {task.title ||
                              "Untitled Task"}
                          </h3>

                          <span
                            className={
                              completed
                                ? "rounded-full bg-[#EEF5EF] px-2.5 py-1 text-[10px] font-semibold text-[#55705A]"
                                : inProgress
                                ? "rounded-full bg-[#F3E8D8] px-2.5 py-1 text-[10px] font-semibold text-[#A8732A]"
                                : "rounded-full bg-[#F1F0EE] px-2.5 py-1 text-[10px] font-semibold text-[#77736D]"
                            }
                          >
                            {formatStatus(
                              task.status
                            )}
                          </span>
                        </div>

                        <div className="mt-3 grid gap-3 sm:grid-cols-3">
                          <InfoItem
                            label="Client"
                            value={
                              client?.full_name ||
                              "Unnamed Client"
                            }
                          />

                          <InfoItem
                            label="Service"
                            value={
                              service?.name ||
                              "Service unavailable"
                            }
                          />

                          <InfoItem
                            label="Subtask"
                            value={
                              serviceTask?.name ||
                              "No subtask"
                            }
                          />
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col gap-2 lg:items-end">
                        {task.due_date && (
                          <span className="text-xs text-[#77736D]">
                            Due{" "}
                            {new Date(
                              `${task.due_date}T00:00:00`
                            ).toLocaleDateString()}
                          </span>
                        )}

                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-[#23272B]/10">
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

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#23272B]/10 bg-white p-5 shadow-[0_8px_25px_rgba(35,39,43,0.03)]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#77736D]">
          {label}
        </p>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3E8D8] text-[#A8732A]">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#23272B]">
        {value}
      </p>
    </div>
  );
}

function InfoItem({
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