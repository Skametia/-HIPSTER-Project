"use client"

import { useTheme } from "@/contexts/theme-context"
import { useCart } from "@/contexts/cart-context"
import { CartItemComponent } from "@/components/cart-item"
import { ShoppingBag, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { currentTheme } = useTheme()
  const { items, getTotalItems, getTotalPrice, clearCart } = useCart()

  const containerClass = currentTheme.layout === "sidebar" ? "ml-64" : ""
  const contentStyle = {
    fontFamily: currentTheme.fonts.secondary,
  }

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  if (items.length === 0) {
    return (
      <div className={`${containerClass} transition-all duration-500`} style={contentStyle}>
        <div className={`${currentTheme.spacing.container} ${currentTheme.spacing.section}`}>
          <div className="text-center py-16">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: currentTheme.colors.surface }}
            >
              <ShoppingBag className="w-12 h-12" style={{ color: currentTheme.colors.textSecondary }} />
            </div>

            <h1
              className="text-3xl font-bold mb-4"
              style={{
                color: currentTheme.colors.text,
                fontFamily: currentTheme.fonts.primary,
              }}
            >
              Your Cart is Empty
            </h1>

            <p className="text-lg mb-8" style={{ color: currentTheme.colors.textSecondary }}>
              Looks like you haven't added any items to your cart yet.
            </p>

            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:opacity-90 hover:scale-105"
              style={{
                backgroundColor: currentTheme.colors.primary,
                color: currentTheme.colors.background,
              }}
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${containerClass} transition-all duration-500`} style={contentStyle}>
      <div className={`${currentTheme.spacing.container} ${currentTheme.spacing.section}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1
            className="text-4xl font-bold"
            style={{
              color: currentTheme.colors.text,
              fontFamily: currentTheme.fonts.primary,
            }}
          >
            Shopping Cart
          </h1>

          <button
            onClick={clearCart}
            className="px-4 py-2 rounded-lg border transition-all duration-300 hover:opacity-80"
            style={{
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.textSecondary,
            }}
          >
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItemComponent key={item.id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div
              className="border rounded-lg p-6 sticky top-24"
              style={{
                backgroundColor: currentTheme.colors.surface,
                borderColor: currentTheme.colors.border,
              }}
            >
              <h2
                className="text-2xl font-bold mb-6"
                style={{
                  color: currentTheme.colors.text,
                  fontFamily: currentTheme.fonts.primary,
                }}
              >
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span style={{ color: currentTheme.colors.textSecondary }}>Items ({totalItems}):</span>
                  <span style={{ color: currentTheme.colors.text }}>${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span style={{ color: currentTheme.colors.textSecondary }}>Shipping:</span>
                  <span style={{ color: currentTheme.colors.text }}>{totalPrice > 50 ? "FREE" : "$9.99"}</span>
                </div>

                <div className="flex justify-between">
                  <span style={{ color: currentTheme.colors.textSecondary }}>Tax:</span>
                  <span style={{ color: currentTheme.colors.text }}>${(totalPrice * 0.08).toFixed(2)}</span>
                </div>

                <div className="border-t pt-4" style={{ borderColor: currentTheme.colors.border }}>
                  <div className="flex justify-between text-xl font-bold">
                    <span style={{ color: currentTheme.colors.text }}>Total:</span>
                    <span style={{ color: currentTheme.colors.primary }}>
                      ${(totalPrice + (totalPrice > 50 ? 0 : 9.99) + totalPrice * 0.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {totalPrice > 50 && (
                <div
                  className="p-3 rounded-lg mb-4 text-sm"
                  style={{
                    backgroundColor: currentTheme.colors.accent + "20",
                    color: currentTheme.colors.text,
                  }}
                >
                  🎉 You qualify for FREE shipping!
                </div>
              )}

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 hover:opacity-90 hover:scale-105"
                style={{
                  backgroundColor: currentTheme.colors.primary,
                  color: currentTheme.colors.background,
                }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/"
                className="w-full text-center block mt-4 py-2 transition-colors duration-300 hover:opacity-80"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
