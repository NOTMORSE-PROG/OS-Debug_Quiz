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

    const { name, score, language, totalQuestions, completionTime } = body

    if (!name || !score || !language || !totalQuestions || !completionTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const entry = {
      name: name.trim(),
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
