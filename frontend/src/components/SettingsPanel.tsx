import { useState } from 'react'
import { useGameStore } from '../store/gameStore'

export function SettingsPanel() {
  const showSettings = useGameStore((s) => s.showSettings)
  const toggleSettings = useGameStore((s) => s.toggleSettings)
  const qwenApiKey = useGameStore((s) => s.qwenApiKey)
  const setQwenApiKey = useGameStore((s) => s.setQwenApiKey)

  const [tempKey, setTempKey] = useState(qwenApiKey)

  if (!showSettings) return null

  const handleSave = () => {
    setQwenApiKey(tempKey)
    toggleSettings()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-dark-card border border-neon-cyan/30 p-8 w-96">
        <h2 className="text-2xl text-neon-cyan mb-6">设置</h2>

        <div className="mb-6">
          <label className="block text-gray-400 text-sm mb-2">
            千问 API Key
          </label>
          <input
            type="password"
            value={tempKey}
            onChange={(e) => setTempKey(e.target.value)}
            placeholder="sk-xxxxxxxx"
            className="w-full bg-dark-bg border border-gray-600 px-4 py-2 text-white focus:border-neon-cyan outline-none"
          />
          <p className="text-gray-500 text-xs mt-2">
            用于AI助手功能，可在阿里云百炼获取
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="flex-1 py-2 bg-neon-cyan text-dark-bg hover:bg-neon-cyan/80"
          >
            保存
          </button>
          <button
            onClick={toggleSettings}
            className="flex-1 py-2 border border-gray-600 text-gray-400 hover:border-gray-400"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  )
}
