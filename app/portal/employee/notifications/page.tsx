import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  CheckCheck,
  ArrowRight,
  BriefcaseBusiness,
  ClipboardList,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";

type Notification = {
  id: string;
  title: string | null;
  message: string | null;
  type: string | null;
  read: boolean;
  created_at: string;
};

function formatDate(date: string) {
  const value = new Date(date);

  return value.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(date: string) {
  const value = new Date(date);

  return value.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getNotificationIcon(type: string | null) {
  if (type === "service") {
    return BriefcaseBusiness;
  }

  if (type === "task") {
    return ClipboardList;
  }

  return Bell;
}

export default async function EmployeeNotificationsPage() {
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

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "team") {
    redirect("/portal/dashboard");
  }

  // --------------------------------------------------
  // GET EMPLOYEE NOTIFICATIONS
  // --------------------------------------------------

  const {
    data: notificationData,
    error: notificationsError,
  } = await supabase
    .from("notifications")
    .select(
      `
        id,
        title,
        message,
        type,
        read,
        created_at
      `
    )
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (notificationsError) {
    console.error(
      "EMPLOYEE NOTIFICATIONS ERROR:",
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
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* -------------------------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------------------------- */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#D9822B]">
            Employee Portal
          </p>

          <div className="mt-2 flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-[#23272B] sm:text-3xl">
              Notifications
            </h1>

            {unreadCount > 0 && (
              <span className="rounded-full bg-[#F6E3CC] px-2.5 py-1 text-[11px] font-medium text-[#B8661A]">
                {unreadCount} unread
              </span>
            )}
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#77736D]">
            Stay updated on new assignments and
            changes to your work.
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F6E3CC]">
          <Bell
            size={18}
            className="text-[#B8661A]"
          />
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* NOTIFICATIONS */}
      {/* -------------------------------------------------- */}

      <section className="mt-6 overflow-hidden rounded-xl border border-[#E8E2D9] bg-white sm:mt-8">
        <div className="flex items-center justify-between border-b border-[#E8E2D9] px-5 py-5 sm:px-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#9A958D]">
              Activity
            </p>

            <h2 className="mt-0.5 text-lg font-semibold text-[#23272B]">
              Recent Notifications
            </h2>
          </div>

          {unreadCount > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-[#77736D]">
              <CheckCheck size={14} />
              {unreadCount} new
            </div>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F1F0EE]">
              <Bell
                size={20}
                className="text-[#77736D]"
              />
            </div>

            <h3 className="mt-4 text-sm font-medium text-[#23272B]">
              No notifications yet
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#77736D]">
              Notifications about assigned tasks
              and services will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#E8E2D9]">
            {notifications.map(
              (notification) => {
                const Icon =
                  getNotificationIcon(
                    notification.type
                  );

                return (
                  <div
                    key={notification.id}
                    className={`relative px-5 py-5 transition-colors duration-200 sm:px-6 ${
                      notification.read
                        ? "bg-white hover:bg-[#FAF8F5]"
                        : "bg-[#FFFCF7] hover:bg-[#FAF8F5]"
                    }`}
                  >
                    {!notification.read && (
                      <span className="absolute left-0 top-0 h-full w-0.5 bg-[#D9822B]" />
                    )}

                    <div className="flex gap-4">
                      {/* ICON */}

                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                          notification.read
                            ? "bg-[#F1F0EE]"
                            : "bg-[#F6E3CC]"
                        }`}
                      >
                        <Icon
                          size={17}
                          className={
                            notification.read
                              ? "text-[#77736D]"
                              : "text-[#B8661A]"
                          }
                        />
                      </div>

                      {/* CONTENT */}

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                          <div className="flex min-w-0 items-center gap-2">
                            <h3
                              className={`text-sm ${
                                notification.read
                                  ? "font-medium text-[#55514B]"
                                  : "font-semibold text-[#23272B]"
                              }`}
                            >
                              {notification.title ||
                                "Notification"}
                            </h3>

                            {!notification.read && (
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D9822B]" />
                            )}
                          </div>

                          <span className="shrink-0 text-[11px] text-[#9A958D]">
                            {formatDate(
                              notification.created_at
                            )}{" "}
                            ·{" "}
                            {formatTime(
                              notification.created_at
                            )}
                          </span>
                        </div>

                        <p className="mt-1.5 max-w-3xl text-sm leading-6 text-[#77736D]">
                          {notification.message ||
                            "You have a new notification."}
                        </p>

                        {notification.type ===
                          "task" && (
                          <Link
                            href="/portal/employee/tasks"
                            className="group mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#B8661A] transition-colors duration-200 hover:text-[#23272B]"
                          >
                            View My Tasks

                            <ArrowRight
                              size={13}
                              className="transition-transform duration-200 group-hover:translate-x-0.5"
                            />
                          </Link>
                        )}

                        {notification.type ===
                          "service" && (
                          <Link
                            href="/portal/employee/services"
                            className="group mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#B8661A] transition-colors duration-200 hover:text-[#23272B]"
                          >
                            View Services

                            <ArrowRight
                              size={13}
                              className="transition-transform duration-200 group-hover:translate-x-0.5"
                            />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </section>
    </div>
  );
}