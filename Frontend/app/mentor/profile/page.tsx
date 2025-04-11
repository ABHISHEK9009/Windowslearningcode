"use client"

import type React from "react"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export default function MentorProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [profileData, setProfileData] = useState({
    fullName: user?.name || "",
    title: "Full Stack Developer & Web Architect",
    bio: "Senior developer with 8+ years of experience building scalable web applications. I specialize in React, Node.js, and modern JavaScript frameworks.",
    hourlyRate: "1200",
    expertise: ["JavaScript", "React", "Node.js", "Web Development"],
    languages: ["English", "Hindi", "Gujarati"],
    availability: {
      monday: true,
      tuesday: true,
      wednesday: false,
      thursday: true,
      friday: false,
      saturday: true,
      sunday: false,
    },
    education: [{ degree: "B.Tech in Computer Science", institution: "IIT Bombay", year: "2015" }],
    experience: [
      { position: "Senior Frontend Developer", company: "WebSolutions", duration: "2018-Present" },
      { position: "Full Stack Developer", company: "TechStart", duration: "2015-2018" },
    ],
    newSkill: "",
    newLanguage: "",
    newDegree: "",
    newInstitution: "",
    newYear: "",
    newPosition: "",
    newCompany: "",
    newDuration: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (day: string, checked: boolean) => {
    setProfileData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: checked,
      },
    }))
  }

  const handleAddSkill = () => {
    if (profileData.newSkill.trim()) {
      setProfileData((prev) => ({
        ...prev,
        expertise: [...prev.expertise, prev.newSkill.trim()],
        newSkill: "",
      }))
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setProfileData((prev) => ({
      ...prev,
      expertise: prev.expertise.filter((s) => s !== skill),
    }))
  }

  const handleAddLanguage = () => {
    if (profileData.newLanguage.trim()) {
      setProfileData((prev) => ({
        ...prev,
        languages: [...prev.languages, prev.newLanguage.trim()],
        newLanguage: "",
      }))
    }
  }

  const handleRemoveLanguage = (language: string) => {
    setProfileData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l !== language),
    }))
  }

  const handleAddEducation = () => {
    if (profileData.newDegree.trim() && profileData.newInstitution.trim() && profileData.newYear.trim()) {
      setProfileData((prev) => ({
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
    setProfileData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }))
  }

  const handleAddExperience = () => {
    if (profileData.newPosition.trim() && profileData.newCompany.trim() && profileData.newDuration.trim()) {
      setProfileData((prev) => ({
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
    setProfileData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Mock API call
    setTimeout(() => {
      toast({
        title: "Profile updated!",
        description: "Your profile has been successfully updated.",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Profile Editor</h1>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile Preview</CardTitle>
              <CardDescription>How learners will see your profile</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user?.avatar} alt={profileData.fullName} />
                <AvatarFallback>{profileData.fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-center">{profileData.fullName}</h2>
              <p className="text-sm text-muted-foreground text-center mb-4">{profileData.title}</p>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {profileData.expertise.slice(0, 4).map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-center mb-4">{profileData.bio.substring(0, 100)}...</p>
              <div className="text-xl font-bold">₹{profileData.hourlyRate}/hr</div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" name="fullName" value={profileData.fullName} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={profileData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Full Stack Developer"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    className="min-h-[120px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
                  <Input
                    id="hourlyRate"
                    name="hourlyRate"
                    type="number"
                    value={profileData.hourlyRate}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Expertise & Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {profileData.expertise.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <button
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
                    value={profileData.newSkill}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, newSkill: e.target.value }))}
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
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {profileData.languages.map((language) => (
                    <Badge key={language} variant="secondary" className="flex items-center gap-1">
                      {language}
                      <button
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
                    value={profileData.newLanguage}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, newLanguage: e.target.value }))}
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
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="monday"
                    checked={profileData.availability.monday}
                    onCheckedChange={(checked) => handleCheckboxChange("monday", checked as boolean)}
                  />
                  <Label htmlFor="monday">Monday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tuesday"
                    checked={profileData.availability.tuesday}
                    onCheckedChange={(checked) => handleCheckboxChange("tuesday", checked as boolean)}
                  />
                  <Label htmlFor="tuesday">Tuesday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="wednesday"
                    checked={profileData.availability.wednesday}
                    onCheckedChange={(checked) => handleCheckboxChange("wednesday", checked as boolean)}
                  />
                  <Label htmlFor="wednesday">Wednesday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="thursday"
                    checked={profileData.availability.thursday}
                    onCheckedChange={(checked) => handleCheckboxChange("thursday", checked as boolean)}
                  />
                  <Label htmlFor="thursday">Thursday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="friday"
                    checked={profileData.availability.friday}
                    onCheckedChange={(checked) => handleCheckboxChange("friday", checked as boolean)}
                  />
                  <Label htmlFor="friday">Friday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="saturday"
                    checked={profileData.availability.saturday}
                    onCheckedChange={(checked) => handleCheckboxChange("saturday", checked as boolean)}
                  />
                  <Label htmlFor="saturday">Saturday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sunday"
                    checked={profileData.availability.sunday}
                    onCheckedChange={(checked) => handleCheckboxChange("sunday", checked as boolean)}
                  />
                  <Label htmlFor="sunday">Sunday</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileData.education.map((edu, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <h3 className="font-medium">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground">
                        {edu.institution}, {edu.year}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveEducation(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="Degree"
                    value={profileData.newDegree}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, newDegree: e.target.value }))}
                  />
                  <Input
                    placeholder="Institution"
                    value={profileData.newInstitution}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, newInstitution: e.target.value }))}
                  />
                  <Input
                    placeholder="Year"
                    value={profileData.newYear}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, newYear: e.target.value }))}
                  />
                </div>
                <Button type="button" onClick={handleAddEducation}>
                  Add Education
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileData.experience.map((exp, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <h3 className="font-medium">{exp.position}</h3>
                      <p className="text-sm text-muted-foreground">
                        {exp.company}, {exp.duration}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveExperience(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="Position"
                    value={profileData.newPosition}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, newPosition: e.target.value }))}
                  />
                  <Input
                    placeholder="Company"
                    value={profileData.newCompany}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, newCompany: e.target.value }))}
                  />
                  <Input
                    placeholder="Duration (e.g., 2018-Present)"
                    value={profileData.newDuration}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, newDuration: e.target.value }))}
                  />
                </div>
                <Button type="button" onClick={handleAddExperience}>
                  Add Experience
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
