import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, MapPin } from 'lucide-react'
import { services } from '../data/services'
import ServiceCard from '../components/ServiceCard'

export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [location, setLocation] = useState(searchParams.get('location') || '')

  const filteredServices = useMemo(() => {
    const term = query.trim().toLowerCase()
    const place = location.trim().toLowerCase()

    return services.filter((service) => {
      const matchesQuery =
        !term ||
        [service.name, service.description, service.category].some((value) =>
          value.toLowerCase().includes(term),
        )

      const matchesLocation =
        !place || service.location.toLowerCase().includes(place)

      return matchesQuery && matchesLocation
    })
  }, [query, location])

  function handleSearch(event) {
    event.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (location.trim()) params.set('location', location.trim())
    setSearchParams(params)
  }

  function selectService(service) {
    const message = `Nahisemo serivisi ya ${service.name}. Ndashaka kumenya amakuru yayo.`
    window.location.href = `/contact?service=${encodeURIComponent(message)}`
  }

  return (
    <main className="mx-auto min-h-[65vh] max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">
          Serivisi zacu
        </p>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Shaka serivisi ikubereye
        </h1>
        <p className="mt-3 leading-7 text-slate-400">
          Shakisha ubumenyi ukeneye, urebe ibyiciro bya serivisi ziboneka kuri
          ImpanoLink.
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="mt-8 grid gap-3 rounded-2xl border border-white/10 bg-[#1a2944] p-4 md:grid-cols-[1fr_1fr_auto]"
      >
        <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#101c35] px-3">
          <Search size={19} className="text-teal-300" />
          <span className="sr-only">Shakisha serivisi</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Izina rya serivisi..."
            className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
          />
        </label>

        <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#101c35] px-3">
          <MapPin size={19} className="text-teal-300" />
          <span className="sr-only">Aho uherereye</span>
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Aho uherereye..."
            className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
          />
        </label>

        <button
          type="submit"
          className="rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-600"
        >
          Shakisha
        </button>
      </form>

      <div className="mt-8 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">
          Serivisi ziboneka
        </h2>
        <span className="text-sm text-slate-400">
          {filteredServices.length} zabonetse
        </span>
      </div>

      {filteredServices.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={selectService}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-dashed border-white/15 px-5 py-12 text-center">
          <Search className="mx-auto text-slate-500" size={32} />
          <h3 className="mt-4 font-semibold text-white">
            Nta serivisi ibonetse
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Gerageza irindi zina rya serivisi cyangwa uhindure aho ushakira.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setLocation('')
              setSearchParams({})
            }}
            className="mt-4 text-sm font-semibold text-teal-300 hover:text-teal-200"
          >
            Siba ibyo washakishije
          </button>
        </div>
      )}
    </main>
  )
}
