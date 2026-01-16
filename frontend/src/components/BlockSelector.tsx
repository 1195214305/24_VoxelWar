import { useGameStore, BlockType } from '../store/gameStore'
import { getBlockColor } from '../game/terrain'

const blocks: BlockType[] = ['grass', 'dirt', 'stone', 'wood', 'sand', 'brick']

export function BlockSelector() {
  const mode = useGameStore((s) => s.mode)
  const selectedBlock = useGameStore((s) => s.selectedBlock)
  const setSelectedBlock = useGameStore((s) => s.setSelectedBlock)

  if (mode !== 'creative') return null

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20">
      <div className="flex gap-2 bg-dark-card/80 p-2 border border-neon-cyan/30">
        {blocks.map((block) => (
          <button
            key={block}
            onClick={() => setSelectedBlock(block)}
            className={`w-12 h-12 border-2 transition-all ${
              selectedBlock === block
                ? 'border-neon-orange scale-110'
                : 'border-gray-600 hover:border-gray-400'
            }`}
            style={{ backgroundColor: getBlockColor(block) }}
            title={block}
          />
        ))}
      </div>
    </div>
  )
}
