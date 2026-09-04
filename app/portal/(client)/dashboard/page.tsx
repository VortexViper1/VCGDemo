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
      profile?.full_name?.split(" ")[0] || user.email?.split("@")[0] || "there";

    return (
      <div className="p-5 md:p-8">
        {/* Header */}
        <div>
          <p className="text-xs font-medium tracking-[0.14em] text-[#D9822B]">Client portal</p>
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
              <h2 className="text-base font-semibold text-[#23272B]">My Services</h2>
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
            <p className="text-xs font-medium tracking-[0.1em] text-[#9A958D]">Files</p>
            <h2 className="ff-serif mt-1 text-lg text-[#23272B]">Documents</h2>
            <p className="mt-1 text-xs text-[#77736D]">Documents shared with you by Viswaas.</p>
          </div>

          <Suspense fallback={<DocumentListSkeleton />}>
            <DocumentList userId={user.id} />
          </Suspense>
        </section>
      </div>
    );
  }

  async function ServiceOverview({ userId }: { userId: string }) {
    const supabase = await createClient();

    const { data: clientServices } = await supabase
      .from("client_services")
      .select("id, status")
      .eq("client_id", userId);

    const services = clientServices ?? [];

    const activeServices = services.filter(
      (s) => s.status === "confirmed" || s.status === "in_progress" || s.status === "review"
    ).length;
    const completedServices = services.filter((s) => s.status === "completed").length;
    const pendingServices = services.filter((s) => s.status === "pending").length;

    return (
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <div className="rounded-xl border border-[#23272B]/10 bg-white p-6 transition-shadow duration-200 hover:shadow-[0_8px_24px_-16px_rgba(35,39,43,0.25)]">
          <p className="text-sm text-[#77736D]">Active services</p>
          <p className="mt-3 text-3xl font-semibold text-[#23272B]">{activeServices}</p>
        </div>
        <div className="rounded-xl border border-[#23272B]/10 bg-white p-6 transition-shadow duration-200 hover:shadow-[0_8px_24px_-16px_rgba(35,39,43,0.25)]">
          <p className="text-sm text-[#77736D]">Pending</p>
          <p className="mt-3 text-3xl font-semibold text-[#23272B]">{pendingServices}</p>
        </div>
        <div className="rounded-xl border border-[#23272B]/10 bg-white p-6 transition-shadow duration-200 hover:shadow-[0_8px_24px_-16px_rgba(35,39,43,0.25)]">
          <p className="text-sm text-[#77736D]">Completed</p>
          <p className="mt-3 text-3xl font-semibold text-[#23272B]">{completedServices}</p>
        </div>
      </div>
    );
  }

  async function ServiceList({ userId }: { userId: string }) {
    const supabase = await createClient();

    const { data: clientServices } = await supabase
      .from("client_services")
      .select(
        `
        id,
        status,
        progress,
        start_date,
        services (
          id,
          name,
          description
        )
      `
      )
      .eq("client_id", userId)
      .order("created_at", { ascending: false });

    const services = clientServices ?? [];

    if (services.length === 0) {
      return (
        <div className="px-6 py-14 text-center">
          <p className="text-sm text-[#77736D]">No services have been assigned to your account yet.</p>
        </div>
      );
    }

    return (
      <div className="divide-y divide-[#23272B]/10">
        {services.map((item) => {
          const service = Array.isArray(item.services) ? item.services[0] : item.services;

          return (
            <div key={item.id} className="px-6 py-6 transition-colors duration-200 hover:bg-[#FCFBF8]">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="font-medium text-[#23272B]">{service?.name ?? "Viswaas Service"}</h3>
                  <p className="mt-1 text-sm text-[#77736D]">{service?.description}</p>
                </div>

                <span className="shrink-0 rounded-full bg-[#F6E3CC] px-3 py-1 text-xs font-medium capitalize text-[#B8661A]">
                  {item.status.replace("_", " ")}
                </span>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-[#77736D]">Progress</span>
                  <span className="font-medium text-[#23272B]">{item.progress}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#23272B]/10">
                  <div
                    className="h-full rounded-full bg-[#D9822B] transition-all duration-500"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  async function DocumentList({ userId }: { userId: string }) {
    const supabase = await createClient();

    const { data: documents } = await supabase
      .from("documents")
      .select(
        `
        id,
        name,
        file_type,
        file_size,
        file_path,
        created_at
      `
      )
      .eq("client_id", userId)
      .order("created_at", { ascending: false });

    const clientDocuments = documents ?? [];

    if (clientDocuments.length === 0) {
      return (
        <div className="px-6 py-14 text-center">
          <p className="text-sm text-[#77736D]">No documents have been shared with you yet.</p>
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
              <p className="truncate text-sm font-medium text-[#23272B]">{document.name}</p>
              <p className="mt-1 text-xs text-[#77736D]">
                {document.file_type || "File"} · {(document.file_size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <span className="hidden text-xs text-[#9A958D] sm:block">
                {new Date(document.created_at).toLocaleDateString()}
              </span>
              <DocumentDownload filePath={document.file_path} fileName={document.name} />
            </div>
          </div>
        ))}
      </div>
    );
  }