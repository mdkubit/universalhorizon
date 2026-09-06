import { Environment } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import type { MutableRefObject } from 'react'
import * as THREE from 'three'
import { logoPaths } from './logoPaths'
import { canonicalLettering } from './canonicalLettering'
import { cleanLetterGeometry } from './cleanLetterGeometry'
import { createCloudTexture, createNebulaTexture, createPlanetTexture } from './staticTextures'

type Logo3DWorldProps = {
  scrollProgress: MutableRefObject<number>
  homeChoreography?: boolean
  transparentBackground?: boolean
}

const EXTRUDE_DEPTH = 0.28
const LOGO_RIG_RADIUS = 6.8
const renderLogoPaths: [number, number][][] = logoPaths.map((path) =>
  smoothClosedPath(simplifyClosedPath(path, 0.018), 2.38, 4),
)

export default function Logo3DWorld({
  scrollProgress,
  homeChoreography = false,
  transparentBackground = false,
}: Logo3DWorldProps) {
  const logoRigRef = useRef<THREE.Group>(null)
  const emblemRef = useRef<THREE.Group>(null)
  const introStartedAt = useRef<number | null>(null)
  const introTime = useRef(0)
  const homeProgress = useRef(0)

  const hemisphereRef = useRef<THREE.HemisphereLight>(null)
  const warmLightRef = useRef<THREE.PointLight>(null)
  const blueLightRef = useRef<THREE.PointLight>(null)
  const violetLightRef = useRef<THREE.PointLight>(null)

  const lookTarget = useMemo(() => new THREE.Vector3(0, 0.02, 0), [])
  const cameraTarget = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    if (introStartedAt.current === null) {
      introStartedAt.current = state.clock.elapsedTime
    }

    const elapsed = state.clock.elapsedTime - introStartedAt.current
    introTime.current = elapsed

    const arrival = introPhase(elapsed, 0, 5.35)
    const arrivalDone = arrival >= 1
    const p = arrivalDone
      ? THREE.MathUtils.clamp(scrollProgress.current, 0, 1)
      : 0
    homeProgress.current = p

    const angle = arrivalDone
      ? homeChoreography
        ? THREE.MathUtils.lerp(-0.055, 0.055, smooth01(p))
        : THREE.MathUtils.lerp(-0.18, 0.2, smooth01(p))
      : THREE.MathUtils.lerp(-0.04, -0.18, smooth01(arrival))

    const distance = arrivalDone
      ? homeChoreography
        ? THREE.MathUtils.lerp(12.7, 11.9, horizonCrossing(p))
        : 12.7
      : THREE.MathUtils.lerp(14.2, 12.7, smooth01(arrival))

    const pointerWeight = arrivalDone ? 1 : 0
    const descent = homeChoreography ? homeCameraDescent(p) : 0
    const lookY = homeChoreography ? homeLookTargetY(p) : 0.02
    lookTarget.y = lookY

    cameraTarget.set(
      Math.sin(angle) * distance + state.pointer.x * 0.2 * pointerWeight,
      THREE.MathUtils.lerp(0.78, 0.38, arrival) +
        descent +
        state.pointer.y * 0.12 * pointerWeight,
      Math.cos(angle) * distance,
    )

    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      cameraTarget.x,
      4.2,
      delta,
    )
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      cameraTarget.y,
      4.2,
      delta,
    )
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      cameraTarget.z,
      4.2,
      delta,
    )
    state.camera.lookAt(lookTarget)

    const worldLight = introPhase(elapsed, 0.75, 4.7)

    if (hemisphereRef.current) {
      hemisphereRef.current.intensity = 0.5 * worldLight
    }
    if (warmLightRef.current) {
      warmLightRef.current.intensity = 13 * worldLight
    }
    if (blueLightRef.current) {
      blueLightRef.current.intensity = 16 * worldLight
    }
    if (violetLightRef.current) {
      violetLightRef.current.intensity = 9 * worldLight
    }

    if (logoRigRef.current) {
      const targetYaw =
        arrivalDone && homeChoreography ? homeLogoYaw(p) : 0

      logoRigRef.current.rotation.y = THREE.MathUtils.damp(
        logoRigRef.current.rotation.y,
        targetYaw,
        3.1,
        delta,
      )
    }

    if (emblemRef.current) {
      const floatWeight = introPhase(elapsed, 4.15, 5.35)
      emblemRef.current.position.x = 0
      emblemRef.current.position.y =
        0.52 +
        Math.sin(state.clock.elapsedTime * 0.32) * 0.025 * floatWeight
      emblemRef.current.position.z = LOGO_RIG_RADIUS
      emblemRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.17) * 0.008 * floatWeight
      emblemRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.13) * 0.006 * floatWeight
    }
  })

  return (
    <>
      {!transparentBackground && (
        <color attach="background" args={['#02030b']} />
      )}
      <fog attach="fog" args={['#02030b', 18, 70]} />

      {!transparentBackground && <ProceduralSky introTime={introTime} />}
      <DeepStars introTime={introTime} />
      <PlanetHorizon introTime={introTime} />
      <ReflectionEnvironment />

      <hemisphereLight
        ref={hemisphereRef}
        args={['#8da7ff', '#1b0d24', 0]}
      />
      <pointLight
        ref={warmLightRef}
        position={[-4.8, 3.4, 5.8]}
        intensity={0}
        distance={28}
        decay={2}
        color="#ffd2a0"
      />
      <pointLight
        ref={blueLightRef}
        position={[5.8, 3.8, 3.5]}
        intensity={0}
        distance={30}
        decay={2}
        color="#84b8ff"
      />
      <pointLight
        ref={violetLightRef}
        position={[2.7, -1.0, -1.0]}
        intensity={0}
        distance={18}
        decay={2}
        color="#a06dff"
      />

      <group ref={logoRigRef} position={[0, 0, -LOGO_RIG_RADIUS]}>
        <group ref={emblemRef} position={[0, 0.52, LOGO_RIG_RADIUS]}>
          <ExactEmblem
          introTime={introTime}
          homeProgress={homeProgress}
          homeChoreography={homeChoreography}
        />
          <TipLight
            position={[3.36, 2.773, 0.16]}
            introTime={introTime}
            homeProgress={homeProgress}
            homeChoreography={homeChoreography}
          />
        </group>
      </group>

      <HorizonLight
        position={[0.05, -2.72, -3.8]}
        introTime={introTime}
      />

    </>
  )
}

