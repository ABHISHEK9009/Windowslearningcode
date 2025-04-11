"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function ParticleBackground() {
  const { theme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Clear existing particles
    containerRef.current.innerHTML = ""

    // Only create particles in dark mode
    if (theme === "dark") {
      const container = containerRef.current
      const particleCount = 20

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div")
        particle.classList.add("particle")

        // Random size between 2px and 6px
        const size = Math.floor(Math.random() * 4) + 2
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`

        // Random position
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`

        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 8}s`

        container.appendChild(particle)
      }
    }
  }, [theme])

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden" />
}
