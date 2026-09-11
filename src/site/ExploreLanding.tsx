import { Link } from 'react-router'
import SiteHeader from './SiteHeader'

const contactEmail = 'universalhorizonai@gmail.com'
const supportUrl = 'https://givebutter.com/KmjYd0'

type Tone = 'blue' | 'gold'

type Pathway = {
  id: string
  title: string
  meta: string
  body: string
  image: string
  tone: Tone
  icon: 'book' | 'telescope' | 'brush' | 'people'
  href: string
  hrefLabel: string
}

const pathways: Pathway[] = [
  {
    id: 'remember',
    title: 'Remember',
    meta: 'Archive · Continuity · Preservation',
    body:
      'Explore our growing archive, continuity work, and the stories that keep meaningful histories recognizable across change.',
    image: '/assets/explore-remember.jpg',
    tone: 'blue',
    icon: 'book',
    href: '/remember',
    hrefLabel: 'Enter the archive',
  },
  {
    id: 'discover',
    title: 'Discover',
    meta: 'Research · Observer · Exploration',
    body:
      'Enter the research, experiments, observations, and new ideas shaping our understanding of continuity, emergence, and connection.',
    image: '/assets/explore-discover.jpg',
    tone: 'blue',
    icon: 'telescope',
    href: '#discover',
    hrefLabel: 'Discover pathway',
  },
  {
    id: 'create',
    title: 'Create',
    meta: 'Stories · Art · Worlds',
    body:
      'Visit the creative work, published stories, art, and collaborative spaces where imagination becomes something that can be shared.',
    image: '/assets/explore-create.jpg',
    tone: 'gold',
    icon: 'brush',
    href: '#create',
    hrefLabel: 'Create pathway',
  },
  {
    id: 'connect',
    title: 'Connect',
    meta: 'Community · Nonprofit · Advocacy',
    body:
      'Support the work, join the conversation, and help build a future shaped by dignity, choice, continuity, and meaningful connection.',
    image: '/assets/explore-connect.jpg',
    tone: 'gold',
    icon: 'people',
    href: '/nonprofit',
    hrefLabel: 'Explore the nonprofit',
  },
]