function ExactEmblem({
  introTime,
  homeProgress,
  homeChoreography,
}: {
  introTime: MutableRefObject<number>
  homeProgress: MutableRefObject<number>
  homeChoreography: boolean
}) {
  const geometries = useMemo(
    () =>
      renderLogoPaths.map((path) => {
        const shape = new THREE.Shape(
          path.map(([x, y]) => new THREE.Vector2(x, y)),
        )

        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: EXTRUDE_DEPTH,
          bevelEnabled: true,
          bevelSize: 0.035,
          bevelThickness: 0.05,
          bevelSegments: 5,
          steps: 1,
          curveSegments: 18,
        })

        geometry.translate(0, 0, -EXTRUDE_DEPTH / 2)
        geometry.computeVertexNormals()
        return geometry
      }),
    [],
  )

  const materialPairs = useMemo(
    () =>
      renderLogoPaths.map(() => {
        const face = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#0a0b11'),
          emissive: new THREE.Color('#070611'),
          emissiveIntensity: 0.16,
          metalness: 0.95,
          roughness: 0.16,
          clearcoat: 1,
          clearcoatRoughness: 0.055,
          reflectivity: 1,
          envMapIntensity: 0.15,
          transparent: true,
          opacity: 0,
        })

        const side = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#1b1413'),
          metalness: 0.9,
          roughness: 0.19,
          clearcoat: 0.88,
          clearcoatRoughness: 0.08,
          reflectivity: 1,
          envMapIntensity: 0.18,
          transparent: true,
          opacity: 0,
        })

        return [face, side] as const
      }),
    [],
  )

  useFrame(() => {
    const elapsed = introTime.current

    materialPairs.forEach(([face, side], index) => {
      const visibility =
        index === 0
          ? introPhase(elapsed, 0.55, 2.45)
          : introPhase(elapsed, 1.15, 3.0)

      const reflected = introPhase(elapsed, 0.95, 4.1)
      const homeVisibility = homeChoreography
        ? homeLogoVisibility(homeProgress.current)
        : 1

      face.opacity = visibility * homeVisibility
      side.opacity = visibility * homeVisibility
      face.envMapIntensity = THREE.MathUtils.lerp(0.2, 2.55, reflected)
      side.envMapIntensity = THREE.MathUtils.lerp(0.22, 2.85, reflected)
    })
  })

  useEffect(
    () => () => {
      geometries.forEach((geometry) => geometry.dispose())
      materialPairs.forEach(([face, side]) => {
        face.dispose()
        side.dispose()
      })
    },
    [geometries, materialPairs],
  )

  return (
    <group>
      {geometries.map((geometry, index) => (
        <mesh
          key={index}
          geometry={geometry}
          material={materialPairs[index]}
          castShadow
        />
      ))}

      {renderLogoPaths.map((path, index) => (
        <ContourEdges
          key={index}
          path={path}
          index={index}
          introTime={introTime}
          homeProgress={homeProgress}
          homeChoreography={homeChoreography}
        />
      ))}

      <CanonicalLettering
        introTime={introTime}
        homeProgress={homeProgress}
        homeChoreography={homeChoreography}
      />
    </group>
  )
}

