"use client"

import { useTheme } from "@/contexts/theme-context"
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"
import type { Product } from "@/types/theme"
import { Star } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { currentTheme } = useTheme()
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const cardStyle = {
    backgroundColor: currentTheme.colors.surface,
    borderColor: currentTheme.colors.border,
    fontFamily: currentTheme.fonts.secondary,
  }

  const isGridLayout = currentTheme.layout === "grid"

  const handleAddToCart = async () => {
    setIsAdding(true)
    addToCart(product)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsAdding(false)
  }

  return (
    <div
      className={`border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg ${
        isGridLayout ? "transform hover:scale-105" : ""
      }`}
      style={cardStyle}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="p-4">
        <h3
          className="font-bold text-lg mb-2 line-clamp-2"
          style={{
            color: currentTheme.colors.text,
            fontFamily: currentTheme.fonts.primary,
          }}
        >
          {product.title}
        </h3>

        <p className="text-sm mb-3 line-clamp-3" style={{ color: currentTheme.colors.textSecondary }}>
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold" style={{ color: currentTheme.colors.primary }}>
            ${product.price}
          </span>

          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-current" style={{ color: currentTheme.colors.accent }} />
            <span className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:opacity-90 disabled:opacity-50 flex items-center justify-center space-x-2"
          style={{
            backgroundColor: currentTheme.colors.primary,
            color: currentTheme.colors.background,
          }}
        >
          {isAdding ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Adding...</span>
            </>
          ) : (
            <span>Add to Cart</span>
          )}
        </button>
      </div>
    </div>
  )
}
