import type { PuzzleRegion } from './gameTypes'

const allCodes = Array.from({ length: 5 }, (_, questionIndex) =>
  ['A', 'B', 'C', 'D'].map((answer) => `${questionIndex + 1}${answer}`),
).flat()

const correctRegionIndexes: Record<string, number[]> = {
  '1A': [22, 23, 24, 25, 26, 27],
  '2C': [28, 29, 30, 31, 32, 33],
  '3B': [64, 65, 66, 67, 68, 69],
  '4C': [86, 87, 88, 89, 90, 91],
  '5C': [104, 105, 106, 107, 108, 109],
}

const regionCodes = Array<string>(120).fill('')

Object.entries(correctRegionIndexes).forEach(([code, indexes]) => {
  indexes.forEach((index) => {
    regionCodes[index] = code
  })
})

const distractorCodes = allCodes.filter((code) => !correctRegionIndexes[code])
let distractorIndex = 0

regionCodes.forEach((code, index) => {
  if (code) return
  regionCodes[index] = distractorCodes[Math.floor(distractorIndex / 6)]
  distractorIndex += 1
})

function polygonPoints(row: number, column: number, part: number) {
  const x = column * 50
  const y = row * 100
  const variation = (row + column) % 3

  if (variation === 0) {
    return part === 0
      ? `${x},${y} ${x + 50},${y} ${x + 50},${y + 100}`
      : `${x},${y} ${x + 50},${y + 100} ${x},${y + 100}`
  }

  if (variation === 1) {
    const splitYLeft = y + 40 + (column % 3) * 5
    const splitYRight = y + 52 - (row % 2) * 7
    return part === 0
      ? `${x},${y} ${x + 50},${y} ${x + 50},${splitYRight} ${x},${splitYLeft}`
      : `${x},${splitYLeft} ${x + 50},${splitYRight} ${x + 50},${y + 100} ${x},${y + 100}`
  }

  const splitXTop = x + 20 + (row % 3) * 4
  const splitXBottom = x + 30 - (column % 2) * 6
  return part === 0
    ? `${x},${y} ${splitXTop},${y} ${splitXBottom},${y + 100} ${x},${y + 100}`
    : `${splitXTop},${y} ${x + 50},${y} ${x + 50},${y + 100} ${splitXBottom},${y + 100}`
}

function polygonCenter(points: string) {
  const coordinates = points.split(' ').map((point) => point.split(',').map(Number))
  const x = coordinates.reduce((sum, coordinate) => sum + coordinate[0], 0) / coordinates.length
  const y = coordinates.reduce((sum, coordinate) => sum + coordinate[1], 0) / coordinates.length
  return { x, y }
}

function illustrationColor(x: number, y: number, code: string) {
  if (code === '2C') return '#E8C64A'
  if (code === '1A') return '#B52820'
  if (code === '3B') return '#5A3324'
  if (code === '4C') return '#777052'
  if (code === '5C') return '#8F7754'
  if (y < 220 && x > 95 && x < 390) return '#B52820'
  if (x > 85 && x < 135 && y < 420) return '#5A3324'
  if (y >= 255 && y < 435 && x > 80 && x < 425) return (Math.floor(x / 50) + Math.floor(y / 100)) % 2 ? '#8F7754' : '#5A3324'
  if (y >= 420) return x % 100 < 50 ? '#777052' : '#8F7754'
  return '#F6E7BF'
}

export const level3PuzzleRegions: PuzzleRegion[] = Array.from({ length: 6 }).flatMap((_, row) =>
  Array.from({ length: 10 }).flatMap((__, column) =>
    [0, 1].map((part) => {
      const index = (row * 10 + column) * 2 + part
      const points = polygonPoints(row, column, part)
      const center = polygonCenter(points)
      const code = regionCodes[index]
      return {
        id: `dbp-region-${index + 1}`,
        code,
        points,
        fill: illustrationColor(center.x, center.y, code),
        labelX: center.x,
        labelY: center.y,
      }
    }),
  ),
)
