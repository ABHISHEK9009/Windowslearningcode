"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Filter, Search, Star, ChevronDown, ChevronUp } from "lucide-react"
import { motion } from "framer-motion"

// Generate open-source avatar URLs using DiceBear Avatars
const getAvatarUrl = (seed: string, style = 'identicon') => {
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}`
}

// Mock data for mentors with open-source avatars
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
    avatar: getAvatarUrl("Dr. Sarah Chen", "identicon"),
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
    avatar: getAvatarUrl("Raj Patel", "pixel-art"),
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
    avatar: getAvatarUrl("Maria Rodriguez", "lorelei"),
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
    avatar: getAvatarUrl("Alex Johnson", "micah"),
  },
  {
    id: 5,
    name: "Ananya Patel",
    title: "Frontend Developer & Accessibility Expert",
    expertise: ["HTML/CSS", "JavaScript", "React", "Accessibility"],
    bio: "Frontend developer focused on creating beautiful, accessible web experiences. I help companies ensure their products can be used by everyone.",
    rating: 4.7,
    reviewCount: 65,
    hourlyRate: 1100,
    currency: "₹",
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    languages: ["English", "Hindi"],
    avatar: getAvatarUrl("Ananya Patel", "bottts"),
  },
  {
    id: 6,
    name: "David Kim",
    title: "DevOps Engineer & Cloud Architect",
    expertise: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    bio: "DevOps engineer with extensive experience in cloud infrastructure and automation. I help teams implement efficient CI/CD pipelines and robust cloud architectures.",
    rating: 4.8,
    reviewCount: 92,
    hourlyRate: 1600,
    currency: "₹",
    availability: ["Mon", "Wed", "Fri"],
    languages: ["English", "Korean"],
    avatar: getAvatarUrl("David Kim", "avataaars"),
  },
]

// Mock data for courses with open-source course images
const getCourseImage = (seed: string) => {
  return `https://source.unsplash.com/random/300x200/?${encodeURIComponent(seed)}`
}

const courses = [
  {
    id: 1,
    title: "Complete React Developer Course",
    instructor: "Raj Patel",
    description: "Learn React from scratch and build real-world applications with modern React features.",
    rating: 4.8,
    reviewCount: 1245,
    price: 1999,
    currency: "₹",
    duration: "24 hours",
    level: "Beginner to Advanced",
    image: getCourseImage("react development"),
  },
  {
    id: 2,
    title: "Data Science Masterclass",
    instructor: "Dr. Sarah Chen",
    description:
      "Comprehensive data science course covering Python, statistics, machine learning, and data visualization.",
    rating: 4.9,
    reviewCount: 987,
    price: 2499,
    currency: "₹",
    duration: "36 hours",
    level: "Intermediate",
    image: getCourseImage("data science"),
  },
  {
    id: 3,
    title: "UX Design Fundamentals",
    instructor: "Maria Rodriguez",
    description:
      "Learn the principles of user experience design and how to create intuitive, user-friendly interfaces.",
    rating: 4.7,
    reviewCount: 756,
    price: 1799,
    currency: "₹",
    duration: "18 hours",
    level: "Beginner",
    image: getCourseImage("ux design"),
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [activeTab, setActiveTab] = useState("mentors")
  const [filtersVisible, setFiltersVisible] = useState(false)

  // Get all unique skills from mentors
  const allSkills = Array.from(new Set(mentors.flatMap((mentor) => mentor.expertise))).sort()

  // Filter mentors based on search query and selected skills
  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      searchQuery === "" ||
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      mentor.bio.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSkills =
      selectedSkills.length === 0 || selectedSkills.some((skill) => mentor.expertise.includes(skill))

    const matchesPrice = mentor.hourlyRate >= priceRange[0] && mentor.hourlyRate <= priceRange[1]

    return matchesSearch && matchesSkills && matchesPrice
  })

  // Filter courses based on search query
  const filteredCourses = courses.filter((course) => {
    return (
      searchQuery === "" ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <DashboardShell>
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold tracking-tight">Find Mentors & Courses</h1>
            <Badge variant="secondary" className="ml-3">
              Beta
            </Badge>
          </div>
          
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search mentors, courses, or skills..."
              className="pl-10 w-full md:w-96"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Tabs defaultValue="mentors" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 max-w-xs">
              <TabsTrigger value="mentors">Mentors</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setFiltersVisible(!filtersVisible)}
            className="gap-2"
          >
            {filtersVisible ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.aside
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: filtersVisible ? 1 : 0,
              height: filtersVisible ? 'auto' : 0
            }}
            transition={{ duration: 0.2 }}
            className={`lg:col-span-1 ${filtersVisible ? 'block' : 'hidden'}`}
          >
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
                <CardDescription>Narrow down your search results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {allSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={selectedSkills.includes(skill) ? "default" : "outline"}
                        onClick={() => {
                          if (selectedSkills.includes(skill)) {
                            setSelectedSkills(selectedSkills.filter((s) => s !== skill))
                          } else {
                            setSelectedSkills([...selectedSkills, skill])
                          }
                        }}
                        className="cursor-pointer hover:bg-primary/80 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Price Range</h3>
                  <Slider
                    defaultValue={priceRange}
                    max={2000}
                    step={100}
                    minStepsBetweenThumbs={1}
                    onValueChange={(value) => setPriceRange(value)}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.aside>

          <div className="lg:col-span-3">
            <Tabs defaultValue="mentors" value={activeTab}>
              <TabsContent value="mentors" className="mt-0">
                {filteredMentors.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredMentors.map((mentor) => (
                      <Link key={mentor.id} href={`/mentors/${mentor.id}`}>
                        <Card className="h-full hover:shadow-lg transition-shadow">
                          <CardHeader className="flex flex-row items-start gap-4 pb-3">
                            <Avatar className="h-14 w-14">
                              <AvatarImage src={mentor.avatar} alt={mentor.name} />
                              <AvatarFallback>{mentor.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <CardTitle className="text-lg">{mentor.name}</CardTitle>
                              <CardDescription className="line-clamp-2">
                                {mentor.title}
                              </CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-4">
                            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                              {mentor.bio}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {mentor.expertise.slice(0, 4).map((skill, index) => (
                                <Badge key={index} variant="secondary">
                                  {skill}
                                </Badge>
                              ))}
                              {mentor.expertise.length > 4 && (
                                <Badge variant="outline">+{mentor.expertise.length - 4}</Badge>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-medium">{mentor.rating}</span>
                              <span className="text-sm text-muted-foreground">
                                ({mentor.reviewCount})
                              </span>
                            </div>
                            <div className="font-medium">
                              {mentor.currency}
                              {mentor.hourlyRate}
                              <span className="text-sm text-muted-foreground">/hr</span>
                            </div>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <Search className="h-12 w-12 text-muted-foreground" />
                    <h3 className="text-xl font-medium">No mentors found</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="courses" className="mt-0">
                {filteredCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                      <Link key={course.id} href={`/courses/${course.id}`}>
                        <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                          <div className="relative h-40">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardHeader>
                            <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                            <CardDescription className="line-clamp-1">
                              {course.instructor}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {course.description}
                            </p>
                          </CardContent>
                          <CardFooter className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-medium">{course.rating}</span>
                              <span className="text-sm text-muted-foreground">
                                ({course.reviewCount})
                              </span>
                            </div>
                            <div className="font-medium">
                              {course.currency}
                              {course.price}
                            </div>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <Search className="h-12 w-12 text-muted-foreground" />
                    <h3 className="text-xl font-medium">No courses found</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}