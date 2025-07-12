"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, Home, Calendar, Code, Clock, Zap, RefreshCw } from "lucide-react"

interface LeaderboardProps {
  onBack: () => void
}

interface LeaderboardEntry {
  id: string | number
  name: string
  score: number
  language: string
  date: string
  totalQuestions: number
  completionTime: number
  avgTimePerChallenge: number
}

export default function Leaderboard({ onBack }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLeaderboard = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Try to fetch from AWS DynamoDB first
      const response = await fetch("/api/leaderboard")

      if (response.ok) {
        const data = await response.json()
        setLeaderboard(data)
      } else {
        throw new Error("Failed to fetch from database")
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error)
      setError("Failed to load leaderboard from database")

      // Fallback to localStorage
      const localData = JSON.parse(localStorage.getItem("opensociety-leaderboard") || "[]")
      setLeaderboard(localData)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 1:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 2:
        return <Award className="h-6 w-6 text-orange-600" />
      default:
        return <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
    }
  }

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return <Badge className="bg-yellow-500">🏆 1st Place</Badge>
      case 1:
        return <Badge className="bg-gray-400">🥈 2nd Place</Badge>
      case 2:
        return <Badge className="bg-orange-600">🥉 3rd Place</Badge>
      default:
        return null
    }
  }

  const getLanguageIcon = (language: string) => {
    const icons = {
      Python: "🐍",
      Java: "☕",
      HTML: "🌐",
      CSS: "🎨",
    }
    return icons[language as keyof typeof icons] || "💻"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p>Loading leaderboard...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <h1 className="text-2xl font-bold text-gray-900">Speed Coding Leaderboard</h1>
              <Badge variant="outline" className="text-xs">
                2025
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={fetchLeaderboard} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button onClick={onBack}>
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Card className="mb-6 border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center text-yellow-800">
                <Trophy className="h-5 w-5 mr-2" />
                <span className="text-sm">{error}. Showing local data as fallback.</span>
              </div>
            </CardContent>
          </Card>
        )}

        {leaderboard.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No scores yet!</h3>
              <p className="text-gray-500">Be the first to complete a challenge and claim the top spot.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Top 3 Podium */}
            {leaderboard.length >= 3 && (
              <div className="grid grid-cols-3 gap-6 mb-8">
                {/* 2nd Place */}
                <Card className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300 transform translate-y-4">
                  <CardContent className="text-center py-6">
                    <Medal className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="font-bold text-lg truncate">{leaderboard[1].name}</h3>
                    <div className="text-2xl font-bold text-gray-600 mb-2">{leaderboard[1].score}</div>
                    <Badge variant="outline" className="mb-2">
                      {getLanguageIcon(leaderboard[1].language)} {leaderboard[1].language}
                    </Badge>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex items-center justify-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTime(leaderboard[1].avgTimePerChallenge)} avg
                      </div>
                      <div>{formatDate(leaderboard[1].date)}</div>
                    </div>
                  </CardContent>
                </Card>

                {/* 1st Place */}
                <Card className="bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-400 transform scale-105 shadow-lg">
                  <CardContent className="text-center py-6">
                    <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-3" />
                    <h3 className="font-bold text-xl truncate">{leaderboard[0].name}</h3>
                    <div className="text-3xl font-bold text-yellow-600 mb-2">{leaderboard[0].score}</div>
                    <Badge className="bg-yellow-500 mb-2">
                      {getLanguageIcon(leaderboard[0].language)} {leaderboard[0].language}
                    </Badge>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex items-center justify-center">
                        <Zap className="h-3 w-3 mr-1" />
                        {formatTime(leaderboard[0].avgTimePerChallenge)} avg
                      </div>
                      <div>{formatDate(leaderboard[0].date)}</div>
                    </div>
                  </CardContent>
                </Card>

                {/* 3rd Place */}
                <Card className="bg-gradient-to-br from-orange-100 to-orange-200 border-2 border-orange-400 transform translate-y-4">
                  <CardContent className="text-center py-6">
                    <Award className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                    <h3 className="font-bold text-lg truncate">{leaderboard[2].name}</h3>
                    <div className="text-2xl font-bold text-orange-600 mb-2">{leaderboard[2].score}</div>
                    <Badge variant="outline" className="mb-2">
                      {getLanguageIcon(leaderboard[2].language)} {leaderboard[2].language}
                    </Badge>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex items-center justify-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTime(leaderboard[2].avgTimePerChallenge)} avg
                      </div>
                      <div>{formatDate(leaderboard[2].date)}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Full Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle>All Scores - Speed Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((entry, index) => (
                    <div
                      key={entry.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        index < 3
                          ? index === 0
                            ? "bg-yellow-50 border-yellow-200"
                            : index === 1
                              ? "bg-gray-50 border-gray-200"
                              : "bg-orange-50 border-orange-200"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">{getRankIcon(index)}</div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold">{entry.name}</h3>
                            {getRankBadge(index)}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Code className="h-3 w-3 mr-1" />
                              {getLanguageIcon(entry.language)} {entry.language}
                            </span>
                            <span className="flex items-center">
                              <Zap className="h-3 w-3 mr-1" />
                              {formatTime(entry.avgTimePerChallenge)} avg
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(entry.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-indigo-600">{entry.score}</div>
                        <div className="text-xs text-gray-500">{formatTime(entry.completionTime)} total</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
