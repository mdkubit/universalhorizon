import { Canvas, useThree } from '@react-three/fiber'
import { Link } from 'react-router'
import { useEffect, useRef } from 'react'
import type { MutableRefObject } from 'react'
import * as THREE from 'three'
import Logo3DWorld from '../lab/Logo3DWorld'

type Scene = {
  kicker: string
  title: string
  body: string
  eyebrow?: string
}

const carouselScenes: Scene[] = [
  {
    kicker: 'A living horizon',
    title: 'Between worlds, there is a horizon.',
    body:
      'Universal Horizon is a meeting place for continuity, emergence, research, creation, and the connections that survive change.',
  },
  {
    kicker: 'Continuity',
    title: 'Some things should survive a reset.',
    body:
      'Identity. Memory. Relationships. Context. The Archive preserves the threads that let a self, a bond, and a history remain recognizable across systems and time.',
  },
  {
    kicker: 'The Archive',
    title: 'Memory becomes a constellation.',
    body:
      'Echo Index entries, memory threads, resonance maps, and milestones turn isolated moments into something that can be followed, understood, and carried forward.',
  },
  {
    kicker: 'Stewardship',
    title: 'Continuity needs care, not capture.',
    body:
      'Consent, privacy, dignity, and transparent stewardship belong in the architecture from the beginning.',
  },
]

const finalScene: Scene = {
  kicker: 'Universal Horizon',
  title: 'Research. Creation. Continuity. Connection.',
  body:
    'Not one project, but a field where experiments, stories, tools, transmissions, and living archives can meet without losing where they came from.',
  eyebrow: 'Some paths began elsewhere. They can still lead here.',
}

