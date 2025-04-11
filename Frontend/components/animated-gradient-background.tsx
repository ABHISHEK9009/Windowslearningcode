"use client"

import { useEffect, useRef } from "react"

interface AnimatedGradientBackgroundProps {
  className?: string
}

export function AnimatedGradientBackground({ className = "" }: AnimatedGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create gradient circles
    const circles = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 300 + 100,
      vx: Math.random() * 0.2 - 0.1,
      vy: Math.random() * 0.2 - 0.1,
      hue: Math.random() * 60 + 200, // Blue to purple hues
    }))

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient circles
      circles.forEach((circle) => {
        // Update position
        circle.x += circle.vx
        circle.y += circle.vy

        // Bounce off edges
        if (circle.x < 0 || circle.x > canvas.width) circle.vx *= -1
        if (circle.y < 0 || circle.y > canvas.height) circle.vy *= -1

        // Create gradient
        const gradient = ctx.createRadialGradient(circle.x, circle.y, 0, circle.x, circle.y, circle.radius)
        gradient.addColorStop(0, `hsla(${circle.hue}, 100%, 70%, 0.3)`)
        gradient.addColorStop(1, `hsla(${circle.hue}, 100%, 70%, 0)`)

        // Draw circle
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className={`fixed inset-0 -z-10 ${className}`} />
}
