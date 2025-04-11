"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"

// Expertise fields
const expertiseFields = [
  { value: "web-dev", label: "Web Development" },
  { value: "data-science", label: "Data Science" },
  { value: "mobile-dev", label: "Mobile Development" },
  { value: "ui-ux", label: "UI/UX Design" },
  { value: "machine-learning", label: "Machine Learning" },
  { value: "cloud", label: "Cloud Computing" },
  { value: "devops", label: "DevOps" },
  { value: "blockchain", label: "Blockchain" },
  { value: "game-dev", label: "Game Development" },
  { value: "cybersecurity", label: "Cybersecurity" },
]

// Subfields based on expertise
const subfields: Record<string, { value: string; label: string }[]> = {
  "web-dev": [
    { value: "frontend", label: "Frontend Development" },
    { value: "backend", label: "Backend Development" },
    { value: "fullstack", label: "Full Stack Development" },
    { value: "react", label: "React" },
    { value: "angular", label: "Angular" },
    { value: "vue", label: "Vue.js" },
    { value: "node", label: "Node.js" },
  ],
  "data-science": [
    { value: "data-analysis", label: "Data Analysis" },
    { value: "data-visualization", label: "Data Visualization" },
    { value: "statistics", label: "Statistics" },
    { value: "python", label: "Python for Data Science" },
    { value: "r", label: "R Programming" },
    { value: "sql", label: "SQL" },
  ],
  "mobile-dev": [
    { value: "android", label: "Android Development" },
    { value: "ios", label: "iOS Development" },
    { value: "react-native", label: "React Native" },
    { value: "flutter", label: "Flutter" },
    { value: "kotlin", label: "Kotlin" },
    { value: "swift", label: "Swift" },
  ],
  "ui-ux": [
    { value: "ui-design", label: "UI Design" },
    { value: "ux-design", label: "UX Design" },
    { value: "user-research", label: "User Research" },
    { value: "figma", label: "Figma" },
    { value: "sketch", label: "Sketch" },
    { value: "adobe-xd", label: "Adobe XD" },
  ],
  "machine-learning": [
    { value: "supervised", label: "Supervised Learning" },
    { value: "unsupervised", label: "Unsupervised Learning" },
    { value: "deep-learning", label: "Deep Learning" },
    { value: "nlp", label: "Natural Language Processing" },
    { value: "computer-vision", label: "Computer Vision" },
    { value: "tensorflow", label: "TensorFlow" },
    { value: "pytorch", label: "PyTorch" },
  ],
}

export default function MentorRegistrationPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    expertise: "",
    subfield: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleExpertiseChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      expertise: value,
      subfield: "", // Reset subfield when expertise changes
    }))
  }

  const handleSubfieldChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subfield: value }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.expertise) {
      newErrors.expertise = "Expertise is required"
    }

    if (!formData.subfield) {
      newErrors.subfield = "Subfield is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Registration successful!",
        description: "Please complete your profile setup.",
      })

      // Redirect to profile setup page
      router.push("/mentor-profile-setup")
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Become a Mentor</h1>
            <p className="text-muted-foreground">Share your expertise and help others grow while earning income</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <CardTitle>Mentor Registration</CardTitle>
              <CardDescription>Create your mentor account to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={errors.password ? "border-destructive" : ""}
                    />
                    {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={errors.confirmPassword ? "border-destructive" : ""}
                    />
                    {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expertise">Area of Expertise</Label>
                    <Select value={formData.expertise} onValueChange={handleExpertiseChange}>
                      <SelectTrigger id="expertise" className={errors.expertise ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select your expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        {expertiseFields.map((field) => (
                          <SelectItem key={field.value} value={field.value}>
                            {field.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.expertise && <p className="text-sm text-destructive">{errors.expertise}</p>}
                  </div>

                  {formData.expertise && (
                    <div className="space-y-2">
                      <Label htmlFor="subfield">Specialization</Label>
                      <Select value={formData.subfield} onValueChange={handleSubfieldChange}>
                        <SelectTrigger id="subfield" className={errors.subfield ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select your specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          {subfields[formData.expertise]?.map((subfield) => (
                            <SelectItem key={subfield.value} value={subfield.value}>
                              {subfield.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.subfield && <p className="text-sm text-destructive">{errors.subfield}</p>}
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/">Cancel</Link>
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
                    Registering...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
