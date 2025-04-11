import { NextResponse } from "next/server"

export async function GET() {
  // In a real application, these would be fetched from your database
  const metrics = {
    mentors: 4000,
    successRate: 95,
    activeLearners: 12000,
  }

  return NextResponse.json(metrics)
}
