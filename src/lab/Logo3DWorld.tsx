import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import type { MutableRefObject } from 'react'
import * as THREE from 'three'
import { logoPaths } from './logoPaths'

type Logo3DWorldProps = {
  scrollProgress: MutableRefObject<number>
}

const EXTRUDE_DEPTH = 0.28

export default function Logo3DWorld({ scrollProgress }: Logo3DWorldProps) {
  const emblemRef = useRef<THREE.Group>(null)
  const lookTarget = useMemo(() => new THREE.Vector3(0, 0.02, 0), [])
  const cameraTarget = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    const p = THREE.MathUtils.clamp(scrollProgress.current, 0, 1)
    const angle = THREE.MathUtils.lerp(-0.18, 0.2, smooth01(p))
    const distance = 12.7

    cameraTarget.set(
      Math.sin(angle) * distance + state.pointer.x * 0.2,
      0.38 + Math.sin(p * Math.PI) * 0.24 + state.pointer.y * 0.12,
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

    if (emblemRef.current) {
      emblemRef.current.position.y =
        0.52 + Math.sin(state.clock.elapsedTime * 0.32) * 0.025
      emblemRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.17) * 0.008
      emblemRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.13) * 0.006
    }
  })

  return (
    <>
      <color attach="background" args={['#02030b']} />
      <fog attach="fog" args={['#02030b', 18, 70]} />

      <ProceduralSky />
      <DeepStars />
      <PlanetHorizon />
      <ReflectionEnvironment />

      <hemisphereLight args={['#8da7ff', '#1b0d24', 0.5]} />
      <pointLight
        position={[-4.8, 3.4, 5.8]}
        intensity={13}
        distance={28}
        decay={2}
        color="#ffd2a0"
      />
      <pointLight
        position={[5.8, 3.8, 3.5]}
        intensity={16}
        distance={30}
        decay={2}
        color="#84b8ff"
      />
      <pointLight
        position={[2.7, -1.0, -1.0]}
        intensity={9}
        distance={18}
        decay={2}
        color="#a06dff"
      />

      <group ref={emblemRef} position={[0, 0.34, 0]}>
        <ExactEmblem />
        <TipLight position={[3.36, 2.773, 0.16]} />
      </group>

      <HorizonLight position={[0.05, -2.72, -3.8]} />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.72}
          luminanceThreshold={0.72}
          luminanceSmoothing={0.32}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.16} darkness={0.62} />
      </EffectComposer>
    </>
  )
}

function ExactEmblem() {
  const geometries = useMemo(
    () =>
      logoPaths.map((path) => {
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

  const faceMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#06070b'),
        metalness: 0.95,
        roughness: 0.16,
        clearcoat: 1,
        clearcoatRoughness: 0.055,
        reflectivity: 1,
        envMapIntensity: 2.0,
      }),
    [],
  )

  const sideMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#1b1413'),
        metalness: 0.9,
        roughness: 0.19,
        clearcoat: 0.88,
        clearcoatRoughness: 0.08,
        reflectivity: 1,
        envMapIntensity: 2.35,
      }),
    [],
  )

  useEffect(
    () => () => {
      geometries.forEach((geometry) => geometry.dispose())
      faceMaterial.dispose()
      sideMaterial.dispose()
    },
    [geometries, faceMaterial, sideMaterial],
  )

  return (
    <group>
      {geometries.map((geometry, index) => (
        <mesh
          key={index}
          geometry={geometry}
          material={[faceMaterial, sideMaterial]}
          castShadow
        />
      ))}

      {logoPaths.map((path, index) => (
        <ContourEdges key={index} path={path} />
      ))}

    </group>
  )
}

function ContourEdges({
  path,
}: {
  path: readonly (readonly [number, number])[]
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

  const gold = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color('#d49b64'),
        transparent: true,
        opacity: 0.58,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    [],
  )

  const blue = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color('#5da8ff'),
        transparent: true,
        opacity: 0.46,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    [],
  )

  useEffect(
    () => () => {
      frontGeometry.dispose()
      backGeometry.dispose()
      gold.dispose()
      blue.dispose()
    },
    [frontGeometry, backGeometry, gold, blue],
  )

  return (
    <>
      <lineLoop geometry={frontGeometry} material={gold} />
      <lineLoop geometry={backGeometry} material={blue} />
    </>
  )
}

