"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface FadeInProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right" | "none"
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
}: FadeInProps) {
  // Set initial animation values based on direction
  let initial = { opacity: 0 }

  if (direction === "up") {
    initial = { ...initial, y: 40 }
  } else if (direction === "down") {
    initial = { ...initial, y: -40 }
  } else if (direction === "left") {
    initial = { ...initial, x: 40 }
  } else if (direction === "right") {
    initial = { ...initial, x: -40 }
  }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
