"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function AboutPage() {
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

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About Windows Learning</h1>

          <div className="prose prose-lg dark:prose-invert">
            <p className="mb-4">
              Windows Learning is a premier mentor-driven education platform connecting learners with expert mentors in
              technology, business, and creative fields.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
            <p className="mb-4">
              Our mission is to democratize access to personalized education by connecting learners directly with
              industry experts who can provide tailored guidance and mentorship.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Our Story</h2>
            <p className="mb-4">
              Founded in 2023, Windows Learning was born from the recognition that traditional education often lacks the
              personalized attention and real-world expertise that learners need to succeed in today's rapidly evolving
              industries.
            </p>
            <p className="mb-4">
              Our founders, experienced professionals in technology and education, saw the gap between academic learning
              and industry requirements. They created Windows Learning to bridge this gap by facilitating direct
              connections between learners and industry experts.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Excellence:</strong> We are committed to providing the highest quality mentorship experience.
              </li>
              <li>
                <strong>Accessibility:</strong> We believe quality education should be accessible to everyone.
              </li>
              <li>
                <strong>Personalization:</strong> We recognize that every learner has unique needs and goals.
              </li>
              <li>
                <strong>Innovation:</strong> We continuously evolve our platform to enhance the learning experience.
              </li>
              <li>
                <strong>Community:</strong> We foster a supportive community of mentors and learners.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Join Us</h2>
            <p className="mb-4">
              Whether you're looking to learn new skills, advance your career, or share your expertise as a mentor,
              Windows Learning provides the platform to help you achieve your goals.
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Button asChild className="mr-4">
              <Link href="/learner/find-mentors">Find a Mentor</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/become-mentor">Become a Mentor</Link>
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
