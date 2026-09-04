"use client";

import { LayoutDashboard, Users, BriefcaseBusiness, FileText } from "lucide-react";
import Sidebar from "./Sidebar";

const navigation = [
  { name: "Dashboard", href: "/portal/admin", icon: LayoutDashboard },
  { name: "Clients", href: "/portal/admin/clients", icon: Users },
  { name: "Services", href: "/portal/admin/services", icon: BriefcaseBusiness },
  { name: "Documents", href: "/portal/admin/documents", icon: FileText },
];

export default function AdminSidebar() {
  return <Sidebar navigation={navigation} sectionLabel="Administration" settingsHref="/portal/admin/settings" />;
}