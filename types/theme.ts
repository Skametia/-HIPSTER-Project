export interface Theme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    background: string
    surface: string
    text: string
    textSecondary: string
    accent: string
    border: string
  }
  fonts: {
    primary: string
    secondary: string
  }
  layout: "default" | "sidebar" | "grid"
  spacing: {
    container: string
    section: string
    element: string
  }
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}
