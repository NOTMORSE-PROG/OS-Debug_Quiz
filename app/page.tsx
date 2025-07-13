"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, Trophy, Users, Clock, Lightbulb } from "lucide-react"
import QRCodeModal from "@/components/qr-code-modal"
import CodeEditor from "@/components/code-editor"
import NameInput from "@/components/name-input"
import Leaderboard from "@/components/leaderboard"
import Image from "next/image"

export default function HomePage() {
  const [currentView, setCurrentView] = useState<"home" | "qr" | "quiz" | "name" | "leaderboard">("home")
  const [selectedLanguage, setSelectedLanguage] = useState<string>("")
  const [quizScore, setQuizScore] = useState<number>(0)
  const [totalQuestions, setTotalQuestions] = useState<number>(0)
  const [completionTime, setCompletionTime] = useState<number>(0)

  const languages = [
    {
      name: "Python",
      icon: "🐍",
      description: "Fix Python syntax and logic errors",
      color: "bg-blue-500",
    },
    {
      name: "Java",
      icon: "☕",
      description: "Debug Java compilation errors",
      color: "bg-orange-500",
    },
    {
      name: "HTML",
      icon: "🌐",
      description: "Correct HTML markup issues",
      color: "bg-red-500",
    },
    {
      name: "CSS",
      icon: "🎨",
      description: "Fix CSS styling problems",
      color: "bg-purple-500",
    },
  ]

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language)
    setCurrentView("qr")
  }

  const handleStartQuiz = () => {
    setCurrentView("quiz")
  }

  const handleQuizComplete = (score: number, total: number, timeSpent: number) => {
    setQuizScore(score)
    setTotalQuestions(total)
    setCompletionTime(timeSpent)
    setCurrentView("name")
  }

  const handleNameSubmit = () => {
    setCurrentView("leaderboard")
  }

  const handleBackToHome = () => {
    setCurrentView("home")
    setSelectedLanguage("")
    setQuizScore(0)
    setTotalQuestions(0)
    setCompletionTime(0)
  }

  const handleViewLeaderboard = () => {
    setCurrentView("leaderboard")
  }

  if (currentView === "qr") {
    return <QRCodeModal language={selectedLanguage} onStart={handleStartQuiz} onBack={handleBackToHome} />
  }

  if (currentView === "quiz") {
    return <CodeEditor language={selectedLanguage} onComplete={handleQuizComplete} onBack={handleBackToHome} />
  }

  if (currentView === "name") {
    return (
      <NameInput
        score={quizScore}
        totalQuestions={totalQuestions}
        language={selectedLanguage}
        completionTime={completionTime}
        onSubmit={handleNameSubmit}
      />
    )
  }

  if (currentView === "leaderboard") {
    return <Leaderboard onBack={handleBackToHome} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/logo.png" alt="OpenSource Logo" width={60} height={60} className="rounded-lg" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">OpenSource Debug Challenge</h1>
                <p className="text-sm text-gray-600">T.I.P Manila Academic Club • 2025</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleViewLeaderboard}>
                <Trophy className="h-4 w-4 mr-2" />
                Leaderboard
              </Button>
              <Badge variant="outline" className="text-indigo-600 border-indigo-200">
                <Trophy className="h-4 w-4 mr-1" />
                Code Fixer
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Code Debugging</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fix real code errors by editing directly in the browser! Find syntax errors, missing semicolons, incorrect
            logic, and more. Each challenge shows broken code that you need to repair to get the expected output.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <h3 className="text-lg font-semibold">1 Minute</h3>
              <p className="text-gray-600">Per Challenge</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Code className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <h3 className="text-lg font-semibold">10 Challenges</h3>
              <p className="text-gray-600">Interactive Editing</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Lightbulb className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <h3 className="text-lg font-semibold">Hints Available</h3>
              <p className="text-gray-600">When You're Stuck</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <h3 className="text-lg font-semibold">Speed Matters</h3>
              <p className="text-gray-600">Faster = Higher Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Language Selection */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Your Language</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {languages.map((language) => (
              <Card
                key={language.name}
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handleLanguageSelect(language.name)}
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 ${language.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <span className="text-2xl">{language.icon}</span>
                  </div>
                  <CardTitle className="text-xl">{language.name}</CardTitle>
                  <CardDescription>{language.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-transparent" variant="outline">
                    Start {language.name} Challenge
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* New Scoring System */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
              Speed-Based Scoring System (2025)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Point System (Per Challenge):</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Lightning Fast ({"<"} 15s):</span>
                    <Badge className="bg-yellow-500">25 points</Badge>
                  </li>
                  <li className="flex justify-between">
                    <span>Quick Fix (15-30s):</span>
                    <Badge className="bg-green-500">20 points</Badge>
                  </li>
                  <li className="flex justify-between">
                    <span>Steady Progress (30-45s):</span>
                    <Badge variant="secondary">15 points</Badge>
                  </li>
                  <li className="flex justify-between">
                    <span>Got There (45-60s):</span>
                    <Badge variant="outline">10 points</Badge>
                  </li>
                  <li className="flex justify-between">
                    <span>Used Hint (-5 points):</span>
                    <Badge variant="destructive">Penalty</Badge>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Achievement Levels:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Code Ninja (200-250):</span>
                    <Badge className="bg-yellow-500">🥷 Master</Badge>
                  </li>
                  <li className="flex justify-between">
                    <span>Debug Expert (150-199):</span>
                    <Badge className="bg-blue-500">🔧 Expert</Badge>
                  </li>
                  <li className="flex justify-between">
                    <span>Bug Hunter (100-149):</span>
                    <Badge className="bg-green-500">🐛 Hunter</Badge>
                  </li>
                  <li className="flex justify-between">
                    <span>Code Learner ({"<"} 100):</span>
                    <Badge variant="outline">📚 Learning</Badge>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How the Interactive Debugging Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-red-100 p-4 rounded-lg mb-4">
                  <Code className="h-8 w-8 text-red-600 mx-auto" />
                </div>
                <h4 className="font-semibold mb-2">1. See Broken Code</h4>
                <p className="text-sm text-gray-600">
                  View code with syntax errors, missing punctuation, or logic issues
                </p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                  <Lightbulb className="h-8 w-8 text-yellow-600 mx-auto" />
                </div>
                <h4 className="font-semibold mb-2">2. Edit & Fix</h4>
                <p className="text-sm text-gray-600">
                  Directly edit the code to fix errors. Use hints if you're stuck!
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-lg mb-4">
                  <Trophy className="h-8 w-8 text-green-600 mx-auto" />
                </div>
                <h4 className="font-semibold mb-2">3. Get Points</h4>
                <p className="text-sm text-gray-600">Faster fixes earn more points. Compete for the top spot!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">© 2025 OpenSource Academic Club - T.I.P Manila</p>
            <p className="text-sm text-gray-500 mt-2">Interactive debugging challenges</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
