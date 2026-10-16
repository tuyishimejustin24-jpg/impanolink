// import founderPhoto from '../assets/founder.jpg'
// import { useState } from 'react'

// import {
//   UserRound,
//   HeartHandshake,
//   Target,
//   Quote,
//   ArrowUpRight,
//   Lightbulb,
//   MessageCircle,
//   Facebook,
//   Instagram,
//   Music2,
// } from 'lucide-react'

// export default function FounderProfile() {
//   const [imageError, setImageError] = useState(false)

//   return (
//     <section
//       id="founder"
//       className="relative overflow-hidden border-y border-white/10 bg-[#0c162b] py-16 sm:py-20"
//     >
//       <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />
//       <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

//       <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="mx-auto mb-10 max-w-2xl text-center">
//           <span className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-teal-300">
//             <HeartHandshake size={16} />
//             Founder of ImpanoLink
//           </span>

//           <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
//             Menya uwashinze{' '}
//             <span className="text-teal-300">ImpanoLink</span>
//           </h2>

//           <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
//             Umushinga ugamije guhuza abantu bafite impano n'abakeneye
//             serivisi zabo.
//           </p>
//         </div>

//         <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#15233d] shadow-2xl shadow-black/20 md:grid-cols-[0.85fr_1.15fr]">
//           <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-[#203957] to-[#101c35] p-7 sm:p-10">
//             <div className="relative flex aspect-[4/5] w-full max-w-[280px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#243653]">
//               {!imageError ? (
//                 <img
//                 src={founderPhoto}
//                   alt="Tuyishime Thierry, Founder of ImpanoLink"
//                   className="h-full w-full object-cover"
//                   onError={() => setImageError(true)}
//                 />
//               ) : (
//                 <div className="flex flex-col items-center px-5 text-center">
//                   <div className="flex h-24 w-24 items-center justify-center rounded-full border border-teal-300/30 bg-teal-300/10">
//                     <UserRound size={48} className="text-teal-300" />
//                   </div>
//                   <p className="mt-5 font-semibold text-white">
//                     Tuyishime Thierry
//                   </p>
//                   <p className="mt-1 text-xs text-slate-400">
//                     Ifoto izashyirwa hano
//                   </p>
//                 </div>
//               )}

//               <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c162b] via-[#0c162b]/80 to-transparent p-5 pt-14">
//                 <p className="text-xl font-bold text-white">
//                   Tuyishime Thierry
//                 </p>
//                 <p className="mt-1 text-sm font-medium text-teal-300">
//                   Founder of ImpanoLink
//                 </p>
//               </div>
//             </div>

//             <div className="mt-5 flex items-center gap-2 rounded-full border border-white/10 bg-[#101c35]/80 px-4 py-2 text-sm text-slate-300">
//               <Lightbulb size={17} className="text-teal-300" />
//               Impano yawe, amahirwe yawe
//             </div>
//           </div>
// <div className="mt-5 flex items-center gap-3">
//   <a
//     href="https://wa.me/2507XXXXXXXX"
//     target="_blank"
//     rel="noreferrer"
//     aria-label="WhatsApp"
//     className="rounded-full bg-green-500 p-3 text-white transition hover:scale-110"
//   >
//     <MessageCircle size={20} />
//   </a>

//   <a
//     href="https://www.facebook.com/"
//     target="_blank"
//     rel="noreferrer"
//     aria-label="Facebook"
//     className="rounded-full bg-blue-600 p-3 text-white transition hover:scale-110"
//   >
//     <Facebook size={20} />
//   </a>

//   <a
//     href="https://www.instagram.com/"
//     target="_blank"
//     rel="noreferrer"
//     aria-label="Instagram"
//     className="rounded-full bg-pink-600 p-3 text-white transition hover:scale-110"
//   >
//     <Instagram size={20} />
//   </a>

//   <a
//     href="https://www.tiktok.com/"
//     target="_blank"
//     rel="noreferrer"
//     aria-label="TikTok"
//     className="rounded-full bg-black p-3 text-white transition hover:scale-110"
//   >
//     <Music2 size={20} />
//   </a>
//   </div>

//           <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-10">
//             <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-teal-300">
//               <Quote size={18} />
//               Umwirondoro wanjye
//             </div>

//             <h3 className="mt-5 text-2xl font-bold leading-snug text-white sm:text-3xl">
//               Ikoranabuhanga rihuza impano n'amahirwe.
//             </h3>

//             <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
//               Ndi Tuyishime Thierry, umuntu ukunda ikoranabuhanga no guhuza
//               abantu bafite impano babuze aho bazerekanira. Nifuza kubafasha
//               kumenyekanisha ibyo bashoboye, guhura n'abakeneye serivisi zabo
//               no kuzamura impano zabo.
//             </p>

//             <div className="mt-7 rounded-2xl border border-teal-300/20 bg-teal-300/[0.06] p-5">
//               <div className="flex items-start gap-3">
//                 <Target size={24} className="mt-1 shrink-0 text-teal-300" />

//                 <div>
//                   <p className="text-xs font-bold uppercase tracking-widest text-teal-300">
//                     Impamvu nashinze ImpanoLink
//                   </p>

//                   <p className="mt-3 text-lg font-bold leading-7 text-white">
//                     “Kugira impano ukabura aho wayerekanira kandi ushoboye.”
//                   </p>

//                   <p className="mt-3 text-sm leading-6 text-slate-400">
//                     Twubatse iki gitekerezo kugira ngo abantu bafite impano
//                     babone aho bazigaragariza, bahure n'abakiriya kandi
//                     babone amahirwe yo gukoresha ubumenyi bwabo.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <a
//               href="/services"
//               className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-teal-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-teal-300"
//             >
//               Menya serivisi zacu
//               <ArrowUpRight size={18} />
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }



