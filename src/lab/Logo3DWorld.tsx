import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import type { MutableRefObject } from 'react'
import * as THREE from 'three'
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js'

type Logo3DWorldProps = {
  scrollProgress: MutableRefObject<number>
}

type TubeProfile = (t: number) => number

export default function Logo3DWorld({ scrollProgress }: Logo3DWorldProps) {
  const groupRef = useRef<THREE.Group>(null)
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#05060a'),
        metalness: 0.96,
        roughness: 0.12,
        clearcoat: 1,
        clearcoatRoughness: 0.045,
        envMapIntensity: 2.65,
        reflectivity: 1,
      }),
    [],
  )

  useEffect(() => () => material.dispose(), [material])

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return

    const p = scrollProgress.current
    const ease = THREE.MathUtils.smoothstep(p, 0, 1)

    const targetRotY = THREE.MathUtils.lerp(-0.12, 0.62, ease)
    const targetRotX =
      THREE.MathUtils.lerp(0.03, -0.18, ease) +
      Math.sin(p * Math.PI * 2.2) * 0.055
    const targetRotZ = THREE.MathUtils.lerp(-0.035, 0.08, ease)

    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetRotY, 4.2, delta)
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetRotX, 4.2, delta)
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, targetRotZ, 4.2, delta)

    const targetScale = THREE.MathUtils.lerp(0.88, 1.14, THREE.MathUtils.smoothstep(p, 0.18, 0.78))
    const scale = THREE.MathUtils.damp(group.scale.x, targetScale, 3.5, delta)
    group.scale.setScalar(scale)

    const camera = state.camera
    const pointer = state.pointer
    const cameraTarget = new THREE.Vector3(
      pointer.x * 0.34 + THREE.MathUtils.lerp(0, 0.55, ease),
      pointer.y * 0.19 + THREE.MathUtils.lerp(0.12, -0.18, ease),
      THREE.MathUtils.lerp(9.6, 6.45, THREE.MathUtils.smoothstep(p, 0.08, 0.72)),
    )

    camera.position.x = THREE.MathUtils.damp(camera.position.x, cameraTarget.x, 3.4, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, cameraTarget.y, 3.4, delta)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, cameraTarget.z, 3.4, delta)
    camera.lookAt(0.35, -0.05, -0.45)
  })

  return (
    <>
      <color attach="background" args={['#010207']} />
      <fog attach="fog" args={['#010207', 11, 42]} />

      <ambientLight intensity={0.055} />
      <directionalLight position={[-5, 5, 4]} intensity={1.3} color="#9fdcff" />
      <pointLight position={[5.3, 2.7, 2.8]} intensity={74} distance={16} decay={2.1} color="#c89bff" />
      <pointLight position={[-4.2, -1.4, 3.2]} intensity={58} distance={13} decay={2.2} color="#6edcff" />

      <ReflectionEnvironment />
      <NebulaDome />
      <DeepStars />
      <HorizonSurface />

      <group ref={groupRef} position={[0, -0.08, 0]}>
        <UniversalHorizonMark material={material} />
        <TipStar position={[4.88, 3.42, -0.02]} />
      </group>

      <WorldLensFlare position={[0.45, -2.55, 0.2]} />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={1.34}
          luminanceThreshold={0.42}
          luminanceSmoothing={0.72}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.17} darkness={0.74} />
      </EffectComposer>
    </>
  )
}

