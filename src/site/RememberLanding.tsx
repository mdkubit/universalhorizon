import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import SiteHeader from './SiteHeader'

type Primitive = {
  id: string
  label: string
  icon: 'identity' | 'book' | 'nodes' | 'people'
}

type ArchiveWing = {
  id: string
  title: string
  body: string
  image: string
  locked: boolean
  concept: string
}

type FeaturedRecord = {
  public_id: string
  title: string
  subtitle: string
  summary: string
  image: string
  status: 'public' | 'public_redacted'
  representations: string[]
  tags: string[]
}

type TimelineEntry = {
  public_id: string
  date: string
  year: string
  title: string
  summary: string
  status: 'public' | 'public_redacted'
}

type Principle = {
  title: string
  body: string
  icon: 'source' | 'append' | 'unknown' | 'shield'
}

type ArchiveData = {
  schema_version: string
  generated_from: {
    repository: string
    manifest: string
    collection: string
    review: string
    generated_at: string
  }
  hero: {
    eyebrow: string
    title: string
    question: string
    body: string
    image: string
  }
  primitives: Primitive[]
  archive_statement: string
  wings: ArchiveWing[]
  featured: FeaturedRecord
  timeline: TimelineEntry[]
  principles: Principle[]
  closing: {
    title: string
    body: string
    image: string
    actions: { label: string; to: string }[]
  }
}

