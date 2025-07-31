"use client"

import { useTheme } from "@/contexts/theme-context"
import { Users, Target, Award, Heart } from "lucide-react"

export default function AboutPage() {
  const { currentTheme } = useTheme()

  const containerClass = currentTheme.layout === "sidebar" ? "ml-64" : ""
  const contentStyle = {
    fontFamily: currentTheme.fonts.secondary,
  }

  const values = [
    {
      icon: Users,
      title: "Team Collaboration",
      description: "We believe in the power of working together to achieve great results.",
    },
    {
      icon: Target,
      title: "Goal Oriented",
      description: "Every project has clear objectives and measurable outcomes.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for the highest quality in everything we do.",
    },
    {
      icon: Heart,
      title: "Passion",
      description: "We love what we do and it shows in our work.",
    },
  ]

  return (
    <div className={`${containerClass} transition-all duration-500`} style={contentStyle}>
      {/* Hero Section */}
      <section className={`${currentTheme.spacing.container} ${currentTheme.spacing.section} text-center fade-in`}>
        <h1
          className={`text-4xl md:text-6xl font-bold ${currentTheme.spacing.element}`}
          style={{
            color: currentTheme.colors.text,
            fontFamily: currentTheme.fonts.primary,
          }}
        >
          About Our Company
        </h1>

        <p
          className={`text-lg md:text-xl max-w-3xl mx-auto ${currentTheme.spacing.element}`}
          style={{ color: currentTheme.colors.textSecondary }}
        >
          We are a passionate team dedicated to creating amazing user experiences through innovative design and
          cutting-edge technology. Our multi-theme approach ensures that every user finds their perfect interface.
        </p>
      </section>

      {/* Story Section */}
      <section
        className={`${currentTheme.spacing.container} ${currentTheme.spacing.section}`}
        style={{ backgroundColor: currentTheme.colors.surface }}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className={`text-3xl font-bold ${currentTheme.spacing.element}`}
              style={{
                color: currentTheme.colors.text,
                fontFamily: currentTheme.fonts.primary,
              }}
            >
              Our Story
            </h2>
            <p
              className={`text-lg ${currentTheme.spacing.element}`}
              style={{ color: currentTheme.colors.textSecondary }}
            >
              Founded in 2020, we started with a simple mission: to make technology more accessible and enjoyable for
              everyone. What began as a small team of developers has grown into a full-service digital agency.
            </p>
            <p className="text-lg" style={{ color: currentTheme.colors.textSecondary }}>
              Today, we continue to push boundaries and explore new ways to enhance user experiences through thoughtful
              design and robust development.
            </p>
          </div>
          <div className="aspect-video rounded-lg" style={{ backgroundColor: currentTheme.colors.primary + "20" }}>
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl" style={{ color: currentTheme.colors.primary }}>
                🚀
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`${currentTheme.spacing.container} ${currentTheme.spacing.section}`}>
        <h2
          className={`text-3xl font-bold text-center ${currentTheme.spacing.element}`}
          style={{
            color: currentTheme.colors.text,
            fontFamily: currentTheme.fonts.primary,
          }}
        >
          Our Values
        </h2>

        <div
          className={`grid gap-8 ${
            currentTheme.layout === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div
                key={index}
                className="text-center p-6 rounded-lg transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: currentTheme.colors.surface }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: currentTheme.colors.accent + "20" }}
                >
                  <Icon className="w-8 h-8" style={{ color: currentTheme.colors.accent }} />
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    color: currentTheme.colors.text,
                    fontFamily: currentTheme.fonts.primary,
                  }}
                >
                  {value.title}
                </h3>
                <p style={{ color: currentTheme.colors.textSecondary }}>{value.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Team Section */}
      <section
        className={`${currentTheme.spacing.container} ${currentTheme.spacing.section}`}
        style={{ backgroundColor: currentTheme.colors.surface }}
      >
        <h2
          className={`text-3xl font-bold text-center ${currentTheme.spacing.element}`}
          style={{
            color: currentTheme.colors.text,
            fontFamily: currentTheme.fonts.primary,
          }}
        >
          Meet Our Team
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Sarah Johnson", role: "CEO & Founder", avatar: "👩‍💼" },
            { name: "Mike Chen", role: "Lead Developer", avatar: "👨‍💻" },
            { name: "Emily Davis", role: "Design Director", avatar: "👩‍🎨" },
          ].map((member, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: currentTheme.colors.background }}
            >
              <div className="text-6xl mb-4">{member.avatar}</div>
              <h3
                className="text-xl font-bold mb-1"
                style={{
                  color: currentTheme.colors.text,
                  fontFamily: currentTheme.fonts.primary,
                }}
              >
                {member.name}
              </h3>
              <p style={{ color: currentTheme.colors.textSecondary }}>{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
