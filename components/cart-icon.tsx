"use client"

import { useTheme } from "@/contexts/theme-context"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

export function CartIcon() {
  const { currentTheme } = useTheme()
  const { getTotalItems } = useCart()

  const totalItems = getTotalItems()

  return (
    <Link
      href="/cart"
      className="relative p-2 rounded-lg transition-all duration-300 hover:opacity-80"
      style={{
        backgroundColor: currentTheme.colors.surface,
        borderColor: currentTheme.colors.border,
      }}
    >
      <ShoppingCart className="w-6 h-6" style={{ color: currentTheme.colors.text }} />

      {totalItems > 0 && (
        <span
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center animate-pulse"
          style={{
            backgroundColor: currentTheme.colors.primary,
            color: currentTheme.colors.background,
          }}
        >
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  )
}
