import { useGameStore } from '../store/gameStore'

export function MobileControls() {
  const mode = useGameStore((s) => s.mode)

  if (mode === 'menu') return null

  return (
    <div className="fixed bottom-24 left-4 z-20 md:hidden">
      <div className="grid grid-cols-3 gap-1 w-32">
        <div />
        <button className="w-10 h-10 bg-dark-card/80 border border-neon-cyan/50 text-neon-cyan">W</button>
        <div />
        <button className="w-10 h-10 bg-dark-card/80 border border-neon-cyan/50 text-neon-cyan">A</button>
        <button className="w-10 h-10 bg-dark-card/80 border border-neon-cyan/50 text-neon-cyan">S</button>
        <button className="w-10 h-10 bg-dark-card/80 border border-neon-cyan/50 text-neon-cyan">D</button>
      </div>
    </div>
  )
}
