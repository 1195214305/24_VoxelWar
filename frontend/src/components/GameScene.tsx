import { Canvas } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { VoxelWorld } from './VoxelWorld'
import { PlayerController } from './PlayerController'
import { WeaponSystem } from './WeaponSystem'
import { useGameStore } from '../store/gameStore'

export function GameScene() {
  const mode = useGameStore((s) => s.mode)

  return (
    <Canvas
      camera={{ fov: 75, near: 0.1, far: 1000 }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Sky sunPosition={[100, 50, 100]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[50, 50, 50]} intensity={1} castShadow />

      {mode !== 'menu' && (
        <>
          <VoxelWorld />
          <PlayerController />
          <WeaponSystem />
        </>
      )}

      <gridHelper args={[100, 100, '#1a1a2e', '#1a1a2e']} position={[0, -0.5, 0]} />
    </Canvas>
  )
}
