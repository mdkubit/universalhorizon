import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import type { MutableRefObject } from 'react'
import * as THREE from 'three'

const BEHAVIOR_POINTS = 86
const RENDER_POINTS = 228
const THREAD_SEGMENT_LENGTH = 0.074
const SPARKLE_COUNT = 96

type InteractionState = {
  pointerWorld: THREE.Vector3
  previousWorld: THREE.Vector3
  pointerVelocity: THREE.Vector3
  pointerEnergy: number
  idleTime: number
  emitDistance: number
  hasPointer: boolean
}

type SparkleParticle = {
  active: boolean
  position: THREE.Vector3
  velocity: THREE.Vector3
  age: number
  life: number
  size: number
  phase: number
}

export default function HorizonWorld() {
  const interaction = useRef<InteractionState>(createInteractionState())
  const sparkles = useRef<SparkleParticle[]>(createSparklePool())

  return (
    <>
      <color attach="background" args={['#02040b']} />
      <fog attach="fog" args={['#02040b', 9, 44]} />

      <InteractionController interaction={interaction} sparkles={sparkles} />
      <DeepStarfield />
      <HorizonRings />
      <AtmosphericNodes />
      <SparkleField sparkles={sparkles} />
      <LivingThread interaction={interaction} sparkles={sparkles} />
      <PointerStar interaction={interaction} />
      <CameraBreath />

      <EffectComposer>
        <Bloom
          intensity={1.85}
          luminanceThreshold={0.06}
          luminanceSmoothing={0.86}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}

function InteractionController({
  interaction,
  sparkles,
}: {
  interaction: MutableRefObject<InteractionState>
  sparkles: MutableRefObject<SparkleParticle[]>
}) {
  const interactionPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0.05),
    [],
  )
  const projected = useMemo(() => new THREE.Vector3(), [])
  const worldDelta = useMemo(() => new THREE.Vector3(), [])
  const random = useRef(seededRandom(0xa54ff53a))

  useFrame((state, delta) => {
    const current = interaction.current

    state.raycaster.setFromCamera(state.pointer, state.camera)
    const hit = state.raycaster.ray.intersectPlane(interactionPlane, projected)
    if (!hit) return

    current.pointerWorld.copy(projected)

    if (!current.hasPointer) {
      current.previousWorld.copy(projected)
      current.hasPointer = true
    }

    worldDelta.subVectors(projected, current.previousWorld)
    const distance = worldDelta.length()
    const worldSpeed = distance / Math.max(delta, 1 / 120)

    current.pointerVelocity.copy(worldDelta).divideScalar(Math.max(delta, 1 / 120))

    const rawEnergy = THREE.MathUtils.clamp(worldSpeed * 0.12, 0, 1)
    const energyEase = 1 - Math.exp(-delta * (rawEnergy > current.pointerEnergy ? 12 : 4.2))
    current.pointerEnergy += (rawEnergy - current.pointerEnergy) * energyEase

    if (worldSpeed < 0.035) {
      current.idleTime += delta
    } else {
      current.idleTime = 0
    }

    current.emitDistance += distance
    if (worldSpeed > 0.16 && current.emitDistance > 0.045) {
      const emissions = worldSpeed > 5.5 ? 2 : 1
      for (let index = 0; index < emissions; index += 1) {
        emitSparkle(sparkles.current, projected, current.pointerVelocity, random.current)
      }
      current.emitDistance = 0
    }

    current.previousWorld.copy(projected)

    for (const particle of sparkles.current) {
      if (!particle.active) continue

      particle.age += delta
      if (particle.age >= particle.life) {
        particle.active = false
        continue
      }

      particle.position.addScaledVector(particle.velocity, delta)
      particle.velocity.multiplyScalar(Math.exp(-delta * 1.9))
      particle.velocity.y += Math.sin(state.clock.elapsedTime * 1.7 + particle.phase) * delta * 0.012
    }
  }, -1)

  return null
}

