"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Trophy, User, Clock, Zap, Mail } from "lucide-react"

interface NameInputProps {
  score: number
  totalQuestions: number
  language: string
  completionTime: number
  onSubmit: () => void
}

export default function NameInput({ score, totalQuestions, language, completionTime, onSubmit }: NameInputProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name.trim() || !email.trim()) {
      setError("Please fill in both name and email")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!email.toLowerCase().endsWith("@gmail.com")) {
      setError("Please use a Gmail address")
      return
    }

    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      // Save to AWS DynamoDB via API
      const response = await fetch("/api/leaderboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          score,
          language,
          totalQuestions,
          completionTime,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        // Also save to localStorage as backup 
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
      } else {
        setError(result.error || "Failed to save score")
      }
    } catch (error) {
      console.error("Error saving score:", error)
      setError("Network error. Please try again.")

      // Fallback to localStorage only 
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
    } finally {
      setIsSubmitting(false)
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
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  maxLength={50}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your Gmail address:
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  maxLength={100}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                📧 Your email will be stored securely and not displayed publicly
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">{error}</div>
            )}

            <Button type="submit" className="w-full" disabled={!name.trim() || !email.trim() || isSubmitting}>
              {isSubmitting ? "Saving..." : "Submit to Leaderboard"}
            </Button>
          </form>

          <div className="text-xs text-gray-500 text-center">
            <p>🔒 Your personal information is protected and stored securely</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
