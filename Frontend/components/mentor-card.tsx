"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface MentorCardProps {
  mentor: {
    id: number
    name: string
    expertise: string[]
    rating: number
    reviewCount: number
    hourlyRate: number
    currency: string
    avatar: string
  }
}

export function MentorCard({ mentor }: MentorCardProps) {
  return (
    <div className="mentor-card">
      <div className="flex flex-col items-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={mentor.avatar} alt={mentor.name} />
          <AvatarFallback>
            {mentor.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-bold text-center">{mentor.name}</h3>
        <div className="flex flex-wrap justify-center gap-1 my-2">
          {mentor.expertise.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(mentor.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : i < mentor.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm ml-2">
            {mentor.rating} ({mentor.reviewCount})
          </span>
        </div>
        <p className="font-bold text-lg mb-4">
          {mentor.currency}
          {mentor.hourlyRate}/hr
        </p>
        <Button className="w-full" asChild>
          <Link href={`/mentor/${mentor.id}`}>View Profile</Link>
        </Button>
      </div>
    </div>
  )
}
