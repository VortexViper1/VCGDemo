import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  FileText,
  ExternalLink,
  Download,
  FileStack,
  UploadCloud,
  CheckCircle2,
} from "lucide-react";

export default async function AdminDocumentsPage() {
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

// Only this account can access the admin portal.
const ADMIN_EMAIL = "vcg@viswaas.com";

if (user.email?.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
  redirect("/portal/dashboard");
}

  // --------------------------------------------------
  // GET ALL DOCUMENTS
  // --------------------------------------------------

  const { data: documents, error: documentsError } = await supabase
    .from("documents")
    .select(
      `
      id,
      client_id,
      client_service_id,
      name,
      file_path,
      status,
      uploaded_by,
      created_at,
      file_size,
      file_type,
      storage_path
    `
    )
    .order("created_at", { ascending: false });

  if (documentsError) {
    console.error("DOCUMENTS ERROR:", JSON.stringify(documentsError, null, 2));

    throw new Error(`Documents query failed: ${documentsError.message}`);
  }

  const documentList = documents ?? [];

  // --------------------------------------------------
  // GET CLIENT IDS
  // --------------------------------------------------

  const clientIds = [
    ...new Set(documentList.map((document) => document.client_id).filter(Boolean)),
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
      console.error("CLIENT PROFILES ERROR:", JSON.stringify(error, null, 2));
    } else {
      clients = data ?? [];
    }
  }

  // --------------------------------------------------
  // GET CLIENT SERVICE IDS
  // --------------------------------------------------

  const clientServiceIds = [
    ...new Set(
      documentList.map((document) => document.client_service_id).filter(Boolean)
    ),
  ];

  // --------------------------------------------------
  // GET CLIENT SERVICE ASSIGNMENTS
  // --------------------------------------------------

  let clientServices: {
    id: string;
    service_id: string;
  }[] = [];

  if (clientServiceIds.length > 0) {
    const { data, error } = await supabase
      .from("client_services")
      .select(
        `
        id,
        service_id
      `
      )
      .in("id", clientServiceIds);

    if (error) {
      console.error("CLIENT SERVICES ERROR:", JSON.stringify(error, null, 2));
    } else {
      clientServices = data ?? [];
    }
  }

  // --------------------------------------------------
  // GET SERVICE IDS
  // --------------------------------------------------

  const serviceIds = [
    ...new Set(clientServices.map((item) => item.service_id).filter(Boolean)),
  ];

  // --------------------------------------------------
  // GET SERVICES
  // --------------------------------------------------

  let services: {
    id: string;
    name: string | null;
    description: string | null;
  }[] = [];

  if (serviceIds.length > 0) {
    const { data, error } = await supabase
      .from("services")
      .select(
        `
        id,
        name,
        description
      `
      )
      .in("id", serviceIds);

    if (error) {
      console.error("SERVICES ERROR:", JSON.stringify(error, null, 2));
    } else {
      services = data ?? [];
    }
  }

  // --------------------------------------------------
  // LOOKUP MAPS
  // --------------------------------------------------

  const clientsById = new Map(clients.map((client) => [client.id, client]));

  const clientServicesById = new Map(
    clientServices.map((item) => [item.id, item])
  );

  const servicesById = new Map(services.map((service) => [service.id, service]));

  // --------------------------------------------------
  // COMBINE EVERYTHING
  // --------------------------------------------------

  const rows = documentList.map((document) => {
    const clientService = clientServicesById.get(document.client_service_id);

    const service = clientService
      ? servicesById.get(clientService.service_id)
      : undefined;

    return {
      ...document,
      client: clientsById.get(document.client_id),
      service,
    };
  });

  // --------------------------------------------------
  // SUMMARY
  // --------------------------------------------------

  const totalDocuments = rows.length;

  const uploadedDocuments = rows.filter(
    (item) => item.status === "uploaded"
  ).length;

  const reviewedDocuments = rows.filter(
    (item) => item.status === "reviewed" || item.status === "approved"
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
          Documents
        </h1>

        <p className="mt-1 text-sm text-[#77736D]">
          View documents uploaded by your Viswaas clients.
        </p>
      </div>

      {/* SUMMARY */}
      <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        <SummaryCard
          icon={<FileStack size={16} className="text-[#B8661A]" />}
          label="Total Documents"
          value={totalDocuments}
        />
        <SummaryCard
          icon={<UploadCloud size={16} className="text-[#B8661A]" />}
          label="Uploaded"
          value={uploadedDocuments}
        />
        <SummaryCard
          icon={<CheckCircle2 size={16} className="text-[#B8661A]" />}
          label="Reviewed"
          value={reviewedDocuments}
        />
      </div>

      {/* DOCUMENTS */}
      <section className="mt-6 overflow-hidden rounded-xl border border-[#E8E2D9] bg-white sm:mt-8">
        {/* SECTION HEADER */}
        <div className="border-b border-[#E8E2D9] px-5 py-5 md:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#9A958D]">
            Files
          </p>

          <h2 className="mt-1 text-base font-semibold text-[#23272B]">
            Client Documents
          </h2>

          <p className="mt-1 text-xs text-[#77736D]">
            All documents uploaded by your clients.
          </p>
        </div>

        {/* EMPTY STATE */}
        {rows.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F6E3CC]">
              <FileText size={20} strokeWidth={1.7} className="text-[#B8661A]" />
            </div>

            <p className="mt-4 text-sm font-medium text-[#23272B]">
              No documents
            </p>

            <p className="mt-1 text-sm text-[#77736D]">
              No client documents have been uploaded yet.
            </p>
          </div>
        ) : (
          /* DOCUMENT LIST */
          <div className="divide-y divide-[#E8E2D9]">
            {rows.map((item) => {
              const client = item.client;
              const service = item.service;

              const clientName = client?.full_name || "Unnamed Client";
              const initial = clientName.charAt(0).toUpperCase();

              return (
                <div
                  key={item.id}
                  className="p-5 transition-colors duration-200 hover:bg-[#FAF8F5] md:p-6"
                >
                  {/* CLIENT */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F6E3CC] text-sm font-medium text-[#B8661A]">
                        {initial}
                      </div>

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
                      className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize ${documentStatusClass(
                        item.status
                      )}`}
                    >
                      {item.status ? item.status.replace(/_/g, " ") : "Uploaded"}
                    </span>
                  </div>

                  {/* DOCUMENT CARD */}
                  <div className="mt-5 rounded-lg border border-[#E8E2D9] bg-[#FAF8F5] p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      {/* FILE INFO */}
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E8E2D9] bg-white">
                          <FileText
                            size={19}
                            strokeWidth={1.7}
                            className="text-[#B8661A]"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-[#23272B]">
                            {item.name || "Untitled Document"}
                          </p>

                          {/* SERVICE */}
                          {service?.name && (
                            <p className="mt-1 text-xs text-[#77736D]">
                              Service: {service.name}
                            </p>
                          )}

                          {/* FILE TYPE + SIZE */}
                          <p className="mt-1 text-xs text-[#9A958D]">
                            {[item.file_type, formatFileSize(item.file_size)]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>

                          {/* DATE */}
                          {item.created_at && (
                            <p className="mt-1 text-xs text-[#9A958D]">
                              Uploaded:{" "}
                              {new Date(item.created_at).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* ACTIONS */}
                      {item.file_path && isHttpUrl(item.file_path) && (
                        <div className="flex shrink-0 gap-2">
                          <a
                            href={item.file_path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#E8E2D9] bg-white px-3 text-xs font-medium text-[#4B4A47] transition-colors duration-200 hover:border-[#C49A4A]/60 hover:bg-white sm:min-h-[36px]"
                          >
                            <ExternalLink size={14} />
                            View
                          </a>

                          <a
                            href={item.file_path}
                            download
                            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#23272B] px-3 text-xs font-medium text-white transition-colors duration-200 hover:bg-[#D9822B] sm:min-h-[36px]"
                          >
                            <Download size={14} />
                            Download
                          </a>
                        </div>
                      )}
                    </div>
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

      <p className="mt-3 text-3xl font-semibold text-[#23272B]">{value}</p>
    </div>
  );
}

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

function isHttpUrl(value: string | null) {
  if (!value) return false;

  return value.startsWith("http://") || value.startsWith("https://");
}

function formatFileSize(bytes: number | string | null | undefined) {
  const size = Number(bytes);

  if (!Number.isFinite(size) || !bytes) {
    return "";
  }

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

// uploaded = awaiting review (neutral), reviewed/approved = done (green),
// anything else falls back to the amber "in progress" tone.
function documentStatusClass(status: string | null) {
  if (status === "uploaded") return "bg-[#F1F0EE] text-[#77736D]";
  if (status === "reviewed" || status === "approved")
    return "bg-[#EAF4EC] text-[#3C7A4B]";
  return "bg-[#F6E3CC] text-[#B8661A]";
}