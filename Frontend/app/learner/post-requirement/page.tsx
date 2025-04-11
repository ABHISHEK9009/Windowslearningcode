"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"

export default function PostRequirementPage() {
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState("")
  const [duration, setDuration] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !category || !description || !budget || !duration) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
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
      setTitle("")
      setCategory("")
      setDescription("")
      setBudget("")
      setDuration("")
      setAgreeToTerms(false)
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <DashboardShell>
      <div className="flex items-center mb-6">
        <Button variant="ghost" asChild className="mr-4">
          <Link href="/learner/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Post a Learning Requirement</h1>
      </div>

      <div className="max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Learning Requirement Details</CardTitle>
            <CardDescription>
              Describe what you want to learn and get personalized proposals from qualified mentors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title *
                </label>
                <Input
                  id="title"
                  placeholder="e.g., Need help with React.js fundamentals"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Skill/Category *
                </label>
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
                <label htmlFor="description" className="text-sm font-medium">
                  Description *
                </label>
                <Textarea
                  id="description"
                  placeholder="Describe what you want to learn, your current skill level, and your goals."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="min-h-[150px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="budget" className="text-sm font-medium">
                    Budget (₹) *
                  </label>
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
                  <label htmlFor="duration" className="text-sm font-medium">
                    Duration *
                  </label>
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
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the terms and conditions
                </label>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post Requirement"}
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li className="text-sm">
                  <span className="font-medium">Post your requirement</span> - Describe what you want to learn, your
                  budget, and timeline.
                </li>
                <li className="text-sm">
                  <span className="font-medium">Receive proposals</span> - Qualified mentors will send personalized
                  proposals.
                </li>
                <li className="text-sm">
                  <span className="font-medium">Review and select</span> - Compare proposals and choose the best mentor
                  for your needs.
                </li>
                <li className="text-sm">
                  <span className="font-medium">Start learning</span> - Schedule sessions and begin your personalized
                  learning journey.
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
