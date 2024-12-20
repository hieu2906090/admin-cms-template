import { useEffect, useState } from 'react'

const progressStyles = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-yellow-500',
  info: 'bg-blue-500',
}

interface ToastProgressProps {
  type: keyof typeof progressStyles
  onComplete: () => void
  duration?: number
}

export default function ToastProgress({ 
  type, 
  onComplete, 
  duration = 5000 
}: ToastProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const endTime = startTime + duration

    const updateProgress = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const newProgress = (elapsed / duration) * 100

      if (elapsed >= duration) {
        onComplete()
        return
      }

      setProgress(Math.min(100, newProgress))
      requestAnimationFrame(updateProgress)
    }

    const animationFrame = requestAnimationFrame(updateProgress)
    return () => cancelAnimationFrame(animationFrame)
  }, [onComplete, duration])

  return (
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/50 overflow-hidden">
      <div
        className={`h-full ${progressStyles[type]}`}
        style={{ 
          width: `${progress}%`,
          transition: 'width 100ms linear'
        }}
      />
    </div>
  )
} 