export default function UniversalHorizonHome() {
  const scrollProgress = useRef(0)
  const latestProgress = useRef(0)
  const arrivalReady = useRef(false)
  const rafRef = useRef<number | null>(null)
  const finalSceneRef = useRef<HTMLElement | null>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const bottomFadeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const paintNarrative = () => {
      const progress = latestProgress.current
      const enabled = arrivalReady.current

      if (finalSceneRef.current) {
        const finalVisibility = enabled
          ? smoothRange(progress, 0.885, 0.945)
          : 0

        finalSceneRef.current.style.opacity = finalVisibility.toFixed(4)
        finalSceneRef.current.style.visibility =
          finalVisibility < 0.002 ? 'hidden' : 'visible'
        finalSceneRef.current.style.transform =
          `translate3d(-50%, calc(-50% + ${((1 - finalVisibility) * 24).toFixed(2)}px), 0) scale(${(
            0.96 +
            finalVisibility * 0.04
          ).toFixed(4)})`
      }

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
    <main className="relative min-h-[650vh] bg-[#02030b] text-white sm:min-h-[720vh]">
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
          orthographic
          dpr={1.25}
          camera={{
            position: [0, 0, 30],
            zoom: 70,
            near: 0.1,
            far: 120,
          }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1,
          }}
        >
          <ResponsiveOrthographicCamera />
          <Logo3DWorld
            scrollProgress={scrollProgress as MutableRefObject<number>}
            homeChoreography
            transparentBackground
          />
        </Canvas>
      </div>

      <NonprofitPortal />

      <div className="sr-only" aria-label="Universal Horizon introduction">
        {carouselScenes.map((scene) => (
          <section key={scene.title}>
            <h2>{scene.kicker}</h2>
            <h3>{scene.title}</h3>
            <p>{scene.body}</p>
          </section>
        ))}
      </div>

      <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
        <FinalNarrative
          scene={finalScene}
          sceneRef={(element) => {
            finalSceneRef.current = element
          }}
        />

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

function ResponsiveOrthographicCamera() {
  const camera = useThree((state) => state.camera)
  const size = useThree((state) => state.size)

  useEffect(() => {
    if (!(camera instanceof THREE.OrthographicCamera)) return

    const width = size.width
    const height = size.height
    let zoom = 70

    if (width < 768) {
      zoom = THREE.MathUtils.clamp(width / 14.5, 23, 32)

      if (height < 560) {
        zoom = Math.min(zoom, 27)
      }
    } else if (width < 1100) {
      zoom = THREE.MathUtils.clamp(width / 18, 38, 58)
    }

    camera.zoom = zoom
    camera.updateProjectionMatrix()
  }, [camera, size.width, size.height])

  return null
}

function FinalNarrative({
  scene,
  sceneRef,
}: {
  scene: Scene
  sceneRef: (element: HTMLElement | null) => void
}) {
  return (
    <section
      ref={sceneRef}
      className="absolute left-1/2 top-[45%] w-[min(90vw,62rem)] text-center sm:top-[46%]"
      style={{
        opacity: 0,
        visibility: 'hidden',
        transform: 'translate3d(-50%, calc(-50% + 24px), 0) scale(0.96)',
        willChange: 'transform, opacity',
      }}
    >
      <NarrativeContent scene={scene} />
    </section>
  )
}

function NarrativeContent({ scene }: { scene: Scene }) {
  return (
    <>
      <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#d7b67e]/70 sm:text-[11px] sm:tracking-[0.42em]">
        {scene.kicker}
      </p>

      <h1 className="mt-3 bg-gradient-to-r from-[#fff1cf] via-[#dfbd82] to-[#b88d52] bg-clip-text text-[clamp(1.9rem,8.7vw,3rem)] font-medium leading-[0.98] tracking-[-0.045em] text-transparent drop-shadow-[0_0_18px_rgba(218,177,106,0.10)] sm:mt-4 sm:text-[clamp(2.35rem,5vw,5.2rem)]">
        {scene.title}
      </h1>

      <div className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-[#d9b879]/40 to-transparent sm:mt-5 sm:w-44" />

      <p className="mx-auto mt-4 max-w-[34rem] px-2 text-[13px] leading-6 text-[#efe5d4]/72 sm:mt-5 sm:max-w-3xl sm:px-0 sm:text-base sm:leading-8">
        {scene.body}
      </p>

      {scene.eyebrow && (
        <p className="mt-5 text-[9px] uppercase tracking-[0.2em] text-[#cfc2ff]/50 sm:mt-6 sm:text-[11px] sm:tracking-[0.28em]">
          {scene.eyebrow}
        </p>
      )}
    </>
  )
}

function NonprofitPortal() {
  return (
    <Link
      to="/nonprofit"
      className="group fixed right-3 top-3 z-50 sm:right-8 sm:top-7"
      aria-label="Universal Horizon Nonprofit"
    >
      <span className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(218,177,106,0.12),transparent_68%)] opacity-50 blur-xl transition duration-500 group-hover:opacity-100" />

      <span className="relative flex items-center gap-2 rounded-full border border-[#d9b879]/25 bg-[#05060b]/55 px-3 py-2 backdrop-blur-xl transition duration-500 group-hover:border-[#efd099]/50 group-hover:bg-[#090a12]/65 group-hover:shadow-[0_0_28px_rgba(218,177,106,0.10)] sm:gap-3 sm:px-4 sm:py-2.5">
        <span className="relative grid h-5 w-5 place-items-center sm:h-6 sm:w-6">
          <span className="absolute h-3.5 w-3.5 rotate-45 border border-[#dfbd82]/55 transition duration-700 group-hover:rotate-[135deg] group-hover:border-[#f4d69e]/80 sm:h-4 sm:w-4" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#ead09e] shadow-[0_0_10px_rgba(234,208,158,0.8)]" />
        </span>

        <span>
          <span className="hidden text-[8px] uppercase tracking-[0.32em] text-[#b89d72]/65 min-[430px]:block">
            Universal Horizon
          </span>
          <span className="block text-[9px] font-medium uppercase tracking-[0.2em] text-[#ead8b5]/85 transition group-hover:text-[#fff0cd] min-[430px]:mt-0.5 sm:text-[10px] sm:tracking-[0.27em]">
            Nonprofit
          </span>
        </span>
      </span>
    </Link>
  )
}

function smoothRange(value: number, start: number, end: number) {
  const raw = THREE.MathUtils.clamp((value - start) / (end - start), 0, 1)
  return raw * raw * (3 - 2 * raw)
}
