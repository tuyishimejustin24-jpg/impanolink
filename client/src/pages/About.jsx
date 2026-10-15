// import { HeartHandshake, Target, Lightbulb } from 'lucide-react'

// export default function About() {
//   return (
//     <main className="mx-auto min-h-[65vh] max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
//       <div className="max-w-3xl">
//         <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">
//           Ibyerekeye ImpanoLink
//         </p>
//         <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
//           Impano yawe ishobora guhindura ejo hazaza hawe.
//         </h1>
//         <p className="mt-5 text-lg leading-8 text-slate-300">
//           ImpanoLink ni igitekerezo cy'urubuga rugamije guhuza abantu bafite
//           ubumenyi n'impano n'abantu bakeneye serivisi zabo.
//         </p>
//       </div>

//       <div className="mt-10 grid gap-5 md:grid-cols-3">
//         <article className="rounded-2xl border border-white/10 bg-[#1a2944] p-6">
//           <HeartHandshake size={30} className="text-teal-300" />
//           <h2 className="mt-5 text-xl font-semibold text-white">Icyerekezo</h2>
//           <p className="mt-3 text-sm leading-7 text-slate-400">
//             Gufasha abantu kubona serivisi no kumenyekanisha ubumenyi bafite.
//           </p>
//         </article>

//         <article className="rounded-2xl border border-white/10 bg-[#1a2944] p-6">
//           <Target size={30} className="text-teal-300" />
//           <h2 className="mt-5 text-xl font-semibold text-white">Intego</h2>
//           <p className="mt-3 text-sm leading-7 text-slate-400">
//             Koroshya uburyo abakiriya babona abantu bashoboye ibyo bakeneye.
//           </p>
//         </article>

//         <article className="rounded-2xl border border-white/10 bg-[#1a2944] p-6">
//           <Lightbulb size={30} className="text-teal-300" />
//           <h2 className="mt-5 text-xl font-semibold text-white">Impano</h2>
//           <p className="mt-3 text-sm leading-7 text-slate-400">
//             Guha abantu amahirwe yo kwerekana ibyo bashoboye no kwiteza imbere.
//           </p>
//         </article>
//       </div>
//     </main>
//   )
// }


import { HeartHandshake, Target, Lightbulb } from 'lucide-react'
import FounderProfile from '../components/FounderProfile'

export default function About() {
  return (
    <main className="min-h-screen bg-[#101c35] px-4 py-14 sm:px-6 lg:px-8">
      {/* About ImpanoLink */}
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">
       About ImpanoLink
       
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
        Your talent can shape your future.
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-300">
           ImpanoLink is a platform designed to connect people with skills and talents
            to those who need their services.
          </p>
        </div>

        {/* Icyerekezo, Intego n'Impano */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-[#1a2944] p-6">
            <HeartHandshake size={30} className="text-teal-300" />
            <h2 className="mt-5 text-xl font-semibold text-white">
            Our Vision
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
            To help people access services and showcase their skills.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-[#1a2944] p-6">
            <Target size={30} className="text-teal-300" />
            <h2 className="mt-5 text-xl font-semibold text-white">
            Our Mission
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
           To make it easier for customers to find skilled people who meet their needs.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-[#1a2944] p-6">
            <Lightbulb size={30} className="text-teal-300" />
            <h2 className="mt-5 text-xl font-semibold text-white">
             Talent
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
          Empowering people to showcase their talents and grow.
            </p>
          </article>
        </div>
      </div>

      {/* Founder of ImpanoLink */}
      <div className="mt-16">
        <FounderProfile />
      </div>
    </main>
  )
}
