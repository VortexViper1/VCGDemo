"use client";

import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BriefcaseBusiness, FileText, Bell } from "lucide-react";
import Sidebar from "./Sidebar";

const clientNavigation = [
  { name: "Dashboard", href: "/portal/dashboard", icon: LayoutDashboard },
  { name: "Services", href: "/portal/services", icon: BriefcaseBusiness },
  { name: "Documents", href: "/portal/documents", icon: FileText },
  { name: "Notifications", href: "/portal/notifications", icon: Bell },
];

const adminNavigation = [
  { name: "Dashboard", href: "/portal/admin/dashboard", icon: LayoutDashboard },
  { name: "Clients", href: "/portal/admin/clients", icon: Users },
  { name: "Services", href: "/portal/services", icon: BriefcaseBusiness },
  { name: "Documents", href: "/portal/documents", icon: FileText },
  { name: "Notifications", href: "/portal/notifications", icon: Bell },
];

export default function PortalSidebar() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/portal/admin");

  return (
    <Sidebar
      navigation={isAdmin ? adminNavigation : clientNavigation}
      sectionLabel={isAdmin ? "Administration" : "Workspace"}
      settingsHref="/portal/settings"
    />
  );
}