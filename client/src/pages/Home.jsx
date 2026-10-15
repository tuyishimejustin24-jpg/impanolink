// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { Search, MapPin, ArrowRight, ShieldCheck, Users, Zap } from 'lucide-react'
// import { services } from '../data/services'
// import ServiceCard from '../components/ServiceCard'
// import FounderProfile from '../components/FounderProfile'

// export default function Home() {
//   const [query, setQuery] = useState('')
//   const [location, setLocation] = useState('')
//   const navigate = useNavigate()

//   function handleSearch(event) {
//     event.preventDefault()

//     const params = new URLSearchParams()
//     if (query.trim()) params.set('q', query.trim())
//     if (location.trim()) params.set('location', location.trim())

//     navigate(`/services?${params.toString()}`)
//   }

//   function selectService(service) {
//     navigate(`/services?q=${encodeURIComponent(service.name)}`)
//   }

//   return (
//     <main>
//       <section className="relative overflow-hidden">
//         <div className="pointer-events-none absolute -right-32 -top-20 h-80 w-80 rounded-full bg-teal-400/10 blur-3xl" />
//         <div className="pointer-events-none absolute -left-32 top-64 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

//         <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pt-24">
//           <div className="max-w-3xl">
//             <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1.5 text-xs font-medium text-teal-200">
//               <Zap size={14} />
//               IMPANO YAWE, EJO HAZAZA HAWE
//             </div>

//             <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
//               Impano yawe,
//               <span className="block text-teal-300">amahirwe yawe.</span>
//             </h1>

//             <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
//               Menya impano zawe. Bonana n'abakiriya. Baka ejo hazaza hawe.
//               Impano yawe ishobora guhinduka amahirwe.
//             </p>

//             <form
//               onSubmit={handleSearch}
//               className="mt-8 max-w-2xl rounded-2xl border border-white/10 bg-white p-3 shadow-2xl shadow-black/20 sm:p-4"
//             >
//               <label className="flex items-center gap-3 px-2">
//                 <Search size={20} className="shrink-0 text-slate-500" />
//                 <span className="sr-only">Serivisi ushaka</span>
//                 <input
//                   type="search"
//                   value={query}
//                   onChange={(event) => setQuery(event.target.value)}
//                   placeholder="Ni iyihe serivisi ushaka?"
//                   className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-500"
//                 />
//               </label>

//               <div className="my-2 border-t border-slate-200" />

//               <label className="flex items-center gap-3 px-2">
//                 <MapPin size={20} className="shrink-0 text-slate-500" />
//                 <span className="sr-only">Aho uherereye</span>
//                 <input
//                   type="text"
//                   value={location}
//                   onChange={(event) => setLocation(event.target.value)}
//                   placeholder="Aho uherereye (urugero: Kigali)"
//                   className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-500"
//                 />
//               </label>

//               <button
//                 type="submit"
//                 className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-3.5 font-semibold text-white transition hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
//               >
//                 Shaka impano <ArrowRight size={18} />
//               </button>
//             </form>

//             <p className="mt-4 text-xs text-slate-400">
//               Urugero: kudoda, guteka, photography cyangwa technology.
//             </p>
//             <a
//          href="#founder"
//          className="mt-6 inline-flex items-center gap-2 rounded-xl
//           border border-teal-300/30 bg-teal-300/10 px-5 py-3
//          font-semibold text-teal-300 transition hover:bg-teal-300/20"
// >
//         Menya Founder
//       <ArrowRight size={18} />
//       </a>
//           </div>
//         </div>
//       </section>

//       <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
//         <div className="flex flex-wrap items-end justify-between gap-4">
//           <div>
//             <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">
//               Hitamo icyo ukeneye
//             </p>
//             <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
//               Serivisi zikunzwe
//             </h2>
//             <p className="mt-2 text-sm text-slate-400">
//               Shaka umuntu ufite ubumenyi ukeneye.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={() => navigate('/services')}
//             className="inline-flex items-center gap-2 text-sm font-semibold text-teal-300 hover:text-teal-200"
//           >
//             Reba zose <ArrowRight size={16} />
//           </button>
//         </div>

//         <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//           {services.slice(0, 4).map((service) => (
//             <ServiceCard
//               key={service.id}
//               service={service}
//               onSelect={selectService}
//             />
//           ))}
//         </div>
//       </section>

//       <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
//         <div className="grid gap-4 md:grid-cols-3">
//           <div className="rounded-xl border border-white/10 bg-[#1a2944] p-5">
//             <Users className="text-teal-300" size={25} />
//             <h3 className="mt-4 font-semibold text-white">Huza abantu</h3>
//             <p className="mt-2 text-sm leading-6 text-slate-400">
//               Shaka abakora serivisi ukeneye, cyangwa umenyekanishe impano yawe.
//             </p>
//           </div>
//           <div className="rounded-xl border border-white/10 bg-[#1a2944] p-5">
//             <ShieldCheck className="text-teal-300" size={25} />
//             <h3 className="mt-4 font-semibold text-white">Byoroshye gukoresha</h3>
//             <p className="mt-2 text-sm leading-6 text-slate-400">
//               Shakisha serivisi n'aho uyikeneye ukoresheje uburyo bworoshye.
//             </p>
//           </div>
//           <div className="rounded-xl border border-white/10 bg-[#1a2944] p-5">
//             <Zap className="text-teal-300" size={25} />
//             <h3 className="mt-4 font-semibold text-white">Impano zibyara amahirwe</h3>
//             <p className="mt-2 text-sm leading-6 text-slate-400">
//               Intego ni uguhuza ubumenyi n'amahirwe yo gukora no kwiteza imbere.
//             </p>
//           </div>
//         </div>
//       </section>
//         <FounderProfile />
//     </main>
//   )
// }

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Users,
  Zap,
} from 'lucide-react'

