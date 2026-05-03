import { useState, useCallback } from 'react'

export default function useClipboard() {
  const [toast, setToast] = useState(null)

  const copy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setToast({ message: '已复制到剪贴板', type: 'success' })
      return true
    } catch (err) {
      setToast({ message: '复制失败', type: 'error' })
      return false
    }
  }, [])

  const clearToast = useCallback(() => {
    setToast(null)
  }, [])

  return { copy, toast, clearToast }
}