function ProceduralSky() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
        },
        vertexShader: `
          varying vec3 vDirection;

          void main() {
            vDirection = normalize(position);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          varying vec3 vDirection;

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
              mix(
                mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x),
                f.y
              ),
              mix(
                mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x),
                f.y
              ),
              f.z
            );
          }

          float fbm(vec3 p) {
            float value = 0.0;
            float amp = 0.5;

            for (int i = 0; i < 5; i++) {
              value += noise(p) * amp;
              p = p * 2.03 + 7.1;
              amp *= 0.5;
            }

            return value;
          }

          void main() {
            vec3 d = normalize(vDirection);
            float drift = uTime * 0.008;
            float n = fbm(d * 5.0 + vec3(drift, -drift * 0.4, drift * 0.3));
            float band = exp(-pow((d.y + 0.19 * sin(d.x * 5.0) + 0.12 * d.z) * 3.7, 2.0));
            float cloud = pow(max(0.0, fbm(d * 9.0 + n * 3.0) - 0.28), 2.0) * band;

            vec3 color = vec3(0.002, 0.003, 0.012);
            color += cloud * mix(
              vec3(0.10, 0.08, 0.36),
              vec3(0.31, 0.08, 0.23),
              n
            ) * 1.55;
            color += pow(fbm(d * 23.0), 5.0) * band * vec3(0.07, 0.12, 0.30);

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
    <mesh scale={92}>
      <sphereGeometry args={[1, 64, 48]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

function DeepStars() {
  const layers = useMemo(() => {
    const random = seededRandom(87)

    return [0, 1, 2].map((layer) => {
      const count = layer === 0 ? 1600 : 700
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

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.001
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
            size={layer === 0 ? 0.09 : 0.035}
            vertexColors
            transparent
            opacity={0.82}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </points>
      ))}
    </group>
  )
}

function PlanetHorizon() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormalView;
          varying vec3 vPositionView;
          varying vec3 vSurface;

          void main() {
            vSurface = position / 32.0;
            vNormalView = normalize(normalMatrix * normal);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vPositionView = mvPosition.xyz;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vNormalView;
          varying vec3 vPositionView;
          varying vec3 vSurface;

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
              mix(
                mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x),
                f.y
              ),
              mix(
                mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x),
                f.y
              ),
              f.z
            );
          }

          float fbm(vec3 p) {
            float value = 0.0;
            float amp = 0.5;

            for (int i = 0; i < 5; i++) {
              value += noise(p) * amp;
              p = p * 2.03 + 7.1;
              amp *= 0.5;
            }

            return value;
          }

          void main() {
            vec3 surface = normalize(vSurface);
            float facing = max(
              dot(normalize(vNormalView), normalize(-vPositionView)),
              0.0
            );
            float rim = pow(1.0 - facing, 4.0);

            float terrain = fbm(surface * 9.0 + vec3(3.2, 7.1, 1.8));
            float land = smoothstep(0.49, 0.535, terrain);
            float shallows = smoothstep(0.44, 0.50, terrain) * (1.0 - land);
            float detail = fbm(surface * 68.0);

            vec3 ocean = mix(
              vec3(0.008, 0.025, 0.052),
              vec3(0.018, 0.075, 0.095),
              shallows
            );

            vec3 continent = mix(
              vec3(0.027, 0.061, 0.047),
              vec3(0.092, 0.083, 0.057),
              smoothstep(0.54, 0.70, terrain)
            );
            continent *= 0.8 + detail * 0.4;

            vec3 ground = mix(ocean, continent, land);
            float daylight = smoothstep(
              -0.12,
              0.85,
              dot(surface, normalize(vec3(-0.35, 0.65, -0.5)))
            );
            ground *= 0.23 + daylight * 0.85;

            vec3 weather =
              surface * 22.0 +
              vec3(
                fbm(surface * 8.0) * 3.0,
                0.0,
                fbm(surface * 7.0 + 5.0) * 3.0
              );

            float clouds = smoothstep(0.49, 0.70, fbm(weather));
            float wisps =
              smoothstep(0.57, 0.76, fbm(surface * 49.0 + vec3(4.0,1.0,8.0))) *
              0.18;
            float cover = clamp(clouds * 0.64 + wisps, 0.0, 0.72);

            vec3 cloudColor =
              vec3(0.23, 0.27, 0.32) * (0.3 + daylight * 0.7);
            vec3 color = mix(ground, cloudColor, cover);

            color = mix(color, vec3(0.07, 0.13, 0.26), rim * 0.52);
            color += vec3(0.13, 0.27, 0.70) * rim * 1.05;

            gl_FragColor = vec4(color, 1.0);
          }
        `,
      }),
    [],
  )

  useEffect(() => () => material.dispose(), [material])

  return (
    <mesh position={[0, -37.25, -8.75]}>
      <sphereGeometry args={[32, 96, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

function ReflectionEnvironment() {
  return (
    <Environment background={false} resolution={256}>
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

function HorizonLight({ position }: { position: [number, number, number] }) {
  return (
    <pointLight
      position={position}
      intensity={10}
      distance={18}
      decay={2}
      color="#ffbf7b"
    />
  )
}

function TipLight({ position }: { position: [number, number, number] }) {
  return (
    <pointLight
      position={position}
      intensity={3.2}
      distance={5.5}
      decay={2}
      color="#ffe0b5"
    />
  )
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
