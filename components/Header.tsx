"use client";

import React from "react";
import { FiMenu, FiBell, FiSearch } from "react-icons/fi";
import { useSidebar } from "@/contexts/SidebarContext";

const Header = () => {
  const { setIsMobileOpen } = useSidebar();

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
          >
            <FiMenu className="text-xl" />
          </button>

          <div className="relative hidden md:block">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 lg:w-96 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative">
            <FiBell className="text-xl" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">JK</span>
            </div>
            <div className="hidden md:block">
              <h3 className="font-semibold text-gray-800 dark:text-white">
                Joe Kent
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                joekent@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
