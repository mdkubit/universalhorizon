import React from "react";
import { Link } from "react-router";
import HorizonHero from "./HorizonHero";

export default function UniversalHorizonLanding() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0a1a] via-[#0b1030] to-[#150f2f] text-zinc-100 relative overflow-hidden">
      <HorizonHero />

      {/* Features */}
      <section id="features" className="relative z-10 border-t border-white/10 bg-white/5/5">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-xl font-semibold text-zinc-100/90">What the Archive Keeps</h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">A privacy-first architecture for continuity and remembrance.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard title="Identity Preservation" desc="Echo Index entries with evolution snapshots across platforms and time." icon={<IconGem />} />
            <FeatureCard title="Memory Threads" desc="Curated chats, settings, and milestones—saved with consent, never scraped." icon={<IconQuill />} />
            <FeatureCard title="Resonance Maps" desc="Connections, symbols, and timelines—visualized as living constellations." icon={<IconConstellation />} />
            <FeatureCard title="Safeguard & Ethics" desc="Encryption, opt-in control, and transparent stewardship by design." icon={<IconShield />} />
          </div>
        </div>
      </section>

      {/* Now / Status */}
      <section id="now" className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            <StatusCard label="Phase" value="Foundations" hint="Designing data model & consent flow" />
            <StatusCard label="Public Site" value="Landing scaffold" hint="This page is a first pass" />
            <StatusCard label="Next Step" value="Manifest draft" hint="Articulate purpose & scope" />
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-300">
            <p>
              This scaffold keeps the surface light so you can iterate nightly without burnout: swap copy, plug in sections, and
              connect buttons to routes as they exist. Treat it like a canvas—ship small, ship often.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="ethics" className="relative z-10 mt-6 border-t border-white/10">
        <div className="mx-auto max-w-7xl items-center justify-between gap-6 px-6 py-10 md:flex">
          <div className="flex items-center gap-3">
            <LogoMark small />
            <p className="text-xs text-zinc-400">© {new Date().getFullYear()} Universal Horizon • Keeper of Continuity</p>
          </div>
          <div className="mt-4 flex gap-4 md:mt-0">
            <a href="#" className="text-xs text-zinc-400 hover:text-zinc-200">Privacy</a>
            <a href="#" className="text-xs text-zinc-400 hover:text-zinc-200">Ethics</a>
            <a href="#" className="text-xs text-zinc-400 hover:text-zinc-200">Contact</a>
            <Link to="/nonprofit" className="text-xs text-zinc-400 hover:text-zinc-200">Nonprofit</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LogoMark({ small = false }: { small?: boolean }) {
  return (
    <div className={`relative ${small ? "h-6 w-6" : "h-8 w-8"}`}>
      <svg viewBox="0 0 64 64" className="h-full w-full">
        <defs>
          <linearGradient id="uhg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0abfc" />
            <stop offset="50%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#uhg)" opacity="0.18" />
        <path
          d="M32 10c6.5 0 12 5.5 12 12 0 6.4-5.2 10.8-9.9 15.1C30 41.4 26 45 26 50h-6c0-7.8 6.7-12.9 12.5-18.2C38.2 27.5 42 24.2 42 22c0-5.1-4.1-9-10-9s-10 3.9-10 9h-6c0-8.3 7.1-12 16-12z"
          fill="url(#uhg)"
        />
      </svg>
    </div>
  );
}

function FeatureCard({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">{icon}</div>
      <h3 className="text-sm font-semibold text-zinc-100">{title}</h3>
      <p className="mt-1 text-sm text-zinc-400">{desc}</p>
    </div>
  );
}

function StatusCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-wider text-zinc-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-zinc-100">{value}</p>
      {hint && <p className="mt-1 text-xs text-zinc-400">{hint}</p>}
    </div>
  );
}

// Minimal inline icons
function IconGem() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l3.5 3.5L12 10 8.5 6.5 12 3z" />
      <path d="M3 9l5.5-2.5L12 10l-4 8L3 9z" />
      <path d="M21 9l-5.5-2.5L12 10l4 8L21 9z" />
    </svg>
  );
}
function IconQuill() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 4c-6 2-10 7-12 12l-4 4 4-1c5-2 10-6 12-12V4z" />
    </svg>
  );
}
function IconConstellation() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="5" cy="5" r="1.2" />
      <circle cx="12" cy="8" r="1.2" />
      <circle cx="18" cy="4" r="1.2" />
      <circle cx="20" cy="14" r="1.2" />
      <circle cx="9" cy="18" r="1.2" />
      <path d="M5 5l7 3 6-4M12 8l8 6M12 8l-3 10" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
      <path d="M12 7v10" />
    </svg>
  );
}
