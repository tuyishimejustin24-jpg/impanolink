// import { useState } from 'react'
// import { Link, NavLink } from 'react-router-dom'
// import { Menu, X, Handshake } from 'lucide-react'
// 1
// // const navItems = [
// //   { label: 'Ahabanza', to: '/' },
// //   { label: 'Serivisi', to: '/services' },
// //   { label: 'Ibyerekeye', to: '/about' },
// //   { label: 'Twandikire', to: '/contact' },
// //   { label: 'Register', to: '/register' },
// //   { label: 'Login', to: '/login' },
// // ]
// const navItems = [
//   // { label: 'Home', to: '/' },
//   { label: 'Home', to: '/home' },
//   { label: 'Services', to: '/services' },
//   { label: 'Group Chat', to: '/chat' },
//   { label: 'About Us', to: '/about' },
//   { label: 'Contact Us', to: '/contact' },
//   { label: 'Register', to: '/register' },
//   { label: 'Login', to: '/login' },
// ]

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false)

//   const linkClass = ({ isActive }) =>
//     `block rounded-lg px-3 py-2 text-sm transition ${
//       isActive
//         ? 'bg-teal-400/10 font-semibold text-teal-300'
//         : 'text-slate-300 hover:bg-white/5 hover:text-white'
//     }`

//   return (
//     <header className="relative z-20 border-b border-white/10 bg-[#101c35]">
//       <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
//         <Link
//           to="/"
//           onClick={() => setMenuOpen(false)}
//           className="flex items-center gap-2 text-xl font-bold tracking-tight text-white"
//         >
//           <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-400 text-[#101c35]">
//             <Handshake size={21} />
//           </span>
//           Impano<span className="-ml-2 text-teal-300">Link</span>
//         </Link>

//         <div className="hidden items-center gap-2 md:flex">
//           {navItems.map((item) => (
//             <NavLink key={item.to} to={item.to} className={linkClass}>
//               {item.label}
//             </NavLink>
//           ))}
//           <Link
//             to="/services"
//             className="ml-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-500"
//           >
            
//          Find a Service

//           </Link>
//         </div>

//         <button
//           type="button"
//           // aria-label={menuOpen ? 'Funga menu' : 'Fungura menu'} 
//          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
//           aria-expanded={menuOpen}
//           onClick={() => setMenuOpen((open) => !open)}
//           className="rounded-lg border border-white/10 p-2 text-white md:hidden"
//         >
//           {menuOpen ? <X size={22} /> : <Menu size={22} />}
//         </button>
//       </nav>

//       {menuOpen && (
//         <div className="border-t border-white/10 px-4 py-3 md:hidden">
//           <div className="mx-auto flex max-w-7xl flex-col gap-1">
//             {navItems.map((item) => (
//               <NavLink
//                 key={item.to}
//                 to={item.to}
//                 className={linkClass}
//                 onClick={() => setMenuOpen(false)}
//               >
//                 {item.label}
//               </NavLink>
//             ))}
//             <Link
//               to="/services"
//               onClick={() => setMenuOpen(false)}
//               className="mt-2 rounded-lg bg-teal-600 px-4 py-3 text-center font-semibold text-white"
//             >
//             Find a Service

//             </Link>
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }



import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Handshake, Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'


const navItems = [
  { key: 'home', to: '/home' },
  { key: 'services', to: '/services' },

  { key: 'about', to: '/about' },
  { key: 'contact', to: '/contact' },
]


const navLabels = {
  home: 'navbar.home',
  services: 'navbar.services',
  groupChat: 'navbar.groupChat',
  about: 'navbar.about',
  contact: 'navbar.contact',
  register: 'navbar.register',
  login: 'navbar.login',
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, i18n } = useTranslation()

  const currentLanguage = i18n.resolvedLanguage || i18n.language
  const isKinyarwanda = currentLanguage.startsWith('rw')

  const toggleLanguage = () => {
    const nextLanguage = isKinyarwanda ? 'en' : 'rw'
    i18n.changeLanguage(nextLanguage)
    localStorage.setItem('impanolink_language', nextLanguage)
  }

  const linkClass = ({ isActive }) =>
    `block rounded-lg px-3 py-2 text-sm transition ${
      isActive
        ? 'bg-teal-400/10 font-semibold text-teal-300'
        : 'text-slate-300 hover:bg-white/5 hover:text-white'
    }`

  const languageButton = (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={isKinyarwanda ? 'Switch to English' : 'Hindura mu Kinyarwanda'}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-teal-400/30 px-3 py-2 text-sm font-semibold text-teal-200 transition hover:bg-teal-400/10"
    >
      <Languages size={17} />
      {isKinyarwanda ? '🇷🇼 Kinyarwanda' : '🇬🇧 English'}
    </button>
  )

  return (
    <header className="relative z-20 border-b border-white/10 bg-[#101c35]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex shrink-0 items-center gap-2 text-xl font-bold tracking-tight text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-400 text-[#101c35]">
            <Handshake size={21} />
          </span>
          Impano<span className="-ml-2 text-teal-300">Link</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {t(navLabels[item.key])}
            </NavLink>
          ))}

          <Link
            to="/services"
            className="ml-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-500"
          >
            {t('navbar.findService')}
          </Link>

          {languageButton}
        </div>

        <button
          type="button"
          aria-label={menuOpen ? t('navbar.closeMenu') : t('navbar.openMenu')}
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
                {t(navLabels[item.key])}
              </NavLink>
            ))}

            <Link
              to="/services"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-lg bg-teal-600 px-4 py-3 text-center font-semibold text-white"
            >
              {t('navbar.findService')}
            </Link>

            <div className="mt-2">
              {languageButton}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