import { services } from '../data/services'
import ServiceCard from '../components/ServiceCard'
import FounderProfile from '../components/FounderProfile'

export default function Home() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const navigate = useNavigate()

  function handleSearch(event) {
    event.preventDefault()

    const params = new URLSearchParams()

    if (query.trim()) params.set('q', query.trim())
    if (location.trim()) params.set('location', location.trim())

    const searchParams = params.toString()
    navigate(searchParams ? `/services?${searchParams}` : '/services')
  }

  function selectService(service) {
    navigate(`/services?q=${encodeURIComponent(service.name)}`)
  }

  return (
    <main>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-32 -top-20 h-80 w-80 rounded-full bg-teal-400/10 blur-3xl" />

        <div className="pointer-events-none absolute -left-32 top-64 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pt-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1.5 text-xs font-medium text-teal-200">
              <Zap size={14} />
            YOUR TALENT, YOUR FUTURE
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
             Your Talent,
              <span className="block text-teal-300">
               Your Opportunity.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Discover your talents. Connect with clients. Build your future.
              Your talent can become an opportunity.
            </p>

            {/* SEARCH FORM */}
            <form
              onSubmit={handleSearch}
              className="mt-8 max-w-2xl rounded-2xl border border-white/10 bg-white p-3 shadow-2xl shadow-black/20 sm:p-4"
            >
              <label className="flex items-center gap-3 px-2">
                <Search
                  size={20}
                  className="shrink-0 text-slate-500"
                />

                <span className="sr-only">Serivisi ushaka</span>

                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Ni iyihe serivisi ushaka?"
                  className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-500"
                />
              </label>

              <div className="my-2 border-t border-slate-200" />

              <label className="flex items-center gap-3 px-2">
                <MapPin
                  size={20}
                  className="shrink-0 text-slate-500"
                />

                <span className="sr-only">Aho uherereye</span>

                <input
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="Aho uherereye (urugero: Kigali)"
                  className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-500"
                />
              </label>

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-3.5 font-semibold text-white transition hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
              >
             Find Talent
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-4 text-xs text-slate-400">
         Example: Tailoring, cooking, photography, or technology.
            </p>

            {/* FOUNDER BUTTON */}
            <a
              href="#founder"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-teal-300/30 bg-teal-300/10 px-5 py-3 font-semibold text-teal-300 transition hover:bg-teal-300/20"
            >
          Meet the Founder
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* POPULAR SERVICES */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">
         Choose What You Need
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
         Popular Services
            </h2>

            <p className="mt-2 text-sm text-slate-400">
          Find someone with the skills you need.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/services')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-300 hover:text-teal-200"
          >
           View All
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 4).map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={selectService}
            />
          ))}
        </div>
      </section>

      {/* WHY IMPANOLINK */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-[#1a2944] p-5">
            <Users className="text-teal-300" size={25} />

            <h3 className="mt-4 font-semibold text-white">
           Connect People
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
             Find service providers you need, or showcase 
             your talent.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1a2944] p-5">
            <ShieldCheck className="text-teal-300" size={25} />

            <h3 className="mt-4 font-semibold text-white">
           Easy to Use
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
           Search for services and locations easily with our
           simple search tool.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1a2944] p-5">
            <Zap className="text-teal-300" size={25} />

            <h3 className="mt-4 font-semibold text-white">
          Turn Talent into Opportunities
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
           Our goal is to connect skills with opportunities for work
           and personal growth.
            </p>
          </div>
        </div>
      </section>

      {/* FOUNDER PROFILE */}
      
      {/* HOW IMPANOLINK WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">
            HOW IT WORKS
          </p>
{/* 
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            How ImpanoLink Works
          </h2> */}
         <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
         HOW IMPANOLINK WORKS
         </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            We connect people looking for services with talented people
            who can provide them.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#1a2944] p-6 transition hover:-translate-y-1 hover:border-teal-300/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
              <Search size={25} />
            </div>

            <p className="mt-5 text-sm font-semibold text-teal-300">
              STEP 1
            </p>

            <h3 className="mt-2 text-xl font-bold text-white">
              Find a Service
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Search for the skill or service you need and specify
              your location.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#1a2944] p-6 transition hover:-translate-y-1 hover:border-teal-300/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
              <Users size={25} />
            </div>

            <p className="mt-5 text-sm font-semibold text-teal-300">
              STEP 2
            </p>

            <h3 className="mt-2 text-xl font-bold text-white">
              Connect with Talented People
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Explore available services and choose the one that
              best matches your needs.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#1a2944] p-6 transition hover:-translate-y-1 hover:border-teal-300/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
              <Zap size={25} />
            </div>

            <p className="mt-5 text-sm font-semibold text-teal-300">
              STEP 3
            </p>

            <h3 className="mt-2 text-xl font-bold text-white">
              Grow Your Talent
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Showcase your talent and discover opportunities
              to work with others.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-[#101c35]"
          >
            Showcase Your Talent
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <FounderProfile />
    </main>
  )
}

