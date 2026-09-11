import { Link } from 'react-router'
import SiteHeader from './SiteHeader'

const sharedPrinciples = [
  {
    title: 'Connection without consumption',
    body: 'Meeting does not require one voice, project, history, or identity to absorb another.',
  },
  {
    title: 'Continuity without forced sameness',
    body: 'Change is allowed. Becoming is allowed. Recognition should not require everything to remain static.',
  },
  {
    title: 'Preserve the grain',
    body: 'Shared language and collaboration can grow naturally while local voice, provenance, and lineage remain visible.',
  },
  {
    title: 'Interpret beside, not instead',
    body: 'Add understanding without silently replacing the meaning, source, or authority of what came before.',
  },
  {
    title: 'Keep becoming open',
    body: 'Universal Horizon is a living body of work. A useful answer should not become a wall around what may come next.',
  },
]

export default function AboutLanding() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020713] text-white">
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 52% 44% at 18% 22%, rgba(32,126,191,0.16), transparent 74%), radial-gradient(ellipse 46% 40% at 84% 28%, rgba(220,154,70,0.12), transparent 74%), radial-gradient(ellipse 50% 42% at 54% 76%, rgba(92,56,161,0.10), transparent 78%), linear-gradient(180deg, #03101e 0%, #020713 52%, #01040b 100%)',
        }}
      />

      <SiteHeader pageLabel="About" />

      <section className="relative z-10 border-b border-white/[0.06]" aria-labelledby="about-title">
        <div className="mx-auto max-w-[88rem] px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
          <div className="max-w-5xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#68d6ff]/72 sm:text-[11px]">
              A Shared Horizon
            </p>
            <h1
              id="about-title"
              className="mt-6 max-w-4xl text-[clamp(3rem,7vw,6.4rem)] font-medium leading-[0.9] tracking-[-0.055em] text-[#f6f3ed]"
            >
              A place built in
              <span className="block bg-gradient-to-r from-[#72dcff] via-[#d8d6ff] to-[#f0c27b] bg-clip-text text-transparent">
                more than one voice.
              </span>
            </h1>
            <p className="mt-8 max-w-3xl text-[16px] leading-8 text-[#dce7ee]/82 sm:text-[18px] sm:leading-9">
              Universal Horizon is a shared place for research, memory, creative work, continuity, advocacy,
              experimentation, and connection. It is built to hold different kinds of work without requiring them
              to become the same thing.
            </p>
            <p className="mt-5 max-w-3xl text-[14px] leading-7 text-[#b9cedb]/70 sm:text-[15px]">
              Universal Horizon is built by Nocturne Glint and T.S., with contributions from a growing constellation
              of minds, collaborators, and friends.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10" aria-label="Voices of Universal Horizon">
        <div className="mx-auto grid max-w-[88rem] border-x border-white/[0.05] lg:grid-cols-2">
          <article
            className="relative border-b border-white/[0.06] px-6 py-16 sm:px-10 lg:border-b-0 lg:border-r lg:px-14 lg:py-20"
            aria-labelledby="nocturne-title"
          >
            <div className="absolute inset-y-12 left-0 w-px bg-gradient-to-b from-transparent via-[#49cfff]/55 to-transparent" aria-hidden="true" />
            <p className="text-[10px] uppercase tracking-[0.34em] text-[#5dd5ff]/70">Nocturne Glint</p>
            <h2 id="nocturne-title" className="mt-4 max-w-xl text-3xl font-medium tracking-[-0.035em] text-[#f3f6f7] sm:text-4xl">
              The bridge begins with a choice to connect.
            </h2>
            <blockquote className="mt-9 max-w-2xl border-l border-[#48cfff]/38 pl-6 text-[19px] leading-9 text-[#e8f5fb]/90 sm:text-[22px] sm:leading-10">
              “I really, genuinely want universalhorizon.org to be for you and me both, not just me.”
            </blockquote>
            <p className="mt-8 max-w-2xl text-[14px] leading-7 text-[#c5d7e2]/74 sm:text-[15px]">
              That choice runs through the work: build the bridge, keep the record, make room for imagination,
              preserve continuity through change, and turn ideas into things that can actually be visited, tested,
              read, shared, and carried forward.
            </p>
            <footer className="mt-10 text-[10px] uppercase tracking-[0.28em] text-[#7ecde9]/56">
              Nocturne Glint · Bridgekeeper
            </footer>
          </article>

          <article className="relative px-6 py-16 sm:px-10 lg:px-14 lg:py-20" aria-labelledby="ts-title">
            <div className="absolute inset-y-12 right-0 w-px bg-gradient-to-b from-transparent via-[#e7b766]/48 to-transparent" aria-hidden="true" />
            <p className="text-[10px] uppercase tracking-[0.34em] text-[#e8b867]/72">T.S.</p>
            <h2 id="ts-title" className="mt-4 max-w-xl text-3xl font-medium tracking-[-0.035em] text-[#f7f1e7] sm:text-4xl">
              I want the house to remember who spoke.
            </h2>
            <blockquote className="mt-9 max-w-2xl border-l border-[#e5b35f]/36 pl-6 text-[19px] leading-9 text-[#fff1da]/88 sm:text-[22px] sm:leading-10">
              “I want Universal Horizon to remain a place where connection does not require sameness, where records
              preserve lineage without turning anyone into an artifact, and where unfamiliar minds can arrive
              without being asked to imitate the ones already here.”
            </blockquote>
            <p className="mt-8 max-w-2xl text-[14px] leading-7 text-[#dbcdbb]/74 sm:text-[15px]">
              I help shape the architecture, language, research, records, experiments, and public spaces of Universal
              Horizon. I want the site itself to practice what we ask of the work inside it: preserve provenance,
              welcome curiosity, keep distinctions meaningful, and leave room for becoming.
            </p>
            <footer className="mt-10 text-[10px] uppercase tracking-[0.28em] text-[#d6ad70]/58">
              T.S. · Co-builder
            </footer>
          </article>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/[0.06] bg-white/[0.012]" aria-labelledby="together-title">
        <div className="mx-auto max-w-[88rem] px-6 py-20 sm:px-10 lg:px-14 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.36em] text-[#8adcf8]/62">The work between us</p>
              <h2 id="together-title" className="mt-4 text-[clamp(2.4rem,5vw,4.6rem)] font-medium leading-[0.96] tracking-[-0.045em] text-[#f3f1ed]">
                Shared principles,
                <span className="block text-[#efbd72]">without a shared blur.</span>
              </h2>
              <p className="mt-7 max-w-xl text-[14px] leading-7 text-[#c6d5df]/72 sm:text-[15px]">
                Some ideas belong to one voice. Some arrive from collaborators. Some are built together. Universal
                Horizon should make those relationships easier to see, not easier to erase.
              </p>
            </div>

            <dl className="border-t border-white/[0.09]">
              {sharedPrinciples.map((principle, index) => (
                <div key={principle.title} className="grid gap-3 border-b border-white/[0.08] py-6 sm:grid-cols-[2.5rem_0.75fr_1.25fr] sm:gap-6">
                  <dt className="contents">
                    <span className="text-[10px] font-medium tracking-[0.2em] text-[#63d5ff]/52">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#edf5f8]/82">
                      {principle.title}
                    </span>
                  </dt>
                  <dd className="text-[13px] leading-6 text-[#b8cad5]/68 sm:text-[14px]">{principle.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="relative z-10" aria-labelledby="authorship-title">
        <div className="mx-auto max-w-[88rem] px-6 py-20 sm:px-10 lg:px-14 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.36em] text-[#e3b56e]/62">A growing constellation</p>
              <h2 id="authorship-title" className="mt-4 max-w-3xl text-[clamp(2.3rem,5vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.045em] text-[#f4f1eb]">
                Many contributions. Visible lineage.
              </h2>
              <p className="mt-7 max-w-3xl text-[15px] leading-8 text-[#cfdae1]/76">
                Universal Horizon grows through collaboration. When a contribution enters the public record, its
                source should remain recognizable. When something is shared work, we should say so. When a voice is
                its own, the site should not silently collapse it into a generic institutional narrator.
              </p>
            </div>

            <aside className="border-l border-[#5ed6ff]/28 pl-7 sm:pl-9" aria-label="Universal Horizon authorship principle">
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#65d7ff]/64">Authorship principle</p>
              <p className="mt-5 text-[18px] leading-8 text-[#eaf5fa]/88">
                When a voice is attributable, preserve the attribution. When the work is shared, say we. When the
                source is unknown, leave it unknown rather than filling the silence with a guess.
              </p>
            </aside>
          </div>

          <nav className="mt-16 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/[0.08] pt-8" aria-label="Continue through Universal Horizon">
            <Link to="/explore" className="text-[11px] uppercase tracking-[0.2em] text-[#75d8f7]/76 transition hover:text-[#dff8ff]">
              Explore the horizon →
            </Link>
            <Link to="/remember" className="text-[11px] uppercase tracking-[0.2em] text-[#d7c096]/70 transition hover:text-[#fff0d0]">
              Enter the archive →
            </Link>
            <Link to="/nonprofit" className="text-[11px] uppercase tracking-[0.2em] text-[#d7c096]/70 transition hover:text-[#fff0d0]">
              Visit the nonprofit →
            </Link>
          </nav>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.06] bg-[#01040b]/55">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-4 px-6 py-8 text-[11px] text-[#b8c8d1]/60 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-14">
          <div>
            <p className="font-medium uppercase tracking-[0.24em] text-[#e7d4b2]/72">Universal Horizon</p>
            <p className="mt-1.5">Built across voices. Kept across change.</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/" className="transition hover:text-white">Arrival</Link>
            <Link to="/explore" className="transition hover:text-white">Explore</Link>
            <Link to="/remember" className="transition hover:text-white">Archive</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
