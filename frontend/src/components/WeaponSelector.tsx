import { useGameStore } from '../store/gameStore'

export function WeaponSelector() {
  const mode = useGameStore((s) => s.mode)
  const weapons = useGameStore((s) => s.weapons)
  const currentWeapon = useGameStore((s) => s.currentWeapon)
  const setCurrentWeapon = useGameStore((s) => s.setCurrentWeapon)

  if (mode !== 'battle') return null

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20">
      <div className="flex gap-2 bg-dark-card/80 p-2 border border-neon-orange/30">
        {weapons.map((weapon, i) => (
          <button
            key={weapon.id}
            onClick={() => setCurrentWeapon(weapon)}
            className={`px-4 py-2 border-2 transition-all ${
              currentWeapon?.id === weapon.id
                ? 'border-neon-orange bg-neon-orange/20 text-neon-orange'
                : 'border-gray-600 text-gray-400 hover:border-gray-400'
            }`}
          >
            <span className="text-xs text-gray-500">{i + 1}</span>
            <div>{weapon.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
