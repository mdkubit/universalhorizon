import { Canvas } from '@react-three/fiber'
import { Link } from 'react-router'
import { useEffect, useRef } from 'react'
import type { MutableRefObject } from 'react'
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
  hold?: boolean
}

const scenes: Scene[] = [
  {
    start: 0.035,
    peakStart: 0.075,
    peakEnd: 0.165,
    end: 0.22,
    align: 'center',
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
    align: 'center',
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
    align: 'center',
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
    align: 'center',
    kicker: 'Stewardship',
    title: 'Continuity needs care, not capture.',
    body:
      'Consent, privacy, dignity, and transparent stewardship belong in the architecture from the beginning.',
  },
  {
    start: 0.755,
    peakStart: 0.81,
    peakEnd: 0.91,
    end: 1,
    align: 'center',
    hold: true,
    kicker: 'Universal Horizon',
    title: 'Research. Creation. Continuity. Connection.',
    body:
      'Not one project, but a field where experiments, stories, tools, transmissions, and living archives can meet without losing where they came from.',
    eyebrow: 'Some paths began elsewhere. They can still lead here.',
  },
]

export default function UniversalHorizonHome() {
  const scrollProgress = useRef(0)
  const latestProgress = useRef(0)
  const arrivalReady = useRef(false)
  const rafRef = useRef<number | null>(null)
  const sceneRefs = useRef<(HTMLElement | null)[]>([])
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const bottomFadeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const paintNarrative = () => {
      const progress = latestProgress.current
      const enabled = arrivalReady.current

      sceneRefs.current.forEach((element, index) => {
        if (!element) return
        const scene = scenes[index]
        const visibility = enabled ? sceneVisibility(scene, progress) : 0

        const entering = THREE.MathUtils.clamp(
          (progress - scene.start) /
            Math.max(0.001, scene.peakStart - scene.start),
          0,
          1,
        )

        const leaving = scene.hold
          ? 0
          : THREE.MathUtils.clamp(
              (progress - scene.peakEnd) /
                Math.max(0.001, scene.end - scene.peakEnd),
              0,
              1,
            )

        const translateY = (1 - entering) * 34 + leaving * -24
        const scale = 0.94 + visibility * 0.06

        element.style.opacity = visibility.toFixed(4)
        element.style.visibility = visibility < 0.002 ? 'hidden' : 'visible'
        element.style.transform =
          `translate3d(-50%, calc(-50% + ${translateY}px), 0) scale(${scale.toFixed(4)})`
      })

      if (scrollHintRef.current) {
        const opacity = enabled
          ? THREE.MathUtils.clamp(1 - progress / 0.065, 0, 1)
          : 0
        scrollHintRef.current.style.opacity = opacity.toFixed(4)
      }

      if (bottomFadeRef.current) {
        bottomFadeRef.current.style.opacity = enabled ? '0.7' : '0'
      }

      rafRef.current = null
    }

    const schedulePaint = () => {
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(paintNarrative)
      }
    }

    const updateProgress = () => {
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      )
      const next = THREE.MathUtils.clamp(window.scrollY / max, 0, 1)

      latestProgress.current = next
      scrollProgress.current = next
      schedulePaint()
    }

    const timer = window.setTimeout(() => {
      arrivalReady.current = true
      schedulePaint()
    }, 5350)

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [])

  return (
    <main className="relative min-h-[720vh] bg-[#02030b] text-white">
      <div
        className="fixed inset-0"
        style={{
          background:
            'radial-gradient(ellipse 62% 50% at 16% 22%, rgba(111,62,157,0.48) 0%, rgba(62,38,112,0.28) 36%, transparent 72%), radial-gradient(ellipse 58% 48% at 78% 30%, rgba(126,48,104,0.42) 0%, rgba(72,32,92,0.24) 38%, transparent 74%), radial-gradient(ellipse 68% 54% at 48% 68%, rgba(37,73,139,0.38) 0%, rgba(29,45,101,0.22) 42%, transparent 78%), radial-gradient(ellipse 45% 32% at 52% 34%, rgba(82,63,145,0.28) 0%, transparent 70%), linear-gradient(180deg, #050611 0%, #070819 46%, #02030b 100%)',
        }}
      />
      <div
        className="fixed inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(ellipse 28% 18% at 28% 43%, rgba(145,84,181,0.18), transparent 70%), radial-gradient(ellipse 34% 21% at 64% 55%, rgba(181,66,125,0.14), transparent 72%), radial-gradient(ellipse 30% 18% at 50% 20%, rgba(80,121,191,0.13), transparent 70%)',
        }}
      />
      <div className="fixed inset-0">
        <Canvas
          dpr={1.25}
          camera={{
            position: [-2.27, 0.38, 12.5],
            fov: 43,
            near: 0.1,
            far: 160,
          }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 0.93,
          }}
        >
          <Logo3DWorld
            scrollProgress={scrollProgress as MutableRefObject<number>}
            homeChoreography
            transparentBackground
          />
        </Canvas>
      </div>

      <NonprofitPortal />

      <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
        {scenes.map((scene, index) => (
          <NarrativeScene
            key={scene.title}
            scene={scene}
            sceneRef={(element) => {
              sceneRefs.current[index] = element
            }}
          />
        ))}

        <div
          ref={scrollHintRef}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 text-center opacity-0"
          style={{ willChange: 'opacity' }}
        >
          <p className="text-[9px] uppercase tracking-[0.42em] text-[#e8cda0]/55">
            scroll to cross the horizon
          </p>
          <span className="mx-auto mt-3 block h-12 w-px bg-gradient-to-b from-[#efcf9c]/45 via-[#a88cff]/20 to-transparent" />
        </div>

        <div
          ref={bottomFadeRef}
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#02030b]/45 to-transparent opacity-0"
          style={{ willChange: 'opacity' }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_56%,rgba(1,2,8,0.24)_100%)]" />
      </div>
    </main>
  )
}

function NarrativeScene({
  scene,
  sceneRef,
}: {
  scene: Scene
  sceneRef: (element: HTMLElement | null) => void
}) {
  const positionClass = 'left-1/2 top-[46%] text-center'
  const widthClass = 'w-[min(88vw,62rem)]'
  const initialTransform =
    'translate3d(-50%, calc(-50% + 34px), 0) scale(0.94)'

  return (
    <section
      ref={sceneRef}
      className={`absolute ${positionClass} ${widthClass}`}
      style={{
        opacity: 0,
        visibility: 'hidden',
        transform: initialTransform,
        willChange: 'transform, opacity',
      }}
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-[#d7b67e]/70 sm:text-[11px]">
        {scene.kicker}
      </p>

      <h1 className="mt-4 bg-gradient-to-r from-[#fff1cf] via-[#dfbd82] to-[#b88d52] bg-clip-text text-[clamp(2.35rem,5vw,5.2rem)] font-medium leading-[0.98] tracking-[-0.045em] text-transparent drop-shadow-[0_0_18px_rgba(218,177,106,0.10)]">
        {scene.title}
      </h1>

      <div
        className={`mt-5 h-px bg-gradient-to-r from-transparent via-[#d9b879]/40 to-transparent ${
          'mx-auto w-44'
        }`}
      />

      <p
        className={`mt-5 text-sm leading-7 text-[#efe5d4]/72 sm:text-base sm:leading-8 ${
          'mx-auto max-w-3xl'
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
  if (progress <= scene.start) {
    return 0
  }

  if (progress < scene.peakStart) {
    return smoothRange(progress, scene.start, scene.peakStart)
  }

  if (scene.hold) {
    return 1
  }

  if (progress >= scene.end) {
    return 0
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