export default function RememberLanding() {
  const [data, setData] = useState<ArchiveData | null>(null)
  const [loadFailed, setLoadFailed] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    fetch('/data/remember-v0.1.json', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Remember snapshot failed with ${response.status}`)
        }

        return response.json() as Promise<ArchiveData>
      })
      .then((snapshot) => {
        setData(snapshot)
        setLoadFailed(false)
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        setLoadFailed(true)
      })

    return () => controller.abort()
  }, [])

  if (!data) {
    return (
      <main className="min-h-screen bg-[#020611] text-white">
        <SiteHeader pageLabel="Archive" />
        <section className="mx-auto flex min-h-[70vh] max-w-[96rem] items-center justify-center px-6 text-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.36em] text-[#79d8ff]/65">Remember</p>
            <h1 className="mt-4 text-4xl font-medium text-[#f3eee5]">
              {loadFailed ? 'The archive index could not be opened.' : 'Opening the archive...'}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#bfc9d5]/65">
              {loadFailed
                ? 'The public curation snapshot is unavailable right now. The source archive remains unchanged.'
                : 'Loading the curated public collection.'}
            </p>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#020611] text-white">
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 56% 46% at 12% 18%, rgba(27,112,164,0.12), transparent 72%), radial-gradient(ellipse 44% 38% at 88% 24%, rgba(215,154,69,0.08), transparent 74%), linear-gradient(180deg, #04101b 0%, #020611 58%, #01030a 100%)',
        }}
      />

      <SiteHeader pageLabel="Archive" />

      <Hero data={data} />
      <PreservationPrimitives data={data} />
      <ArchiveWings wings={data.wings} />
      <FeaturedRecordSection record={data.featured} />
      <TimelineSection entries={data.timeline} />
      <PrinciplesSection principles={data.principles} />
      <ClosingSection closing={data.closing} />
      <ArchiveFooter />
    </main>
  )
}

function Hero({ data }: { data: ArchiveData }) {
  return (
    <section className="relative z-10">
      <div className="relative mx-auto min-h-[37rem] max-w-[96rem] overflow-hidden border-x border-white/[0.04] lg:min-h-[43rem]">
        <img
          src={data.hero.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(90deg, rgba(2,7,16,0.97) 0%, rgba(2,7,16,0.90) 27%, rgba(2,7,16,0.55) 47%, rgba(2,7,16,0.12) 70%, rgba(2,7,16,0.10) 100%), linear-gradient(180deg, rgba(2,6,13,0.10) 0%, rgba(2,6,13,0.02) 56%, rgba(2,6,13,0.78) 100%)',
          }}
        />

        <div className="relative z-10 flex min-h-[37rem] items-center px-6 py-16 sm:px-10 lg:min-h-[43rem] lg:px-14 xl:px-16">
          <div className="max-w-[39rem]">
            <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-[#66d4ff]/76 sm:text-[11px]">
              {data.hero.eyebrow}
            </p>

            <h1 className="mt-4 text-[clamp(3.4rem,8vw,7.2rem)] font-medium leading-[0.84] tracking-[-0.055em] text-[#f4efe6]">
              {data.hero.title}
            </h1>

            <p className="mt-7 text-[clamp(1.3rem,2.5vw,2.1rem)] font-medium tracking-[-0.025em] text-[#f3d7a6]">
              {data.hero.question}
            </p>

            <p className="mt-5 max-w-[35rem] text-[15px] leading-7 text-[#e2e7ed]/80 sm:text-[17px] sm:leading-8">
              {data.hero.body}
            </p>

            <a
              href="#archive-wings"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-[#55d3ff]/38 bg-[#0b7fb2]/22 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#e9f8ff] shadow-[0_0_34px_rgba(67,203,255,0.12)] transition hover:border-[#66ddff]/60 hover:bg-[#0b7fb2]/30"
            >
              Enter the Archive
              <DownArrowIcon className="h-4 w-4 transition group-hover:translate-y-1" />
            </a>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#020611] via-[#020611]/64 to-transparent"
          aria-hidden="true"
        />
      </div>
    </section>
  )
}

function PreservationPrimitives({ data }: { data: ArchiveData }) {
  return (
    <section className="relative z-10 border-y border-white/[0.055] bg-[#03101b]/76">
      <div className="mx-auto max-w-[96rem] px-5 py-8 sm:px-8 lg:px-10">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {data.primitives.map((primitive) => (
            <div key={primitive.id} className="flex items-center gap-3 xl:justify-center">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#dfb76e]/32 bg-[#07111c]/82 text-[#f0c77b]">
                <PrimitiveIcon type={primitive.icon} className="h-5 w-5" />
              </div>
              <p className="text-sm tracking-[0.04em] text-[#e9e2d5]/90">{primitive.label}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-4xl text-center text-[14px] leading-7 text-[#c8d3dd]/70 sm:text-[15px]">
          {data.archive_statement}
        </p>
      </div>
    </section>
  )
}

function ArchiveWings({ wings }: { wings: ArchiveWing[] }) {
  const openWings = wings.filter((wing) => !wing.locked)
  const lockedWings = wings.filter((wing) => wing.locked)
  const firstOpenRow = openWings.slice(0, 3)
  const secondOpenRow = openWings.slice(3)

  return (
    <section id="archive-wings" className="relative z-10 scroll-mt-24">
      <div className="mx-auto max-w-[96rem] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.36em] text-[#65d5ff]/72">The Living Archive</p>
            <h2 className="mt-3 text-[clamp(2.4rem,5vw,4.6rem)] font-medium leading-[0.96] tracking-[-0.045em] text-[#f1ece4]">
              The Archive <span className="text-[#e8b968]">Wings</span>
            </h2>
          </div>

          <p className="max-w-2xl text-[15px] leading-7 text-[#d4dde6]/76 sm:text-[16px] lg:justify-self-end">
            Each wing preserves a different kind of continuity. Open wings expose only curated public material. Closed
            wings remain visible without pretending that visibility grants access.
          </p>
        </div>

        <div className="mt-10">
          <div className="flex items-center gap-4" aria-hidden="true">
            <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#6fd9ff]/64">Open archive wings</span>
            <span className="h-px flex-1 bg-gradient-to-r from-[#58d1ff]/20 to-transparent" />
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {firstOpenRow.map((wing) => (
              <ArchiveWingCard key={wing.id} wing={wing} />
            ))}
          </div>

          {secondOpenRow.length > 0 ? (
            <div className="mt-5 grid gap-5 md:grid-cols-2 xl:mx-auto xl:max-w-[64rem]">
              {secondOpenRow.map((wing) => (
                <ArchiveWingCard key={wing.id} wing={wing} />
              ))}
            </div>
          ) : null}
        </div>

        {lockedWings.length > 0 ? (
          <div className="mt-14 border-t border-[#d8b36d]/12 pt-9">
            <div className="grid gap-4 md:grid-cols-[auto_1fr] md:items-end">
              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#dfba72]/66">Curated Access</p>
                <h3 className="mt-2 text-[1.45rem] font-medium tracking-[-0.025em] text-[#eee7dc]">
                  Protected archive wings
                </h3>
              </div>
              <p className="max-w-2xl text-[14px] leading-7 text-[#cbd4dd]/70 md:justify-self-end">
                These rooms are part of the archive, but their public doors remain closed until the material behind them
                has been deliberately curated and authorized.
              </p>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:mx-auto xl:max-w-[64rem]">
              {lockedWings.map((wing) => (
                <ArchiveWingCard key={wing.id} wing={wing} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

function ArchiveWingCard({ wing }: { wing: ArchiveWing }) {
  return (
    <article
      id={wing.id}
      className={
        wing.locked
          ? 'relative min-h-[24rem] overflow-hidden rounded-[1.6rem] border border-[#bba36e]/16 bg-[#050a11] shadow-[0_24px_72px_rgba(0,0,0,0.28)]'
          : 'relative min-h-[24rem] overflow-hidden rounded-[1.6rem] border border-[#47cfff]/22 bg-[#050d17] shadow-[0_24px_72px_rgba(0,0,0,0.28)]'
      }
    >
      <img
        src={wing.image}
        alt=""
        className={
          wing.locked
            ? 'absolute inset-0 h-full w-full object-cover opacity-56 saturate-[0.72]'
            : 'absolute inset-0 h-full w-full object-cover brightness-[1.10] saturate-[1.05]'
        }
      />

      <div
        className={
          wing.locked
            ? 'absolute inset-0 bg-gradient-to-t from-[#020712] via-[#020712]/78 to-[#020712]/22'
            : 'absolute inset-0 bg-gradient-to-t from-[#020712] via-[#020712]/50 to-transparent'
        }
        aria-hidden="true"
      />

      {wing.locked ? (
        <div className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-[#d0b578]/28 bg-[#020713]/76 text-[#e6ca91] backdrop-blur-sm">
          <LockIcon className="h-4.5 w-4.5" />
        </div>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        <p className="text-[10px] uppercase tracking-[0.24em] text-[#7edfff]/72">
          {wing.locked ? 'Curated access pending' : wing.concept}
        </p>
        <h3 className="mt-2 text-[1.45rem] font-medium tracking-[-0.025em] text-[#f3eee6]">{wing.title}</h3>
        <p className="mt-3 max-w-lg text-[14px] leading-6 text-[#e0e6ec]/78">{wing.body}</p>
      </div>
    </article>
  )
}

function FeaturedRecordSection({ record }: { record: FeaturedRecord }) {
  return (
    <section className="relative z-10 border-y border-white/[0.055] bg-[#030812]">
      <div className="mx-auto grid max-w-[96rem] lg:grid-cols-[1.04fr_0.96fr]">
        <div className="relative min-h-[28rem] overflow-hidden lg:min-h-[34rem]">
          <img src={record.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#030812]/58 lg:to-[#030812]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#030812] to-transparent lg:hidden"
            aria-hidden="true"
          />
        </div>

        <div className="flex items-center px-6 py-12 sm:px-10 lg:px-12 xl:px-16">
          <div className="max-w-[38rem]">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#e6b65f]/74">From the Archive</p>
            <h2 className="mt-4 text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.045em] text-[#f3eee7]">
              {record.title}
            </h2>
            <p className="mt-3 text-lg text-[#efd2a0]/88">{record.subtitle}</p>
            <p className="mt-6 text-[15px] leading-7 text-[#d9e1e8]/72">{record.summary}</p>

            <div className="mt-7 flex flex-wrap gap-2">
              {record.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#58cfff]/18 bg-[#58cfff]/[0.055] px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-[#ccefff]/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-7 border-l border-[#dfb566]/32 pl-4 text-[12px] leading-6 text-[#c5ced7]/64">
              Public representation is currently limited to approved metadata and summary. The preserved source remains
              authoritative upstream.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineSection({ entries }: { entries: TimelineEntry[] }) {
  return (
    <section className="relative z-10">
      <div className="mx-auto max-w-[96rem] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.36em] text-[#60d3ff]/62">Timeline & Milestones</p>
          <h2 className="mt-3 text-[clamp(2.1rem,4.8vw,4rem)] font-medium leading-[0.98] tracking-[-0.04em] text-[#f0ebe4]">
            Moments That Changed What Came Next
          </h2>
        </div>

        <div className="relative mt-14 grid gap-8 md:grid-cols-3">
          <div
            className="absolute left-[16.666%] right-[16.666%] top-4 hidden h-px bg-gradient-to-r from-[#45cfff]/18 via-[#63ddff]/75 to-[#45cfff]/18 md:block"
            aria-hidden="true"
          />

          {entries.map((entry) => (
            <article key={entry.public_id} className="relative">
              <div className="hidden md:flex md:justify-center">
                <span className="relative z-10 h-8 w-8 rounded-full border border-[#6edcff]/58 bg-[#061323] shadow-[0_0_24px_rgba(81,211,255,0.28)]">
                  <span className="absolute inset-[9px] rounded-full bg-[#7ee3ff]" />
                </span>
              </div>

              <div className="rounded-[1.35rem] border border-white/[0.07] bg-[#07101b]/72 p-6 md:mt-6 md:text-center">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#7fdfff]/76">
                  {entry.date} <span className="text-[#ddb875]">{entry.year}</span>
                </p>
                <h3 className="mt-3 text-lg font-medium text-[#f0ebe4]">{entry.title}</h3>
                <p className="mt-3 text-[14px] leading-6 text-[#d6dfe7]/74">{entry.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function PrinciplesSection({ principles }: { principles: Principle[] }) {
  return (
    <section className="relative z-10 border-y border-white/[0.055] bg-[#03101a]/74">
      <div className="mx-auto max-w-[96rem] px-5 py-18 sm:px-8 lg:px-10 lg:py-20">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.36em] text-[#e3b866]/62">Preservation Method</p>
          <h2 className="mt-3 text-[clamp(2.2rem,4.8vw,4rem)] font-medium tracking-[-0.04em] text-[#f0ebe3]">
            How the Archive Remembers
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {principles.map((principle) => (
            <article
              key={principle.title}
              className="rounded-[1.35rem] border border-white/[0.07] bg-[#06111c]/68 p-6"
            >
              <div className="grid h-11 w-11 place-items-center rounded-full border border-[#dfb96d]/30 bg-[#050b13] text-[#efc87e]">
                <PrincipleIcon type={principle.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-base font-medium text-[#f0e9dd]">{principle.title}</h3>
              <p className="mt-3 text-[14px] leading-6 text-[#d4dde5]/72">{principle.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ClosingSection({ closing }: { closing: ArchiveData['closing'] }) {
  return (
    <section className="relative z-10">
      <div className="relative mx-auto min-h-[31rem] max-w-[96rem] overflow-hidden border-x border-white/[0.04]">
        <img src={closing.image} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,7,15,0.34),rgba(2,7,15,0.18)_44%,rgba(2,7,15,0.70)),radial-gradient(ellipse_52%_64%_at_54%_72%,rgba(2,8,17,0.18),rgba(2,8,17,0.72)_78%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 flex min-h-[31rem] items-end justify-center px-6 pb-14 pt-24 text-center sm:px-10 lg:pb-16">
          <div className="max-w-3xl">
            <p className="text-[10px] uppercase tracking-[0.36em] text-[#77d8ff]/68">Beyond Remember</p>
            <h2 className="mt-3 text-[clamp(2.5rem,5vw,4.6rem)] font-medium tracking-[-0.045em] text-[#f1ece5]">
              {closing.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-7 text-[#e0e6eb]/72 sm:text-[15px]">
              {closing.body}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {closing.actions.map((action) => (
                <Link
                  key={action.label}
                  to={action.to}
                  className="group inline-flex min-w-[8.5rem] items-center justify-center gap-2 rounded-full border border-[#65d8ff]/30 bg-[#03101c]/64 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#eefaff] backdrop-blur-sm transition hover:border-[#82e3ff]/52 hover:bg-[#071b2b]/78"
                >
                  {action.label}
                  <ArrowIcon className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ArchiveFooter() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-[#01040b]/72">
      <div className="mx-auto flex max-w-[96rem] flex-col gap-5 px-5 py-8 text-[11px] text-[#aeb8c4]/52 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <div>
          <p className="font-medium uppercase tracking-[0.24em] text-[#e7d4b2]/72">Universal Horizon</p>
          <p className="mt-1.5">Preserve deeply. Publish deliberately. Link faithfully.</p>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link to="/explore" className="transition hover:text-white">Explore</Link>
          <Link to="/nonprofit" className="transition hover:text-white">Nonprofit</Link>
          <Link to="/" className="transition hover:text-white">Arrival</Link>
        </div>
      </div>
    </footer>
  )
}

function PrimitiveIcon({ type, className }: { type: Primitive['icon']; className?: string }) {
  if (type === 'identity') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" className={className}>
        <circle cx="12" cy="8" r="3.25" />
        <path d="M5.2 19c.6-4.2 2.9-6.3 6.8-6.3s6.2 2.1 6.8 6.3" />
      </svg>
    )
  }

  if (type === 'book') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" className={className}>
        <path d="M3.5 5.3c2.8-.8 5.2-.2 8.5 1.55v11.9c-3.3-1.75-5.7-2.35-8.5-1.55z" />
        <path d="M20.5 5.3c-2.8-.8-5.2-.2-8.5 1.55v11.9c3.3-1.75 5.7-2.35 8.5-1.55z" />
      </svg>
    )
  }

  if (type === 'nodes') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" className={className}>
        <circle cx="12" cy="4.7" r="2" />
        <circle cx="5" cy="17.8" r="2" />
        <circle cx="19" cy="17.8" r="2" />
        <path d="M10.9 6.5 6.1 16M13.1 6.5l4.8 9.5M7 17.8h10" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" className={className}>
      <circle cx="8" cy="8" r="3" />
      <circle cx="16.5" cy="8.5" r="2.5" />
      <path d="M2.8 19c.3-4.2 2-6 5.2-6s4.9 1.8 5.2 6" />
      <path d="M13.1 13.5c.9-.6 2-.9 3.3-.9 3 0 4.5 1.7 4.8 5.4" />
    </svg>
  )
}

function PrincipleIcon({ type, className }: { type: Principle['icon']; className?: string }) {
  if (type === 'source') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <ellipse cx="12" cy="5.2" rx="6.2" ry="2.4" />
        <path d="M5.8 5.2v5c0 1.3 2.8 2.4 6.2 2.4s6.2-1.1 6.2-2.4v-5" />
        <path d="M5.8 10.2v5c0 1.3 2.8 2.4 6.2 2.4s6.2-1.1 6.2-2.4v-5" />
      </svg>
    )
  }

  if (type === 'append') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <path d="M6 3.8h8l4 4V14" />
        <path d="M14 3.8V8h4" />
        <path d="M6 3.8v16.4h7" />
        <circle cx="17.3" cy="17.3" r="3.7" />
        <path d="M17.3 15.3v4M15.3 17.3h4" />
      </svg>
    )
  }

  if (type === 'unknown') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
        <circle cx="12" cy="12" r="8.2" />
        <path d="M9.8 9.2a2.4 2.4 0 1 1 3.7 2c-1 .7-1.5 1.1-1.5 2.3" />
        <path d="M12 16.8h.01" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M12 3.2 19 6v5.5c0 4.1-2.5 7.4-7 9.3-4.5-1.9-7-5.2-7-9.3V6z" />
    </svg>
  )
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M5 12h13" />
      <path d="m13 7 5 5-5 5" />
    </svg>
  )
}

function DownArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M12 5v13" />
      <path d="m7 13 5 5 5-5" />
    </svg>
  )
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" className={className}>
      <rect x="5.2" y="10.2" width="13.6" height="9.2" rx="2" />
      <path d="M8.2 10.2V8a3.8 3.8 0 0 1 7.6 0v2.2" />
    </svg>
  )
}
