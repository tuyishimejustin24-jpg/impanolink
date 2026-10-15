import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Handshake } from 'lucide-react'

// const navItems = [
//   { label: 'Ahabanza', to: '/' },
//   { label: 'Serivisi', to: '/services' },
//   { label: 'Ibyerekeye', to: '/about' },
//   { label: 'Twandikire', to: '/contact' },
//   { label: 'Register', to: '/register' },
//   { label: 'Login', to: '/login' },
// ]
const navItems = [
  // { label: 'Home', to: '/' },
  { label: 'Home', to: '/home' },
  { label: 'Services', to: '/services' },
  { label: 'Group Chat', to: '/chat' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Register', to: '/register' },
  { label: 'Login', to: '/login' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `block rounded-lg px-3 py-2 text-sm transition ${
      isActive
        ? 'bg-teal-400/10 font-semibold text-teal-300'
        : 'text-slate-300 hover:bg-white/5 hover:text-white'
    }`

  return (
    <header className="relative z-20 border-b border-white/10 bg-[#101c35]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-400 text-[#101c35]">
            <Handshake size={21} />
          </span>
          Impano<span className="-ml-2 text-teal-300">Link</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/services"
            className="ml-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-500"
          >
            
         Find a Service

          </Link>
        </div>

        <button
          type="button"
          // aria-label={menuOpen ? 'Funga menu' : 'Fungura menu'} 
         aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded-lg border border-white/10 p-2 text-white md:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/10 px-4 py-3 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/services"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-lg bg-teal-600 px-4 py-3 text-center font-semibold text-white"
            >
            Find a Service

            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
