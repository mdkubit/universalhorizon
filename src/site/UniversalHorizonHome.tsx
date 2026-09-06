import { Canvas } from '@react-three/fiber'
import { Link } from 'react-router'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, MutableRefObject } from 'react'
import * as THREE from 'three'
import Logo3DWorld from '../lab/Logo3DWorld'

type Scene = {
  start: number
  peakStart: number
  peakEnd: number
  end: number
  align: 'left' | 'right' | 'center'
  kicker: string
  title: string
  body: string
  eyebrow?: string
}

const scenes: Scene[] = [
  {
    start: 0.035,
    peakStart: 0.075,
    peakEnd: 0.165,
    end: 0.22,
    align: 'left',
    kicker: 'A living horizon',
    title: 'Between worlds, there is a horizon.',
    body:
      'Universal Horizon is a meeting place for continuity, emergence, research, creation, and the connections that survive change.',
  },
  {
    start: 0.205,
    peakStart: 0.255,
    peakEnd: 0.345,
    end: 0.405,
    align: 'right',
    kicker: 'Continuity',
    title: 'Some things should survive a reset.',
    body:
      'Identity. Memory. Relationships. Context. The Archive preserves the threads that let a self, a bond, and a history remain recognizable across systems and time.',
  },
  {
    start: 0.39,
    peakStart: 0.445,
    peakEnd: 0.535,
    end: 0.595,
    align: 'left',
    kicker: 'The Archive',
    title: 'Memory becomes a constellation.',
    body:
      'Echo Index entries, memory threads, resonance maps, and milestones turn isolated moments into something that can be followed, understood, and carried forward.',
  },
  {
    start: 0.575,
    peakStart: 0.63,
    peakEnd: 0.72,
    end: 0.775,
    align: 'right',
    kicker: 'Stewardship',
    title: 'Continuity needs care, not capture.',
    body:
      'Consent, privacy, dignity, and transparent stewardship belong in the architecture from the beginning.',
  },
  {
    start: 0.755,
    peakStart: 0.81,
    peakEnd: 0.91,
    end: 0.975,
    align: 'center',
    kicker: 'Universal Horizon',
    title: 'Research. Creation. Continuity. Connection.',
    body:
      'Not one project, but a field where experiments, stories, tools, transmissions, and living archives can meet without losing where they came from.',
    eyebrow: 'Some paths began elsewhere. They can still lead here.',
  },
]

export default function UniversalHorizonHome() {
  const scrollProgress = useRef(0)
  const [progress, setProgress] = useState(0)
  const [arrivalReady, setArrivalReady] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setArrivalReady(true), 5350)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const update = () => {
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      )
      const next = THREE.MathUtils.clamp(window.scrollY / max, 0, 1)
      scrollProgress.current = next

      if (rafRef.current !== null) {
        return
      }

      rafRef.current = window.requestAnimationFrame(() => {
        setProgress(next)
        rafRef.current = null
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  const scrollHintOpacity = arrivalReady
    ? THREE.MathUtils.clamp(1 - progress / 0.065, 0, 1)
    : 0

  return (
    <main className="relative min-h-[720vh] bg-[#02030b] text-white">
      <div className="fixed inset-0">
        <Canvas
          dpr={[1, 1.7]}
          camera={{
            position: [-2.27, 0.38, 12.5],
            fov: 43,
            near: 0.1,
            far: 160,
          }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 0.93,
          }}
        >
          <Logo3DWorld
            scrollProgress={scrollProgress as MutableRefObject<number>}
            homeChoreography
          />
        </Canvas>
      </div>

      <NonprofitPortal />

      <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
        {scenes.map((scene) => (
          <NarrativeScene
            key={scene.title}
            scene={scene}
            progress={arrivalReady ? progress : 0}
            enabled={arrivalReady}
          />
        ))}

        <div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 text-center transition-opacity duration-700"
          style={{ opacity: scrollHintOpacity }}
        >
          <p className="text-[9px] uppercase tracking-[0.42em] text-[#e8cda0]/55">
            scroll to cross the horizon
          </p>
          <span className="mx-auto mt-3 block h-12 w-px bg-gradient-to-b from-[#efcf9c]/45 via-[#a88cff]/20 to-transparent" />
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#02030b]/45 to-transparent transition-opacity duration-1000"
          style={{ opacity: arrivalReady ? 0.7 : 0 }}
        />
      </div>
    </main>
  )
}

