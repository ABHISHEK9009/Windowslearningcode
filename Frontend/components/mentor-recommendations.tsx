import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

// Mock data
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
  {
    id: 3,
    name: "Maria Rodriguez",
    expertise: "UX Design, Research",
    rating: 4.7,
    hourlyRate: 1300,
    currency: "₹",
  },
]

export function MentorRecommendations() {
  return (
    <Card>
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
    </Card>
  )
}
