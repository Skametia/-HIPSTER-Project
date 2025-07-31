"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { Theme } from "@/types/theme"

const themes: Theme[] = [
  {
    id: "theme1",
    name: "Theme 1 - Minimalist",
    colors: {
      primary: "#2563eb",
      secondary: "#64748b",
      background: "#ffffff",
      surface: "#f8fafc",
      text: "#1e293b",
      textSecondary: "#64748b",
      accent: "#3b82f6",
      border: "#e2e8f0",
    },
    fonts: {
      primary: "Inter, sans-serif",
      secondary: "Inter, sans-serif",
    },
    layout: "default",
    spacing: {
      container: "max-w-6xl mx-auto px-4",
      section: "py-12",
      element: "mb-6",
    },
  },
  {
    id: "theme2",
    name: "Theme 2 - Dark Sidebar",
    colors: {
      primary: "#f59e0b",
      secondary: "#6b7280",
      background: "#111827",
      surface: "#1f2937",
      text: "#f9fafb",
      textSecondary: "#d1d5db",
      accent: "#fbbf24",
      border: "#374151",
    },
    fonts: {
      primary: "Playfair Display, serif",
      secondary: "Crimson Text, serif",
    },
    layout: "sidebar",
    spacing: {
      container: "max-w-full",
      section: "py-16",
      element: "mb-8",
    },
  },
  {
    id: "theme3",
    name: "Theme 3 - Colorful Cards",
    colors: {
      primary: "#ec4899",
      secondary: "#8b5cf6",
      background: "#fef3c7",
      surface: "#ffffff",
      text: "#1f2937",
      textSecondary: "#6b7280",
      accent: "#10b981",
      border: "#f59e0b",
    },
    fonts: {
      primary: "Pacifico, cursive",
      secondary: "Poppins, sans-serif",
    },
    layout: "grid",
    spacing: {
      container: "max-w-7xl mx-auto px-6",
      section: "py-20",
      element: "mb-10",
    },
  },
]

interface ThemeContextType {
  currentTheme: Theme
  setTheme: (themeId: string) => void
  themes: Theme[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0])

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem("selectedTheme")
    if (savedTheme) {
      const theme = themes.find((t) => t.id === savedTheme)
      if (theme) {
        setCurrentTheme(theme)
      }
    }
  }, [])

  const setTheme = (themeId: string) => {
    const theme = themes.find((t) => t.id === themeId)
    if (theme) {
      setCurrentTheme(theme)
      localStorage.setItem("selectedTheme", themeId)
    }
  }

  return <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
