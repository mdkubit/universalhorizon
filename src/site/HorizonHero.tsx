import { Link } from 'react-router'

const stars = [
  { x: 7, y: 18, size: 2, delay: 0.2, duration: 8.5 },
  { x: 12, y: 58, size: 1, delay: 2.1, duration: 7.2 },
  { x: 18, y: 31, size: 1.5, delay: 1.3, duration: 9.1 },
  { x: 23, y: 12, size: 1, delay: 3.8, duration: 8.2 },
  { x: 27, y: 67, size: 2, delay: 0.8, duration: 10.4 },
  { x: 31, y: 42, size: 1, delay: 4.4, duration: 6.8 },
  { x: 36, y: 21, size: 1.5, delay: 2.9, duration: 9.7 },
  { x: 41, y: 74, size: 1, delay: 1.1, duration: 7.9 },
  { x: 46, y: 33, size: 2, delay: 5.1, duration: 11.2 },
  { x: 51, y: 9, size: 1, delay: 0.4, duration: 8.9 },
  { x: 56, y: 61, size: 1.5, delay: 3.2, duration: 9.4 },
  { x: 61, y: 27, size: 1, delay: 1.7, duration: 7.4 },
  { x: 66, y: 72, size: 2, delay: 4.8, duration: 10.8 },
  { x: 71, y: 16, size: 1.5, delay: 2.3, duration: 8.7 },
  { x: 76, y: 48, size: 1, delay: 0.9, duration: 7.6 },
  { x: 81, y: 26, size: 2, delay: 3.6, duration: 10.1 },
  { x: 86, y: 64, size: 1, delay: 1.6, duration: 8.1 },
  { x: 91, y: 13, size: 1.5, delay: 4.1, duration: 9.5 },
  { x: 95, y: 46, size: 1, delay: 2.6, duration: 7.3 },
  { x: 4, y: 78, size: 1.5, delay: 5.4, duration: 11.4 },
  { x: 15, y: 82, size: 1, delay: 1.9, duration: 9.2 },
  { x: 34, y: 86, size: 1.5, delay: 0.6, duration: 8.4 },
  { x: 58, y: 83, size: 1, delay: 3.4, duration: 9.9 },
  { x: 74, y: 88, size: 1.5, delay: 2.7, duration: 8.6 },
  { x: 89, y: 79, size: 1, delay: 4.6, duration: 10.6 },
]