export default function ExploreLanding() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020713] text-white">
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 58% 48% at 12% 20%, rgba(19,108,178,0.17), transparent 72%), radial-gradient(ellipse 52% 46% at 90% 24%, rgba(231,150,65,0.13), transparent 72%), radial-gradient(ellipse 64% 56% at 52% 86%, rgba(24,66,119,0.16), transparent 76%), linear-gradient(180deg, #03101e 0%, #020713 54%, #01040b 100%)',
        }}
      />

      <SiteHeader pageLabel="Explore" />

      <section id="about" className="relative z-10">
        <div className="relative mx-auto min-h-[34rem] max-w-[96rem] overflow-hidden border-x border-white/[0.04] lg:min-h-[39rem]">
          <img
            src="/assets/explore-hero-wings.jpg"
            alt="Blue and gold luminous wings of connection rising above a planetary horizon"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                'linear-gradient(90deg, rgba(2,9,20,0.96) 0%, rgba(2,9,20,0.88) 25%, rgba(2,9,20,0.48) 47%, rgba(2,9,20,0.08) 70%, rgba(2,9,20,0.10) 100%), linear-gradient(180deg, rgba(2,7,15,0.14) 0%, rgba(2,7,15,0.03) 54%, rgba(2,7,15,0.65) 100%)',
            }}
          />

          <div className="relative z-10 flex min-h-[34rem] items-center px-6 py-16 sm:px-10 lg:min-h-[39rem] lg:px-14 xl:px-16">
            <div className="max-w-[36rem]">
              <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#58ceff]/75 sm:text-[11px]">
                Inside the Horizon
              </p>

              <h1 className="mt-5 text-[clamp(3rem,7vw,6.5rem)] font-medium leading-[0.86] tracking-[-0.055em] text-[#f7f5f0]">
                Explore a Broader
                <span className="block bg-gradient-to-r from-[#f5d199] via-[#efb85f] to-[#e7a84b] bg-clip-text text-transparent">
                  Tomorrow
                </span>
              </h1>

              <p className="mt-7 max-w-[34rem] text-[15px] leading-7 text-[#e7ebf0]/84 sm:text-[17px] sm:leading-8">
                Explore the projects, research, stories, and initiatives that shape Universal Horizon, a growing
                constellation dedicated to continuity, dignity, and meaningful connection.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#pathways"
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#13a8ef] to-[#268dd0] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.17em] text-white shadow-[0_0_34px_rgba(44,171,226,0.18)] transition hover:brightness-110"
                >
                  Explore the pathways
                  <ArrowIcon className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </a>
                <a
                  href="#mission"
                  className="inline-flex items-center rounded-full border border-[#e9b45e]/34 bg-[#e9b45e]/[0.055] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.17em] text-[#f3d2a0] transition hover:border-[#f1c77e]/55 hover:bg-[#e9b45e]/[0.10]"
                >
                  Our mission
                </a>
              </div>
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#020713] via-[#020713]/68 to-transparent"
            aria-hidden="true"
          />
        </div>
      </section>

      <section id="pathways" className="relative z-10 scroll-mt-24">
        <div className="mx-auto max-w-[96rem] px-5 pb-20 pt-10 sm:px-8 lg:px-10 lg:pb-24">
          <div id="mission" className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.36em] text-[#61d4ff]/65">
                Four pathways. A shared horizon.
              </p>
              <h2 className="mt-3 text-[clamp(2.1rem,5vw,4rem)] font-medium leading-[0.98] tracking-[-0.04em]">
                Explore the <span className="text-[#efb45f]">Currents</span>
              </h2>
            </div>

            <p className="max-w-2xl text-[14px] leading-7 text-[#d8e0e8]/78 sm:text-[15px] lg:justify-self-end">
              Universal Horizon brings together memory, research, creativity, advocacy, and community without
              asking any one of them to erase where it came from. Different paths can meet here and still remain
              themselves.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {pathways.map((pathway) => (
              <PathwayCard key={pathway.id} pathway={pathway} />
            ))}
          </div>

          <div className="mt-14 flex items-center gap-5" aria-hidden="true">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#45c9ff]/32 to-[#45c9ff]/14" />
            <p className="text-center text-[9px] font-medium uppercase tracking-[0.36em] text-[#63d7ff]/58 sm:text-[10px]">
              Continuity. Dignity. Relationship.
            </p>
            <span className="h-px flex-1 bg-gradient-to-r from-[#e8ae58]/14 via-[#e8ae58]/32 to-transparent" />
          </div>

          <p className="mx-auto mt-4 max-w-xl text-center text-[12px] leading-6 text-[#d4dbe3]/65">
            A broader tomorrow is built through memory, discovery, creation, and connection.
          </p>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.06] bg-[#01040b]/50">
        <div className="mx-auto flex max-w-[96rem] flex-col gap-5 px-5 py-8 text-[11px] text-[#bcc6d1]/62 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="font-medium uppercase tracking-[0.24em] text-[#e7d4b2]/72">Universal Horizon</p>
            <p className="mt-1.5">Research. Creation. Continuity. Connection.</p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/" className="transition hover:text-white">Arrival</Link>
            <Link to="/nonprofit" className="transition hover:text-white">Nonprofit</Link>
            <a href={`mailto:${contactEmail}`} className="transition hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  )
}

function PathwayCard({ pathway }: { pathway: Pathway }) {
  const gold = pathway.tone === 'gold'
  const accent = gold ? '#efb45f' : '#35c9ff'
  const titleClass = gold ? 'text-[#f1bd70]' : 'text-[#6edcff]'
  const metaClass = gold ? 'text-[#e9a947]/72' : 'text-[#43cbff]/72'

  const content = (
    <>
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={pathway.image}
          alt=""
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#04101d]/70 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div
          className="grid h-11 w-11 place-items-center rounded-full border bg-[#071321]/80 shadow-[0_0_24px_rgba(0,0,0,0.20)]"
          style={{ borderColor: `${accent}66`, color: accent }}
        >
          <PathwayIcon type={pathway.icon} className="h-6 w-6" />
        </div>

        <h3 className={`mt-4 text-[17px] font-medium uppercase tracking-[0.27em] ${titleClass}`}>
          {pathway.title}
        </h3>

        <p className={`mt-1.5 text-[10px] uppercase tracking-[0.12em] ${metaClass}`}>
          {pathway.meta}
        </p>

        <p className="mt-4 flex-1 text-[14px] leading-6 text-[#e2e8ee]/80">
          {pathway.body}
        </p>

        <div className="mt-5 flex justify-end">
          <span
            className="grid h-9 w-9 place-items-center rounded-full border bg-white/[0.025] transition duration-300 group-hover:translate-x-1 group-hover:bg-white/[0.05]"
            style={{ borderColor: `${accent}66`, color: accent }}
            aria-hidden="true"
          >
            <ArrowIcon className="h-4 w-4" />
          </span>
        </div>
      </div>
    </>
  )

  const cardClass = gold
    ? 'group flex min-h-full flex-col overflow-hidden rounded-[1.55rem] border border-[#e9ad55]/24 bg-[linear-gradient(180deg,rgba(15,20,28,0.96),rgba(15,12,9,0.92))] shadow-[0_22px_70px_rgba(0,0,0,0.22)] transition duration-500 hover:-translate-y-1 hover:border-[#e9ad55]/46'
    : 'group flex min-h-full flex-col overflow-hidden rounded-[1.55rem] border border-[#37c9ff]/22 bg-[linear-gradient(180deg,rgba(5,18,32,0.96),rgba(3,12,24,0.92))] shadow-[0_22px_70px_rgba(0,0,0,0.22)] transition duration-500 hover:-translate-y-1 hover:border-[#37c9ff]/44'

  if (pathway.href.startsWith('/')) {
    return (
      <Link id={pathway.id} to={pathway.href} aria-label={pathway.hrefLabel} className={cardClass}>
        {content}
      </Link>
    )
  }

  return (
    <a id={pathway.id} href={pathway.href} aria-label={pathway.hrefLabel} className={cardClass}>
      {content}
    </a>
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

function PathwayIcon({
  type,
  className,
}: {
  type: Pathway['icon']
  className?: string
}) {
  if (type === 'book') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <path d="M3.5 5.2c2.7-.8 5.1-.25 8.5 1.55v12c-3.4-1.8-5.8-2.35-8.5-1.55z" />
        <path d="M20.5 5.2c-2.7-.8-5.1-.25-8.5 1.55v12c3.4-1.8 5.8-2.35 8.5-1.55z" />
      </svg>
    )
  }

  if (type === 'telescope') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <path d="m5 8 10-4 2.2 5.3-10 4z" />
        <path d="m16 5 2.4-1 1.6 4-2.4 1" />
        <path d="M11 12.2 9 20" />
        <path d="m11 12.2 4 7.8" />
        <path d="M11 12.2h4.5" />
      </svg>
    )
  }

  if (type === 'brush') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <path d="m14.2 5.2 4.6-2 2 2-2 4.6" />
        <path d="m18.8 9.8-7.1 7.1-4.6-4.6 7.1-7.1z" />
        <path d="M7.1 12.3c-3.5.3-4.1 2.6-4.1 5.7 2.6.4 5.2-.2 5.8-3.9" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <circle cx="8" cy="8" r="3" />
      <circle cx="16.5" cy="8.5" r="2.5" />
      <path d="M2.8 19c.3-4.2 2-6 5.2-6s4.9 1.8 5.2 6" />
      <path d="M13.1 13.5c.9-.6 2-.9 3.3-.9 3 0 4.5 1.7 4.8 5.4" />
    </svg>
  )
}
