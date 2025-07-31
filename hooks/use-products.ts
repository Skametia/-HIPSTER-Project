"use client"

import { useState, useEffect, useRef } from "react"
import type { Product } from "@/types/theme"

// Utility function to dispatch toast events with duplicate prevention
const dispatchToastEvent = (() => {
  const recentEvents = new Set<string>()

  return (toastData: any) => {
    const eventKey = `${toastData.title}-${toastData.description}`

    // Prevent duplicate events within 1 second
    if (recentEvents.has(eventKey)) {
      return
    }

    recentEvents.add(eventKey)

    // Remove from recent events after 1 second
    setTimeout(() => {
      recentEvents.delete(eventKey)
    }, 1000)

    // Dispatch the event
    const event = new CustomEvent("showToast", { detail: toastData })
    window.dispatchEvent(event)
  }
})()

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const hasShownToast = useRef(false)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const response = await fetch("https://fakestoreapi.com/products")

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data = await response.json()
        setProducts(data)

        // Only show success toast once
        if (!hasShownToast.current) {
          hasShownToast.current = true

          // Use custom event to show toast
          setTimeout(() => {
            dispatchToastEvent({
              title: "Products Loaded",
              description: `Successfully loaded ${data.length} products`,
              type: "success",
              duration: 3000,
            })
          }, 100) // Small delay to ensure everything is mounted
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred"
        setError(errorMessage)

        // Only show error toast once
        if (!hasShownToast.current) {
          hasShownToast.current = true

          // Use custom event to show toast
          setTimeout(() => {
            dispatchToastEvent({
              title: "Loading Failed",
              description: errorMessage,
              type: "error",
              duration: 5000,
            })
          }, 100)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}
