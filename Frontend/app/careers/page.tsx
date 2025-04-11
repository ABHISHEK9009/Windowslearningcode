"use client"

import { Badge } from "@/components/ui/badge"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, MapPin, Clock } from "lucide-react"
import { motion } from "framer-motion"

// Mock job listings
const jobListings = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Bangalore, India (Remote)",
    type: "Full-time",
    description:
      "We're looking for a Senior Full Stack Developer to join our engineering team and help build the next generation of our learning platform.",
    responsibilities: [
      "Design, develop, and maintain web applications using React, Node.js, and TypeScript",
      "Collaborate with product managers, designers, and other engineers to deliver high-quality features",
      "Write clean, maintainable, and efficient code",
      "Participate in code reviews and mentor junior developers",
      "Troubleshoot and debug issues in production environments",
    ],
    requirements: [
      "5+ years of experience in full stack development",
      "Strong proficiency in React, Node.js, and TypeScript",
      "Experience with database design and optimization",
      "Familiarity with cloud services (AWS, Azure, or GCP)",
      "Strong problem-solving skills and attention to detail",
    ],
  },
  {
    id: 2,
    title: "UX/UI Designer",
    department: "Design",
    location: "Bangalore, India (Hybrid)",
    type: "Full-time",
    description:
      "We're seeking a talented UX/UI Designer to create intuitive and engaging user experiences for our learning platform.",
    responsibilities: [
      "Create wireframes, prototypes, and high-fidelity designs for web and mobile applications",
      "Conduct user research and usability testing to inform design decisions",
      "Collaborate with product managers and engineers to implement designs",
      "Maintain and evolve our design system",
      "Stay up-to-date with the latest design trends and best practices",
    ],
    requirements: [
      "3+ years of experience in UX/UI design",
      "Proficiency in design tools such as Figma, Sketch, or Adobe XD",
      "Strong portfolio demonstrating your design process and skills",
      "Experience with responsive design and accessibility standards",
      "Excellent communication and collaboration skills",
    ],
  },
  {
    id: 3,
    title: "Product Marketing Manager",
    department: "Marketing",
    location: "Bangalore, India (On-site)",
    type: "Full-time",
    description:
      "We're looking for a Product Marketing Manager to help us tell the story of our learning platform and drive user acquisition.",
    responsibilities: [
      "Develop and execute marketing strategies for our products",
      "Create compelling content for various channels (website, social media, email)",
      "Collaborate with the product team to understand and communicate product features",
      "Analyze marketing metrics and optimize campaigns",
      "Stay up-to-date with industry trends and competitor activities",
    ],
    requirements: [
      "3+ years of experience in product marketing",
      "Strong understanding of digital marketing channels and tactics",
      "Excellent writing and communication skills",
      "Experience with marketing analytics tools",
      "Bachelor's degree in Marketing, Business, or related field",
    ],
  },
  {
    id: 4,
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    description:
      "We're seeking a Customer Success Manager to ensure our users get the most value from our platform and have an exceptional experience.",
    responsibilities: [
      "Onboard new users and provide training on platform features",
      "Proactively identify and address user needs and concerns",
      "Develop and maintain strong relationships with key users",
      "Collaborate with product and engineering teams to advocate for user needs",
      "Track and report on user engagement and satisfaction metrics",
    ],
    requirements: [
      "2+ years of experience in customer success or account management",
      "Strong communication and interpersonal skills",
      "Problem-solving mindset and ability to work independently",
      "Experience with CRM tools and data analysis",
      "Passion for education and technology",
    ],
  },
]

// Company values
const companyValues = [
  {
    title: "Learner-Centered",
    description:
      "We put learners at the center of everything we do, focusing on creating experiences that help them achieve their goals.",
  },
  {
    title: "Continuous Growth",
    description:
      "We believe in lifelong learning and encourage personal and professional development for our team members.",
  },
  {
    title: "Inclusive Excellence",
    description:
      "We strive for excellence while creating an inclusive environment where diverse perspectives are valued.",
  },
  {
    title: "Innovation",
    description:
      "We embrace innovation and are not afraid to challenge the status quo to create better learning experiences.",
  },
  {
    title: "Integrity",
    description: "We act with honesty, transparency, and ethical behavior in all our interactions.",
  },
  {
    title: "Collaboration",
    description: "We believe that the best results come from working together and leveraging our collective strengths.",
  },
]

// Benefits
const benefits = [
  "Competitive salary and equity options",
  "Flexible work arrangements (remote, hybrid, or on-site)",
  "Comprehensive health, dental, and vision insurance",
  "Generous paid time off and parental leave",
  "Learning and development budget",
  "Regular team events and retreats",
  "Home office setup allowance",
  "Wellness programs and mental health support",
]

export default function CareersPage() {
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
          <h1 className="text-3xl font-bold mb-2">Careers at Windows Learning</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Join our team and help transform education through personalized mentorship
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Why Join Us?</h2>
              <p className="mb-4">
                At Windows Learning, we're on a mission to democratize access to personalized education by connecting
                learners with expert mentors. We're building a platform that empowers people to achieve their learning
                goals and advance their careers.
              </p>
              <p className="mb-4">
                We're a diverse team of educators, engineers, designers, and business professionals who are passionate
                about learning and technology. We value creativity, collaboration, and continuous improvement.
              </p>
              <p>
                If you're excited about the future of education and want to make a meaningful impact, we'd love to hear
                from you!
              </p>
            </div>
            <div className="relative">
              <img
                src="/images/team-culture.jpg"
                alt="Team working together"
                className="rounded-lg shadow-md w-full h-auto object-cover"
                style={{ height: "300px" }}
              />
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyValues.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-background border rounded-lg p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Benefits & Perks</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {jobListings.map((job) => (
                <motion.div key={job.id} variants={fadeIn}>
                  <Card className="overflow-hidden">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <CardTitle>{job.title}</CardTitle>
                          <CardDescription>{job.department}</CardDescription>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {job.location}
                          </Badge>
                          <Badge variant="outline" className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {job.type}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{job.description}</p>
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Responsibilities:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {job.responsibilities.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Requirements:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {job.requirements.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/30 border-t">
                      <Button asChild>
                        <Link href={`/careers/${job.id}`}>
                          Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
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
