"use client"

import type React from "react"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Calendar, Filter, Search } from "lucide-react"

// Mock data for learner requests
const learnerRequests = [
  {
    id: 1,
    title: "Need help with React.js fundamentals",
    description:
      "I'm a beginner in React and need help understanding components, state, props, and hooks. I have some experience with HTML, CSS, and basic JavaScript.",
    learner: {
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=40&width=40&text=PS",
    },
    budget: 1500,
    skills: ["React", "JavaScript", "Web Development"],
    postedDate: "2025-04-03",
    deadline: "2025-04-10",
    status: "open",
  },
  {
    id: 2,
    title: "Data visualization with Python",
    description:
      "I need guidance on creating effective data visualizations using Python libraries like matplotlib, seaborn, and plotly. I have intermediate Python skills but am new to data visualization.",
    learner: {
      name: "Rahul Gupta",
      avatar: "/placeholder.svg?height=40&width=40&text=RG",
    },
    budget: 1800,
    skills: ["Python", "Data Science", "Visualization"],
    postedDate: "2025-04-02",
    deadline: "2025-04-12",
    status: "open",
  },
  {
    id: 3,
    title: "UX Research Methods",
    description:
      "I want to learn about different UX research methods including interviews, surveys, and usability testing. I'm a graphic designer looking to transition into UX design.",
    learner: {
      name: "Ananya Patel",
      avatar: "/placeholder.svg?height=40&width=40&text=AP",
    },
    budget: 1300,
    skills: ["UX Design", "User Research", "Usability Testing"],
    postedDate: "2025-04-01",
    deadline: "2025-04-15",
    status: "open",
  },
  {
    id: 4,
    title: "Mobile App Development with Flutter",
    description:
      "I need help building a cross-platform mobile app using Flutter. I have experience with React but am new to Flutter and Dart.",
    learner: {
      name: "Vikram Singh",
      avatar: "/placeholder.svg?height=40&width=40&text=VS",
    },
    budget: 2000,
    skills: ["Flutter", "Dart", "Mobile Development"],
    postedDate: "2025-03-30",
    deadline: "2025-04-20",
    status: "open",
  },
]

// Mock data for proposals
const proposals = [
  {
    id: 1,
    request: {
      id: 5,
      title: "Advanced JavaScript Concepts",
      learner: {
        name: "Neha Kapoor",
        avatar: "/placeholder.svg?height=40&width=40&text=NK",
      },
      budget: 1700,
      skills: ["JavaScript", "ES6", "Async/Await"],
      postedDate: "2025-03-28",
      deadline: "2025-04-05",
    },
    proposalText:
      "I can help you master advanced JavaScript concepts including closures, prototypes, and async programming. We'll work through practical examples and build a small project together.",
    proposedRate: 1500,
    proposedSessions: 3,
    status: "pending",
    submittedDate: "2025-03-29",
  },
  {
    id: 2,
    request: {
      id: 6,
      title: "Database Design and SQL",
      learner: {
        name: "Arjun Mehta",
        avatar: "/placeholder.svg?height=40&width=40&text=AM",
      },
      budget: 1600,
      skills: ["SQL", "Database Design", "PostgreSQL"],
      postedDate: "2025-03-25",
      deadline: "2025-04-08",
    },
    proposalText:
      "I can guide you through database design principles and SQL query optimization. We'll cover normalization, indexing, and performance tuning with practical exercises.",
    proposedRate: 1400,
    proposedSessions: 4,
    status: "accepted",
    submittedDate: "2025-03-26",
  },
]

