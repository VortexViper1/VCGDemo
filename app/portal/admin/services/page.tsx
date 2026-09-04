import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Briefcase, ListChecks, Clock3, CheckCircle2 } from "lucide-react";

export default async function AdminServicesPage() {
  const supabase = await createClient();

  // --------------------------------------------------
  // AUTHENTICATION
  // --------------------------------------------------

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  // --------------------------------------------------
  // VERIFY ADMIN
  // --------------------------------------------------

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/portal/dashboard");
  }

  // --------------------------------------------------
  // GET ALL CLIENT SERVICE ASSIGNMENTS
  // --------------------------------------------------

  const { data: clientServices, error: clientServicesError } =
    await supabase
      .from("client_services")
      .select(
        `
        id,
        client_id,
        task_id,
        status,
        progress,
        start_date,
        completed_date,
        created_at,
        service_tasks (
          id,
          name,
          description,
          service_id,
          services (
            id,
            name,
            description
          )
        )
      `
      )
      .order("created_at", { ascending: false });

  if (clientServicesError) {
    console.error(
      "CLIENT SERVICES ERROR:",
      JSON.stringify(clientServicesError, null, 2)
    );

    throw new Error(
      `Client services query failed: ${clientServicesError.message}`
    );
  }

  const assignments = clientServices ?? [];

  // --------------------------------------------------
  // GET CLIENT IDS FROM ASSIGNMENTS
  // --------------------------------------------------

  const clientIds = [
    ...new Set(assignments.map((item) => item.client_id).filter(Boolean)),
  ];

  // --------------------------------------------------
  // GET CLIENT PROFILES
  // --------------------------------------------------

  let clients: {
    id: string;
    full_name: string | null;
    phone: string | null;
  }[] = [];

  if (clientIds.length > 0) {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
        id,
        full_name,
        phone
      `
      )
      .in("id", clientIds);

    if (error) {
      console.error(
        "CLIENT PROFILES ERROR:",
        JSON.stringify(error, null, 2)
      );
    } else {
      clients = data ?? [];
    }
  }

  // --------------------------------------------------
  // CREATE CLIENT LOOKUP MAP
  // --------------------------------------------------

  const clientsById = new Map(
    clients.map((client) => [client.id, client])
  );

  // --------------------------------------------------
  // COMBINE ASSIGNMENTS + CLIENT + TASK + SERVICE
  // --------------------------------------------------

  const rows = assignments.map((assignment) => {
    const task = Array.isArray(assignment.service_tasks)
      ? assignment.service_tasks[0]
      : assignment.service_tasks;

    const service = Array.isArray(task?.services)
      ? task.services[0]
      : task?.services;

    return {
      ...assignment,
      client: clientsById.get(assignment.client_id),
      task,
      service,
    };
  });

  // --------------------------------------------------
  // SUMMARY
  // --------------------------------------------------

  const totalAssignments = rows.length;

  const activeAssignments = rows.filter(
    (item) =>
      item.status === "confirmed" ||
      item.status === "in_progress" ||
      item.status === "review"
  ).length;

  const pendingAssignments = rows.filter(
    (item) => item.status === "pending"
  ).length;

  const completedAssignments = rows.filter(
    (item) => item.status === "completed"
  ).length;

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <main className="min-w-0 p-5 pt-[90px] md:p-8">
      {/* HEADER */}
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#D9822B]">
          Administration
        </p>

        <h1 className="mt-2 text-2xl font-semibold text-[#23272B]">
          Services
        </h1>

        <p className="mt-1 text-sm text-[#77736D]">
          View and manage services assigned to your Viswaas clients.
        </p>
      </div>

      {/* SUMMARY */}
      <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        <SummaryCard
          icon={<ListChecks size={16} className="text-[#B8661A]" />}
          label="Total Assignments"
          value={totalAssignments}
        />

        <SummaryCard
          icon={<Clock3 size={16} className="text-[#B8661A]" />}
          label="Active"
          value={activeAssignments}
        />

        <SummaryCard
          icon={<Briefcase size={16} className="text-[#B8661A]" />}
          label="Pending"
          value={pendingAssignments}
        />

        <SummaryCard
          icon={<CheckCircle2 size={16} className="text-[#B8661A]" />}
          label="Completed"
          value={completedAssignments}
        />
      </div>

      {/* CLIENT SERVICES */}
      <section className="mt-6 overflow-hidden rounded-xl border border-[#E8E2D9] bg-white sm:mt-8">
        {/* SECTION HEADER */}
        <div className="border-b border-[#E8E2D9] px-5 py-5 md:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#9A958D]">
            Assignments
          </p>

          <h2 className="mt-1 text-base font-semibold text-[#23272B]">
            Client Services
          </h2>

          <p className="mt-1 text-xs text-[#77736D]">
            All services currently assigned to your clients.
          </p>
        </div>

        {/* EMPTY STATE */}
        {rows.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F6E3CC]">
              <Briefcase
                size={20}
                strokeWidth={1.7}
                className="text-[#B8661A]"
              />
            </div>

            <p className="mt-4 text-sm font-medium text-[#23272B]">
              No service assignments
            </p>

            <p className="mt-1 text-sm text-[#77736D]">
              No services have been assigned to any clients yet.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#E8E2D9]">
            {rows.map((item) => {
              const client = item.client;
              const service = item.service;
              const task = item.task;

              const progress = Math.min(
                Math.max(Number(item.progress ?? 0), 0),
                100
              );

              const clientName =
                client?.full_name || "Unnamed Client";

              const clientInitial =
                clientName.charAt(0).toUpperCase();

              return (
                <div
                  key={item.id}
                  className="px-5 py-6 transition-colors duration-200 hover:bg-[#FAF8F5] md:px-6"
                >
                  {/* CLIENT + STATUS */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-start gap-4">
                      {/* AVATAR */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F6E3CC] text-sm font-medium text-[#B8661A]">
                        {clientInitial}
                      </div>

                      {/* CLIENT INFO */}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-[#23272B]">
                          {clientName}
                        </p>

                        <p className="mt-1 text-xs text-[#77736D]">
                          {client?.phone || "No phone number"}
                        </p>
                      </div>
                    </div>

                    {/* STATUS */}
                    <span
                      className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize ${assignmentStatusClass(
                        item.status
                      )}`}
                    >
                      {item.status
                        ? item.status.replace(/_/g, " ")
                        : "Unknown"}
                    </span>
                  </div>

                  {/* SERVICE CARD */}
                  <div className="mt-5 rounded-lg border border-[#E8E2D9] bg-[#FAF8F5] p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        {/* MAIN SERVICE */}
                        <p className="text-xs uppercase tracking-[0.12em] text-[#9A958D]">
                          Service
                        </p>

                        <h3 className="mt-1 text-sm font-semibold text-[#23272B]">
                          {service?.name || "Unknown Service"}
                        </h3>

                        {service?.description && (
                          <p className="mt-1 max-w-2xl text-xs leading-5 text-[#77736D]">
                            {service.description}
                          </p>
                        )}

                        {/* CUSTOM TASK */}
                        <div className="mt-4">
                          <p className="text-xs uppercase tracking-[0.12em] text-[#9A958D]">
                            Task
                          </p>

                          <p className="mt-1 text-sm font-medium text-[#23272B]">
                            {task?.name || "Unknown Task"}
                          </p>

                          {task?.description && (
                            <p className="mt-1 max-w-2xl text-xs leading-5 text-[#77736D]">
                              {task.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <p className="shrink-0 text-sm font-semibold text-[#23272B]">
                        {progress}%
                      </p>
                    </div>

                    {/* PROGRESS */}
                    <div className="mt-4">
                      <div className="h-1.5 overflow-hidden rounded-full bg-[#F1EFEA]">
                        <div
                          className="h-full rounded-full bg-[#D9822B] transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* DATES */}
                    {(item.start_date || item.completed_date) && (
                      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#9A958D]">
                        {item.start_date && (
                          <span>
                            Started:{" "}
                            {new Date(
                              item.start_date
                            ).toLocaleDateString()}
                          </span>
                        )}

                        {item.completed_date && (
                          <span>
                            Completed:{" "}
                            {new Date(
                              item.completed_date
                            ).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

// --------------------------------------------------
// UI SUBCOMPONENTS
// --------------------------------------------------

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-[#E8E2D9] bg-white p-5 transition-shadow duration-200 sm:p-6">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F6E3CC]">
          {icon}
        </span>

        <p className="text-sm text-[#77736D]">{label}</p>
      </div>

      <p className="mt-3 text-3xl font-semibold text-[#23272B]">
        {value}
      </p>
    </div>
  );
}

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

function assignmentStatusClass(status: string | null) {
  if (status === "pending")
    return "bg-[#F1F0EE] text-[#77736D]";

  if (status === "completed")
    return "bg-[#EAF4EC] text-[#3C7A4B]";

  if (
    status === "confirmed" ||
    status === "in_progress" ||
    status === "review"
  ) {
    return "bg-[#F6E3CC] text-[#B8661A]";
  }

  return "bg-[#F6E3CC] text-[#B8661A]";
}