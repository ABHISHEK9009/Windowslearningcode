"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Video } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for resources
const articles = [
  {
    id: 1,
    title: "How to Choose the Right Mentor for Your Career Goals",
    description: "Learn the key factors to consider when selecting a mentor to help advance your career.",
    category: "Career Development",
    readTime: "5 min read",
    date: "April 2, 2025",
  },
  {
    id: 2,
    title: "5 Ways to Maximize Your Mentorship Sessions",
    description: "Practical tips to ensure you get the most value from your mentorship sessions.",
    category: "Mentorship",
    readTime: "7 min read",
    date: "March 28, 2025",
  },
  {
    id: 3,
    title: "The Future of Learning: Personalized Mentorship vs. Traditional Education",
    description: "An exploration of how personalized mentorship is changing the landscape of education.",
    category: "Education",
    readTime: "10 min read",
    date: "March 20, 2025",
  },
]

const videos = [
  {
    id: 1,
    title: "Getting Started with Windows Learning",
    description: "A comprehensive guide to navigating the platform and finding your ideal mentor.",
    duration: "12:34",
    date: "April 5, 2025",
  },
  {
    id: 2,
    title: "How to Prepare for Your First Mentorship Session",
    description: "Tips and best practices to make your first mentorship session productive and valuable.",
    duration: "8:45",
    date: "March 30, 2025",
  },
  {
    id: 3,
    title: "Success Stories: How Mentorship Changed My Career",
    description: "Interviews with learners who transformed their careers through mentorship.",
    duration: "15:20",
    date: "March 22, 2025",
  },
]

const guides = [
  {
    id: 1,
    title: "Complete Guide to Web Development in 2025",
    description: "A comprehensive roadmap for learning web development with recommended mentors.",
    pages: 42,
    date: "April 1, 2025",
  },
  {
    id: 2,
    title: "Data Science Career Path",
    description: "Step-by-step guide to building a successful career in data science.",
    pages: 35,
    date: "March 25, 2025",
  },
  {
    id: 3,
    title: "UX Design Fundamentals",
    description: "Essential principles and practices for aspiring UX designers.",
    pages: 28,
    date: "March 18, 2025",
  },
]

export default function ResourcesPage() {
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

        <h1 className="text-3xl font-bold mb-2">Learning Resources</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Explore our collection of articles, videos, and guides to enhance your learning journey.
        </p>

        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
          </TabsList>

          <TabsContent value="articles">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card key={article.id}>
                  <CardHeader>
                    <CardTitle>{article.title}</CardTitle>
                    <CardDescription>{article.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{article.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">{article.readTime}</div>
                    <div className="text-sm text-muted-foreground">{article.date}</div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Card key={video.id}>
                  <CardHeader>
                    <div className="bg-muted aspect-video rounded-md flex items-center justify-center mb-2">
                      <Video className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <CardTitle>{video.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{video.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">{video.duration}</div>
                    <div className="text-sm text-muted-foreground">{video.date}</div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guides">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <Card key={guide.id}>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">PDF Guide</span>
                    </div>
                    <CardTitle>{guide.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{guide.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">{guide.pages} pages</div>
                    <Button size="sm">Download</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t py-6 bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 Windows Learning Platform. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
