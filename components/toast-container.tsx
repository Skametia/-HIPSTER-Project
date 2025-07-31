"use client"

import { useToast } from "@/contexts/toast-context"
import { useTheme } from "@/contexts/theme-context"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"
import { useEffect, useState } from "react"

export function ToastContainer() {
  const { toasts, removeToast } = useToast()
  const { currentTheme } = useTheme()

  const getToastIcon = (type: string) => {
    switch (type) {
      case "success":
        return CheckCircle
      case "error":
        return AlertCircle
      case "warning":
        return AlertTriangle
      case "info":
        return Info
      default:
        return Info
    }
  }

  const getToastColors = (type: string) => {
    switch (type) {
      case "success":
        return {
          bg: "#10b981",
          border: "#059669",
          icon: "#ffffff",
        }
      case "error":
        return {
          bg: "#ef4444",
          border: "#dc2626",
          icon: "#ffffff",
        }
      case "warning":
        return {
          bg: "#f59e0b",
          border: "#d97706",
          icon: "#ffffff",
        }
      case "info":
        return {
          bg: currentTheme.colors.primary,
          border: currentTheme.colors.accent,
          icon: "#ffffff",
        }
      default:
        return {
          bg: currentTheme.colors.surface,
          border: currentTheme.colors.border,
          icon: currentTheme.colors.text,
        }
    }
  }

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map((toast) => {
        const Icon = getToastIcon(toast.type)
        const colors = getToastColors(toast.type)

        return (
          <ToastItem
            key={toast.id}
            toast={toast}
            Icon={Icon}
            colors={colors}
            onRemove={() => removeToast(toast.id)}
            currentTheme={currentTheme}
          />
        )
      })}
    </div>
  )
}

interface ToastItemProps {
  toast: any
  Icon: any
  colors: any
  onRemove: () => void
  currentTheme: any
}

function ToastItem({ toast, Icon, colors, onRemove, currentTheme }: ToastItemProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10)
    return () => clearTimeout(timer)
  }, [])

  const handleRemove = () => {
    setIsLeaving(true)
    setTimeout(onRemove, 300) // Wait for exit animation
  }

  return (
    <div
      className={`transform transition-all duration-300 ease-in-out ${
        isVisible && !isLeaving
          ? "translate-x-0 opacity-100 scale-100"
          : isLeaving
            ? "translate-x-full opacity-0 scale-95"
            : "translate-x-full opacity-0 scale-95"
      }`}
    >
      <div
        className="rounded-lg shadow-lg border p-4 backdrop-blur-sm"
        style={{
          backgroundColor: colors.bg + "f0", // Add transparency
          borderColor: colors.border,
          fontFamily: currentTheme.fonts.secondary,
        }}
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Icon className="w-5 h-5" style={{ color: colors.icon }} />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold mb-1" style={{ color: colors.icon }}>
              {toast.title}
            </h4>
            {toast.description && (
              <p className="text-sm opacity-90" style={{ color: colors.icon }}>
                {toast.description}
              </p>
            )}
          </div>

          <button
            onClick={handleRemove}
            className="flex-shrink-0 p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors duration-200"
          >
            <X className="w-4 h-4" style={{ color: colors.icon }} />
          </button>
        </div>
      </div>
    </div>
  )
}
