"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface PostRequirementFormProps {
  onSuccess?: () => void
}

// AI-suggested skills based on title input
const suggestSkills = (title: string): string[] => {
  const titleLower = title.toLowerCase()

  if (titleLower.includes("react")) {
    return ["React.js", "JavaScript", "Web Development", "Frontend"]
  } else if (titleLower.includes("python") || titleLower.includes("data")) {
    return ["Python", "Data Science", "Machine Learning", "Statistics"]
  } else if (titleLower.includes("design") || titleLower.includes("ux")) {
    return ["UI Design", "UX Research", "Figma", "User Testing"]
  } else {
    return ["Programming", "Web Development", "Design", "Data Science"]
  }
}

export function PostRequirementForm({ onSuccess }: PostRequirementFormProps) {
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState("")
  const [duration, setDuration] = useState("")
  const [deadline, setDeadline] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Suggested skills based on title
  const suggestedSkills = suggestSkills(title)

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !description || !budget || !duration || !deadline) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (selectedSkills.length === 0) {
      toast({
        title: "Skills required",
        description: "Please select at least one skill.",
        variant: "destructive",
      })
      return
    }

    if (!agreeToTerms) {
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
        title: "Requirement posted!",
        description: "Mentors will start sending proposals soon.",
      })

      // Reset form
      setTitle("")
      setCategory("")
      setDescription("")
      setBudget("")
      setDuration("")
      setDeadline("")
      setSelectedSkills([])
      setAgreeToTerms(false)

      setIsSubmitting(false)

      // Call success callback if provided
      if (onSuccess) {
        onSuccess()
      }
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          placeholder="e.g., Need help with React.js fundamentals"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category *</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
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
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="Describe what you want to learn, your current skill level, and your goals."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="min-h-[120px]"
        />
      </div>

      <div className="space-y-2">
        <Label>Skills Required *</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {suggestedSkills.map((skill) => (
            <Badge
              key={skill}
              variant={selectedSkills.includes(skill) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleSkillToggle(skill)}
            >
              {skill}
            </Badge>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">AI-suggested skills based on your title. Click to select.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="budget">Budget (₹) *</Label>
          <Input
            id="budget"
            type="number"
            placeholder="e.g., 1500"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration *</Label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger id="duration">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-hour">1 hour</SelectItem>
              <SelectItem value="2-hours">2 hours</SelectItem>
              <SelectItem value="3-hours">3 hours</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="deadline">Deadline *</Label>
          <Input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={agreeToTerms}
          onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
        />
        <Label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the terms and conditions
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Posting..." : "Post Requirement"}
      </Button>
    </form>
  )
}