function LivingThread({
  interaction,
  sparkles,
}: {
  interaction: MutableRefObject<InteractionState>
  sparkles: MutableRefObject<SparkleParticle[]>
}) {
  const geometry = useMemo(() => createRibbonGeometry(RENDER_POINTS), [])
  const material = useMemo(() => createThreadMaterial(), [])
  const behaviorPoints = useMemo(
    () =>
      Array.from({ length: BEHAVIOR_POINTS }, (_, index) =>
        new THREE.Vector3(-index * THREAD_SEGMENT_LENGTH, 0, -0.2 - index * 0.002),
      ),
    [],
  )
  const renderPoints = useMemo(
    () => Array.from({ length: RENDER_POINTS }, () => new THREE.Vector3()),
    [],
  )
  const smoothCurve = useMemo(
    () => new THREE.CatmullRomCurve3(behaviorPoints, false, 'centripetal', 0.5),
    [behaviorPoints],
  )

  const headRef = useRef<THREE.Mesh>(null)
  const haloRef = useRef<THREE.Mesh>(null)
  const sparkleTarget = useRef(-1)
  const sparkleTargetUntil = useRef(0)

  const desired = useMemo(() => new THREE.Vector3(), [])
  const deltaVector = useMemo(() => new THREE.Vector3(), [])
  const tangent = useMemo(() => new THREE.Vector3(), [])
  const idleOffset = useMemo(() => new THREE.Vector3(), [])

  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const current = interaction.current
    const energy = current.pointerEnergy
    const activelyPointing = current.idleTime < 0.2 || energy > 0.08

    if (activelyPointing) {
      sparkleTarget.current = -1
      desired.copy(current.pointerWorld)

      const tinyLife = THREE.MathUtils.lerp(0.012, 0.002, energy)
      desired.x += Math.sin(time * 3.1) * tinyLife
      desired.y += Math.cos(time * 2.7) * tinyLife
    } else {
      const targetIndex = resolveSparkleTarget(
        sparkles.current,
        behaviorPoints[0],
        sparkleTarget.current,
        sparkleTargetUntil.current,
        time,
      )

      if (targetIndex !== sparkleTarget.current) {
        sparkleTarget.current = targetIndex
        sparkleTargetUntil.current = time + 0.72
      }

      const particle =
        sparkleTarget.current >= 0 ? sparkles.current[sparkleTarget.current] : undefined

      if (particle?.active) {
        desired.copy(particle.position)
        desired.x += Math.sin(time * 4.6 + particle.phase) * 0.018
        desired.y += Math.cos(time * 4.1 + particle.phase) * 0.018

        if (behaviorPoints[0].distanceToSquared(particle.position) < 0.018) {
          particle.active = false
          sparkleTarget.current = -1
        }
      } else {
        idleOffset.set(
          Math.sin(time * 0.92) * 0.34 + Math.sin(time * 0.27) * 0.12,
          Math.cos(time * 0.76) * 0.24 + Math.sin(time * 0.38) * 0.09,
          Math.sin(time * 0.51) * 0.08,
        )
        desired.copy(current.pointerWorld).add(idleOffset)
      }
    }

    const headResponse = activelyPointing ? 17 : 4.8
    const headEase = 1 - Math.exp(-delta * headResponse)
    behaviorPoints[0].lerp(desired, headEase)

    for (let index = 1; index < behaviorPoints.length; index += 1) {
      const previous = behaviorPoints[index - 1]
      const point = behaviorPoints[index]

      deltaVector.subVectors(point, previous)
      if (deltaVector.lengthSq() < 0.000001) {
        deltaVector.set(-1, 0, 0)
      }

      deltaVector.normalize()
      desired.copy(previous).addScaledVector(deltaVector, THREAD_SEGMENT_LENGTH)

      const tailRatio = index / (behaviorPoints.length - 1)
      const curl = (0.0025 + tailRatio * 0.009) * (0.78 + energy * 0.55)
      desired.y += Math.sin(time * 2.0 - index * 0.22) * curl
      desired.z += Math.cos(time * 1.56 - index * 0.18) * curl * 0.76

      const follow = 1 - Math.exp(-delta * THREE.MathUtils.lerp(18, 7.2, tailRatio))
      point.lerp(desired, follow)
    }

    for (let index = 0; index < renderPoints.length; index += 1) {
      smoothCurve.getPoint(index / (renderPoints.length - 1), renderPoints[index])
    }

    updateRibbonGeometry(geometry, renderPoints, energy, tangent)

    material.uniforms.uTime.value = time
    material.uniforms.uEnergy.value = energy

    if (headRef.current) {
      headRef.current.position.copy(renderPoints[0])
      const scale = 0.052 + energy * 0.024 + Math.sin(time * 3.8) * 0.003
      headRef.current.scale.setScalar(scale)
    }

    if (haloRef.current) {
      haloRef.current.position.copy(renderPoints[0])
      const haloScale = 0.14 + energy * 0.075 + Math.sin(time * 2.2) * 0.012
      haloRef.current.scale.setScalar(haloScale)
    }
  })

  return (
    <group>
      <mesh geometry={geometry} frustumCulled={false}>
        <primitive object={material} attach="material" />
      </mesh>

      <mesh ref={haloRef}>
        <sphereGeometry args={[1, 22, 22]} />
        <meshBasicMaterial
          color="#8be9ff"
          transparent
          opacity={0.075}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={headRef}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color="#d8fbff" toneMapped={false} />
      </mesh>
    </group>
  )
}

