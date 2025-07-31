"use client"

import { useTheme } from "@/contexts/theme-context"
import { useToast } from "@/contexts/toast-context"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { useState, useRef } from "react"
import { CartIcon } from "@/components/cart-icon"

export function Header() {
  const { currentTheme, setTheme, themes } = useTheme()
  const { addToast } = useToast()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const lastThemeChange = useRef<string>("")

  const headerStyle = {
    backgroundColor: currentTheme.colors.surface,
    borderBottom: `1px solid ${currentTheme.colors.border}`,
    fontFamily: currentTheme.fonts.primary,
  }

  const handleThemeChange = (themeId: string, themeName: string) => {
    // Prevent duplicate theme change toasts
    const changeKey = `${themeId}-${Date.now()}`
    if (lastThemeChange.current === themeId) {
      setIsDropdownOpen(false)
      return
    }

    lastThemeChange.current = themeId
    setTheme(themeId)
    setIsDropdownOpen(false)

    // Use setTimeout to avoid setState during render
    setTimeout(() => {
      addToast({
        title: "Theme Changed",
        description: `Switched to ${themeName}`,
        type: "success",
        duration: 2000,
      })
    }, 100)

    // Reset the last theme change after a delay
    setTimeout(() => {
      lastThemeChange.current = ""
    }, 1000)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={headerStyle}>
      <div className={currentTheme.spacing.container}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: currentTheme.colors.primary }}
            >
              MT
            </div>
            <span
              className="text-xl font-bold transition-colors duration-300"
              style={{
                color: currentTheme.colors.text,
                fontFamily: currentTheme.fonts.primary,
              }}
            >
              MultiTheme App
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="transition-colors duration-300 hover:opacity-80"
              style={{ color: currentTheme.colors.text }}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="transition-colors duration-300 hover:opacity-80"
              style={{ color: currentTheme.colors.text }}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="transition-colors duration-300 hover:opacity-80"
              style={{ color: currentTheme.colors.text }}
            >
              Contact
            </Link>
          </nav>

          {/* Cart Icon */}
          <CartIcon />

          {/* Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 hover:opacity-80"
              style={{
                backgroundColor: currentTheme.colors.background,
                borderColor: currentTheme.colors.border,
                color: currentTheme.colors.text,
              }}
            >
              <span className="text-sm font-medium">{currentTheme.name}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg border z-50 transition-all duration-300"
                style={{
                  backgroundColor: currentTheme.colors.surface,
                  borderColor: currentTheme.colors.border,
                }}
              >
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id, theme.name)}
                    className="w-full text-left px-4 py-3 hover:opacity-80 transition-all duration-200 first:rounded-t-lg last:rounded-b-lg"
                    style={{
                      color: currentTheme.colors.text,
                      backgroundColor:
                        currentTheme.id === theme.id ? currentTheme.colors.primary + "20" : "transparent",
                    }}
                  >
                    <div className="font-medium">{theme.name}</div>
                    <div className="text-xs mt-1" style={{ color: currentTheme.colors.textSecondary }}>
                      {theme.layout} layout • {theme.fonts.primary.split(",")[0]}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
