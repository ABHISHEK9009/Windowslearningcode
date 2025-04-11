"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Review {
  id: number | string
  learner: {
    name: string
    avatar: string
  }
  rating: number
  date: string
  comment: string
}

interface MentorReviewsProps {
  reviews: Review[]
  averageRating: number
  totalReviews: number
  className?: string
}

export function MentorReviews({ reviews, averageRating, totalReviews, className = "" }: MentorReviewsProps) {
  const [sortBy, setSortBy] = useState("recent")
  const [currentPage, setCurrentPage] = useState(1)
  const reviewsPerPage = 3

  // Sort reviews based on selected option
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortBy === "highest") {
      return b.rating - a.rating
    } else if (sortBy === "lowest") {
      return a.rating - b.rating
    }
    return 0
  })

  // Calculate pagination
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage)
  const indexOfLastReview = currentPage * reviewsPerPage
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage
  const currentReviews = sortedReviews.slice(indexOfFirstReview, indexOfLastReview)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Reviews</CardTitle>
            <CardDescription>What learners are saying</CardDescription>
          </div>
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(averageRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : i < averageRating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-bold ml-2">{averageRating.toFixed(1)}</span>
            <span className="text-muted-foreground ml-1">({totalReviews} reviews)</span>
          </div>
        </div>

        <div className="flex justify-end mt-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {currentReviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-0 last:pb-0">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.learner.avatar} alt={review.learner.name} />
                  <AvatarFallback>{review.learner.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{review.learner.name}</h3>
                    <span className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex mt-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
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
      {totalPages > 1 && (
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
