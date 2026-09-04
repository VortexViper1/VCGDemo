"use client";

import { useState } from "react";
import { Check, Bell } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
};

type Props = {
  initialNotifications: Notification[];
};

export default function NotificationsList({ initialNotifications }: Props) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const visibleNotifications =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  async function markAsRead(id: string) {
    const supabase = createClient();

    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    setNotifications((current) =>
      current.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  async function markAllAsRead() {
    if (unreadCount === 0) return;

    const supabase = createClient();
    const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id);

    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .in("id", unreadIds);

    if (error) {
      console.error(error);
      return;
    }

    setNotifications((current) => current.map((n) => ({ ...n, read: true })));
  }

  return (
    <>
      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#23272B]/10 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`flex h-9 items-center rounded-full px-4 text-xs font-medium transition-colors duration-150 ${
              filter === "all" ? "bg-[#23272B] text-white" : "bg-[#F7F5F1] text-[#77736D] hover:text-[#23272B]"
            }`}
          >
            All
          </button>

          <button
            type="button"
            onClick={() => setFilter("unread")}
            className={`flex h-9 items-center rounded-full px-4 text-xs font-medium transition-colors duration-150 ${
              filter === "unread" ? "bg-[#23272B] text-white" : "bg-[#F7F5F1] text-[#77736D] hover:text-[#23272B]"
            }`}
          >
            Unread
            {unreadCount > 0 && <span className="ml-1.5">({unreadCount})</span>}
          </button>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="text-xs font-medium text-[#B8661A] transition-colors duration-150 hover:text-[#D9822B] hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* LIST */}
      {visibleNotifications.length === 0 ? (
        <div className="px-6 py-16 text-center sm:py-20">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F6E3CC]">
            <Bell size={21} className="text-[#B8661A]" />
          </div>

          <p className="mt-4 text-sm font-medium text-[#23272B]">
            {filter === "unread" ? "You're all caught up." : "No notifications yet."}
          </p>

          <p className="mt-1 text-xs text-[#77736D]">
            {filter === "unread"
              ? "There are no unread notifications."
              : "New account activity will appear here."}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-[#23272B]/10">
          {visibleNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`px-4 py-5 transition-colors duration-150 sm:px-6 sm:py-6 ${
                notification.read ? "bg-white" : "bg-[#FCF8F2]"
              }`}
            >
              <div className="flex gap-3 sm:gap-4">
                <div className="shrink-0">
                  {notification.read ? (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F6E3CC]">
                      <Check size={16} className="text-[#B8661A]" />
                    </div>
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D9822B]">
                      <Bell size={16} className="text-white" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-[#23272B]">{notification.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[#77736D]">{notification.message}</p>
                    </div>

                    {!notification.read && (
                      <span className="shrink-0 rounded-full bg-[#F6E3CC] px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-[#B8661A]">
                        New
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex items-center gap-4">
                    <span className="text-[11px] text-[#9A958D]">
                      {new Date(notification.created_at).toLocaleString()}
                    </span>

                    {!notification.read && (
                      <button
                        type="button"
                        onClick={() => markAsRead(notification.id)}
                        className="-my-2 py-2 text-[11px] font-medium text-[#B8661A] transition-colors duration-150 hover:text-[#D9822B] hover:underline"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}