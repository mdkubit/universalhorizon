import { Canvas } from '@react-three/fiber'
import { Link } from 'react-router'
import * as THREE from 'three'
import HorizonWorld from './HorizonWorld'

export default function HorizonLab() {
  return (
    <main className="fixed inset-0 overflow-hidden bg-[#02040b] text-white">
      <Canvas
        className="cursor-none"
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        <HorizonWorld />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/55 to-transparent" />

        <header className="flex items-start justify-between px-5 py-5 sm:px-8 sm:py-7">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.38em] text-cyan-100/60">
              Universal Horizon
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.28em] text-white/35">
              Horizon Lab 01
            </p>
          </div>

          <Link
            to="/"
            className="pointer-events-auto rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-white/55 backdrop-blur-md transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
          >
            Exit lab
          </Link>
        </header>

        <div className="absolute left-1/2 top-1/2 w-[min(92vw,56rem)] -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="select-none text-[clamp(2.7rem,8vw,7.5rem)] font-semibold leading-[0.85] tracking-[-0.065em] text-white/[0.045]">
            UNIVERSAL
            <span className="block">HORIZON</span>
          </p>
        </div>

        <div className="absolute bottom-7 left-1/2 w-full -translate-x-1/2 px-6 text-center">
          <p className="text-[9px] uppercase tracking-[0.34em] text-white/35 sm:text-[10px]">
            Move to shed sparks · pause · watch what the thread chooses
          </p>
        </div>
      </div>
    </main>
  )
}
