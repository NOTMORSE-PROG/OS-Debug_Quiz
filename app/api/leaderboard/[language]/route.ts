import { type NextRequest, NextResponse } from "next/server"
import { getLeaderboardByLanguage } from "@/lib/aws-config"

export async function GET(request: NextRequest, { params }: { params: { language: string } }) {
  try {
    const language = params.language
    const leaderboard = await getLeaderboardByLanguage(language)
    return NextResponse.json(leaderboard)
  } catch (error) {
    console.error("Error fetching leaderboard by language:", error)
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 })
  }
}
