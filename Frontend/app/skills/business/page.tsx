"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function BusinessSkillsPage() {
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

        <h1 className="text-3xl font-bold mb-6">Business Skills</h1>
        <p className="text-lg mb-6">Explore our business skills and find mentors specializing in these areas.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Marketing</h2>
            <p className="text-muted-foreground mb-4">Learn digital marketing, SEO, and social media strategies.</p>
            <Button asChild>
              <Link href="/learner/find-mentors?query=Marketing">Find Mentors</Link>
            </Button>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Finance</h2>
            <p className="text-muted-foreground mb-4">Master financial planning, investment, and accounting skills.</p>
            <Button asChild>
              <Link href="/learner/find-mentors?query=Finance">Find Mentors</Link>
            </Button>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Entrepreneurship</h2>
            <p className="text-muted-foreground mb-4">
              Learn startup strategies, business planning, and growth tactics.
            </p>
            <Button asChild>
              <Link href="/learner/find-mentors?query=Entrepreneurship">Find Mentors</Link>
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
