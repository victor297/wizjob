"use client";

import React, { useState } from "react";
import {
  FiHome,
  FiBriefcase,
  FiUser,
  FiBarChart2,
  FiFileText,
  FiCalendar,
  FiHelpCircle,
  FiMenu,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";
import { useSidebar } from "@/contexts/SidebarContext";
import { FaRobot } from "react-icons/fa";

export interface NavItem {
  id: string;
  name: string;
  icon: string;
  path: string;
  isActive?: boolean;
  children?: NavItem[];
}
const iconMap: { [key: string]: React.ReactNode } = {
  overview: <FiHome />,
  "discover-jobs": <FiBriefcase />,
  wizbot: <FaRobot />,
  "manage-wizbot": <FaRobot />,
  "my-resume": <FiFileText />,
  analytics: <FiBarChart2 />,
  "application-tracker": <FiBriefcase />,
  "interview-prep": <FiUser />,
  scheduler: <FiCalendar />,
  "help-center": <FiHelpCircle />,
};

interface SidebarProps {
  navItems: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ navItems }) => {
  const { isCollapsed, toggleSidebar, isMobileOpen, setIsMobileOpen } =
    useSidebar();
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderNavItem = (item: NavItem, depth = 0) => {
    const isActive = pathname === item.path;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);

    return (
      <div key={item.id} className="mb-1">
        <Link
          href={item.path}
          onClick={() => {
            if (hasChildren) {
              toggleExpand(item.id);
            }
            if (window.innerWidth < 768) {
              setIsMobileOpen(false);
            }
          }}
          className={`
            flex items-center px-3 py-3 rounded-lg transition-all duration-200
            ${
              isActive
                ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            }
            ${depth > 0 ? "ml-4" : ""}
          `}
        >
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "justify-start"
            } w-full`}
          >
            <div className="text-lg">{iconMap[item.icon] || <FiHome />}</div>

            {!isCollapsed && (
              <>
                <span className="ml-3 font-medium">{item.name}</span>
                {hasChildren && (
                  <div className="ml-auto">
                    {isExpanded ? <FiChevronLeft /> : <FiChevronRight />}
                  </div>
                )}
              </>
            )}
          </div>
        </Link>

        {hasChildren && !isCollapsed && isExpanded && (
          <div className="mt-1 ml-4">
            {item.children!.map((child) => renderNavItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`
        fixed md:sticky top-0 left-0 h-screen bg-white dark:bg-gray-900 
        border-r border-gray-200 dark:border-gray-800 z-50
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-16" : "w-64"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">JK</span>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-800 dark:text-white">
                      Joe Kent
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      joekent@gmail.com
                    </p>
                  </div>
                </div>
              )}

              {isCollapsed && (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-sm">JK</span>
                </div>
              )}

              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hidden md:block"
              >
                {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
              </button>

              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
              >
                <FiChevronLeft />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="mb-6">
              {!isCollapsed && (
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  Get Started
                </button>
              )}
              {isCollapsed && (
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg">
                  <FiBriefcase />
                </button>
              )}
            </div>

            <div className="space-y-1">
              {navItems.map((item) => renderNavItem(item))}
            </div>

            {!isCollapsed && (
              <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                  Help Center
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Answers here
                </p>
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <ThemeSwitch isCollapsed={isCollapsed} />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
