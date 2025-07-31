"use client"

import { useTheme } from "@/contexts/theme-context"
import { CheckCircle, Package, Truck, Home } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function OrderSuccessPage() {
  const { currentTheme } = useTheme()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<any>(null)

  const containerClass = currentTheme.layout === "sidebar" ? "ml-64" : ""
  const contentStyle = {
    fontFamily: currentTheme.fonts.secondary,
  }

  useEffect(() => {
    if (orderId) {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]")
      const foundOrder = orders.find((o: any) => o.id === orderId)
      setOrder(foundOrder)
    }
  }, [orderId])

  const steps = [
    { icon: CheckCircle, title: "Order Confirmed", status: "completed" },
    { icon: Package, title: "Processing", status: "current" },
    { icon: Truck, title: "Shipped", status: "pending" },
    { icon: Home, title: "Delivered", status: "pending" },
  ]

  return (
    <div className={`${containerClass} transition-all duration-500`} style={contentStyle}>
      <div className={`${currentTheme.spacing.container} ${currentTheme.spacing.section}`}>
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: currentTheme.colors.accent + "20" }}
            >
              <CheckCircle className="w-12 h-12" style={{ color: currentTheme.colors.accent }} />
            </div>

            <h1
              className="text-4xl font-bold mb-4"
              style={{
                color: currentTheme.colors.text,
                fontFamily: currentTheme.fonts.primary,
              }}
            >
              Order Placed Successfully!
            </h1>

            <p className="text-lg mb-2" style={{ color: currentTheme.colors.textSecondary }}>
              Thank you for your purchase. Your order has been confirmed.
            </p>

            {orderId && (
              <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                Order ID: <span className="font-mono font-bold">{orderId}</span>
              </p>
            )}
          </div>

          {/* Order Status */}
          <div
            className="border rounded-lg p-8 mb-8"
            style={{
              backgroundColor: currentTheme.colors.surface,
              borderColor: currentTheme.colors.border,
            }}
          >
            <h2
              className="text-2xl font-bold mb-8 text-center"
              style={{
                color: currentTheme.colors.text,
                fontFamily: currentTheme.fonts.primary,
              }}
            >
              Order Status
            </h2>

            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isCompleted = step.status === "completed"
                const isCurrent = step.status === "current"

                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                        isCompleted || isCurrent ? "scale-110" : ""
                      }`}
                      style={{
                        backgroundColor: isCompleted
                          ? currentTheme.colors.accent
                          : isCurrent
                            ? currentTheme.colors.primary
                            : currentTheme.colors.border,
                        color:
                          isCompleted || isCurrent ? currentTheme.colors.background : currentTheme.colors.textSecondary,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span
                      className="text-sm font-medium text-center"
                      style={{
                        color: isCompleted || isCurrent ? currentTheme.colors.text : currentTheme.colors.textSecondary,
                      }}
                    >
                      {step.title}
                    </span>

                    {index < steps.length - 1 && (
                      <div
                        className="absolute h-0.5 w-full top-6 left-1/2 transform -translate-y-1/2 -z-10"
                        style={{
                          backgroundColor: isCompleted ? currentTheme.colors.accent : currentTheme.colors.border,
                        }}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Order Details */}
          {order && (
            <div
              className="border rounded-lg p-6 mb-8"
              style={{
                backgroundColor: currentTheme.colors.surface,
                borderColor: currentTheme.colors.border,
              }}
            >
              <h3
                className="text-xl font-bold mb-4"
                style={{
                  color: currentTheme.colors.text,
                  fontFamily: currentTheme.fonts.primary,
                }}
              >
                Order Details
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: currentTheme.colors.text }}>
                    Shipping Address
                  </h4>
                  <div className="text-sm space-y-1" style={{ color: currentTheme.colors.textSecondary }}>
                    <p>{order.customerInfo.name}</p>
                    <p>{order.customerInfo.address}</p>
                    <p>
                      {order.customerInfo.city}, {order.customerInfo.zipCode}
                    </p>
                    <p>{order.customerInfo.phone}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2" style={{ color: currentTheme.colors.text }}>
                    Order Summary
                  </h4>
                  <div className="text-sm space-y-1" style={{ color: currentTheme.colors.textSecondary }}>
                    <p>{order.items.length} item(s)</p>
                    <p>
                      Total:{" "}
                      <span className="font-bold" style={{ color: currentTheme.colors.primary }}>
                        ${order.total.toFixed(2)}
                      </span>
                    </p>
                    <p>
                      Status: <span className="capitalize">{order.status}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:opacity-90 hover:scale-105 text-center"
              style={{
                backgroundColor: currentTheme.colors.primary,
                color: currentTheme.colors.background,
              }}
            >
              Continue Shopping
            </Link>

            <Link
              href="/orders"
              className="px-8 py-4 rounded-lg font-bold text-lg border transition-all duration-300 hover:opacity-80 text-center"
              style={{
                borderColor: currentTheme.colors.border,
                color: currentTheme.colors.text,
                backgroundColor: currentTheme.colors.surface,
              }}
            >
              View All Orders
            </Link>
          </div>

          {/* Email Confirmation Notice */}
          <div
            className="mt-8 p-4 rounded-lg text-center"
            style={{
              backgroundColor: currentTheme.colors.background,
              color: currentTheme.colors.textSecondary,
            }}
          >
            <p className="text-sm">
              📧 A confirmation email has been sent to {order?.customerInfo.email || "your email address"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
