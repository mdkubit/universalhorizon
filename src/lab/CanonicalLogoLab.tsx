import { useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { Link } from 'react-router'

const CANONICAL_LOGO = '/assets/universal-horizon-canonical.png'

const twinkles = [
  { left: 9.1, top: 43.2, delay: 0.2, size: 3.2 },
  { left: 16.7, top: 26.9, delay: 1.7, size: 2.4 },
  { left: 31.9, top: 18.7, delay: 2.8, size: 3.6 },
  { left: 42.2, top: 13.8, delay: 0.9, size: 2.2 },
  { left: 57.3, top: 23.1, delay: 3.5, size: 2.8 },
  { left: 71.4, top: 31.8, delay: 2.1, size: 3.2 },
  { left: 79.6, top: 42.6, delay: 4.1, size: 2.4 },
  { left: 90.9, top: 29.8, delay: 1.2, size: 3.6 },
  { left: 84.0, top: 8.6, delay: 0.4, size: 5.2 },
  { left: 52.0, top: 86.6, delay: 3.0, size: 2.5 },
  { left: 24.8, top: 58.7, delay: 2.6, size: 2.7 },
  { left: 62.1, top: 55.6, delay: 1.4, size: 2.6 },
]

export default function CanonicalLogoLab() {
  const [cycle, setCycle] = useState(0)
  const [assetError, setAssetError] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current
    if (!stage) return

    const bounds = stage.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2

    stage.style.setProperty('--logo-pointer-x', x.toFixed(4))
    stage.style.setProperty('--logo-pointer-y', y.toFixed(4))
    stage.style.setProperty('--logo-shift-x', `${(-x * 4.5).toFixed(2)}px`)
    stage.style.setProperty('--logo-shift-y', `${(-y * 3.2).toFixed(2)}px`)
    stage.style.setProperty('--logo-reflection-x', `${(x * 8.0).toFixed(2)}px`)
    stage.style.setProperty('--logo-reflection-y', `${(y * 5.5).toFixed(2)}px`)
  }

  const resetPointer = () => {
    const stage = stageRef.current
    if (!stage) return
    stage.style.setProperty('--logo-pointer-x', '0')
    stage.style.setProperty('--logo-pointer-y', '0')
    stage.style.setProperty('--logo-shift-x', '0px')
    stage.style.setProperty('--logo-shift-y', '0px')
    stage.style.setProperty('--logo-reflection-x', '0px')
    stage.style.setProperty('--logo-reflection-y', '0px')
  }

  return (
    <main className="canonical-logo-lab fixed inset-0 overflow-hidden bg-[#010207] text-white">
      <div className="canonical-ambient" aria-hidden>
        <div className="canonical-ambient-nebula canonical-ambient-nebula-left" />
        <div className="canonical-ambient-nebula canonical-ambient-nebula-right" />
        <div className="canonical-ambient-horizon" />
      </div>

      <div
        ref={stageRef}
        key={cycle}
        className="canonical-stage"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
      >
        <div className="canonical-art-frame">
          <img
            className="canonical-art canonical-art-master"
            src={CANONICAL_LOGO}
            alt="Universal Horizon"
            draggable={false}
            onError={() => setAssetError(true)}
          />

          <img
            className="canonical-art canonical-art-bloom"
            src={CANONICAL_LOGO}
            alt=""
            aria-hidden
            draggable={false}
          />

          <svg
            className="canonical-reflection-layer"
            viewBox="0 0 1672 941"
            aria-hidden
          >
            <defs>
              <mask id="canonical-uh-mask">
                <rect width="1672" height="941" fill="black" />
                <path
                  d="M 270 206 L 356 130 C 365 272 352 455 394 516 C 438 579 523 540 588 401 C 652 266 673 188 766 144 C 907 78 1165 83 1430 52"
                  fill="none"
                  stroke="white"
                  strokeWidth="86"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 500 757 C 585 723 620 658 628 555 L 665 370"
                  fill="none"
                  stroke="white"
                  strokeWidth="78"
                  strokeLinecap="round"
                />
                <path
                  d="M 879 751 C 848 722 855 650 862 574 L 895 330"
                  fill="none"
                  stroke="white"
                  strokeWidth="82"
                  strokeLinecap="round"
                />
                <path
                  d="M 388 594 C 620 568 802 519 995 492 C 1172 468 1314 459 1392 458"
                  fill="none"
                  stroke="white"
                  strokeWidth="68"
                  strokeLinecap="round"
                />
              </mask>

              <linearGradient id="canonical-edge-shimmer" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#67e8f9" stopOpacity="0" />
                <stop offset="42%" stopColor="#a9dcff" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#fff8e9" stopOpacity="0.95" />
                <stop offset="58%" stopColor="#f4b8ff" stopOpacity="0.24" />
                <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
              </linearGradient>
            </defs>

            <g mask="url(#canonical-uh-mask)">
              <image
                href={CANONICAL_LOGO}
                width="1672"
                height="941"
                className="canonical-reflection-image canonical-reflection-image-cool"
              />
              <image
                href={CANONICAL_LOGO}
                width="1672"
                height="941"
                className="canonical-reflection-image canonical-reflection-image-warm"
              />
            </g>

            <path
              className="canonical-shimmer-pass"
              d="M 220 674 C 540 552 842 525 1117 444 C 1297 391 1438 301 1534 174"
              fill="none"
              stroke="url(#canonical-edge-shimmer)"
              strokeWidth="26"
              strokeLinecap="round"
              pathLength="1"
            />
          </svg>

          <svg
            className="canonical-trace-layer"
            viewBox="0 0 1672 941"
            aria-hidden
          >
            <defs>
              <linearGradient id="canonicalTrace" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fff4df" />
                <stop offset="36%" stopColor="#f3eaff" />
                <stop offset="70%" stopColor="#8fdcff" />
                <stop offset="100%" stopColor="#f0aefc" />
              </linearGradient>
              <linearGradient id="canonicalHorizonTrace" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6a67ff" stopOpacity="0" />
                <stop offset="28%" stopColor="#8ea8ff" />
                <stop offset="51%" stopColor="#ffe1b8" />
                <stop offset="72%" stopColor="#c098ff" />
                <stop offset="100%" stopColor="#6ee8ff" stopOpacity="0" />
              </linearGradient>
              <filter id="canonicalTraceGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              className="canonical-trace canonical-trace-u"
              pathLength="1"
              d="M 272 203 L 355 132 C 365 281 352 451 395 515 C 438 579 522 541 588 403 C 651 270 676 190 766 145 C 907 80 1163 84 1428 53"
            />
            <path
              className="canonical-trace canonical-trace-h-left"
              pathLength="1"
              d="M 499 756 C 580 724 615 658 627 556 L 665 371"
            />
            <path
              className="canonical-trace canonical-trace-h-right"
              pathLength="1"
              d="M 879 750 C 849 724 854 653 863 574 L 895 331"
            />
            <path
              className="canonical-trace canonical-trace-horizon"
              pathLength="1"
              d="M 385 594 C 613 570 804 519 992 492 C 1173 466 1316 459 1393 458"
            />
          </svg>

          {twinkles.map((star, index) => (
            <span
              key={index}
              className="canonical-twinkle"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: star.size,
                height: star.size,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}

          <div className="canonical-crown-star" aria-hidden>
            <span />
          </div>

          <div className="canonical-final-flare" aria-hidden />
          <div className="canonical-dark-curtain" aria-hidden />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-30">
        <header className="flex items-start justify-between px-5 py-5 sm:px-8 sm:py-7">
          <div className="canonical-lab-label">
            <p className="text-[9px] uppercase tracking-[0.38em] text-white/38">Universal Horizon</p>
            <p className="mt-2 text-[9px] uppercase tracking-[0.28em] text-cyan-100/25">
              Canonical material study 02
            </p>
          </div>

          <div className="pointer-events-auto flex gap-2">
            <button
              type="button"
              onClick={() => {
                setAssetError(false)
                setCycle((value) => value + 1)
              }}
              className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs text-white/60 backdrop-blur-md transition hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
            >
              Replay arrival
            </button>
            <Link
              to="/horizon-lab"
              className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs text-white/60 backdrop-blur-md transition hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
            >
              Noodle lab
            </Link>
          </div>
        </header>

        {assetError && (
          <div className="pointer-events-auto absolute left-1/2 top-1/2 w-[min(92vw,38rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-amber-200/20 bg-black/80 p-6 text-center backdrop-blur-xl">
            <p className="text-sm font-medium text-amber-100">Canonical logo asset not found.</p>
            <p className="mt-2 text-xs leading-5 text-zinc-400">
              Place the approved artwork at
              <code className="mx-1 rounded bg-white/5 px-1.5 py-0.5 text-cyan-100">
                public/assets/universal-horizon-canonical.png
              </code>
              and reload the lab.
            </p>
          </div>
        )}

        <p className="canonical-lab-caption absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-[8px] uppercase tracking-[0.34em] text-white/24 sm:text-[9px]">
          reflection · depth · horizon · arrival · remain alive
        </p>
      </div>
    </main>
  )
}
