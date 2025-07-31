"use client"

import type React from "react"

import { useTheme } from "@/contexts/theme-context"
import { useCart } from "@/contexts/cart-context"
import type { CustomerInfo } from "@/types/cart"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, Lock, CheckCircle } from "lucide-react"
import { useToast } from "@/contexts/toast-context"

export default function CheckoutPage() {
  const { currentTheme } = useTheme()
  const { items, getTotalPrice, clearCart } = useCart()
  const { addToast } = useToast()
  const router = useRouter()

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const containerClass = currentTheme.layout === "sidebar" ? "ml-64" : ""
  const contentStyle = {
    fontFamily: currentTheme.fonts.secondary,
  }

  const totalPrice = getTotalPrice()
  const shipping = totalPrice > 50 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const finalTotal = totalPrice + shipping + tax

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Show processing toast
    addToast({
      title: "Processing Payment",
      description: "Please wait while we process your payment...",
      type: "info",
      duration: 3000,
    })

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Create order
    const orderId = `ORDER-${Date.now()}`
    const order = {
      id: orderId,
      items,
      total: finalTotal,
      customerInfo,
      status: "processing" as const,
      createdAt: new Date(),
    }

    // Save order to localStorage (in real app, this would be sent to backend)
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    localStorage.setItem("orders", JSON.stringify([...existingOrders, order]))

    // Show success toast
    addToast({
      title: "Payment Successful!",
      description: `Order ${orderId} has been placed successfully`,
      type: "success",
      duration: 4000,
    })

    setOrderComplete(true)
    clearCart()
    setIsProcessing(false)

    // Redirect to success page after 3 seconds
    setTimeout(() => {
      router.push(`/order-success?orderId=${orderId}`)
    }, 3000)
  }

  if (items.length === 0 && !orderComplete) {
    router.push("/cart")
    return null
  }

  if (orderComplete) {
    return (
      <div className={`${containerClass} transition-all duration-500`} style={contentStyle}>
        <div className={`${currentTheme.spacing.container} ${currentTheme.spacing.section}`}>
          <div className="max-w-2xl mx-auto text-center py-16">
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

            <p className="text-lg mb-8" style={{ color: currentTheme.colors.textSecondary }}>
              Thank you for your purchase. You will receive a confirmation email shortly.
            </p>

            <div
              className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto"
              style={{ borderColor: currentTheme.colors.primary }}
            ></div>
            <p className="mt-4" style={{ color: currentTheme.colors.textSecondary }}>
              Redirecting to order confirmation...
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
          className="text-4xl font-bold text-center mb-8"
          style={{
            color: currentTheme.colors.text,
            fontFamily: currentTheme.fonts.primary,
          }}
        >
          Checkout
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Customer Information */}
              <div
                className="border rounded-lg p-6"
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
                  Shipping Information
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={customerInfo.name}
                      onChange={handleCustomerInfoChange}
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: currentTheme.colors.background,
                        borderColor: currentTheme.colors.border,
                        color: currentTheme.colors.text,
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={customerInfo.email}
                      onChange={handleCustomerInfoChange}
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: currentTheme.colors.background,
                        borderColor: currentTheme.colors.border,
                        color: currentTheme.colors.text,
                      }}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={customerInfo.address}
                      onChange={handleCustomerInfoChange}
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: currentTheme.colors.background,
                        borderColor: currentTheme.colors.border,
                        color: currentTheme.colors.text,
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={customerInfo.city}
                      onChange={handleCustomerInfoChange}
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: currentTheme.colors.background,
                        borderColor: currentTheme.colors.border,
                        color: currentTheme.colors.text,
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={customerInfo.zipCode}
                      onChange={handleCustomerInfoChange}
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: currentTheme.colors.background,
                        borderColor: currentTheme.colors.border,
                        color: currentTheme.colors.text,
                      }}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={customerInfo.phone}
                      onChange={handleCustomerInfoChange}
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: currentTheme.colors.background,
                        borderColor: currentTheme.colors.border,
                        color: currentTheme.colors.text,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div
                className="border rounded-lg p-6"
                style={{
                  backgroundColor: currentTheme.colors.surface,
                  borderColor: currentTheme.colors.border,
                }}
              >
                <div className="flex items-center space-x-2 mb-6">
                  <CreditCard className="w-6 h-6" style={{ color: currentTheme.colors.primary }} />
                  <h2
                    className="text-2xl font-bold"
                    style={{
                      color: currentTheme.colors.text,
                      fontFamily: currentTheme.fonts.primary,
                    }}
                  >
                    Payment Information
                  </h2>
                  <Lock className="w-4 h-4" style={{ color: currentTheme.colors.textSecondary }} />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                      Card Number *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentInfoChange}
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: currentTheme.colors.background,
                        borderColor: currentTheme.colors.border,
                        color: currentTheme.colors.text,
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      required
                      placeholder="MM/YY"
                      value={paymentInfo.expiryDate}
                      onChange={handlePaymentInfoChange}
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: currentTheme.colors.background,
                        borderColor: currentTheme.colors.border,
                        color: currentTheme.colors.text,
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                      CVV *
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      required
                      placeholder="123"
                      value={paymentInfo.cvv}
                      onChange={handlePaymentInfoChange}
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: currentTheme.colors.background,
                        borderColor: currentTheme.colors.border,
                        color: currentTheme.colors.text,
                      }}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      required
                      value={paymentInfo.cardName}
                      onChange={handlePaymentInfoChange}
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: currentTheme.colors.background,
                        borderColor: currentTheme.colors.border,
                        color: currentTheme.colors.text,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                style={{
                  backgroundColor: currentTheme.colors.primary,
                  color: currentTheme.colors.background,
                }}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Place Order - ${finalTotal.toFixed(2)}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
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

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium line-clamp-1" style={{ color: currentTheme.colors.text }}>
                        {item.title}
                      </p>
                      <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold" style={{ color: currentTheme.colors.primary }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span style={{ color: currentTheme.colors.textSecondary }}>Subtotal:</span>
                  <span style={{ color: currentTheme.colors.text }}>${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span style={{ color: currentTheme.colors.textSecondary }}>Shipping:</span>
                  <span style={{ color: currentTheme.colors.text }}>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span style={{ color: currentTheme.colors.textSecondary }}>Tax:</span>
                  <span style={{ color: currentTheme.colors.text }}>${tax.toFixed(2)}</span>
                </div>

                <div className="border-t pt-3" style={{ borderColor: currentTheme.colors.border }}>
                  <div className="flex justify-between text-xl font-bold">
                    <span style={{ color: currentTheme.colors.text }}>Total:</span>
                    <span style={{ color: currentTheme.colors.primary }}>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div
                className="p-3 rounded-lg text-sm flex items-center space-x-2"
                style={{
                  backgroundColor: currentTheme.colors.background,
                  color: currentTheme.colors.textSecondary,
                }}
              >
                <Lock className="w-4 h-4" />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
