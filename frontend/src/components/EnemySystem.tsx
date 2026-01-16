import { useState, useEffect, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { VoxelCharacter } from './VoxelCharacter'
import { useGameStore } from '../store/gameStore'

interface Enemy {
  id: string
  position: [number, number, number]
  type: 'katixi' | 'shouanren'
  health: number
}

export function EnemySystem() {
  const mode = useGameStore((s) => s.mode)
  const addScore = useGameStore((s) => s.addScore)
  const [enemies, setEnemies] = useState<Enemy[]>([])

  useEffect(() => {
    if (mode !== 'battle') {
      setEnemies([])
      return
    }

    // 生成初始敌人
    const initialEnemies: Enemy[] = []
    for (let i = 0; i < 5; i++) {
      initialEnemies.push({
        id: `enemy-${i}`,
        position: [
          (Math.random() - 0.5) * 20,
          2,
          (Math.random() - 0.5) * 20,
        ],
        type: Math.random() > 0.5 ? 'katixi' : 'shouanren',
        health: 100,
      })
    }
    setEnemies(initialEnemies)
  }, [mode])

  const handleEnemyHit = useCallback((id: string) => {
    setEnemies((prev) => {
      const updated = prev.map((e) => {
        if (e.id === id) {
          const newHealth = e.health - 25
          if (newHealth <= 0) {
            addScore(100)
            return null
          }
          return { ...e, health: newHealth }
        }
        return e
      }).filter(Boolean) as Enemy[]
      return updated
    })
  }, [addScore])

  if (mode !== 'battle') return null

  return (
    <group>
      {enemies.map((enemy) => (
        <VoxelCharacter
          key={enemy.id}
          position={enemy.position}
          characterType={enemy.type}
        />
      ))}
    </group>
  )
}
