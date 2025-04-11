"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"

export function MentorTermsAgreement({ onAgree }: { onAgree: () => void }) {
  const { toast } = useToast()
  const [agreed, setAgreed] = useState(false)

  const handleAgree = () => {
    if (!agreed) {
      toast({
        title: "Agreement required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      })
      return
    }

    onAgree()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mentor Terms and Conditions</CardTitle>
        <CardDescription>Please read and agree to the following terms to proceed.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <div className="text-sm">
            <p className="mb-2">
              Welcome to the Windows Learning Platform! These terms and conditions ("Terms") govern your participation
              as a mentor on our platform. By agreeing to these Terms, you acknowledge that you have read, understood,
              and agree to be bound by the following:
            </p>

            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Eligibility:</strong> You must be at least 18 years of age and possess the necessary expertise
                and qualifications to provide mentorship services in your chosen field.
              </li>
              <li>
                <strong>Accurate Information:</strong> You agree to provide accurate and up-to-date information about
                your qualifications, experience, and availability.
              </li>
              <li>
                <strong>Professional Conduct:</strong> You agree to conduct yourself professionally and ethically in all
                interactions with learners.
              </li>
              <li>
                <strong>Respectful Communication:</strong> You agree to communicate respectfully and constructively with
                learners, providing guidance and support in a positive and encouraging manner.
              </li>
              <li>
                <strong>Confidentiality:</strong> You agree to maintain the confidentiality of any sensitive information
                shared by learners during mentorship sessions.
              </li>
              <li>
                <strong>Payment Terms:</strong> You agree to the payment terms and commission structure as outlined on
                the platform.
              </li>
              <li>
                <strong>Cancellation Policy:</strong> You agree to adhere to the cancellation policy specified on the
                platform.
              </li>
              <li>
                <strong>Intellectual Property:</strong> You acknowledge that any materials you create or share on the
                platform must not infringe upon the intellectual property rights of others.
              </li>
              <li>
                <strong>Compliance with Laws:</strong> You agree to comply with all applicable laws and regulations.
              </li>
              <li>
                <strong>Termination:</strong> We reserve the right to terminate your participation as a mentor if you
                violate these Terms.
              </li>
            </ol>

            <p className="mt-4">
              By clicking "Agree," you acknowledge that you have read, understood, and agree to be bound by these Mentor
              Terms and Conditions.
            </p>
          </div>
        </ScrollArea>
        <div className="flex items-center space-x-2 mt-4">
          <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
          <Label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the mentor terms and conditions
          </Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleAgree}>
          Agree
        </Button>
      </CardFooter>
    </Card>
  )
}