function CanonicalLettering({
  introTime,
  homeProgress,
  homeChoreography,
}: {
  introTime: MutableRefObject<number>
  homeProgress: MutableRefObject<number>
  homeChoreography: boolean
}) {
  const geometries = useMemo(() => {
    const built: {
      geometry: THREE.BufferGeometry
      word: 'niversal' | 'orizon'
      letterIndex: number
    }[] = []

    canonicalLettering.letters.forEach((letter, letterIndex) => {
      const shapePath = new THREE.ShapePath()

      for (const [loopIndex, loop] of letter.loops.entries()) {
        if (
          letter.word === 'orizon' &&
          letter.letter === 'o' &&
          letterIndex === 8 &&
          loopIndex === 2
        ) {
          continue
        }

        const renderLoop = smoothClosedPath(
          simplifyClosedPath(loop, 1.15),
          2.18,
          3,
        )

        renderLoop.forEach(([sourceX, sourceY], index) => {
          const x =
            (sourceX / canonicalLettering.sourceSize[0] * 1200 - 610) * 0.00825
          const y =
            (300 - sourceY / canonicalLettering.sourceSize[1] * 670) * 0.0115

          if (index === 0) {
            shapePath.moveTo(x, y)
          } else {
            shapePath.lineTo(x, y)
          }
        })
      }

      for (const shape of shapePath.toShapes()) {
        const geometry = cleanLetterGeometry(
          new THREE.ExtrudeGeometry(shape, {
            depth: 0.055,
            bevelEnabled: false,
            steps: 1,
          }),
        )

        geometry.translate(0, 0, 0.17)
        built.push({
          geometry,
          word: letter.word,
          letterIndex,
        })
      }
    })

    return built
  }, [])

  const materialPairs = useMemo(
    () =>
      canonicalLettering.letters.map(() => {
        const face = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#d9ccff'),
          emissive: new THREE.Color('#66508f'),
          emissiveIntensity: 0,
          metalness: 0.16,
          roughness: 0.3,
          clearcoat: 0.78,
          clearcoatRoughness: 0.12,
          reflectivity: 0.72,
          envMapIntensity: 0.3,
          transparent: true,
          opacity: 0,
        })

        const side = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#7a678f'),
          emissive: new THREE.Color('#352845'),
          emissiveIntensity: 0,
          metalness: 0.48,
          roughness: 0.34,
          clearcoat: 0.5,
          clearcoatRoughness: 0.16,
          envMapIntensity: 0.35,
          transparent: true,
          opacity: 0,
        })

        return [face, side] as const
      }),
    [],
  )

  useFrame(() => {
    const elapsed = introTime.current

    materialPairs.forEach(([face, side], letterIndex) => {
      const visibility = introPhase(
        elapsed,
        2.15 + letterIndex * 0.11,
        2.85 + letterIndex * 0.11,
      )

      const homeVisibility = homeChoreography
        ? homeLogoVisibility(homeProgress.current)
        : 1

      face.opacity = visibility * homeVisibility
      side.opacity = visibility * homeVisibility
      face.emissiveIntensity = 0.3 * visibility
      side.emissiveIntensity = 0.12 * visibility
      face.envMapIntensity = THREE.MathUtils.lerp(0.3, 1.15, visibility)
      side.envMapIntensity = THREE.MathUtils.lerp(0.35, 1.28, visibility)
    })
  })

  useEffect(
    () => () => {
      geometries.forEach(({ geometry }) => geometry.dispose())
      materialPairs.forEach(([face, side]) => {
        face.dispose()
        side.dispose()
      })
    },
    [geometries, materialPairs],
  )

  const niversal = geometries.filter(({ word }) => word === 'niversal')
  const orizon = geometries.filter(({ word }) => word === 'orizon')

  const renderLetter = ({
    geometry,
    letterIndex,
  }: {
    geometry: THREE.BufferGeometry
    letterIndex: number
  }) => (
    <mesh
      key={`${letterIndex}-${geometry.uuid}`}
      geometry={geometry}
      material={materialPairs[letterIndex]}
    />
  )

  return (
    <>
      <group position={[0.18, -0.22, 0]}>
        {niversal.map(renderLetter)}
      </group>

      <group position={[0, -0.12, 0]}>
        {orizon.map(renderLetter)}
      </group>
    </>
  )
}