function PointerStar({
  interaction,
}: {
  interaction: MutableRefObject<InteractionState>
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const material = useMemo(() => createPointerStarMaterial(), [])

  useEffect(() => {
    return () => material.dispose()
  }, [material])

  useFrame((state) => {
    if (!meshRef.current) return

    const current = interaction.current
    meshRef.current.position.copy(current.pointerWorld)
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.13

    const energy = current.pointerEnergy
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 4.8) * 0.045
    const scale = (0.34 + energy * 0.12) * pulse
    meshRef.current.scale.setScalar(scale)

    material.uniforms.uTime.value = state.clock.elapsedTime
    material.uniforms.uEnergy.value = energy
  })

  return (
    <mesh ref={meshRef} renderOrder={10}>
      <planeGeometry args={[1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

function SparkleField({
  sparkles,
}: {
  sparkles: MutableRefObject<SparkleParticle[]>
}) {
  const geometry = useMemo(() => createSparkleGeometry(SPARKLE_COUNT), [])
  const material = useMemo(() => createSparkleMaterial(), [])

  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  useFrame((state) => {
    const positions = geometry.getAttribute('position') as THREE.BufferAttribute
    const lives = geometry.getAttribute('aLife') as THREE.BufferAttribute
    const sizes = geometry.getAttribute('aSize') as THREE.BufferAttribute
    const phases = geometry.getAttribute('aPhase') as THREE.BufferAttribute

    const positionValues = positions.array as Float32Array
    const lifeValues = lives.array as Float32Array
    const sizeValues = sizes.array as Float32Array
    const phaseValues = phases.array as Float32Array

    for (let index = 0; index < sparkles.current.length; index += 1) {
      const particle = sparkles.current[index]
      const base = index * 3

      if (!particle.active) {
        positionValues[base] = 0
        positionValues[base + 1] = 0
        positionValues[base + 2] = -40
        lifeValues[index] = 0
        sizeValues[index] = 0
        phaseValues[index] = particle.phase
        continue
      }

      const progress = particle.age / particle.life
      const fadeIn = Math.min(1, particle.age / 0.07)
      const fadeOut = Math.pow(Math.max(0, 1 - progress), 1.15)

      positionValues[base] = particle.position.x
      positionValues[base + 1] = particle.position.y
      positionValues[base + 2] = particle.position.z
      lifeValues[index] = fadeIn * fadeOut
      sizeValues[index] = particle.size
      phaseValues[index] = particle.phase
    }

    positions.needsUpdate = true
    lives.needsUpdate = true
    sizes.needsUpdate = true
    phases.needsUpdate = true

    material.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <points geometry={geometry} frustumCulled={false}>
      <primitive object={material} attach="material" />
    </points>
  )
}

function DeepStarfield() {
  const groupRef = useRef<THREE.Group>(null)
  const positions = useMemo(() => {
    const random = seededRandom(0x6a09e667)
    const values = new Float32Array(2200 * 3)

    for (let index = 0; index < 2200; index += 1) {
      const radius = 7 + random() * 26
      const angle = random() * Math.PI * 2
      const elevation = (random() - 0.5) * Math.PI * 0.82

      values[index * 3] = Math.cos(angle) * Math.cos(elevation) * radius
      values[index * 3 + 1] = Math.sin(elevation) * radius * 0.72
      values[index * 3 + 2] = -3 - random() * 34
    }

    return values
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.z += delta * 0.0016
    groupRef.current.rotation.y = Math.sin(time * 0.045) * 0.022
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#b9ccff"
          size={0.032}
          sizeAttenuation
          transparent
          opacity={0.72}
          depthWrite={false}
          toneMapped={false}
        />
      </points>
    </group>
  )
}

function HorizonRings() {
  const ringA = useRef<THREE.Mesh>(null)
  const ringB = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (ringA.current) {
      ringA.current.rotation.z = Math.sin(time * 0.08) * 0.018
      const pulse = 1 + Math.sin(time * 0.46) * 0.012
      ringA.current.scale.setScalar(pulse)
    }

    if (ringB.current) {
      ringB.current.rotation.z = -Math.sin(time * 0.065) * 0.024
    }
  })

  return (
    <group position={[0, -3.35, -8.5]} rotation={[Math.PI / 2.28, 0, 0]}>
      <mesh ref={ringA}>
        <ringGeometry args={[5.4, 5.43, 192]} />
        <meshBasicMaterial
          color="#76e8ff"
          transparent
          opacity={0.17}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={ringB} scale={1.32}>
        <ringGeometry args={[5.4, 5.415, 192]} />
        <meshBasicMaterial
          color="#bd8cff"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

function AtmosphericNodes() {
  const nodes = useMemo(
    () => [
      { position: [-3.8, 1.7, -4.5] as [number, number, number], color: '#7ee8fa', phase: 0.2 },
      { position: [4.2, 0.8, -7.2] as [number, number, number], color: '#d79bff', phase: 1.8 },
      { position: [-4.9, -2.1, -9.5] as [number, number, number], color: '#9aa8ff', phase: 3.1 },
      { position: [2.9, -2.5, -5.8] as [number, number, number], color: '#8cf5d5', phase: 4.2 },
    ],
    [],
  )

  return (
    <>
      {nodes.map((node) => (
        <BreathingNode key={node.phase} {...node} />
      ))}
    </>
  )
}

function BreathingNode({
  position,
  color,
  phase,
}: {
  position: [number, number, number]
  color: string
  phase: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    const scale = 0.07 + (Math.sin(time * 0.9 + phase) * 0.5 + 0.5) * 0.035
    meshRef.current.scale.setScalar(scale)
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 18, 18]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  )
}

function CameraBreath() {
  const camera = useThree((state) => state.camera)
  const targetPosition = useMemo(() => new THREE.Vector3(), [])
  const lookTarget = useMemo(() => new THREE.Vector3(0, 0, -2.2), [])

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    targetPosition.set(
      state.pointer.x * 0.18 + Math.sin(time * 0.14) * 0.045,
      state.pointer.y * 0.11 + Math.cos(time * 0.17) * 0.035,
      6 + Math.sin(time * 0.11) * 0.055,
    )

    camera.position.lerp(targetPosition, 1 - Math.exp(-delta * 2.2))
    camera.lookAt(lookTarget)
  })

  return null
}

function resolveSparkleTarget(
  particles: SparkleParticle[],
  head: THREE.Vector3,
  currentIndex: number,
  currentUntil: number,
  time: number,
) {
  if (currentIndex >= 0 && time < currentUntil) {
    const current = particles[currentIndex]
    if (
      current?.active &&
      current.age > 0.14 &&
      current.life - current.age > 0.28
    ) {
      return currentIndex
    }
  }

  let bestIndex = -1
  let bestScore = Number.POSITIVE_INFINITY

  for (let index = 0; index < particles.length; index += 1) {
    const particle = particles[index]
    if (!particle.active) continue
    if (particle.age < 0.14 || particle.life - particle.age < 0.34) continue

    const distance = head.distanceToSquared(particle.position)
    const freshnessPenalty = (particle.age / particle.life) * 0.24
    const score = distance + freshnessPenalty

    if (score < bestScore) {
      bestScore = score
      bestIndex = index
    }
  }

  return bestIndex
}

function createInteractionState(): InteractionState {
  return {
    pointerWorld: new THREE.Vector3(0, 0, -0.05),
    previousWorld: new THREE.Vector3(0, 0, -0.05),
    pointerVelocity: new THREE.Vector3(),
    pointerEnergy: 0,
    idleTime: 0,
    emitDistance: 0,
    hasPointer: false,
  }
}

function createSparklePool() {
  return Array.from({ length: SPARKLE_COUNT }, (_, index): SparkleParticle => ({
    active: false,
    position: new THREE.Vector3(0, 0, -40),
    velocity: new THREE.Vector3(),
    age: 0,
    life: 2,
    size: 5,
    phase: index * 0.73,
  }))
}

function emitSparkle(
  particles: SparkleParticle[],
  origin: THREE.Vector3,
  pointerVelocity: THREE.Vector3,
  random: () => number,
) {
  let particle = particles.find((candidate) => !candidate.active)

  if (!particle) {
    particle = particles.reduce((oldest, candidate) =>
      candidate.age > oldest.age ? candidate : oldest,
    )
  }

  particle.active = true
  particle.age = 0
  particle.life = 1.9 + random() * 1.65
  particle.size = 4.5 + random() * 5.5
  particle.phase = random() * Math.PI * 2

  particle.position.copy(origin)
  particle.position.x += (random() - 0.5) * 0.035
  particle.position.y += (random() - 0.5) * 0.035
  particle.position.z -= 0.01 + random() * 0.035

  particle.velocity.copy(pointerVelocity).multiplyScalar(-0.012)
  particle.velocity.x += (random() - 0.5) * 0.11
  particle.velocity.y += (random() - 0.5) * 0.11
  particle.velocity.z += (random() - 0.5) * 0.045
}

function createRibbonGeometry(count: number) {
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 2 * 3)
  const uvs = new Float32Array(count * 2 * 2)
  const indices: number[] = []

  for (let index = 0; index < count; index += 1) {
    const t = index / (count - 1)
    uvs[index * 4] = t
    uvs[index * 4 + 1] = 0
    uvs[index * 4 + 2] = t
    uvs[index * 4 + 3] = 1

    if (index < count - 1) {
      const vertex = index * 2
      indices.push(
        vertex,
        vertex + 1,
        vertex + 2,
        vertex + 1,
        vertex + 3,
        vertex + 2,
      )
    }
  }

  const positionAttribute = new THREE.BufferAttribute(positions, 3)
  positionAttribute.setUsage(THREE.DynamicDrawUsage)

  geometry.setAttribute('position', positionAttribute)
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
  geometry.setIndex(indices)

  return geometry
}

function updateRibbonGeometry(
  geometry: THREE.BufferGeometry,
  points: THREE.Vector3[],
  energy: number,
  tangent: THREE.Vector3,
) {
  const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute
  const values = positionAttribute.array as Float32Array

  for (let index = 0; index < points.length; index += 1) {
    const point = points[index]
    const previous = points[Math.max(0, index - 1)]
    const next = points[Math.min(points.length - 1, index + 1)]
    tangent.subVectors(next, previous)

    let sideX = -tangent.y
    let sideY = tangent.x
    const sideLength = Math.hypot(sideX, sideY) || 1
    sideX /= sideLength
    sideY /= sideLength

    const t = index / (points.length - 1)
    const taper = Math.pow(1 - t, 0.66)
    const breathing = 0.92 + Math.sin(t * Math.PI * 5) * 0.045
    const width = (0.043 + energy * 0.021) * (0.16 + taper * 0.84) * breathing

    const left = index * 6
    const right = left + 3

    values[left] = point.x + sideX * width
    values[left + 1] = point.y + sideY * width
    values[left + 2] = point.z

    values[right] = point.x - sideX * width
    values[right + 1] = point.y - sideY * width
    values[right + 2] = point.z
  }

  positionAttribute.needsUpdate = true
}

function createThreadMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
    uniforms: {
      uTime: { value: 0 },
      uEnergy: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uEnergy;
      varying vec2 vUv;

      void main() {
        float center = 1.0 - abs(vUv.y * 2.0 - 1.0);
        float edge = smoothstep(0.0, 0.62, center);
        float core = smoothstep(0.58, 1.0, center);

        float tail = 1.0 - smoothstep(0.72, 1.0, vUv.x);
        float pulse = 0.72 + 0.28 * sin(uTime * (2.0 + uEnergy * 2.6) - vUv.x * 26.0);
        float filament = 0.72 + 0.28 * sin(vUv.x * 74.0 - uTime * 3.1);

        vec3 violet = vec3(0.60, 0.36, 1.38);
        vec3 cyan = vec3(0.34, 1.28, 1.62);
        vec3 whiteCore = vec3(1.35, 1.55, 1.72);

        float colorMix = 0.5 + 0.5 * sin(vUv.x * 9.0 + uTime * 0.55);
        vec3 color = mix(violet, cyan, colorMix);
        color = mix(color, whiteCore, core * (0.3 + uEnergy * 0.38));

        float alpha = (edge * 0.54 + core * 0.52) * tail;
        alpha *= mix(0.74, 1.0, pulse * filament);
        alpha *= 0.88 + uEnergy * 0.34;

        gl_FragColor = vec4(color, alpha);
      }
    `,
  })
}

function createPointerStarMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
    uniforms: {
      uTime: { value: 0 },
      uEnergy: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uEnergy;
      varying vec2 vUv;

      void main() {
        vec2 p = (vUv - 0.5) * 2.0;
        float radius = length(p);

        float core = 1.0 - smoothstep(0.02, 0.24, radius);
        float rayX = exp(-abs(p.y) * 34.0) * (1.0 - smoothstep(0.12, 0.98, abs(p.x)));
        float rayY = exp(-abs(p.x) * 34.0) * (1.0 - smoothstep(0.12, 0.98, abs(p.y)));

        vec2 diagonal = vec2(
          (p.x + p.y) * 0.70710678,
          (p.y - p.x) * 0.70710678
        );
        float rayD1 = exp(-abs(diagonal.y) * 42.0) * (1.0 - smoothstep(0.20, 0.85, abs(diagonal.x)));
        float rayD2 = exp(-abs(diagonal.x) * 42.0) * (1.0 - smoothstep(0.20, 0.85, abs(diagonal.y)));

        float halo = (1.0 - smoothstep(0.08, 0.78, radius)) * 0.18;
        float twinkle = 0.88 + 0.12 * sin(uTime * 5.2);

        float shape = max(core * 1.25, max(rayX, rayY));
        shape = max(shape, max(rayD1, rayD2) * 0.56);
        shape = max(shape, halo);
        shape *= twinkle * (0.92 + uEnergy * 0.18);

        vec3 color = mix(vec3(0.46, 1.18, 1.52), vec3(1.45, 1.55, 1.75), core);

        if (shape < 0.012) discard;
        gl_FragColor = vec4(color, shape);
      }
    `,
  })
}

