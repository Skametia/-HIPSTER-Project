"use client"

import { useTheme } from "@/contexts/theme-context"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Mail } from "lucide-react"

export function Sidebar() {
  const { currentTheme } = useTheme()
  const pathname = usePathname()

  if (currentTheme.layout !== "sidebar") return null

  const sidebarStyle = {
    backgroundColor: currentTheme.colors.surface,
    borderRight: `1px solid ${currentTheme.colors.border}`,
  }

  const menuItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: User },
    { href: "/contact", label: "Contact", icon: Mail },
  ]

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 transition-all duration-500 z-40" style={sidebarStyle}>
      <nav className="p-6">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:opacity-80"
                style={{
                  backgroundColor: isActive ? currentTheme.colors.primary + "20" : "transparent",
                  color: isActive ? currentTheme.colors.primary : currentTheme.colors.text,
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </aside>
  )
}
