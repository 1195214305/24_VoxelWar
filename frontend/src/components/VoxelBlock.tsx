import { useRef } from 'react'
import { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { getBlockColor } from '../game/terrain'

interface VoxelBlockProps {
  position: [number, number, number]
  type: string
  onLeftClick?: (position: [number, number, number], face: THREE.Vector3) => void
  onRightClick?: (position: [number, number, number]) => void
}

export function VoxelBlock({ position, type, onLeftClick, onRightClick }: VoxelBlockProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const color = getBlockColor(type)

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    if (e.button === 0 && onLeftClick && e.face) {
      const normal = e.face.normal.clone()
      onLeftClick(position, normal)
    } else if (e.button === 2 && onRightClick) {
      onRightClick(position)
    }
  }

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}
