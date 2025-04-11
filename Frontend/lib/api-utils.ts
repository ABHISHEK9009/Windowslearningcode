import { API_CONFIG } from "./api-config"

/**
 * Creates headers for DeepSeek API requests with proper authorization
 */
export const createDeepSeekHeaders = () => {
  // Get API key from environment variables
  const apiKey = process.env.DEEPSEEK_API_KEY

  if (!apiKey) {
    throw new Error("DeepSeek API key is not configured")
  }

  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  }
}

/**
 * Rate limiter for API requests
 * Tracks requests per user to enforce rate limits
 */
class RateLimiter {
  private requestCounts: Map<string, { count: number; resetTime: number }> = new Map()

  canMakeRequest(userId: string): boolean {
    const now = Date.now()
    const userRequests = this.requestCounts.get(userId)

    // If no previous requests or reset time has passed
    if (!userRequests || now > userRequests.resetTime) {
      this.requestCounts.set(userId, {
        count: 1,
        resetTime: now + 60000, // Reset after 1 minute
      })
      return true
    }

    // Check if under rate limit
    if (userRequests.count < API_CONFIG.DEEPSEEK.RATE_LIMIT.REQUESTS_PER_MINUTE) {
      this.requestCounts.set(userId, {
        count: userRequests.count + 1,
        resetTime: userRequests.resetTime,
      })
      return true
    }

    return false
  }

  getRemainingTime(userId: string): number {
    const userRequests = this.requestCounts.get(userId)
    if (!userRequests) return 0

    return Math.max(0, userRequests.resetTime - Date.now())
  }
}

export const rateLimiter = new RateLimiter()
