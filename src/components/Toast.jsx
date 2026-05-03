import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Info } from 'lucide-react'

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
}

const colors = {
  success: 'bg-green-50 text-green-700 border-green-200',
  error: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-gray-50 text-gray-700 border-gray-200',
}

export default function Toast({ message, type = 'success', onClose, duration = 2000 }) {
  const [isVisible, setIsVisible] = useState(true)
  const Icon = icons[type]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 200)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className={`flex items-center gap-2 px-4 py-3 rounded-lg border shadow-lg ${
          colors[type]
        } ${isVisible ? 'animate-fadeIn' : 'animate-fadeOut'}`}
      >
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  )
}