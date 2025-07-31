"use client"

import { useTheme } from "@/contexts/theme-context"
import { useState, useEffect } from "react"
import { Package, Calendar, DollarSign, Eye } from "lucide-react"
import type { Order } from "@/types/cart"

export default function OrdersPage() {
  const { currentTheme } = useTheme()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const containerClass = currentTheme.layout === "sidebar" ? "ml-64" : ""
  const contentStyle = {
    fontFamily: currentTheme.fonts.secondary,
  }

  useEffect(() => {
    // Load orders from localStorage
    try {
      const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      setOrders(savedOrders.reverse()) // Show newest first

      if (savedOrders.length > 0) {
        // Use custom event to show toast
        setTimeout(() => {
          const event = new CustomEvent("showToast", {
            detail: {
              title: "Orders Loaded",
              description: `Found ${savedOrders.length} order(s)`,
              type: "info",
              duration: 2000,
            },
          })
          window.dispatchEvent(event)
        }, 0)
      }
    } catch (error) {
      // Use custom event to show toast
      setTimeout(() => {
        const event = new CustomEvent("showToast", {
          detail: {
            title: "Error Loading Orders",
            description: "Failed to load your order history",
            type: "error",
            duration: 4000,
          },
        })
        window.dispatchEvent(event)
      }, 0)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleViewOrder = (orderId: string) => {
    // Use custom event to show toast
    const event = new CustomEvent("showToast", {
      detail: {
        title: "Order Details",
        description: `Viewing details for ${orderId}`,
        type: "info",
        duration: 2000,
      },
    })
    window.dispatchEvent(event)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return currentTheme.colors.accent
      case "processing":
        return currentTheme.colors.primary
      case "shipped":
        return "#10b981"
      case "delivered":
        return "#059669"
      default:
        return currentTheme.colors.textSecondary
    }
  }

  if (loading) {
    return (
      <div className={`${containerClass} ${currentTheme.spacing.container} ${currentTheme.spacing.section}`}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2"
            style={{ borderColor: currentTheme.colors.primary }}
          ></div>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className={`${containerClass} transition-all duration-500`} style={contentStyle}>
        <div className={`${currentTheme.spacing.container} ${currentTheme.spacing.section}`}>
          <div className="text-center py-16">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: currentTheme.colors.surface }}
            >
              <Package className="w-12 h-12" style={{ color: currentTheme.colors.textSecondary }} />
            </div>

            <h1
              className="text-3xl font-bold mb-4"
              style={{
                color: currentTheme.colors.text,
                fontFamily: currentTheme.fonts.primary,
              }}
            >
              No Orders Yet
            </h1>

            <p className="text-lg mb-8" style={{ color: currentTheme.colors.textSecondary }}>
              You haven't placed any orders yet. Start shopping to see your order history here.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${containerClass} transition-all duration-500`} style={contentStyle}>
      <div className={`${currentTheme.spacing.container} ${currentTheme.spacing.section}`}>
        <h1
          className="text-4xl font-bold mb-8"
          style={{
            color: currentTheme.colors.text,
            fontFamily: currentTheme.fonts.primary,
          }}
        >
          Order History
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-6 transition-all duration-300 hover:shadow-lg"
              style={{
                backgroundColor: currentTheme.colors.surface,
                borderColor: currentTheme.colors.border,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{
                      color: currentTheme.colors.text,
                      fontFamily: currentTheme.fonts.primary,
                    }}
                  >
                    {order.id}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" style={{ color: currentTheme.colors.textSecondary }} />
                      <span style={{ color: currentTheme.colors.textSecondary }}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Package className="w-4 h-4" style={{ color: currentTheme.colors.textSecondary }} />
                      <span style={{ color: currentTheme.colors.textSecondary }}>{order.items.length} item(s)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" style={{ color: currentTheme.colors.textSecondary }} />
                      <span style={{ color: currentTheme.colors.textSecondary }}>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium capitalize"
                    style={{
                      backgroundColor: getStatusColor(order.status) + "20",
                      color: getStatusColor(order.status),
                    }}
                  >
                    {order.status}
                  </span>

                  <button
                    onClick={() => handleViewOrder(order.id)}
                    className="p-2 rounded-lg transition-all duration-300 hover:opacity-80"
                    style={{
                      backgroundColor: currentTheme.colors.primary + "20",
                      color: currentTheme.colors.primary,
                    }}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {order.items.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1" style={{ color: currentTheme.colors.text }}>
                        {item.title}
                      </p>
                      <p className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
                {order.items.length > 4 && (
                  <div
                    className="flex items-center justify-center text-sm"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    +{order.items.length - 4} more
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
