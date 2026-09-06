import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import type { MutableRefObject } from 'react'
import * as THREE from 'three'

type PlanetWorldProps = {
  scrollProgress: MutableRefObject<number>
}

const PLANET_RADIUS = 8.25
const PLANET_Y = -11.65
const CAMERA_START_Y = 0
const CAMERA_END_Y = -31.5

export default function PlanetWorld({ scrollProgress }: PlanetWorldProps) {
  const [dayTexture, normalTexture, specularTexture, cloudTexture] = useTexture([
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r185/examples/textures/planets/earth_day_4096.jpg',
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r185/examples/textures/planets/earth_normal_2048.jpg',
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r185/examples/textures/planets/earth_specular_2048.jpg',
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r185/examples/textures/planets/earth_clouds_1024.png',
  ])

  const groundRef = useRef<THREE.Mesh>(null)
  const cloudRef = useRef<THREE.Mesh>(null)
  const smoothProgress = useRef(0)

  useEffect(() => {
    dayTexture.colorSpace = THREE.SRGBColorSpace
    cloudTexture.colorSpace = THREE.SRGBColorSpace

    for (const texture of [
      dayTexture,
      normalTexture,
      specularTexture,
      cloudTexture,
    ]) {
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.ClampToEdgeWrapping
      texture.anisotropy = 8
      texture.needsUpdate = true
    }
  }, [dayTexture, normalTexture, specularTexture, cloudTexture])

  useFrame((state, delta) => {
    smoothProgress.current = THREE.MathUtils.damp(
      smoothProgress.current,
      THREE.MathUtils.clamp(scrollProgress.current, 0, 1),
      5.2,
      delta,
    )

    state.camera.position.x = 0
    state.camera.position.y = THREE.MathUtils.lerp(
      CAMERA_START_Y,
      CAMERA_END_Y,
      smoothProgress.current,
    )
    state.camera.position.z = 10

    if (groundRef.current) {
      groundRef.current.rotation.y =
        0.85 + state.clock.elapsedTime * 0.0068
    }

    if (cloudRef.current) {
      cloudRef.current.rotation.y =
        1.12 + state.clock.elapsedTime * 0.0094
    }
  })

  return (
    <>
      <ambientLight intensity={0.58} />
      <hemisphereLight
        args={['#b8caff', '#091122', 0.72]}
      />
      <directionalLight
        position={[7, 8, 10]}
        intensity={1.28}
        color="#fff3df"
      />

      <group position={[0, PLANET_Y, 0]}>
        <mesh ref={groundRef}>
          <sphereGeometry args={[PLANET_RADIUS, 160, 96]} />
          <meshPhongMaterial
            map={dayTexture}
            normalMap={normalTexture}
            normalScale={new THREE.Vector2(0.22, 0.22)}
            specularMap={specularTexture}
            specular="#6b86a8"
            shininess={10}
          />
        </mesh>

        <mesh ref={cloudRef}>
          <sphereGeometry args={[PLANET_RADIUS + 0.055, 128, 72]} />
          <meshPhongMaterial
            map={cloudTexture}
            alphaMap={cloudTexture}
            color="#f7f9ff"
            transparent
            opacity={0.43}
            depthWrite={false}
            shininess={1}
          />
        </mesh>

        <mesh scale={1.012}>
          <sphereGeometry args={[PLANET_RADIUS, 128, 72]} />
          <shaderMaterial
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
            vertexShader={`
              varying vec3 vNormalView;
              varying vec3 vPositionView;

              void main() {
                vNormalView = normalize(normalMatrix * normal);
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                vPositionView = mvPosition.xyz;
                gl_Position = projectionMatrix * mvPosition;
              }
            `}
            fragmentShader={`
              varying vec3 vNormalView;
              varying vec3 vPositionView;

              void main() {
                vec3 viewDirection = normalize(-vPositionView);
                float rim = pow(
                  1.0 - max(dot(normalize(vNormalView), viewDirection), 0.0),
                  3.0
                );

                vec3 color = vec3(0.12, 0.34, 0.95) * rim * 0.66;
                gl_FragColor = vec4(color, rim * 0.36);
              }
            `}
          />
        </mesh>
      </group>
    </>
  )
}
