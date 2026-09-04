import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ServicesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  // --------------------------------------------------
  // GET CLIENT SERVICE ASSIGNMENTS
  // --------------------------------------------------

  const { data: clientServices, error: clientServicesError } =
    await supabase
      .from("client_services")
      .select(`
        id,
        task_id,
        status,
        progress,
        start_date,
        created_at
      `)
      .eq("client_id", user.id)
      .order("created_at", { ascending: false });

  if (clientServicesError) {
    console.error(
      "CLIENT SERVICES ERROR:",
      clientServicesError
    );
  }

  const assignments = clientServices ?? [];

  // --------------------------------------------------
  // GET TASK IDS
  // --------------------------------------------------

  const taskIds = [
    ...new Set(
      assignments
        .map((item) => item.task_id)
        .filter(Boolean)
    ),
  ];

  // --------------------------------------------------
  // GET SERVICE TASKS
  // --------------------------------------------------

  let tasks: {
    id: string;
    name: string;
    description: string | null;
    service_id: string;
  }[] = [];

  if (taskIds.length > 0) {
    const { data, error } = await supabase
      .from("service_tasks")
      .select(`
        id,
        name,
        description,
        service_id
      `)
      .in("id", taskIds);

    if (error) {
      console.error(
        "SERVICE TASKS ERROR:",
        error
      );
    } else {
      tasks = data ?? [];
    }
  }

  // --------------------------------------------------
  // GET MAIN SERVICE IDS
  // --------------------------------------------------

  const serviceIds = [
    ...new Set(
      tasks
        .map((task) => task.service_id)
        .filter(Boolean)
    ),
  ];

  // --------------------------------------------------
  // GET MAIN SERVICES
  // --------------------------------------------------

  let mainServices: {
    id: string;
    name: string;
    description: string | null;
  }[] = [];

  if (serviceIds.length > 0) {
    const { data, error } = await supabase
      .from("services")
      .select(`
        id,
        name,
        description
      `)
      .in("id", serviceIds);

    if (error) {
      console.error(
        "SERVICES ERROR:",
        error
      );
    } else {
      mainServices = data ?? [];
    }
  }

  // --------------------------------------------------
  // LOOKUP MAPS
  // --------------------------------------------------

  const tasksById = new Map(
    tasks.map((task) => [task.id, task])
  );

  const servicesById = new Map(
    mainServices.map((service) => [
      service.id,
      service,
    ])
  );

  // --------------------------------------------------
  // COMBINE ASSIGNMENTS
  // --------------------------------------------------

  const services = assignments.map((item) => {
    const task = item.task_id
      ? tasksById.get(item.task_id)
      : undefined;

    const service = task?.service_id
      ? servicesById.get(task.service_id)
      : undefined;

    return {
      ...item,
      task,
      service,
    };
  });

  return (
    <div className="p-5 md:p-8">
      {/* HEADER */}
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-[#D9822B]">
          Workspace
        </p>

        <h1 className="mt-2 text-2xl font-semibold text-[#23272B]">
          My Services
        </h1>

        <p className="mt-1 text-sm text-[#77736D]">
          Services assigned to your Viswaas account.
        </p>
      </div>

      {/* SUMMARY */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#23272B]/10 bg-white p-5">
          <p className="text-xs text-[#77736D]">
            Total Services
          </p>

          <p className="mt-2 text-2xl font-semibold text-[#23272B]">
            {services.length}
          </p>
        </div>

        <div className="rounded-xl border border-[#23272B]/10 bg-white p-5">
          <p className="text-xs text-[#77736D]">
            In Progress
          </p>

          <p className="mt-2 text-2xl font-semibold text-[#23272B]">
            {
              services.filter(
                (service) =>
                  service.status === "in_progress"
              ).length
            }
          </p>
        </div>

        <div className="rounded-xl border border-[#23272B]/10 bg-white p-5">
          <p className="text-xs text-[#77736D]">
            Completed
          </p>

          <p className="mt-2 text-2xl font-semibold text-[#23272B]">
            {
              services.filter(
                (service) =>
                  service.status === "completed"
              ).length
            }
          </p>
        </div>
      </div>

      {/* SERVICES */}
      <section className="mt-8 overflow-hidden rounded-xl border border-[#23272B]/10 bg-white">
        <div className="border-b border-[#23272B]/10 px-6 py-5">
          <p className="text-xs uppercase tracking-[0.14em] text-[#9A958D]">
            Services
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#23272B]">
            Your Services
          </h2>
        </div>

        {services.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F6E3CC]">
              <span className="text-lg text-[#B8661A]">
                +
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-[#23272B]">
              No services assigned yet
            </p>

            <p className="mt-1 text-xs text-[#77736D]">
              Services assigned by Viswaas will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#23272B]/10">
            {services.map((item) => {
              const progress = Math.min(
                Math.max(
                  Number(item.progress ?? 0),
                  0
                ),
                100
              );

              const statusLabel = item.status
                ? item.status.replace(/_/g, " ")
                : "Unknown";

              return (
                <div
                  key={item.id}
                  className="px-6 py-7"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">

                      {/* MAIN SERVICE */}
                      <p className="text-xs uppercase tracking-[0.14em] text-[#9A958D]">
                        Service
                      </p>

                      <h3 className="mt-1 text-base font-semibold text-[#23272B]">
                        {item.service?.name ||
                          "Viswaas Service"}
                      </h3>

                      {item.service?.description && (
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#77736D]">
                          {item.service.description}
                        </p>
                      )}

                      {/* ASSIGNED TASK */}
                      <div className="mt-5">
                        <p className="text-xs uppercase tracking-[0.14em] text-[#9A958D]">
                          Assigned Task
                        </p>

                        <p className="mt-1 text-sm font-medium text-[#23272B]">
                          {item.task?.name ||
                            "Task unavailable"}
                        </p>

                        {item.task?.description && (
                          <p className="mt-1 max-w-2xl text-xs leading-5 text-[#77736D]">
                            {item.task.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* STATUS */}
                    <span
                      className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize ${
                        item.status === "completed"
                          ? "bg-[#E8F1E8] text-[#47704A]"
                          : item.status === "pending"
                          ? "bg-[#F7F1E5] text-[#9A6A20]"
                          : "bg-[#F6E3CC] text-[#B8661A]"
                      }`}
                    >
                      {statusLabel}
                    </span>
                  </div>

                  {/* PROGRESS */}
                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs text-[#77736D]">
                        Progress
                      </span>

                      <span className="text-xs font-semibold text-[#23272B]">
                        {progress}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-[#23272B]/10">
                      <div
                        className="h-full rounded-full bg-[#D9822B] transition-all"
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* DATES */}
                  <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#9A958D]">
                    <span>
                      Started{" "}
                      {item.start_date
                        ? new Date(
                            item.start_date
                          ).toLocaleDateString()
                        : "Not started"}
                    </span>

                    <span>
                      {progress === 100
                        ? "Completed"
                        : `${100 - progress}% remaining`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}