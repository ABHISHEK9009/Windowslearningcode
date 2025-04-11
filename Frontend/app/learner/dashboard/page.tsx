"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, FileText, MessageSquare, Plus, Search, Star, Wallet } from "lucide-react"
import Link from "next/link"
import { ChartContainer, ChartTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "@/components/ui/chart"

// Mock data
const upcomingSessions = [
  {
    id: 1,
    topic: "Advanced React Patterns",
    mentor: "Dr. Sarah Chen",
    date: "2025-04-10",
    time: "15:00",
    duration: 60,
  },
  {
    id: 2,
    topic: "Data Visualization with D3",
    mentor: "Raj Patel",
    date: "2025-04-15",
    time: "10:00",
    duration: 90,
  },
]

const pastSessions = [
  {
    id: 3,
    topic: "UX Research Methods",
    mentor: "Maria Rodriguez",
    date: "2025-03-28",
    time: "14:00",
    duration: 60,
  },
  {
    id: 4,
    topic: "Python for Data Science",
    mentor: "Dr. Sarah Chen",
    date: "2025-03-20",
    time: "11:00",
    duration: 90,
  },
]

const learningTracks = [
  { name: "Web Development", progress: 65 },
  { name: "Data Science", progress: 40 },
  { name: "UX Design", progress: 25 },
]

const recommendedMentors = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    expertise: "Data Science, Python",
    rating: 4.9,
    hourlyRate: 1500,
    currency: "₹",
  },
  {
    id: 2,
    name: "Raj Patel",
    expertise: "Web Development, JavaScript",
    rating: 4.8,
    hourlyRate: 1200,
    currency: "₹",
  },
]

// Analytics data
const monthlyData = [
  { name: "Jan", sessions: 2, hours: 3 },
  { name: "Feb", sessions: 4, hours: 6 },
  { name: "Mar", sessions: 3, hours: 4.5 },
  { name: "Apr", sessions: 5, hours: 7.5 },
]

export default function LearnerDashboardPage() {
  return (
    <DashboardShell>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <Button asChild>
              <Link href="/learner/find-mentors">
                <Search className="mr-2 h-4 w-4" />
                Find Mentors
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningTracks.map((track) => (
                    <div key={track.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{track.name}</span>
                        <span className="text-sm font-bold">{track.progress}%</span>
                      </div>
                      <Progress value={track.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View All Courses
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Wallet Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₹4,250</div>
                <p className="text-sm text-muted-foreground mt-1">Enough for 3 sessions</p>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <Wallet className="mr-1 h-4 w-4" />
                  Last transaction: ₹1,500 on April 2, 2025
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Funds
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="border rounded-lg p-3 mb-3 last:mb-0">
                      <h3 className="font-medium">{session.topic}</h3>
                      <p className="text-sm text-muted-foreground">with {session.mentor}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-xs">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(session.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {session.time} ({session.duration} min)
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-3 w-3 mr-2" />
                          Message
                        </Button>
                        <Button size="sm">Join Session</Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="past">
                  {pastSessions.map((session) => (
                    <div key={session.id} className="border rounded-lg p-3 mb-3 last:mb-0">
                      <h3 className="font-medium">{session.topic}</h3>
                      <p className="text-sm text-muted-foreground">with {session.mentor}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-xs">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(session.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {session.time} ({session.duration} min)
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3">
                        <FileText className="h-3 w-3 mr-2" />
                        View Notes
                      </Button>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/learner/sessions">View All Sessions</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Learning Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ChartContainer>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="sessions" name="Sessions" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="hours" name="Hours" fill="#82ca9d" />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Recommended Mentors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedMentors.map((mentor) => (
                  <div key={mentor.id} className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${mentor.name.charAt(0)}`} />
                      <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{mentor.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-xs font-medium">{mentor.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{mentor.expertise}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-medium">
                          {mentor.currency}
                          {mentor.hourlyRate}/hr
                        </span>
                        <Button size="sm" variant="outline">
                          Book
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/learner/find-mentors">View All Mentors</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Post a Learning Requirement</CardTitle>
              <CardDescription>Get personalized proposals from mentors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-3 rounded-lg">
                  <h3 className="font-medium text-sm">How it works:</h3>
                  <ol className="text-xs text-muted-foreground mt-2 space-y-1 list-decimal list-inside">
                    <li>Describe what you want to learn</li>
                    <li>Set your budget and timeline</li>
                    <li>Receive proposals from qualified mentors</li>
                    <li>Choose the best mentor for your needs</li>
                  </ol>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Web Development</Badge>
                  <Badge variant="outline">Data Science</Badge>
                  <Badge variant="outline">UX Design</Badge>
                  <Badge variant="outline">Mobile Development</Badge>
                  <Badge variant="outline">Machine Learning</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/learner/post-requirement">
                  <Plus className="mr-2 h-4 w-4" />
                  Post Requirement
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
