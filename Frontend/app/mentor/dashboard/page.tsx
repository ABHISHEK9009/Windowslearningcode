"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, FileEdit, MessageSquare, Plus, Users, Video } from "lucide-react"
import Link from "next/link"
import {
  ChartContainer,
  ChartTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "@/components/ui/chart"

// Mock data
const upcomingSessions = [
  {
    id: 1,
    topic: "Advanced React Patterns",
    learner: "Priya Sharma",
    date: "2025-04-10",
    time: "15:00",
    duration: 60,
  },
  {
    id: 2,
    topic: "Data Visualization with D3",
    learner: "Rahul Gupta",
    date: "2025-04-15",
    time: "10:00",
    duration: 90,
  },
]

const learnerRequests = [
  {
    id: 1,
    title: "Need help with React.js fundamentals",
    learner: "Priya Sharma",
    budget: 1500,
    skills: ["React", "JavaScript", "Web Development"],
    postedDate: "2025-04-03",
    deadline: "2025-04-10",
  },
  {
    id: 2,
    title: "Data visualization with Python",
    learner: "Rahul Gupta",
    budget: 1800,
    skills: ["Python", "Data Science", "Visualization"],
    postedDate: "2025-04-02",
    deadline: "2025-04-12",
  },
]

// Analytics data
const earningsData = [
  { month: "Jan", amount: 15000 },
  { month: "Feb", amount: 18000 },
  { month: "Mar", amount: 22000 },
  { month: "Apr", amount: 12000 },
]

const sessionsData = [
  { month: "Jan", sessions: 10 },
  { month: "Feb", sessions: 12 },
  { month: "Mar", sessions: 15 },
  { month: "Apr", sessions: 8 },
]

export default function MentorDashboardPage() {
  return (
    <DashboardShell>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <Button asChild>
              <Link href="/mentor/profile">
                <FileEdit className="mr-2 h-4 w-4" />
                Edit Profile
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="border rounded-lg p-3">
                      <h3 className="font-medium">{session.topic}</h3>
                      <p className="text-sm text-muted-foreground">with {session.learner}</p>
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
                        <Button size="sm">
                          <Video className="h-3 w-3 mr-2" />
                          Start Session
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/mentor/sessions">View All Sessions</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Earnings Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">This Month</p>
                      <p className="text-2xl font-bold">₹12,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Earnings</p>
                      <p className="text-2xl font-bold">₹67,000</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Monthly Target</span>
                      <span>₹20,000</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    <p className="text-xs text-muted-foreground">60% of monthly target reached</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/mentor/earnings">View Earnings Details</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Earnings Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ChartContainer>
                  <LineChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip formatter={(value) => [`₹${value}`, "Earnings"]} />
                    <Legend />
                    <Line type="monotone" dataKey="amount" name="Earnings" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sessions Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ChartContainer>
                  <BarChart data={sessionsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip />
                    <Legend />
                    <Bar dataKey="sessions" name="Sessions" fill="#82ca9d" />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Profile Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-4">
                <div className="relative h-32 w-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">85%</span>
                  </div>
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle className="stroke-muted fill-none" strokeWidth="10" cx="50" cy="50" r="40" />
                    <circle
                      className="stroke-primary fill-none"
                      strokeWidth="10"
                      strokeLinecap="round"
                      cx="50"
                      cy="50"
                      r="40"
                      strokeDasharray="251.2"
                      strokeDashoffset="37.68"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between text-sm">
                  <span>Profile Information</span>
                  <span>Complete</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Skills & Expertise</span>
                  <span>Complete</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Portfolio</span>
                  <span className="text-amber-500">Incomplete</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Availability</span>
                  <span>Complete</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/mentor/profile">
                  <FileEdit className="mr-2 h-4 w-4" />
                  Complete Profile
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Learner Requests</CardTitle>
              <CardDescription>Recent requests matching your skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learnerRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-3">
                    <h3 className="font-medium">{request.title}</h3>
                    <p className="text-sm text-muted-foreground">by {request.learner}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {request.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between mt-3 text-xs text-muted-foreground">
                      <span>Budget: ₹{request.budget}</span>
                      <span>Deadline: {new Date(request.deadline).toLocaleDateString()}</span>
                    </div>
                    <Button size="sm" className="w-full mt-3">
                      Submit Proposal
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/mentor/learner-requests">
                  <Users className="mr-2 h-4 w-4" />
                  View All Requests
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/mentor/profile">
                    <FileEdit className="mr-2 h-4 w-4" />
                    Update Profile
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/mentor/sessions">
                    <Calendar className="mr-2 h-4 w-4" />
                    Manage Schedule
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/mentor/messages">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Check Messages
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/mentor/earnings">
                    <Plus className="mr-2 h-4 w-4" />
                    Withdraw Earnings
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