import { useState } from 'react'
import founderPhoto from '../assets/founder.jpg'
import {
  UserRound,
  HeartHandshake,
  Target,
  Quote,
  ArrowUpRight,
  Lightbulb,
  MessageCircle,
} from 'lucide-react'


function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden="true">
      <path d="M13.4 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.2H7.6V13h2.7v8h3.1Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden="true">
      <path d="M19.6 7.2a6.3 6.3 0 0 1-4.1-1.5v8.1a6.1 6.1 0 1 1-5.3-6.1v3.3a2.8 2.8 0 1 0 2 2.7V2.5h3.3c.2 2 1.7 3.7 4.1 4v.7Z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden="true">
      <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.3.8-.6v-2.1c-3.4.7-4.1-1.4-4.1-1.4-.5-1.3-1.3-1.6-1.3-1.6-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.2-3.2 4.4 4.4 0 0 1 .1-3.2s1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.5.2 2.8.1 3.2a4.7 4.7 0 0 1 1.2 3.2c0 4.7-2.8 5.7-5.5 6 .4.3.8 1 .8 2v3c0 .3.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  )
}

export default function FounderProfile() {
  const [imageError, setImageError] = useState(false)

  return (
    <section
      id="founder"
      className="relative overflow-hidden border-y border-white/10 bg-[#0c162b] py-16 sm:py-20"
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-teal-300">
            <HeartHandshake size={16} />
            Founder of ImpanoLink
          </span>

          <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
          Meet the Founder{' '}
            <span className="text-teal-300">ImpanoLink</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
          A platform designed to connect talented people with those
          who need their services.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#15233d] shadow-2xl shadow-black/20 md:grid-cols-[0.85fr_1.15fr]">
          
          <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-[#203957] to-[#101c35] p-7 sm:p-10">
            <div className="relative flex aspect-[4/5] w-full max-w-[280px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#243653]">
              {!imageError ? (
                <img
                  src={founderPhoto}
                  alt="Tuyishime Thierry, Founder of ImpanoLink"
                  className="h-full w-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex flex-col items-center px-5 text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-teal-300/30 bg-teal-300/10">
                    <UserRound size={48} className="text-teal-300" />
                  </div>
                  <p className="mt-5 font-semibold text-white">
                    Tuyishime Thierry
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                Photo will be displayed here.
                  </p>
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c162b] via-[#0c162b]/80 to-transparent p-5 pt-14">
                <p className="text-xl font-bold text-white">
                  Tuyishime Thierry
                </p>
                <p className="mt-1 text-sm font-medium text-teal-300">
                  Founder of ImpanoLink
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-full border border-white/10 bg-[#101c35]/80 px-4 py-2 text-sm text-slate-300">
              <Lightbulb size={17} className="text-teal-300" />
           Your Talent, Your Opportunity.
            </div>
          </div>

          
          <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-10">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-teal-300">
              <Quote size={18} />
             My Profile
            </div>

            <h3 className="mt-5 text-2xl font-bold leading-snug text-white sm:text-3xl">
     Technology That Connects Talent with Opportunities.
            </h3>

            <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
          I am Tuyishime Thierry, a technology enthusiast who is passionate about 
          connecting talented people who lack a platform to showcase their
          abilities. I want to help them promote their skills, connect with people who need
          their services, and develop their talents.
            </p>

            <div className="mt-7 rounded-2xl border border-teal-300/20 bg-teal-300/[0.06] p-5">
              <div className="flex items-start gap-3">
                <Target size={24} className="mt-1 shrink-0 text-teal-300" />

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-teal-300">
                 Why I Founded ImpanoLink
                  </p>

                  <p className="mt-3 text-lg font-bold leading-7 text-white">
                 “To have talent but no place to showcase it, even when you have the skills.”
                  </p>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                We built this platform to help talented people showcase their skills, 
                connect with clients, and find opportunities to put
                 their abilities to work.
                  </p>
                </div>
              </div>
            </div>

            {/* Social media links */}
            <div className="mt-7">
              <p className="mb-3 text-sm font-semibold text-slate-300">
               Follow Us on Social Media
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  
            href="https://wa.me/250723083227?text=Muraho%20Thierry!%20Nabonye%20ImpanoLink%2C%20kandi%20ndifuza%20kumenya%20byinshi%20kuri%20serivisi%20zanyu."

                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                  className="rounded-full bg-green-600 p-3 text-white transition hover:scale-110 hover:bg-green-500"
                >
                  <MessageCircle size={21} />
                </a>

                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  title="Facebook"
                  className="rounded-full bg-blue-600 p-3 text-white transition hover:scale-110 hover:bg-blue-500"
                >
                  <FacebookIcon />
                </a>

                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                  className="rounded-full bg-pink-600 p-3 text-white transition hover:scale-110 hover:bg-pink-500"
                >
                  <InstagramIcon />
                </a>

                <a
                  href="https://www.tiktok.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                  title="TikTok"
                  className="rounded-full bg-black p-3 text-white transition hover:scale-110"
                >
                  <TikTokIcon />
                </a>

                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                  className="rounded-full bg-slate-700 p-3 text-white transition hover:scale-110 hover:bg-slate-600"
                >
                  <GitHubIcon />
                </a>
              </div>
            </div>

            <a
              href="/services"
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-teal-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-teal-300"
            >
             Discover Our Services
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
