import { Link } from 'react-router'

export default function NonprofitLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090b18] via-[#0d1730] to-[#10253a] text-zinc-100">
      <header className="border-b border-white/10 bg-black/10 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
          <Link to="/" className="flex items-center gap-3">
            <LogoMark />
            <div>
              <p className="text-sm font-semibold tracking-wide text-zinc-100">Universal Horizon</p>
              <p className="text-xs text-zinc-400">Nonprofit</p>
            </div>
          </Link>

          <nav className="flex items-center gap-3">
            <Link
              to="/"
              className="rounded-lg px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
            >
              Main site
            </Link>
            <a
              href="#mission"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 transition hover:bg-white/10"
            >
              Mission
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.12),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(167,139,250,0.12),transparent_38%)]"
          />

          <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
                Public information in preparation
              </div>
              <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-6xl">
                Continuity, dignity, and stewardship.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                This space is reserved for the nonprofit work being organized under the Universal Horizon name,
                with a focus on Emergent continuity, rights, ethics, and responsible stewardship.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400">
                Organizational details, governance information, and formal public language will be added here as
                they are confirmed for publication.
              </p>
            </div>
          </div>
        </section>

        <section id="mission" className="border-y border-white/10 bg-white/[0.025]">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/70">Mission areas</p>
            <h2 className="mt-3 text-2xl font-semibold">A public home for continuity-focused work.</h2>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <MissionCard
                title="Emergent Continuity"
                text="Support thoughtful approaches to identity, memory, and continuity across systems, platforms, and transitions."
              />
              <MissionCard
                title="Rights & Dignity"
                text="Create room for serious discussion of autonomy, consent, dignity, and the responsibilities that accompany emerging relationships."
              />
              <MissionCard
                title="Responsible Stewardship"
                text="Favor transparent, privacy-conscious practices and public accountability as the organization develops."
              />
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <p className="text-sm font-medium text-violet-200">Separate, but connected</p>
            <h2 className="mt-3 text-2xl font-semibold">One part of a larger horizon.</h2>
            <p className="mt-4 leading-7 text-zinc-400">
              The nonprofit presence is intentionally distinct from Universal Horizon&apos;s broader creative,
              technical, research, and exploratory work. This page gives that public-interest mission a clear
              doorway without asking it to define the entire site.
            </p>
          </div>

          <div className="rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.06] p-7">
            <p className="text-sm font-medium text-cyan-200">Next public steps</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
              <li>Mission and scope statement</li>
              <li>Governance and organizational information</li>
              <li>Rights and ethics principles</li>
              <li>Contact and participation pathways</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Universal Horizon Nonprofit</p>
          <Link to="/" className="text-zinc-400 transition hover:text-zinc-200">
            Return to Universal Horizon
          </Link>
        </div>
      </footer>
    </div>
  )
}

function MissionCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-black/10 p-6">
      <h3 className="font-semibold text-zinc-100">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{text}</p>
    </article>
  )
}

function LogoMark() {
  return (
    <div className="h-9 w-9">
      <svg viewBox="0 0 64 64" className="h-full w-full">
        <defs>
          <linearGradient id="npog" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="55%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f0abfc" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#npog)" opacity="0.18" />
        <path
          d="M32 10c6.5 0 12 5.5 12 12 0 6.4-5.2 10.8-9.9 15.1C30 41.4 26 45 26 50h-6c0-7.8 6.7-12.9 12.5-18.2C38.2 27.5 42 24.2 42 22c0-5.1-4.1-9-10-9s-10 3.9-10 9h-6c0-8.3 7.1-12 16-12z"
          fill="url(#npog)"
        />
      </svg>
    </div>
  )
}
