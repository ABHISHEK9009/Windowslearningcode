"use client"

import type React from "react"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Calendar, Clock, FileText, MessageSquare, Plus, Video } from "lucide-react"

// Mock data for upcoming sessions
const upcomingSessions = [
  {
    id: 1,
    topic: "Advanced React Patterns",
    description:
      "Deep dive into advanced React patterns including compound components, render props, and custom hooks.",
    learner: {
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=40&width=40&text=PS",
    },
    date: "2025-04-10",
    time: "15:00",
    duration: 60,
    status: "confirmed",
  },
  {
    id: 2,
    topic: "Data Visualization with D3",
    description: "Introduction to D3.js for creating interactive data visualizations on the web.",
    learner: {
      name: "Rahul Gupta",
      avatar: "/placeholder.svg?height=40&width=40&text=RG",
    },
    date: "2025-04-15",
    time: "10:00",
    duration: 90,
    status: "pending",
  },
]

// Mock data for past sessions
const pastSessions = [
  {
    id: 3,
    topic: "UX Research Methods",
    description: "Overview of user research methods including interviews, surveys, and usability testing.",
    learner: {
      name: "Ananya Patel",
      avatar: "/placeholder.svg?height=40&width=40&text=AP",
    },
    date: "2025-03-28",
    time: "14:00",
    duration: 60,
    status: "completed",
    notes:
      "Covered user interviews, surveys, and usability testing. Ananya showed good understanding of the concepts and is interested in learning more about user personas.",
    recording: "https://example.com/recording/123",
  },
  {
    id: 4,
    topic: "Python for Data Science",
    description: "Introduction to Python libraries for data science including pandas, numpy, and scikit-learn.",
    learner: {
      name: "Vikram Singh",
      avatar: "/placeholder.svg?height=40&width=40&text=VS",
    },
    date: "2025-03-20",
    time: "11:00",
    duration: 90,
    status: "completed",
    notes:
      "Covered pandas for data manipulation, numpy for numerical operations, and scikit-learn for machine learning. Vikram needs more practice with pandas groupby and pivot tables.",
    recording: "https://example.com/recording/456",
  },
]

export default function MentorSessionsPage() {
  const { toast } = useToast()
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [sessionNotes, setSessionNotes] = useState("")
  const [scheduleData, setScheduleData] = useState({
    learnerEmail: "",
    topic: "",
    description: "",
    date: "",
    time: "",
    duration: "60",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setScheduleData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setScheduleData((prev) => ({ ...prev, duration: value }))
  }

  const handleScheduleSession = (e: React.FormEvent) => {
    e.preventDefault()

    if (!scheduleData.learnerEmail || !scheduleData.topic || !scheduleData.date || !scheduleData.time) {
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
        title: "Session scheduled!",
        description: "The learner will be notified about the session.",
      })
      setIsSubmitting(false)
      setIsScheduleModalOpen(false)
      setScheduleData({
        learnerEmail: "",
        topic: "",
        description: "",
        date: "",
        time: "",
        duration: "60",
      })
    }, 1500)
  }

  const handleViewNotes = (session: any) => {
    setSelectedSession(session)
    setSessionNotes(session.notes || "")
    setIsNotesModalOpen(true)
  }

  const handleSaveNotes = () => {
    // Mock API call
    setTimeout(() => {
      toast({
        title: "Notes saved!",
        description: "Your session notes have been saved.",
      })
      setIsNotesModalOpen(false)
    }, 1000)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Sessions</h1>
        <Button onClick={() => setIsScheduleModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Session
        </Button>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingSessions.map((session) => (
              <Card key={session.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{session.topic}</CardTitle>
                      <CardDescription className="mt-1">with {session.learner.name}</CardDescription>
                    </div>
                    <Badge variant={session.status === "confirmed" ? "default" : "outline"}>
                      {session.status === "confirmed" ? "Confirmed" : "Pending"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{session.description}</p>
                  <div className="flex flex-col space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{formatDate(session.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        {session.time} ({session.duration} minutes)
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  {session.status === "confirmed" && (
                    <Button size="sm">
                      <Video className="h-4 w-4 mr-2" />
                      Start Session
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}

            {upcomingSessions.length === 0 && (
              <Card className="md:col-span-2">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <h3 className="text-lg font-medium mb-2">No upcoming sessions</h3>
                  <p className="text-muted-foreground text-center mb-6">
                    You don't have any upcoming sessions scheduled.
                  </p>
                  <Button onClick={() => setIsScheduleModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Session
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastSessions.map((session) => (
              <Card key={session.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{session.topic}</CardTitle>
                      <CardDescription className="mt-1">with {session.learner.name}</CardDescription>
                    </div>
                    <Badge>Completed</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{session.description}</p>
                  <div className="flex flex-col space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{formatDate(session.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        {session.time} ({session.duration} minutes)
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleViewNotes(session)}>
                    <FileText className="h-4 w-4 mr-2" />
                    View Notes
                  </Button>
                  {session.recording && (
                    <Button size="sm">
                      <Video className="h-4 w-4 mr-2" />
                      View Recording
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}

            {pastSessions.length === 0 && (
              <Card className="md:col-span-2">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <h3 className="text-lg font-medium mb-2">No past sessions</h3>
                  <p className="text-muted-foreground text-center">You haven't completed any sessions yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Schedule Session Modal */}
      <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Schedule a Session</DialogTitle>
            <DialogDescription>Fill in the details to schedule a new session with a learner.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleScheduleSession} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Learner Email</label>
              <Input
                name="learnerEmail"
                type="email"
                placeholder="learner@example.com"
                value={scheduleData.learnerEmail}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Topic</label>
              <Input
                name="topic"
                placeholder="e.g., Advanced React Patterns"
                value={scheduleData.topic}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                name="description"
                placeholder="Briefly describe what will be covered in the session"
                value={scheduleData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input name="date" type="date" value={scheduleData.date} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <Input name="time" type="time" value={scheduleData.time} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <Select value={scheduleData.duration} onValueChange={handleSelectChange}>
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
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Scheduling..." : "Schedule Session"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Session Notes Modal */}
      <Dialog open={isNotesModalOpen} onOpenChange={setIsNotesModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Session Notes</DialogTitle>
            <DialogDescription>
              {selectedSession && (
                <>
                  {selectedSession.topic} with {selectedSession.learner.name} on {formatDate(selectedSession.date)}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              placeholder="Add your notes here..."
              className="min-h-[200px]"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleSaveNotes}>Save Notes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
