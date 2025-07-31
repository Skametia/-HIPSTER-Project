"use client"

import type React from "react"

import { useTheme } from "@/contexts/theme-context"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/contexts/toast-context"

export default function ContactPage() {
  const { currentTheme } = useTheme()
  const { addToast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const containerClass = currentTheme.layout === "sidebar" ? "ml-64" : ""
  const contentStyle = {
    fontFamily: currentTheme.fonts.secondary,
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)

    addToast({
      title: "Message Sent!",
      description: "Thank you for your message! We'll get back to you soon.",
      type: "success",
      duration: 4000,
    })

    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@multitheme.com",
      link: "mailto:hello@multitheme.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Address",
      value: "123 Design Street, Tech City, TC 12345",
      link: "#",
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
          Get In Touch
        </h1>

        <p
          className={`text-lg md:text-xl max-w-2xl mx-auto ${currentTheme.spacing.element}`}
          style={{ color: currentTheme.colors.textSecondary }}
        >
          Have a question or want to work together? We'd love to hear from you. Send us a message and we'll respond as
          soon as possible.
        </p>
      </section>

      {/* Contact Info */}
      <section
        className={`${currentTheme.spacing.container} ${currentTheme.spacing.section}`}
        style={{ backgroundColor: currentTheme.colors.surface }}
      >
        <div className="grid md:grid-cols-3 gap-8">
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <div
                key={index}
                className="text-center p-6 rounded-lg transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: currentTheme.colors.background }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: currentTheme.colors.primary + "20" }}
                >
                  <Icon className="w-8 h-8" style={{ color: currentTheme.colors.primary }} />
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    color: currentTheme.colors.text,
                    fontFamily: currentTheme.fonts.primary,
                  }}
                >
                  {info.title}
                </h3>
                <a
                  href={info.link}
                  className="transition-colors duration-300 hover:opacity-80"
                  style={{ color: currentTheme.colors.textSecondary }}
                >
                  {info.value}
                </a>
              </div>
            )
          })}
        </div>
      </section>

      {/* Contact Form */}
      <section className={`${currentTheme.spacing.container} ${currentTheme.spacing.section}`}>
        <div className="max-w-2xl mx-auto">
          <h2
            className={`text-3xl font-bold text-center ${currentTheme.spacing.element}`}
            style={{
              color: currentTheme.colors.text,
              fontFamily: currentTheme.fonts.primary,
            }}
          >
            Send us a Message
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-8 rounded-lg"
            style={{ backgroundColor: currentTheme.colors.surface }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                  style={{ color: currentTheme.colors.text }}
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: currentTheme.colors.background,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text,
                  }}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                  style={{ color: currentTheme.colors.text }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: currentTheme.colors.background,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text,
                  }}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium mb-2"
                style={{ color: currentTheme.colors.text }}
              >
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: currentTheme.colors.background,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text,
                }}
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
                style={{ color: currentTheme.colors.text }}
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 resize-vertical"
                style={{
                  backgroundColor: currentTheme.colors.background,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text,
                }}
                placeholder="Tell us more about your project or question..."
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 hover:opacity-90 hover:scale-105"
              style={{
                backgroundColor: currentTheme.colors.primary,
                color: currentTheme.colors.background,
              }}
            >
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
