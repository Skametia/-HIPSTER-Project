"use client"

import { useTheme } from "@/contexts/theme-context"
import { useCart } from "@/contexts/cart-context"
import type { CartItem } from "@/types/cart"
import { Minus, Plus, Trash2 } from "lucide-react"

interface CartItemProps {
  item: CartItem
}

export function CartItemComponent({ item }: CartItemProps) {
  const { currentTheme } = useTheme()
  const { updateQuantity, removeFromCart } = useCart()

  const itemStyle = {
    backgroundColor: currentTheme.colors.surface,
    borderColor: currentTheme.colors.border,
  }

  return (
    <div className="border rounded-lg p-4 transition-all duration-300" style={itemStyle}>
      <div className="flex items-center space-x-4">
        {/* Product Image */}
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-bold text-lg mb-1 line-clamp-2"
            style={{
              color: currentTheme.colors.text,
              fontFamily: currentTheme.fonts.primary,
            }}
          >
            {item.title}
          </h3>
          <p className="text-sm mb-2" style={{ color: currentTheme.colors.textSecondary }}>
            {item.category}
          </p>
          <p className="text-xl font-bold" style={{ color: currentTheme.colors.primary }}>
            ${item.price}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:opacity-80"
            style={{
              backgroundColor: currentTheme.colors.border,
              color: currentTheme.colors.text,
            }}
          >
            <Minus className="w-4 h-4" />
          </button>

          <span className="w-12 text-center font-bold" style={{ color: currentTheme.colors.text }}>
            {item.quantity}
          </span>

          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:opacity-80"
            style={{
              backgroundColor: currentTheme.colors.primary,
              color: currentTheme.colors.background,
            }}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-2 rounded-lg transition-all duration-300 hover:opacity-80"
          style={{
            backgroundColor: currentTheme.colors.border,
            color: currentTheme.colors.text,
          }}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Subtotal */}
      <div
        className="mt-4 pt-4 border-t flex justify-between items-center"
        style={{ borderColor: currentTheme.colors.border }}
      >
        <span style={{ color: currentTheme.colors.textSecondary }}>
          Subtotal ({item.quantity} {item.quantity === 1 ? "item" : "items"}):
        </span>
        <span className="text-xl font-bold" style={{ color: currentTheme.colors.primary }}>
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  )
}
