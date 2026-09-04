"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  Settings,
  LogOut,
  Menu,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigation } from "./navigation-context";
import { createClient } from "@/lib/supabase/client";

type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 340,
      damping: 34,
      mass: 0.8,
      staggerChildren: 0.035,
      delayChildren: 0.05,
    },
  },
  exit: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 38,
    },
  },
};

function NavList({
  navigation,
  sectionLabel,
  isActive,
  onNavigate,
  hasUnreadNotifications,
}: {
  navigation: NavItem[];
  sectionLabel: string;
  isActive: (href: string) => boolean;
  onNavigate?: () => void;
  hasUnreadNotifications: boolean;
}) {
  return (
    <nav className="flex-1 overflow-y-auto px-4 py-6">
      <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#B5AFA3]">
        {sectionLabel}
      </p>

      <div className="space-y-0.5">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`group relative flex h-12 items-center gap-3 rounded-lg px-3 text-[14px] transition-all duration-200 md:h-11 ${
                active
                  ? "bg-[#F3E5D2] font-medium text-[#B8661A]"
                  : "text-[#55514B] hover:bg-[#D9822B] hover:text-white"
              }`}
            >
              {active && (
                <span className="absolute -left-4 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-[#D9822B]" />
              )}

              <Icon
                size={18}
                strokeWidth={active ? 2 : 1.7}
                className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
              />

              <span className="flex items-center gap-2">
                {item.name}

                {item.name === "Notifications" && hasUnreadNotifications && (
                  <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
                )}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function FooterLinks({
  settingsHref,
  onLogout,
  onNavigate,
}: {
  settingsHref: string;
  onLogout: () => void;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const settingsActive =
    pathname === settingsHref ||
    pathname.startsWith(`${settingsHref}/`);

  return (
    <div className="shrink-0 border-t border-[#E8E2D9] px-4 py-5">
      {/* BACK TO WEBSITE */}
      <Link
        href="/"
        onClick={onNavigate}
        className="group flex h-11 items-center gap-3 rounded-lg px-3 text-[14px] text-[#55514B] transition-all duration-200 hover:bg-[#D9822B] hover:text-white"
      >
        <ArrowLeft
          size={18}
          strokeWidth={1.7}
          className="transition-transform duration-200 group-hover:-translate-x-0.5"
        />
        <span>Back to website</span>
      </Link>

      {/* SETTINGS */}
      <Link
        href={settingsHref}
        onClick={onNavigate}
        aria-current={settingsActive ? "page" : undefined}
        className={`group mt-1 flex h-11 items-center gap-3 rounded-lg px-3 text-[14px] transition-all duration-200 ${
          settingsActive
            ? "bg-[#F3E5D2] font-medium text-[#B8661A]"
            : "text-[#55514B] hover:bg-[#D9822B] hover:text-white"
        }`}
      >
        <Settings
          size={18}
          strokeWidth={settingsActive ? 2 : 1.7}
          className="transition-transform duration-200 group-hover:rotate-6"
        />
        <span>Settings</span>
      </Link>

      {/* SIGN OUT */}
      <button
        type="button"
        onClick={onLogout}
        className="group mt-1 flex h-11 w-full items-center gap-3 rounded-lg px-3 text-[14px] text-[#55514B] transition-all duration-200 hover:bg-[#D9822B] hover:text-white"
      >
        <LogOut
          size={18}
          strokeWidth={1.7}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
        <span>Sign out</span>
      </button>
    </div>
  );
}

export default function Sidebar({
  navigation,
  sectionLabel,
  settingsHref,
}: {
  navigation: NavItem[];
  sectionLabel: string;
  settingsHref: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { open, setOpen } = useNavigation();

  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkUnreadNotifications() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        if (mounted) setHasUnreadNotifications(false);
        return;
      }

      const { data, error } = await supabase
        .from("notifications")
        .select("id")
        .eq("user_id", user.id)
        .eq("read", false)
        .limit(1);

      if (error) {
        console.error("Unread notifications error:", error);
        return;
      }

      if (mounted) {
        setHasUnreadNotifications((data?.length ?? 0) > 0);
      }
    }

    checkUnreadNotifications();

    return () => {
      mounted = false;
    };
  }, [pathname]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/portal/login");
    router.refresh();
  }

  const activeHref = navigation.reduce<string | null>((best, item) => {
    const isRootRoute =
      item.href === "/portal/admin" ||
      item.href === "/portal/dashboard";

    const matches = isRootRoute
      ? pathname === item.href
      : pathname === item.href ||
        pathname.startsWith(`${item.href}/`);

    if (!matches) return best;

    if (!best || item.href.length > best.length) {
      return item.href;
    }

    return best;
  }, null);

  function isActive(href: string) {
    return href === activeHref;
  }

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden h-screen w-[250px] shrink-0 flex-col border-r border-[#E8E2D9] bg-[#FCFBF8] md:flex">
        <NavList
          navigation={navigation}
          sectionLabel={sectionLabel}
          isActive={isActive}
          hasUnreadNotifications={hasUnreadNotifications}
        />

        <FooterLinks
          settingsHref={settingsHref}
          onLogout={handleLogout}
        />
      </aside>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence mode="wait">
        {open && (
          <>
            {/* BACKDROP */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[300] bg-[#23272B]/55 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />

            {/* DRAWER */}
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 right-0 z-[400] flex w-full max-w-[300px] flex-col overflow-hidden border-l border-[#E8E2D9] bg-[#FCFBF8] shadow-[-16px_0_50px_rgba(10,12,14,0.14)] md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
            >
              {/* MOBILE SIDEBAR HEADER */}
              <div className="flex h-16 shrink-0 items-center justify-end border-b border-[#E8E2D9] px-4">
                <motion.button
                  type="button"
                  onClick={() => setOpen(false)}
                  whileTap={{
                    scale: 0.9,
                    rotate: 90,
                    backgroundColor: "#D9822B",
                    color: "#FFFFFF",
                  }}
                  whileHover={{
                    opacity: 1,
                    backgroundColor: "#D9822B",
                    color: "#FFFFFF",
                  }}
                  aria-label="Close navigation"
                  aria-expanded={open}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2A2D31]/8 bg-white text-[#23272B] backdrop-blur-md transition-colors duration-300"
                >
                  <Menu size={22} />
                </motion.button>
              </div>

              <NavList
                navigation={navigation}
                sectionLabel={sectionLabel}
                isActive={isActive}
                onNavigate={() => setOpen(false)}
                hasUnreadNotifications={hasUnreadNotifications}
              />

              <FooterLinks
                settingsHref={settingsHref}
                onLogout={handleLogout}
                onNavigate={() => setOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}