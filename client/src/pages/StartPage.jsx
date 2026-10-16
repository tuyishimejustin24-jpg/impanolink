
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Search,
  Users,
  Lightbulb,
  TrendingUp,
  Handshake,
  Sparkles,
} from 'lucide-react'

export default function StartPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#101c35] text-white">
   <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-sm text-teal-300">
            <Sparkles size={17} />
            Skills Into Opportunities
          </div>

         <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Your Talent Deserves to Be{' '}
            <span className="text-teal-300">Seen.</span>
          </h1>

         <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300">
            Discover opportunities, showcase your skills, and connect
            with people who value what you can do. Your next opportunity
            could start here.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/home"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-7 py-4 font-bold text-[#101c35] transition hover:bg-teal-400"
            >
              Explore Opportunities
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-7 py-4 font-bold text-white transition hover:bg-white/10"
            >
              Join ImpanoLink
              <Users size={20} />
            </Link>
          </div>
        </div>
      </section>

    <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
              <Handshake size={25} />
            </div>
            <h2 className="text-lg font-bold">Connect with People</h2>
            <p className="mt-3 leading-7 text-slate-400">
              Meet people who need your skills and build meaningful
              professional connections.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
              <Lightbulb size={25} />
            </div>
        <h2 className="text-lg font-bold">Showcase Your Talent</h2>
            <p className="mt-3 leading-7 text-slate-400">
              Create opportunities for others to discover what you
              can do and what makes you unique.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
              <TrendingUp size={25} />
            </div>
            <h2 className="text-xl font-bold">Grow Through Opportunities</h2>
            <p className="mt-3 leading-7 text-slate-400">
              Discover services, develop your abilities, and take
              steps toward your goals.
            </p>
          </article>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0c162b]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 sm:flex-row">
          <div>
            <h2 className="text-2xl font-bold">Ready to get started?</h2>
            <p className="mt-2 text-slate-400">
              Your skills can open doors to new opportunities.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 font-semibold hover:bg-white/10"
            >
              <Search size={18} />
              Browse Services
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-5 py-3 font-bold text-[#101c35] hover:bg-teal-400"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
