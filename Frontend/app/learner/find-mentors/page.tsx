"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Filter, MessageSquare, Plus, Search, Star, X } from "lucide-react"

// Mock data
const mentors = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    title: "Data Science Expert & ML Engineer",
    expertise: ["Python", "Machine Learning", "Data Science", "Statistics"],
    bio: "Ph.D. in Computer Science with 10+ years of experience in data science and machine learning. I've worked with Fortune 500 companies and startups to implement data-driven solutions.",
    rating: 4.9,
    reviewCount: 124,
    hourlyRate: 1500,
    currency: "₹",
    availability: ["Mon", "Wed", "Fri"],
    languages: ["English", "Mandarin"],
    avatar: "/placeholder.svg?height=80&width=80&text=SC",
  },
  {
    id: 2,
    name: "Raj Patel",
    title: "Full Stack Developer & Web Architect",
    expertise: ["JavaScript", "React", "Node.js", "Web Development"],
    bio: "Senior developer with 8+ years of experience building scalable web applications. I specialize in React, Node.js, and modern JavaScript frameworks.",
    rating: 4.8,
    reviewCount: 98,
    hourlyRate: 1200,
    currency: "₹",
    availability: ["Tue", "Thu", "Sat"],
    languages: ["English", "Hindi", "Gujarati"],
    avatar: "/placeholder.svg?height=80&width=80&text=RP",
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    title: "UX Designer & Research Specialist",
    expertise: ["UX Design", "UI Design", "User Research", "Figma"],
    bio: "Award-winning UX designer with a passion for creating intuitive and accessible digital experiences. I've worked on products used by millions of people worldwide.",
    rating: 4.7,
    reviewCount: 87,
    hourlyRate: 1300,
    currency: "₹",
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    languages: ["English", "Spanish"],
    avatar: "/placeholder.svg?height=80&width=80&text=MR",
  },
  {
    id: 4,
    name: "Alex Johnson",
    title: "Mobile Developer & AR Specialist",
    expertise: ["iOS", "Android", "React Native", "AR/VR"],
    bio: "Mobile developer with expertise in both native and cross-platform development. I specialize in creating immersive AR experiences and high-performance mobile apps.",
    rating: 4.6,
    reviewCount: 76,
    hourlyRate: 1400,
    currency: "₹",
    availability: ["Wed", "Thu", "Fri", "Sat"],
    languages: ["English"],
    avatar: "/placeholder.svg?height=80&width=80&text=AJ",
  },
]

