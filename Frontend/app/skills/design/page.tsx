"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function DesignSkillsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Windows Learning</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-6">Design Skills</h1>
        <p className="text-lg mb-6">Explore our design skills and find mentors specializing in these areas.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">UI/UX Design</h2>
            <p className="text-muted-foreground mb-4">
              Learn user interface and experience design principles and tools.
            </p>
            <Button asChild>
              <Link href="/learner/find-mentors?query=UI%2FUX%20Design">Find Mentors</Link>
            </Button>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Graphic Design</h2>
            <p className="text-muted-foreground mb-4">Master visual communication, typography, and branding.</p>
            <Button asChild>
              <Link href="/learner/find-mentors?query=Graphic%20Design">Find Mentors</Link>
            </Button>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Motion Graphics</h2>
            <p className="text-muted-foreground mb-4">Learn animation principles and tools for digital media.</p>
            <Button asChild>
              <Link href="/learner/find-mentors?query=Motion%20Graphics">Find Mentors</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 Windows Learning Platform. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
