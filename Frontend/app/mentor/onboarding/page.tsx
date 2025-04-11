"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { SkillTestComponent } from "@/components/skill-test"
import { ProfileSetupForm } from "@/components/profile-setup-form"
import { MentorTermsAgreement } from "@/components/mentor-terms-agreement"
import { CheckCircle } from "lucide-react"

const steps = [
  { id: "skill-test", title: "Skill Test" },
  { id: "profile-setup", title: "Profile Setup" },
  { id: "terms-agreement", title: "Terms Agreement" },
]

export default function MentorOnboardingPage() {
  const { user, updateUser } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [testPassed, setTestPassed] = useState(false)
  const [profileCompleted, setProfileCompleted] = useState(false)
  const [termsAgreed, setTermsAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if not a mentor
  useEffect(() => {
    if (user && user.role !== "mentor") {
      router.push("/")
    }
  }, [user, router])

  const handleSkillTestComplete = (passed: boolean, score: number) => {
    setTestPassed(passed)
    if (passed) {
      toast({
        title: "Skill Test Passed!",
        description: `You scored ${score}%. You can now set up your profile.`,
      })
      setCurrentStep(1)
    } else {
      toast({
        title: "Skill Test Failed",
        description: `You scored ${score}%. You need at least 80% to pass.`,
        variant: "destructive",
      })
    }
  }

  const handleProfileComplete = (profileData: any) => {
    setProfileCompleted(true)
    updateUser({
      ...profileData,
      verified: false,
    })
    toast({
      title: "Profile Saved",
      description: "Your profile has been saved successfully.",
    })
    setCurrentStep(2)
  }

  const handleTermsAgree = () => {
    setTermsAgreed(true)
    setIsSubmitting(true)

    // Mock API call to complete onboarding
    setTimeout(() => {
      updateUser({
        verified: true,
      })

      toast({
        title: "Onboarding Complete!",
        description: "Welcome to Windows Learning as a mentor.",
      })

      setIsSubmitting(false)
      router.push("/mentor/dashboard")
    }, 1500)
  }

  const currentStepId = steps[currentStep].id

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Mentor Onboarding</CardTitle>
              <CardDescription>Complete these steps to start mentoring on Windows Learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  {steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`flex items-center ${index <= currentStep ? "text-primary" : "text-muted-foreground"}`}
                    >
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 
                          ${
                            index < currentStep
                              ? "bg-primary text-primary-foreground"
                              : index === currentStep
                                ? "border-2 border-primary"
                                : "border-2 border-muted-foreground"
                          }`}
                      >
                        {index < currentStep ? <CheckCircle className="h-5 w-5" /> : <span>{index + 1}</span>}
                      </div>
                      <span className="hidden sm:inline">{step.title}</span>
                    </div>
                  ))}
                </div>
                <Progress value={(currentStep / (steps.length - 1)) * 100} className="h-2" />
              </div>

              {currentStepId === "skill-test" && <SkillTestComponent onComplete={handleSkillTestComplete} />}

              {currentStepId === "profile-setup" && <ProfileSetupForm onComplete={handleProfileComplete} />}

              {currentStepId === "terms-agreement" && <MentorTermsAgreement onAgree={handleTermsAgree} />}
            </CardContent>
            <CardFooter className="flex justify-between">
              {currentStep > 0 && (
                <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} disabled={isSubmitting}>
                  Back
                </Button>
              )}
              {currentStep < steps.length - 1 && (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={
                    (currentStepId === "skill-test" && !testPassed) ||
                    (currentStepId === "profile-setup" && !profileCompleted) ||
                    isSubmitting
                  }
                  className="ml-auto"
                >
                  Continue
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
