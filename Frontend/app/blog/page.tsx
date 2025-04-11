"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, Calendar, Search, User } from "lucide-react"
import { motion } from "framer-motion"

// Mock blog posts
const blogPosts = [
  {
    id: 1,
    title: "How to Choose the Right Mentor for Your Career Goals",
    excerpt:
      "Finding the right mentor can be a game-changer for your career. Learn how to identify and connect with mentors who can help you achieve your professional goals.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    author: "Priya Sharma",
    authorRole: "Learning Experience Designer",
    date: "April 5, 2025",
    category: "Career Development",
    tags: ["Mentorship", "Career Growth", "Professional Development"],
    image: "/images/blog/choose-mentor.jpg",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "5 Ways to Maximize Your Mentorship Sessions",
    excerpt:
      "Make the most of your mentorship sessions with these practical tips and strategies. Learn how to prepare, engage, and follow up effectively.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    author: "Raj Patel",
    authorRole: "Senior Mentor",
    date: "March 28, 2025",
    category: "Mentorship",
    tags: ["Mentorship", "Productivity", "Learning Strategies"],
    image: "/images/blog/maximize-sessions.jpg",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "The Future of Learning: Personalized Mentorship vs. Traditional Education",
    excerpt:
      "Explore how personalized mentorship is changing the landscape of education and how it compares to traditional learning methods.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    author: "Dr. Sarah Chen",
    authorRole: "Education Researcher",
    date: "March 20, 2025",
    category: "Education",
    tags: ["Future of Learning", "EdTech", "Personalized Learning"],
    image: "/images/blog/future-learning.jpg",
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "How to Become a Mentor and Share Your Expertise",
    excerpt:
      "Interested in becoming a mentor? Learn about the benefits of mentoring and how to effectively share your knowledge and experience with others.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    author: "Alex Johnson",
    authorRole: "Senior Mentor",
    date: "March 15, 2025",
    category: "Mentorship",
    tags: ["Become a Mentor", "Knowledge Sharing", "Teaching Skills"],
    image: "/images/blog/become-mentor.jpg",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "The Impact of AI on Learning and Skill Development",
    excerpt:
      "Discover how artificial intelligence is transforming learning experiences and skill development, and what it means for mentors and learners.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    author: "Maria Rodriguez",
    authorRole: "AI Learning Specialist",
    date: "March 10, 2025",
    category: "Technology",
    tags: ["AI", "Future of Learning", "Technology"],
    image: "/images/blog/ai-learning.jpg",
    readTime: "9 min read",
  },
  {
    id: 6,
    title: "Building a Learning Routine That Sticks",
    excerpt:
      "Create a sustainable learning routine that helps you make consistent progress toward your goals, even with a busy schedule.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    author: "Vikram Singh",
    authorRole: "Learning Coach",
    date: "March 5, 2025",
    category: "Productivity",
    tags: ["Learning Habits", "Productivity", "Time Management"],
    image: "/images/blog/learning-routine.jpg",
    readTime: "6 min read",
  },
]

// Categories
const categories = ["All", "Mentorship", "Career Development", "Education", "Technology", "Productivity"]

// Popular tags
const popularTags = [
  "Mentorship",
  "Career Growth",
  "Learning Strategies",
  "Future of Learning",
  "EdTech",
  "Productivity",
  "AI",
  "Technology",
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    filterPosts(searchQuery, activeCategory)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    filterPosts(searchQuery, category)
  }

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag)
    filterPosts(tag, activeCategory)
  }

  const filterPosts = (query: string, category: string) => {
    let filtered = blogPosts

    // Filter by search query
    if (query) {
      const lowercaseQuery = query.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(lowercaseQuery) ||
          post.excerpt.toLowerCase().includes(lowercaseQuery) ||
          post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
      )
    }

    // Filter by category
    if (category !== "All") {
      filtered = filtered.filter((post) => post.category === category)
    }

    setFilteredPosts(filtered)
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

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

        <motion.div className="max-w-5xl mx-auto" initial="hidden" animate="visible" variants={fadeIn}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Windows Learning Blog</h1>
            <p className="text-lg text-muted-foreground">Insights, tips, and resources for mentors and learners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button type="submit" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                    Search
                  </Button>
                </div>
              </form>

              <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="mb-6">
                <TabsList className="flex flex-wrap h-auto">
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <motion.div
                className="space-y-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <motion.div key={post.id} variants={fadeIn}>
                      <Card className="overflow-hidden">
                        <div className="md:flex">
                          <div className="md:w-1/3">
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              className="w-full h-full object-cover"
                              style={{ height: "100%", minHeight: "200px" }}
                            />
                          </div>
                          <div className="md:w-2/3">
                            <CardHeader>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge>{post.category}</Badge>
                                <span className="text-sm text-muted-foreground">{post.readTime}</span>
                              </div>
                              <CardTitle className="text-xl">{post.title}</CardTitle>
                              <CardDescription className="flex items-center gap-2 mt-2">
                                <User className="h-4 w-4" />
                                {post.author} | <Calendar className="h-4 w-4" /> {post.date}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-muted-foreground">{post.excerpt}</p>
                            </CardContent>
                            <CardFooter>
                              <Button variant="outline" asChild>
                                <Link href={`/blog/${post.id}`}>
                                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                              </Button>
                            </CardFooter>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">No articles found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("")
                        setActiveCategory("All")
                        setFilteredPosts(blogPosts)
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </motion.div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Featured Article</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <img
                    src="/images/blog/featured-article.jpg"
                    alt="Featured Article"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold mb-2">The Power of Peer Learning in Professional Development</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Discover how peer learning can accelerate your professional growth and complement traditional
                      mentorship.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/blog/featured">Read Article</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subscribe to Our Newsletter</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get the latest articles, resources, and updates delivered to your inbox.
                  </p>
                  <form className="space-y-4">
                    <Input placeholder="Your email address" type="email" required />
                    <Button className="w-full">Subscribe</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="border-t py-6 bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 Windows Learning Platform. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