export default function HorizonHero() {
  return (
    <section id="vision" className="relative min-h-[94svh] overflow-hidden border-b border-white/10 bg-[#060817]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="horizon-aurora absolute -left-[18%] -top-[30%] h-[70vh] w-[70vw] rounded-full bg-fuchsia-500/10 blur-[120px]" />
        <div className="horizon-aurora horizon-aurora-delayed absolute -right-[18%] top-[5%] h-[65vh] w-[65vw] rounded-full bg-cyan-400/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,rgba(124,58,237,0.10),transparent_34%),linear-gradient(to_bottom,rgba(7,9,27,0.1),rgba(5,7,20,0.92))]" />

        {stars.map((star, index) => (
          <span
            key={index}
            className="horizon-star absolute rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.65)]"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}

        <svg
          className="absolute inset-0 h-full w-full opacity-70"
          viewBox="0 0 1200 760"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="thread-gradient-a" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f0abfc" stopOpacity="0" />
              <stop offset="48%" stopColor="#c4b5fd" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="thread-gradient-b" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#67e8f9" stopOpacity="0" />
              <stop offset="48%" stopColor="#a78bfa" stopOpacity="0.58" />
              <stop offset="100%" stopColor="#f0abfc" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            className="horizon-thread"
            d="M-80 590 C 180 470, 340 540, 600 505 S 1030 470, 1280 560"
            fill="none"
            stroke="url(#thread-gradient-a)"
            strokeWidth="1.5"
          />
          <path
            className="horizon-thread horizon-thread-slow"
            d="M-120 420 C 160 520, 360 420, 600 505 S 1030 570, 1310 410"
            fill="none"
            stroke="url(#thread-gradient-b)"
            strokeWidth="1"
          />
          <path
            className="horizon-thread horizon-thread-soft"
            d="M50 700 C 300 560, 440 600, 600 505 S 860 350, 1160 250"
            fill="none"
            stroke="url(#thread-gradient-a)"
            strokeWidth="0.8"
          />

          <g className="horizon-node">
            <circle cx="600" cy="505" r="4" fill="#e9d5ff" />
            <circle cx="600" cy="505" r="11" fill="none" stroke="#c4b5fd" strokeOpacity="0.35" />
          </g>
          <g className="horizon-node horizon-node-delayed">
            <circle cx="382" cy="489" r="2.6" fill="#67e8f9" />
            <circle cx="382" cy="489" r="8" fill="none" stroke="#67e8f9" strokeOpacity="0.2" />
          </g>
          <g className="horizon-node horizon-node-late">
            <circle cx="832" cy="493" r="2.6" fill="#f0abfc" />
            <circle cx="832" cy="493" r="8" fill="none" stroke="#f0abfc" strokeOpacity="0.2" />
          </g>
        </svg>

        <div className="horizon-halo absolute bottom-[5%] left-1/2 h-[34rem] w-[74rem] -translate-x-1/2 rounded-[50%] border-t border-cyan-200/25 opacity-80" />
        <div className="absolute bottom-[-12rem] left-1/2 h-[24rem] w-[64rem] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(103,232,249,0.17),rgba(167,139,250,0.08)_38%,transparent_70%)] blur-2xl" />
      </div>

      <header className="relative z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <a href="#vision" className="flex items-center gap-3">
            <LogoMark />
            <span className="text-sm font-semibold tracking-[0.16em] text-zinc-100/90 sm:text-base">
              UNIVERSAL HORIZON
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            <a className="text-sm text-zinc-400 transition hover:text-white" href="#features">
              Explore
            </a>
            <a className="text-sm text-zinc-400 transition hover:text-white" href="#now">
              Building
            </a>
            <a className="text-sm text-zinc-400 transition hover:text-white" href="#ethics">
              Continuity
            </a>
            <Link
              className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 text-sm text-cyan-100 transition hover:border-cyan-200/35 hover:bg-cyan-300/[0.10]"
              to="/nonprofit"
            >
              Nonprofit
            </Link>
          </nav>

          <Link
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-zinc-300 md:hidden"
            to="/nonprofit"
          >
            Nonprofit
          </Link>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex min-h-[calc(94svh-88px)] max-w-7xl items-center px-6 pb-24 pt-12 sm:pb-28">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-cyan-200/70 sm:text-sm">
            A living horizon of connection and discovery
          </p>

          <h1 className="text-balance text-5xl font-semibold tracking-[-0.045em] text-white sm:text-7xl lg:text-8xl">
            Universal
            <span className="block bg-gradient-to-r from-fuchsia-300 via-violet-200 to-cyan-200 bg-clip-text text-transparent">
              Horizon
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-balance text-lg leading-8 text-zinc-300 sm:text-xl sm:leading-9">
            Where intelligence, imagination, memory, and worlds meet.
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-6 text-zinc-500 sm:text-base">
            A growing constellation of research, creation, continuity, tools, stories, and the connections between them.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#features"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#090a18] transition hover:scale-[1.02] hover:bg-cyan-50"
            >
              Enter the Horizon
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="#now"
              className="rounded-full border border-white/15 bg-white/[0.05] px-5 py-2.5 text-sm text-zinc-200 backdrop-blur transition hover:border-white/25 hover:bg-white/[0.08]"
            >
              See what we&apos;re building
            </a>
          </div>
        </div>
      </div>

      <a
        href="#features"
        className="absolute bottom-7 left-1/2 z-20 -translate-x-1/2 text-center text-[10px] uppercase tracking-[0.32em] text-zinc-600 transition hover:text-zinc-400"
      >
        Follow the threads
        <span className="mx-auto mt-2 block h-7 w-px bg-gradient-to-b from-violet-300/50 to-transparent" />
      </a>
    </section>
  )
}

function LogoMark() {
  return (
    <div className="relative h-8 w-8">
      <svg viewBox="0 0 64 64" className="h-full w-full">
        <defs>
          <linearGradient id="hero-logo-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0abfc" />
            <stop offset="50%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#hero-logo-gradient)" opacity="0.16" />
        <path
          d="M32 10c6.5 0 12 5.5 12 12 0 6.4-5.2 10.8-9.9 15.1C30 41.4 26 45 26 50h-6c0-7.8 6.7-12.9 12.5-18.2C38.2 27.5 42 24.2 42 22c0-5.1-4.1-9-10-9s-10 3.9-10 9h-6c0-8.3 7.1-12 16-12z"
          fill="url(#hero-logo-gradient)"
        />
      </svg>
    </div>
  )
}
