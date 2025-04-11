"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface ImageHoverZoomProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export function ImageHoverZoom({ src, alt, width, height, className = "" }: ImageHoverZoomProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`overflow-hidden rounded-lg ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.4 }}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover"
        />
      </motion.div>
    </motion.div>
  )
}
