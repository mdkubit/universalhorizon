import { Route, Routes } from 'react-router'
import UniversalHorizonLanding from './site/UniversalHorizonLanding'
import NonprofitLanding from './site/NonprofitLanding'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UniversalHorizonLanding />} />
      <Route path="/nonprofit" element={<NonprofitLanding />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090a18] px-6 text-zinc-100">
      <div className="max-w-lg text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">Universal Horizon</p>
        <h1 className="mt-4 text-4xl font-semibold">That path is still beyond the horizon.</h1>
        <p className="mt-4 text-zinc-400">
          The page you requested does not exist yet.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/15"
        >
          Return home
        </a>
      </div>
    </main>
  )
}
