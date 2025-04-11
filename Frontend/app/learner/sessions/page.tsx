"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, FileText, MessageSquare, Plus, Video } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

// Mock data
const upcomingSessions = [
  {
    id: 1,
    topic: "Advanced React Patterns",
    description:
      "Deep dive into advanced React patterns including compound components, render props, and custom hooks.",
    mentor: {
      name: "Dr. Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
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
    mentor: {
      name: "Raj Patel",
      avatar: "/placeholder.svg?height=40&width=40&text=RP",
    },
    date: "2025-04-15",
    time: "10:00",
    duration: 90,
    status: "pending",
  },
]

const pastSessions = [
  {
    id: 3,
    topic: "UX Research Methods",
    description: "Overview of user research methods including interviews, surveys, and usability testing.",
    mentor: {
      name: "Maria Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40&text=MR",
    },
    date: "2025-03-28",
    time: "14:00",
    duration: 60,
    status: "completed",
    notes:
      "Learned about different UX research methods and when to use each. Key takeaways: 1) Always start with user interviews to understand needs, 2) Use surveys for quantitative data, 3) Conduct usability testing to validate designs.",
    recording: "https://example.com/recording/123",
  },
  {
    id: 4,
    topic: "Python for Data Science",
    description: "Introduction to Python libraries for data science including pandas, numpy, and scikit-learn.",
    mentor: {
      name: "Dr. Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
    },
    date: "2025-03-20",
    time: "11:00",
    duration: 90,
    status: "completed",
    notes:
      "Covered pandas for data manipulation, numpy for numerical operations, and scikit-learn for machine learning. Need to practice more with pandas groupby and pivot tables.",
    recording: "https://example.com/recording/456",
  },
  {
    id: 5,
    topic: "Responsive Web Design",
    description: "Best practices for creating responsive websites that work well on all devices.",
    mentor: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=AJ",
    },
    date: "2025-03-15",
    time: "16:00",
    duration: 60,
    status: "completed",
    notes:
      "Learned about media queries, flexible grids, and responsive images. Also discussed mobile-first design approach and CSS frameworks like Bootstrap and Tailwind.",
    recording: "https://example.com/recording/789",
  },
]

export default function SessionsPage() {
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [notesDialogOpen, setNotesDialogOpen] = useState(false)
  const [sessionNotes, setSessionNotes] = useState("")

  const handleViewNotes = (session: any) => {
    setSelectedSession(session)
    setSessionNotes(session.notes || "")
    setNotesDialogOpen(true)
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
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Sessions</h1>
            <p className="text-muted-foreground">Manage your learning sessions</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Book New Session
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
                        <CardDescription className="mt-1">with {session.mentor.name}</CardDescription>
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
                        Join Session
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
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
                        <CardDescription className="mt-1">with {session.mentor.name}</CardDescription>
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
                        Watch Recording
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Session Notes Dialog */}
      <Dialog open={notesDialogOpen} onOpenChange={setNotesDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Session Notes</DialogTitle>
            <DialogDescription>
              {selectedSession && (
                <>
                  {selectedSession.topic} with {selectedSession.mentor.name} on {formatDate(selectedSession.date)}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              placeholder="Add your notes here..."
              className="min-h-[200px]"
            />
          </div>
          <DialogFooter>
            <Button onClick={() => setNotesDialogOpen(false)}>Save Notes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
