import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { StatCardsSkeleton, ActivityListSkeleton } from "@/components/portal/Skeletons";

export default async function AdminPage() {
  const supabase = await createClient();

  // Unchanged: same auth check.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  // Unchanged: same role check and redirect.
const ADMIN_EMAIL = "vcg@viswaas.com";

if (user.email?.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
  redirect("/portal/dashboard");
}

  return (
    <main className="min-w-0 p-5 pt-[90px] md:p-8">
      {/* Header */}
      <div>
        <p className="text-xs font-medium tracking-[0.14em] text-[#D9822B]">Administration</p>

        <h1 className="ff-serif mt-2 text-[1.9rem] leading-tight text-[#23272B]">Overview</h1>

        <p className="mt-2 text-sm text-[#77736D]">Manage your Viswaas client operations.</p>
      </div>

      {/* Overview */}
      <Suspense fallback={<StatCardsSkeleton />}>
        <AdminOverview />
      </Suspense>

      {/* Recent activity */}
      <section className="mt-8 rounded-xl border border-[#23272B]/10 bg-white">
        <div className="border-b border-[#23272B]/10 px-6 py-5">
          <h2 className="text-base font-semibold text-[#23272B]">Recent activity</h2>
          <p className="mt-1 text-xs text-[#77736D]">
            Recent activity across your client operations.
          </p>
        </div>

        <Suspense fallback={<ActivityListSkeleton />}>
          <RecentActivity />
        </Suspense>
      </section>
    </main>
  );
}

async function AdminOverview() {
  const supabase = await createClient();

  // Unchanged: same two queries, same filters.
  const { data: clients } = await supabase.from("profiles").select("id").eq("role", "client");

  const { data: clientServices } = await supabase.from("client_services").select("id, status");

  const clientList = clients ?? [];
  const serviceList = clientServices ?? [];

  const activeServices = serviceList.filter(
    (s) => s.status === "confirmed" || s.status === "in_progress" || s.status === "review"
  ).length;

  const pendingActions = serviceList.filter((s) => s.status === "pending").length;

  return (
    <div className="mt-8 grid gap-5 md:grid-cols-3">
      <div className="rounded-xl border border-[#23272B]/10 bg-white p-6 transition-shadow duration-200 hover:shadow-[0_8px_24px_-16px_rgba(35,39,43,0.25)]">
        <p className="text-sm text-[#77736D]">Clients</p>
        <p className="mt-3 text-3xl font-semibold text-[#23272B]">{clientList.length}</p>
      </div>

      <div className="rounded-xl border border-[#23272B]/10 bg-white p-6 transition-shadow duration-200 hover:shadow-[0_8px_24px_-16px_rgba(35,39,43,0.25)]">
        <p className="text-sm text-[#77736D]">Active services</p>
        <p className="mt-3 text-3xl font-semibold text-[#23272B]">{activeServices}</p>
      </div>

      <div className="rounded-xl border border-[#23272B]/10 bg-white p-6 transition-shadow duration-200 hover:shadow-[0_8px_24px_-16px_rgba(35,39,43,0.25)]">
        <p className="text-sm text-[#77736D]">Pending actions</p>
        <p className="mt-3 text-3xl font-semibold text-[#23272B]">{pendingActions}</p>
      </div>
    </div>
  );
}

async function RecentActivity() {
  // Unchanged: no activity source existed in the original page, so
  // this still renders the same empty state rather than inventing data.
  return (
    <div className="px-6 py-12 text-center">
      <p className="text-sm text-[#77736D]">No recent activity.</p>
    </div>
  );
}