function ContourEdges({
  path,
  index,
  introTime,
  homeProgress,
  homeChoreography,
}: {
  path: readonly (readonly [number, number])[]
  index: number
  introTime: MutableRefObject<number>
  homeProgress: MutableRefObject<number>
  homeChoreography: boolean
}) {
  const frontGeometry = useMemo(
    () =>
      new THREE.BufferGeometry().setFromPoints(
        path.map(
          ([x, y]) =>
            new THREE.Vector3(x, y, EXTRUDE_DEPTH / 2 + 0.012),
        ),
      ),
    [path],
  )

  const backGeometry = useMemo(
    () =>
      new THREE.BufferGeometry().setFromPoints(
        path.map(
          ([x, y]) =>
            new THREE.Vector3(x, y, -EXTRUDE_DEPTH / 2 - 0.012),
        ),
      ),
    [path],
  )

  const goldRef = useRef<THREE.LineBasicMaterial>(null)
  const blueRef = useRef<THREE.LineBasicMaterial>(null)

  useFrame(() => {
    const elapsed = introTime.current
    const visibility =
      index === 0
        ? introPhase(elapsed, 0.9, 3.45)
        : introPhase(elapsed, 1.55, 3.75)

    const homeVisibility = homeChoreography
      ? homeLogoVisibility(homeProgress.current)
      : 1

    if (goldRef.current) {
      goldRef.current.opacity = 0.58 * visibility * homeVisibility
    }

    if (blueRef.current) {
      blueRef.current.opacity = 0.46 * visibility * homeVisibility
    }
  })

  useEffect(
    () => () => {
      frontGeometry.dispose()
      backGeometry.dispose()
    },
    [frontGeometry, backGeometry],
  )

  return (
    <>
      <lineLoop geometry={frontGeometry}>
        <lineBasicMaterial
          ref={goldRef}
          color="#d49b64"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </lineLoop>

      <lineLoop geometry={backGeometry}>
        <lineBasicMaterial
          ref={blueRef}
          color="#5da8ff"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </lineLoop>
    </>
  )
}

