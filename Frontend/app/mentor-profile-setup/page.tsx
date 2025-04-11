"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Plus, Upload, X } from "lucide-react"

export default function MentorProfileSetupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, updateUser } = useAuth()

  const [activeTab, setActiveTab] = useState("bio")
  const [progress, setProgress] = useState(25)

  const [formData, setFormData] = useState({
    bio: "",
    skills: [] as string[],
    newSkill: "",
    hourlyRate: "",
    availability: {
      monday: [] as string[],
      tuesday: [] as string[],
      wednesday: [] as string[],
      thursday: [] as string[],
      friday: [] as string[],
      saturday: [] as string[],
      sunday: [] as string[],
    },
    education: [] as { degree: string; institution: string; year: string }[],
    experience: [] as { position: string; company: string; duration: string }[],
    newDegree: "",
    newInstitution: "",
    newYear: "",
    newPosition: "",
    newCompany: "",
    newDuration: "",
    languages: [] as string[],
    newLanguage: "",
    introVideoUrl: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddSkill = () => {
    if (formData.newSkill.trim() && !formData.skills.includes(formData.newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: "",
      }))
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleAddLanguage = () => {
    if (formData.newLanguage.trim() && !formData.languages.includes(formData.newLanguage.trim())) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, formData.newLanguage.trim()],
        newLanguage: "",
      }))
    }
  }

  const handleRemoveLanguage = (language: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l !== language),
    }))
  }

  const handleAddEducation = () => {
    if (formData.newDegree.trim() && formData.newInstitution.trim() && formData.newYear.trim()) {
      setFormData((prev) => ({
        ...prev,
        education: [
          ...prev.education,
          {
            degree: prev.newDegree.trim(),
            institution: prev.newInstitution.trim(),
            year: prev.newYear.trim(),
          },
        ],
        newDegree: "",
        newInstitution: "",
        newYear: "",
      }))
    }
  }

  const handleRemoveEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }))
  }

  const handleAddExperience = () => {
    if (formData.newPosition.trim() && formData.newCompany.trim() && formData.newDuration.trim()) {
      setFormData((prev) => ({
        ...prev,
        experience: [
          ...prev.experience,
          {
            position: prev.newPosition.trim(),
            company: prev.newCompany.trim(),
            duration: prev.newDuration.trim(),
          },
        ],
        newPosition: "",
        newCompany: "",
        newDuration: "",
      }))
    }
  }

  const handleRemoveExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }))
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)

    // Update progress based on tab
    switch (value) {
      case "bio":
        setProgress(25)
        break
      case "expertise":
        setProgress(50)
        break
      case "availability":
        setProgress(75)
        break
      case "pricing":
        setProgress(100)
        break
      default:
        setProgress(25)
    }
  }

  const handleTimeSlotToggle = (day: keyof typeof formData.availability, time: string) => {
    setFormData((prev) => {
      const currentSlots = prev.availability[day]
      const newSlots = currentSlots.includes(time) ? currentSlots.filter((t) => t !== time) : [...currentSlots, time]

      return {
        ...prev,
        availability: {
          ...prev.availability,
          [day]: newSlots,
        },
      }
    })
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideoFile(file)

      // Create a preview URL for the video
      const url = URL.createObjectURL(file)
      setVideoPreviewUrl(url)

      // In a real app, you would upload the video to a server
      // For now, we'll just simulate it
      setFormData((prev) => ({
        ...prev,
        introVideoUrl: url,
      }))
    }
  }

  const handleSubmit = async () => {
    // Validate form data
    if (!formData.bio || formData.bio.length < 100) {
      toast({
        title: "Bio too short",
        description: "Please provide a bio of at least 100 characters.",
        variant: "destructive",
      })
      setActiveTab("bio")
      return
    }

    if (formData.skills.length < 3) {
      toast({
        title: "More skills needed",
        description: "Please add at least 3 skills to your profile.",
        variant: "destructive",
      })
      setActiveTab("expertise")
      return
    }

    if (!formData.hourlyRate) {
      toast({
        title: "Hourly rate required",
        description: "Please set your hourly rate.",
        variant: "destructive",
      })
      setActiveTab("pricing")
      return
    }

    // Check if at least one day has availability
    const hasAvailability = Object.values(formData.availability).some((slots) => slots.length > 0)
    if (!hasAvailability) {
      toast({
        title: "Availability required",
        description: "Please select at least one time slot when you're available.",
        variant: "destructive",
      })
      setActiveTab("availability")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update user profile
      updateUser({
        hourlyRate: Number.parseInt(formData.hourlyRate),
        skills: formData.skills,
        profileCompletion: 85,
        introVideoUrl: formData.introVideoUrl || undefined,
      })

      toast({
        title: "Profile saved!",
        description: "Your mentor profile has been created successfully.",
      })

      // Redirect to mentor dashboard
      router.push("/mentor/dashboard")
    } catch (error) {
      toast({
        title: "Error saving profile",
        description: "There was an error saving your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Generate time slots for availability selection
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12
    const amPm = i < 12 ? "AM" : "PM"
    return `${hour}:00 ${amPm}`
  })

  // Suggested skills based on expertise
  const suggestedSkills = [
    "JavaScript",
    "React",
    "Node.js",
    "TypeScript",
    "HTML/CSS",
    "Python",
    "Data Science",
    "Machine Learning",
    "SQL",
    "Data Visualization",
    "UI Design",
    "UX Research",
    "Figma",
    "User Testing",
    "Wireframing",
    "Mobile Development",
    "iOS",
    "Android",
    "React Native",
    "Flutter",
  ]

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
            <h1 className="text-3xl font-bold mb-2">Complete Your Mentor Profile</h1>
            <p className="text-muted-foreground mb-6">Tell us more about yourself and your expertise</p>
            <Progress value={progress} className="h-2 max-w-md mx-auto" />
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="bio">Bio</TabsTrigger>
              <TabsTrigger value="expertise">Expertise</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
            </TabsList>

            <TabsContent value="bio" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Tell learners about yourself and your background</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about your professional background, expertise, and teaching approach."
                      className="min-h-[150px]"
                    />
                    <p className="text-xs text-muted-foreground">{formData.bio.length}/100 characters (minimum 100)</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label>Languages You Speak</Label>
                        <div className="flex flex-wrap gap-2 mt-2 mb-2">
                          {formData.languages.map((language) => (
                            <Badge key={language} className="flex items-center gap-1">
                              {language}
                              <button
                                type="button"
                                onClick={() => handleRemoveLanguage(language)}
                                className="ml-1 rounded-full hover:bg-destructive/20"
                              >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Remove {language}</span>
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a language"
                            name="newLanguage"
                            value={formData.newLanguage}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault()
                                handleAddLanguage()
                              }
                            }}
                          />
                          <Button type="button" onClick={handleAddLanguage}>
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label>Introduction Video</Label>
                        <div className="mt-2">
                          {videoPreviewUrl ? (
                            <div className="aspect-video bg-muted rounded-md overflow-hidden">
                              <video src={videoPreviewUrl} controls className="w-full h-full" />
                            </div>
                          ) : (
                            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                              <p className="text-muted-foreground">No video uploaded</p>
                            </div>
                          )}

                          <div className="mt-2">
                            <Label htmlFor="video-upload" className="cursor-pointer">
                              <div className="flex items-center justify-center p-2 border-2 border-dashed rounded-md hover:border-primary">
                                <Upload className="h-4 w-4 mr-2" />
                                <span>{videoPreviewUrl ? "Change Video" : "Upload Video"}</span>
                              </div>
                              <Input
                                id="video-upload"
                                type="file"
                                accept="video/*"
                                className="hidden"
                                onChange={handleVideoUpload}
                              />
                            </Label>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Upload a short video introducing yourself to potential learners
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href="/">Cancel</Link>
                  </Button>
                  <Button onClick={() => handleTabChange("expertise")}>
                    Next: Expertise
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="expertise" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Experience</CardTitle>
                  <CardDescription>Add your skills, education, and work experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Skills & Expertise</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.skills.map((skill) => (
                        <Badge key={skill} className="flex items-center gap-1">
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-1 rounded-full hover:bg-destructive/20"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {skill}</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill"
                        name="newSkill"
                        value={formData.newSkill}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddSkill()
                          }
                        }}
                      />
                      <Button type="button" onClick={handleAddSkill}>
                        Add
                      </Button>
                    </div>

                    <div className="mt-2">
                      <p className="text-sm font-medium mb-2">Suggested skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedSkills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                            onClick={() => {
                              if (!formData.skills.includes(skill)) {
                                setFormData((prev) => ({
                                  ...prev,
                                  skills: [...prev.skills, skill],
                                }))
                              }
                            }}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Education</Label>
                    <div className="space-y-4">
                      {formData.education.map((edu, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                          <div>
                            <h3 className="font-medium">{edu.degree}</h3>
                            <p className="text-sm text-muted-foreground">
                              {edu.institution}, {edu.year}
                            </p>
                          </div>
                          <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveEducation(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                          placeholder="Degree"
                          name="newDegree"
                          value={formData.newDegree}
                          onChange={handleInputChange}
                        />
                        <Input
                          placeholder="Institution"
                          name="newInstitution"
                          value={formData.newInstitution}
                          onChange={handleInputChange}
                        />
                        <Input
                          placeholder="Year"
                          name="newYear"
                          value={formData.newYear}
                          onChange={handleInputChange}
                        />
                      </div>
                      <Button type="button" variant="outline" onClick={handleAddEducation}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Education
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Experience</Label>
                    <div className="space-y-4">
                      {formData.experience.map((exp, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                          <div>
                            <h3 className="font-medium">{exp.position}</h3>
                            <p className="text-sm text-muted-foreground">
                              {exp.company}, {exp.duration}
                            </p>
                          </div>
                          <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveExperience(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                          placeholder="Position"
                          name="newPosition"
                          value={formData.newPosition}
                          onChange={handleInputChange}
                        />
                        <Input
                          placeholder="Company"
                          name="newCompany"
                          value={formData.newCompany}
                          onChange={handleInputChange}
                        />
                        <Input
                          placeholder="Duration (e.g., 2018-Present)"
                          name="newDuration"
                          value={formData.newDuration}
                          onChange={handleInputChange}
                        />
                      </div>
                      <Button type="button" variant="outline" onClick={handleAddExperience}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Experience
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleTabChange("bio")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back: Bio
                  </Button>
                  <Button onClick={() => handleTabChange("availability")}>
                    Next: Availability
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="availability" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                  <CardDescription>Set your weekly availability for mentoring sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const).map(
                      (day) => (
                        <div key={day} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="capitalize">{day}</Label>
                            <span className="text-sm text-muted-foreground">
                              {formData.availability[day].length} time slots selected
                            </span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                            {timeSlots.map((time) => {
                              const isSelected = formData.availability[day].includes(time)
                              return (
                                <Button
                                  key={`${day}-${time}`}
                                  type="button"
                                  variant={isSelected ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => handleTimeSlotToggle(day, time)}
                                  className="flex items-center"
                                >
                                  <Clock className="h-3 w-3 mr-1" />
                                  {time}
                                </Button>
                              )
                            })}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleTabChange("expertise")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back: Expertise
                  </Button>
                  <Button onClick={() => handleTabChange("pricing")}>
                    Next: Pricing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                  <CardDescription>Set your hourly rate and payment preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
                    <div className="flex items-center">
                      <span className="bg-muted px-3 py-2 border border-r-0 rounded-l-md">₹</span>
                      <Input
                        id="hourlyRate"
                        name="hourlyRate"
                        type="number"
                        value={formData.hourlyRate}
                        onChange={handleInputChange}
                        placeholder="e.g., 1500"
                        className="rounded-l-none"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Set a competitive rate based on your expertise and experience. The platform average for your
                      expertise area is ₹1,200-₹1,800 per hour.
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Platform Fees</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Windows Learning charges a 15% platform fee on all session earnings. For example, if your hourly
                      rate is ₹1,500, you'll receive ₹1,275 per hour.
                    </p>

                    {formData.hourlyRate && (
                      <div className="bg-background p-3 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <span>Your hourly rate:</span>
                          <span className="font-medium">₹{formData.hourlyRate}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span>Platform fee (15%):</span>
                          <span className="text-destructive">-₹{Math.round(Number(formData.hourlyRate) * 0.15)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t">
                          <span className="font-medium">You receive:</span>
                          <span className="font-bold">₹{Math.round(Number(formData.hourlyRate) * 0.85)}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Payment Schedule</h3>
                    <p className="text-sm text-muted-foreground">
                      Payments are processed bi-weekly. Funds will be transferred to your registered bank account after
                      deducting the platform fee.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleTabChange("availability")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back: Availability
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
                        Saving...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Complete Profile
                      </span>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
