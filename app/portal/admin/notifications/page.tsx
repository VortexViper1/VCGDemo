import { redirect } from "next/navigation";
import { Bell } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import NotificationsList from "@/components/portal/NotificationsList";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
};

export default async function AdminNotificationsPage() {
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

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/portal/dashboard");
  }

  // --------------------------------------------------
  // GET ADMIN NOTIFICATIONS
  // --------------------------------------------------

  const {
    data: notificationData,
    error: notificationsError,
  } = await supabase
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
    .order("created_at", {
      ascending: false,
    });

  if (notificationsError) {
    console.error(
      "ADMIN NOTIFICATIONS ERROR:",
      JSON.stringify(
        notificationsError,
        null,
        2
      )
    );
  }

  const notifications: Notification[] =
    notificationData ?? [];

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <main className="min-w-0 p-5 pt-8 md:p-8">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#D9822B]">
            Administration
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold text-[#23272B]">
              Notifications
            </h1>

            {unreadCount > 0 && (
              <span className="rounded-full bg-[#F6E3CC] px-2.5 py-1 text-[11px] font-medium text-[#B8661A]">
                {unreadCount} unread
              </span>
            )}
          </div>

          <p className="mt-1 text-sm text-[#77736D]">
            Stay updated on client, employee, service, task,
            and document activity.
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6E3CC]">
          <Bell
            size={18}
            className="text-[#B8661A]"
          />
        </div>
      </div>

      {/* NOTIFICATIONS */}
      <section className="mt-8 overflow-hidden rounded-xl border border-[#23272B]/10 bg-white">
        <div className="border-b border-[#23272B]/10 px-5 py-5 sm:px-6">
          <p className="text-xs uppercase tracking-[0.14em] text-[#9A958D]">
            Activity
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#23272B]">
            Recent Notifications
          </h2>

          <p className="mt-1 text-xs text-[#77736D]">
            All notifications related to your administration portal.
          </p>
        </div>

        <NotificationsList
          initialNotifications={notifications}
        />
      </section>
    </main>
  );
}