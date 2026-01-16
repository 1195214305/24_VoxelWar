import { createNoise2D } from 'simplex-noise'

const noise2D = createNoise2D()

export interface VoxelBlock {
  x: number
  y: number
  z: number
  type: string
}

export function generateTerrain(
  width: number,
  depth: number,
  maxHeight: number = 10
): VoxelBlock[] {
  const blocks: VoxelBlock[] = []

  for (let x = -width / 2; x < width / 2; x++) {
    for (let z = -depth / 2; z < depth / 2; z++) {
      const noiseValue = noise2D(x * 0.05, z * 0.05)
      const height = Math.floor((noiseValue + 1) * maxHeight / 2) + 1

      for (let y = 0; y < height; y++) {
        let type = 'stone'
        if (y === height - 1) {
          type = 'grass'
        } else if (y >= height - 3) {
          type = 'dirt'
        }
        blocks.push({ x, y, z, type })
      }
    }
  }

  return blocks
}

export function getBlockColor(type: string): string {
  const colors: Record<string, string> = {
    grass: '#4a9c2d',
    dirt: '#8b5a2b',
    stone: '#808080',
    wood: '#8b4513',
    sand: '#f4d03f',
    water: '#3498db',
    brick: '#c0392b',
  }
  return colors[type] || '#ffffff'
}
