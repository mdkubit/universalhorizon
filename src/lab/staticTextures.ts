import * as THREE from 'three'

export function createNebulaTexture() {
  const width = 2048
  const height = 1024
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Canvas 2D context unavailable for nebula texture')
  }

  const background = context.createLinearGradient(0, 0, width, height)
  background.addColorStop(0, '#02030b')
  background.addColorStop(0.46, '#090a1c')
  background.addColorStop(1, '#03040c')
  context.fillStyle = background
  context.fillRect(0, 0, width, height)

  const random = seededRandom(87)
  const palettes = [
    [142, 78, 192],
    [95, 72, 170],
    [53, 91, 172],
    [162, 57, 118],
    [104, 55, 152],
  ] as const

  context.globalCompositeOperation = 'screen'

  for (let index = 0; index < 74; index += 1) {
    const x = random() * width
    const y = height * (0.15 + random() * 0.7)
    const radiusX = 120 + random() * 420
    const radiusY = 70 + random() * 220
    const [red, green, blue] = palettes[Math.floor(random() * palettes.length)]
    const opacity = 0.025 + random() * 0.085

    context.save()
    context.translate(x, y)
    context.scale(1, radiusY / radiusX)

    const gradient = context.createRadialGradient(0, 0, 0, 0, 0, radiusX)
    gradient.addColorStop(
      0,
      `rgba(${red}, ${green}, ${blue}, ${opacity})`,
    )
    gradient.addColorStop(
      0.42,
      `rgba(${Math.round(red * 0.75)}, ${Math.round(green * 0.75)}, ${Math.round(blue * 0.9)}, ${opacity * 0.72})`,
    )
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

    context.fillStyle = gradient
    context.beginPath()
    context.arc(0, 0, radiusX, 0, Math.PI * 2)
    context.fill()
    context.restore()
  }

  context.globalCompositeOperation = 'lighter'
  context.lineCap = 'round'

  for (let index = 0; index < 22; index += 1) {
    const startX = -200 + random() * (width + 400)
    const startY = 130 + random() * 730
    const endX = startX + 350 + random() * 650
    const endY = startY - 120 + random() * 240
    const controlX = (startX + endX) * 0.5
    const controlY = startY - 180 + random() * 360

    context.strokeStyle =
      index % 3 === 0
        ? 'rgba(91, 128, 224, 0.035)'
        : 'rgba(174, 83, 172, 0.033)'
    context.lineWidth = 32 + random() * 80
    context.shadowBlur = 55
    context.shadowColor =
      index % 3 === 0
        ? 'rgba(73, 112, 214, 0.24)'
        : 'rgba(160, 68, 159, 0.22)'
    context.beginPath()
    context.moveTo(startX, startY)
    context.quadraticCurveTo(controlX, controlY, endX, endY)
    context.stroke()
  }

  context.shadowBlur = 0
  context.globalCompositeOperation = 'screen'

  const noiseCanvas = document.createElement('canvas')
  noiseCanvas.width = 320
  noiseCanvas.height = 160
  const noiseContext = noiseCanvas.getContext('2d')

  if (noiseContext) {
    const image = noiseContext.createImageData(
      noiseCanvas.width,
      noiseCanvas.height,
    )

    for (let index = 0; index < image.data.length; index += 4) {
      const value = Math.floor(random() * 255)
      const alpha = Math.floor(10 + random() * 22)
      image.data[index] = Math.floor(value * 0.45)
      image.data[index + 1] = Math.floor(value * 0.42)
      image.data[index + 2] = value
      image.data[index + 3] = alpha
    }

    noiseContext.putImageData(image, 0, 0)
    context.globalAlpha = 0.28
    context.imageSmoothingEnabled = true
    context.drawImage(noiseCanvas, 0, 0, width, height)
    context.globalAlpha = 1
  }

  context.globalCompositeOperation = 'source-over'

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.generateMipmaps = true
  texture.anisotropy = 4
  texture.needsUpdate = true
  return texture
}