function createSparkleGeometry(count: number) {
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 3)
  const lives = new Float32Array(count)
  const sizes = new Float32Array(count)
  const phases = new Float32Array(count)

  for (let index = 0; index < count; index += 1) {
    positions[index * 3 + 2] = -40
  }

  const positionAttribute = new THREE.BufferAttribute(positions, 3)
  positionAttribute.setUsage(THREE.DynamicDrawUsage)

  const lifeAttribute = new THREE.BufferAttribute(lives, 1)
  lifeAttribute.setUsage(THREE.DynamicDrawUsage)

  const sizeAttribute = new THREE.BufferAttribute(sizes, 1)
  sizeAttribute.setUsage(THREE.DynamicDrawUsage)

  const phaseAttribute = new THREE.BufferAttribute(phases, 1)
  phaseAttribute.setUsage(THREE.DynamicDrawUsage)

  geometry.setAttribute('position', positionAttribute)
  geometry.setAttribute('aLife', lifeAttribute)
  geometry.setAttribute('aSize', sizeAttribute)
  geometry.setAttribute('aPhase', phaseAttribute)

  return geometry
}

function createSparkleMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: `
      attribute float aLife;
      attribute float aSize;
      attribute float aPhase;

      varying float vLife;
      varying float vPhase;

      void main() {
        vLife = aLife;
        vPhase = aPhase;

        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * clamp(6.0 / max(1.0, -mvPosition.z), 0.7, 1.35);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float uTime;

      varying float vLife;
      varying float vPhase;

      void main() {
        vec2 p = (gl_PointCoord - 0.5) * 2.0;
        float radius = length(p);

        float core = 1.0 - smoothstep(0.02, 0.34, radius);
        float rayX = exp(-abs(p.y) * 18.0) * (1.0 - smoothstep(0.15, 0.92, abs(p.x)));
        float rayY = exp(-abs(p.x) * 18.0) * (1.0 - smoothstep(0.15, 0.92, abs(p.y)));
        float twinkle = 0.76 + 0.24 * sin(uTime * 5.6 + vPhase);

        float alpha = max(core, max(rayX, rayY) * 0.72) * vLife * twinkle;

        if (alpha < 0.015) discard;
        gl_FragColor = vec4(vec3(0.76, 1.22, 1.52), alpha);
      }
    `,
  })
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
