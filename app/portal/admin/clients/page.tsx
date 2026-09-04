import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

export default async function AdminClientsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/portal/dashboard");
  }

  const { data: clients } = await supabase
    .from("profiles")
    .select("id, full_name, phone, created_at")
    .eq("role", "client")
    .order("created_at", { ascending: false });

  const clientList = clients ?? [];

  return (
    <main className="min-w-0 p-5 pt-[90px] md:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#D9822B]">
                  Administration
                </p>

                <h1 className="mt-2 text-2xl font-semibold text-[#23272B] sm:text-3xl">
                  Clients
                </h1>

                <p className="mt-2 text-sm text-[#77736D]">
                  View and manage your Viswaas clients.
                </p>
              </div>

              <div className="flex w-fit items-center gap-2 rounded-lg border border-[#E8E2D9] px-4 py-2">
                <Users size={14} className="text-[#9A958D]" />
                <span className="text-sm text-[#77736D]">
                  {clientList.length} client
                  {clientList.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Client list */}
            <div className="mt-6 overflow-hidden rounded-xl border border-[#E8E2D9] bg-white sm:mt-8">
              <div className="border-b border-[#E8E2D9] px-5 py-5 sm:px-6">
                <h2 className="text-base font-semibold text-[#23272B]">
                  All Clients
                </h2>
              </div>

              {clientList.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#F6E3CC]">
                    <Users size={18} className="text-[#B8661A]" />
                  </div>
                  <p className="mt-4 text-sm text-[#77736D]">
                    No clients have registered yet.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[#E8E2D9]">
                  {clientList.map((client) => (
                    <Link
                      key={client.id}
                      href={`/portal/admin/clients/${client.id}`}
                      className="group flex flex-col gap-4 px-5 py-5 transition-colors duration-200 hover:bg-[#FAF8F5] sm:flex-row sm:items-center sm:justify-between sm:px-6"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F6E3CC] text-sm font-medium text-[#B8661A]">
                          {(client.full_name?.[0] ?? "C").toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-[#23272B]">
                            {client.full_name || "Unnamed Client"}
                          </p>

                          <p className="mt-1 truncate text-xs text-[#77736D]">
                            {client.phone || "No phone number"}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
                        <span className="text-xs text-[#9A958D] sm:hidden">
                          Joined{" "}
                          {new Date(client.created_at).toLocaleDateString()}
                        </span>

                        <span className="inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-lg border border-[#E8E2D9] px-4 text-xs font-medium text-[#23272B] transition-colors duration-200 group-hover:border-[#C49A4A] group-hover:text-[#B8661A] sm:min-h-0 sm:w-auto sm:py-2">
                          View Client
                          <ArrowRight
                            size={13}
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                          />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
      </div>
    </main>
  );
}