"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Calendar, CheckCircle, Clock, Eye, MessageSquare, Play, Star } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

// Mock data for a mentor profile
const mentorProfile = {
  id: "mentor1",
  name: "Dr. Sarah Chen",
  title: "Data Science Expert & ML Engineer",
  avatar: "/placeholder.svg?height=80&width=80&text=SC",
  bio: "Ph.D. in Computer Science with 10+ years of experience in data science and machine learning. I've worked with Fortune 500 companies and startups to implement data-driven solutions.",
  expertise: ["Python", "Machine Learning", "Data Science", "Statistics", "Deep Learning", "TensorFlow", "PyTorch"],
  hourlyRate: 1500,
  currency: "₹",
  rating: 4.9,
  reviewCount: 124,
  sessionCount: 256,
  verified: true,
  languages: ["English", "Mandarin"],
  education: [
    { degree: "Ph.D. in Computer Science", institution: "Stanford University", year: "2015" },
    { degree: "M.S. in Computer Science", institution: "MIT", year: "2011" },
    { degree: "B.Tech in Computer Science", institution: "IIT Delhi", year: "2009" },
  ],
  experience: [
    { position: "Lead Data Scientist", company: "Tech Innovations Inc.", duration: "2015-Present" },
    { position: "Machine Learning Engineer", company: "DataCorp", duration: "2011-2015" },
    { position: "Research Assistant", company: "Stanford AI Lab", duration: "2009-2011" },
  ],
  availability: {
    monday: ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"],
    tuesday: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"],
    wednesday: ["10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM"],
    thursday: ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"],
    friday: ["10:00 AM", "11:00 AM", "3:00 PM", "4:00 PM"],
    saturday: ["10:00 AM", "11:00 AM"],
    sunday: [],
  },
  introVideoUrl: "https://example.com/intro-video.mp4",
  premiumVideos: [
    {
      id: "video1",
      title: "Introduction to Machine Learning",
      description: "Learn the fundamentals of machine learning algorithms and techniques.",
      thumbnail: "/placeholder.svg?height=120&width=200&text=ML+Intro",
      duration: "45:20",
      price: 21,
    },
    {
      id: "video2",
      title: "Deep Learning with TensorFlow",
      description: "Hands-on tutorial for building neural networks with TensorFlow.",
      thumbnail: "/placeholder.svg?height=120&width=200&text=TensorFlow",
      duration: "52:15",
      price: 21,
    },
    {
      id: "video3",
      title: "Data Visualization Best Practices",
      description: "Learn how to create effective and insightful data visualizations.",
      thumbnail: "/placeholder.svg?height=120&width=200&text=DataViz",
      duration: "38:45",
      price: 21,
    },
  ],
  reviews: [
    {
      id: 1,
      learner: {
        name: "Priya Sharma",
        avatar: "/placeholder.svg?height=40&width=40&text=PS",
      },
      rating: 5,
      date: "2025-03-28",
      comment:
        "Dr. Chen is an exceptional mentor. She explained complex machine learning concepts in a way that was easy to understand and provided practical examples that helped me apply the knowledge to my own projects.",
    },
    {
      id: 2,
      learner: {
        name: "Rahul Gupta",
        avatar: "/placeholder.svg?height=40&width=40&text=RG",
      },
      rating: 5,
      date: "2025-03-15",
      comment:
        "I've had several sessions with Dr. Chen and each one has been incredibly valuable. She's patient, knowledgeable, and genuinely cares about her students' progress.",
    },
    {
      id: 3,
      learner: {
        name: "Ananya Patel",
        avatar: "/placeholder.svg?height=40&width=40&text=AP",
      },
      rating: 4,
      date: "2025-02-20",
      comment:
        "Great mentor who provides practical insights and real-world examples. I appreciate how she tailors her teaching to my specific learning style and goals.",
    },
  ],
}

