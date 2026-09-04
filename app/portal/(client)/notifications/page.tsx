import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import NotificationsList from "@/components/portal/NotificationsList";

export default async function NotificationsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  const { data: notifications } = await supabase
    .from("notifications")
    .select(`
      id,
      title,
      message,
      type,
      read,
      created_at
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="p-5 md:p-8">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-[#D9822B]">Activity</p>
        <h1 className="mt-2 text-2xl font-semibold text-[#23272B]">Notifications</h1>
        <p className="mt-1 text-sm text-[#77736D]">Stay up to date with your Viswaas account.</p>
      </div>

      <section className="mt-8 overflow-hidden rounded-xl border border-[#23272B]/10 bg-white">
        <NotificationsList initialNotifications={notifications ?? []} />
      </section>
    </div>
  );
}