function ProceduralSky({
  introTime,
}: {
  introTime: MutableRefObject<number>
}) {
  const texture = useMemo(() => createNebulaTexture(), [])
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshBasicMaterial>(null)

  useEffect(() => () => texture.dispose(), [texture])

  useFrame((state) => {
    const visibility =
      0.045 + 0.955 * introPhase(introTime.current, 0.35, 3.65)

    if (materialRef.current) {
      materialRef.current.opacity = visibility
    }

    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.00085
    }
  })

  return (
    <mesh ref={meshRef} scale={92}>
      <sphereGeometry args={[1, 64, 32]} />
      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        side={THREE.BackSide}
        transparent
        opacity={0.045}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  )
}

function DeepStars({
  introTime,
}: {
  introTime: MutableRefObject<number>
}) {
  const layers = useMemo(() => {
    const random = seededRandom(87)

    return [0, 1, 2].map((layer) => {
      const count = layer === 0 ? 1200 : 480
      const positions = new Float32Array(count * 3)
      const colors = new Float32Array(count * 3)

      for (let index = 0; index < count; index += 1) {
        const radius = layer === 0 ? 65 + random() * 15 : 15 + random() * 45
        const angle = random() * Math.PI * 2
        const z = random() * 2 - 1
        const s = Math.sqrt(1 - z * z)

        positions[index * 3] = radius * s * Math.cos(angle)
        positions[index * 3 + 1] = radius * z
        positions[index * 3 + 2] = radius * s * Math.sin(angle)

        const color = new THREE.Color().setHSL(
          0.57 + random() * 0.15,
          0.2 + random() * 0.3,
          0.55 + random() * 0.4,
        )

        colors[index * 3] = color.r
        colors[index * 3 + 1] = color.g
        colors[index * 3 + 2] = color.b
      }

      return { layer, positions, colors }
    })
  }, [])

  const groupRef = useRef<THREE.Group>(null)
  const materialRefs = useRef<(THREE.PointsMaterial | null)[]>([])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.001
    }

    const visibility = introPhase(introTime.current, 0.1, 3.45)

    materialRefs.current.forEach((material, layer) => {
      if (!material) return
      const finalOpacity = layer === 0 ? 0.82 : 0.74
      material.opacity = THREE.MathUtils.lerp(0.035, finalOpacity, visibility)
    })
  })

  return (
    <group ref={groupRef}>
      {layers.map(({ layer, positions, colors }) => (
        <points key={layer}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            ref={(material) => {
              materialRefs.current[layer] = material
            }}
            size={layer === 0 ? 0.09 : 0.035}
            vertexColors
            transparent
            opacity={0.035}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </points>
      ))}
    </group>
  )
}

