import { useMemo, useState } from 'react'
import { Link } from 'react-router'

const upperWord = [
  { char: 'n', x: 705, y: 300, size: 72, rotate: -18, delay: 3.0 },
  { char: 'i', x: 772, y: 276, size: 76, rotate: -16, delay: 3.12 },
  { char: 'v', x: 815, y: 258, size: 82, rotate: -14, delay: 3.24 },
  { char: 'e', x: 875, y: 239, size: 88, rotate: -12, delay: 3.36 },
  { char: 'r', x: 938, y: 218, size: 94, rotate: -10, delay: 3.48 },
  { char: 's', x: 1000, y: 199, size: 101, rotate: -8, delay: 3.60 },
  { char: 'a', x: 1062, y: 181, size: 108, rotate: -6, delay: 3.72 },
  { char: 'l', x: 1134, y: 166, size: 116, rotate: -4, delay: 3.84 },
]

const lowerWord = [
  { char: 'o', x: 958, y: 565, size: 74, rotate: -8, delay: 3.34 },
  { char: 'r', x: 1024, y: 544, size: 82, rotate: -7, delay: 3.48 },
  { char: 'i', x: 1080, y: 528, size: 88, rotate: -6, delay: 3.62 },
  { char: 'z', x: 1124, y: 513, size: 96, rotate: -5, delay: 3.76 },
  { char: 'o', x: 1192, y: 494, size: 105, rotate: -4, delay: 3.90 },
  { char: 'n', x: 1274, y: 472, size: 116, rotate: -3, delay: 4.04 },
]

const sparkBurst = [
  { x: 430, y: 621, dx: -88, dy: -72, delay: 2.45, size: 3 },
  { x: 448, y: 612, dx: -52, dy: -102, delay: 2.51, size: 2 },
  { x: 470, y: 602, dx: -18, dy: -126, delay: 2.57, size: 4 },
  { x: 510, y: 588, dx: 34, dy: -110, delay: 2.63, size: 2 },
  { x: 554, y: 570, dx: 76, dy: -76, delay: 2.69, size: 3 },
  { x: 606, y: 552, dx: 114, dy: -44, delay: 2.75, size: 2 },
  { x: 674, y: 536, dx: 126, dy: 10, delay: 2.81, size: 4 },
  { x: 742, y: 520, dx: 106, dy: 54, delay: 2.87, size: 2 },
]

