import { redirect } from "next/navigation";
import { FileText } from "lucide-react";
import DocumentDownload from "@/components/portal/DocumentDownload";
import { createClient } from "@/lib/supabase/server";
import EmployeeDocumentUpload from "@/components/portal/EmployeeDocumentUpload";
import RequestDocument from "@/components/portal/RequestDocument";

export default async function EmployeeDocumentsPage() {
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

  const { data: employee } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", user.id)
    .single();

  if (employee?.role !== "team") {
    redirect("/portal/dashboard");
  }

  // --------------------------------------------------
  // GET DOCUMENTS SENT TO EMPLOYEE
  // --------------------------------------------------

  const { data: documents, error } = await supabase
    .from("documents")
    .select(`
      id,
      name,
      file_type,
      file_path,
      client_id,
      created_at
    `)
    .eq("recipient_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(
      "EMPLOYEE DOCUMENTS ERROR:",
      JSON.stringify(error, null, 2)
    );
  }

  const employeeDocuments = documents ?? [];

  // --------------------------------------------------
  // GET CLIENTS
  // --------------------------------------------------

  const clientIds = [
    ...new Set(
      employeeDocuments
        .map((document) => document.client_id)
        .filter(Boolean)
    ),
  ];

  let clients: {
    id: string;
    full_name: string | null;
  }[] = [];

  if (clientIds.length > 0) {
    const { data: clientData, error: clientsError } =
      await supabase
        .from("profiles")
        .select("id, full_name")
        .eq("role", "client")
        .in("id", clientIds);

    if (clientsError) {
      console.error(
        "EMPLOYEE DOCUMENT CLIENTS ERROR:",
        JSON.stringify(clientsError, null, 2)
      );
    } else {
      clients = clientData ?? [];
    }
  }

  const clientsById = new Map(
    clients.map((client) => [client.id, client])
  );

  return (
    <main className="min-w-0 p-5 pt-8 md:p-8">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#D9822B]">
            Workspace
          </p>

          <h1 className="mt-2 text-2xl font-semibold text-[#23272B]">
            Documents
          </h1>

          <p className="mt-1 text-sm text-[#77736D]">
            Documents shared with you by clients and Viswaas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <RequestDocument />
          <EmployeeDocumentUpload />
        </div>
      </div>

      {/* SUMMARY */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#23272B]/10 bg-white p-5">
          <p className="text-xs text-[#77736D]">
            Total Documents
          </p>

          <p className="mt-2 text-2xl font-semibold text-[#23272B]">
            {employeeDocuments.length}
          </p>
        </div>

        <div className="rounded-xl border border-[#23272B]/10 bg-white p-5">
          <p className="text-xs text-[#77736D]">
            From Clients
          </p>

          <p className="mt-2 text-2xl font-semibold text-[#23272B]">
            {employeeDocuments.length}
          </p>
        </div>

        <div className="rounded-xl border border-[#23272B]/10 bg-white p-5">
          <p className="text-xs text-[#77736D]">
            Recent
          </p>

          <p className="mt-2 text-2xl font-semibold text-[#23272B]">
            {employeeDocuments.filter((document) => {
              const created = new Date(document.created_at);
              const sevenDaysAgo = new Date();

              sevenDaysAgo.setDate(
                sevenDaysAgo.getDate() - 7
              );

              return created >= sevenDaysAgo;
            }).length}
          </p>
        </div>
      </div>

      {/* DOCUMENTS */}
      <section className="mt-8 overflow-hidden rounded-xl border border-[#23272B]/10 bg-white">
        <div className="border-b border-[#23272B]/10 px-6 py-5">
          <p className="text-xs uppercase tracking-[0.14em] text-[#9A958D]">
            Files
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#23272B]">
            Shared Documents
          </h2>

          <p className="mt-1 text-xs text-[#77736D]">
            Files available to you from your assigned clients.
          </p>
        </div>

        {employeeDocuments.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F6E3CC]">
              <FileText
                size={18}
                className="text-[#B8661A]"
              />
            </div>

            <p className="mt-4 text-sm font-medium text-[#23272B]">
              No documents yet
            </p>

            <p className="mt-1 text-xs text-[#77736D]">
              Documents sent to you by clients will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#23272B]/10">
            {employeeDocuments.map((document) => {
              const client = document.client_id
                ? clientsById.get(document.client_id)
                : undefined;

              return (
                <div
                  key={document.id}
                  className="flex flex-col gap-4 px-6 py-5 transition-colors duration-200 hover:bg-[#FCFBF8] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F6E3CC]">
                      <FileText
                        size={17}
                        className="text-[#B8661A]"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#23272B]">
                        {document.name}
                      </p>

                      <p className="mt-1 text-xs text-[#77736D]">
                        {document.file_type || "File"}
                      </p>

                      <p className="mt-1 text-xs text-[#9A958D]">
                        From{" "}
                        {client?.full_name || "Client"}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-4">
                    <span className="text-xs text-[#9A958D]">
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
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}