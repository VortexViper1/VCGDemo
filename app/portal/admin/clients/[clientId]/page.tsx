import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building2, Phone, FileText, Layers } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import AssignServiceForm from "@/components/portal/AssignServiceForm";
import DocumentUpload from "@/components/portal/DocumentUpload";
import EditClientService from "@/components/portal/EditClientService";
import RemoveClientService from "@/components/portal/RemoveClientService";

type Props = {
  params: Promise<{
    clientId: string;
  }>;
};

// Status -> badge styling
const STATUS_STYLES: Record<string, string> = {
  completed: "bg-[#EAF4EC] text-[#3C7A4B]",
  in_progress: "bg-[#F6E3CC] text-[#B8661A]",
  pending: "bg-[#F1F0EE] text-[#77736D]",
  on_hold: "bg-[#FBEAEA] text-[#B24545]",
};

function statusBadgeClass(status: string) {
  return STATUS_STYLES[status] ?? "bg-[#F6E3CC] text-[#B8661A]";
}

function formatFileSize(bytes: number | null | undefined) {
  if (!bytes && bytes !== 0) return null;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default async function ClientDetailsPage({ params }: Props) {
  const { clientId } = await params;

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
  // CHECK ADMIN ROLE
  // --------------------------------------------------

  const { data: adminProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (adminProfile?.role !== "admin") {
    redirect("/portal/dashboard");
  }

  // --------------------------------------------------
  // GET AVAILABLE MAIN SERVICES
  // --------------------------------------------------

  const { data: availableServices } = await supabase
    .from("services")
    .select("id, name")
    .eq("active", true)
    .order("name");

  // --------------------------------------------------
  // GET CLIENT
  // --------------------------------------------------

  const { data: client } = await supabase
    .from("profiles")
    .select("id, full_name, phone, created_at")
    .eq("id", clientId)
    .eq("role", "client")
    .single();

  if (!client) {
    redirect("/portal/admin/clients");
  }

  // --------------------------------------------------
  // GET COMPANY
  // --------------------------------------------------

  const { data: company } = await supabase
    .from("companies")
    .select("id, name, website, business_type")
    .eq("owner_id", clientId)
    .maybeSingle();

  // --------------------------------------------------
  // GET DOCUMENTS
  // --------------------------------------------------

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
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  const clientDocuments = documents ?? [];

  // --------------------------------------------------
  // GET ASSIGNED SERVICES + CUSTOM TASKS
  // --------------------------------------------------

  const { data: clientServices, error: clientServicesError } =
    await supabase
      .from("client_services")
      .select(
        `
        id,
        task_id,
        status,
        progress,
        start_date,
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
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });

  if (clientServicesError) {
    console.error(
      "CLIENT SERVICES ERROR:",
      JSON.stringify(clientServicesError, null, 2)
    );
  }

  const services = clientServices ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* Back */}
      <Link
        href="/portal/admin/clients"
        className="group inline-flex items-center gap-2 text-sm text-[#77736D] transition-colors duration-200 hover:text-[#D9822B]"
      >
        <ArrowLeft
          size={16}
          className="transition-transform duration-200 group-hover:-translate-x-0.5"
        />
        Back to Clients
      </Link>

      {/* Client heading */}
      <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#D9822B]">
            Client
          </p>

          <h1 className="mt-2 truncate text-2xl font-semibold text-[#23272B] sm:text-3xl">
            {client.full_name || "Unnamed Client"}
          </h1>

          <p className="mt-2 flex items-center gap-1.5 text-sm text-[#77736D]">
            <Phone size={14} className="shrink-0 text-[#9A958D]" />
            {client.phone || "No phone number"}
          </p>
        </div>

        <div className="shrink-0 self-start rounded-full bg-[#F6E3CC] px-4 py-1.5 text-xs font-medium tracking-wide text-[#B8661A]">
          Client
        </div>
      </div>

      {/* Profile + Company */}
      <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2">
        <section className="rounded-xl border border-[#E8E2D9] bg-white p-5 transition-shadow duration-200 sm:p-6">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#9A958D]">
            Profile
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-xs text-[#9A958D]">Full name</p>
              <p className="mt-1 text-sm text-[#23272B]">
                {client.full_name || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#9A958D]">Phone</p>
              <p className="mt-1 text-sm text-[#23272B]">
                {client.phone || "Not provided"}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[#E8E2D9] bg-white p-5 transition-shadow duration-200 sm:p-6">
          <div className="flex items-center gap-2">
            <Building2 size={14} className="text-[#9A958D]" />

            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#9A958D]">
              Company
            </p>
          </div>

          {company ? (
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs text-[#9A958D]">Company name</p>
                <p className="mt-1 text-sm text-[#23272B]">
                  {company.name}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#9A958D]">Business type</p>
                <p className="mt-1 text-sm text-[#23272B]">
                  {company.business_type || "Not provided"}
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-5 text-sm text-[#77736D]">
              No company information has been added yet.
            </p>
          )}
        </section>
      </div>

      {/* Services */}
      <section className="mt-6 rounded-xl border border-[#E8E2D9] bg-white sm:mt-8">
        <div className="flex flex-col gap-4 border-b border-[#E8E2D9] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2">
            <Layers size={14} className="text-[#9A958D]" />

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#9A958D]">
                Services
              </p>

              <h2 className="mt-0.5 text-lg font-semibold text-[#23272B]">
                Assigned Services
              </h2>
            </div>
          </div>

          <AssignServiceForm
            clientId={client.id}
            services={availableServices ?? []}
          />
        </div>

        {services.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <p className="text-sm text-[#77736D]">
              No services assigned to this client.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#E8E2D9]">
            {services.map((item) => {
              const task = Array.isArray(item.service_tasks)
                ? item.service_tasks[0]
                : item.service_tasks;

              const service = Array.isArray(task?.services)
                ? task.services[0]
                : task?.services;

              return (
                <div
                  key={item.id}
                  className="px-5 py-6 transition-colors duration-200 hover:bg-[#FAF8F5] sm:px-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div className="min-w-0">
                      {/* MAIN SERVICE */}
                      <p className="text-xs uppercase tracking-[0.12em] text-[#9A958D]">
                        Service
                      </p>

                      <h3 className="mt-1 text-sm font-medium text-[#23272B]">
                        {service?.name || "Service"}
                      </h3>

                      {service?.description && (
                        <p className="mt-1 text-xs leading-relaxed text-[#77736D]">
                          {service.description}
                        </p>
                      )}

                      {/* CUSTOM TASK */}
                      <div className="mt-4">
                        <p className="text-xs uppercase tracking-[0.12em] text-[#9A958D]">
                          Task
                        </p>

                        <p className="mt-1 text-sm font-medium text-[#23272B]">
                          {task?.name || "Task"}
                        </p>

                        {task?.description && (
                          <p className="mt-1 text-xs leading-relaxed text-[#77736D]">
                            {task.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 sm:shrink-0">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusBadgeClass(
                          item.status
                        )}`}
                      >
                        {item.status
                          ? item.status.replace(/_/g, " ")
                          : "Unknown"}
                      </span>

                      <EditClientService
                        serviceId={item.id}
                        clientId={client.id}
                        serviceName={task?.name || "Task"}
                        initialStatus={item.status}
                        initialProgress={item.progress}
                      />

                      <RemoveClientService
                        serviceId={item.id}
                        clientId={client.id}
                        serviceName={task?.name || "Task"}
                      />
                    </div>
                  </div>

                  {/* PROGRESS */}
                  <div className="mt-5">
                    <div className="mb-2 flex justify-between text-xs">
                      <span className="text-[#77736D]">
                        Progress
                      </span>

                      <span className="font-medium text-[#23272B]">
                        {item.progress}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-[#F1EFEA]">
                      <div
                        className="h-full rounded-full bg-[#D9822B] transition-all duration-300"
                        style={{
                          width: `${Math.min(
                            Math.max(Number(item.progress ?? 0), 0),
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Documents */}
      <section className="mt-6 mb-8 rounded-xl border border-[#E8E2D9] bg-white sm:mt-8">
        <div className="flex flex-col gap-4 border-b border-[#E8E2D9] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2">
            <FileText size={14} className="text-[#9A958D]" />

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#9A958D]">
                Files
              </p>

              <h2 className="mt-0.5 text-lg font-semibold text-[#23272B]">
                Documents
              </h2>
            </div>
          </div>

          <DocumentUpload clientId={client.id} />
        </div>

        {clientDocuments.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <p className="text-sm text-[#77736D]">
              No documents have been uploaded for this client.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#E8E2D9]">
            {clientDocuments.map((document) => {
              const size = formatFileSize(document.file_size);

              return (
                <div
                  key={document.id}
                  className="flex items-center gap-4 px-5 py-4 transition-colors duration-200 hover:bg-[#FAF8F5] sm:px-6 sm:py-5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F6E3CC]">
                    <FileText
                      size={16}
                      className="text-[#B8661A]"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#23272B]">
                      {document.name}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-[#77736D]">
                      {document.file_type || "File"}
                      {size ? ` · ${size}` : ""}
                    </p>
                  </div>

                  <span className="shrink-0 text-xs text-[#9A958D]">
                    {new Date(
                      document.created_at
                    ).toLocaleDateString()}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}