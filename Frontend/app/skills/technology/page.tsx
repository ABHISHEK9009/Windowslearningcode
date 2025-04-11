"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TechnologySkillsPage() {
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

        <h1 className="text-3xl font-bold mb-6">Technology Skills</h1>
        <p className="text-lg mb-6">Explore our technology skills and find mentors specializing in these areas.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Web Development</h2>
            <p className="text-muted-foreground mb-4">Learn frontend and backend development from expert mentors.</p>
            <Button asChild>
              <Link href="/learner/find-mentors?query=Web%20Development">Find Mentors</Link>
            </Button>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Mobile Development</h2>
            <p className="text-muted-foreground mb-4">Master iOS, Android, and cross-platform app development.</p>
            <Button asChild>
              <Link href="/learner/find-mentors?query=Mobile%20Development">Find Mentors</Link>
            </Button>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Data Science</h2>
            <p className="text-muted-foreground mb-4">Learn data analysis, machine learning, and AI techniques.</p>
            <Button asChild>
              <Link href="/learner/find-mentors?query=Data%20Science">Find Mentors</Link>
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
