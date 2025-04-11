import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, FileText, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  {
    id: 5,
    topic: "Responsive Web Design",
    mentor: "Alex Johnson",
    date: "2025-03-15",
    time: "16:00",
    duration: 60,
  },
]

export function SessionHistory() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base">Sessions</CardTitle>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Session
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            {upcomingSessions.map((session) => (
              <SessionCard key={session.id} session={session} isPast={false} />
            ))}
          </TabsContent>
          <TabsContent value="past">
            {pastSessions.map((session) => (
              <SessionCard key={session.id} session={session} isPast={true} />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface SessionCardProps {
  session: {
    id: number
    topic: string
    mentor: string
    date: string
    time: string
    duration: number
  }
  isPast: boolean
}

function SessionCard({ session, isPast }: SessionCardProps) {
  // Format date to display in a more readable format
  const formattedDate = new Date(session.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="border rounded-lg p-3 mb-3 last:mb-0">
      <h3 className="font-medium">{session.topic}</h3>
      <p className="text-sm text-muted-foreground">with {session.mentor}</p>
      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-xs">
        <div className="flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          {formattedDate}
        </div>
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {session.time} ({session.duration} min)
        </div>
      </div>
      {isPast && (
        <Button variant="outline" size="sm" className="mt-2 w-full">
          <FileText className="h-3 w-3 mr-2" />
          View Notes
        </Button>
      )}
    </div>
  )
}
