import { useGameStore } from '../store/gameStore'

export function MainMenu() {
  const mode = useGameStore((s) => s.mode)
  const setMode = useGameStore((s) => s.setMode)
  const toggleSettings = useGameStore((s) => s.toggleSettings)

  if (mode !== 'menu') return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-2">
          <span className="text-neon-orange">VOXEL</span>
          <span className="text-neon-cyan">WAR</span>
        </h1>
        <p className="text-gray-400 mb-12">体素战争 - 3D方块枪战游戏</p>

        <div className="space-y-4">
          <button
            onClick={() => setMode('creative')}
            className="block w-64 mx-auto py-3 bg-dark-card border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-dark-bg transition-all"
          >
            创造模式
          </button>
          <button
            onClick={() => setMode('battle')}
            className="block w-64 mx-auto py-3 bg-dark-card border-2 border-neon-orange text-neon-orange hover:bg-neon-orange hover:text-dark-bg transition-all"
          >
            枪战模式
          </button>
          <button
            onClick={toggleSettings}
            className="block w-64 mx-auto py-3 bg-dark-card border border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white transition-all"
          >
            设置
          </button>
        </div>

        <p className="mt-12 text-gray-500 text-sm">
          WASD移动 | 鼠标控制视角 | 左键放置/射击 | 右键破坏
        </p>
      </div>
    </div>
  )
}
