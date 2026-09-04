"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogOut, Settings, ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import NotificationBell from "@/components/portal/NotificationBell";
import Header from "./Header";

export default function PortalHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [name, setName] = useState("User");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/portal/login");
        return;
      }
      setEmail(user.email ?? "");
      const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", user.id).single();
      if (profile?.full_name) setName(profile.full_name);
      else if (user.email) setName(user.email.split("@")[0]);
      setLoading(false);
    }
    loadUser();
  }, [router]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  async function handleLogout() {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/portal/login");
    router.refresh();
  }

  const initials = name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
  const isAdmin = pathname.startsWith("/portal/admin");

  return (
    <Header homeHref={isAdmin ? "/portal/admin" : "/portal/dashboard"} tagline={isAdmin ? "Administration" : "Client Portal"}>
      <NotificationBell />
      <div className="hidden h-6 w-px bg-[#23272B]/10 sm:block" />

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-haspopup="true"
          aria-expanded={menuOpen}
          aria-label="Account details"
          className={`flex h-9 items-center gap-1 rounded-full pl-0.5 pr-1.5 transition-colors duration-200 ${
            menuOpen ? "bg-[#F6E3CC]" : "hover:bg-[#D9822B]/15"
          }`}
        >
          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F6E3CC] text-xs font-medium text-[#B8661A] ring-1 ring-[#C49A4A]/35 transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}>
            {initials || "U"}
          </span>
          <ChevronDown size={13} strokeWidth={2} className={`text-[#9A958D] transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} />
        </button>

        {menuOpen && (
         <div
  role="menu"
  className="account-popover absolute right-0 top-[calc(100%+10px)] z-[500] w-64 rounded-xl border border-[#E8E2D9] bg-white p-4 shadow-[0_16px_40px_-16px_rgba(35,39,43,0.28)]"
>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F6E3CC] text-sm font-medium text-[#B8661A] ring-1 ring-[#C49A4A]/35">
                {initials || "U"}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[#23272B]">{name}</p>
                <p className="truncate text-xs text-[#77736D]">{email}</p>
              </div>
            </div>
            <div className="my-3 h-px bg-[#E8E2D9]" />
            <Link href="/portal/settings" onClick={() => setMenuOpen(false)} role="menuitem" className="flex h-10 items-center gap-2.5 rounded-lg px-2 text-sm text-[#4B4A47] transition-colors duration-150 hover:bg-[#F3E5D2] hover:text-[#B8661A] hover:text-[#23272B]">
              <Settings size={16} strokeWidth={1.8} />
              Settings
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex h-10 w-full items-center gap-2.5 rounded-lg px-2 text-left text-sm text-[#4B4A47] transition-colors duration-200 hover:bg-[#D9822B] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut size={16} strokeWidth={1.8} />
              {loggingOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .account-popover { animation: popIn 0.16s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes popIn { from { opacity: 0; transform: translateY(-6px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @media (prefers-reduced-motion: reduce) { .account-popover { animation: none; } }
      `}</style>
    </Header>
  );
}