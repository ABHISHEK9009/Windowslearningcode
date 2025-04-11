"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

export default function MentorRedirectPage() {
  const params = useParams()
  const router = useRouter()
  const mentorId = params.id as string

  useEffect(() => {
    router.push(`/learner/mentor/${mentorId}`)
  }, [mentorId, router])

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  )
}
