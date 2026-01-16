import { useState, useMemo, useCallback } from 'react'
import * as THREE from 'three'
import { VoxelBlock } from './VoxelBlock'
import { generateTerrain, VoxelBlock as VoxelData } from '../game/terrain'
import { useGameStore } from '../store/gameStore'

export function VoxelWorld() {
  const selectedBlock = useGameStore((s) => s.selectedBlock)
  const mode = useGameStore((s) => s.mode)

  const initialBlocks = useMemo(() => generateTerrain(32, 32, 8), [])
  const [blocks, setBlocks] = useState<VoxelData[]>(initialBlocks)

  const handleAddBlock = useCallback((pos: [number, number, number], normal: THREE.Vector3) => {
    if (mode !== 'creative') return
    const newPos: VoxelData = {
      x: pos[0] + normal.x,
      y: pos[1] + normal.y,
      z: pos[2] + normal.z,
      type: selectedBlock,
    }
    setBlocks((prev) => [...prev, newPos])
  }, [mode, selectedBlock])

  const handleRemoveBlock = useCallback((pos: [number, number, number]) => {
    if (mode !== 'creative') return
    setBlocks((prev) => prev.filter((b) => !(b.x === pos[0] && b.y === pos[1] && b.z === pos[2])))
  }, [mode])

  return (
    <group>
      {blocks.map((block, i) => (
        <VoxelBlock
          key={`${block.x}-${block.y}-${block.z}-${i}`}
          position={[block.x, block.y, block.z]}
          type={block.type}
          onLeftClick={handleAddBlock}
          onRightClick={handleRemoveBlock}
        />
      ))}
    </group>
  )
}
