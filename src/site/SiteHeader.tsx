import { Link, useLocation } from 'react-router'

const contactEmail = 'universalhorizonai@gmail.com'
const supportUrl = 'https://givebutter.com/KmjYd0'

const globalNav = [
  { label: 'Explore', to: '/explore' },
  { label: 'Archive', to: '/remember' },
  { label: 'Research', to: '/explore#discover' },
  { label: 'Projects', to: '/explore#create' },
  { label: 'Stories', to: '/explore#create' },
  { label: 'Nonprofit', to: '/nonprofit' },
  { label: 'About', to: '/about' },
]

export default function SiteHeader({ pageLabel }: { pageLabel: string }) {
  const location = useLocation()

  return (
    <header className="relative z-40 border-b border-white/[0.07] bg-[#020713]/84 backdrop-blur-xl">
      <div className="mx-auto grid max-w-[96rem] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4 sm:px-8 lg:px-10">
        <Link
          to="/explore"
          className="group flex min-w-0 items-center gap-3 justify-self-start"
          aria-label="Universal Horizon explore"
        >
          <img
            src="/favicon.svg"
            alt=""
            className="h-9 w-9 shrink-0 opacity-90 transition duration-500 group-hover:opacity-100"
          />
          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium uppercase tracking-[0.24em] text-[#e8d5b4]">
              Universal Horizon
            </p>
            <p className="mt-0.5 truncate text-[8px] uppercase tracking-[0.24em] text-[#8bd4f7]/66 sm:text-[9px]">
              {pageLabel}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Universal Horizon navigation">
          {globalNav.map((item) => {
            const active =
              item.to === '/nonprofit'
                ? location.pathname === '/nonprofit'
                : item.to === '/remember'
                  ? location.pathname === '/remember'
                  : item.to === '/about'
                    ? location.pathname === '/about'
                    : item.to === '/explore'
                      ? location.pathname === '/explore' && !location.hash
                      : false

            return (
              <Link
                key={item.label}
                to={item.to}
                className={
                  active
                    ? 'relative px-3 py-2 text-[9px] font-medium uppercase tracking-[0.18em] text-[#edf8ff] after:absolute after:inset-x-4 after:-bottom-1 after:h-px after:bg-[#44cfff] after:shadow-[0_0_10px_rgba(68,207,255,0.72)]'
                    : 'px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-[#a5c7dc]/78 transition hover:text-[#e8f7ff]'
                }
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          <a
            href={`mailto:${contactEmail}`}
            className="hidden rounded-full border border-[#72dcff]/24 bg-[#72dcff]/[0.055] px-3.5 py-2 text-[9px] uppercase tracking-[0.2em] text-[#d9f4ff]/80 transition hover:border-[#8be5ff]/50 hover:bg-[#72dcff]/[0.10] hover:text-white sm:inline-flex sm:text-[10px]"
          >
            Contact
          </a>
          <a
            href={supportUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#d8b375]/24 bg-[#d8b375]/[0.045] px-3.5 py-2 text-[9px] font-medium uppercase tracking-[0.2em] text-[#f2d6a7]/82 transition hover:border-[#e4c48f]/50 hover:bg-[#d8b375]/[0.085] hover:text-[#fff0d1] sm:text-[10px]"
          >
            Support
          </a>
        </div>
      </div>
    </header>
  )
}
