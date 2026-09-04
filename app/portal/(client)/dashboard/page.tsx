import { redirect } from "next/navigation";
import { Suspense } from "react";
import DocumentDownload from "@/components/portal/DocumentDownload";
import { createClient } from "@/lib/supabase/server";
import {
  StatCardsSkeleton,
  ServiceListSkeleton,
  DocumentListSkeleton,
} from "@/components/portal/Skeletons";

export default async function DashboardPage() {
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

  const firstName =
    profile?.full_name?.split(" ")[0] ||
    user.email?.split("@")[0] ||
    "there";

  return (
    <div className="p-5 md:p-8">
      {/* Header */}
      <div>
        <p className="text-xs font-medium tracking-[0.14em] text-[#D9822B]">
          Client portal
        </p>

        <h1 className="ff-serif mt-2 text-[1.9rem] leading-tight text-[#23272B]">
          Good morning, {firstName}
        </h1>

        <p className="mt-1 text-sm text-[#77736D]">
          Here&apos;s an overview of your Viswaas services.
        </p>
      </div>

      <Suspense fallback={<StatCardsSkeleton />}>
        <ServiceOverview userId={user.id} />
      </Suspense>

      <section className="mt-8 rounded-xl border border-[#23272B]/10 bg-white">
        <div className="flex items-center justify-between border-b border-[#23272B]/10 px-6 py-5">
          <div>
            <h2 className="text-base font-semibold text-[#23272B]">
              My Services
            </h2>

            <p className="mt-1 text-xs text-[#77736D]">
              Services currently associated with your account.
            </p>
          </div>
        </div>

        <Suspense fallback={<ServiceListSkeleton />}>
          <ServiceList userId={user.id} />
        </Suspense>
      </section>

      <section className="mt-8 rounded-xl border border-[#23272B]/10 bg-white">
        <div className="border-b border-[#23272B]/10 px-6 py-5">
          <p className="text-xs font-medium tracking-[0.1em] text-[#9A958D]">
            Files
          </p>

          <h2 className="ff-serif mt-1 text-lg text-[#23272B]">
            Documents
          </h2>

          <p className="mt-1 text-xs text-[#77736D]">
            Documents shared with you by Viswaas.
          </p>
        </div>

        <Suspense fallback={<DocumentListSkeleton />}>
          <DocumentList userId={user.id} />
        </Suspense>
      </section>
    </div>
  );
}

/* =========================================================
   SERVICE OVERVIEW
========================================================= */