function UniversalHorizonMark({ material }: { material: THREE.MeshPhysicalMaterial }) {
  const uCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          [-4.55, 2.45, 0.02],
          [-4.22, 2.86, 0.02],
          [-4.18, 1.45, 0.02],
          [-4.08, -0.08, 0.02],
          [-3.72, -1.36, 0.02],
          [-3.02, -1.62, 0.02],
          [-2.15, -1.09, 0.02],
          [-1.38, 0.01, 0.02],
          [-0.77, 1.18, 0.02],
          [-0.14, 2.08, 0.02],
          [0.73, 2.48, 0.02],
          [2.08, 2.76, 0.02],
          [3.48, 3.05, 0.02],
          [4.88, 3.42, 0.02],
        ].map(([x, y, z]) => new THREE.Vector3(x, y, z)),
        false,
        'centripetal',
        0.5,
      ),
    [],
  )

  const hLeftCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          [-1.88, -3.0, 0],
          [-1.48, -2.73, 0],
          [-1.17, -2.16, 0],
          [-1.01, -1.25, 0],
          [-0.84, -0.18, 0],
          [-0.57, 1.18, 0],
          [-0.36, 1.74, 0],
        ].map(([x, y, z]) => new THREE.Vector3(x, y, z)),
        false,
        'centripetal',
        0.5,
      ),
    [],
  )

  const hRightCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          [1.4, -3.0, 0],
          [1.22, -2.54, 0],
          [1.19, -1.72, 0],
          [1.27, -0.68, 0],
          [1.38, 0.42, 0],
          [1.48, 1.28, 0],
          [1.55, 1.68, 0],
          [1.98, 1.35, 0],
        ].map(([x, y, z]) => new THREE.Vector3(x, y, z)),
        false,
        'centripetal',
        0.5,
      ),
    [],
  )

  const hCrossCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          [-2.18, -1.17, 0.02],
          [-1.22, -0.91, 0.02],
          [-0.2, -0.63, 0.02],
          [0.88, -0.34, 0.02],
          [1.83, -0.08, 0.02],
          [2.68, 0.08, 0.02],
        ].map(([x, y, z]) => new THREE.Vector3(x, y, z)),
        false,
        'centripetal',
        0.5,
      ),
    [],
  )

  const uGeometry = useMemo(
    () =>
      createTaperedTubeGeometry(
        uCurve,
        240,
        18,
        (t) => {
          const base = 0.21 + Math.sin(t * Math.PI) * 0.12
          const tipTaper = THREE.MathUtils.smoothstep(t, 0.82, 1)
          return THREE.MathUtils.lerp(base, 0.055, tipTaper)
        },
        0.46,
      ),
    [uCurve],
  )

  const hLeftGeometry = useMemo(
    () =>
      createTaperedTubeGeometry(
        hLeftCurve,
        120,
        18,
        (t) => 0.19 + Math.sin(t * Math.PI) * 0.08,
        0.43,
      ),
    [hLeftCurve],
  )

  const hRightGeometry = useMemo(
    () =>
      createTaperedTubeGeometry(
        hRightCurve,
        128,
        18,
        (t) => 0.19 + Math.sin(t * Math.PI) * 0.075,
        0.44,
      ),
    [hRightCurve],
  )

  const hCrossGeometry = useMemo(
    () =>
      createTaperedTubeGeometry(
        hCrossCurve,
        110,
        16,
        (t) => 0.07 + Math.sin(t * Math.PI) * 0.14,
        0.34,
      ),
    [hCrossCurve],
  )

  useEffect(
    () => () => {
      uGeometry.dispose()
      hLeftGeometry.dispose()
      hRightGeometry.dispose()
      hCrossGeometry.dispose()
    },
    [uGeometry, hLeftGeometry, hRightGeometry, hCrossGeometry],
  )

  return (
    <group rotation={[0.015, -0.015, -0.015]}>
      <mesh geometry={uGeometry} material={material} castShadow />
      <mesh geometry={hLeftGeometry} material={material} castShadow />
      <mesh geometry={hRightGeometry} material={material} castShadow />
      <mesh geometry={hCrossGeometry} material={material} castShadow />

      <OrbitBand />
    </group>
  )
}

function OrbitBand() {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          [-2.9, -1.31, -0.26],
          [-1.2, -0.96, -0.2],
          [0.5, -0.58, -0.08],
          [2.2, -0.19, -0.02],
          [3.7, 0.24, -0.18],
        ].map(([x, y, z]) => new THREE.Vector3(x, y, z)),
        false,
        'centripetal',
        0.5,
      ),
    [],
  )

  const geometry = useMemo(
    () => createTaperedTubeGeometry(curve, 120, 10, (t) => 0.028 + Math.sin(t * Math.PI) * 0.018, 0.55),
    [curve],
  )

  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color="#f5c79f"
        emissive="#ffb86a"
        emissiveIntensity={2.7}
        metalness={0.58}
        roughness={0.23}
        toneMapped={false}
      />
    </mesh>
  )
}

function ReflectionEnvironment() {
  return (
    <Environment resolution={512}>
      <mesh scale={30}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial color="#02030a" side={THREE.BackSide} />
      </mesh>

      <mesh position={[-6, 3.5, 1]} rotation={[0, 0.65, -0.15]}>
        <planeGeometry args={[7, 3]} />
        <meshBasicMaterial color="#3fbdf7" toneMapped={false} />
      </mesh>

      <mesh position={[6, 3.2, -1]} rotation={[0, -0.7, 0.1]}>
        <planeGeometry args={[8, 3.5]} />
        <meshBasicMaterial color="#8f4dff" toneMapped={false} />
      </mesh>

      <mesh position={[0, -5.5, 1.5]} rotation={[-Math.PI / 2.8, 0, 0]}>
        <planeGeometry args={[14, 2]} />
        <meshBasicMaterial color="#ffb56f" toneMapped={false} />
      </mesh>

      <mesh position={[0.5, 0.2, -10]}>
        <planeGeometry args={[18, 12]} />
        <meshBasicMaterial color="#10152f" toneMapped={false} />
      </mesh>
    </Environment>
  )
}

