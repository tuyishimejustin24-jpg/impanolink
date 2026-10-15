// import { useState } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import { Mail, MapPin, Send } from 'lucide-react'

// export default function Contact() {
//   const [searchParams] = useSearchParams()
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [message, setMessage] = useState(
//     searchParams.get('service') || '',
//   )

//   function handleSubmit(event) {
//     event.preventDefault()

//     const subject = encodeURIComponent(`Ubutumwa bwa ImpanoLink - ${name}`)
//     const body = encodeURIComponent(
//       `Izina: ${name}\nEmail: ${email}\n\nUbutumwa:\n${message}`,
//     )

//     window.location.href = `mailto:contact@impanolink.com?subject=${subject}&body=${body}`
//   }

//   return (
//     <main className="mx-auto min-h-[65vh] max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
//       <div className="grid gap-10 lg:grid-cols-2">
//         <section>
//           <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">
//             Twandikire
//           </p>
//           <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
//             Tuganire ku byo ukeneye.
//           </h1>
//           <p className="mt-5 max-w-lg leading-7 text-slate-400">
//             Ufite ikibazo, igitekerezo cyangwa ushaka serivisi runaka? Twoherereze
//             ubutumwa.
//           </p>

//           <div className="mt-8 space-y-5">
//             <div className="flex items-start gap-4">
//               <span className="rounded-lg bg-teal-400/10 p-3 text-teal-300">
//                 <Mail size={21} />
//               </span>
//               <div>
//                 <h2 className="font-semibold text-white">Email</h2>
//                 <p className="mt-1 text-sm text-slate-400">
//                   contact@impanolink.com
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-4">
//               <span className="rounded-lg bg-teal-400/10 p-3 text-teal-300">
//                 <MapPin size={21} />
//               </span>
//               <div>
//                 <h2 className="font-semibold text-white">Aho dukorera</h2>
//                 <p className="mt-1 text-sm text-slate-400">Rwanda</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-5 rounded-2xl border border-white/10 bg-[#1a2944] p-5 sm:p-7"
//         >
//           <div>
//             <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
//               Amazina yawe
//             </label>
//             <input
//               id="name"
//               required
//               value={name}
//               onChange={(event) => setName(event.target.value)}
//               placeholder="Andika amazina yawe"
//               className="w-full rounded-lg border border-white/10 bg-[#101c35] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-teal-400"
//             />
//           </div>

//           <div>
//             <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
//               Email yawe
//             </label>
//             <input
//               id="email"
//               type="email"
//               required
//               value={email}
//               onChange={(event) => setEmail(event.target.value)}
//               placeholder="urugero@email.com"
//               className="w-full rounded-lg border border-white/10 bg-[#101c35] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-teal-400"
//             />
//           </div>

//           <div>
//             <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-200">
//               Ubutumwa
//             </label>
//             <textarea
//               id="message"
//               required
//               rows={5}
//               value={message}
//               onChange={(event) => setMessage(event.target.value)}
//               placeholder="Andika ubutumwa bwawe..."
//               className="w-full resize-y rounded-lg border border-white/10 bg-[#101c35] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-teal-400"
//             />
//           </div>

//           <button
//             type="submit"
//             className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-3.5 font-semibold text-white transition hover:bg-teal-600"
//           >
//             Fungura email wohereze <Send size={17} />
//           </button>
//         </form>
//       </div>
//     </main>
//   )
// }


import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Mail, MapPin, Send } from 'lucide-react'

export default function Contact() {
  const [searchParams] = useSearchParams()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState(
    searchParams.get('service') || '',
  )
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState({
    type: '',
    text: '',
  })

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setFeedback({ type: '', text: '' })

    try {
      const response = await fetch(
        'http://localhost:5000/api/messages',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            subject,
            message,
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || 'Ubutumwa ntibwoherejwe. Ongera ugerageze.',
        )
      }

      setFeedback({
        type: 'success',
        text: 'Ubutumwa bwawe bwoherejwe neza! Murakoze gukoresha ImpanoLink.',
      })

      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    } catch (error) {
      setFeedback({
        type: 'error',
        text:
          error.message ||
          'Ntibyashobotse kohereza ubutumwa. Reba niba backend iri gukora.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto min-h-[65vh] max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <section>
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">
         Contact Us
          </p>

          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
         Let's talk about what you need.
          </h1>

          <p className="mt-5 max-w-lg leading-7 text-slate-400">
           Do you have a question, suggestion, or need a specific service? 
           Send us a message.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-4">
              <span className="rounded-lg bg-teal-400/10 p-3 text-teal-300">
                <Mail size={21} />
              </span>

              <div>
                <h2 className="font-semibold text-white">Email</h2>
                <p className="mt-1 text-sm text-slate-400">
                  contact@impanolink.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="rounded-lg bg-teal-400/10 p-3 text-teal-300">
                <MapPin size={21} />
              </span>

              <div>
                <h2 className="font-semibold text-white">
              Our Location
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Rwanda
                </p>
              </div>
            </div>
          </div>
        </section>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-white/10 bg-[#1a2944] p-5 sm:p-7"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
            Your Name
            </label>

            <input
              id="name"
              type="text"
              required
              maxLength={100}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Andika amazina yawe"
              className="w-full rounded-lg border border-white/10 bg-[#101c35] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-teal-400"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
            Your Email
            </label>

            <input
              id="email"
              type="email"
              required
              maxLength={254}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="urugero@email.com"
              className="w-full rounded-lg border border-white/10 bg-[#101c35] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-teal-400"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
           Topics
            </label>

            <input
              id="subject"
              type="text"
              required
              maxLength={150}
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="Andika icyo ushaka kutubwira"
              className="w-full rounded-lg border border-white/10 bg-[#101c35] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-teal-400"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
             Messages
            </label>

            <textarea
              id="message"
              required
              rows={5}
              maxLength={5000}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Andika ubutumwa bwawe..."
              className="w-full resize-y rounded-lg border border-white/10 bg-[#101c35] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-teal-400"
            />
          </div>

          {feedback.text && (
            <p
              role="status"
              aria-live="polite"
              className={`rounded-lg p-3 text-sm ${
                feedback.type === 'success'
                  ? 'bg-teal-400/10 text-teal-300'
                  : 'bg-red-400/10 text-red-300'
              }`}
            >
              {feedback.text}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-3.5 font-semibold text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Birimo kohereza...' : 'Ohereza ubutumwa'}
            <Send size={17} />
          </button>
        </form>
      </div>
    </main>
  )
}