export default function LearnerRequestsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<(typeof learnerRequests)[0] | null>(null)
  const [proposalData, setProposalData] = useState({
    proposalText: "",
    proposedRate: "",
    proposedSessions: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get all unique skills from requests
  const allSkills = Array.from(new Set(learnerRequests.flatMap((request) => request.skills))).sort()

  // Filter requests based on search query and selected skills
  const filteredRequests = learnerRequests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.learner.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSkills = selectedSkills.length === 0 || selectedSkills.some((skill) => request.skills.includes(skill))

    return matchesSearch && matchesSkills
  })

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const handleOpenProposalModal = (request: (typeof learnerRequests)[0]) => {
    setSelectedRequest(request)
    setProposalData({
      proposalText: "",
      proposedRate: request.budget.toString(),
      proposedSessions: "3",
    })
    setIsProposalModalOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProposalData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault()

    if (!proposalData.proposalText || !proposalData.proposedRate || !proposalData.proposedSessions) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Mock API call
    setTimeout(() => {
      toast({
        title: "Proposal submitted!",
        description: "Your proposal has been sent to the learner.",
      })
      setIsSubmitting(false)
      setIsProposalModalOpen(false)
    }, 1500)
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Learner Requests</h1>
      </div>

      <Tabs defaultValue="browse">
        <TabsList className="mb-6">
          <TabsTrigger value="browse">Browse Requests</TabsTrigger>
          <TabsTrigger value="proposals">My Proposals</TabsTrigger>
        </TabsList>

        <TabsContent value="browse">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search requests..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Filter by Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {allSkills.map((skill) => (
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
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-3">
              {filteredRequests.length > 0 ? (
                <div className="space-y-6">
                  {filteredRequests.map((request) => (
                    <Card key={request.id}>
                      <CardHeader>
                        <div className="flex justify-between">
                          <CardTitle>{request.title}</CardTitle>
                          <Badge>₹{request.budget}</Badge>
                        </div>
                        <CardDescription>
                          Posted by {request.learner.name} on {new Date(request.postedDate).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">{request.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {request.skills.map((skill) => (
                            <Badge key={skill} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          Deadline: {new Date(request.deadline).toLocaleDateString()}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={request.learner.avatar} alt={request.learner.name} />
                            <AvatarFallback>{request.learner.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{request.learner.name}</span>
                        </div>
                        <Button onClick={() => handleOpenProposalModal(request)}>Submit Proposal</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Filter className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No matching requests found</h3>
                    <p className="text-muted-foreground text-center">
                      Try adjusting your search or filters to find learner requests that match your expertise.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="proposals">
          <div className="space-y-6">
            {proposals.map((proposal) => (
              <Card key={proposal.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{proposal.request.title}</CardTitle>
                      <CardDescription>
                        Submitted on {new Date(proposal.submittedDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge variant={proposal.status === "accepted" ? "default" : "secondary"}>
                      {proposal.status === "pending" ? "Pending" : "Accepted"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Learner</h3>
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={proposal.request.learner.avatar} alt={proposal.request.learner.name} />
                          <AvatarFallback>{proposal.request.learner.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{proposal.request.learner.name}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Your Proposed Rate</h3>
                      <p>₹{proposal.proposedRate}/hr</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Proposed Sessions</h3>
                      <p>{proposal.proposedSessions} sessions</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-1">Your Proposal</h3>
                    <p className="text-sm">{proposal.proposalText}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {proposal.request.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  {proposal.status === "accepted" ? (
                    <Button className="w-full">Contact Learner</Button>
                  ) : (
                    <Button variant="outline" className="w-full">
                      Edit Proposal
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}

            {proposals.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <h3 className="text-lg font-medium mb-2">No proposals yet</h3>
                  <p className="text-muted-foreground text-center mb-6">
                    You haven't submitted any proposals to learner requests yet.
                  </p>
                  <Button variant="outline" onClick={() => document.querySelector('[data-value="browse"]')?.click()}>
                    Browse Requests
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Proposal Modal */}
      <Dialog open={isProposalModalOpen} onOpenChange={setIsProposalModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Submit Proposal</DialogTitle>
            <DialogDescription>
              {selectedRequest && (
                <>
                  Proposal for "{selectedRequest.title}" by {selectedRequest.learner.name}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitProposal} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Proposal</label>
              <Textarea
                name="proposalText"
                value={proposalData.proposalText}
                onChange={handleInputChange}
                placeholder="Describe how you can help the learner, your approach, and what they can expect to learn."
                className="min-h-[150px]"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Hourly Rate (₹)</label>
                <Input
                  name="proposedRate"
                  type="number"
                  value={proposalData.proposedRate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Proposed Sessions</label>
                <Input
                  name="proposedSessions"
                  type="number"
                  value={proposalData.proposedSessions}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Proposal"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
