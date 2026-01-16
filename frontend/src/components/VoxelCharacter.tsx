import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface VoxelCharacterProps {
  position: [number, number, number]
  characterType: 'katixi' | 'shouanren'
  isPlayer?: boolean
}

// 卡提希娅配色 - 紫色系
const katixiColors = {
  hair: '#8b5cf6',
  skin: '#fcd5ce',
  outfit: '#4c1d95',
  accent: '#c4b5fd',
}

// 守岸人配色 - 蓝色系
const shouanrenColors = {
  hair: '#1e3a5f',
  skin: '#fcd5ce',
  outfit: '#0ea5e9',
  accent: '#38bdf8',
}

export function VoxelCharacter({ position, characterType, isPlayer = false }: VoxelCharacterProps) {
  const groupRef = useRef<THREE.Group>(null)
  const colors = characterType === 'katixi' ? katixiColors : shouanrenColors

  useFrame((state) => {
    if (groupRef.current && !isPlayer) {
      // 敌人角色轻微摇摆动画
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* 头部 */}
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={colors.skin} />
      </mesh>

      {/* 头发 */}
      <mesh position={[0, 1.85, -0.1]}>
        <boxGeometry args={[0.55, 0.3, 0.55]} />
        <meshStandardMaterial color={colors.hair} />
      </mesh>

      {/* 身体 */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.6, 0.8, 0.3]} />
        <meshStandardMaterial color={colors.outfit} />
      </mesh>

      {/* 左臂 */}
      <mesh position={[-0.45, 0.9, 0]}>
        <boxGeometry args={[0.25, 0.7, 0.25]} />
        <meshStandardMaterial color={colors.accent} />
      </mesh>

      {/* 右臂 */}
      <mesh position={[0.45, 0.9, 0]}>
        <boxGeometry args={[0.25, 0.7, 0.25]} />
        <meshStandardMaterial color={colors.accent} />
      </mesh>

      {/* 左腿 */}
      <mesh position={[-0.15, 0.3, 0]}>
        <boxGeometry args={[0.25, 0.6, 0.25]} />
        <meshStandardMaterial color={colors.outfit} />
      </mesh>

      {/* 右腿 */}
      <mesh position={[0.15, 0.3, 0]}>
        <boxGeometry args={[0.25, 0.6, 0.25]} />
        <meshStandardMaterial color={colors.outfit} />
      </mesh>

      {/* 角色名称标签 */}
      {!isPlayer && (
        <mesh position={[0, 2.2, 0]}>
          <planeGeometry args={[1, 0.2]} />
          <meshBasicMaterial color={colors.hair} transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  )
}
