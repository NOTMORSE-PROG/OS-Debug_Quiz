"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Code, ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import { getRandomQuestions } from "@/lib/questions"

interface QuizProps {
  language: string
  onComplete: (score: number, total: number) => void
  onBack: () => void
}

export default function Quiz({ language, onComplete, onBack }: QuizProps) {
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [timeLeft, setTimeLeft] = useState(60)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())

  useEffect(() => {
    const randomQuestions = getRandomQuestions(language, 10)
    setQuestions(randomQuestions)
    setQuestionStartTime(Date.now())
  }, [language])

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleNextQuestion()
    }
  }, [timeLeft, showResult])

  const calculatePoints = (isCorrect: boolean, timeSpent: number) => {
    if (!isCorrect) return 0
    if (timeSpent < 30) return 15
    if (timeSpent < 45) return 10
    return 5
  }

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleNextQuestion = () => {
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000)
    const isCorrect = selectedAnswer === questions[currentQuestion]?.correctAnswer
    const points = calculatePoints(isCorrect, timeSpent)

    setScore(score + points)
    setAnswers([...answers, selectedAnswer])

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer("")
      setTimeLeft(60)
      setQuestionStartTime(Date.now())
    } else {
      setShowResult(true)
    }
  }

  const handleFinishQuiz = () => {
    onComplete(score, questions.length)
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p>Loading questions...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">{score}</div>
              <p className="text-gray-600">Total Points</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold">
                  {answers.filter((answer, index) => answer === questions[index]?.correctAnswer).length}
                </div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="font-semibold">
                  {answers.filter((answer, index) => answer !== questions[index]?.correctAnswer).length}
                </div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
            </div>

            <div className="text-center">
              <Badge
                className={
                  score >= 120
                    ? "bg-yellow-500"
                    : score >= 80
                      ? "bg-gray-400"
                      : score >= 40
                        ? "bg-orange-600"
                        : "bg-gray-600"
                }
              >
                {score >= 120
                  ? "🏆 Debug Master"
                  : score >= 80
                    ? "🥈 Code Detective"
                    : score >= 40
                      ? "🥉 Bug Hunter"
                      : "📚 Keep Learning"}
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

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit Quiz
            </Button>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">
                Question {currentQuestion + 1} of {questions.length}
              </Badge>
              <Badge className={timeLeft <= 10 ? "bg-red-500" : "bg-indigo-600"}>
                <Clock className="h-4 w-4 mr-1" />
                {timeLeft}s
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} />
        </div>

        {/* Question */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 mr-2" />
                Debug the {language} Code
              </CardTitle>
              <Badge>Score: {score}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{currentQ.code}</pre>
              </div>
            </div>

            <div className="space-y-3">
              {currentQ.options.map((option: string, index: number) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  className="w-full text-left justify-start h-auto p-4"
                  onClick={() => handleAnswerSelect(option)}
                >
                  <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={handleNextQuestion} disabled={!selectedAnswer} className="min-w-32">
                {currentQuestion + 1 === questions.length ? "Finish" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
