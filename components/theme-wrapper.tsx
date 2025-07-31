"use client"

import type React from "react"

import { useTheme } from "@/contexts/theme-context"
import { useEffect } from "react"

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { currentTheme } = useTheme()

  useEffect(() => {
    // Apply theme styles to document
    const root = document.documentElement

    // Apply CSS custom properties
    root.style.setProperty("--color-primary", currentTheme.colors.primary)
    root.style.setProperty("--color-secondary", currentTheme.colors.secondary)
    root.style.setProperty("--color-background", currentTheme.colors.background)
    root.style.setProperty("--color-surface", currentTheme.colors.surface)
    root.style.setProperty("--color-text", currentTheme.colors.text)
    root.style.setProperty("--color-text-secondary", currentTheme.colors.textSecondary)
    root.style.setProperty("--color-accent", currentTheme.colors.accent)
    root.style.setProperty("--color-border", currentTheme.colors.border)
    root.style.setProperty("--font-primary", currentTheme.fonts.primary)
    root.style.setProperty("--font-secondary", currentTheme.fonts.secondary)

    // Apply background color to body
    document.body.style.backgroundColor = currentTheme.colors.background
    document.body.style.color = currentTheme.colors.text
    document.body.style.fontFamily = currentTheme.fonts.secondary
  }, [currentTheme])

  return (
    <div
      className="min-h-screen transition-all duration-500 ease-in-out"
      style={{
        backgroundColor: currentTheme.colors.background,
        color: currentTheme.colors.text,
      }}
    >
      {children}
    </div>
  )
}
