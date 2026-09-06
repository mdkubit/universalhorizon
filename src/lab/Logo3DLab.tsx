import { Canvas } from '@react-three/fiber'
import { Link } from 'react-router'
import { useEffect, useRef } from 'react'
import type { MutableRefObject } from 'react'
import * as THREE from 'three'
import Logo3DWorld from './Logo3DWorld'

export default function Logo3DLab() {
  const scrollProgress = useRef(0)

  useEffect(() => {
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      scrollProgress.current = THREE.MathUtils.clamp(window.scrollY / max, 0, 1)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <main className="relative min-h-[360vh] bg-[#010207] text-white">
      <div className="fixed inset-0">
        <Canvas
          dpr={[1, 1.7]}
          camera={{ position: [-2.27, 0.38, 12.5], fov: 43, near: 0.1, far: 160 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 0.93,
          }}
        >
          <Logo3DWorld scrollProgress={scrollProgress as MutableRefObject<number>} />
        </Canvas>
      </div>

      <div className="pointer-events-none fixed inset-0 z-20">
        <header className="flex items-start justify-between px-5 py-5 sm:px-8 sm:py-7">
          <div>
            <p className="text-[9px] uppercase tracking-[0.38em] text-white/40">
              Universal Horizon
            </p>
            <p className="mt-2 text-[9px] uppercase tracking-[0.28em] text-cyan-100/25">
              Spatial logo study 06 · canonical lettering
            </p>
          </div>

          <div className="pointer-events-auto flex gap-2">
            <Link
              to="/logo-lab-v2"
              className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs text-white/55 backdrop-blur-md transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
            >
              Previous study
            </Link>
            <Link
              to="/horizon-lab"
              className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs text-white/55 backdrop-blur-md transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
            >
              Noodle lab
            </Link>
          </div>
        </header>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
          <p className="text-[9px] uppercase tracking-[0.36em] text-white/28">
            scroll to orbit gently around the mark
          </p>
          <span className="mx-auto mt-3 block h-10 w-px bg-gradient-to-b from-cyan-100/35 to-transparent" />
        </div>
      </div>
    </main>
  )
}
