"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, ThumbsDown, ThumbsUp } from "lucide-react"

// FAQ categories and questions
const faqCategories = [
  {
    id: "getting-started",
    name: "Getting Started",
    description: "Basic information about using the platform",
    faqs: [
      {
        question: "How do I create an account?",
        answer:
          "To create an account, click on the 'Sign Up' button in the top right corner of the homepage. You can register using your email address or sign up with your Google or Facebook account. Follow the prompts to complete your profile setup.",
      },
      {
        question: "What's the difference between a learner and a mentor account?",
        answer:
          "A learner account allows you to book sessions with mentors, access learning resources, and track your progress. A mentor account includes all learner features plus the ability to offer mentorship services, set your availability, and earn income by conducting sessions.",
      },
      {
        question: "How do I navigate the dashboard?",
        answer:
          "The dashboard is your central hub for all platform activities. The sidebar menu provides access to different sections like Sessions, Messages, Wallet, and Settings. The main area displays your upcoming sessions, learning progress, and personalized recommendations.",
      },
      {
        question: "Can I switch between learner and mentor roles?",
        answer:
          "Yes, you can have both roles on the same account. Go to Settings > Account and select 'Become a Mentor' to add mentor capabilities to your existing learner account. You'll need to complete the mentor onboarding process including profile creation and expertise verification.",
      },
    ],
  },
  {
    id: "sessions",
    name: "Sessions & Booking",
    description: "Information about scheduling and attending sessions",
    faqs: [
      {
        question: "How do I book a session with a mentor?",
        answer:
          "To book a session, navigate to a mentor's profile, check their availability calendar, select a suitable time slot, choose the session duration, and complete the payment process. Once confirmed, you'll receive a booking confirmation via email with session details.",
      },
      {
        question: "What happens if I need to reschedule or cancel a session?",
        answer:
          "You can reschedule or cancel a session up to 24 hours before the scheduled time without any penalty. For cancellations made less than 24 hours in advance, a 50% cancellation fee applies. To reschedule or cancel, go to 'My Sessions' in your dashboard and select the appropriate option for the session.",
      },
      {
        question: "How do I join a session?",
        answer:
          "You'll receive an email with a session link 15 minutes before the scheduled time. You can also join directly from your dashboard by going to 'My Sessions' and clicking on the 'Join Session' button when it becomes active (5 minutes before the session starts).",
      },
      {
        question: "Are sessions recorded?",
        answer:
          "Yes, all sessions are automatically recorded for quality and reference purposes. Recordings are available to both the learner and mentor for 30 days after the session. You can access recordings from the 'Past Sessions' section in your dashboard.",
      },
    ],
  },
  {
    id: "payments",
    name: "Payments & Billing",
    description: "Information about payments, refunds, and billing",
    faqs: [
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept credit/debit cards (Visa, Mastercard, American Express), UPI payments, and net banking. All payments are processed securely through our payment gateway.",
      },
      {
        question: "How does the wallet system work?",
        answer:
          "The wallet system allows you to add funds to your account balance, which you can use to book sessions. This eliminates the need to enter payment details for each booking. You can add funds to your wallet from the 'Wallet' section in your dashboard.",
      },
      {
        question: "What is the refund policy?",
        answer:
          "For session cancellations made at least 24 hours in advance, you'll receive a full refund. Cancellations made less than 24 hours before the session incur a 50% cancellation fee. If a mentor cancels a session, you'll receive a full refund regardless of the timing.",
      },
      {
        question: "How do mentors receive payments?",
        answer:
          "Mentors receive payments for completed sessions on a bi-weekly basis. Funds are transferred to the mentor's registered bank account after deducting the platform fee (15%). Mentors can view their earnings and payment history in the 'Earnings' section of their dashboard.",
      },
      {
        question: "What are the charges for video content?",
        answer:
          "Mentors can upload intro videos that are free for all users to view. Premium video content is available for ₹21 per video. This one-time payment gives you permanent access to the video. Mentors receive 85% of the video purchase price.",
      },
    ],
  },
  {
    id: "technical",
    name: "Technical Issues",
    description: "Help with common technical problems",
    faqs: [
      {
        question: "What are the system requirements for video sessions?",
        answer:
          "For the best experience, we recommend using Chrome, Firefox, or Edge browsers (latest versions). You'll need a stable internet connection (minimum 1 Mbps upload/download), a webcam, and a microphone. Sessions work on both desktop and mobile devices.",
      },
      {
        question: "I'm having audio/video issues during a session. What should I do?",
        answer:
          "First, check your device permissions to ensure your browser has access to your camera and microphone. Try refreshing the page or using a different browser. If issues persist, try restarting your device. For ongoing problems, you can switch to audio-only mode or reschedule the session.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Click on 'Forgot Password' on the login page. Enter your registered email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password. The reset link is valid for 24 hours. If you don't receive the email, check your spam folder or contact support.",
      },
      {
        question: "Can I use the platform on mobile devices?",
        answer:
          "Yes, our platform is fully responsive and works on smartphones and tablets. You can access all features through your mobile browser. We also offer native mobile apps for iOS and Android for an optimized experience.",
      },
      {
        question: "What should I do if the session link isn't working?",
        answer:
          "If your session link isn't working, first try refreshing the page or opening the link in a different browser. Make sure you're logged into your account. If the problem persists, contact your mentor through the messaging system or reach out to our support team for immediate assistance.",
      },
    ],
  },
  {
    id: "mentors",
    name: "For Mentors",
    description: "Information specifically for mentors",
    faqs: [
      {
        question: "How do I become a mentor?",
        answer:
          "To become a mentor, click on 'Become a Mentor' in the navigation menu, complete the registration form, create your profile with your expertise areas and hourly rate, and take the expertise verification test. Your profile will be reviewed, and once approved, you can start accepting session requests.",
      },
      {
        question: "What is the expertise verification test?",
        answer:
          "The expertise verification test is a knowledge assessment in your declared area of expertise. It includes multiple-choice questions and written responses to evaluate your proficiency. You need to score at least 80% to pass. You can skip the test, but your profile will be marked as 'Unverified' until you complete it.",
      },
      {
        question: "How do I set my availability?",
        answer:
          "Go to your mentor dashboard and select 'Manage Schedule'. You can set recurring availability for each day of the week or block specific dates and times. Changes to your availability will not affect already booked sessions.",
      },
      {
        question: "What percentage does the platform take from my earnings?",
        answer:
          "The platform fee is 15% of your session earnings. For example, if your hourly rate is ₹1000, you'll receive ₹850 for each hour of mentoring. For video content, the platform fee is also 15%, so you'll receive ₹17.85 for each ₹21 video purchase.",
      },
      {
        question: "How do I upload video content?",
        answer:
          "Go to your mentor profile and select 'Manage Videos'. You can upload a free intro video that all users can view. For premium content, select 'Add Premium Video', upload your video file, add a title and description, and set a thumbnail. All premium videos are priced at ₹21 for learners to access.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("getting-started")
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, boolean>>({})

  // Filter FAQs based on search query
  const filteredFAQs = searchQuery
    ? faqCategories.flatMap((category) =>
        category.faqs
          .filter(
            (faq) =>
              faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((faq) => ({ ...faq, category: category.id })),
      )
    : []

  const handleFeedback = (questionId: string, isHelpful: boolean) => {
    setFeedbackGiven((prev) => ({ ...prev, [questionId]: true }))

    // In a real app, you would send this feedback to your backend
    console.log(`Feedback for question ${questionId}: ${isHelpful ? "Helpful" : "Not helpful"}`)
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        <Button variant="outline" asChild>
          <Link href="/help-support">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Help Center
          </Link>
        </Button>
      </div>

      {/* Search Section */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search FAQs..."
              className="pl-10 py-6 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchQuery && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              Found {filteredFAQs.length} results for "{searchQuery}"
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredFAQs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq, index) => {
                  const questionId = `search-${index}`
                  return (
                    <AccordionItem key={questionId} value={questionId}>
                      <AccordionTrigger>
                        <div className="flex items-center">
                          <span>{faq.question}</span>
                          <Badge variant="outline" className="ml-2">
                            {faqCategories.find((c) => c.id === faq.category)?.name}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>{faq.answer}</p>

                          {!feedbackGiven[questionId] && (
                            <div className="flex items-center gap-4 pt-2">
                              <span className="text-sm text-muted-foreground">Was this helpful?</span>
                              <Button variant="outline" size="sm" onClick={() => handleFeedback(questionId, true)}>
                                <ThumbsUp className="h-4 w-4 mr-2" />
                                Yes
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleFeedback(questionId, false)}>
                                <ThumbsDown className="h-4 w-4 mr-2" />
                                No
                              </Button>
                            </div>
                          )}

                          {feedbackGiven[questionId] && (
                            <p className="text-sm text-muted-foreground pt-2">Thank you for your feedback!</p>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No results found for "{searchQuery}"</p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* FAQ Categories */}
      {!searchQuery && (
        <>
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
            <TabsList className="mb-6 flex flex-wrap h-auto">
              {faqCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {faqCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, index) => {
                        const questionId = `${category.id}-${index}`
                        return (
                          <AccordionItem key={questionId} value={questionId}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-4">
                                <p>{faq.answer}</p>

                                {!feedbackGiven[questionId] && (
                                  <div className="flex items-center gap-4 pt-2">
                                    <span className="text-sm text-muted-foreground">Was this helpful?</span>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleFeedback(questionId, true)}
                                    >
                                      <ThumbsUp className="h-4 w-4 mr-2" />
                                      Yes
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleFeedback(questionId, false)}
                                    >
                                      <ThumbsDown className="h-4 w-4 mr-2" />
                                      No
                                    </Button>
                                  </div>
                                )}

                                {feedbackGiven[questionId] && (
                                  <p className="text-sm text-muted-foreground pt-2">Thank you for your feedback!</p>
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        )
                      })}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          {/* Still Need Help */}
          <Card>
            <CardContent className="pt-6 pb-6">
              <div className="text-center">
                <h3 className="text-lg font-bold mb-2">Still have questions?</h3>
                <p className="text-muted-foreground mb-4">
                  If you couldn't find the answer you were looking for, our support team is here to help.
                </p>
                <Button asChild>
                  <Link href="/help-support">Contact Support</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </DashboardShell>
  )
}