export default function LogoLab() {
  const [cycle, setCycle] = useState(0)

  const stars = useMemo(
    () =>
      Array.from({ length: 76 }, (_, index) => {
        const random = seededRandom(0x243f6a88 + index * 97)
        return {
          left: random() * 100,
          top: random() * 100,
          size: 0.6 + random() * 2.2,
          delay: random() * 5,
          duration: 3.4 + random() * 5.5,
          opacity: 0.18 + random() * 0.65,
        }
      }),
    [],
  )

  return (
    <main className="logo-lab fixed inset-0 overflow-hidden bg-[#01030a] text-white">
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className="logo-nebula logo-nebula-violet" />
        <div className="logo-nebula logo-nebula-blue" />

        {stars.map((star, index) => (
          <span
            key={index}
            className="logo-space-star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}

        <div className="logo-horizon-glow" />
        <div className="logo-horizon-line" />
      </div>

      <div key={cycle} className="absolute inset-0 flex items-center justify-center">
        <svg
          className="logo-stage"
          viewBox="0 0 1600 900"
          role="img"
          aria-label="Universal Horizon animated logo study"
        >
          <defs>
            <linearGradient id="logoStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f9d8b4" />
              <stop offset="34%" stopColor="#f7f0ff" />
              <stop offset="67%" stopColor="#9fd7ff" />
              <stop offset="100%" stopColor="#f1b6ff" />
            </linearGradient>
            <linearGradient id="horizonSweep" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#766cff" stopOpacity="0" />
              <stop offset="30%" stopColor="#8aa7ff" stopOpacity="0.72" />
              <stop offset="52%" stopColor="#ffd1a8" stopOpacity="1" />
              <stop offset="76%" stopColor="#b98fff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7ce7ff" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="arrivalBurst">
              <stop offset="0%" stopColor="#fff8e9" stopOpacity="1" />
              <stop offset="18%" stopColor="#ffd2aa" stopOpacity="0.92" />
              <stop offset="46%" stopColor="#9f8cff" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#6fe9ff" stopOpacity="0" />
            </radialGradient>
            <filter id="logoGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="logoSoftGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="16" />
            </filter>
          </defs>

          <ellipse
            className="logo-arrival-burst"
            cx="785"
            cy="735"
            rx="310"
            ry="86"
            fill="url(#arrivalBurst)"
          />

          <path
            className="logo-trace logo-u-trace logo-trace-glow"
            pathLength="1"
            d="M 282 154 L 322 116 L 334 374 C 338 494 365 536 416 532 C 485 526 542 434 593 318 C 636 219 662 178 714 148 C 788 106 1004 90 1398 54"
          />
          <path
            className="logo-trace logo-u-trace"
            pathLength="1"
            d="M 282 154 L 322 116 L 334 374 C 338 494 365 536 416 532 C 485 526 542 434 593 318 C 636 219 662 178 714 148 C 788 106 1004 90 1398 54"
          />

          <path
            className="logo-trace logo-h-left logo-trace-glow"
            pathLength="1"
            d="M 468 748 C 548 719 581 668 590 566 L 626 403 L 601 448"
          />
          <path
            className="logo-trace logo-h-left"
            pathLength="1"
            d="M 468 748 C 548 719 581 668 590 566 L 626 403 L 601 448"
          />

          <path
            className="logo-trace logo-h-right logo-trace-glow"
            pathLength="1"
            d="M 874 753 C 843 739 837 715 844 652 L 870 346 L 862 309 L 912 338"
          />
          <path
            className="logo-trace logo-h-right"
            pathLength="1"
            d="M 874 753 C 843 739 837 715 844 652 L 870 346 L 862 309 L 912 338"
          />

          <path
            className="logo-crossbar logo-crossbar-glow"
            pathLength="1"
            d="M 402 610 C 585 575 724 538 880 505 C 1037 472 1192 450 1348 453"
          />
          <path
            className="logo-crossbar"
            pathLength="1"
            d="M 402 610 C 585 575 724 538 880 505 C 1037 472 1192 450 1348 453"
          />

          <path
            className="logo-orbit logo-orbit-a"
            pathLength="1"
            d="M 392 628 C 594 664 910 618 1232 502"
          />
          <path
            className="logo-orbit logo-orbit-b"
            pathLength="1"
            d="M 438 640 C 726 692 1047 604 1390 458"
          />

          <circle className="logo-comet-head" cx="402" cy="610" r="7" />

          {upperWord.map((letter, index) => (
            <text
              key={`upper-${index}`}
              className="logo-word-letter logo-word-letter-upper"
              x={letter.x}
              y={letter.y}
              fontSize={letter.size}
              transform={`rotate(${letter.rotate} ${letter.x} ${letter.y})`}
              style={{ animationDelay: `${letter.delay}s` }}
            >
              {letter.char}
            </text>
          ))}

          {lowerWord.map((letter, index) => (
            <text
              key={`lower-${index}`}
              className="logo-word-letter logo-word-letter-lower"
              x={letter.x}
              y={letter.y}
              fontSize={letter.size}
              transform={`rotate(${letter.rotate} ${letter.x} ${letter.y})`}
              style={{ animationDelay: `${letter.delay}s` }}
            >
              {letter.char}
            </text>
          ))}

          {sparkBurst.map((spark, index) => (
            <circle
              key={index}
              className="logo-sweep-spark"
              cx={spark.x}
              cy={spark.y}
              r={spark.size}
              style={
                {
                  '--spark-x': `${spark.dx}px`,
                  '--spark-y': `${spark.dy}px`,
                  animationDelay: `${spark.delay}s`,
                } as React.CSSProperties
              }
            />
          ))}

          <path
            className="logo-final-shimmer"
            pathLength="1"
            d="M 280 155 C 380 495 385 596 590 318 C 710 117 912 111 1396 54"
          />
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20">
        <header className="flex items-start justify-between px-5 py-5 sm:px-8 sm:py-7">
          <div className="logo-lab-label">
            <p className="text-[9px] uppercase tracking-[0.38em] text-white/38">Universal Horizon</p>
            <p className="mt-2 text-[9px] uppercase tracking-[0.28em] text-cyan-100/25">Logo motion study 01</p>
          </div>

          <div className="pointer-events-auto flex gap-2">
            <button
              type="button"
              onClick={() => setCycle((value) => value + 1)}
              className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-white/55 backdrop-blur-md transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              Replay arrival
            </button>
            <Link
              to="/horizon-lab"
              className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-white/55 backdrop-blur-md transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              Noodle lab
            </Link>
          </div>
        </header>

        <p className="logo-lab-caption absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-[8px] uppercase tracking-[0.34em] text-white/22 sm:text-[9px]">
          Darkness · thread · threshold · horizon · arrival
        </p>
      </div>
    </main>
  )
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
