"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface HoverCardProps {
  children: ReactNode
  className?: string
}

export function HoverCard({ children, className = "" }: HoverCardProps) {
  return (
    <motion.div
      className={`${className} transition-all duration-300`}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        y: -5,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
    >
      {children}
    </motion.div>
  )
}
