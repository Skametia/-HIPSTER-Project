"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react"
import type { CartItem, CartContextType } from "@/types/cart"
import type { Product } from "@/types/theme"

const CartContext = createContext<CartContextType | undefined>(undefined)

// Utility function to dispatch toast events with duplicate prevention
const dispatchToastEvent = (() => {
  const recentEvents = new Set<string>()

  return (toastData: any) => {
    const eventKey = `${toastData.title}-${toastData.description}`

    // Prevent duplicate events within 500ms
    if (recentEvents.has(eventKey)) {
      return
    }

    recentEvents.add(eventKey)

    // Remove from recent events after 500ms
    setTimeout(() => {
      recentEvents.delete(eventKey)
    }, 500)

    // Dispatch the event
    const event = new CustomEvent("showToast", { detail: toastData })
    window.dispatchEvent(event)
  }
})()

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const isInitialized = useRef(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("shopping-cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setItems(parsedCart)
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
    isInitialized.current = true
  }, [])

  // Save cart to localStorage whenever items change (but not on initial load)
  useEffect(() => {
    if (isInitialized.current) {
      localStorage.setItem("shopping-cart", JSON.stringify(items))
    }
  }, [items])

  const addToCart = useCallback((product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        const newQuantity = existingItem.quantity + 1

        // Schedule toast for next tick to avoid setState during render
        setTimeout(() => {
          dispatchToastEvent({
            title: "Item Updated",
            description: `${product.title} quantity increased to ${newQuantity}`,
            type: "success",
            duration: 3000,
          })
        }, 0)

        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: newQuantity } : item))
      } else {
        // Schedule toast for next tick to avoid setState during render
        setTimeout(() => {
          dispatchToastEvent({
            title: "Added to Cart",
            description: `${product.title} has been added to your cart`,
            type: "success",
            duration: 3000,
          })
        }, 0)

        return [
          ...prevItems,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1,
            category: product.category,
          },
        ]
      }
    })
  }, [])

  const removeFromCart = useCallback((productId: number) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === productId)
      if (itemToRemove) {
        // Schedule toast for next tick to avoid setState during render
        setTimeout(() => {
          dispatchToastEvent({
            title: "Item Removed",
            description: `${itemToRemove.title} has been removed from your cart`,
            type: "info",
            duration: 3000,
          })
        }, 0)
      }
      return prevItems.filter((item) => item.id !== productId)
    })
  }, [])

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId)
        return
      }

      setItems((prevItems) => {
        const item = prevItems.find((item) => item.id === productId)
        if (item && item.quantity !== quantity) {
          // Schedule toast for next tick to avoid setState during render
          setTimeout(() => {
            dispatchToastEvent({
              title: "Quantity Updated",
              description: `${item.title} quantity changed to ${quantity}`,
              type: "success",
              duration: 2000,
            })
          }, 0)
        }
        return prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item))
      })
    },
    [removeFromCart],
  )

  const clearCart = useCallback(() => {
    setItems((prevItems) => {
      if (prevItems.length > 0) {
        // Schedule toast for next tick to avoid setState during render
        setTimeout(() => {
          dispatchToastEvent({
            title: "Cart Cleared",
            description: "All items have been removed from your cart",
            type: "warning",
            duration: 3000,
          })
        }, 0)
      }
      return []
    })
  }, [])

  const getTotalItems = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }, [items])

  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [items])

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
