import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  UserRound,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";

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
  task_id: string | null;
  status: string | null;
  progress: number | null;
  start_date: string | null;
};

type ServiceTask = {
  id: string;
  service_id: string;
  name: string;
  description: string | null;
};

type Service = {
  id: string;
  name: string;
  description: string | null;
};

type Client = {
  id: string;
  full_name: string | null;
};

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-[#F1F0EE] text-[#77736D]",
  in_progress: "bg-[#F6E3CC] text-[#B8661A]",
  completed: "bg-[#EAF4EC] text-[#3C7A4B]",
  on_hold: "bg-[#FBEAEA] text-[#B24545]",
  review: "bg-[#F3EEF8] text-[#73558F]",
};

function statusClass(status: string | null) {
  return (
    STATUS_STYLES[status ?? ""] ??
    "bg-[#F1F0EE] text-[#77736D]"
  );
}

function formatStatus(status: string | null) {
  if (!status) return "Unknown";

  return status.replace(/_/g, " ");
}

function formatDate(date: string | null) {
  if (!date) return "Not set";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

export default async function EmployeeServicesPage() {
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
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "team") {
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
      "EMPLOYEE SERVICES TASKS ERROR:",
      JSON.stringify(tasksError, null, 2)
    );
  }

  const tasks: Task[] = taskData ?? [];

  // --------------------------------------------------
  // GET CLIENT SERVICES
  // --------------------------------------------------

  const clientServiceIds = Array.from(
    new Set(
      tasks
        .map((task) => task.client_service_id)
        .filter(Boolean)
    )
  );

  let clientServices: ClientService[] = [];

  if (clientServiceIds.length > 0) {
    const {
      data: clientServiceData,
      error: clientServicesError,
    } = await supabase
      .from("client_services")
      .select(
        `
          id,
          client_id,
          task_id,
          status,
          progress,
          start_date
        `
      )
      .in("id", clientServiceIds);

    if (clientServicesError) {
      console.error(
        "EMPLOYEE SERVICES CLIENT SERVICES ERROR:",
        JSON.stringify(
          clientServicesError,
          null,
          2
        )
      );
    }

    clientServices = clientServiceData ?? [];
  }

  // --------------------------------------------------
  // GET SERVICE TASKS
  // --------------------------------------------------

  const taskDefinitionIds = Array.from(
    new Set(
      clientServices
        .map((service) => service.task_id)
        .filter(Boolean) as string[]
    )
  );

  let serviceTasks: ServiceTask[] = [];

  if (taskDefinitionIds.length > 0) {
    const {
      data: serviceTaskData,
      error: serviceTasksError,
    } = await supabase
      .from("service_tasks")
      .select(
        `
          id,
          service_id,
          name,
          description
        `
      )
      .in("id", taskDefinitionIds);

    if (serviceTasksError) {
      console.error(
        "EMPLOYEE SERVICES SERVICE TASKS ERROR:",
        JSON.stringify(
          serviceTasksError,
          null,
          2
        )
      );
    }

    serviceTasks = serviceTaskData ?? [];
  }

  // --------------------------------------------------
  // GET MAIN SERVICES
  // --------------------------------------------------

  const serviceIds = Array.from(
    new Set(
      serviceTasks
        .map((task) => task.service_id)
        .filter(Boolean)
    )
  );

  let services: Service[] = [];

  if (serviceIds.length > 0) {
    const {
      data: serviceData,
      error: servicesError,
    } = await supabase
      .from("services")
      .select(
        `
          id,
          name,
          description
        `
      )
      .in("id", serviceIds);

    if (servicesError) {
      console.error(
        "EMPLOYEE SERVICES MAIN SERVICES ERROR:",
        JSON.stringify(
          servicesError,
          null,
          2
        )
      );
    }

    services = serviceData ?? [];
  }

  // --------------------------------------------------
  // GET CLIENTS THROUGH EMPLOYEE RPC
  // --------------------------------------------------

  const {
    data: employeeClients,
    error: clientsError,
  } = await supabase.rpc(
    "get_employee_clients"
  );

  if (clientsError) {
    console.error(
      "EMPLOYEE SERVICES CLIENTS ERROR:",
      JSON.stringify(clientsError, null, 2)
    );
  }

  const clients: Client[] =
    employeeClients ?? [];

  // --------------------------------------------------
  // CREATE LOOKUP MAPS
  // --------------------------------------------------

  const clientServiceMap = new Map(
    clientServices.map((item) => [
      item.id,
      item,
    ])
  );

  const serviceTaskMap = new Map(
    serviceTasks.map((item) => [
      item.id,
      item,
    ])
  );

  const serviceMap = new Map(
    services.map((item) => [
      item.id,
      item,
    ])
  );

  const clientMap = new Map(
    clients.map((client) => [
      client.id,
      client,
    ])
  );

  // --------------------------------------------------
  // BUILD SERVICE WORK ITEMS
  // --------------------------------------------------

  const serviceItems = tasks
    .map((task) => {
      const clientService =
        clientServiceMap.get(
          task.client_service_id
        );

      if (!clientService) {
        return null;
      }

      const serviceTask =
        clientService.task_id
          ? serviceTaskMap.get(
              clientService.task_id
            )
          : undefined;

      const mainService =
        serviceTask?.service_id
          ? serviceMap.get(
              serviceTask.service_id
            )
          : undefined;

      const client = clientMap.get(
        clientService.client_id
      );

      return {
        task,
        clientService,
        serviceTask,
        mainService,
        client,
      };
    })
    .filter(Boolean) as Array<{
    task: Task;
    clientService: ClientService;
    serviceTask: ServiceTask | undefined;
    mainService: Service | undefined;
    client: Client | undefined;
  }>;

  // --------------------------------------------------
  // STATS
  // --------------------------------------------------

  const totalServices =
    serviceItems.length;

  const pendingServices =
    serviceItems.filter(
      (item) =>
        item.clientService.status ===
          "pending" ||
        item.task.status === "pending"
    ).length;

  const activeServices =
    serviceItems.filter(
      (item) =>
        item.clientService.status ===
          "in_progress" ||
        item.task.status === "in_progress"
    ).length;

  const completedServices =
    serviceItems.filter(
      (item) =>
        item.clientService.status ===
        "completed"
    ).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* -------------------------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------------------------- */}

      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#D9822B]">
          Employee Portal
        </p>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#23272B] sm:text-3xl">
              Services
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#77736D]">
              View the services and work assigned
              to you across your clients.
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F6E3CC]">
            <BriefcaseBusiness
              size={18}
              className="text-[#B8661A]"
            />
          </div>
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* STATS */}
      {/* -------------------------------------------------- */}

      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-4 sm:gap-4">
        <div className="rounded-xl border border-[#E8E2D9] bg-white p-4 sm:p-5">
          <p className="text-xs text-[#9A958D]">
            Total
          </p>

          <p className="mt-2 text-2xl font-semibold text-[#23272B]">
            {totalServices}
          </p>
        </div>

        <div className="rounded-xl border border-[#E8E2D9] bg-white p-4 sm:p-5">
          <p className="text-xs text-[#9A958D]">
            Pending
          </p>

          <p className="mt-2 text-2xl font-semibold text-[#23272B]">
            {pendingServices}
          </p>
        </div>

        <div className="rounded-xl border border-[#E8E2D9] bg-white p-4 sm:p-5">
          <p className="text-xs text-[#9A958D]">
            In Progress
          </p>

          <p className="mt-2 text-2xl font-semibold text-[#23272B]">
            {activeServices}
          </p>
        </div>

        <div className="rounded-xl border border-[#E8E2D9] bg-white p-4 sm:p-5">
          <p className="text-xs text-[#9A958D]">
            Completed
          </p>

          <p className="mt-2 text-2xl font-semibold text-[#23272B]">
            {completedServices}
          </p>
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* SERVICES LIST */}
      {/* -------------------------------------------------- */}

      <section className="mt-6 overflow-hidden rounded-xl border border-[#E8E2D9] bg-white sm:mt-8">
        <div className="border-b border-[#E8E2D9] px-5 py-5 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#9A958D]">
            Assigned Work
          </p>

          <h2 className="mt-0.5 text-lg font-semibold text-[#23272B]">
            My Services
          </h2>
        </div>

        {serviceItems.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F6E3CC]">
              <BriefcaseBusiness
                size={20}
                className="text-[#B8661A]"
              />
            </div>

            <h3 className="mt-4 text-sm font-medium text-[#23272B]">
              No services assigned
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#77736D]">
              Services assigned to you by an
              administrator will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#E8E2D9]">
            {serviceItems.map(
              ({
                task,
                clientService,
                serviceTask,
                mainService,
                client,
              }) => {
                const status =
                  clientService.status ??
                  task.status;

                const progress = Math.min(
                  Math.max(
                    Number(
                      clientService.progress ??
                        0
                    ),
                    0
                  ),
                  100
                );

                return (
                  <div
                    key={task.id}
                    className="px-5 py-6 transition-colors duration-200 hover:bg-[#FAF8F5] sm:px-6"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      {/* SERVICE INFO */}

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#9A958D]">
                            Main Service
                          </span>

                          <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${statusClass(
                              status
                            )}`}
                          >
                            {formatStatus(
                              status
                            )}
                          </span>
                        </div>

                        <h3 className="mt-2 text-base font-semibold text-[#23272B]">
                          {mainService?.name ||
                            "Service"}
                        </h3>

                        {mainService?.description && (
                          <p className="mt-1 max-w-2xl text-sm leading-6 text-[#77736D]">
                            {
                              mainService.description
                            }
                          </p>
                        )}

                        {/* TASK */}

                        <div className="mt-5 rounded-lg border border-[#E8E2D9] bg-[#FCFBF8] p-4">
                          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#9A958D]">
                            Service Task
                          </p>

                          <p className="mt-1 text-sm font-medium text-[#23272B]">
                            {serviceTask?.name ||
                              task.title ||
                              "Task"}
                          </p>

                          {serviceTask?.description && (
                            <p className="mt-1 text-xs leading-5 text-[#77736D]">
                              {
                                serviceTask.description
                              }
                            </p>
                          )}
                        </div>
                      </div>

                      {/* META */}

                      <div className="grid gap-3 sm:grid-cols-2 lg:w-[310px] lg:grid-cols-1">
                        <div className="flex items-center gap-3 rounded-lg border border-[#E8E2D9] bg-white px-3.5 py-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F6E3CC]">
                            <UserRound
                              size={14}
                              className="text-[#B8661A]"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[11px] text-[#9A958D]">
                              Client
                            </p>

                            <p className="truncate text-sm font-medium text-[#23272B]">
                              {client?.full_name ||
                                "Client"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-lg border border-[#E8E2D9] bg-white px-3.5 py-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F1F0EE]">
                            <CalendarDays
                              size={14}
                              className="text-[#77736D]"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[11px] text-[#9A958D]">
                              Start Date
                            </p>

                            <p className="text-sm font-medium text-[#23272B]">
                              {formatDate(
                                clientService.start_date
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-lg border border-[#E8E2D9] bg-white px-3.5 py-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F1F0EE]">
                            {status ===
                            "completed" ? (
                              <CheckCircle2
                                size={14}
                                className="text-[#3C7A4B]"
                              />
                            ) : (
                              <Clock3
                                size={14}
                                className="text-[#77736D]"
                              />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <p className="text-[11px] text-[#9A958D]">
                                Progress
                              </p>

                              <p className="text-xs font-medium text-[#23272B]">
                                {progress}%
                              </p>
                            </div>

                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#F1EFEA]">
                              <div
                                className="h-full rounded-full bg-[#D9822B] transition-all duration-300"
                                style={{
                                  width: `${progress}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* FOOTER */}

                    <div className="mt-5 flex flex-col gap-3 border-t border-[#E8E2D9] pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-xs text-[#77736D]">
                        {task.due_date ? (
                          <>
                            Due{" "}
                            <span className="font-medium text-[#55514B]">
                              {formatDate(
                                task.due_date
                              )}
                            </span>
                          </>
                        ) : (
                          "No due date"
                        )}
                      </div>

                      <Link
                        href={`/portal/employee/tasks/${task.id}`}
                        className="group inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#FFFFFF] px-4 text-xs font-medium text-white transition-colors duration-200 hover:bg-[#D9822B]"
                      >
                        Open Task

                        <ArrowRight
                          size={14}
                          className="transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </section>
    </div>
  );
}