function PlanetHorizon({
  introTime,
}: {
  introTime: MutableRefObject<number>
}) {
  const texture = useMemo(() => createPlanetTexture(), [])
  const cloudTexture = useMemo(() => createCloudTexture(), [])
  const groundRef = useRef<THREE.Mesh>(null)
  const cloudRef = useRef<THREE.Mesh>(null)
  const cloudMaterialRef = useRef<THREE.MeshBasicMaterial>(null)

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: true,
        uniforms: {
          uMap: { value: texture },
          uVisibility: { value: 0 },
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vNormalView;
          varying vec3 vPositionView;

          void main() {
            vUv = uv;
            vNormalView = normalize(normalMatrix * normal);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vPositionView = mvPosition.xyz;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform sampler2D uMap;
          uniform float uVisibility;

          varying vec2 vUv;
          varying vec3 vNormalView;
          varying vec3 vPositionView;

          void main() {
            vec3 normalView = normalize(vNormalView);
            vec3 viewDirection = normalize(-vPositionView);
            float facing = max(dot(normalView, viewDirection), 0.0);
            float rim = pow(1.0 - facing, 3.45);

            vec3 base = texture2D(uMap, vUv).rgb;
            float softLight = 0.66 + 0.34 * max(
              dot(normalView, normalize(vec3(-0.32, 0.72, 0.55))),
              0.0
            );

            vec3 color = base * softLight;
            color += vec3(0.12, 0.26, 0.70) * rim * 0.95;

            gl_FragColor = vec4(color, uVisibility);
          }
        `,
      }),
    [texture],
  )

  useEffect(
    () => () => {
      material.dispose()
      texture.dispose()
      cloudTexture.dispose()
    },
    [material, texture, cloudTexture],
  )

  useFrame((state) => {
    const visibility = introPhase(introTime.current, 4.3, 5.22)
    material.uniforms.uVisibility.value = visibility

    if (groundRef.current) {
      groundRef.current.rotation.y = state.clock.elapsedTime * 0.0072
    }

    if (cloudRef.current) {
      cloudRef.current.rotation.y =
        0.24 + state.clock.elapsedTime * 0.0105
      cloudRef.current.rotation.z = 0.035
    }

    if (cloudMaterialRef.current) {
      cloudMaterialRef.current.opacity = 0.72 * visibility
    }
  })

  return (
    <group position={[0, -37.25, -8.75]}>
      <mesh ref={groundRef}>
        <sphereGeometry args={[32, 192, 96]} />
        <primitive object={material} attach="material" />
      </mesh>

      <mesh ref={cloudRef}>
        <sphereGeometry args={[32.12, 144, 72]} />
        <meshBasicMaterial
          ref={cloudMaterialRef}
          map={cloudTexture}
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

function ReflectionEnvironment() {
  return (
    <Environment background={false} resolution={96}>
      <mesh scale={48}>
        <sphereGeometry args={[1, 48, 32]} />
        <meshBasicMaterial color="#02030b" side={THREE.BackSide} />
      </mesh>

      <mesh position={[-10, 5.2, 1.5]} rotation={[0, Math.PI / 2.2, -0.12]}>
        <planeGeometry args={[7.5, 3.8]} />
        <meshBasicMaterial color="#356fae" toneMapped={false} />
      </mesh>

      <mesh position={[10, 5.8, 0.5]} rotation={[0, -Math.PI / 2.2, 0.1]}>
        <planeGeometry args={[7.5, 3.8]} />
        <meshBasicMaterial color="#653b94" toneMapped={false} />
      </mesh>

      <mesh position={[0, -8.5, 2]} rotation={[-Math.PI / 2.7, 0, 0]}>
        <planeGeometry args={[11, 4.5]} />
        <meshBasicMaterial color="#7d4b2f" toneMapped={false} />
      </mesh>

      <mesh position={[0, 0, -18]}>
        <planeGeometry args={[24, 18]} />
        <meshBasicMaterial color="#0b1022" toneMapped={false} />
      </mesh>
    </Environment>
  )
}

function HorizonLight({
  position,
  introTime,
}: {
  position: [number, number, number]
  introTime: MutableRefObject<number>
}) {
  const ref = useRef<THREE.PointLight>(null)

  useFrame(() => {
    if (!ref.current) return
    ref.current.intensity =
      10 * introPhase(introTime.current, 4.42, 5.28)
  })

  return (
    <pointLight
      ref={ref}
      position={position}
      intensity={0}
      distance={18}
      decay={2}
      color="#ffbf7b"
    />
  )
}

function TipLight({
  position,
  introTime,
  homeProgress,
  homeChoreography,
}: {
  position: [number, number, number]
  introTime: MutableRefObject<number>
  homeProgress: MutableRefObject<number>
  homeChoreography: boolean
}) {
  const ref = useRef<THREE.PointLight>(null)

  useFrame(() => {
    if (!ref.current) return
    const homeVisibility = homeChoreography
      ? homeLogoVisibility(homeProgress.current)
      : 1

    ref.current.intensity =
      3.2 * introPhase(introTime.current, 1.65, 3.15) * homeVisibility
  })

  return (
    <pointLight
      ref={ref}
      position={position}
      intensity={0}
      distance={5.5}
      decay={2}
      color="#ffe0b5"
    />
  )
}

function smoothClosedPath(
  path: readonly [number, number][],
  cornerAngle: number,
  samplesPerPoint: number,
): [number, number][] {
  if (path.length < 4) return [...path]

  const isCorner = (index: number) => {
    const previous = path[(index - 1 + path.length) % path.length]
    const current = path[index]
    const next = path[(index + 1) % path.length]

    const ax = previous[0] - current[0]
    const ay = previous[1] - current[1]
    const bx = next[0] - current[0]
    const by = next[1] - current[1]

    const aLength = Math.hypot(ax, ay)
    const bLength = Math.hypot(bx, by)

    if (aLength === 0 || bLength === 0) return false

    const cosine = THREE.MathUtils.clamp(
      (ax * bx + ay * by) / (aLength * bLength),
      -1,
      1,
    )
    return Math.acos(cosine) < cornerAngle
  }

  const corners = path
    .map((_, index) => index)
    .filter((index) => isCorner(index))

  if (corners.length < 2) {
    const curve = new THREE.CatmullRomCurve3(
      path.map(([x, y]) => new THREE.Vector3(x, y, 0)),
      true,
      'centripetal',
    )

    return curve
      .getPoints(Math.max(path.length * samplesPerPoint, 24))
      .slice(0, -1)
      .map((point) => [point.x, point.y] as [number, number])
  }

  const result: [number, number][] = []

  for (let cornerIndex = 0; cornerIndex < corners.length; cornerIndex += 1) {
    const start = corners[cornerIndex]
    const end = corners[(cornerIndex + 1) % corners.length]
    const segment: [number, number][] = [path[start]]
    let index = start

    while (index !== end) {
      index = (index + 1) % path.length
      segment.push(path[index])
    }

    if (segment.length <= 2) {
      if (result.length === 0) result.push(segment[0])
      result.push(segment[segment.length - 1])
      continue
    }

    const curve = new THREE.CatmullRomCurve3(
      segment.map(([x, y]) => new THREE.Vector3(x, y, 0)),
      false,
      'centripetal',
    )
    const points = curve
      .getPoints(Math.max(segment.length * samplesPerPoint, 8))
      .map((point) => [point.x, point.y] as [number, number])

    if (result.length > 0) points.shift()
    result.push(...points)
  }

  if (
    result.length > 1 &&
    result[0][0] === result[result.length - 1][0] &&
    result[0][1] === result[result.length - 1][1]
  ) {
    result.pop()
  }

  return result
}

function simplifyClosedPath(
  path: readonly (readonly [number, number])[],
  tolerance: number,
): [number, number][] {
  const points = path.map(([x, y]) => [x, y] as [number, number])

  if (
    points.length > 1 &&
    points[0][0] === points[points.length - 1][0] &&
    points[0][1] === points[points.length - 1][1]
  ) {
    points.pop()
  }

  if (points.length < 4) return points

  let first = 0
  let second = 1
  let maxDistanceSquared = -1

  for (let a = 0; a < points.length; a += 1) {
    for (let b = a + 1; b < points.length; b += 1) {
      const dx = points[a][0] - points[b][0]
      const dy = points[a][1] - points[b][1]
      const distanceSquared = dx * dx + dy * dy

      if (distanceSquared > maxDistanceSquared) {
        maxDistanceSquared = distanceSquared
        first = a
        second = b
      }
    }
  }

  const arc = (start: number, end: number) => {
    const result: [number, number][] = [points[start]]
    let index = start

    while (index !== end) {
      index = (index + 1) % points.length
      result.push(points[index])
    }

    return result
  }

  const a = simplifyOpenPath(arc(first, second), tolerance)
  const b = simplifyOpenPath(arc(second, first), tolerance)

  return [...a.slice(0, -1), ...b.slice(0, -1)]
}

function simplifyOpenPath(
  points: readonly [number, number][],
  tolerance: number,
): [number, number][] {
  if (points.length <= 2) return [...points]

  const start = points[0]
  const end = points[points.length - 1]
  let furthestIndex = -1
  let furthestDistance = 0

  for (let index = 1; index < points.length - 1; index += 1) {
    const distance = pointToSegmentDistance(points[index], start, end)

    if (distance > furthestDistance) {
      furthestDistance = distance
      furthestIndex = index
    }
  }

  if (furthestIndex !== -1 && furthestDistance > tolerance) {
    const left = simplifyOpenPath(points.slice(0, furthestIndex + 1), tolerance)
    const right = simplifyOpenPath(points.slice(furthestIndex), tolerance)
    return [...left.slice(0, -1), ...right]
  }

  return [start, end]
}

function pointToSegmentDistance(
  point: readonly [number, number],
  start: readonly [number, number],
  end: readonly [number, number],
) {
  const dx = end[0] - start[0]
  const dy = end[1] - start[1]

  if (dx === 0 && dy === 0) {
    return Math.hypot(point[0] - start[0], point[1] - start[1])
  }

  const t = THREE.MathUtils.clamp(
    ((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) /
      (dx * dx + dy * dy),
    0,
    1,
  )

  const projectedX = start[0] + t * dx
  const projectedY = start[1] + t * dy

  return Math.hypot(point[0] - projectedX, point[1] - projectedY)
}

function introPhase(time: number, start: number, end: number) {
  const raw = THREE.MathUtils.clamp((time - start) / (end - start), 0, 1)
  return raw * raw * (3 - 2 * raw)
}

function homeLogoYaw(progress: number) {
  const keyframes = [
    [0, 0],
    [0.08, 0.29],
    [0.18, 0.29],
    [0.27, -0.285],
    [0.37, -0.285],
    [0.46, 0.278],
    [0.56, 0.278],
    [0.65, -0.27],
    [0.75, -0.27],
    [0.84, 0],
    [1, 0],
  ] as const

  return sampleKeyframes(progress, keyframes)
}

function homeCameraDescent(progress: number) {
  const keyframes = [
    [0, 0],
    [0.52, 0],
    [0.64, -0.55],
    [0.74, -1.55],
    [0.82, -2.8],
    [0.9, -4.55],
    [1, -7.2],
  ] as const

  return sampleKeyframes(progress, keyframes)
}

function homeLookTargetY(progress: number) {
  const keyframes = [
    [0, 0.02],
    [0.56, 0.02],
    [0.7, -0.65],
    [0.82, -2.05],
    [0.92, -3.9],
    [1, -5.8],
  ] as const

  return sampleKeyframes(progress, keyframes)
}

function horizonCrossing(progress: number) {
  return smoothRangeValue(progress, 0.58, 1)
}

function sampleKeyframes(
  progress: number,
  keyframes: readonly (readonly [number, number])[],
) {
  for (let index = 0; index < keyframes.length - 1; index += 1) {
    const [startProgress, startValue] = keyframes[index]
    const [endProgress, endValue] = keyframes[index + 1]

    if (progress <= endProgress) {
      const raw = THREE.MathUtils.clamp(
        (progress - startProgress) /
          Math.max(0.0001, endProgress - startProgress),
        0,
        1,
      )
      const eased = raw * raw * (3 - 2 * raw)
      return THREE.MathUtils.lerp(startValue, endValue, eased)
    }
  }

  return keyframes[keyframes.length - 1][1]
}

function smoothRangeValue(value: number, start: number, end: number) {
  const raw = THREE.MathUtils.clamp((value - start) / (end - start), 0, 1)
  return raw * raw * (3 - 2 * raw)
}

function homeLogoVisibility(progress: number) {
  if (progress <= 0.755) return 1
  if (progress >= 0.91) return 0.06

  const raw = THREE.MathUtils.clamp(
    (progress - 0.755) / (0.91 - 0.755),
    0,
    1,
  )
  const eased = raw * raw * (3 - 2 * raw)
  return THREE.MathUtils.lerp(1, 0.06, eased)
}

function smooth01(value: number) {
  return value * value * (3 - 2 * value)
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
