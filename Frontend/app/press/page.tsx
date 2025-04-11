"use client"

import { Badge } from "@/components/ui/badge"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Calendar, Download, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

// Mock press releases
const pressReleases = [
  {
    id: 1,
    title: "Windows Learning Raises $10M Series A to Expand Personalized Mentorship Platform",
    date: "April 1, 2025",
    excerpt:
      "Funding will be used to enhance the platform's AI-powered matching algorithm and expand into new markets.",
    content:
      "Windows Learning, the leading platform for personalized mentorship, today announced it has raised $10 million in Series A funding led by Accel Partners, with participation from existing investors Sequoia Capital and Y Combinator.",
    link: "/press/series-a-funding",
  },
  {
    id: 2,
    title: "Windows Learning Launches Mobile App for On-the-Go Learning",
    date: "March 15, 2025",
    excerpt:
      "New mobile app allows learners to connect with mentors, attend sessions, and access resources from anywhere.",
    content:
      "Windows Learning today announced the launch of its mobile app for iOS and Android, enabling learners to access personalized mentorship and learning resources on the go.",
    link: "/press/mobile-app-launch",
  },
  {
    id: 3,
    title: "Windows Learning Partners with Top Universities to Offer Specialized Mentorship Programs",
    date: "February 28, 2025",
    excerpt:
      "Partnership will bring expert faculty mentors from leading universities to the Windows Learning platform.",
    content:
      "Windows Learning today announced partnerships with five top universities to offer specialized mentorship programs in high-demand fields such as artificial intelligence, data science, and cybersecurity.",
    link: "/press/university-partnerships",
  },
  {
    id: 4,
    title: "Windows Learning Reaches 100,000 Active Learners Milestone",
    date: "January 15, 2025",
    excerpt:
      "Platform celebrates significant growth milestone as demand for personalized mentorship continues to rise.",
    content:
      "Windows Learning today announced that it has reached 100,000 active learners on its platform, marking a significant milestone in the company's growth journey.",
    link: "/press/100k-learners",
  },
]

// Media coverage
const mediaCoverage = [
  {
    id: 1,
    publication: "TechCrunch",
    title: "Windows Learning's Approach to Personalized Education Could Disrupt Traditional Learning",
    date: "March 20, 2025",
    excerpt: "The startup's AI-powered matching algorithm and focus on 1-on-1 mentorship is showing promising results.",
    link: "https://techcrunch.com/example",
    logo: "/images/techcrunch.png",
  },
  {
    id: 2,
    publication: "Forbes",
    title: "How Windows Learning is Transforming Professional Development",
    date: "February 10, 2025",
    excerpt: "The platform's focus on personalized mentorship is helping professionals accelerate their career growth.",
    link: "https://forbes.com/example",
    logo: "/images/forbes.png",
  },
  {
    id: 3,
    publication: "Wired",
    title: "The Future of Learning is Personalized: Inside Windows Learning's Platform",
    date: "January 5, 2025",
    excerpt: "An in-depth look at how Windows Learning is using technology to match learners with the perfect mentors.",
    link: "https://wired.com/example",
    logo: "/images/wired.png",
  },
]

// Press kit resources
const pressKitResources = [
  {
    title: "Company Fact Sheet",
    description: "Key information about Windows Learning, including founding date, mission, and key metrics.",
    fileType: "PDF",
    fileSize: "1.2 MB",
    downloadLink: "/downloads/windows-learning-fact-sheet.pdf",
  },
  {
    title: "Brand Assets",
    description: "Logos, color palette, typography, and other brand assets for media use.",
    fileType: "ZIP",
    fileSize: "5.8 MB",
    downloadLink: "/downloads/windows-learning-brand-assets.zip",
  },
  {
    title: "Executive Headshots",
    description: "High-resolution photos of Windows Learning's leadership team.",
    fileType: "ZIP",
    fileSize: "8.3 MB",
    downloadLink: "/downloads/windows-learning-executive-headshots.zip",
  },
  {
    title: "Platform Screenshots",
    description: "High-resolution screenshots of the Windows Learning platform.",
    fileType: "ZIP",
    fileSize: "12.5 MB",
    downloadLink: "/downloads/windows-learning-screenshots.zip",
  },
]

export default function PressPage() {
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
            <h1 className="text-3xl font-bold mb-2">Press & Media</h1>
            <p className="text-lg text-muted-foreground">
              Latest news, press releases, and media resources for Windows Learning
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Press Releases</h2>
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {pressReleases.map((release, index) => (
                <motion.div key={release.id} variants={fadeIn}>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{release.date}</span>
                      </div>
                      <CardTitle>{release.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{release.excerpt}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild>
                        <Link href={release.link}>
                          Read Full Release <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Media Coverage</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mediaCoverage.map((coverage) => (
                <Card key={coverage.id}>
                  <CardHeader className="pb-2">
                    <div className="h-8 mb-2">
                      <img
                        src={coverage.logo || "/placeholder.svg"}
                        alt={coverage.publication}
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    <CardTitle className="text-lg">{coverage.title}</CardTitle>
                    <CardDescription>{coverage.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{coverage.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" asChild>
                      <a href={coverage.link} target="_blank" rel="noopener noreferrer">
                        Read Article <ExternalLink className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Press Kit</h2>
            <Card>
              <CardHeader>
                <CardTitle>Media Resources</CardTitle>
                <CardDescription>Download official assets and information about Windows Learning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pressKitResources.map((resource, index) => (
                    <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{resource.fileType}</Badge>
                          <span className="text-xs text-muted-foreground">{resource.fileSize}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={resource.downloadLink} download>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Media Inquiries</h2>
            <Card>
              <CardContent className="p-6">
                <p className="mb-4">
                  For press inquiries, interview requests, or additional information, please contact our media relations
                  team:
                </p>
                <div className="space-y-2">
                  <p>
                    <strong>Email:</strong> press@windowslearning.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +91 9876543210
                  </p>
                </div>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
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
