"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Trophy, User, Clock, Zap, Mail, Sparkles, Star, Crown, Target } from "lucide-react"

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
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const [showCelebration, setShowCelebration] = useState(false)

  // Create celebration particles
  useEffect(() => {
    setShowCelebration(true)
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)
  }, [])

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
    if (score >= 200)
      return {
        level: "Code Ninja",
        badge: "🥷 Master",
        color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
        icon: Crown,
      }
    if (score >= 150)
      return {
        level: "Debug Expert",
        badge: "🔧 Expert",
        color: "bg-gradient-to-r from-blue-400 to-blue-600",
        icon: Target,
      }
    if (score >= 100)
      return {
        level: "Bug Hunter",
        badge: "🐛 Hunter",
        color: "bg-gradient-to-r from-green-400 to-green-600",
        icon: Zap,
      }
    return {
      level: "Code Learner",
      badge: "📚 Learning",
      color: "bg-gradient-to-r from-gray-400 to-gray-600",
      icon: Star,
    }
  }

  const performance = getPerformanceLevel(score)
  const avgTime = Math.round(completionTime / totalQuestions)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Celebration Particles */}
      {showCelebration &&
        particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-float pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: "4s",
            }}
          >
            <Sparkles className="h-4 w-4 text-indigo-400 opacity-70" />
          </div>
        ))}

      <Card className="w-full max-w-md transform hover:scale-105 transition-all duration-500 shadow-2xl border-0 bg-white/90 backdrop-blur-sm animate-slide-up">
        <CardHeader className="text-center relative">
          <div className="mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full animate-pulse"></div>
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4 animate-bounce-gentle relative z-10" />
            <div className="absolute top-0 right-0 animate-spin-slow">
              <Star className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="absolute bottom-0 left-0 animate-spin-slow" style={{ animationDirection: "reverse" }}>
              <Sparkles className="h-5 w-5 text-indigo-400" />
            </div>
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
            Outstanding Work!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden group animate-fade-in">
              <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="text-3xl font-bold mb-2 relative z-10 animate-number-pop">{score} Points</div>
              <div className="text-indigo-100 relative z-10">{language} Debug Challenge</div>
              <div className="absolute top-2 right-2 opacity-50">
                <performance.icon className="h-8 w-8 animate-pulse" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg transform hover:scale-105 transition-all duration-300 hover:shadow-md animate-slide-in-left">
                <Clock className="h-6 w-6 text-blue-600 mx-auto mb-1 animate-tick" />
                <div className="font-semibold">
                  {Math.floor(completionTime / 60)}m {completionTime % 60}s
                </div>
                <div className="text-xs text-gray-600">Total Time</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg transform hover:scale-105 transition-all duration-300 hover:shadow-md animate-slide-in-right">
                <Zap className="h-6 w-6 text-green-600 mx-auto mb-1 animate-pulse" />
                <div className="font-semibold">{avgTime}s</div>
                <div className="text-xs text-gray-600">Avg/Challenge</div>
              </div>
            </div>

            <div className="animate-bounce-in">
              <Badge className={`${performance.color} text-white px-4 py-2 text-lg shadow-lg animate-pulse`}>
                {performance.badge}
              </Badge>
            </div>

            <div className="text-sm text-gray-600 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <p>
                You achieved <strong className="text-indigo-600">{performance.level}</strong> level!
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your name for the leaderboard:
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300"
                  maxLength={50}
                  required
                  disabled={isSubmitting}
                />
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your Gmail address:
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300"
                  maxLength={100}
                  required
                  disabled={isSubmitting}
                />
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <Sparkles className="h-3 w-3 mr-1" />📧 Your email will be stored securely and not displayed publicly
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm animate-shake flex items-center">
                <Target className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-xl transform text-lg py-6 relative overflow-hidden group"
              disabled={!name.trim() || !email.trim() || isSubmitting}
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  <span className="relative z-10">Saving...</span>
                </>
              ) : (
                <>
                  <Trophy className="h-5 w-5 mr-2 animate-pulse relative z-10" />
                  <span className="relative z-10">Submit to Leaderboard</span>
                </>
              )}
            </Button>
          </form>

          <div className="text-xs text-gray-500 text-center animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <p className="flex items-center justify-center">
              <Sparkles className="h-3 w-3 mr-1" />🔒 Your personal information is protected and stored securely
            </p>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        
        @keyframes number-pop {
          0% { transform: scale(0.8); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        
        @keyframes tick {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-slide-up { animation: slide-up 0.6s ease-out; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-slide-in-left { animation: slide-in-left 0.5s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.5s ease-out; }
        .animate-bounce-in { animation: bounce-in 0.8s ease-out; }
        .animate-bounce-gentle { animation: bounce-gentle 3s ease-in-out infinite; }
        .animate-number-pop { animation: number-pop 0.6s ease-out; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-tick { animation: tick 2s ease-in-out infinite; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  )
}
