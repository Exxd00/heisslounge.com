"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";
import * as gtag from "@/lib/gtag";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    const newTheme = theme === "dark" ? "Light Mode" : "Dark Mode";
    gtag.event({
      action: newTheme,
      category: "settings",
      label: `Theme Changed to ${newTheme}`,
    });
    toggleTheme();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="fixed top-4 right-4 z-[60] w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--bg-dark)] transition-all duration-300 shadow-lg backdrop-blur-sm"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-6 h-6">
        {/* Sun icon */}
        <Sun
          className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${
            theme === "light"
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 rotate-90 scale-50"
          }`}
        />
        {/* Moon icon */}
        <Moon
          className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${
            theme === "dark"
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-50"
          }`}
        />
      </div>
    </button>
  );
}
