"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, BookOpen, ChevronRight, MessageSquare, Search, Send, Video } from "lucide-react"

export default function HelpSupportPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "We'll get back to you as soon as possible.",
      })

      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      setIsSubmitting(false)
    }, 1000)
  }

  // Popular help topics
  const popularTopics = [
    {
      title: "Getting Started",
      icon: <BookOpen className="h-5 w-5" />,
      description: "Learn the basics of using the platform",
      link: "/help-support/getting-started",
    },
    {
      title: "Booking Sessions",
      icon: <Calendar className="h-5 w-5" />,
      description: "How to book and manage your sessions",
      link: "/help-support/booking-sessions",
    },
    {
      title: "Payment & Billing",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Information about payments and billing",
      link: "/help-support/payment-billing",
    },
    {
      title: "Technical Issues",
      icon: <Settings className="h-5 w-5" />,
      description: "Troubleshooting common technical problems",
      link: "/help-support/technical-issues",
    },
  ]

  // FAQ items
  const faqItems = [
    {
      question: "How do I book a session with a mentor?",
      answer:
        "To book a session with a mentor, navigate to the mentor's profile, select an available time slot from their calendar, choose the session duration, and complete the payment process. Once confirmed, you'll receive a confirmation email with the session details.",
    },
    {
      question: "What happens if I need to cancel a session?",
      answer:
        "You can cancel a session up to 24 hours before the scheduled time for a full refund. Cancellations made less than 24 hours in advance are subject to a 50% cancellation fee. To cancel, go to 'My Sessions' in your dashboard and select the session you wish to cancel.",
    },
    {
      question: "How do I become a mentor on the platform?",
      answer:
        "To become a mentor, click on 'Become a Mentor' in the navigation menu, complete the registration form, create your profile, and take the expertise verification test. Once your profile is reviewed and approved, you can start accepting session requests from learners.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept credit/debit cards (Visa, Mastercard, American Express), UPI payments, and net banking. All payments are processed securely through our payment gateway.",
    },
    {
      question: "How do I access my session recordings?",
      answer:
        "Session recordings are automatically saved and available in your dashboard under 'My Sessions' > 'Past Sessions'. Click on the session you want to review and select 'View Recording'. Recordings are available for 30 days after the session.",
    },
  ]

  return (
    <DashboardShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Help & Support</h1>
      </div>

      {/* Search Section */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="max-w-2xl mx-auto text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">How can we help you?</h2>
            <p className="text-muted-foreground">Search our knowledge base or browse popular topics below</p>
          </div>

          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help articles..."
              className="pl-10 py-6 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="absolute right-1 top-1/2 transform -translate-y-1/2">Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* Popular Topics */}
      <h2 className="text-2xl font-bold mb-4">Popular Topics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {popularTopics.map((topic, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <Link href={topic.link}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {topic.icon}
                  </div>
                  <h3 className="font-bold mb-2">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{topic.description}</p>
                  <div className="flex items-center text-primary">
                    <span className="text-sm">Learn more</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* FAQ and Contact Tabs */}
      <Tabs defaultValue="faq" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
          <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
        </TabsList>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about our platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/faq">
                  View All FAQs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get in touch with our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" name="name" value={contactForm.name} onChange={handleContactFormChange} required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleContactFormChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactFormChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={contactForm.message}
                    onChange={handleContactFormChange}
                    required
                  />
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>Learn how to use our platform with step-by-step video guides</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-background/80">
                        <Video className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">Getting Started Guide</h3>
                    <p className="text-sm text-muted-foreground">Learn the basics of navigating the platform</p>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-background/80">
                        <Video className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">How to Book a Session</h3>
                    <p className="text-sm text-muted-foreground">Step-by-step guide to booking your first session</p>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-background/80">
                        <Video className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">Mentor Profile Setup</h3>
                    <p className="text-sm text-muted-foreground">How to create an effective mentor profile</p>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-background/80">
                        <Video className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">Payment and Billing</h3>
                    <p className="text-sm text-muted-foreground">Understanding the payment process</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/video-tutorials">
                  View All Tutorials
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Live Support */}
      <Card>
        <CardContent className="pt-6 pb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Need immediate assistance?</h3>
                <p className="text-muted-foreground">Our support team is available 24/7</p>
              </div>
            </div>
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              Start Live Chat
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

// Import these components to avoid errors
function Calendar(props: any) {
  return <div {...props} />
}

function CreditCard(props: any) {
  return <div {...props} />
}

function Settings(props: any) {
  return <div {...props} />
}