async function ServiceOverview({ userId }: { userId: string }) {
  const supabase = await createClient();

  const { data: clientServices, error } = await supabase
    .from("client_services")
    .select("id, status")
    .eq("client_id", userId);

  if (error) {
    console.error("SERVICE OVERVIEW ERROR:", error);
  }

  const services = clientServices ?? [];

  const activeServices = services.filter((s) => {
    const status = String(s.status ?? "").trim().toLowerCase();

    return (
      status === "confirmed" ||
      status === "in_progress" ||
      status === "in progress" ||
      status === "review"
    );
  }).length;

  const completedServices = services.filter((s) => {
    const status = String(s.status ?? "").trim().toLowerCase();

    return status === "completed";
  }).length;

  const pendingServices = services.filter((s) => {
    const status = String(s.status ?? "").trim().toLowerCase();

    return status === "pending";
  }).length;

  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-3">
      <div className="rounded-xl border border-[#23272B]/10 bg-white p-6 transition-shadow duration-200 hover:shadow-[0_8px_24px_-16px_rgba(35,39,43,0.25)]">
        <p className="text-sm text-[#77736D]">Active services</p>

        <p className="mt-3 text-3xl font-semibold text-[#23272B]">
          {activeServices}
        </p>
      </div>

      <div className="rounded-xl border border-[#23272B]/10 bg-white p-6 transition-shadow duration-200 hover:shadow-[0_8px_24px_-16px_rgba(35,39,43,0.25)]">
        <p className="text-sm text-[#77736D]">Pending</p>

        <p className="mt-3 text-3xl font-semibold text-[#23272B]">
          {pendingServices}
        </p>
      </div>

      <div className="rounded-xl border border-[#23272B]/10 bg-white p-6 transition-shadow duration-200 hover:shadow-[0_8px_24px_-16px_rgba(35,39,43,0.25)]">
        <p className="text-sm text-[#77736D]">Completed</p>

        <p className="mt-3 text-3xl font-semibold text-[#23272B]">
          {completedServices}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   SERVICE LIST
========================================================= */

async function ServiceList({ userId }: { userId: string }) {
  const supabase = await createClient();

  /*
    New relationship:

    client_services
      ↓ task_id
    service_tasks
      ↓ service_id
    services
  */

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
      .eq("client_id", userId)
      .order("created_at", { ascending: false });

  if (clientServicesError) {
    console.error(
      "CLIENT SERVICES ERROR:",
      clientServicesError
    );
  }

  const assignments = clientServices ?? [];

  if (assignments.length === 0) {
    return (
      <div className="px-6 py-14 text-center">
        <p className="text-sm text-[#77736D]">
          No services have been assigned to your account yet.
        </p>
      </div>
    );
  }

  /* Get task IDs */

  const taskIds = [
    ...new Set(
      assignments
        .map((item) => item.task_id)
        .filter(Boolean)
    ),
  ];

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
      console.error("SERVICE TASKS ERROR:", error);
    } else {
      tasks = data ?? [];
    }
  }

  /* Get main service IDs */

  const serviceIds = [
    ...new Set(
      tasks
        .map((task) => task.service_id)
        .filter(Boolean)
    ),
  ];

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
      console.error("SERVICES ERROR:", error);
    } else {
      mainServices = data ?? [];
    }
  }

  /* Create lookup maps */

  const tasksById = new Map(
    tasks.map((task) => [task.id, task])
  );

  const servicesById = new Map(
    mainServices.map((service) => [service.id, service])
  );

  /* Combine everything */

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
    <div className="divide-y divide-[#23272B]/10">
      {services.map((item) => {
        const status = String(item.status ?? "")
          .trim()
          .toLowerCase()
          .replace("_", " ");

        return (
          <div
            key={item.id}
            className="px-6 py-6 transition-colors duration-200 hover:bg-[#FCFBF8]"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0">
                <h3 className="font-medium text-[#23272B]">
                  {item.service?.name ?? "Viswaas Service"}
                </h3>

                <p className="mt-1 text-sm text-[#77736D]">
                  {item.task?.name ?? "Task unavailable"}
                </p>

                {item.service?.description && (
                  <p className="mt-1 text-xs text-[#9A958D]">
                    {item.service.description}
                  </p>
                )}
              </div>

              <span className="shrink-0 rounded-full bg-[#F6E3CC] px-3 py-1 text-xs font-medium capitalize text-[#B8661A]">
                {status || "pending"}
              </span>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex justify-between text-xs">
                <span className="text-[#77736D]">
                  Progress
                </span>

                <span className="font-medium text-[#23272B]">
                  {item.progress ?? 0}%
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-[#23272B]/10">
                <div
                  className="h-full rounded-full bg-[#D9822B] transition-all duration-500"
                  style={{
                    width: `${item.progress ?? 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   DOCUMENT LIST
========================================================= */

async function DocumentList({ userId }: { userId: string }) {
  const supabase = await createClient();

  const { data: documents, error } = await supabase
    .from("documents")
    .select(`
      id,
      name,
      file_type,
      file_size,
      file_path,
      created_at
    `)
    .eq("client_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("DOCUMENTS ERROR:", error);
  }

  const clientDocuments = documents ?? [];

  if (clientDocuments.length === 0) {
    return (
      <div className="px-6 py-14 text-center">
        <p className="text-sm text-[#77736D]">
          No documents have been shared with you yet.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-[#23272B]/10">
      {clientDocuments.map((document) => (
        <div
          key={document.id}
          className="flex flex-col gap-3 px-6 py-5 transition-colors duration-200 hover:bg-[#FCFBF8] sm:flex-row sm:items-center sm:justify-between sm:gap-5"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#23272B]">
              {document.name}
            </p>

            <p className="mt-1 text-xs text-[#77736D]">
              {document.file_type || "File"} ·{" "}
              {(
                (document.file_size ?? 0) /
                1024 /
                1024
              ).toFixed(2)}{" "}
              MB
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <span className="hidden text-xs text-[#9A958D] sm:block">
              {new Date(
                document.created_at
              ).toLocaleDateString()}
            </span>

            <DocumentDownload
              filePath={document.file_path}
              fileName={document.name}
            />
          </div>
        </div>
      ))}
    </div>
  );
}