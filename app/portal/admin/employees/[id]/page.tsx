import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Layers3,
  Phone,
  UserRound,
} from "lucide-react";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ assigned?: string }>;
};

type Employee = {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: string;
};

type Task = {
  id: string;
  client_service_id: string;
  title: string | null;
  status: string | null;
  due_date: string | null;
  assigned_to: string | null;
  created_at: string;
};

type ClientService = {
  id: string;
  client_id: string;
  status: string | null;
  progress: number | null;
  start_date: string | null;
  task_id: string | null;
};

type Client = {
  id: string;
  full_name: string | null;
  phone: string | null;
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

export default async function AdminEmployeeDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const { assigned } = await searchParams;

  const supabase = await createClient();

  // -----------------------------------------
  // AUTH
  // -----------------------------------------

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  // -----------------------------------------
  // VERIFY ADMIN
  // -----------------------------------------

  const { data: adminProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (adminProfile?.role !== "admin") {
    redirect("/portal/dashboard");
  }

  // -----------------------------------------
  // EMPLOYEE
  // -----------------------------------------

  const {
    data: employee,
    error: employeeError,
  } = await supabase
    .from("profiles")
    .select("id, full_name, phone, role")
    .eq("id", id)
    .eq("role", "team")
    .single();

  if (employeeError || !employee) {
    notFound();
  }

  // -----------------------------------------
  // EMPLOYEE TASKS
  // -----------------------------------------

  const {
    data: tasks,
    error: tasksError,
  } = await supabase
    .from("tasks")
    .select(`
      id,
      client_service_id,
      title,
      status,
      due_date,
      assigned_to,
      created_at
    `)
    .eq("assigned_to", id)
    .order("created_at", {
      ascending: false,
    });

  if (tasksError) {
    console.error(
      "EMPLOYEE TASKS ERROR:",
      JSON.stringify(tasksError, null, 2)
    );
  }

  const employeeTasks: Task[] = tasks ?? [];

  // -----------------------------------------
  // CLIENT SERVICES
  // -----------------------------------------

  const clientServiceIds = [
    ...new Set(
      employeeTasks
        .map((task) => task.client_service_id)
        .filter(Boolean)
    ),
  ];

  let employeeServices: ClientService[] = [];

  if (clientServiceIds.length > 0) {
    const {
      data: clientServices,
      error: clientServicesError,
    } = await supabase
      .from("client_services")
      .select(`
        id,
        client_id,
        status,
        progress,
        start_date,
        task_id
      `)
      .in("id", clientServiceIds)
      .order("start_date", {
        ascending: false,
      });

    if (clientServicesError) {
      console.error(
        "EMPLOYEE CLIENT SERVICES ERROR:",
        JSON.stringify(
          clientServicesError,
          null,
          2
        )
      );
    }

    employeeServices = clientServices ?? [];
  }

  // -----------------------------------------
  // CLIENTS
  // -----------------------------------------

  const clientIds = [
    ...new Set(
      employeeServices
        .map((item) => item.client_id)
        .filter(Boolean)
    ),
  ];

  let clients: Client[] = [];

  if (clientIds.length > 0) {
    const {
      data: clientData,
      error: clientsError,
    } = await supabase
      .from("profiles")
      .select("id, full_name, phone")
      .in("id", clientIds);

    if (clientsError) {
      console.error(
        "EMPLOYEE CLIENTS ERROR:",
        JSON.stringify(
          clientsError,
          null,
          2
        )
      );
    }

    clients = clientData ?? [];
  }

  // -----------------------------------------
  // SERVICE TASKS / SUBTASKS
  // -----------------------------------------

  const serviceTaskIds = [
    ...new Set(
      employeeServices
        .map((item) => item.task_id)
        .filter(Boolean)
    ),
  ];

  let serviceTasks: ServiceTask[] = [];

  if (serviceTaskIds.length > 0) {
    const {
      data: serviceTaskData,
      error: serviceTasksError,
    } = await supabase
      .from("service_tasks")
      .select(`
        id,
        service_id,
        name
      `)
      .in("id", serviceTaskIds);

    if (serviceTasksError) {
      console.error(
        "SERVICE TASKS ERROR:",
        JSON.stringify(
          serviceTasksError,
          null,
          2
        )
      );
    }

    serviceTasks = serviceTaskData ?? [];
  }

  // -----------------------------------------
  // MAIN SERVICES
  // -----------------------------------------

  const serviceIds = [
    ...new Set(
      serviceTasks
        .map((item) => item.service_id)
        .filter(Boolean)
    ),
  ];

  let services: Service[] = [];

  if (serviceIds.length > 0) {
    const {
      data: serviceData,
      error: servicesError,
    } = await supabase
      .from("services")
      .select("id, name")
      .in("id", serviceIds);

    if (servicesError) {
      console.error(
        "SERVICES ERROR:",
        JSON.stringify(
          servicesError,
          null,
          2
        )
      );
    }

    services = serviceData ?? [];
  }

  // -----------------------------------------
  // LOOKUP HELPERS
  // -----------------------------------------

  const getClient = (clientId: string) =>
    clients.find(
      (client) => client.id === clientId
    );

  const getServiceTask = (
    taskId: string | null
  ) =>
    serviceTasks.find(
      (task) => task.id === taskId
    );

  const getService = (
    taskId: string | null
  ) => {
    const serviceTask =
      getServiceTask(taskId);

    if (!serviceTask?.service_id) {
      return null;
    }

    return services.find(
      (service) =>
        service.id === serviceTask.service_id
    );
  };

  const getClientService = (
    clientServiceId: string
  ) =>
    employeeServices.find(
      (service) =>
        service.id === clientServiceId
    );

  // -----------------------------------------
  // STATUS HELPERS
  // -----------------------------------------

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

  const formatStatus = (
    status: string | null
  ) =>
    status
      ? status
          .replaceAll("_", " ")
          .replace(/\b\w/g, (char) =>
            char.toUpperCase()
          )
      : "Pending";

  // -----------------------------------------
  // SUMMARY
  // -----------------------------------------

  const completedTasks =
    employeeTasks.filter((task) =>
      isCompleted(task.status)
    ).length;

  const pendingTasks =
    employeeTasks.length -
    completedTasks;

  const employeeInitial =
    employee.full_name
      ?.trim()
      ?.charAt(0)
      ?.toUpperCase() ?? "E";

  // -----------------------------------------
  // RENDER
  // -----------------------------------------

  return (
    <main className="relative min-w-0 bg-[#FCFBF8] p-5 pt-7 md:p-8">

      {/* ===================================== */}
      {/* SUCCESS TOAST */}
      {/* ===================================== */}

      {assigned === "success" && (
        <div
          className="
            pointer-events-none
            fixed
            right-4
            top-4
            z-[9999]
            w-[calc(100%-2rem)]
            max-w-[390px]
            animate-[toastInOut_4.5s_ease-in-out_forwards]
            md:right-8
            md:top-8
          "
        >
          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-[#D9E5DB]
              bg-white
              shadow-[0_20px_55px_rgba(35,39,43,0.14)]
            "
          >
            <div className="h-1 bg-[#D9822B]" />

            <div className="flex gap-4 px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF5EF]">
                <CheckCircle2
                  size={18}
                  strokeWidth={1.8}
                  className="text-[#55705A]"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#23272B]">
                  Task assigned successfully
                </p>

                <p className="mt-1 text-xs leading-5 text-[#77736D]">
                  The task has been assigned to{" "}
                  {employee.full_name ||
                    "this employee"}.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================== */}
      {/* BACK */}
      {/* ===================================== */}

      <Link
        href="/portal/admin/employees"
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          text-[#77736D]
          transition-colors
          hover:text-[#23272B]
        "
      >
        <ArrowLeft size={16} />
        Back to Employees
      </Link>

      {/* ===================================== */}
      {/* EMPLOYEE HERO */}
      {/* ===================================== */}

      <section
        className="
          mt-6
          overflow-hidden
          rounded-2xl
          border
          border-[#23272B]/10
          bg-white
          shadow-[0_8px_30px_rgba(35,39,43,0.04)]
        "
      >
        <div className="h-1 bg-[#D9822B]" />

        <div className="p-5 md:p-7">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex min-w-0 items-center gap-4">

              <div
                className="
                  flex
                  h-16
                  w-16
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#F3E8D8]
                  text-xl
                  font-semibold
                  text-[#A8732A]
                "
              >
                {employeeInitial}
              </div>

              <div className="min-w-0">

                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D9822B]">
                  Team Member
                </p>

                <h1 className="mt-1 truncate text-2xl font-semibold tracking-[-0.02em] text-[#23272B] md:text-3xl">
                  {employee.full_name ||
                    "Unnamed Employee"}
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#77736D]">
                  {employee.phone && (
                    <span className="inline-flex items-center gap-1.5">
                      <Phone size={14} />
                      {employee.phone}
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1.5">
                    <UserRound size={14} />
                    Employee
                  </span>
                </div>

              </div>

            </div>

            <Link
              href={`/portal/admin/employees/${id}/assign`}
              className="
                group
                inline-flex
                h-11
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#D9822B]
                px-6
                text-sm
                font-semibold
                text-white
                shadow-[0_8px_20px_rgba(196,154,74,0.18)]
                transition-all
                hover:-translate-y-0.5
                hover:bg-[#A8732A]
                hover:shadow-[0_12px_25px_rgba(196,154,74,0.24)]
                sm:w-auto
              "
            >
              Assign Task
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

          </div>
        </div>
      </section>

      {/* ===================================== */}
      {/* SUMMARY */}
      {/* ===================================== */}

      <div className="mt-6 grid gap-4 sm:grid-cols-3">

        <SummaryCard
          label="Total Tasks"
          value={employeeTasks.length}
          icon={
            <ClipboardList
              size={19}
              strokeWidth={1.7}
            />
          }
        />

        <SummaryCard
          label="Pending"
          value={pendingTasks}
          icon={
            <Clock3
              size={19}
              strokeWidth={1.7}
            />
          }
        />

        <SummaryCard
          label="Completed"
          value={completedTasks}
          icon={
            <CheckCircle2
              size={19}
              strokeWidth={1.7}
            />
          }
        />

      </div>

      {/* ===================================== */}
      {/* CLIENT SERVICES */}
      {/* ===================================== */}

      <section
        className="
          mt-8
          overflow-hidden
          rounded-2xl
          border
          border-[#23272B]/10
          bg-white
          shadow-[0_8px_30px_rgba(35,39,43,0.03)]
        "
      >

        <div className="border-b border-[#23272B]/10 px-5 py-5 md:px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3E8D8]">
              <Layers3
                size={17}
                strokeWidth={1.7}
                className="text-[#A8732A]"
              />
            </div>

            <div>
              <h2 className="text-base font-semibold text-[#23272B]">
                Assigned Client Services
              </h2>

              <p className="mt-0.5 text-xs text-[#77736D]">
                Services and subtasks currently connected to this employee.
              </p>
            </div>

          </div>

        </div>

        {employeeServices.length === 0 ? (
          <EmptyState
            icon={
              <Layers3
                size={28}
                strokeWidth={1.5}
              />
            }
            title="No client services yet"
            description="Client services connected to this employee will appear here."
          />
        ) : (
          <div className="grid gap-4 p-5 md:grid-cols-2 md:p-6">

            {employeeServices.map((item) => {
              const client =
                getClient(item.client_id);

              const serviceTask =
                getServiceTask(item.task_id);

              const service =
                getService(item.task_id);

              const progress = Math.min(
                Math.max(
                  item.progress ?? 0,
                  0
                ),
                100
              );

              return (
                <div
                  key={item.id}
                  className="
                    group
                    rounded-2xl
                    border
                    border-[#23272B]/10
                    bg-[#FCFBF8]
                    p-5
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:border-[#D9822B]/40
                    hover:shadow-[0_12px_30px_rgba(35,39,43,0.07)]
                  "
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9A958D]">
                        Client
                      </p>

                      <h3 className="mt-1 truncate text-sm font-semibold text-[#23272B]">
                        {client?.full_name ||
                          "Unnamed Client"}
                      </h3>

                      {client?.phone && (
                        <p className="mt-1 text-xs text-[#77736D]">
                          {client.phone}
                        </p>
                      )}

                    </div>

                    <span
                      className="
                        shrink-0
                        rounded-full
                        border
                        border-[#D9822B]/20
                        bg-[#F3E8D8]
                        px-3
                        py-1
                        text-[11px]
                        font-medium
                        text-[#A8732A]
                      "
                    >
                      {formatStatus(
                        item.status
                      )}
                    </span>

                  </div>

                  <div className="mt-5 border-t border-[#23272B]/10 pt-5">

                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9A958D]">
                      Service
                    </p>

                    <p className="mt-1 text-base font-semibold text-[#23272B]">
                      {service?.name ||
                        "Service unavailable"}
                    </p>

                    <div className="mt-3 rounded-xl border border-[#23272B]/10 bg-white px-4 py-3">

                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9A958D]">
                        Subtask
                      </p>

                      <p className="mt-1 text-sm font-medium text-[#4B4A47]">
                        {serviceTask?.name ||
                          "No subtask specified"}
                      </p>

                    </div>

                  </div>

                  <div className="mt-5">

                    <div className="flex items-center justify-between text-xs">

                      <span className="text-[#77736D]">
                        Service progress
                      </span>

                      <span className="font-semibold text-[#23272B]">
                        {progress}%
                      </span>

                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#23272B]/10">

                      <div
                        className="h-full rounded-full bg-[#D9822B] transition-all duration-500"
                        style={{
                          width: `${progress}%`,
                        }}
                      />

                    </div>

                  </div>

                  {item.start_date && (
                    <div className="mt-4 flex items-center gap-2 text-xs text-[#77736D]">
                      <CalendarDays size={13} />
                      Started{" "}
                      {new Date(
                        item.start_date
                      ).toLocaleDateString()}
                    </div>
                  )}

                </div>
              );
            })}

          </div>
        )}

      </section>

      {/* ===================================== */}
      {/* ASSIGNED TASKS */}
      {/* ===================================== */}

      <section
        className="
          mt-8
          overflow-hidden
          rounded-2xl
          border
          border-[#23272B]/10
          bg-white
          shadow-[0_8px_30px_rgba(35,39,43,0.03)]
        "
      >

        <div className="flex flex-col gap-3 border-b border-[#23272B]/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-6">

          <div>

            <h2 className="text-base font-semibold text-[#23272B]">
              Assigned Tasks
            </h2>

            <p className="mt-1 text-xs text-[#77736D]">
              Work assigned to this employee.
            </p>

          </div>

          <Link
            href={`/portal/admin/employees/${id}/assign`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#A8732A] transition-colors hover:text-[#D9822B]"
          >
            Assign another task
            <ArrowUpRight size={14} />
          </Link>

        </div>

        {employeeTasks.length === 0 ? (
          <EmptyState
            icon={
              <ClipboardList
                size={30}
                strokeWidth={1.5}
              />
            }
            title="No tasks assigned"
            description="Once you assign work to this employee, it will appear here."
            action={
              <Link
                href={`/portal/admin/employees/${id}/assign`}
                className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-[#D9822B] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#A8732A]"
              >
                Assign first task
              </Link>
            }
          />
        ) : (
          <div className="divide-y divide-[#23272B]/10">

            {employeeTasks.map((task) => {

              const completed =
                isCompleted(
                  task.status
                );

              const clientService =
                getClientService(
                  task.client_service_id
                );

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

              const client =
                clientService
                  ? getClient(
                      clientService.client_id
                    )
                  : null;

              return (
                <div
                  key={task.id}
                  className="
                    px-5
                    py-5
                    transition-colors
                    hover:bg-[#FCFBF8]
                    md:px-6
                  "
                >

                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="break-words text-sm font-semibold text-[#23272B]">
                          {task.title ||
                            "Untitled Task"}
                        </h3>

                        <span
                          className={`
                            rounded-full
                            px-2.5
                            py-1
                            text-[10px]
                            font-semibold
                            ${
                              completed
                                ? "bg-[#EEF5EF] text-[#55705A]"
                                : "bg-[#F3E8D8] text-[#A8732A]"
                            }
                          `}
                        >
                          {formatStatus(
                            task.status
                          )}
                        </span>

                      </div>

                      <div className="mt-3 grid gap-2 text-xs text-[#77736D] sm:grid-cols-2">

                        <div>
                          <span className="text-[#9A958D]">
                            Client
                          </span>
                          <p className="mt-0.5 font-medium text-[#4B4A47]">
                            {client?.full_name ||
                              "Unnamed Client"}
                          </p>
                        </div>

                        <div>
                          <span className="text-[#9A958D]">
                            Service
                          </span>
                          <p className="mt-0.5 font-medium text-[#4B4A47]">
                            {service?.name ||
                              "Service unavailable"}
                          </p>
                        </div>

                        <div>
                          <span className="text-[#9A958D]">
                            Subtask
                          </span>
                          <p className="mt-0.5 font-medium text-[#4B4A47]">
                            {serviceTask?.name ||
                              "No subtask"}
                          </p>
                        </div>

                        <div>
                          <span className="text-[#9A958D]">
                            Created
                          </span>
                          <p className="mt-0.5 font-medium text-[#4B4A47]">
                            {new Date(
                              task.created_at
                            ).toLocaleDateString()}
                          </p>
                        </div>

                      </div>

                    </div>

                    {task.due_date && (
                      <div className="flex shrink-0 items-center gap-2 rounded-lg border border-[#23272B]/10 bg-[#FCFBF8] px-3 py-2 text-xs text-[#77736D]">
                        <CalendarDays
                          size={14}
                        />
                        <span>
                          Due{" "}
                          {new Date(
                            task.due_date
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    )}

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </section>

      {/* ===================================== */}
      {/* TOAST ANIMATION */}
      {/* ===================================== */}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes toastInOut {
              0% {
                opacity: 0;
                transform: translateX(24px);
              }

              12% {
                opacity: 1;
                transform: translateX(0);
              }

              78% {
                opacity: 1;
                transform: translateX(0);
              }

              100% {
                opacity: 0;
                transform: translateX(24px);
              }
            }
          `,
        }}
      />

    </main>
  );
}

function SummaryCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-[#23272B]/10
        bg-white
        p-5
        shadow-[0_8px_25px_rgba(35,39,43,0.03)]
      "
    >
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

function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="px-6 py-14 text-center">

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7F5F1] text-[#9A958D]">
        {icon}
      </div>

      <p className="mt-4 text-sm font-semibold text-[#23272B]">
        {title}
      </p>

      <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-[#77736D]">
        {description}
      </p>

      {action}

    </div>
  );
}