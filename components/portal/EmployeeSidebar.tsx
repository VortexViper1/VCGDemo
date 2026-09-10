"use client";

import {
  LayoutDashboard,
  ClipboardList,
  BriefcaseBusiness,
  Bell,
} from "lucide-react";

import Sidebar from "./Sidebar";

const navigation = [
  {
    name: "Dashboard",
    href: "/portal/employee",
    icon: LayoutDashboard,
  },
  {
    name: "My Tasks",
    href: "/portal/employee/tasks",
    icon: ClipboardList,
  },
  {
    name: "Services",
    href: "/portal/employee/services",
    icon: BriefcaseBusiness,
  },
  {
    name: "Notifications",
    href: "/portal/employee/notifications",
    icon: Bell,
  },
    {
    name: "Documents",
    href: "/portal/employee/documents",
    icon: Bell,
  },
];

export default function EmployeeSidebar() {
  return (
    <Sidebar
      navigation={navigation}
      sectionLabel="Employee Portal"
      settingsHref="/portal/employee/settings"
    />
  );
}