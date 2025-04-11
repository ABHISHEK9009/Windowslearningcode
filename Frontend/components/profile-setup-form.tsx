"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { X, Plus, Github, Linkedin } from "lucide-react"

interface ProfileSetupFormProps {
  onComplete: (profileData: any) => void
}

export function ProfileSetupForm({ onComplete }: ProfileSetupFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    bio: "",
    skills: [] as string[],
    hourlyRate: "",
    currency: "₹",
    newSkill: "",
    githubUrl: "",
    linkedinUrl: "",
    education: [] as { degree: string; institution: string; year: string }[],
    experience: [] as { position: string; company: string; duration: string }[],
    newDegree: "",
    newInstitution: "",
    newYear: "",
    newPosition: "",
    newCompany: "",
    newDuration: "",
    availability: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleAvailabilityChange = (day: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: checked,
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (formData.bio.length < 100) {
      toast({
        title: "Bio too short",
        description: "Please provide a bio of at least 100 characters.",
        variant: "destructive",
      })
      return
    }

    if (formData.skills.length < 1) {
      toast({
        title: "Skills required",
        description: "Please add at least one skill.",
        variant: "destructive",
      })
      return
    }

    if (!formData.hourlyRate) {
      toast({
        title: "Hourly rate required",
        description: "Please set your hourly rate.",
        variant: "destructive",
      })
      return
    }

    // Check if at least one day is selected for availability
    const hasAvailability = Object.values(formData.availability).some((value) => value)
    if (!hasAvailability) {
      toast({
        title: "Availability required",
        description: "Please select at least one day of availability.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Process form data
    const profileData = {
      bio: formData.bio,
      skills: formData.skills,
      hourlyRate: Number.parseInt(formData.hourlyRate),
      currency: formData.currency,
      githubUrl: formData.githubUrl,
      linkedinUrl: formData.linkedinUrl,
      education: formData.education,
      experience: formData.experience,
      availability: formData.availability,
    }

    // Mock API call to verify GitHub/LinkedIn
    setTimeout(() => {
      // Auto-verify skills based on GitHub/LinkedIn
      if (formData.githubUrl || formData.linkedinUrl) {
        toast({
          title: "Skills Verified",
          description: "Your skills have been verified from your GitHub and LinkedIn profiles.",
        })
      }

      setIsSubmitting(false)
      onComplete(profileData)
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="bio">
          Professional Bio <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          placeholder="Tell us about your professional background, expertise, and teaching approach."
          className="min-h-[150px]"
          required
        />
        <p className="text-xs text-muted-foreground">{formData.bio.length}/100 characters minimum</p>
      </div>

      <div className="space-y-2">
        <Label>
          Skills <span className="text-destructive">*</span>
        </Label>
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
          <Input placeholder="Add a skill" name="newSkill" value={formData.newSkill} onChange={handleInputChange} />
          <Button type="button" onClick={handleAddSkill}>
            Add
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="hourlyRate">
            Hourly Rate <span className="text-destructive">*</span>
          </Label>
          <div className="flex">
            <Select
              value={formData.currency}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, currency: value }))}
            >
              <SelectTrigger className="w-20">
                <SelectValue placeholder="₹" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="₹">₹</SelectItem>
                <SelectItem value="$">$</SelectItem>
                <SelectItem value="€">€</SelectItem>
                <SelectItem value="£">£</SelectItem>
              </SelectContent>
            </Select>
            <Input
              id="hourlyRate"
              name="hourlyRate"
              type="number"
              value={formData.hourlyRate}
              onChange={handleInputChange}
              className="flex-1"
              min="1"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="githubUrl" className="flex items-center gap-2">
            <Github className="h-4 w-4" /> GitHub URL
          </Label>
          <Input
            id="githubUrl"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleInputChange}
            placeholder="https://github.com/yourusername"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedinUrl" className="flex items-center gap-2">
            <Linkedin className="h-4 w-4" /> LinkedIn URL
          </Label>
          <Input
            id="linkedinUrl"
            name="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={handleInputChange}
            placeholder="https://linkedin.com/in/yourusername"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>
          Availability <span className="text-destructive">*</span>
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="monday"
              checked={formData.availability.monday}
              onCheckedChange={(checked) => handleAvailabilityChange("monday", checked as boolean)}
            />
            <Label htmlFor="monday">Monday</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="tuesday"
              checked={formData.availability.tuesday}
              onCheckedChange={(checked) => handleAvailabilityChange("tuesday", checked as boolean)}
            />
            <Label htmlFor="tuesday">Tuesday</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="wednesday"
              checked={formData.availability.wednesday}
              onCheckedChange={(checked) => handleAvailabilityChange("wednesday", checked as boolean)}
            />
            <Label htmlFor="wednesday">Wednesday</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="thursday"
              checked={formData.availability.thursday}
              onCheckedChange={(checked) => handleAvailabilityChange("thursday", checked as boolean)}
            />
            <Label htmlFor="thursday">Thursday</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="friday"
              checked={formData.availability.friday}
              onCheckedChange={(checked) => handleAvailabilityChange("friday", checked as boolean)}
            />
            <Label htmlFor="friday">Friday</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="saturday"
              checked={formData.availability.saturday}
              onCheckedChange={(checked) => handleAvailabilityChange("saturday", checked as boolean)}
            />
            <Label htmlFor="saturday">Saturday</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sunday"
              checked={formData.availability.sunday}
              onCheckedChange={(checked) => handleAvailabilityChange("sunday", checked as boolean)}
            />
            <Label htmlFor="sunday">Sunday</Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
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
            <Input placeholder="Degree" name="newDegree" value={formData.newDegree} onChange={handleInputChange} />
            <Input
              placeholder="Institution"
              name="newInstitution"
              value={formData.newInstitution}
              onChange={handleInputChange}
            />
            <Input placeholder="Year" name="newYear" value={formData.newYear} onChange={handleInputChange} />
          </div>
          <Button type="button" variant="outline" onClick={handleAddEducation}>
            <Plus className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        </div>
      </div>

      <div className="space-y-2">
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
            <Input placeholder="Company" name="newCompany" value={formData.newCompany} onChange={handleInputChange} />
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

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  )
}
