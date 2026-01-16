import { useGameStore } from '../store/gameStore'

export function GameHUD() {
  const mode = useGameStore((s) => s.mode)
  const health = useGameStore((s) => s.health)
  const score = useGameStore((s) => s.score)
  const currentWeapon = useGameStore((s) => s.currentWeapon)

  if (mode === 'menu') return null

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* 准星 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-1 h-6 bg-neon-cyan absolute -translate-x-1/2 -translate-y-1/2" />
        <div className="w-6 h-1 bg-neon-cyan absolute -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* 血量条 */}
      <div className="absolute bottom-8 left-8">
        <div className="text-neon-cyan text-sm mb-1">HP</div>
        <div className="w-48 h-3 bg-dark-card border border-neon-cyan/30">
          <div
            className="h-full bg-gradient-to-r from-neon-orange to-red-500 transition-all"
            style={{ width: `${health}%` }}
          />
        </div>
      </div>

      {/* 分数 */}
      <div className="absolute top-8 right-8 text-right">
        <div className="text-neon-cyan/60 text-sm">SCORE</div>
        <div className="text-neon-orange text-3xl font-bold">{score}</div>
      </div>

      {/* 武器信息 */}
      {currentWeapon && (
        <div className="absolute bottom-8 right-8 text-right">
          <div className="text-neon-cyan text-lg">{currentWeapon.name}</div>
          <div className="text-neon-orange text-2xl">
            {currentWeapon.ammo} / {currentWeapon.maxAmmo}
          </div>
        </div>
      )}
    </div>
  )
}