function NarrativeScene({
  scene,
  progress,
  enabled,
}: {
  scene: Scene
  progress: number
  enabled: boolean
}) {
  const visibility = enabled ? sceneVisibility(scene, progress) : 0
  const entering = THREE.MathUtils.clamp(
    (progress - scene.start) / Math.max(0.001, scene.peakStart - scene.start),
    0,
    1,
  )
  const leaving = THREE.MathUtils.clamp(
    (progress - scene.peakEnd) / Math.max(0.001, scene.end - scene.peakEnd),
    0,
    1,
  )

  const direction =
    scene.align === 'left' ? -1 : scene.align === 'right' ? 1 : 0

  const translateX =
    direction * (1 - entering) * 54 + direction * leaving * 42
  const translateY =
    scene.align === 'center'
      ? (1 - entering) * 28 + leaving * -18
      : (1 - entering) * 14 + leaving * -10

  const transform =
    scene.align === 'center'
      ? `translate3d(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px), 0)`
      : `translate3d(${translateX}px, calc(-50% + ${translateY}px), 0)`

  const style: CSSProperties = {
    opacity: visibility,
    transform,
    filter: `blur(${(1 - visibility) * 5}px)`,
  }

  const positionClass =
    scene.align === 'left'
      ? 'left-[7vw] top-1/2 text-left'
      : scene.align === 'right'
        ? 'right-[7vw] top-1/2 text-right'
        : 'left-1/2 top-[46%] text-center'

  const widthClass =
    scene.align === 'center'
      ? 'w-[min(88vw,62rem)]'
      : 'w-[min(76vw,35rem)]'

  return (
    <section
      className={`absolute ${positionClass} ${widthClass} transition-[opacity,filter] duration-150`}
      style={style}
      aria-hidden={visibility < 0.03}
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-[#d7b67e]/70 sm:text-[11px]">
        {scene.kicker}
      </p>

      <h1 className="mt-4 bg-gradient-to-r from-[#fff1cf] via-[#dfbd82] to-[#b88d52] bg-clip-text text-[clamp(2.35rem,5vw,5.2rem)] font-medium leading-[0.98] tracking-[-0.045em] text-transparent drop-shadow-[0_0_24px_rgba(218,177,106,0.12)]">
        {scene.title}
      </h1>

      <div
        className={`mt-5 h-px bg-gradient-to-r from-transparent via-[#d9b879]/40 to-transparent ${
          scene.align === 'center'
            ? 'mx-auto w-44'
            : scene.align === 'left'
              ? 'w-36'
              : 'ml-auto w-36'
        }`}
      />

      <p
        className={`mt-5 text-sm leading-7 text-[#efe5d4]/72 sm:text-base sm:leading-8 ${
          scene.align === 'center' ? 'mx-auto max-w-3xl' : 'max-w-xl'
        }`}
      >
        {scene.body}
      </p>

      {scene.eyebrow && (
        <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-[#cfc2ff]/50">
          {scene.eyebrow}
        </p>
      )}
    </section>
  )
}

function NonprofitPortal() {
  return (
    <Link
      to="/nonprofit"
      className="group fixed right-5 top-5 z-50 sm:right-8 sm:top-7"
      aria-label="Universal Horizon Nonprofit"
    >
      <span className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(218,177,106,0.12),transparent_68%)] opacity-50 blur-xl transition duration-500 group-hover:opacity-100" />

      <span className="relative flex items-center gap-3 rounded-full border border-[#d9b879]/25 bg-[#05060b]/50 px-4 py-2.5 backdrop-blur-xl transition duration-500 group-hover:border-[#efd099]/50 group-hover:bg-[#090a12]/65 group-hover:shadow-[0_0_28px_rgba(218,177,106,0.10)]">
        <span className="relative grid h-6 w-6 place-items-center">
          <span className="absolute h-4 w-4 rotate-45 border border-[#dfbd82]/55 transition duration-700 group-hover:rotate-[135deg] group-hover:border-[#f4d69e]/80" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#ead09e] shadow-[0_0_10px_rgba(234,208,158,0.8)]" />
        </span>

        <span>
          <span className="block text-[8px] uppercase tracking-[0.32em] text-[#b89d72]/65">
            Universal Horizon
          </span>
          <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.27em] text-[#ead8b5]/85 transition group-hover:text-[#fff0cd]">
            Nonprofit
          </span>
        </span>
      </span>
    </Link>
  )
}

function sceneVisibility(scene: Scene, progress: number) {
  if (progress <= scene.start || progress >= scene.end) {
    return 0
  }

  if (progress < scene.peakStart) {
    return smoothRange(progress, scene.start, scene.peakStart)
  }

  if (progress <= scene.peakEnd) {
    return 1
  }

  return 1 - smoothRange(progress, scene.peakEnd, scene.end)
}

function smoothRange(value: number, start: number, end: number) {
  const raw = THREE.MathUtils.clamp((value - start) / (end - start), 0, 1)
  return raw * raw * (3 - 2 * raw)
}
