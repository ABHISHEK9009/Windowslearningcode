import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/" ||
    path === "/about" ||
    path === "/resources" ||
    path === "/terms" ||
    path === "/privacy" ||
    path === "/cookies" ||
    path === "/accessibility" ||
    path === "/become-mentor" ||
    path === "/mentor-registration" ||
    path.startsWith("/skills/") ||
    path.startsWith("/auth/")

  // Check if user is authenticated by looking for the user cookie
  const isAuthenticated = request.cookies.has("user")

  // Get the user role from the cookie
  const userCookie = request.cookies.get("user")?.value
  let role = null

  if (userCookie) {
    try {
      const user = JSON.parse(userCookie)
      role = user.role
    } catch (error) {
      console.error("Error parsing user cookie:", error)
    }
  }

  // If the path is not public and the user is not authenticated, redirect to login
  if (!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // If the user is trying to access a mentor-specific path but is not a mentor
  if (
    path.startsWith("/mentor") &&
    role !== "mentor" &&
    !path.startsWith("/mentor-registration") &&
    !path.startsWith("/mentor-profile-setup")
  ) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // If the user is trying to access a learner-specific path but is not a learner
  if (path.startsWith("/learner") && role !== "learner") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Continue with the request
  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
}
