import { Link } from 'react-router-dom'
import { Handshake, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#0c162b]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-xl font-bold">
            <Handshake className="text-teal-300" />
         Impano   <span className="-ml-2 text-teal-300">Link</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
            Skills Into Opportunities.We connect talented people with
             those who need their services.
          </p>
        </div>

        <div className="md:justify-self-end">
          <h3 className="font-semibold text-white">Communities</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
            <Link className="hover:text-teal-300" to="/">Home</Link>
            <Link className="hover:text-teal-300" to="/services">Services</Link>
            <Link className="hover:text-teal-300" to="/about">About</Link>
            <Link className="hover:text-teal-300" to="/contact">Contact Us</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-500">
        <span>© {new Date().getFullYear()} ImpanoLink. Everything is saved.</span>
        <span className="mx-2">·</span>
        <span className="inline-flex items-center gap-1">
        Made with Love ❤️ <Heart size={12} className="text-teal-300" />
        </span>
      </div>
    </footer>
  )
}
