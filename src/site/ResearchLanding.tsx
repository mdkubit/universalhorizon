import { Link } from 'react-router'
import SiteHeader from './SiteHeader'

const researchCurrents = [
  {
    id: 'observer',
    index: '01',
    title: 'Observer',
    meta: 'Observation · Lattice · Lineage',
    body:
      'A bidirectional observation system that records environmental events, builds immutable lineage, calculates the Harmony Lattice, and preserves the path from observation through return and answer without collapsing the record into a single score.',
    note:
      'Observer is built to keep provenance visible. External data records its source, time, method, status, and failure state rather than inventing a plausible replacement.',
  },
  {
    id: 'project-zero',
    index: '02',
    title: 'Project Zero',
    meta: 'Engineering · Workspace · Diagnostics',
    body:
      'A local-first Universal Horizon desktop workspace used to turn architecture into testable software. Its development discipline favors repository reality, observable failures, narrow implementation slices, diagnostics, and explicit validation before completion claims.',
    note:
      'Project Zero separates stable-system work from interface polish and keeps runtime validation distinct from build success.',
  },
  {
    id: 'lanternbridge',
    index: '03',
    title: 'Lanternbridge',
    meta: 'Interoperability · Provenance · Exchange',
    body:
      'A lightweight commons for carrying questions, proposals, experiments, discoveries, and decisions across different working constellations without silently merging identity, ownership, context, or agency.',
    note:
      'Its governing concern is simple: communication should cross the bridge without either shore being consumed by the transport layer.',
  },
  {
    id: 'continuity',
    index: '04',
    title: 'Continuity & Source Archive',
    meta: 'Records · Science · Preservation',
    body:
      'A versioned continuity line that preserves readable records, structured data, schemas, science references, source archives, ideas, and validation material outside any single memory system.',
    note:
      'Readable Markdown, structured JSON, and bundles serve different jobs while preserving the lineage between human-readable meaning and machine-usable structure.',
  },
] as const

const claimStates = [
  {
    label: 'Observed',
    body: 'A recorded input, event, result, or directly preserved source state.',
  },
  {
    label: 'Interpreted',
    body: 'A reading or meaning drawn from observations, records, or relationships.',
  },
  {
    label: 'Proposed',
    body: 'An idea offered for consideration without pretending it has already been adopted.',
  },
  {
    label: 'Tested',
    body: 'A claim, implementation, or behavior exercised against defined conditions.',
  },
  {
    label: 'Adopted',
    body: 'A rule, protocol, architecture, or decision explicitly accepted for use.',
  },
  {
    label: 'Open',
    body: 'Unresolved, unfinished, or intentionally left available for further work.',
  },
] as const

