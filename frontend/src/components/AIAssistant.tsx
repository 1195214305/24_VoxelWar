import { useState } from 'react'
import { useGameStore } from '../store/gameStore'

export function AIAssistant() {
  const mode = useGameStore((s) => s.mode)
  const qwenApiKey = useGameStore((s) => s.qwenApiKey)
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  if (mode === 'menu') return null

  const askAI = async () => {
    if (!message.trim() || !qwenApiKey) return
    setLoading(true)
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, apiKey: qwenApiKey }),
      })
      const data = await res.json()
      setResponse(data.reply || '无法获取回复')
    } catch {
      setResponse('请求失败，请检查API Key')
    }
    setLoading(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-8 left-8 z-20 w-10 h-10 bg-neon-cyan text-dark-bg font-bold hover:bg-neon-cyan/80"
      >
        AI
      </button>

      {isOpen && (
        <div className="fixed top-20 left-8 z-20 w-80 bg-dark-card border border-neon-cyan/30 p-4">
          <h3 className="text-neon-cyan mb-3">AI 战术助手</h3>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="询问游戏策略..."
            className="w-full h-20 bg-dark-bg border border-gray-600 p-2 text-white text-sm resize-none"
          />
          <button
            onClick={askAI}
            disabled={loading || !qwenApiKey}
            className="w-full mt-2 py-2 bg-neon-cyan text-dark-bg disabled:opacity-50"
          >
            {loading ? '思考中...' : '询问'}
          </button>
          {response && (
            <div className="mt-3 p-2 bg-dark-bg text-gray-300 text-sm max-h-32 overflow-y-auto">
              {response}
            </div>
          )}
          {!qwenApiKey && (
            <p className="mt-2 text-red-400 text-xs">请先在设置中配置API Key</p>
          )}
        </div>
      )}
    </>
  )
}
