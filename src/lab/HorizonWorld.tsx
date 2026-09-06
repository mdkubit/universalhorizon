import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const THREAD_POINTS = 92
const THREAD_SEGMENT_LENGTH = 0.072

export default function HorizonWorld() {
  return (
    <>
      <color attach="background" args={['#02040b']} />
      <fog attach="fog" args={['#02040b', 9, 44]} />

      <DeepStarfield />
      <HorizonRings />
      <AtmosphericNodes />
      <LivingThread />
      <CameraBreath />

      <EffectComposer>
        <Bloom
          intensity={1.75}
          luminanceThreshold={0.08}
          luminanceSmoothing={0.82}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}

function LivingThread() {
  const geometry = useMemo(() => createRibbonGeometry(THREAD_POINTS), [])
  const material = useMemo(() => createThreadMaterial(), [])
  const points = useMemo(
    () =>
      Array.from({ length: THREAD_POINTS }, (_, index) =>
        new THREE.Vector3(-index * THREAD_SEGMENT_LENGTH, 0, -0.2 - index * 0.002),
      ),
    [],
  )

  const headRef = useRef<THREE.Mesh>(null)
  const haloRef = useRef<THREE.Mesh>(null)
  const lastPointer = useRef(new THREE.Vector2())
  const pointerEnergy = useRef(0)
  const pointerTarget = useMemo(() => new THREE.Vector3(), [])
  const wander = useMemo(() => new THREE.Vector3(), [])
  const desired = useMemo(() => new THREE.Vector3(), [])
  const deltaVector = useMemo(() => new THREE.Vector3(), [])
  const tangent = useMemo(() => new THREE.Vector3(), [])

  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const pointer = state.pointer
    const pointerDelta = Math.hypot(
      pointer.x - lastPointer.current.x,
      pointer.y - lastPointer.current.y,
    )
    const rawEnergy = Math.min(1, (pointerDelta / Math.max(delta, 1 / 120)) * 0.12)
    const energyEase = 1 - Math.exp(-delta * 7)

    pointerEnergy.current += (rawEnergy - pointerEnergy.current) * energyEase
    lastPointer.current.set(pointer.x, pointer.y)

    const energy = pointerEnergy.current
    const idleAmplitude = THREE.MathUtils.lerp(0.38, 0.14, energy)

    pointerTarget.set(
      pointer.x * state.viewport.width * 0.42,
      pointer.y * state.viewport.height * 0.38,
      -0.05,
    )
    wander.set(
      Math.sin(time * 0.73) * idleAmplitude + Math.sin(time * 0.19) * 0.18,
      Math.cos(time * 0.61) * idleAmplitude * 0.72 + Math.sin(time * 0.31) * 0.14,
      Math.sin(time * 0.43) * 0.18,
    )
    pointerTarget.add(wander)

    const headEase = 1 - Math.exp(-delta * THREE.MathUtils.lerp(2.6, 5.4, energy))
    points[0].lerp(pointerTarget, headEase)

    for (let index = 1; index < points.length; index += 1) {
      const previous = points[index - 1]
      const current = points[index]

      deltaVector.subVectors(current, previous)
      if (deltaVector.lengthSq() < 0.000001) {
        deltaVector.set(-1, 0, 0)
      }

      deltaVector.normalize()
      desired.copy(previous).addScaledVector(deltaVector, THREAD_SEGMENT_LENGTH)

      const tailRatio = index / (points.length - 1)
      const curl = (0.003 + tailRatio * 0.012) * (0.65 + energy * 0.8)
      desired.y += Math.sin(time * 2.15 - index * 0.24) * curl
      desired.z += Math.cos(time * 1.72 - index * 0.19) * curl * 0.8

      const follow = 1 - Math.exp(-delta * THREE.MathUtils.lerp(15, 6, tailRatio))
      current.lerp(desired, follow)
    }

    updateRibbonGeometry(geometry, points, energy, tangent)

    material.uniforms.uTime.value = time
    material.uniforms.uEnergy.value = energy

    if (headRef.current) {
      headRef.current.position.copy(points[0])
      const scale = 0.055 + energy * 0.028 + Math.sin(time * 3.8) * 0.004
      headRef.current.scale.setScalar(scale)
    }

    if (haloRef.current) {
      haloRef.current.position.copy(points[0])
      const haloScale = 0.14 + energy * 0.08 + Math.sin(time * 2.2) * 0.015
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
          opacity={0.08}
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
    const taper = Math.pow(1 - t, 0.62)
    const breathing = 0.88 + Math.sin(t * Math.PI * 5) * 0.07
    const width = (0.046 + energy * 0.026) * (0.18 + taper * 0.82) * breathing

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
