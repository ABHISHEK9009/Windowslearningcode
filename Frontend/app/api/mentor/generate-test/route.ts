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
    const { field, subfield, difficulty } = await req.json()

    if (!field || !subfield || !difficulty) {
      return NextResponse.json({ error: "Missing required fields: field, subfield, and difficulty" }, { status: 400 })
    }

    // Call DeepSeek API
    const response = await fetch(`${API_CONFIG.DEEPSEEK.BASE_URL}${API_CONFIG.DEEPSEEK.ENDPOINTS.GENERATE_TEST}`, {
      method: "POST",
      headers: createDeepSeekHeaders(),
      body: JSON.stringify({ field, subfield, difficulty }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json({ error: "Failed to generate test", details: errorData }, { status: response.status })
    }

    const testData = await response.json()

    // Store test in database for later reference
    // This would be implemented with your database of choice
    // await db.tests.create({ userId, testId: testData.test_id, questions: testData.questions });

    return NextResponse.json(testData)
  } catch (error) {
    console.error("Error generating test:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
