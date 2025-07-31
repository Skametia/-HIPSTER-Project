"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react"

export interface Toast {
  id: string
  title: string
  description?: string
  type: "success" | "error" | "warning" | "info"
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const recentToasts = useRef<Set<string>>(new Set())
  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map())

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    // Create a unique key for duplicate detection
    const toastKey = `${toast.title}-${toast.description}-${toast.type}`

    // Check if this exact toast was recently added (within 1 second)
    if (recentToasts.current.has(toastKey)) {
      return // Prevent duplicate
    }

    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { ...toast, id }

    // Add to recent toasts to prevent duplicates
    recentToasts.current.add(toastKey)

    // Remove from recent toasts after 1 second
    setTimeout(() => {
      recentToasts.current.delete(toastKey)
    }, 1000)

    setToasts((prevToasts) => {
      // Also check if we already have a similar toast in the current toasts
      const existingSimilar = prevToasts.find(
        (existingToast) =>
          existingToast.title === toast.title &&
          existingToast.description === toast.description &&
          existingToast.type === toast.type,
      )

      if (existingSimilar) {
        return prevToasts // Don't add duplicate
      }

      return [...prevToasts, newToast]
    })

    // Auto remove toast after duration (default 5 seconds)
    const duration = toast.duration || 5000
    const timeoutId = setTimeout(() => {
      removeToast(id)
    }, duration)

    timeoutRefs.current.set(id, timeoutId)
  }, [])

  const removeToast = useCallback((id: string) => {
    // Clear the timeout if it exists
    const timeoutId = timeoutRefs.current.get(id)
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutRefs.current.delete(id)
    }

    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  const clearToasts = useCallback(() => {
    // Clear all timeouts
    timeoutRefs.current.forEach((timeoutId) => {
      clearTimeout(timeoutId)
    })
    timeoutRefs.current.clear()
    recentToasts.current.clear()

    setToasts([])
  }, [])

  // Listen for custom toast events with duplicate prevention
  useEffect(() => {
    const handleToastEvent = (event: CustomEvent) => {
      addToast(event.detail)
    }

    // Use capture phase to ensure we only get one event
    window.addEventListener("showToast", handleToastEvent as EventListener, { capture: true })

    return () => {
      window.removeEventListener("showToast", handleToastEvent as EventListener, { capture: true })
      // Clean up timeouts on unmount
      timeoutRefs.current.forEach((timeoutId) => {
        clearTimeout(timeoutId)
      })
      timeoutRefs.current.clear()
    }
  }, [addToast])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>{children}</ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
