import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DocumentDownload from "@/components/portal/DocumentDownload";
import ClientRequiredDocumentUpload from "@/components/portal/ClientRequiredDocumentUpload";

export default async function DocumentsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  // --------------------------------------------------
  // GET CLIENT DOCUMENTS
  // --------------------------------------------------

  const { data: documents, error: documentsError } = await supabase
    .from("documents")
    .select(`
      id,
      name,
      file_type,
      file_path,
      created_at
    `)
    .eq("client_id", user.id)
    .order("created_at", { ascending: false });

  if (documentsError) {
    console.error(
      "CLIENT DOCUMENTS ERROR:",
      JSON.stringify(documentsError, null, 2)
    );
  }

  const clientDocuments = documents ?? [];

  // --------------------------------------------------
  // GET REQUIRED DOCUMENT REQUESTS
  // --------------------------------------------------

  const {
    data: documentRequests,
    error: requestsError,
  } = await supabase
    .from("document_requests")
    .select(`
      id,
      employee_id,
      title,
      description,
      status,
      created_at,
      fulfilled_at
    `)
    .eq("client_id", user.id)
    .order("created_at", { ascending: false });

  if (requestsError) {
    console.error(
      "DOCUMENT REQUESTS ERROR:",
      JSON.stringify(requestsError, null, 2)
    );
  }

  const requests = documentRequests ?? [];

  const pendingRequests = requests.filter(
    (request) => request.status === "pending"
  );

  return (
    <div className="p-5 md:p-8">
      {/* HEADER */}
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-[#D9822B]">
          Workspace
        </p>

        <h1 className="mt-2 text-2xl font-semibold text-[#23272B]">
          Documents
        </h1>

        <p className="mt-1 text-sm text-[#77736D]">
          Documents shared with you by Viswaas.
        </p>
      </div>

      {/* SUMMARY */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[#23272B]/10 bg-white p-5">
          <p className="text-xs text-[#77736D]">
            Total Documents
          </p>

          <p className="mt-2 text-2xl font-semibold text-[#23272B]">
            {clientDocuments.length}
          </p>
        </div>

        <div className="rounded-xl border border-[#23272B]/10 bg-white p-5">
          <p className="text-xs text-[#77736D]">
            Latest Upload
          </p>

          <p className="mt-2 text-sm font-semibold text-[#23272B]">
            {clientDocuments.length > 0
              ? new Date(
                  clientDocuments[0].created_at
                ).toLocaleDateString()
              : "No documents"}
          </p>
        </div>
      </div>

      {/* REQUIRED DOCUMENTS */}
      {pendingRequests.length > 0 && (
        <section className="mt-8 overflow-hidden rounded-xl border border-[#23272B]/10 bg-white">
          <div className="border-b border-[#23272B]/10 px-6 py-5">
            <p className="text-xs uppercase tracking-[0.14em] text-[#D9822B]">
              Action Required
            </p>

            <h2 className="mt-1 text-lg font-semibold text-[#23272B]">
              Required Documents
            </h2>

            <p className="mt-1 text-xs text-[#77736D]">
              Documents requested by your assigned Viswaas employee.
            </p>
          </div>

          <div className="divide-y divide-[#23272B]/10">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#23272B]">
                    {request.title}
                  </p>

                  {request.description && (
                    <p className="mt-1 max-w-2xl text-xs leading-5 text-[#77736D]">
                      {request.description}
                    </p>
                  )}

                  <p className="mt-2 text-xs text-[#9A958D]">
                    Requested on{" "}
                    {new Date(
                      request.created_at
                    ).toLocaleDateString()}
                  </p>
                </div>

                <ClientRequiredDocumentUpload
                  requestId={request.id}
                  title={request.title}
                  employeeId={request.employee_id}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* DOCUMENTS */}
      <section className="mt-8 overflow-hidden rounded-xl border border-[#23272B]/10 bg-white">
        <div className="border-b border-[#23272B]/10 px-6 py-5">
          <p className="text-xs uppercase tracking-[0.14em] text-[#9A958D]">
            Files
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#23272B]">
            Your Documents
          </h2>

          <p className="mt-1 text-xs text-[#77736D]">
            Files securely shared with your account.
          </p>
        </div>

        {clientDocuments.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F6E3CC]">
              <span className="text-lg text-[#B8661A]">
                +
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-[#23272B]">
              No documents yet
            </p>

            <p className="mt-1 text-xs text-[#77736D]">
              Documents shared by Viswaas will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#23272B]/10">
            {clientDocuments.map((document) => (
              <div
                key={document.id}
                className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#23272B]">
                    {document.name}
                  </p>

                  <p className="mt-1 text-xs text-[#77736D]">
                    {document.file_type || "File"}
                  </p>

                  <p className="mt-1 text-[11px] text-[#9A958D]">
                    Shared{" "}
                    {new Date(
                      document.created_at
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="shrink-0">
                  <DocumentDownload
                    filePath={document.file_path}
                    fileName={document.name}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}