export default function FindMentorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([])
  const [selectedMentor, setSelectedMentor] = useState<(typeof mentors)[0] | null>(null)
  const [filtersVisible, setFiltersVisible] = useState(false)

  const filteredMentors = mentors.filter((mentor) => {
    // Search term filter
    const matchesSearch =
      searchTerm === "" ||
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      mentor.bio.toLowerCase().includes(searchTerm.toLowerCase())

    // Price range filter
    const matchesPrice = mentor.hourlyRate >= priceRange[0] && mentor.hourlyRate <= priceRange[1]

    // Expertise filter
    const matchesExpertise =
      selectedExpertise.length === 0 || selectedExpertise.some((skill) => mentor.expertise.includes(skill))

    return matchesSearch && matchesPrice && matchesExpertise
  })

  const handleExpertiseToggle = (expertise: string) => {
    if (selectedExpertise.includes(expertise)) {
      setSelectedExpertise(selectedExpertise.filter((item) => item !== expertise))
    } else {
      setSelectedExpertise([...selectedExpertise, expertise])
    }
  }

  const allExpertise = Array.from(new Set(mentors.flatMap((mentor) => mentor.expertise))).sort()

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Find Mentors</h1>
            <p className="text-muted-foreground">Connect with expert mentors in your field</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setFiltersVisible(!filtersVisible)}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Post Requirement
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Post a Learning Requirement</DialogTitle>
                  <DialogDescription>
                    Describe what you want to learn and get personalized proposals from mentors.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Title
                    </label>
                    <Input id="title" placeholder="e.g., Need help with React.js fundamentals" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Description
                    </label>
                    <textarea
                      id="description"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Describe what you want to learn, your current skill level, and your goals."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="budget" className="text-sm font-medium">
                        Budget (₹)
                      </label>
                      <Input id="budget" type="number" placeholder="e.g., 1500" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="duration" className="text-sm font-medium">
                        Duration
                      </label>
                      <Select>
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
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Skills Required</label>
                    <div className="flex flex-wrap gap-2">
                      {allExpertise.slice(0, 8).map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Post Requirement</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters */}
          <div className={`md:w-1/4 space-y-6 ${filtersVisible ? "block" : "hidden md:block"}`}>
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Search</CardTitle>
                  {filtersVisible && (
                    <Button variant="ghost" size="icon" onClick={() => setFiltersVisible(false)} className="md:hidden">
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search mentors or skills..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Price Range</CardTitle>
              </CardHeader>
              <CardContent>
                <Slider
                  defaultValue={[0, 2000]}
                  max={2000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="my-6"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm">₹{priceRange[0]}</span>
                  <span className="text-sm">₹{priceRange[1]}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {allExpertise.map((expertise) => (
                    <Badge
                      key={expertise}
                      variant={selectedExpertise.includes(expertise) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleExpertiseToggle(expertise)}
                    >
                      {expertise}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mentor List */}
          <div className={`flex-1 ${filtersVisible ? "hidden md:block" : "block"}`}>
            <Tabs defaultValue="mentors">
              <TabsList className="mb-6">
                <TabsTrigger value="mentors">Mentors</TabsTrigger>
                <TabsTrigger value="proposals">My Proposals</TabsTrigger>
              </TabsList>

              <TabsContent value="mentors">
                <div className="space-y-6">
                  {filteredMentors.length > 0 ? (
                    filteredMentors.map((mentor) => (
                      <Card key={mentor.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex flex-col items-center md:w-1/4">
                              <Avatar className="h-20 w-20">
                                <AvatarImage src={mentor.avatar} alt={mentor.name} />
                                <AvatarFallback>
                                  {mentor.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="mt-4 text-center">
                                <div className="flex items-center justify-center">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="ml-1 font-medium">{mentor.rating}</span>
                                  <span className="ml-1 text-sm text-muted-foreground">({mentor.reviewCount})</span>
                                </div>
                                <div className="mt-2 text-lg font-bold">
                                  {mentor.currency}
                                  {mentor.hourlyRate}/hr
                                </div>
                              </div>
                            </div>

                            <div className="flex-1">
                              <h3 className="text-xl font-bold">{mentor.name}</h3>
                              <p className="text-sm text-muted-foreground">{mentor.title}</p>

                              <div className="mt-3 flex flex-wrap gap-2">
                                {mentor.expertise.map((skill) => (
                                  <Badge key={skill} variant="outline">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>

                              <p className="mt-4 text-sm">{mentor.bio}</p>

                              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                                <div>
                                  <span className="font-medium">Languages:</span> {mentor.languages.join(", ")}
                                </div>
                                <div>
                                  <span className="font-medium">Availability:</span> {mentor.availability.join(", ")}
                                </div>
                              </div>

                              <div className="mt-6 flex flex-wrap gap-3">
                                <Button variant="outline" onClick={() => setSelectedMentor(mentor)}>
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  Message
                                </Button>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button>Book Session</Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Book a Session with {mentor.name}</DialogTitle>
                                      <DialogDescription>
                                        Select a date, time, and duration for your session.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <label className="text-sm font-medium">Date</label>
                                          <Input type="date" />
                                        </div>
                                        <div className="space-y-2">
                                          <label className="text-sm font-medium">Time</label>
                                          <Input type="time" />
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <label className="text-sm font-medium">Duration</label>
                                        <Select defaultValue="60">
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select duration" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="30">30 minutes</SelectItem>
                                            <SelectItem value="60">1 hour</SelectItem>
                                            <SelectItem value="90">1.5 hours</SelectItem>
                                            <SelectItem value="120">2 hours</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div className="space-y-2">
                                        <label className="text-sm font-medium">Topic</label>
                                        <Input placeholder="What would you like to discuss?" />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <div className="flex items-center justify-between w-full">
                                        <div className="text-sm">
                                          <span className="font-medium">Total:</span> {mentor.currency}
                                          {mentor.hourlyRate}
                                        </div>
                                        <Button type="submit">Confirm Booking</Button>
                                      </div>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium">No mentors found</h3>
                      <p className="text-muted-foreground mt-2">
                        Try adjusting your filters or search term to find mentors that match your criteria.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="proposals">
                <Card>
                  <CardHeader>
                    <CardTitle>My Proposals</CardTitle>
                    <CardDescription>View proposals from mentors for your learning requirements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border rounded-lg p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">React.js Fundamentals</h3>
                            <p className="text-sm text-muted-foreground">Posted on April 2, 2025</p>
                          </div>
                          <Badge>3 Proposals</Badge>
                        </div>

                        <div className="mt-4 space-y-4">
                          <div className="border-t pt-4">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src="/placeholder.svg?height=40&width=40&text=RP" />
                                <AvatarFallback>RP</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">Raj Patel</h4>
                                <div className="flex items-center text-sm">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                                  <span>4.8</span>
                                </div>
                              </div>
                              <div className="ml-auto text-right">
                                <div className="font-bold">₹1,200</div>
                                <div className="text-xs text-muted-foreground">1 hour session</div>
                              </div>
                            </div>
                            <p className="mt-2 text-sm">
                              I can help you learn React.js fundamentals with practical examples and exercises. We'll
                              cover components, state, props, and hooks.
                            </p>
                            <div className="mt-3 flex gap-2">
                              <Button size="sm">Accept</Button>
                              <Button variant="outline" size="sm">
                                Message
                              </Button>
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src="/placeholder.svg?height=40&width=40&text=AJ" />
                                <AvatarFallback>AJ</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">Alex Johnson</h4>
                                <div className="flex items-center text-sm">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                                  <span>4.6</span>
                                </div>
                              </div>
                              <div className="ml-auto text-right">
                                <div className="font-bold">₹1,400</div>
                                <div className="text-xs text-muted-foreground">1 hour session</div>
                              </div>
                            </div>
                            <p className="mt-2 text-sm">
                              I specialize in teaching React with a focus on modern practices. We'll build a small
                              project together to reinforce the concepts.
                            </p>
                            <div className="mt-3 flex gap-2">
                              <Button size="sm">Accept</Button>
                              <Button variant="outline" size="sm">
                                Message
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">Data Visualization with Python</h3>
                            <p className="text-sm text-muted-foreground">Posted on March 28, 2025</p>
                          </div>
                          <Badge>1 Proposal</Badge>
                        </div>

                        <div className="mt-4 space-y-4">
                          <div className="border-t pt-4">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src="/placeholder.svg?height=40&width=40&text=SC" />
                                <AvatarFallback>SC</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">Dr. Sarah Chen</h4>
                                <div className="flex items-center text-sm">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                                  <span>4.9</span>
                                </div>
                              </div>
                              <div className="ml-auto text-right">
                                <div className="font-bold">₹1,500</div>
                                <div className="text-xs text-muted-foreground">1 hour session</div>
                              </div>
                            </div>
                            <p className="mt-2 text-sm">
                              I can teach you data visualization using matplotlib, seaborn, and plotly. We'll work with
                              real datasets to create insightful visualizations.
                            </p>
                            <div className="mt-3 flex gap-2">
                              <Button size="sm">Accept</Button>
                              <Button variant="outline" size="sm">
                                Message
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Mentor Chat Dialog */}
      {selectedMentor && (
        <Dialog open={!!selectedMentor} onOpenChange={() => setSelectedMentor(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Message {selectedMentor.name}</DialogTitle>
              <DialogDescription>Send a message to discuss your learning goals</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedMentor.avatar} alt={selectedMentor.name} />
                  <AvatarFallback>
                    {selectedMentor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{selectedMentor.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedMentor.title}</p>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={`Hi ${selectedMentor.name}, I'm interested in learning more about...`}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Send Message</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardShell>
  )
}
