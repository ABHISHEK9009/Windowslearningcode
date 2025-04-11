"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AnimatedText } from "@/components/animated-text"

interface HeroSectionProps {
  title: string
  description: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  image?: ReactNode
  className?: string
}

export function HeroSection({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  image,
  className = "",
}: HeroSectionProps) {
  return (
    <section className={`py-12 md:py-24 ${className}`}>
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <AnimatedText
              text={title}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-[600px] text-muted-foreground md:text-xl"
            >
              {description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" asChild>
                <Link href={primaryButtonLink}>{primaryButtonText}</Link>
              </Button>
              {secondaryButtonText && secondaryButtonLink && (
                <Button variant="outline" size="lg" asChild>
                  <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
                </Button>
              )}
            </motion.div>
          </div>
          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center"
            >
              {image}
            </motion.div>
          )}
        </div

\
Let's create a components/layout-grid.tsx component for visual consistency:
