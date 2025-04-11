"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BecomeMentorPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    expertise: "",
    experience: "",
    hourlyRate: "",
    bio: "",
    agreeToTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, expertise: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      setIsLoginModalOpen(true)
      return
    }

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.expertise ||
      !formData.experience ||
      !formData.hourlyRate ||
      !formData.bio
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Terms and conditions",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Mock API call
    setTimeout(() => {
      toast({
        title: "Application submitted!",
        description: "We'll review your application and get back to you soon.",
      })
      setFormData({
        fullName: "",
        email: "",
        expertise: "",
        experience: "",
        hourlyRate: "",
        bio: "",
        agreeToTerms: false,
      })
      setIsSubmitting(false)
    }, 1500)
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

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Become a Mentor</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Share your expertise, help others grow, and earn income on your own schedule.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Set Your Own Rates</h3>
                  <p className="text-muted-foreground">
                    You decide how much to charge for your expertise and mentorship.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Flexible Schedule</h3>
                  <p className="text-muted-foreground">
                    Choose when you're available to mentor and manage your own calendar.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Global Reach</h3>
                  <p className="text-muted-foreground">
                    Connect with learners from around the world seeking your specific expertise.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mentor Application</CardTitle>
              <CardDescription>Fill out the form below to apply as a mentor on Windows Learning.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium">
                      Full Name *
                    </label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="expertise" className="text-sm font-medium">
                      Primary Expertise *
                    </label>
                    <Select value={formData.expertise} onValueChange={handleSelectChange}>
                      <SelectTrigger id="expertise">
                        <SelectValue placeholder="Select your expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-development">Web Development</SelectItem>
                        <SelectItem value="data-science">Data Science</SelectItem>
                        <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                        <SelectItem value="mobile-development">Mobile Development</SelectItem>
                        <SelectItem value="machine-learning">Machine Learning</SelectItem>
                        <SelectItem value="cloud-computing">Cloud Computing</SelectItem>
                        <SelectItem value="blockchain">Blockchain</SelectItem>
                        <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="experience" className="text-sm font-medium">
                      Years of Experience *
                    </label>
                    <Input
                      id="experience"
                      name="experience"
                      type="number"
                      min="1"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="hourlyRate" className="text-sm font-medium">
                    Hourly Rate (₹) *
                  </label>
                  <Input
                    id="hourlyRate"
                    name="hourlyRate"
                    type="number"
                    min="500"
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="bio" className="text-sm font-medium">
                    Professional Bio *
                  </label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell us about your professional background, expertise, and teaching approach."
                    className="min-h-[150px]"
                    value={formData.bio}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" checked={formData.agreeToTerms} onCheckedChange={handleCheckboxChange} />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the mentor terms and conditions
                  </label>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="border-t py-6 bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 Windows Learning Platform. All rights reserved.
        </div>
      </footer>

      {/* Login Modal for unauthenticated users */}
      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <DialogDescription>You need to sign in to apply as a mentor.</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
