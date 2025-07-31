import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Pacifico, Poppins, Crimson_Text } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/contexts/theme-context"
import { ThemeWrapper } from "@/components/theme-wrapper"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { CartProvider } from "@/contexts/cart-context"
import { ToastProvider } from "@/contexts/toast-context"
import { ToastContainer } from "@/components/toast-container"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const pacifico = Pacifico({ weight: "400", subsets: ["latin"], variable: "--font-pacifico" })
const poppins = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-poppins" })
const crimson = Crimson_Text({ weight: ["400", "600"], subsets: ["latin"], variable: "--font-crimson" })

export const metadata: Metadata = {
  title: "Multi-Theme App",
  description: "A React application with multiple theme support",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${pacifico.variable} ${poppins.variable} ${crimson.variable}`}
      >
        <ThemeProvider>
          <ToastProvider>
            <CartProvider>
              <ThemeWrapper>
                <Header />
                <Sidebar />
                <main className="pt-16">{children}</main>
                <ToastContainer />
              </ThemeWrapper>
            </CartProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
