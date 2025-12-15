"use client";

import React, { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

interface ThemeSwitchProps {
  isCollapsed?: boolean;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ isCollapsed = false }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (isCollapsed) {
    return (
      <button
        onClick={toggleTheme}
        className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 w-full flex justify-center"
      >
        {isDark ? (
          <FiSun className="text-lg" />
        ) : (
          <FiMoon className="text-lg" />
        )}
      </button>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {isDark ? <FiMoon /> : <FiSun />}
        <span className="font-medium">Theme</span>
      </div>
      <button
        onClick={toggleTheme}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors duration-300
          ${isDark ? "bg-blue-500" : "bg-gray-300"}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white
            transition-transform duration-300
            ${isDark ? "translate-x-6" : "translate-x-1"}
          `}
        />
      </button>
    </div>
  );
};

export default ThemeSwitch;
