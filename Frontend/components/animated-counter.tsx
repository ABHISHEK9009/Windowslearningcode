"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  delay?: number
  formatter?: (value: number) => string
  className?: string
}

export function AnimatedCounter({
  from,
  to,
  duration = 2,
  delay = 0,
  formatter = (value) => value.toString(),
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from)
  const nodeRef = useRef(null)
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1)

      setCount(Math.floor(from + progress * (to - from)))

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    const timeoutId = setTimeout(() => {
      window.requestAnimationFrame(step)
    }, delay * 1000)

    return () => clearTimeout(timeoutId)
  }, [from, to, duration, delay, isInView])

  return (
    <motion.span
      ref={nodeRef}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5, delay }}
    >
      {formatter(count)}
    </motion.span>
  )
}
