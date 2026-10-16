
import { useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { services } from "../data/services";
import ServiceCard from "../components/ServiceCard";

export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(
    searchParams.get("location") || ""
  );

  const filteredServices = useMemo(() => {
    const term = query.trim().toLowerCase();
    const place = location.trim().toLowerCase();

    return services.filter((service) => {
      const matchesQuery =
        !term ||
        [service.name, service.description, service.category].some(
          (value) => String(value || "").toLowerCase().includes(term)
        );

      const matchesLocation =
        !place ||
        String(service.location || "").toLowerCase().includes(place);

      return matchesQuery && matchesLocation;
    });
  }, [query, location]);

  function handleSearch(event) {
    event.preventDefault();

    const params = new URLSearchParams();

    if (query.trim()) params.set("q", query.trim());
    if (location.trim()) params.set("location", location.trim());

    setSearchParams(params);
  }

  function selectService(service) {
    const message = `I am interested in the ${service.name} service. I would like to learn more about it.`;

    navigate(`/contact?service=${encodeURIComponent(message)}`);
  }

  function clearSearch() {
    setQuery("");
    setLocation("");
    setSearchParams({});
  }

  return (
    <main className="min-h-[65vh] bg-[#101c35] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">
            Our Services
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Find the Right Service for You
          </h1>

          <p className="mt-3 leading-7 text-slate-400">
            Search for the skills you need and explore the services available
            on ImpanoLink.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="mt-8 grid gap-3 rounded-2xl border border-white/10 bg-[#1a2944] p-4 md:grid-cols-[1fr_1fr_auto]"
        >
          <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#101c35] px-3">
            <Search size={19} className="text-teal-300" />

            <span className="sr-only">Search services</span>

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Service name or skill..."
              className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />
          </label>

          <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#101c35] px-3">
            <MapPin size={19} className="text-teal-300" />

            <span className="sr-only">Location</span>

            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Enter a location..."
              className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />
          </label>

          <button
            type="submit"
            className="rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-600"
          >
            Search
          </button>
        </form>

        <div className="mt-8 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">
            Available Services
          </h2>

          <span className="text-sm text-slate-400">
            {filteredServices.length} found
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
            <Search
              className="mx-auto text-slate-500"
              size={32}
            />

            <h3 className="mt-4 font-semibold text-white">
              No Services Found
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Try another service name or change your location.
            </p>

            <button
              type="button"
              onClick={clearSearch}
              className="mt-4 text-sm font-semibold text-teal-300 hover:text-teal-200"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
