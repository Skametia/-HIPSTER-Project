import type { Product } from "./types/product" // Assuming Product is defined in another file

export interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
  category: string
}

export interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  customerInfo: CustomerInfo
  status: "pending" | "processing" | "shipped" | "delivered"
  createdAt: Date
}

export interface CustomerInfo {
  name: string
  email: string
  address: string
  city: string
  zipCode: string
  phone: string
}