function DeepStars() {
  const positions = useMemo(() => {
    const random = seededRandom(0x9e3779b9)
    const values = new Float32Array(3200 * 3)

    for (let index = 0; index < 3200; index += 1) {
      const radius = 10 + random() * 35
      const theta = random() * Math.PI * 2
      const phi = Math.acos(2 * random() - 1)

      values[index * 3] = radius * Math.sin(phi) * Math.cos(theta)
      values[index * 3 + 1] = radius * Math.cos(phi) * 0.75
      values[index * 3 + 2] = -4 - random() * 42
    }

    return values
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#d8e6ff"
        size={0.037}
        sizeAttenuation
        transparent
        opacity={0.78}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  )
}

function NebulaDome() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
        },
        vertexShader: `
          varying vec3 vWorld;
          void main() {
            vec4 world = modelMatrix * vec4(position, 1.0);
            vWorld = normalize(world.xyz);
            gl_Position = projectionMatrix * viewMatrix * world;
          }
        `,
        fragmentShader: `
          uniform float uTime;
          varying vec3 vWorld;

          float hash(vec3 p) {
            p = fract(p * 0.3183099 + vec3(.1,.2,.3));
            p *= 17.0;
            return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
          }

          float noise(vec3 p) {
            vec3 i = floor(p);
            vec3 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);

            return mix(
              mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                  mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
              mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                  mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
              f.z
            );
          }

          float fbm(vec3 p) {
            float value = 0.0;
            float amp = 0.5;
            for (int i = 0; i < 5; i++) {
              value += noise(p) * amp;
              p *= 2.03;
              amp *= 0.5;
            }
            return value;
          }

          void main() {
            vec3 d = normalize(vWorld);
            float time = uTime * 0.008;
            float n = fbm(d * 4.2 + vec3(time, -time * 0.6, time * 0.4));
            float band = pow(max(0.0, 1.0 - abs(d.y + d.x * 0.23) * 1.65), 2.0);
            float cloud = smoothstep(0.43, 0.78, n) * band;

            vec3 violet = vec3(0.13, 0.055, 0.28);
            vec3 blue = vec3(0.035, 0.11, 0.24);
            vec3 warm = vec3(0.22, 0.09, 0.045);

            float warmBand = pow(max(0.0, 1.0 - abs(d.y + 0.18) * 4.0), 3.0);
            vec3 color = mix(blue, violet, n);
            color += cloud * vec3(0.14, 0.12, 0.34);
            color += warm * warmBand * 0.36;

            gl_FragColor = vec4(color, 1.0);
          }
        `,
      }),
    [],
  )

  useEffect(() => () => material.dispose(), [material])

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <mesh scale={34}>
      <sphereGeometry args={[1, 72, 72]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

function HorizonSurface() {
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#020308',
        metalness: 0.62,
        roughness: 0.18,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        envMapIntensity: 1.7,
      }),
    [],
  )

  useEffect(() => () => material.dispose(), [material])

  return (
    <>
      <mesh position={[0, -3.03, -1.2]} rotation={[-Math.PI / 2, 0, 0]} material={material}>
        <planeGeometry args={[30, 22, 1, 1]} />
      </mesh>

      <mesh position={[0.4, -2.9, -1.6]} rotation={[Math.PI / 2.18, 0, 0]}>
        <ringGeometry args={[5.8, 5.84, 220]} />
        <meshBasicMaterial
          color="#7ecbff"
          transparent
          opacity={0.24}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </>
  )
}

function WorldLensFlare({ position }: { position: [number, number, number] }) {
  const flare = useMemo(() => {
    const primary = createFlareTexture(256, false)
    const ring = createFlareTexture(256, true)

    const lensflare = new Lensflare()
    lensflare.addElement(new LensflareElement(primary, 270, 0, new THREE.Color('#ffd7a2')))
    lensflare.addElement(new LensflareElement(ring, 110, 0.18, new THREE.Color('#8fc7ff')))
    lensflare.addElement(new LensflareElement(ring, 70, 0.42, new THREE.Color('#b389ff')))
    lensflare.addElement(new LensflareElement(primary, 34, 0.72, new THREE.Color('#fff1d9')))

    return { lensflare, primary, ring }
  }, [])

  useEffect(
    () => () => {
      flare.primary.dispose()
      flare.ring.dispose()
    },
    [flare],
  )

  return (
    <pointLight position={position} color="#ffbf7b" intensity={95} distance={15} decay={2}>
      <primitive object={flare.lensflare} />
    </pointLight>
  )
}

