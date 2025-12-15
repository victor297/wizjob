"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { SidebarProvider } from "@/contexts/SidebarContext";

export interface NavItem {
  id: string;
  name: string;
  icon: string;
  path: string;
  isActive?: boolean;
  children?: NavItem[];
}
// Define your navigation items here
const navItems: NavItem[] = [
  {
    id: "overview",
    name: "Overview",
    icon: "overview",
    path: "/dashboard",
  },
  {
    id: "discover-jobs",
    name: "Discover Jobs",
    icon: "discover-jobs",
    path: "/dashboard/discover-jobs",
  },
  {
    id: "wizbot",
    name: "Wizbot",
    icon: "wizbot",
    path: "/dashboard/wizbot",
    children: [
      {
        id: "manage-wizbot",
        name: "Manage Wizbot",
        icon: "manage-wizbot",
        path: "/dashboard/wizbot/manage",
      },
      {
        id: "create-wizbot",
        name: "Create Wizbot",
        icon: "wizbot",
        path: "/dashboard/wizbot/create",
      },
    ],
  },
  {
    id: "my-resume",
    name: "My Resume",
    icon: "my-resume",
    path: "/dashboard/my-resume",
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: "analytics",
    path: "/dashboard/analytics",
  },
  {
    id: "application-tracker",
    name: "Application Tracker",
    icon: "application-tracker",
    path: "/dashboard/application-tracker",
  },
  {
    id: "interview-prep",
    name: "Interview Prep",
    icon: "interview-prep",
    path: "/dashboard/interview-prep",
  },
  {
    id: "scheduler",
    name: "Scheduler",
    icon: "scheduler",
    path: "/dashboard/scheduler",
  },
  {
    id: "help-center",
    name: "Help Center",
    icon: "help-center",
    path: "/dashboard/help-center",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
        <Sidebar navItems={navItems} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
