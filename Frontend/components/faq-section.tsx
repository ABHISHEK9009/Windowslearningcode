"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  description?: string
  faqs: FAQItem[]
  className?: string
}

export function FAQSection({
  title = "Frequently Asked Questions",
  description = "Find answers to common questions",
  faqs,
  className = "",
}: FAQSectionProps) {
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, boolean>>({})

  const handleFeedback = (questionId: string, isHelpful: boolean) => {
    setFeedbackGiven((prev) => ({ ...prev, [questionId]: true }))

    // In a real app, you would send this feedback to your backend
    console.log(`Feedback for question ${questionId}: ${isHelpful ? "Helpful" : "Not helpful"}`)
  }

  return (
    <div className={className}>
      {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
      {description && <p className="text-muted-foreground mb-6">{description}</p>}

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => {
          const questionId = `faq-${index}`
          return (
            <AccordionItem key={questionId} value={questionId}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
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
    </div>
  )
}
