"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
};

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  async function loadNotifications() {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("notifications")
      .select("id, title, message, type, read, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10);

    setNotifications(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    let mounted = true;
    let channel: ReturnType<ReturnType<typeof createClient>["channel"]> | null =
      null;

    async function setup() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || !mounted) {
        setLoading(false);
        return;
      }

      await loadNotifications();

      channel = supabase
        .channel(`notifications-${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            loadNotifications();
          }
        )
        .subscribe();
    }

    setup();

    return () => {
      mounted = false;

      if (channel) {
        const supabase = createClient();
        supabase.removeChannel(channel);
      }
    };
  }, []);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    if (open) {
      document.addEventListener("mousedown", handlePointerDown);
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  async function markAsRead(id: string) {
    const supabase = createClient();

    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", id);

    if (!error) {
      setNotifications((current) =>
        current.map((n) =>
          n.id === id ? { ...n, read: true } : n
        )
      );
    }
  }

  async function markAllAsRead() {
    const supabase = createClient();

    const unreadIds = notifications
      .filter((n) => !n.read)
      .map((n) => n.id);

    if (unreadIds.length === 0) return;

    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .in("id", unreadIds);

    if (!error) {
      setNotifications((current) =>
        current.map((n) => ({ ...n, read: true }))
      );
    }
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="relative flex h-11 w-11 items-center justify-center rounded-full text-[#4B4A47] transition-colors duration-150 hover:bg-[#F3E5D2] hover:text-[#B8661A]"
        aria-label="Notifications"
        aria-expanded={open}
      >
        <Bell size={19} strokeWidth={1.7} />

        {unreadCount > 0 && (
          <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D9822B] px-1 text-[9px] font-semibold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-x-4 top-[68px] z-[500] overflow-hidden rounded-2xl border border-[#23272B]/10 bg-white shadow-[0_20px_60px_rgba(10,12,14,0.15)] sm:absolute sm:inset-x-auto sm:right-0 sm:top-12 sm:w-[380px]">
          <div className="flex items-center justify-between border-b border-[#23272B]/10 px-5 py-4">
            <div>
              <h3 className="text-sm font-semibold text-[#23272B]">
                Notifications
              </h3>
              <p className="mt-0.5 text-[11px] text-[#77736D]">
                Recent activity
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-[11px] font-medium text-[#B8661A] transition-colors duration-150 hover:text-[#D9822B] hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-[420px] overflow-y-auto">
            {loading ? (
              <div className="space-y-3 px-5 py-6">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="animate-pulse space-y-2">
                    <div className="h-3 w-2/3 rounded bg-[#F0EBE2]" />
                    <div className="h-2.5 w-full rounded bg-[#F5F2ED]" />
                  </div>
                ))}
              </div>
            ) : notifications.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <Bell size={24} className="mx-auto text-[#D9822B]" />
                <p className="mt-3 text-sm text-[#77736D]">
                  No notifications yet.
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border-b border-[#23272B]/5 px-5 py-4 transition-colors duration-150 ${
                    notification.read
                      ? "bg-white"
                      : "bg-[#FCF8F2]"
                  }`}
                >
                  <div className="flex gap-3">
                    {!notification.read && (
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#D9822B]" />
                    )}

                    {notification.read && (
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#F6E3CC]">
                        <Check
                          size={10}
                          className="text-[#B8661A]"
                        />
                      </span>
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#23272B]">
                        {notification.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#77736D]">
                        {notification.message}
                      </p>

                      <p className="mt-2 text-[10px] text-[#9A958D]">
                        {new Date(
                          notification.created_at
                        ).toLocaleString()}
                      </p>

                      {!notification.read && (
                        <button
                          type="button"
                          onClick={() =>
                            markAsRead(notification.id)
                          }
                          className="mt-2 text-[11px] font-medium text-[#B8661A] transition-colors duration-150 hover:text-[#D9822B] hover:underline"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}

            <div className="border-t border-[#23272B]/10 p-3">
              <Link
                href="/portal/notifications"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-lg px-4 py-3 text-xs font-medium text-[#B8661A] transition-colors duration-150 hover:bg-[#F7F5F1] hover:text-[#D9822B]"
              >
                View all notifications →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}