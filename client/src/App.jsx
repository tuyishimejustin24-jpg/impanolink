// import { useEffect } from 'react'
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Outlet,
//   useLocation,
// } from 'react-router-dom'

// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
// import Home from './pages/Home'
// import About from './pages/About'
// import Services from './pages/Services'
// import Contact from './pages/Contact'

// function MainLayout() {
//   const location = useLocation()

//   useEffect(() => {
//     window.scrollTo(0, 0)
//   }, [location.pathname])

//   return (
//     <div className="flex min-h-screen flex-col bg-[#101c35] text-slate-100">
//       <Navbar />

//       <div className="flex-1">
//         <Outlet />
//       </div>

//       <Footer />
//     </div>
//   )
// }

// function AppContent() {
//   useEffect(() => {
//     document.title = 'ImpanoLink | Skills Into Opportunities'
//   }, [])

//   return (
//     <Routes>
//       <Route element={<MainLayout />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />

//         <Route
//           path="*"
//           element={
//             <main className="mx-auto min-h-[60vh] px-4 py-20 text-center">
//               <h1 className="text-3xl font-bold text-white">
//                 Page ntibonetse (404)
//               </h1>
//               <p className="mt-3 text-slate-400">
//                 Iyo page ntibaho cyangwa URL si yo.
//               </p>
//               <a
//                 href="/"
//                 className="mt-6 inline-block rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-600"
//               >
//                 Subira ahabanza
//               </a>
//             </main>
//           }
//         />
//       </Route>
//     </Routes>
//   )
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <AppContent />
//     </BrowserRouter>
//   )
// }

// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import { useEffect } from 'react'
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Outlet,
//   useLocation,
// } from 'react-router-dom'

// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
// import Home from './pages/Home'
// import About from './pages/About'
// import Services from './pages/Services'
// import Contact from './pages/Contact'

// function MainLayout() {
//   const location = useLocation()

//   useEffect(() => {
//     // Subira hejuru iyo uhinduye page
//     // Ariko niba URL ifite #founder, jya kuri Founder
//     if (location.hash) {
//       const element = document.getElementById(
//         location.hash.slice(1)
//       )

//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth' })
//         return
//       }
//     }

//     window.scrollTo(0, 0)
//   }, [location.pathname, location.hash])

//   return (
//     <div className="flex min-h-screen flex-col bg-[#101c35] text-slate-100">
//       <Navbar />

//       <div className="flex-1">
//         <Outlet />
//       </div>

//       <Footer />
//     </div>
//   )
// }

// function AppContent() {
//   useEffect(() => {
//     document.title = 'ImpanoLink | Skills Into Opportunities'
//   }, [])

//   return (
//     <Routes>
//       <Route element={<MainLayout />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route
//           path="*"
//           element={
//             <main className="mx-auto min-h-[60vh] px-4 py-20 text-center">
//               <h1 className="text-3xl font-bold text-white">
//                 Page ntibonetse (404)
//               </h1>

//               <p className="mt-3 text-slate-400">
//                 Iyo page ntibaho cyangwa URL si yo.
//               </p>

//               <a
//                 href="/"
//                 className="mt-6 inline-block rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-600"
//               >
//                 Subira ahabanza
//               </a>
//             </main>
//           }
//         />
//       </Route>
//     </Routes>
//   )
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <AppContent />
//     </BrowserRouter>
//   )
// }

import { useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
  Navigate,
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import GroupChat from "./pages/GroupChat";

function MainLayout() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(
        location.hash.slice(1)
      )

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }

    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return (
    <div className="flex min-h-screen flex-col bg-[#101c35] text-slate-100">
      <Navbar />

      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

function StartPage() {
  const token = sessionStorage.getItem('impanolink_token')

  return (
    <Navigate
      to={token ? '/profile' : '/register'}
      replace
    />
  )
}

function AppContent() {
  useEffect(() => {
    document.title = 'ImpanoLink | Skills Into Opportunities'
  }, [])

  return (
    // <Routes>

    //   <Route path="/" element={<StartPage />} />
    //   <Route path="/register" element={<Register />} />
    //   <Route path="/login" element={<Login />} />

    //     <Route element={<MainLayout />}>
    //     <Route path="/profile" element={<Profile />} />
    //     <Route path="/services" element={<Services />} />
    //     <Route path="/about" element={<About />} />
    //     <Route path="/contact" element={<Contact />} />
    //     <Route path="/chat" element={<GroupChat />} />
    //     <Route path="/home" element={<Home />} />
    //     <Route

    //       path="*"
    //       element={
    //         <main className="mx-auto min-h-[60vh] px-4 py-20 text-center">
    //           <h1 className="text-3xl font-bold text-white">
    //             Page ntibonetse (404)
    //           </h1>

    //           <p className="mt-3 text-slate-400">
    //             Iyo page ntibaho cyangwa URL si yo.
    //           </p>

    //           <a
    //             href="/"
    //             className="mt-6 inline-block rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-600"
    //           >
    //             Subira ahabanza
    //           </a>
    //         </main>
    //       }
    //     />
    //   </Route>
    // </Routes>


    
<Routes>
  <Route path="/" element={<StartPage />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />

  <Route element={<MainLayout />}>
    <Route path="/profile" element={<Profile />} />
    <Route path="/services" element={<Services />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/chat" element={<GroupChat />} />
    <Route path="/home" element={<Home />} />

    <Route
      path="*"
      element={
        <main className="mx-auto min-h-[60vh] px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-white">
         Page Not Found (404)
          </h1>
          <p className="mt-3 text-slate-400">
      This page does not exist, or the URL is incorrect
          </p>
          <a
            href="/"
            className="mt-6 inline-block rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-600"
          >
         Go Back to Home
          </a>
        </main>
      }
    />
  </Route>
</Routes>


  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}