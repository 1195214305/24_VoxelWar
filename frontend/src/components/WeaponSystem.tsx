import { useRef, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '../store/gameStore'

export function WeaponSystem() {
  const mode = useGameStore((s) => s.mode)
  const currentWeapon = useGameStore((s) => s.currentWeapon)
  const addScore = useGameStore((s) => s.addScore)

  const lastFireTime = useRef(0)
  const muzzleFlash = useRef<THREE.PointLight>(null)

  const fire = useCallback(() => {
    if (!currentWeapon) return
    const now = Date.now()
    if (now - lastFireTime.current < currentWeapon.fireRate) return
    lastFireTime.current = now
    addScore(10)
  }, [currentWeapon, addScore])

  useFrame(() => {
    if (muzzleFlash.current) {
      const timeSinceFire = Date.now() - lastFireTime.current
      muzzleFlash.current.intensity = timeSinceFire < 50 ? 2 : 0
    }
  })

  if (mode !== 'battle' || !currentWeapon) return null

  return (
    <group>
      <pointLight ref={muzzleFlash} color="#ff6b35" intensity={0} distance={5} />
    </group>
  )
}
