"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Code, ArrowLeft, CheckCircle, XCircle, Lightbulb, Play, AlertCircle } from "lucide-react"
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

  const calculatePoints = (timeSpent: number, usedHint: boolean) => {
    let points = 0
    if (timeSpent < 15) points = 25
    else if (timeSpent < 30) points = 20
    else if (timeSpent < 45) points = 15
    else points = 10

    if (usedHint) points = Math.max(0, points - 5)
    return points
  }

  const checkSolution = () => {
    const currentChal = challenges[currentChallenge]
    const normalizedUserCode = userCode.trim().replace(/\s+/g, " ")
    const normalizedCorrectCode = currentChal.correctCode.trim().replace(/\s+/g, " ")

    if (normalizedUserCode === normalizedCorrectCode) {
      setFeedback({ type: "success", message: "Perfect! Code fixed successfully!" })
      setTimeout(() => handleNextChallenge(true), 1500)
    } else {
      setFeedback({ type: "error", message: "Not quite right. Check the expected output and try again!" })
      setTimeout(() => setFeedback({ type: "", message: "" }), 3000)
    }
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
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p>Loading challenges...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResult) {
    const avgTimePerChallenge = Math.round(totalTimeSpent / challenges.length)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Challenge Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">{score}</div>
              <p className="text-gray-600">Total Points</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold">
                  {Math.floor(totalTimeSpent / 60)}m {totalTimeSpent % 60}s
                </div>
                <div className="text-sm text-gray-600">Total Time</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold">{avgTimePerChallenge}s</div>
                <div className="text-sm text-gray-600">Avg per Challenge</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Code className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="font-semibold">{challenges.length}</div>
                <div className="text-sm text-gray-600">Challenges</div>
              </div>
            </div>

            <div className="text-center">
              <Badge
                className={
                  score >= 200
                    ? "bg-yellow-500"
                    : score >= 150
                      ? "bg-blue-500"
                      : score >= 100
                        ? "bg-green-500"
                        : "bg-gray-600"
                }
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

            <Button className="w-full" onClick={handleFinishQuiz}>
              Continue to Enter Name
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentChal = challenges[currentChallenge]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit Challenge
            </Button>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">
                Challenge {currentChallenge + 1} of {challenges.length}
              </Badge>
              <Badge className={timeLeft <= 10 ? "bg-red-500" : "bg-indigo-600"}>
                <Clock className="h-4 w-4 mr-1" />
                {timeLeft}s
              </Badge>
              <Badge className="bg-green-600">Score: {score}</Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(((currentChallenge + 1) / challenges.length) * 100)}%</span>
          </div>
          <Progress value={((currentChallenge + 1) / challenges.length) * 100} />
        </div>

        {/* Challenge */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Problem Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                Fix the {language} Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Problem:</h3>
                <p className="text-gray-700">{currentChal.description}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Expected Output:</h3>
                <div className="bg-green-50 border border-green-200 rounded p-3 font-mono text-sm">
                  {currentChal.expectedOutput}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Current Output:</h3>
                <div className="bg-red-50 border border-red-200 rounded p-3 font-mono text-sm">
                  {currentChal.currentOutput}
                </div>
              </div>

              {showHint && (
                <div>
                  <h3 className="font-semibold mb-2 text-yellow-600">💡 Hint:</h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm">{currentChal.hint}</div>
                </div>
              )}

              <div className="flex space-x-2">
                {!showHint && (
                  <Button variant="outline" size="sm" onClick={handleShowHint}>
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Show Hint (-5 pts)
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Code Editor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Code className="h-5 w-5 mr-2" />
                  Edit the Code
                </span>
                <Button onClick={checkSolution} disabled={!userCode.trim()}>
                  <Play className="h-4 w-4 mr-2" />
                  Test Fix
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="font-mono text-sm min-h-[300px] resize-none"
                  style={{ tabSize: 2 }}
                  placeholder="Edit the code here to fix the errors..."
                  spellCheck={false}
                />

                {feedback.message && (
                  <div
                    className={`p-3 rounded-lg flex items-center ${
                      feedback.type === "success"
                        ? "bg-green-50 border border-green-200 text-green-700"
                        : "bg-red-50 border border-red-200 text-red-700"
                    }`}
                  >
                    {feedback.type === "success" ? (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 mr-2" />
                    )}
                    {feedback.message}
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  💡 Tip: Look for missing semicolons, brackets, quotes, or incorrect syntax
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