export function createPlanetTexture() {
  const width = 2048
  const height = 1024
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Canvas 2D context unavailable for planet texture')
  }

  const ocean = context.createLinearGradient(0, 0, 0, height)
  ocean.addColorStop(0, '#18466c')
  ocean.addColorStop(0.46, '#176f82')
  ocean.addColorStop(1, '#0c3854')
  context.fillStyle = ocean
  context.fillRect(0, 0, width, height)

  drawContinent(context, [
    [100, 350],
    [240, 220],
    [470, 210],
    [630, 300],
    [720, 430],
    [665, 560],
    [530, 650],
    [340, 615],
    [190, 510],
  ])

  drawContinent(context, [
    [860, 220],
    [1080, 130],
    [1320, 180],
    [1410, 330],
    [1515, 445],
    [1700, 420],
    [1860, 575],
    [1770, 760],
    [1530, 810],
    [1320, 710],
    [1130, 760],
    [980, 650],
    [935, 490],
  ])

  drawContinent(context, [
    [1770, 150],
    [1935, 160],
    [2048, 260],
    [2048, 450],
    [1900, 435],
    [1795, 330],
  ])

  const random = seededRandom(44)

  context.globalCompositeOperation = 'soft-light'
  for (let index = 0; index < 110; index += 1) {
    const x = random() * width
    const y = random() * height
    const radius = 18 + random() * 70
    const gradient = context.createRadialGradient(x, y, 0, x, y, radius)
    gradient.addColorStop(0, 'rgba(205, 184, 132, 0.10)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    context.fillStyle = gradient
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
  }

  context.globalCompositeOperation = 'screen'
  context.lineCap = 'round'

  for (let band = 0; band < 34; band += 1) {
    const x = -160 + random() * (width + 320)
    const y = 80 + random() * 860
    const length = 180 + random() * 540
    const controlY = y - 90 + random() * 180

    context.strokeStyle = `rgba(228, 238, 243, ${0.07 + random() * 0.09})`
    context.lineWidth = 10 + random() * 30
    context.shadowBlur = 10
    context.shadowColor = 'rgba(224, 236, 245, 0.10)'
    context.beginPath()
    context.moveTo(x, y)
    context.quadraticCurveTo(x + length * 0.5, controlY, x + length, y)
    context.stroke()
  }

  context.shadowBlur = 0
  context.globalCompositeOperation = 'source-over'

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.generateMipmaps = true
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}


export function createCloudTexture() {
  const width = 2048
  const height = 1024
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Canvas 2D context unavailable for cloud texture')
  }

  context.clearRect(0, 0, width, height)
  context.globalCompositeOperation = 'source-over'
  context.lineCap = 'round'
  context.lineJoin = 'round'

  const random = seededRandom(72)

  for (let band = 0; band < 58; band += 1) {
    const startX = -220 + random() * (width + 440)
    const startY = 90 + random() * 840
    const length = 180 + random() * 620
    const bend = -120 + random() * 240

    context.strokeStyle = `rgba(232, 240, 249, ${0.035 + random() * 0.095})`
    context.lineWidth = 8 + random() * 34
    context.shadowBlur = 12 + random() * 20
    context.shadowColor = 'rgba(210, 226, 246, 0.18)'
    context.beginPath()
    context.moveTo(startX, startY)
    context.bezierCurveTo(
      startX + length * 0.26,
      startY + bend,
      startX + length * 0.7,
      startY - bend * 0.45,
      startX + length,
      startY,
    )
    context.stroke()
  }

  context.shadowBlur = 0
  context.globalCompositeOperation = 'screen'

  for (let puff = 0; puff < 150; puff += 1) {
    const x = random() * width
    const y = 80 + random() * 860
    const radius = 10 + random() * 50
    const gradient = context.createRadialGradient(x, y, 0, x, y, radius)
    gradient.addColorStop(
      0,
      `rgba(238, 244, 252, ${0.025 + random() * 0.07})`,
    )
    gradient.addColorStop(1, 'rgba(238, 244, 252, 0)')
    context.fillStyle = gradient
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
  }

  context.globalCompositeOperation = 'source-over'

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.generateMipmaps = true
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

function drawContinent(
  context: CanvasRenderingContext2D,
  points: readonly (readonly [number, number])[],
) {
  const gradient = context.createLinearGradient(0, 150, 700, 760)
  gradient.addColorStop(0, '#6f875f')
  gradient.addColorStop(0.5, '#9a8a63')
  gradient.addColorStop(1, '#456c57')

  context.fillStyle = gradient
  context.beginPath()
  context.moveTo(points[0][0], points[0][1])

  for (let index = 1; index < points.length; index += 1) {
    const current = points[index]
    const previous = points[index - 1]
    const midX = (previous[0] + current[0]) * 0.5
    const midY = (previous[1] + current[1]) * 0.5
    context.quadraticCurveTo(previous[0], previous[1], midX, midY)
  }

  const last = points[points.length - 1]
  const first = points[0]
  context.quadraticCurveTo(
    last[0],
    last[1],
    (last[0] + first[0]) * 0.5,
    (last[1] + first[1]) * 0.5,
  )
  context.quadraticCurveTo(first[0], first[1], first[0], first[1])
  context.closePath()
  context.fill()
}

function seededRandom(seed: number) {
  let value = seed >>> 0

  return () => {
    value += 0x6d2b79f5
    let result = value
    result = Math.imul(result ^ (result >>> 15), result | 1)
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61)
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296
  }
}
