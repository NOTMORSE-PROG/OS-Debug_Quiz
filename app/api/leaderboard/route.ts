import { type NextRequest, NextResponse } from "next/server"
import { getLeaderboard, saveScore } from "@/lib/aws-config"

export async function GET() {
  try {
    const leaderboard = await getLeaderboard()
    return NextResponse.json(leaderboard)
  } catch (error) {
    console.error("Error fetching leaderboard:", error)
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, email, score, language, totalQuestions, completionTime } = body

    // Validate required fields
    if (!name || !email || !score || !language || !totalQuestions || !completionTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate Gmail domain 
    if (!email.toLowerCase().endsWith("@gmail.com")) {
      return NextResponse.json({ error: "Please use a Gmail address" }, { status: 400 })
    }

    const entry = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      score: Number.parseInt(score),
      language,
      date: new Date().toISOString(),
      totalQuestions: Number.parseInt(totalQuestions),
      completionTime: Number.parseInt(completionTime),
      avgTimePerChallenge: Math.round(completionTime / totalQuestions),
    }

    await saveScore(entry)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving score:", error)
    return NextResponse.json({ error: "Failed to save score" }, { status: 500 })
  }
}
