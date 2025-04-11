"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface AvailabilitySlot {
  day: string
  time: string
  available: boolean
}

interface MentorAvailabilityProps {
  mentorId: string
  mentorName: string
  availability: Record<string, string[]>
  hourlyRate: number
  currency: string
  className?: string
  onBookSession?: (data: {
    mentorId: string
    date: string
    time: string
    topic: string
  }) => void
}

export function MentorAvailability({
  mentorId,
  mentorName,
  availability,
  hourlyRate,
  currency,
  className = "",
  onBookSession,
}: MentorAvailabilityProps) {
  const { toast } = useToast()
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [sessionTopic, setSessionTopic] = useState("")
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get the next 7 days for the calendar
  const getNextSevenDays = () => {
    const days = []
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      const dayName = date.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })

      days.push({
        date: formattedDate,
        dayName,
        dayOfMonth: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        isToday: i === 0,
        hasAvailability: availability[dayName] && availability[dayName].length > 0,
      })
    }

    return days
  }

  const nextSevenDays = getNextSevenDays()

  const handleDaySelect = (day: (typeof nextSevenDays)[0]) => {
    setSelectedDay(day.dayName)
    setSelectedTime(null)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleBookSession = () => {
    if (!selectedDay || !selectedTime || !sessionTopic) {
      toast({
        title: "Missing information",
        description: "Please select a day, time, and enter a topic for your session.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Find the selected day object
    const selectedDayObj = nextSevenDays.find((day) => day.dayName === selectedDay)

    if (!selectedDayObj) {
      toast({
        title: "Error",
        description: "Invalid day selected.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Format date as YYYY-MM-DD
    const date = `${selectedDayObj.year}-${(selectedDayObj.month + 1).toString().padStart(2, "0")}-${selectedDayObj.dayOfMonth.toString().padStart(2, "0")}`

    // In a real app, you would call an API to book the session
    setTimeout(() => {
      if (onBookSession) {
        onBookSession({
          mentorId,
          date,
          time: selectedTime,
          topic: sessionTopic,
        })
      }

      toast({
        title: "Session booked!",
        description: `Your session with ${mentorName} has been scheduled.`,
      })

      setIsSubmitting(false)
      setIsBookingModalOpen(false)
      setSessionTopic("")
      setSelectedDay(null)
      setSelectedTime(null)
    }, 1500)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>{mentorName}'s available time slots for booking sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Calendar view */}
          <div className="flex overflow-x-auto pb-2 space-x-2">
            {nextSevenDays.map((day) => (
              <div
                key={day.date}
                className={`flex-shrink-0 w-20 h-24 rounded-lg border ${
                  selectedDay === day.dayName
                    ? "border-primary bg-primary/5"
                    : day.hasAvailability
                      ? "border-muted-foreground/20 hover:border-primary/50 cursor-pointer"
                      : "border-muted-foreground/20 bg-muted/50 opacity-50 cursor-not-allowed"
                } flex flex-col items-center justify-center p-2`}
                onClick={() => day.hasAvailability && handleDaySelect(day)}
              >
                <span className="text-xs uppercase font-medium">{day.date.split(" ")[0]}</span>
                <span className={`text-2xl font-bold ${day.isToday ? "text-primary" : ""}`}>{day.dayOfMonth}</span>
                <span className="text-xs capitalize">{day.dayName.slice(0, 3)}</span>
                {day.hasAvailability && (
                  <Badge variant="outline" className="mt-1 text-[10px] px-1 py-0">
                    {availability[day.dayName].length} slots
                  </Badge>
                )}
              </div>
            ))}
          </div>

          {/* Time slots */}
          {selectedDay && availability[selectedDay] && availability[selectedDay].length > 0 ? (
            <div>
              <h3 className="text-sm font-medium mb-2 capitalize">{selectedDay} Time Slots</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {availability[selectedDay].map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    className="flex items-center"
                    onClick={() => handleTimeSelect(time)}
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          ) : selectedDay ? (
            <div className="text-center py-4">
              <p className="text-muted-foreground">No available time slots for this day.</p>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground">Select a day to view available time slots.</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
          <DialogTrigger asChild>
            <Button
              className="w-full"
              disabled={!selectedDay || !selectedTime}
              onClick={() => selectedDay && selectedTime && setIsBookingModalOpen(true)}
            >
              Book a Session
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book a Session with {mentorName}</DialogTitle>
              <DialogDescription>Confirm your session details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Date</label>
                  <div className="p-2 border rounded-md flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="capitalize">{selectedDay}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Time</label>
                  <div className="p-2 border rounded-md flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{selectedTime}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
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
                  <span className="font-medium">Total:</span> {currency}
                  {hourlyRate}
                </div>
                <Button onClick={handleBookSession} disabled={isSubmitting}>
                  {isSubmitting ? "Booking..." : "Confirm Booking"}
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
