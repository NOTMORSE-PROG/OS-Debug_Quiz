"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, onKeyDown, ...props }, ref) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const target = e.target as HTMLTextAreaElement
      const start = target.selectionStart
      const end = target.selectionEnd

      // Insert tab character at cursor position
      const value = target.value
      const newValue = value.substring(0, start) + "\t" + value.substring(end)

      target.value = newValue

      // Move cursor after the inserted tab
      target.selectionStart = target.selectionEnd = start + 1

      // Trigger onChange event
      const event = new Event("input", { bubbles: true })
      target.dispatchEvent(event)
    }

    // Call the original onKeyDown if provided
    if (onKeyDown) {
      onKeyDown(e)
    }
  }

  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono",
        className,
      )}
      onKeyDown={handleKeyDown}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
