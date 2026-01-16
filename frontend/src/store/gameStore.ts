import { create } from 'zustand'

export type GameMode = 'menu' | 'creative' | 'survival' | 'battle'
export type BlockType = 'grass' | 'dirt' | 'stone' | 'wood' | 'sand' | 'water' | 'brick'

interface Weapon {
  id: string
  name: string
  damage: number
  fireRate: number
  ammo: number
  maxAmmo: number
  range: number
}

interface GameState {
  mode: GameMode
  health: number
  maxHealth: number
  score: number
  selectedBlock: BlockType
  currentWeapon: Weapon | null
  weapons: Weapon[]
  isFirstPerson: boolean
  isPaused: boolean
  showSettings: boolean
  qwenApiKey: string

  setMode: (mode: GameMode) => void
  setHealth: (health: number) => void
  addScore: (points: number) => void
  setSelectedBlock: (block: BlockType) => void
  setCurrentWeapon: (weapon: Weapon | null) => void
  togglePerspective: () => void
  togglePause: () => void
  toggleSettings: () => void
  setQwenApiKey: (key: string) => void
  resetGame: () => void
}

const defaultWeapons: Weapon[] = [
  { id: 'pistol', name: '手枪', damage: 15, fireRate: 400, ammo: 12, maxAmmo: 12, range: 50 },
  { id: 'rifle', name: '步枪', damage: 25, fireRate: 150, ammo: 30, maxAmmo: 30, range: 100 },
  { id: 'shotgun', name: '霰弹枪', damage: 60, fireRate: 800, ammo: 8, maxAmmo: 8, range: 20 },
]

export const useGameStore = create<GameState>((set) => ({
  mode: 'menu',
  health: 100,
  maxHealth: 100,
  score: 0,
  selectedBlock: 'grass',
  currentWeapon: null,
  weapons: defaultWeapons,
  isFirstPerson: true,
  isPaused: false,
  showSettings: false,
  qwenApiKey: localStorage.getItem('qwen_api_key') || '',

  setMode: (mode) => set({ mode, health: 100, score: 0 }),
  setHealth: (health) => set({ health: Math.max(0, Math.min(100, health)) }),
  addScore: (points) => set((state) => ({ score: state.score + points })),
  setSelectedBlock: (block) => set({ selectedBlock: block }),
  setCurrentWeapon: (weapon) => set({ currentWeapon: weapon }),
  togglePerspective: () => set((state) => ({ isFirstPerson: !state.isFirstPerson })),
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  toggleSettings: () => set((state) => ({ showSettings: !state.showSettings })),
  setQwenApiKey: (key) => {
    localStorage.setItem('qwen_api_key', key)
    set({ qwenApiKey: key })
  },
  resetGame: () => set({ health: 100, score: 0, currentWeapon: defaultWeapons[0] }),
}))
