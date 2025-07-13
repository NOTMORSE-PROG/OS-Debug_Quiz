"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
  Clock,
  Code,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Lightbulb,
  Play,
  AlertCircle,
  Zap,
  Sparkles,
  Target,
  Trophy,
  FlameIcon as Fire,
} from "lucide-react"
import { getRandomChallenges } from "@/lib/challenges"

interface CodeEditorProps {
  language: string
  onComplete: (score: number, total: number, timeSpent: number) => void
  onBack: () => void
}

export default function CodeEditor({ language, onComplete, onBack }: CodeEditorProps) {
  const [challenges, setChallenges] = useState<any[]>([])
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [userCode, setUserCode] = useState("")
  const [timeLeft, setTimeLeft] = useState(60)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [challengeStartTime, setChallengeStartTime] = useState(Date.now())
  const [showHint, setShowHint] = useState(false)
  const [hintUsed, setHintUsed] = useState(false)
  const [totalTimeSpent, setTotalTimeSpent] = useState(0)
  const [feedback, setFeedback] = useState<{ type: "success" | "error" | ""; message: string }>({
    type: "",
    message: "",
  })
  const [isTyping, setIsTyping] = useState(false)
  const [streak, setStreak] = useState(0)
  const [showStreakAnimation, setShowStreakAnimation] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    const randomChallenges = getRandomChallenges(language, 10)
    setChallenges(randomChallenges)
    if (randomChallenges.length > 0) {
      setUserCode(randomChallenges[0].brokenCode)
    }
    setChallengeStartTime(Date.now())
  }, [language])

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleNextChallenge(false)
    }
  }, [timeLeft, showResult])

  // Typing indicator
  useEffect(() => {
    setIsTyping(true)
    const timer = setTimeout(() => setIsTyping(false), 1000)
    return () => clearTimeout(timer)
  }, [userCode])

  // Particle effect for success
  const createParticles = () => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 2000)
  }

  const calculatePoints = (timeSpent: number, usedHint: boolean) => {
    let points = 0
    if (timeSpent < 15) points = 25
    else if (timeSpent < 30) points = 20
    else if (timeSpent < 45) points = 15
    else points = 10

    if (usedHint) points = Math.max(0, points - 5)
    return points
  }

  // Enhanced normalization functions (keeping the improved logic from previous version)
  const normalizeCode = (code: string) => {
    return code
      .trim()
      .replace(/\r\n/g, "\n")
      .replace(/\t/g, "    ")
      .replace(/\s+$/gm, "")
      .replace(/^\s+$/gm, "")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/\s*\n\s*/g, "\n")
      .replace(/\s+/g, " ")
      .replace(/\s*([{}();,])\s*/g, "$1")
      .replace(/\s*=\s*/g, "=")
      .replace(/\s*:\s*/g, ":")
      .replace(/\s*\+\s*/g, "+")
      .replace(/\s*-\s*/g, "-")
      .replace(/\s*\*\s*/g, "*")
      .replace(/\s*\/\s*/g, "/")
      .replace(/\s*<\s*/g, "<")
      .replace(/\s*>\s*/g, ">")
      .replace(/\s*==\s*/g, "==")
      .replace(/\s*!=\s*/g, "!=")
      .replace(/\s*<=\s*/g, "<=")
      .replace(/\s*>=\s*/g, ">=")
      .toLowerCase()
  }

  const checkSolution = () => {
    const currentChal = challenges[currentChallenge]
    const normalizedUserCode = normalizeCode(userCode)
    const normalizedCorrectCode = normalizeCode(currentChal.correctCode)

    if (normalizedUserCode === normalizedCorrectCode || checkLanguageSpecificFix(userCode, currentChal, language)) {
      setFeedback({ type: "success", message: "🎉 Perfect! Code fixed successfully!" })
      createParticles()
      setStreak((prev) => prev + 1)
      setShowStreakAnimation(true)
      setTimeout(() => setShowStreakAnimation(false), 2000)
      setTimeout(() => handleNextChallenge(true), 1500)
      return
    }

    setFeedback({ type: "error", message: "🤔 Not quite right. Check the expected output and try again!" })
    setStreak(0)
    setTimeout(() => setFeedback({ type: "", message: "" }), 3000)
  }

  const checkLanguageSpecificFix = (userCode: string, challenge: any, lang: string) => {
    const userNormalized = userCode.toLowerCase().trim()

    switch (lang.toLowerCase()) {
      case "python":
        if (challenge.description.includes("missing closing parenthesis")) {
          return userNormalized.includes("print(") && userNormalized.includes(")")
        }
        if (challenge.description.includes("indentation")) {
          return userNormalized.includes("    print(") || userNormalized.includes("\tprint(")
        }
        if (challenge.description.includes("colon")) {
          return userNormalized.includes(":")
        }
        break
      case "java":
        if (challenge.description.includes("semicolon")) {
          const userSemicolons = (userCode.match(/;/g) || []).length
          const correctSemicolons = (challenge.correctCode.match(/;/g) || []).length
          return userSemicolons >= correctSemicolons
        }
        break
      case "html":
        if (challenge.description.includes("closing tag")) {
          const openTags = userCode.match(/<[^/][^>]*>/g) || []
          const closeTags = userCode.match(/<\/[^>]*>/g) || []
          return openTags.length <= closeTags.length
        }
        if (challenge.description.includes("quote")) {
          return userCode.includes('"') && userCode.split('"').length % 2 === 1
        }
        break
      case "css":
        if (challenge.description.includes("semicolon")) {
          const userSemicolons = (userCode.match(/;/g) || []).length
          const correctSemicolons = (challenge.correctCode.match(/;/g) || []).length
          return userSemicolons >= correctSemicolons
        }
        if (challenge.description.includes("closing brace")) {
          const openBraces = (userCode.match(/{/g) || []).length
          const closeBraces = (userCode.match(/}/g) || []).length
          return openBraces === closeBraces
        }
        break
    }
    return false
  }

  const handleNextChallenge = (isCorrect: boolean) => {
    const timeSpent = Math.floor((Date.now() - challengeStartTime) / 1000)
    const points = isCorrect ? calculatePoints(timeSpent, hintUsed) : 0

    setScore(score + points)
    setTotalTimeSpent(totalTimeSpent + timeSpent)

    if (currentChallenge + 1 < challenges.length) {
      setCurrentChallenge(currentChallenge + 1)
      setUserCode(challenges[currentChallenge + 1].brokenCode)
      setTimeLeft(60)
      setChallengeStartTime(Date.now())
      setShowHint(false)
      setHintUsed(false)
      setFeedback({ type: "", message: "" })
    } else {
      setShowResult(true)
    }
  }

  const handleShowHint = () => {
    setShowHint(true)
    setHintUsed(true)
  }

  const handleFinishQuiz = () => {
    onComplete(score, challenges.length, totalTimeSpent)
  }

  if (challenges.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="transform hover:scale-105 transition-all duration-300 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="animate-pulse">Loading challenges...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResult) {
    const avgTimePerChallenge = Math.round(totalTimeSpent / challenges.length)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Celebration particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-ping pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDuration: "1.5s",
            }}
          >
            <Sparkles className="h-6 w-6 text-yellow-400" />
          </div>
        ))}

        <Card className="w-full max-w-2xl transform hover:scale-105 transition-all duration-500 shadow-2xl border-0 bg-white/90 backdrop-blur-sm animate-fade-in">
          <CardHeader className="text-center relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Trophy className="h-16 w-16 text-yellow-500 animate-bounce-gentle" />
            </div>
            <CardTitle className="text-2xl mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Challenge Complete!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center animate-scale-in">
              <div className="text-4xl font-bold text-indigo-600 mb-2 animate-number-count">{score}</div>
              <p className="text-gray-600">Total Points</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div
                className="text-center p-4 bg-blue-50 rounded-lg transform hover:scale-105 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2 animate-pulse" />
                <div className="font-semibold">
                  {Math.floor(totalTimeSpent / 60)}m {totalTimeSpent % 60}s
                </div>
                <div className="text-sm text-gray-600">Total Time</div>
              </div>
              <div
                className="text-center p-4 bg-green-50 rounded-lg transform hover:scale-105 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2 animate-pulse" />
                <div className="font-semibold">{avgTimePerChallenge}s</div>
                <div className="text-sm text-gray-600">Avg per Challenge</div>
              </div>
              <div
                className="text-center p-4 bg-purple-50 rounded-lg transform hover:scale-105 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: "0.3s" }}
              >
                <Code className="h-8 w-8 text-purple-600 mx-auto mb-2 animate-pulse" />
                <div className="font-semibold">{challenges.length}</div>
                <div className="text-sm text-gray-600">Challenges</div>
              </div>
            </div>

            <div className="text-center animate-bounce-in">
              <Badge
                className={`text-lg px-6 py-2 ${
                  score >= 200
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                    : score >= 150
                      ? "bg-gradient-to-r from-blue-400 to-blue-600"
                      : score >= 100
                        ? "bg-gradient-to-r from-green-400 to-green-600"
                        : "bg-gradient-to-r from-gray-400 to-gray-600"
                } animate-pulse shadow-lg`}
              >
                {score >= 200
                  ? "🥷 Code Ninja"
                  : score >= 150
                    ? "🔧 Debug Expert"
                    : score >= 100
                      ? "🐛 Bug Hunter"
                      : "📚 Code Learner"}
              </Badge>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-xl transform text-lg py-6 relative overflow-hidden group"
              onClick={handleFinishQuiz}
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <Trophy className="h-5 w-5 mr-2 animate-pulse relative z-10" />
              <span className="relative z-10">Continue to Enter Name</span>
            </Button>
          </CardContent>
        </Card>

        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes scale-in {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
          
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes bounce-in {
            0% { opacity: 0; transform: scale(0.3); }
            50% { opacity: 1; transform: scale(1.1); }
            100% { opacity: 1; transform: scale(1); }
          }
          
          @keyframes bounce-gentle {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-10px) scale(1.1); }
          }
          
          @keyframes number-count {
            from { transform: scale(0); }
            to { transform: scale(1); }
          }
          
          .animate-fade-in { animation: fade-in 0.8s ease-out; }
          .animate-scale-in { animation: scale-in 0.6s ease-out; }
          .animate-slide-up { animation: slide-up 0.5s ease-out; }
          .animate-bounce-in { animation: bounce-in 0.8s ease-out; }
          .animate-bounce-gentle { animation: bounce-gentle 3s ease-in-out infinite; }
          .animate-number-count { animation: number-count 0.8s ease-out; }
        `}</style>
      </div>
    )
  }

  const currentChal = challenges[currentChallenge]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-ping"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDuration: "2s",
            }}
          >
            <Sparkles className="h-4 w-4 text-green-400 opacity-60" />
          </div>
        ))}
      </div>

      {/* Streak Animation */}
      {showStreakAnimation && streak > 1 && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce-in pointer-events-none">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center space-x-2">
            <Fire className="h-6 w-6 animate-pulse" />
            <span className="text-xl font-bold">{streak}x Streak!</span>
            <Fire className="h-6 w-6 animate-pulse" />
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="hover:bg-gray-100 transition-all duration-200 hover:scale-110"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit Challenge
            </Button>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="animate-pulse">
                Challenge {currentChallenge + 1} of {challenges.length}
              </Badge>
              <Badge
                className={`${timeLeft <= 10 ? "bg-red-500 animate-pulse" : "bg-indigo-600"} transition-all duration-300`}
              >
                <Clock className="h-4 w-4 mr-1" />
                {timeLeft}s
              </Badge>
              <Badge className="bg-green-600 animate-pulse">
                <Target className="h-4 w-4 mr-1" />
                Score: {score}
              </Badge>
              {streak > 1 && (
                <Badge className="bg-gradient-to-r from-orange-400 to-red-500 animate-bounce">
                  <Fire className="h-4 w-4 mr-1" />
                  {streak}x
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span className="animate-pulse">Progress</span>
            <span className="font-bold">{Math.round(((currentChallenge + 1) / challenges.length) * 100)}%</span>
          </div>
          <div className="relative">
            <Progress
              value={((currentChallenge + 1) / challenges.length) * 100}
              className="h-3 transition-all duration-500"
            />
            <div
              className="absolute top-0 left-0 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500 animate-pulse"
              style={{ width: `${((currentChallenge + 1) / challenges.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Challenge */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Problem Description */}
          <Card className="transform hover:scale-105 transition-all duration-300 shadow-xl border-0 bg-white/90 backdrop-blur-sm animate-slide-in-left">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-red-500 animate-pulse" />
                Fix the {language} Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="animate-fade-in">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Target className="h-4 w-4 mr-2 text-indigo-500" />
                  Problem:
                </h3>
                <p className="text-gray-700">{currentChal.description}</p>
              </div>

              <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <h3 className="font-semibold mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Expected Output:
                </h3>
                <div className="bg-green-50 border border-green-200 rounded p-3 font-mono text-sm hover:bg-green-100 transition-colors duration-200">
                  {currentChal.expectedOutput}
                </div>
              </div>

              <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <h3 className="font-semibold mb-2 flex items-center">
                  <XCircle className="h-4 w-4 mr-2 text-red-500" />
                  Current Output:
                </h3>
                <div className="bg-red-50 border border-red-200 rounded p-3 font-mono text-sm hover:bg-red-100 transition-colors duration-200">
                  {currentChal.currentOutput}
                </div>
              </div>

              {showHint && (
                <div className="animate-bounce-in">
                  <h3 className="font-semibold mb-2 text-yellow-600 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2 animate-pulse" />💡 Hint:
                  </h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm hover:bg-yellow-100 transition-colors duration-200">
                    {currentChal.hint}
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                {!showHint && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShowHint}
                    className="hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-200 hover:scale-105 bg-transparent"
                  >
                    <Lightbulb className="h-4 w-4 mr-2 animate-pulse" />
                    Show Hint (-5 pts)
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Code Editor */}
          <Card className="transform hover:scale-105 transition-all duration-300 shadow-xl border-0 bg-white/90 backdrop-blur-sm animate-slide-in-right">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Code className="h-5 w-5 mr-2 animate-pulse" />
                  Edit the Code
                  {isTyping && (
                    <span className="ml-2 text-sm text-green-500 animate-pulse flex items-center">
                      <Zap className="h-3 w-3 mr-1" />
                      Typing...
                    </span>
                  )}
                </span>
                <Button
                  onClick={checkSolution}
                  disabled={!userCode.trim()}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className="h-4 w-4 mr-2 animate-pulse" />
                  Test Fix
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className="font-mono text-sm min-h-[300px] resize-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300"
                    style={{ tabSize: 2 }}
                    placeholder="Edit the code here to fix the errors..."
                    spellCheck={false}
                  />
                  {isTyping && (
                    <div className="absolute top-2 right-2 bg-green-100 text-green-700 px-2 py-1 rounded text-xs animate-pulse">
                      <Zap className="h-3 w-3 inline mr-1" />
                      Active
                    </div>
                  )}
                </div>

                {feedback.message && (
                  <div
                    className={`p-3 rounded-lg flex items-center transform transition-all duration-300 hover:scale-105 ${
                      feedback.type === "success"
                        ? "bg-green-50 border border-green-200 text-green-700 animate-bounce-in"
                        : "bg-red-50 border border-red-200 text-red-700 animate-shake"
                    }`}
                  >
                    {feedback.type === "success" ? (
                      <CheckCircle className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <XCircle className="h-4 w-4 mr-2 animate-pulse" />
                    )}
                    {feedback.message}
                  </div>
                )}

                <div className="text-xs text-gray-500 flex items-center animate-pulse">
                  <Sparkles className="h-3 w-3 mr-1" />💡 Tip: Look for missing semicolons, brackets, quotes, or
                  incorrect syntax
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <style jsx>{`
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-slide-in-left { animation: slide-in-left 0.6s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.6s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-bounce-in { animation: bounce-in 0.6s ease-out; }
      `}</style>
    </div>
  )
}
