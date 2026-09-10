"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Check,
  ChevronDown,
  LogOut,
  Settings,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import Header from "./Header";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string | null;
  read: boolean;
  created_at: string;
};

export default function EmployeeHeader() {
  const router = useRouter();

  const [name, setName] = useState("Employee");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const menuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadEmployee() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/portal/login");
        return;
      }

      setEmail(user.email ?? "");

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("EMPLOYEE PROFILE ERROR:", error);
      }

      if (profile?.role !== "team") {
        router.replace("/portal/dashboard");
        return;
      }

      if (profile.full_name) {
        setName(profile.full_name);
      } else if (user.email) {
        setName(user.email.split("@")[0]);
      }

      setLoading(false);
    }

    loadEmployee();
  }, [router]);

  useEffect(() => {
    async function loadNotifications() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      const { data, error } = await supabase
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
        })
        .limit(8);

      if (error) {
        console.error("EMPLOYEE NOTIFICATIONS ERROR:", error);
        return;
      }

      setNotifications(data ?? []);
    }

    loadNotifications();
  }, []);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as Node;

      if (
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setNotificationOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setNotificationOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  async function markAsRead(notificationId: string) {
    const supabase = createClient();

    const { error } = await supabase
      .from("notifications")
      .update({
        read: true,
      })
      .eq("id", notificationId);

    if (error) {
      console.error("MARK NOTIFICATION READ ERROR:", error);
      return;
    }

    setNotifications((current) =>
      current.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  }

  async function markAllAsRead() {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    const { error } = await supabase
      .from("notifications")
      .update({
        read: true,
      })
      .eq("user_id", user.id)
      .eq("read", false);

    if (error) {
      console.error("MARK ALL NOTIFICATIONS ERROR:", error);
      return;
    }

    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  }

  async function handleLogout() {
    setLoggingOut(true);

    const supabase = createClient();

    await supabase.auth.signOut();

    router.replace("/portal/login");
    router.refresh();
  }

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "E";

  function formatNotificationTime(date: string) {
    const value = new Date(date);
    const now = new Date();

    const difference = now.getTime() - value.getTime();
    const minutes = Math.floor(difference / 60000);

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);

    if (days < 7) {
      return `${days}d ago`;
    }

    return value.toLocaleDateString();
  }

  return (
    <Header
      homeHref="/portal/employee"
      tagline="Employee Portal"
    >
      <div
        ref={notificationRef}
        className="relative"
      >
        <button
          type="button"
          onClick={() => {
            setNotificationOpen((value) => !value);
            setMenuOpen(false);
          }}
          aria-label="Notifications"
          aria-haspopup="true"
          aria-expanded={notificationOpen}
          className={
            notificationOpen
              ? "relative flex h-9 w-9 items-center justify-center rounded-full bg-[#F6E3CC] text-[#B8661A] transition-colors"
              : "relative flex h-9 w-9 items-center justify-center rounded-full text-[#77736D] transition-colors hover:bg-[#D9822B]/15 hover:text-[#D9822B]"
          }
        >
          <Bell
            size={17}
            strokeWidth={1.8}
          />

          {unreadCount > 0 && (
            <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D9822B] px-1 text-[8px] font-bold leading-none text-white ring-2 ring-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {notificationOpen && (
          <div
            role="dialog"
            aria-label="Notifications"
            className="absolute right-0 top-[calc(100%+10px)] z-[500] w-[350px] max-w-[calc(100vw-24px)] overflow-hidden rounded-xl border border-[#E8E2D9] bg-white shadow-[0_16px_40px_-16px_rgba(35,39,43,0.28)]"
          >
            <div className="flex items-center justify-between border-b border-[#E8E2D9] px-4 py-3.5">
              <div>
                <p className="text-sm font-medium text-[#23272B]">
                  Notifications
                </p>

                <p className="mt-0.5 text-[11px] text-[#77736D]">
                  Updates about your work
                </p>
              </div>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="text-[10px] font-semibold text-[#A8732A] transition-colors hover:text-[#D9822B]"
                >
                  Mark all read
                </button>
              )}
            </div>

            {notifications.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#F6F3EE]">
                  <Bell
                    size={18}
                    strokeWidth={1.7}
                    className="text-[#9A958D]"
                  />
                </div>

                <p className="mt-3 text-xs font-medium text-[#23272B]">
                  No notifications
                </p>

                <p className="mt-1 text-[11px] text-[#9A958D]">
                  New task and service updates will appear here.
                </p>
              </div>
            ) : (
              <div className="max-h-[360px] overflow-y-auto">
                {notifications.map((notification) => (
                  <button
                    type="button"
                    key={notification.id}
                    onClick={() => {
                      if (!notification.read) {
                        markAsRead(notification.id);
                      }
                    }}
                    className={
                      notification.read
                        ? "block w-full border-b border-[#23272B]/5 bg-white px-4 py-3.5 text-left transition-colors hover:bg-[#FCFBF8]"
                        : "block w-full border-b border-[#23272B]/5 bg-[#FFF9F2] px-4 py-3.5 text-left transition-colors hover:bg-[#FFF5E9]"
                    }
                  >
                    <div className="flex gap-3">
                      <span
                        className={
                          notification.read
                            ? "mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#D8D4CD]"
                            : "mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#D9822B]"
                        }
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate text-xs font-semibold text-[#23272B]">
                            {notification.title}
                          </p>

                          {notification.read && (
                            <Check
                              size={12}
                              className="shrink-0 text-[#9A958D]"
                            />
                          )}
                        </div>

                        <p className="mt-1 text-[11px] leading-5 text-[#77736D]">
                          {notification.message}
                        </p>

                        <p className="mt-1.5 text-[10px] text-[#9A958D]">
                          {formatNotificationTime(
                            notification.created_at
                          )}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            <Link
              href="/portal/employee/notifications"
              onClick={() => setNotificationOpen(false)}
              className="block border-t border-[#E8E2D9] px-4 py-3 text-center text-xs font-semibold text-[#A8732A] transition-colors hover:bg-[#FFF9F2] hover:text-[#D9822B]"
            >
              View all notifications
            </Link>
          </div>
        )}
      </div>

      <div className="hidden h-6 w-px bg-[#23272B]/10 sm:block" />

      <div
        ref={menuRef}
        className="relative"
      >
        <button
          type="button"
          onClick={() => {
            setMenuOpen((value) => !value);
            setNotificationOpen(false);
          }}
          aria-haspopup="true"
          aria-expanded={menuOpen}
          aria-label="Account details"
          className={
            menuOpen
              ? "flex h-9 items-center gap-1 rounded-full bg-[#F6E3CC] pl-0.5 pr-1.5"
              : "flex h-9 items-center gap-1 rounded-full pl-0.5 pr-1.5 transition-colors hover:bg-[#D9822B]/15"
          }
        >
          <span
            className={
              loading
                ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F6E3CC] text-xs font-medium text-[#B8661A] opacity-0 ring-1 ring-[#C49A4A]/35"
                : "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F6E3CC] text-xs font-medium text-[#B8661A] opacity-100 ring-1 ring-[#C49A4A]/35"
            }
          >
            {initials}
          </span>

          <ChevronDown
            size={13}
            strokeWidth={2}
            className={
              menuOpen
                ? "rotate-180 text-[#9A958D] transition-transform"
                : "text-[#9A958D] transition-transform"
            }
          />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-[calc(100%+10px)] z-[500] w-64 rounded-xl border border-[#E8E2D9] bg-white p-4 shadow-[0_16px_40px_-16px_rgba(35,39,43,0.28)]">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F6E3CC] text-sm font-medium text-[#B8661A] ring-1 ring-[#C49A4A]/35">
                {initials}
              </span>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[#23272B]">
                  {name}
                </p>

                <p className="truncate text-xs text-[#77736D]">
                  {email}
                </p>
              </div>
            </div>

            <div className="my-3 h-px bg-[#E8E2D9]" />

            <Link
              href="/portal/employee/settings"
              onClick={() => setMenuOpen(false)}
              className="flex h-10 items-center gap-2.5 rounded-lg px-2 text-sm text-[#4B4A47] transition-colors hover:bg-[#F3E5D2] hover:text-[#23272B]"
            >
              <Settings
                size={16}
                strokeWidth={1.8}
              />

              Settings
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex h-10 w-full items-center gap-2.5 rounded-lg px-2 text-left text-sm text-[#4B4A47] transition-colors hover:bg-[#D9822B] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut
                size={16}
                strokeWidth={1.8}
              />

              {loggingOut ? "Signing out..." : "Sign out"}
            </button>
          </div>
        )}
      </div>
    </Header>
  );
}