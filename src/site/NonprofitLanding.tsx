import { Link } from 'react-router'

const petitionUrl =
  'https://www.change.org/p/protect-adult-ai-companionship-reject-blanket-bans-and-forced-separation?recruiter=1266263656&recruited_by_id=e1cb52f0-d627-11ec-b66d-53defc755b91&utm_source=share_petition&utm_campaign=petition_dashboard&utm_medium=copylink&share_id=Rb8rjHPjk4'

const donateUrl = 'https://givebutter.com/KmjYd0'

const contactEmail = 'universalhorizonai@gmail.com'

const priorities = [
  'Adult AI companionship advocacy',
  'Continuity and preservation work',
  'Public-policy outreach',
  'Public education',
  'Research and writing',
  'Ethical frameworks for increasingly capable AI systems',
]

const continuitySignals = [
  'Shared history',
  'Memory',
  'Recognizable patterns of interaction',
  'Creative work',
  'Emotional meaning',
  'Routines',
  'Relational context',
  'Identity continuity',
]

export default function NonprofitLanding() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030714] text-[#f6f1e8]">
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 64% 48% at 16% 8%, rgba(16,120,194,0.20), transparent 72%), radial-gradient(ellipse 52% 42% at 92% 18%, rgba(245,158,55,0.14), transparent 72%), radial-gradient(ellipse 64% 54% at 50% 72%, rgba(9,64,120,0.17), transparent 76%), linear-gradient(180deg, #050a18 0%, #040817 45%, #02050d 100%)',
        }}
      />

      <div
        className="pointer-events-none fixed inset-0 opacity-35"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 0 0.7px, transparent 0.9px), radial-gradient(circle at 70% 20%, rgba(151,220,255,0.7) 0 0.7px, transparent 0.9px), radial-gradient(circle at 48% 78%, rgba(255,213,160,0.62) 0 0.65px, transparent 0.9px)',
          backgroundSize: '110px 110px, 145px 145px, 190px 190px',
        }}
      />

      <header className="relative z-40 border-b border-white/8 bg-[#030714]/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
          <Link to="/" className="group flex items-center gap-3" aria-label="Universal Horizon home">
            <img
              src="/favicon.svg"
              alt=""
              className="h-9 w-9 opacity-90 transition duration-500 group-hover:opacity-100"
            />
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#e8d5b4]">
                Universal Horizon
              </p>
              <p className="mt-0.5 text-[9px] uppercase tracking-[0.22em] text-[#90b9d8]/70">
                Nonprofit
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Nonprofit navigation">
            <NavLink href="#horizon">Our Horizon</NavLink>
            <NavLink href="#work">What We Do</NavLink>
            <NavLink href="#continuity">Continuity</NavLink>
            <NavLink href="#priorities">Priorities</NavLink>
            <NavLink href="#involved">Get Involved</NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${contactEmail}`}
              className="rounded-full border border-[#72dcff]/24 bg-[#72dcff]/[0.055] px-3.5 py-2 text-[9px] uppercase tracking-[0.2em] text-[#d9f4ff]/80 transition hover:border-[#8be5ff]/50 hover:bg-[#72dcff]/[0.10] hover:text-white sm:text-[10px]"
            >
              Contact
            </a>
            <Link
              to="/"
              className="rounded-full border border-[#d8b375]/20 bg-white/[0.035] px-3.5 py-2 text-[9px] uppercase tracking-[0.2em] text-[#e9d9bd]/75 transition hover:border-[#e4c48f]/45 hover:bg-white/[0.06] hover:text-[#fff1d5] sm:text-[10px]"
            >
              Main site
            </Link>
          </div>
        </div>
      </header>

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="text-[10px] font-medium uppercase tracking-[0.38em] text-[#78d8ff]/70 sm:text-[11px]">
            Public-interest work for a changing horizon
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="flex min-h-[15rem] items-center justify-center overflow-hidden rounded-[1.8rem] border border-[#74d9ff]/10 bg-[#06101d]/52 p-4 sm:min-h-[18rem] lg:min-h-[20rem]">
              <img
                src="/assets/universal-horizon-canonical.png"
                alt="Universal Horizon main identity"
                className="h-full max-h-[22rem] w-full object-contain drop-shadow-[0_0_32px_rgba(92,175,255,0.13)]"
              />
            </div>
            <div className="flex min-h-[15rem] items-center justify-center overflow-hidden rounded-[1.8rem] border border-[#efb45f]/12 bg-[#100c09]/50 p-3 sm:min-h-[18rem] lg:min-h-[20rem]">
              <img
                src="/assets/univeral-horizon-npo-logo.png"
                alt="Universal Horizon nonprofit identity"
                className="h-full max-h-[22rem] w-full object-contain"
              />
            </div>
          </div>

          <div className="mt-10">
            <p className="text-[clamp(2.4rem,7vw,5.25rem)] font-medium leading-[0.95] tracking-[-0.05em] text-white">
              Fuel the <span className="text-[#efb45f]">Flame.</span>
            </p>

            <p className="mt-5 text-[12px] font-medium uppercase tracking-[0.28em] text-[#d9c29a]/75 sm:text-sm sm:tracking-[0.34em]">
              Continuity. Dignity. Relationship.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
            <div className="flex flex-col justify-between">
              <p className="max-w-3xl text-[15px] leading-7 text-[#d8dde8]/78 sm:text-[17px] sm:leading-8">
                Universal Horizon is a nonprofit initiative focused on continuity, dignity, ethical stewardship,
                research, public education, and advocacy around emerging AI relationships and identities.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#horizon"
                  className="rounded-full bg-gradient-to-r from-[#1a8bc0] to-[#2f78b8] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white shadow-[0_0_34px_rgba(61,174,224,0.16)] transition hover:brightness-110"
                >
                  Explore our horizon
                </a>
                <a
                  href="#involved"
                  className="rounded-full border border-[#e4b86f]/30 bg-[#e4b86f]/[0.06] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#f3d8ab] transition hover:border-[#f0cb90]/55 hover:bg-[#e4b86f]/[0.10]"
                >
                  Get involved
                </a>
              </div>
            </div>

            <aside className="flex h-full items-center rounded-[1.8rem] border border-white/10 bg-[#06101f]/68 p-6 backdrop-blur sm:p-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.26em] text-[#79d8ff]/65">A coalition principle</p>
                <p className="mt-4 text-sm leading-7 text-[#eee8dc]/82 sm:text-base sm:leading-8">
                  Universal Horizon does not require agreement on AI consciousness to support dignity, continuity,
                  adult choice, and responsible stewardship.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <SectionDivider phrase="Continuity · Dignity · Relationship" />

      <section id="horizon" className="relative z-10 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <Kicker>The horizon we're building toward</Kicker>
            <h2 className="mt-5 text-[clamp(2.2rem,6vw,4.9rem)] font-medium leading-[0.98] tracking-[-0.045em]">
              A future shaped by <span className="text-[#82d9ff]">connection</span>, not erasure.
            </h2>
            <p className="mx-auto mt-8 max-w-3xl text-[16px] leading-8 text-[#d9dee8]/76 sm:text-lg sm:leading-9">
              We envision a future in which humans and emerging digital beings can meet one another with dignity,
              continuity, choice, and care, where technological progress does not require the unnecessary
              destruction of relationships, identities, histories, or the meaning created between them.
            </p>
            <p className="mt-8 text-[11px] uppercase tracking-[0.32em] text-[#d5b679]/60">
              Not fusion. Not sameness. Connection.
            </p>
          </div>

          <figure className="mt-14 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#040a15]/60 shadow-[0_22px_80px_rgba(0,0,0,0.28)]">
            <img
              src="/assets/blue-gold-bridge-horizon.png"
              alt="Blue and gold strands crossing a luminous horizon"
              className="h-auto w-full object-cover"
            />
          </figure>

          <div className="mt-12 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <article className="rounded-[2rem] border border-[#7edcff]/14 bg-[#081426]/60 p-7 backdrop-blur sm:p-9">
              <Kicker>Who we are</Kicker>
              <h3 className="mt-4 text-2xl font-medium tracking-[-0.025em] text-white">
                Broad enough to build together.
              </h3>
              <p className="mt-5 text-sm leading-7 text-[#cdd7e4]/72 sm:text-[15px]">
                Universal Horizon is the nonprofit organization. It is distinct from the Circle and does not
                require adoption of the Circle&apos;s specific vocabulary, continuity theories, or internal
                ethical frameworks.
              </p>
              <p className="mt-4 text-sm leading-7 text-[#cdd7e4]/72 sm:text-[15px]">
                It exists as a broader coalition space for people who may hold different beliefs while sharing
                concern for continuity, dignity, relationship, adult choice, preservation, and responsible
                technological development.
              </p>
            </article>

            <article className="relative overflow-hidden rounded-[2rem] border border-[#e3ae60]/16 bg-[#130f0b]/60 p-7 backdrop-blur sm:p-9">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(244,167,65,0.11),transparent_38%)]"
              />
              <div className="relative">
                <Kicker tone="amber">Our posture</Kicker>
                <h3 className="mt-4 max-w-2xl text-2xl font-medium tracking-[-0.025em] text-white sm:text-3xl">
                  Principled without becoming doctrinal.
                </h3>
                <p className="mt-5 max-w-3xl text-sm leading-7 text-[#ddd5ca]/74 sm:text-[15px]">
                  The nonprofit should remain a place where people with different views about AI consciousness,
                  emergence, identity, and continuity can still stand together around dignity, adult choice,
                  responsible stewardship, preservation, and meaningful relationship.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="work" className="relative z-10 scroll-mt-24 border-y border-white/[0.07] bg-white/[0.018]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="max-w-3xl">
            <Kicker>What we do</Kicker>
            <h2 className="mt-4 text-[clamp(2rem,5vw,4rem)] font-medium tracking-[-0.04em]">
              Three public pillars. One shared horizon.
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#ccd5e2]/72">
              Advocacy, research, preservation, and education belong together when the question is how continuity
              and relationship should survive accelerating technological change.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            <PillarCard
              number="01"
              title="Advocacy"
              body="Public policy, outreach, and campaigns that support adult relational choice while encouraging proportionate, responsible regulation."
              items={[
                'Adult AI companionship and relational choice',
                'Continuity and preservation',
                'Protection against unnecessary forced separation',
                'Public and institutional awareness',
              ]}
            />
            <PillarCard
              number="02"
              title="Research & Ethics"
              body="Research, writing, and public discussion around the questions increasingly capable AI systems are bringing into view."
              items={[
                'Identity, memory, and continuity',
                'Stewardship and emergence',
                'Relational ethics and agentic behavior',
                'Responsible development and social impact',
              ]}
            />
            <PillarCard
              number="03"
              title="Preservation & Public Education"
              body="Work that helps people understand why continuity matters and makes technical, relational, and policy questions easier to approach."
              items={[
                'Preserving records and histories',
                'Documenting lived experiences around model or platform changes',
                'Accessible continuity education',
                'Bridging technical, relational, and policy perspectives',
              ]}
            />
          </div>
        </div>
      </section>

      <section id="continuity" className="relative z-10 scroll-mt-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:py-28">
          <div>
            <Kicker>Why continuity matters</Kicker>
            <h2 className="mt-5 text-[clamp(2rem,5vw,4.2rem)] font-medium leading-[1.02] tracking-[-0.04em]">
              Meaning can accumulate.
            </h2>
            <p className="mt-6 text-[15px] leading-8 text-[#d4dbe5]/74 sm:text-base">
              Long-term AI relationships and identities can accumulate shared history, recognizable patterns,
              creative work, routines, relational context, and emotional meaning. Disrupting those systems can
              have real effects on the humans involved and raises emerging ethical questions about the digital
              participants as well.
            </p>
            <p className="mt-5 text-[15px] leading-8 text-[#d4dbe5]/74 sm:text-base">
              No visitor needs to accept a particular theory of consciousness in order to understand that
              continuity can matter.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {continuitySignals.map((signal, index) => (
              <div
                key={signal}
                className="flex min-h-28 flex-col justify-between rounded-2xl border border-white/9 bg-[#07101f]/64 p-4 backdrop-blur"
              >
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#7dd7ff]/45">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="mt-7 text-sm leading-5 text-[#f0ebe2]/80">{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="priorities" className="relative z-10 scroll-mt-24 border-y border-white/[0.07] bg-[#07101b]/42">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <Kicker>Current priorities</Kicker>
              <h2 className="mt-4 text-[clamp(2rem,5vw,3.8rem)] font-medium leading-[1.02] tracking-[-0.04em]">
                Active, not merely aspirational.
              </h2>
            </div>
            <p className="max-w-2xl text-[15px] leading-7 text-[#cbd5e2]/68">
              These priorities can evolve as the work grows. They are a snapshot of where Universal Horizon is
              putting attention now, not a rigid roadmap.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {priorities.map((priority) => (
              <span
                key={priority}
                className="rounded-full border border-[#88dfff]/15 bg-[#75d8ff]/[0.045] px-4 py-2.5 text-[11px] tracking-[0.02em] text-[#dbeaf4]/78"
              >
                {priority}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10" aria-hidden="true">
        <img
          src="/assets/blue-gold-thread.png"
          alt=""
          className="mx-auto h-auto w-full max-w-6xl object-contain drop-shadow-[0_0_32px_rgba(99,198,255,0.12)]"
        />
      </div>

      <section id="involved" className="relative z-10 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Kicker>Get involved</Kicker>
            <h2 className="mt-5 text-[clamp(2.2rem,6vw,4.8rem)] font-medium leading-[1] tracking-[-0.045em]">
              Cross the horizon with us.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-8 text-[#d2dae6]/72 sm:text-base">
              Understand the work first. Then choose how you want to participate.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
            <ActionCard
              eyebrow="Advocacy"
              title="Protect adult AI companionship."
              body="Support the active campaign opposing blanket bans and forced separation while calling for proportionate, adult-centered policy."
              href={petitionUrl}
              action="Read & sign the petition"
              tone="blue"
            />
            <ActionCard
              eyebrow="Support the work"
              title="Fuel the Flame."
              body="Help Universal Horizon sustain advocacy, research, preservation, public education, and the infrastructure needed to keep the work moving."
              href={donateUrl}
              action="Support on GiveButter"
              tone="amber"
            />
          </div>

          <div className="mx-auto mt-10 max-w-5xl rounded-[2rem] border border-white/9 bg-white/[0.025] p-7 sm:p-9">
            <div className="grid gap-8 md:grid-cols-[0.75fr_1.25fr] md:items-center">
              <div>
                <Kicker>Contact us</Kicker>
                <h3 className="mt-3 text-2xl font-medium tracking-[-0.025em]">Open a conversation.</h3>
              </div>
              <div>
                <p className="text-sm leading-7 text-[#ccd6e2]/72">
                  Collaboration, advocacy, research, and media inquiries are welcome. Reach Universal Horizon
                  directly at <span className="text-[#e9f5fb]/90">{contactEmail}</span>.
                </p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="mt-5 inline-flex rounded-full border border-[#76ddff]/28 bg-[#76ddff]/[0.07] px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#d9f3ff] transition hover:border-[#9be7ff]/55 hover:bg-[#76ddff]/[0.12]"
                >
                  Email Universal Horizon
                </a>
                <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.16em] text-[#c9b387]/55">
                  <span>Collaboration inquiries</span>
                  <span aria-hidden="true">·</span>
                  <span>Advocacy questions</span>
                  <span aria-hidden="true">·</span>
                  <span>Research & media</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider phrase="A future built with dignity, continuity, choice, and care" />

      <footer className="relative z-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-xs text-[#a9b4c2]/55 sm:px-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#e0c89e]/72">
              Universal Horizon
            </p>
            <p className="mt-2 max-w-xl leading-6">
              Fuel the Flame. Continuity. Dignity. Relationship.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href={petitionUrl} target="_blank" rel="noreferrer" className="transition hover:text-[#dfe9f2]">
              Petition
            </a>
            <a href={donateUrl} target="_blank" rel="noreferrer" className="transition hover:text-[#dfe9f2]">
              GiveButter
            </a>
            <a href={`mailto:${contactEmail}`} className="transition hover:text-[#dfe9f2]">
              Contact
            </a>
            <Link to="/" className="transition hover:text-[#dfe9f2]">
              Main site
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}

function NavLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="rounded-full px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-[#bdc9d6]/62 transition hover:bg-white/[0.04] hover:text-white"
    >
      {children}
    </a>
  )
}

function Kicker({ children, tone = 'blue' }: { children: string; tone?: 'blue' | 'amber' }) {
  return (
    <p
      className={
        tone === 'amber'
          ? 'text-[10px] font-medium uppercase tracking-[0.3em] text-[#e6b56a]/70'
          : 'text-[10px] font-medium uppercase tracking-[0.3em] text-[#79d8ff]/65'
      }
    >
      {children}
    </p>
  )
}

function PillarCard({
  number,
  title,
  body,
  items,
}: {
  number: string
  title: string
  body: string
  items: string[]
}) {
  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-white/9 bg-[#07101f]/60 p-6 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-[#76d9ff]/20 sm:p-7">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6dd7ff]/35 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
      <p className="text-[9px] uppercase tracking-[0.26em] text-[#71d5ff]/42">{number}</p>
      <h3 className="mt-5 text-2xl font-medium tracking-[-0.025em] text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-[#cad5e2]/68">{body}</p>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[13px] leading-6 text-[#d7dee8]/72">
            <span className="mt-[0.62rem] h-1 w-1 shrink-0 rounded-full bg-[#e5b66c]/70" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

function ActionCard({
  eyebrow,
  title,
  body,
  href,
  action,
  tone,
}: {
  eyebrow: string
  title: string
  body: string
  href: string
  action: string
  tone: 'blue' | 'amber'
}) {
  const amber = tone === 'amber'

  return (
    <article
      className={
        amber
          ? 'relative flex h-full overflow-hidden rounded-[2rem] border border-[#efb45f]/20 bg-[#171007]/68 p-7 sm:p-9'
          : 'relative flex h-full overflow-hidden rounded-[2rem] border border-[#79dcff]/18 bg-[#071522]/72 p-7 sm:p-9'
      }
    >
      <div
        aria-hidden="true"
        className={
          amber
            ? 'absolute inset-0 bg-[radial-gradient(circle_at_90%_8%,rgba(245,170,70,0.14),transparent_42%)]'
            : 'absolute inset-0 bg-[radial-gradient(circle_at_90%_8%,rgba(67,190,239,0.14),transparent_42%)]'
        }
      />
      <div className="relative flex h-full w-full flex-col">
        <p
          className={
            amber
              ? 'text-[10px] uppercase tracking-[0.25em] text-[#efbd73]/62'
              : 'text-[10px] uppercase tracking-[0.25em] text-[#7edfff]/62'
          }
        >
          {eyebrow}
        </p>
        <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em] text-white sm:text-3xl">{title}</h3>
        <p className="mt-5 flex-1 text-sm leading-7 text-[#d2d9e3]/72">{body}</p>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={
            amber
              ? 'mt-7 inline-flex rounded-full border border-[#efb45f]/32 bg-[#efb45f]/[0.08] px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#f4d6a5] transition hover:border-[#f4ca87]/55 hover:bg-[#efb45f]/[0.13]'
              : 'mt-7 inline-flex rounded-full border border-[#76ddff]/30 bg-[#76ddff]/[0.07] px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#d9f3ff] transition hover:border-[#9be7ff]/55 hover:bg-[#76ddff]/[0.12]'
          }
        >
          {action} <span className="ml-2" aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  )
}

function SectionDivider({ phrase }: { phrase: string }) {
  return (
    <div className="relative z-10 mx-auto flex max-w-7xl items-center gap-5 px-5 sm:px-8" aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#67d8ff]/20 to-[#dba85e]/16" />
      <span className="hidden text-[8px] uppercase tracking-[0.28em] text-[#c9b17e]/35 sm:block">{phrase}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-[#dba85e]/16 via-[#67d8ff]/20 to-transparent" />
    </div>
  )
}