// Mock data for a learner profile
const learnerProfile = {
  id: "learner1",
  name: "Vikram Singh",
  avatar: "/placeholder.svg?height=80&width=80&text=VS",
  bio: "Software developer passionate about learning new technologies and expanding my skill set. Currently focused on machine learning and data science.",
  interests: ["Machine Learning", "Web Development", "Mobile Apps", "Cloud Computing"],
  joinedDate: "January 2025",
  sessionsCompleted: 12,
  learningGoals: [
    "Master machine learning algorithms and techniques",
    "Build a portfolio of data science projects",
    "Develop expertise in Python and TensorFlow",
  ],
  currentMentors: [
    {
      id: "mentor1",
      name: "Dr. Sarah Chen",
      expertise: "Data Science",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
    },
    {
      id: "mentor2",
      name: "Raj Patel",
      expertise: "Web Development",
      avatar: "/placeholder.svg?height=40&width=40&text=RP",
    },
  ],
  recentActivity: [
    {
      type: "session",
      title: "Advanced Python for Data Science",
      mentor: "Dr. Sarah Chen",
      date: "2025-04-02",
    },
    {
      type: "course",
      title: "React.js Fundamentals",
      progress: 75,
      date: "2025-03-28",
    },
    {
      type: "session",
      title: "Building RESTful APIs",
      mentor: "Raj Patel",
      date: "2025-03-15",
    },
  ],
}

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"public" | "mentor" | "learner">("public")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [sessionTopic, setSessionTopic] = useState<string>("")
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch profile data based on ID
  useEffect(() => {
    const profileId = params.id as string

    // Simulate API call to fetch profile
    setTimeout(() => {
      if (profileId === "mentor1") {
        setProfile(mentorProfile)
      } else if (profileId === "learner1") {
        setProfile(learnerProfile)
      } else {
        // Default to mentor profile for demo
        setProfile(mentorProfile)
      }
      setIsLoading(false)
    }, 500)
  }, [params.id])

  const handleBookSession = () => {
    if (!selectedDate || !selectedTime || !sessionTopic) {
      toast({
        title: "Missing information",
        description: "Please select a date, time, and enter a topic for your session.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Session booked!",
        description: `Your session with ${profile.name} has been scheduled.`,
      })

      setIsSubmitting(false)
      setIsBookingModalOpen(false)
      setSelectedDate("")
      setSelectedTime("")
      setSessionTopic("")

      // In a real app, you would redirect to the sessions page
      // router.push("/sessions")
    }, 1500)
  }

  const handlePurchaseVideo = (video: any) => {
    setSelectedVideo(video)
    setIsVideoModalOpen(true)
  }

  const confirmPurchaseVideo = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Video purchased!",
        description: `You now have access to "${selectedVideo.title}".`,
      })

      setIsSubmitting(false)
      setIsVideoModalOpen(false)

      // In a real app, you would redirect to the video player page
      // router.push(`/videos/${selectedVideo.id}`)
    }, 1500)
  }

  const isMentor = profile?.hourlyRate !== undefined

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardShell>
    )
  }

  if (!profile) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
          <p className="text-muted-foreground mb-6">
            The profile you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>

          {user && (
            <Select value={viewMode} onValueChange={(value: "public" | "mentor" | "learner") => setViewMode(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="View as" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">View as Public</SelectItem>
                <SelectItem value="mentor">View as Mentor</SelectItem>
                <SelectItem value="learner">View as Learner</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {isMentor && user && user.role === "learner" && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push(`/messages?user=${profile.id}`)}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </Button>
            <Button onClick={() => setIsBookingModalOpen(true)}>
              <Calendar className="mr-2 h-4 w-4" />
              Book Session
            </Button>
          </div>
        )}
      </div>

      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start md:flex-row gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>{profile.name[0]}</AvatarFallback>
              </Avatar>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{profile.name}</h1>
                  {isMentor && profile.verified && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                {isMentor ? (
                  <>
                    <p className="text-muted-foreground">{profile.title}</p>
                    <div className="flex items-center mt-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(profile.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : i < profile.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm ml-2">
                        {profile.rating} ({profile.reviewCount} reviews)
                      </span>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground">Joined {profile.joinedDate}</p>
                )}

                <div className="flex flex-wrap gap-2 mt-3">
                  {isMentor
                    ? profile.expertise.slice(0, 5).map((skill: string) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))
                    : profile.interests.map((interest: string) => (
                        <Badge key={interest} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                  {isMentor && profile.expertise.length > 5 && (
                    <Badge variant="outline">+{profile.expertise.length - 5} more</Badge>
                  )}
                </div>
              </div>
            </div>

            {isMentor && (
              <div className="md:ml-auto text-center md:text-right">
                <div className="text-2xl font-bold">
                  {profile.currency}
                  {profile.hourlyRate}
                  <span className="text-base font-normal text-muted-foreground">/hour</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{profile.sessionCount} sessions completed</p>

                {viewMode === "public" && (
                  <div className="flex flex-col sm:flex-row gap-2 justify-center md:justify-end">
                    <Button variant="outline" onClick={() => router.push(`/messages?user=${profile.id}`)}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                    <Button onClick={() => setIsBookingModalOpen(true)}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Session
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Profile Content */}
      {isMentor ? (
        <Tabs defaultValue="about" className="mb-6">
          <TabsList className="mb-6">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>About {profile.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-6">{profile.bio}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-bold mb-3">Education</h3>
                      <div className="space-y-4">
                        {profile.education.map((edu: any, index: number) => (
                          <div key={index}>
                            <h4 className="font-medium">{edu.degree}</h4>
                            <p className="text-sm text-muted-foreground">
                              {edu.institution}, {edu.year}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-3">Experience</h3>
                      <div className="space-y-4">
                        {profile.experience.map((exp: any, index: number) => (
                          <div key={index}>
                            <h4 className="font-medium">{exp.position}</h4>
                            <p className="text-sm text-muted-foreground">
                              {exp.company}, {exp.duration}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Languages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {profile.languages.map((language: string) => (
                        <div key={language} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span>{language}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.expertise.map((skill: string) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <div className="grid grid-cols-1 gap-6">
              {/* Intro Video */}
              <Card>
                <CardHeader>
                  <CardTitle>Introduction Video</CardTitle>
                  <CardDescription>Get to know {profile.name} and their teaching style</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-md relative overflow-hidden">
                    {profile.introVideoUrl ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button variant="outline" size="icon" className="h-16 w-16 rounded-full bg-background/80">
                          <Play className="h-8 w-8" />
                        </Button>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-muted-foreground">No intro video available</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Premium Videos */}
              <Card>
                <CardHeader>
                  <CardTitle>Premium Content</CardTitle>
                  <CardDescription>Access specialized video content (₹21 per video)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {profile.premiumVideos.map((video: any) => (
                      <div key={video.id} className="border rounded-lg overflow-hidden">
                        <div className="aspect-video bg-muted relative">
                          <img
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Button variant="outline" onClick={() => handlePurchaseVideo(video)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </Button>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium mb-1">{video.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{video.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="font-bold">₹{video.price}</span>
                            <Button size="sm" onClick={() => handlePurchaseVideo(video)}>
                              Purchase
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Reviews</CardTitle>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(profile.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : i < profile.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-bold ml-2">{profile.rating}</span>
                    <span className="text-muted-foreground ml-1">({profile.reviewCount} reviews)</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {profile.reviews.map((review: any) => (
                    <div key={review.id} className="border-b pb-6 last:border-0 last:pb-0">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={review.learner.avatar} alt={review.learner.name} />
                          <AvatarFallback>{review.learner.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{review.learner.name}</h3>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex mt-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Reviews
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="availability">
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
                <CardDescription>{profile.name}'s available time slots for booking sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                  {Object.entries(profile.availability).map(([day, slots]: [string, any]) => (
                    <div key={day} className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3 capitalize">{day}</h3>
                      {slots.length > 0 ? (
                        <div className="space-y-2">
                          {slots.map((slot: string) => (
                            <div key={slot} className="flex items-center">
                              <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                              <span className="text-sm">{slot}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Not available</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setIsBookingModalOpen(true)} className="w-full">
                  Book a Session
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <Tabs defaultValue="about" className="mb-6">
          <TabsList className="mb-6">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="mentors">Current Mentors</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About {profile.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6">{profile.bio}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold mb-3">Learning Goals</h3>
                    <ul className="space-y-2">
                      {profile.learningGoals.map((goal: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((interest: string) => (
                        <Badge key={interest} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>{profile.name}'s recent learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.recentActivity.map((activity: any, index: number) => (
                    <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                      {activity.type === "session" ? (
                        <div>
                          <h3 className="font-medium">{activity.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Session with {activity.mentor} on {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <h3 className="font-medium">{activity.title}</h3>
                          <p className="text-sm text-muted-foreground">Course progress: {activity.progress}%</p>
                          <div className="w-full bg-muted rounded-full h-2 mt-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${activity.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mentors">
            <Card>
              <CardHeader>
                <CardTitle>Current Mentors</CardTitle>
                <CardDescription>Mentors {profile.name} is currently learning from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profile.currentMentors.map((mentor: any) => (
                    <div key={mentor.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <Avatar>
                        <AvatarImage src={mentor.avatar} alt={mentor.name} />
                        <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{mentor.name}</h3>
                        <p className="text-sm text-muted-foreground">{mentor.expertise}</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto" asChild>
                        <Link href={`/profile/${mentor.id}`}>View Profile</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Booking Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Book a Session with {profile.name}</DialogTitle>
            <DialogDescription>Select a date, time, and topic for your session</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {profile.availability.monday.map((slot: string) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Session Topic</label>
              <Input
                placeholder="What would you like to discuss?"
                value={sessionTopic}
                onChange={(e) => setSessionTopic(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex items-center justify-between w-full">
              <div className="text-sm">
                <span className="font-medium">Total:</span> {profile.currency}
                {profile.hourlyRate}
              </div>
              <Button onClick={handleBookSession} disabled={isSubmitting}>
                {isSubmitting ? "Booking..." : "Confirm Booking"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Video Purchase Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Purchase Video</DialogTitle>
            <DialogDescription>{selectedVideo?.title}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="aspect-video bg-muted rounded-md mb-4">
              <img
                src={selectedVideo?.thumbnail || "/placeholder.svg"}
                alt={selectedVideo?.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <p className="mb-4">{selectedVideo?.description}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Duration: {selectedVideo?.duration}</p>
              </div>
              <div className="text-xl font-bold">₹{selectedVideo?.price}</div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVideoModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmPurchaseVideo} disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Purchase Video"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
