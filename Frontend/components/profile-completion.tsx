"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

interface ProfileCompletionItem {
  name: string
  completed: boolean
  link: string
}

interface ProfileCompletionProps {
  percentage: number
  items: ProfileCompletionItem[]
  className?: string
}

export function ProfileCompletion({ percentage, items, className = "" }: ProfileCompletionProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Profile Completion</CardTitle>
        <CardDescription>Complete your profile to attract more learners</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center py-4">
          <div className="relative h-32 w-32">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{percentage}%</span>
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
                strokeDashoffset={251.2 - (251.2 * percentage) / 100}
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>
        </div>
        <div className="space-y-2 mt-4">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center">
                {item.completed ? (
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <XCircle className="h-4 w-4 text-amber-500 mr-2" />
                )}
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <span className="text-sm">
                {item.completed ? (
                  "Complete"
                ) : (
                  <Link href={item.link} className="text-primary hover:underline">
                    Complete
                  </Link>
                )}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href="/settings">Complete Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
