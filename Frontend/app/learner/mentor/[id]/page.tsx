"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MessageSquare, Star } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

// Mock data for mentors
const mentors = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    title: "Data Science Expert & ML Engineer",
    expertise: ["Python", "Machine Learning", "Data Science", "Statistics"],
    bio: "Ph.D. in Computer Science with 10+ years of experience in data science and machine learning. I've worked with Fortune 500 companies and startups to implement data-driven solutions.",
    rating: 4.9,
    reviewCount: 124,
    hourlyRate: 1500,
    currency: "₹",
    availability: ["Mon", "Wed", "Fri"],
    languages: ["English", "Mandarin"],
    avatar: "/placeholder.svg?height=80&width=80&text=SC",
    education: [
      { degree: "Ph.D. in Computer Science", institution: "Stanford University", year: "2015" },
      { degree: "M.S. in Computer Science", institution: "MIT", year: "2011" },
    ],
    experience: [
      { position: "Lead Data Scientist", company: "Tech Innovations Inc.", duration: "2015-Present" },
      { position: "Machine Learning Engineer", company: "DataCorp", duration: "2011-2015" },
    ],
  },
  {
    id: "2",
    name: "Raj Patel",
    title: "Full Stack Developer & Web Architect",
    expertise: ["JavaScript", "React", "Node.js", "Web Development"],
    bio: "Senior developer with 8+ years of experience building scalable web applications. I specialize in React, Node.js, and modern JavaScript frameworks.",
    rating: 4.8,
    reviewCount: 98,
    hourlyRate: 1200,
    currency: "₹",
    availability: ["Tue", "Thu", "Sat"],
    languages: ["English", "Hindi", "Gujarati"],
    avatar: "/placeholder.svg?height=80&width=80&text=RP",
    education: [{ degree: "B.Tech in Computer Science", institution: "IIT Bombay", year: "2015" }],
    experience: [
      { position: "Senior Frontend Developer", company: "WebSolutions", duration: "2018-Present" },
      { position: "Full Stack Developer", company: "TechStart", duration: "2015-2018" },
    ],
  },
]

// Mock reviews
const reviews = [
  {
    id: 1,
    learner: "Priya Sharma",
    avatar: "/placeholder.svg?height=40&width=40&text=PS",
    rating: 5,
    date: "March 28, 2025",
    comment:
      "Dr. Chen is an exceptional mentor. She explained complex machine learning concepts in a way that was easy to understand and provided practical examples that helped me apply the knowledge to my own projects.",
  },
  {
    id: 2,
    learner: "Rahul Gupta",
    avatar: "/placeholder.svg?height=40&width=40&text=RG",
    rating: 5,
    date: "March 15, 2025",
    comment:
      "I've had several sessions with Dr. Chen and each one has been incredibly valuable. She's patient, knowledgeable, and genuinely cares about her students' progress.",
  },
  {
    id: 3,
    learner: "Ananya Patel",
    avatar: "/placeholder.svg?height=40&width=40&text=AP",
    rating: 4,
    date: "February 20, 2025",
    comment:
      "Great mentor who provides practical insights and real-world examples. I appreciate how she tailors her teaching to my specific learning style and goals.",
  },
]

