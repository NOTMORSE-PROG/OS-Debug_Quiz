"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Play, ArrowLeft } from "lucide-react"
import Image from "next/image"

interface QRCodeModalProps {
  language: string
  onStart: () => void
  onBack: () => void
}

export default function QRCodeModal({ language, onStart, onBack }: QRCodeModalProps) {
  const [showQR, setShowQR] = useState(true)

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Badge className={languageColors[language as keyof typeof languageColors]}>
              {languageIcons[language as keyof typeof languageIcons]} {language}
            </Badge>
          </div>
          <CardTitle className="text-2xl">Ready to Debug?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {showQR ? (
            <>
              <div className="text-center">
                <p className="text-gray-600 mb-4">Scan the QR code to access additional resources for this challenge</p>
                <div className="bg-white border-2 border-gray-200 rounded-lg p-4 mb-4">
                  <Image src="/qr-code.png" alt="OpenSource QR Code" width={200} height={200} className="mx-auto" />
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowQR(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Skip QR
                  </Button>
                  <Button className="flex-1" onClick={() => setShowQR(false)}>
                    Scanned
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center space-y-4">
                <div
                  className={`w-20 h-20 ${languageColors[language as keyof typeof languageColors]} rounded-full flex items-center justify-center mx-auto`}
                >
                  <span className="text-3xl">{languageIcons[language as keyof typeof languageIcons]}</span>
                </div>

                <h3 className="text-xl font-semibold">{language} Debug Challenge</h3>

                <div className="bg-gray-50 rounded-lg p-4 text-left">
                  <h4 className="font-semibold mb-2">Challenge Rules:</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• 10 interactive code fixing challenges</li>
                    <li>• 1 minute per challenge</li>
                    <li>• Edit code directly to fix errors</li>
                    <li>• Faster fixes = higher points</li>
                    <li>• Hints available (but cost points!)</li>
                    <li>• Timer auto-advances if time runs out</li>
                  </ul>
                </div>

                <Button className="w-full" size="lg" onClick={onStart}>
                  <Play className="h-5 w-5 mr-2" />
                  Start Interactive Challenge
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
