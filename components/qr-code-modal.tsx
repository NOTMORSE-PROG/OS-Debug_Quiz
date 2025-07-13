"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Play, ArrowLeft, Sparkles, Zap } from "lucide-react"
import Image from "next/image"

interface QRCodeModalProps {
  language: string
  onStart: () => void
  onBack: () => void
}

export default function QRCodeModal({ language, onStart, onBack }: QRCodeModalProps) {
  const [showQR, setShowQR] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])

  const languageColors = {
    Python: "bg-blue-500",
    Java: "bg-orange-500",
    HTML: "bg-red-500",
    CSS: "bg-purple-500",
  }

  const languageIcons = {
    Python: "🐍",
    Java: "☕",
    HTML: "🌐",
    CSS: "🎨",
  }

  // Sparkle animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) => [
        ...prev.slice(-8), // Keep only last 8 sparkles
        {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
        },
      ])
    }, 800)

    return () => clearInterval(interval)
  }, [])

  const handleTransition = (callback: () => void) => {
    setIsAnimating(true)
    setTimeout(() => {
      callback()
      setIsAnimating(false)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute animate-ping"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDuration: "2s",
            }}
          >
            <Sparkles className="h-4 w-4 text-indigo-300 opacity-60" />
          </div>
        ))}
      </div>

      <Card
        className={`w-full max-w-md transform transition-all duration-500 hover:scale-105 ${isAnimating ? "scale-95 opacity-50" : "scale-100 opacity-100"} shadow-2xl border-0 bg-white/90 backdrop-blur-sm`}
      >
        <CardHeader className="text-center relative">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleTransition(onBack)}
              className="hover:bg-gray-100 transition-all duration-200 hover:scale-110"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Badge className={`${languageColors[language as keyof typeof languageColors]} animate-pulse shadow-lg`}>
              <span className="animate-bounce inline-block">
                {languageIcons[language as keyof typeof languageIcons]}
              </span>
              <span className="ml-2">{language}</span>
            </Badge>
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
            Ready to Debug?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {showQR ? (
            <div className="text-center animate-fade-in">
              <p className="text-gray-600 mb-4 animate-slide-up">
                Scan the QR code to access additional resources for this challenge
              </p>

              {/* Enhanced QR Code with animations */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4 mb-4 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:border-indigo-300 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Image
                  src="/qr-code.png"
                  alt="OpenSource QR Code"
                  width={200}
                  height={200}
                  className="mx-auto relative z-10 animate-gentle-bounce"
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Zap className="h-5 w-5 text-indigo-500 animate-pulse" />
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent hover:bg-gray-50 transition-all duration-200 hover:scale-105 hover:shadow-md"
                  onClick={() => handleTransition(() => setShowQR(false))}
                >
                  <X className="h-4 w-4 mr-2 animate-spin-slow" />
                  Skip QR
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 hover:shadow-lg transform"
                  onClick={() => handleTransition(() => setShowQR(false))}
                >
                  <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                  Scanned
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4 animate-fade-in">
              <div
                className={`w-20 h-20 ${languageColors[language as keyof typeof languageColors]} rounded-full flex items-center justify-center mx-auto transform hover:scale-110 transition-all duration-300 hover:shadow-xl animate-bounce-gentle relative group`}
              >
                <span className="text-3xl animate-pulse">{languageIcons[language as keyof typeof languageIcons]}</span>
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {language} Debug Challenge
              </h3>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 text-left transform hover:scale-105 transition-all duration-300 hover:shadow-md">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-indigo-500 animate-pulse" />
                  Challenge Rules:
                </h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
                    • 10 interactive code fixing challenges
                  </li>
                  <li className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                    • 1 minute per challenge
                  </li>
                  <li className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
                    • Edit code directly to fix errors
                  </li>
                  <li className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
                    • Faster fixes = higher points
                  </li>
                  <li className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
                    • Hints available (but cost points!)
                  </li>
                  <li className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
                    • Timer auto-advances if time runs out
                  </li>
                </ul>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105 hover:shadow-xl transform text-lg py-6 relative overflow-hidden group"
                size="lg"
                onClick={() => handleTransition(onStart)}
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Play className="h-5 w-5 mr-2 animate-pulse relative z-10" />
                <span className="relative z-10">Start Interactive Challenge</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-3px) scale(1.05); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.5s ease-out; }
        .animate-gentle-bounce { animation: gentle-bounce 3s ease-in-out infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
      `}</style>
    </div>
  )
}