export default function MentorProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const mentorId = params.id as string

  // Find the mentor by ID
  const mentor = mentors.find((m) => m.id === mentorId)

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [bookingDate, setBookingDate] = useState("")
  const [bookingTime, setBookingTime] = useState("")
  const [bookingDuration, setBookingDuration] = useState("60")
  const [bookingTopic, setBookingTopic] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!mentor) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h1 className="text-2xl font-bold mb-4">Mentor not found</h1>
          <p className="text-muted-foreground mb-6">The mentor you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link href="/learner/find-mentors">Browse All Mentors</Link>
          </Button>
        </div>
      </DashboardShell>
    )
  }

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault()

    if (!bookingDate || !bookingTime || !bookingTopic) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Mock API call
    setTimeout(() => {
      toast({
        title: "Session booked!",
        description: `Your session with ${mentor.name} has been scheduled.`,
      })
      setBookingDate("")
      setBookingTime("")
      setBookingDuration("60")
      setBookingTopic("")
      setIsSubmitting(false)
      setIsBookingModalOpen(false)

      // Redirect to sessions page
      router.push("/learner/sessions")
    }, 1500)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!message) {
      toast({
        title: "Empty message",
        description: "Please enter a message.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Mock API call
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: `Your message has been sent to ${mentor.name}.`,
      })
      setMessage("")
      setIsSubmitting(false)
      setIsMessageModalOpen(false)

      // Redirect to messages page
      router.push("/learner/messages")
    }, 1500)
  }

  return (
    <DashboardShell>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:w-1/3">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={mentor.avatar} alt={mentor.name} />
                    <AvatarFallback>
                      {mentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mt-4 text-center">
                    <h1 className="text-2xl font-bold">{mentor.name}</h1>
                    <p className="text-muted-foreground">{mentor.title}</p>
                    <div className="flex items-center justify-center mt-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(mentor.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : i < mentor.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm ml-2">
                        {mentor.rating} ({mentor.reviewCount} reviews)
                      </span>
                    </div>
                    <div className="mt-4 text-xl font-bold">
                      {mentor.currency}
                      {mentor.hourlyRate}/hr
                    </div>
                    <div className="mt-6 flex flex-col gap-3 w-full">
                      <Button onClick={() => setIsBookingModalOpen(true)}>Book Session</Button>
                      <Button variant="outline" onClick={() => setIsMessageModalOpen(true)}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-4">About</h2>
                  <p className="mb-6">{mentor.bio}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h3 className="text-sm font-bold mb-2">Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {mentor.expertise.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold mb-2">Languages</h3>
                      <p>{mentor.languages.join(", ")}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-bold mb-2">Availability</h3>
                    <div className="flex flex-wrap gap-2">
                      {mentor.availability.map((day) => (
                        <Badge key={day} variant="secondary">
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="reviews" className="mt-6">
            <TabsList>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
            <TabsContent value="reviews" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Student Reviews</CardTitle>
                  <CardDescription>See what other learners are saying about {mentor.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6 last:border-0 last:pb-0">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={review.avatar} alt={review.learner} />
                            <AvatarFallback>{review.learner[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{review.learner}</h3>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <div className="flex mt-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-sm">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="experience" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mentor.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-primary pl-4 pb-6 last:pb-0 relative">
                        <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                        <h3 className="font-bold">{exp.position}</h3>
                        <p className="text-muted-foreground">{exp.company}</p>
                        <p className="text-sm text-muted-foreground">{exp.duration}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="education" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mentor.education.map((edu, index) => (
                      <div key={index} className="border-l-2 border-primary pl-4 pb-6 last:pb-0 relative">
                        <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                        <h3 className="font-bold">{edu.degree}</h3>
                        <p className="text-muted-foreground">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Book a Session</CardTitle>
              <CardDescription>Schedule a 1-on-1 session with {mentor.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>Available on {mentor.availability.join(", ")}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>Sessions from 30 to 120 minutes</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => setIsBookingModalOpen(true)}>
                Book Now
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Similar Mentors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentors
                  .filter((m) => m.id !== mentorId)
                  .map((m) => (
                    <div key={m.id} className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={m.avatar} alt={m.name} />
                        <AvatarFallback>{m.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate">{m.name}</h3>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-xs font-medium">{m.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{m.expertise.slice(0, 2).join(", ")}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-medium">
                            {m.currency}
                            {m.hourlyRate}/hr
                          </span>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/learner/mentor/${m.id}`}>View</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book a Session with {mentor.name}</DialogTitle>
            <DialogDescription>Select a date, time, and duration for your session.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBookSession} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <Input type="time" value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration</label>
              <Select value={bookingDuration} onValueChange={setBookingDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Topic</label>
              <Input
                placeholder="What would you like to discuss?"
                value={bookingTopic}
                onChange={(e) => setBookingTopic(e.target.value)}
                required
              />
            </div>
            <DialogFooter>
              <div className="flex items-center justify-between w-full">
                <div className="text-sm">
                  <span className="font-medium">Total:</span> {mentor.currency}
                  {((mentor.hourlyRate * Number.parseInt(bookingDuration)) / 60).toFixed(0)}
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Booking..." : "Confirm Booking"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Message Modal */}
      <Dialog open={isMessageModalOpen} onOpenChange={setIsMessageModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message {mentor.name}</DialogTitle>
            <DialogDescription>Send a message to discuss your learning goals.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={mentor.avatar} alt={mentor.name} />
                <AvatarFallback>
                  {mentor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{mentor.name}</h4>
                <p className="text-sm text-muted-foreground">{mentor.title}</p>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                className="min-h-[120px]"
                placeholder={`Hi ${mentor.name}, I'm interested in learning more about...`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
