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
  const sampleWidth = 1024
  const sampleHeight = 512
  const sampleCanvas = document.createElement('canvas')
  sampleCanvas.width = sampleWidth
  sampleCanvas.height = sampleHeight

  const sampleContext = sampleCanvas.getContext('2d')
  if (!sampleContext) {
    throw new Error('Canvas 2D context unavailable for planet texture')
  }

  const image = sampleContext.createImageData(sampleWidth, sampleHeight)

  for (let y = 0; y < sampleHeight; y += 1) {
    const v = y / (sampleHeight - 1)
    const latitude = Math.abs(v - 0.5) * 2

    for (let x = 0; x < sampleWidth; x += 1) {
      const u = x / sampleWidth
      const continent =
        periodicFbm(u, v, 41, 5, 2.02, 0.52, 3) * 0.72 +
        periodicFbm(u + 0.173, v * 0.82 + 0.09, 97, 3, 2.1, 0.5, 2) * 0.28
      const ridge = periodicFbm(u * 1.7 + 0.31, v * 1.55, 133, 4, 2, 0.5, 5)

      const landThreshold = 0.545 + latitude * 0.035
      const isLand = continent > landThreshold
      const index = (y * sampleWidth + x) * 4

      if (isLand) {
        const elevation = smoothstep(landThreshold, 0.78, continent)
        const mountain = smoothstep(0.58, 0.82, ridge) * elevation
        const dry = smoothstep(0.34, 0.8, periodicFbm(u + 0.44, v, 211, 3, 2, 0.52, 7))

        image.data[index] = Math.round(64 + elevation * 74 + dry * 30 + mountain * 28)
        image.data[index + 1] = Math.round(82 + elevation * 70 + (1 - dry) * 34)
        image.data[index + 2] = Math.round(58 + elevation * 38 + mountain * 20)
      } else {
        const depth = smoothstep(0.34, landThreshold, continent)
        image.data[index] = Math.round(8 + depth * 13)
        image.data[index + 1] = Math.round(39 + depth * 58)
        image.data[index + 2] = Math.round(72 + depth * 72)
      }

      const polarIce = smoothstep(0.82, 0.98, latitude)
      if (polarIce > 0) {
        image.data[index] = Math.round(
          image.data[index] * (1 - polarIce) + 205 * polarIce,
        )
        image.data[index + 1] = Math.round(
          image.data[index + 1] * (1 - polarIce) + 222 * polarIce,
        )
        image.data[index + 2] = Math.round(
          image.data[index + 2] * (1 - polarIce) + 232 * polarIce,
        )
      }

      image.data[index + 3] = 255
    }
  }

  sampleContext.putImageData(image, 0, 0)

  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Canvas 2D context unavailable for planet texture')
  }

  context.imageSmoothingEnabled = true
  context.imageSmoothingQuality = 'high'
  context.drawImage(sampleCanvas, 0, 0, canvas.width, canvas.height)

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
  const sampleWidth = 1024
  const sampleHeight = 512
  const sampleCanvas = document.createElement('canvas')
  sampleCanvas.width = sampleWidth
  sampleCanvas.height = sampleHeight

  const sampleContext = sampleCanvas.getContext('2d')
  if (!sampleContext) {
    throw new Error('Canvas 2D context unavailable for cloud texture')
  }

  const image = sampleContext.createImageData(sampleWidth, sampleHeight)

  for (let y = 0; y < sampleHeight; y += 1) {
    const v = y / (sampleHeight - 1)
    const latitudeBand =
      0.5 +
      0.5 * Math.sin(v * Math.PI * 10 + periodicFbm(0.17, v, 901, 2, 2, 0.5, 2) * 4)

    for (let x = 0; x < sampleWidth; x += 1) {
      const u = x / sampleWidth
      const broad = periodicFbm(u + 0.12, v * 1.05, 72, 5, 2.04, 0.53, 4)
      const wisps = periodicFbm(u * 1.8 + 0.31, v * 1.55 + 0.08, 507, 4, 2, 0.5, 7)
      const cloudField = broad * 0.74 + wisps * 0.26
      const threshold = 0.565 - (latitudeBand - 0.5) * 0.035
      const alpha = smoothstep(threshold, 0.76, cloudField)
      const index = (y * sampleWidth + x) * 4

      image.data[index] = 224
      image.data[index + 1] = 235
      image.data[index + 2] = 248
      image.data[index + 3] = Math.round(alpha * 170)
    }
  }

  sampleContext.putImageData(image, 0, 0)

  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Canvas 2D context unavailable for cloud texture')
  }

  context.imageSmoothingEnabled = true
  context.imageSmoothingQuality = 'high'
  context.drawImage(sampleCanvas, 0, 0, canvas.width, canvas.height)

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

function periodicFbm(
  u: number,
  v: number,
  seed: number,
  octaves: number,
  lacunarity: number,
  gain: number,
  baseFrequency: number,
) {
  let amplitude = 0.5
  let frequency = baseFrequency
  let total = 0
  let normalization = 0

  for (let octave = 0; octave < octaves; octave += 1) {
    const periodX = Math.max(2, Math.round(frequency * 2))
    const periodY = Math.max(2, Math.round(frequency))

    total +=
      valueNoisePeriodic(
        u * periodX,
        v * periodY,
        periodX,
        periodY,
        seed + octave * 101,
      ) * amplitude
    normalization += amplitude
    amplitude *= gain
    frequency *= lacunarity
  }

  return normalization > 0 ? total / normalization : 0
}

function valueNoisePeriodic(
  x: number,
  y: number,
  periodX: number,
  periodY: number,
  seed: number,
) {
  const x0 = Math.floor(x)
  const y0 = Math.floor(y)
  const tx = smoothCurve(x - x0)
  const ty = smoothCurve(y - y0)

  const sample = (ix: number, iy: number) =>
    hash2(
      ((ix % periodX) + periodX) % periodX,
      Math.min(periodY, Math.max(0, iy)),
      seed,
    )

  const a = lerp(sample(x0, y0), sample(x0 + 1, y0), tx)
  const b = lerp(sample(x0, y0 + 1), sample(x0 + 1, y0 + 1), tx)
  return lerp(a, b, ty)
}

function hash2(x: number, y: number, seed: number) {
  let value =
    Math.imul(x + seed * 17, 0x27d4eb2d) ^
    Math.imul(y + seed * 31, 0x165667b1)
  value ^= value >>> 15
  value = Math.imul(value, 0x85ebca6b)
  value ^= value >>> 13
  return (value >>> 0) / 4294967295
}

function smoothCurve(value: number) {
  return value * value * (3 - 2 * value)
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
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