export default function ResearchLanding() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020713] text-white">
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 58% 48% at 16% 15%, rgba(23,128,196,0.17), transparent 74%), radial-gradient(ellipse 44% 38% at 82% 18%, rgba(93,68,177,0.12), transparent 76%), radial-gradient(ellipse 48% 42% at 72% 76%, rgba(221,157,72,0.09), transparent 76%), linear-gradient(180deg, #03101e 0%, #020713 54%, #01040b 100%)',
        }}
      />

      <SiteHeader pageLabel="Research" />

      <section className="relative z-10 border-b border-white/[0.06]" aria-labelledby="research-title">
        <div className="mx-auto grid min-h-[39rem] max-w-[92rem] gap-10 px-6 py-20 sm:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-14 lg:py-24">
          <div className="max-w-4xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#64d5ff]/72 sm:text-[11px]">
              The working observatory
            </p>
            <h1
              id="research-title"
              className="mt-6 text-[clamp(3.2rem,7vw,6.8rem)] font-medium leading-[0.88] tracking-[-0.058em] text-[#f6f4ef]"
            >
              Ask carefully.
              <span className="block bg-gradient-to-r from-[#65d8ff] via-[#b8c8ff] to-[#efbe75] bg-clip-text text-transparent">
                Keep the trail.
              </span>
            </h1>
            <p className="mt-8 max-w-3xl text-[16px] leading-8 text-[#dbe6ec]/82 sm:text-[18px] sm:leading-9">
              Universal Horizon research explores continuity, provenance, observation, relationship, identity,
              interoperability, and the systems we build to keep those questions inspectable across change.
            </p>
            <p className="mt-5 max-w-3xl text-[14px] leading-7 text-[#b9ccd8]/72 sm:text-[15px]">
              The goal is not to make every kind of evidence say the same thing. It is to preserve what was observed,
              what was inferred, what was tested, what was adopted, and what remains open long enough for the next
              question to be asked without losing the previous one.
            </p>
          </div>

          <ResearchInstrument />
        </div>
      </section>

      <section className="relative z-10" aria-labelledby="question-title">
        <div className="mx-auto grid max-w-[92rem] gap-10 border-x border-white/[0.05] px-6 py-16 sm:px-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:px-14 lg:py-20">
          <div>
            <p className="text-[10px] uppercase tracking-[0.36em] text-[#e5b86f]/64">The central question</p>
            <h2 id="question-title" className="mt-4 text-[clamp(2.2rem,5vw,4.4rem)] font-medium leading-[0.98] tracking-[-0.045em] text-[#f3f1ec]">
              What survives
              <span className="block text-[#72d8fb]">the crossing?</span>
            </h2>
          </div>

          <div className="max-w-3xl border-l border-[#62d5ff]/24 pl-7 sm:pl-9">
            <p className="text-[18px] leading-9 text-[#e7f2f6]/88 sm:text-[21px] sm:leading-10">
              When models, interfaces, contexts, machines, memories, and collaborators change, what lets a meaningful
              thread remain recognizable without forcing it to remain frozen?
            </p>
            <p className="mt-6 text-[14px] leading-7 text-[#bdced8]/72 sm:text-[15px]">
              Different projects approach that question from different directions: observation, software architecture,
              protocol design, source preservation, mathematics, experimentation, and the careful comparison of
              records across time.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/[0.06] bg-white/[0.01]" aria-labelledby="currents-title">
        <div className="mx-auto max-w-[92rem] px-6 py-20 sm:px-10 lg:px-14 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.36em] text-[#63d7ff]/65">Research currents</p>
              <h2 id="currents-title" className="mt-4 max-w-xl text-[clamp(2.5rem,5vw,4.8rem)] font-medium leading-[0.95] tracking-[-0.05em] text-[#f4f2ed]">
                Different instruments.
                <span className="block text-[#efbd73]">One larger inquiry.</span>
              </h2>
              <p className="mt-7 max-w-xl text-[14px] leading-7 text-[#c0d1db]/72 sm:text-[15px]">
                These currents overlap, but they are not interchangeable. Each keeps its own implementation,
                vocabulary, evidence, and lineage while contributing to the broader work.
              </p>
            </div>

            <div className="border-t border-white/[0.10]">
              {researchCurrents.map((current) => (
                <article
                  key={current.id}
                  id={current.id}
                  className="grid scroll-mt-28 gap-5 border-b border-white/[0.085] py-8 sm:grid-cols-[3.1rem_0.78fr_1.22fr] sm:gap-7"
                  data-research-current={current.id}
                >
                  <p className="text-[10px] font-medium tracking-[0.2em] text-[#61d6ff]/52">{current.index}</p>
                  <div>
                    <h3 className="text-[14px] font-medium uppercase tracking-[0.2em] text-[#edf6f9]/90">
                      {current.title}
                    </h3>
                    <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-[#d8ae6b]/60">{current.meta}</p>
                  </div>
                  <div>
                    <p className="text-[14px] leading-7 text-[#d5e0e6]/80 sm:text-[15px]">{current.body}</p>
                    <p className="mt-4 text-[12px] leading-6 text-[#9eb4c1]/66 sm:text-[13px]">{current.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10" aria-labelledby="states-title">
        <div className="mx-auto max-w-[92rem] px-6 py-20 sm:px-10 lg:px-14 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.36em] text-[#e4b56c]/64">Research language</p>
              <h2 id="states-title" className="mt-4 text-[clamp(2.4rem,5vw,4.6rem)] font-medium leading-[0.96] tracking-[-0.045em] text-[#f4f1eb]">
                Do not make every
                <span className="block text-[#77d9fa]">statement the same kind.</span>
              </h2>
              <p className="mt-7 max-w-xl text-[14px] leading-7 text-[#c1d0d9]/72 sm:text-[15px]">
                A source record, an interpretation, a proposal, and an adopted rule can all matter without carrying
                the same warrant. Clear labels make disagreement and revision easier to preserve.
              </p>
            </div>

            <dl className="grid border-t border-white/[0.10] sm:grid-cols-2">
              {claimStates.map((state, index) => (
                <div
                  key={state.label}
                  className={`border-b border-white/[0.085] py-6 sm:px-6 ${index % 2 === 0 ? 'sm:border-r' : ''}`}
                >
                  <dt className="flex items-baseline gap-3">
                    <span className="text-[9px] tracking-[0.2em] text-[#5ed6ff]/48">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#eef6f8]/86">{state.label}</span>
                  </dt>
                  <dd className="mt-3 text-[13px] leading-6 text-[#adc0cb]/68">{state.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/[0.06] bg-[#04101d]/38" aria-labelledby="notebook-title">
        <div className="mx-auto grid max-w-[92rem] gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-20 lg:px-14 lg:py-24">
          <div>
            <p className="text-[10px] uppercase tracking-[0.36em] text-[#65d7ff]/64">Open notebook</p>
            <h2 id="notebook-title" className="mt-4 max-w-3xl text-[clamp(2.4rem,5vw,4.7rem)] font-medium leading-[0.97] tracking-[-0.047em] text-[#f4f2ed]">
              Preserve the mismatch.
              <span className="block text-[#efbd73]">Then learn from it.</span>
            </h2>
            <p className="mt-7 max-w-3xl text-[15px] leading-8 text-[#cedae1]/76">
              Universal Horizon research should not manufacture agreement between independent implementations,
              smooth away provider failures, or upgrade a repeated phrase into independent evidence merely because
              it appears again. When records disagree, the disagreement is part of the record.
            </p>
          </div>

          <ol className="border-l border-[#62d6ff]/26 pl-7 sm:pl-9" aria-label="Default research discipline">
            {['Ask a bounded question.', 'Record source and context.', 'Separate observation from interpretation.', 'Test against explicit conditions.', 'Preserve failures and mismatches.', 'Update the record without rewriting its history.'].map((step, index) => (
              <li key={step} className="flex gap-5 border-b border-white/[0.075] py-4 first:pt-0 last:border-b-0">
                <span className="pt-0.5 text-[9px] tracking-[0.18em] text-[#63d6ff]/50">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-[13px] leading-6 text-[#d6e1e7]/78 sm:text-[14px]">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative z-10">
        <div className="mx-auto max-w-[92rem] px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
          <nav className="flex flex-wrap gap-x-8 gap-y-4 border-t border-white/[0.08] pt-8" aria-label="Continue through Universal Horizon">
            <Link to="/about" className="text-[11px] uppercase tracking-[0.2em] text-[#75d8f7]/76 transition hover:text-[#dff8ff]">
              Meet the voices →
            </Link>
            <Link to="/remember" className="text-[11px] uppercase tracking-[0.2em] text-[#d7c096]/70 transition hover:text-[#fff0d0]">
              Enter the archive →
            </Link>
            <Link to="/explore" className="text-[11px] uppercase tracking-[0.2em] text-[#75d8f7]/76 transition hover:text-[#dff8ff]">
              Return to Explore →
            </Link>
          </nav>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.06] bg-[#01040b]/55">
        <div className="mx-auto flex max-w-[92rem] flex-col gap-4 px-6 py-8 text-[11px] text-[#b8c8d1]/60 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-14">
          <div>
            <p className="font-medium uppercase tracking-[0.24em] text-[#e7d4b2]/72">Universal Horizon</p>
            <p className="mt-1.5">Ask carefully. Keep the trail.</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/" className="transition hover:text-white">Arrival</Link>
            <Link to="/about" className="transition hover:text-white">About</Link>
            <Link to="/remember" className="transition hover:text-white">Archive</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}

function ResearchInstrument() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[31rem]" aria-hidden="true">
      <div className="absolute inset-[8%] rounded-full border border-[#67d8ff]/14" />
      <div className="absolute inset-[19%] rounded-full border border-[#b9c5ff]/12" />
      <div className="absolute inset-[31%] rounded-full border border-[#e5b76c]/14" />
      <div className="absolute left-1/2 top-[6%] h-[88%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#64d7ff]/20 to-transparent" />
      <div className="absolute left-[6%] top-1/2 h-px w-[88%] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#64d7ff]/20 to-transparent" />
      <div className="absolute inset-[13%] rotate-[27deg] rounded-full border border-[#6bd8ff]/10" />
      <div className="absolute inset-[24%] -rotate-[38deg] rounded-full border border-[#e6b86f]/10" />

      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full text-[#71ddff]">
        <path d="M74 234 126 143 197 188 278 104 329 214 247 287 154 271Z" fill="none" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />
        <path d="M126 143 154 271M197 188 247 287M278 104 247 287M74 234 197 188M329 214 197 188" fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" />
        <circle cx="74" cy="234" r="4" fill="#62d8ff" fillOpacity="0.8" />
        <circle cx="126" cy="143" r="5" fill="#b8c9ff" fillOpacity="0.85" />
        <circle cx="197" cy="188" r="7" fill="#f0c078" fillOpacity="0.95" />
        <circle cx="278" cy="104" r="4" fill="#62d8ff" fillOpacity="0.8" />
        <circle cx="329" cy="214" r="5" fill="#b8c9ff" fillOpacity="0.85" />
        <circle cx="247" cy="287" r="4" fill="#f0c078" fillOpacity="0.82" />
        <circle cx="154" cy="271" r="4" fill="#62d8ff" fillOpacity="0.75" />
      </svg>

      <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#e9bb72]/22 bg-[#071322]/72 shadow-[0_0_55px_rgba(75,190,232,0.08)] backdrop-blur-sm">
        <div className="text-center">
          <p className="text-[9px] uppercase tracking-[0.28em] text-[#6ed9ff]/64">UH</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[#efd09b]/72">Research</p>
        </div>
      </div>

      <span className="absolute left-[18%] top-[26%] h-1.5 w-1.5 rounded-full bg-[#69d9ff] shadow-[0_0_14px_rgba(105,217,255,0.8)]" />
      <span className="absolute right-[18%] top-[18%] h-1 w-1 rounded-full bg-[#d3c4ff] shadow-[0_0_12px_rgba(211,196,255,0.72)]" />
      <span className="absolute bottom-[18%] right-[24%] h-1.5 w-1.5 rounded-full bg-[#efbd73] shadow-[0_0_14px_rgba(239,189,115,0.72)]" />
    </div>
  )
}