function TipStar({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.3) * 0.08
    ref.current.scale.setScalar(pulse)
  })

  return (
    <group ref={ref} position={position}>
      <pointLight color="#ffe6c6" intensity={52} distance={7} decay={2} />
      <mesh>
        <sphereGeometry args={[0.055, 20, 20]} />
        <meshBasicMaterial color="#fff7e9" toneMapped={false} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.52, 0.018]} />
        <meshBasicMaterial
          color="#fff4df"
          transparent
          opacity={0.78}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <planeGeometry args={[0.66, 0.016]} />
        <meshBasicMaterial
          color="#dceaff"
          transparent
          opacity={0.68}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

function createTaperedTubeGeometry(
  curve: THREE.Curve<THREE.Vector3>,
  tubularSegments: number,
  radialSegments: number,
  radiusProfile: TubeProfile,
  flatten: number,
) {
  const geometry = new THREE.BufferGeometry()
  const frames = curve.computeFrenetFrames(tubularSegments, false)
  const vertexCount = (tubularSegments + 1) * radialSegments

  const positions = new Float32Array(vertexCount * 3)
  const uvs = new Float32Array(vertexCount * 2)
  const indices: number[] = []

  const point = new THREE.Vector3()
  const offset = new THREE.Vector3()

  let positionIndex = 0
  let uvIndex = 0

  for (let segment = 0; segment <= tubularSegments; segment += 1) {
    const t = segment / tubularSegments
    curve.getPointAt(t, point)

    const normal = frames.normals[segment]
    const binormal = frames.binormals[segment]
    const radius = radiusProfile(t)

    for (let side = 0; side < radialSegments; side += 1) {
      const angle = (side / radialSegments) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius * flatten

      offset
        .copy(normal)
        .multiplyScalar(x)
        .addScaledVector(binormal, y)

      positions[positionIndex] = point.x + offset.x
      positions[positionIndex + 1] = point.y + offset.y
      positions[positionIndex + 2] = point.z + offset.z
      positionIndex += 3

      uvs[uvIndex] = t
      uvs[uvIndex + 1] = side / radialSegments
      uvIndex += 2
    }
  }

  for (let segment = 0; segment < tubularSegments; segment += 1) {
    for (let side = 0; side < radialSegments; side += 1) {
      const nextSide = (side + 1) % radialSegments
      const a = segment * radialSegments + side
      const b = (segment + 1) * radialSegments + side
      const c = (segment + 1) * radialSegments + nextSide
      const d = segment * radialSegments + nextSide

      indices.push(a, b, d, b, c, d)
    }
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  geometry.computeBoundingSphere()

  return geometry
}

function createFlareTexture(size: number, ring: boolean) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')

  if (!context) {
    return new THREE.CanvasTexture(canvas)
  }

  const center = size / 2

  if (ring) {
    const gradient = context.createRadialGradient(center, center, size * 0.08, center, center, size * 0.5)
    gradient.addColorStop(0, 'rgba(255,255,255,0)')
    gradient.addColorStop(0.38, 'rgba(255,255,255,0.10)')
    gradient.addColorStop(0.52, 'rgba(255,255,255,0.42)')
    gradient.addColorStop(0.7, 'rgba(255,255,255,0.08)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    context.fillStyle = gradient
    context.fillRect(0, 0, size, size)
  } else {
    const gradient = context.createRadialGradient(center, center, 0, center, center, size * 0.5)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.08, 'rgba(255,245,222,0.92)')
    gradient.addColorStop(0.28, 'rgba(255,204,153,0.46)')
    gradient.addColorStop(0.58, 'rgba(150,180,255,0.15)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    context.fillStyle = gradient
    context.fillRect(0, 0, size, size)

    context.globalCompositeOperation = 'screen'
    context.fillStyle = 'rgba(255,255,255,0.32)'
    context.fillRect(center - 0.6, size * 0.08, 1.2, size * 0.84)
    context.fillRect(size * 0.08, center - 0.6, size * 0.84, 1.2)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
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
