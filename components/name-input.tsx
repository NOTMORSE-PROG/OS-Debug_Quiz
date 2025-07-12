"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Trophy, User, Clock, Zap } from "lucide-react"

interface NameInputProps {
  score: number
  totalQuestions: number
  language: string
  completionTime: number
  onSubmit: () => void
}

export default function NameInput({ score, totalQuestions, language, completionTime, onSubmit }: NameInputProps) {
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      // Save to localStorage
      const leaderboardData = JSON.parse(localStorage.getItem("opensociety-leaderboard") || "[]")
      const newEntry = {
        id: Date.now(),
        name: name.trim(),
        score,
        language,
        date: new Date().toISOString(),
        totalQuestions,
        completionTime,
        avgTimePerChallenge: Math.round(completionTime / totalQuestions),
      }
      leaderboardData.push(newEntry)
      leaderboardData.sort((a: any, b: any) => b.score - a.score)
      localStorage.setItem("opensociety-leaderboard", JSON.stringify(leaderboardData))

      onSubmit()
    }
  }

  const getPerformanceLevel = (score: number) => {
    if (score >= 200) return { level: "Code Ninja", badge: "🥷 Master", color: "bg-yellow-500" }
    if (score >= 150) return { level: "Debug Expert", badge: "🔧 Expert", color: "bg-blue-500" }
    if (score >= 100) return { level: "Bug Hunter", badge: "🐛 Hunter", color: "bg-green-500" }
    return { level: "Code Learner", badge: "📚 Learning", color: "bg-gray-600" }
  }

  const performance = getPerformanceLevel(score)
  const avgTime = Math.round(completionTime / totalQuestions)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <CardTitle className="text-2xl">Outstanding Work!</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg">
              <div className="text-3xl font-bold mb-2">{score} Points</div>
              <div className="text-indigo-100">{language} Debug Challenge</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                <div className="font-semibold">
                  {Math.floor(completionTime / 60)}m {completionTime % 60}s
                </div>
                <div className="text-xs text-gray-600">Total Time</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <Zap className="h-6 w-6 text-green-600 mx-auto mb-1" />
                <div className="font-semibold">{avgTime}s</div>
                <div className="text-xs text-gray-600">Avg/Challenge</div>
              </div>
            </div>

            <Badge className={performance.color}>{performance.badge}</Badge>

            <div className="text-sm text-gray-600">
              <p>
                You achieved <strong>{performance.level}</strong> level!
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your name for the leaderboard:
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  maxLength={50}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={!name.trim()}>
              Submit to Leaderboard
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
