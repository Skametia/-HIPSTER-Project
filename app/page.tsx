"use client";

import { useTheme } from "@/contexts/theme-context";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/product-card";
import { ShoppingBag, Sparkles, Zap } from "lucide-react";

export default function HomePage() {
  const { currentTheme } = useTheme();
  const { products, loading, error } = useProducts();

  const containerClass = currentTheme.layout === "sidebar" ? "ml-64" : "";
  const contentStyle = {
    fontFamily: currentTheme.fonts.secondary,
  };

  const features = [
    {
      icon: ShoppingBag,
      title: "Premium Products",
      description: "Curated selection of high-quality items for every need.",
    },
    {
      icon: Sparkles,
      title: "Amazing Experience",
      description: "Seamless shopping with our intuitive interface.",
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Quick and reliable shipping to your doorstep.",
    },
  ];

  if (loading) {
    return (
      <div
        className={`${containerClass} ${currentTheme.spacing.container} ${currentTheme.spacing.section}`}
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2"
            style={{ borderColor: currentTheme.colors.primary }}
          ></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`${containerClass} ${currentTheme.spacing.container} ${currentTheme.spacing.section}`}
      >
        <div
          className="text-center p-8 rounded-lg"
          style={{ backgroundColor: currentTheme.colors.surface }}
        >
          <p style={{ color: currentTheme.colors.text }}>
            Error loading products: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${containerClass} transition-all duration-500`}
      style={contentStyle}
    >
      {/* Hero Section */}
      <section
        className={`${currentTheme.spacing.container} ${currentTheme.spacing.section} text-center fade-in`}
      >
        <h1
          className={`text-4xl md:text-6xl font-bold mt-9  ${currentTheme.spacing.element}`}
          style={{
            color: currentTheme.colors.text,
            fontFamily: currentTheme.fonts.primary,
          }}
        >
          Welcome to MultiTheme
        </h1>

        <p
          className={`text-lg md:text-xl max-w-2xl mx-auto ${currentTheme.spacing.element}`}
          style={{ color: currentTheme.colors.textSecondary }}
        >
          Experience our amazing products with three unique themes. Switch
          between minimalist, dark sidebar, and colorful card layouts to find
          your perfect style.
        </p>

        <button
          className="px-8 py-4 mb-10 rounded-lg font-bold text-lg transition-all duration-300 hover:opacity-90 hover:scale-105"
          style={{
            backgroundColor: currentTheme.colors.primary,
            color: currentTheme.colors.background,
          }}
        >
          Explore Products
        </button>
      </section>

      {/* Features Section */}
      <section
        className={`${currentTheme.spacing.container} ${currentTheme.spacing.section}`}
        style={{ backgroundColor: currentTheme.colors.surface }}
      >
        <h2
          className={`text-3xl font-bold text-center pt-10 ${currentTheme.spacing.element}`}
          style={{
            color: currentTheme.colors.text,
            fontFamily: currentTheme.fonts.primary,
          }}
        >
          Why Choose Us
        </h2>

        <div
          className={`grid md:grid-cols-3 mt-10 mb-10 gap-8 ${
            currentTheme.layout === "grid" ? "lg:grid-cols-3" : "lg:grid-cols-3"
          }`}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-lg transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: currentTheme.colors.background }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    backgroundColor: currentTheme.colors.primary + "20",
                  }}
                >
                  <Icon
                    className="w-8 h-8"
                    style={{ color: currentTheme.colors.primary }}
                  />
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    color: currentTheme.colors.text,
                    fontFamily: currentTheme.fonts.primary,
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: currentTheme.colors.textSecondary }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Products Section */}
      <section
        className={`${currentTheme.spacing.container} ${currentTheme.spacing.section}`}
      >
        <h2
          className={`text-3xl font-bold text-center mb-9  ${currentTheme.spacing.element}`}
          style={{
            color: currentTheme.colors.text,
            fontFamily: currentTheme.fonts.primary,
          }}
        >
          Featured Products
        </h2>

        <div
          className={`grid gap-6 ${
            currentTheme.layout === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : currentTheme.layout === "sidebar"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
