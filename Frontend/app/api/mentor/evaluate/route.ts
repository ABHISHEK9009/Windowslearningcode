import { type NextRequest, NextResponse } from "next/server"
import { createDeepSeekHeaders, rateLimiter } from "@/lib/api-utils"
import { API_CONFIG } from "@/lib/api-config"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    // Check rate limit
    if (!rateLimiter.canMakeRequest(userId)) {
      const retryAfter = Math.ceil(rateLimiter.getRemainingTime(userId) / 1000)
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(retryAfter) },
        },
      )
    }

    // Parse request body
    const { test_id, answers, video_proctoring } = await req.json()

    if (!test_id || !answers) {
      return NextResponse.json({ error: "Missing required fields: test_id and answers" }, { status: 400 })
    }

    // Call DeepSeek API
    const response = await fetch(`${API_CONFIG.DEEPSEEK.BASE_URL}${API_CONFIG.DEEPSEEK.ENDPOINTS.EVALUATE}`, {
      method: "POST",
      headers: createDeepSeekHeaders(),
      body: JSON.stringify({ test_id, answers, video_proctoring }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json({ error: "Failed to evaluate test", details: errorData }, { status: response.status })
    }

    const evaluationResult = await response.json()

    // Update mentor status based on score
    const isApproved = evaluationResult.score >= 80

    // This would be implemented with your database of choice
    // await db.mentors.update({
    //   where: { userId },
    //   data: {
    //     verified: isApproved,
    //     testScore: evaluationResult.score,
    //     testFeedback: evaluationResult.feedback
    //   }
    // });

    // If rejected, send email with feedback
    if (!isApproved) {
      // await sendRejectionEmail(userId, evaluationResult.feedback);
    }

    return NextResponse.json({
      ...evaluationResult,
      approved: isApproved,
    })
  } catch (error) {
    console.error("Error evaluating test:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
