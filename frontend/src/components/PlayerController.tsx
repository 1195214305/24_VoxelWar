import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import * as THREE from 'three'
import { useGameStore } from '../store/gameStore'

export function PlayerController() {
  const { camera } = useThree()
  const controlsRef = useRef<any>(null)
  const velocity = useRef(new THREE.Vector3())
  const direction = useRef(new THREE.Vector3())
  const moveState = useRef({ forward: false, backward: false, left: false, right: false, jump: false })

  const mode = useGameStore((s) => s.mode)
  const isPaused = useGameStore((s) => s.isPaused)

  useEffect(() => {
    camera.position.set(0, 15, 20)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused) return
      switch (e.code) {
        case 'KeyW': moveState.current.forward = true; break
        case 'KeyS': moveState.current.backward = true; break
        case 'KeyA': moveState.current.left = true; break
        case 'KeyD': moveState.current.right = true; break
        case 'Space': moveState.current.jump = true; break
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': moveState.current.forward = false; break
        case 'KeyS': moveState.current.backward = false; break
        case 'KeyA': moveState.current.left = false; break
        case 'KeyD': moveState.current.right = false; break
        case 'Space': moveState.current.jump = false; break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [camera, isPaused])

  useFrame((_, delta) => {
    if (mode === 'menu' || isPaused) return

    const speed = 15
    direction.current.z = Number(moveState.current.forward) - Number(moveState.current.backward)
    direction.current.x = Number(moveState.current.right) - Number(moveState.current.left)
    direction.current.normalize()

    if (moveState.current.forward || moveState.current.backward) {
      velocity.current.z -= direction.current.z * speed * delta
    }
    if (moveState.current.left || moveState.current.right) {
      velocity.current.x -= direction.current.x * speed * delta
    }

    camera.translateX(-velocity.current.x)
    camera.translateZ(velocity.current.z)

    velocity.current.x *= 0.9
    velocity.current.z *= 0.9
  })

  if (mode === 'menu') return null

  return <PointerLockControls ref={controlsRef} />
}
