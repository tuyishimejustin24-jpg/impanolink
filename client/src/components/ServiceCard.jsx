import { ArrowUpRight } from 'lucide-react'

export default function ServiceCard({ service, onSelect }) {
  const Icon = service.icon

  return (
    <button
      type="button"
      onClick={() => onSelect(service)}
      className="group flex min-h-28 w-full flex-col items-start rounded-xl border border-white/5 bg-[#243653] p-4 text-left transition duration-200 hover:-translate-y-1 hover:border-teal-300/40 hover:bg-[#2b4163] focus:outline-none focus:ring-2 focus:ring-teal-400"
    >
      <div className="mb-3 flex w-full items-center justify-between">
        <Icon size={21} className="text-teal-300" />
        <ArrowUpRight
          size={17}
          className="text-slate-400 transition group-hover:text-teal-300"
        />
      </div>

      <h3 className="font-semibold text-white">{service.name}</h3>

      <p className="mt-1 text-sm leading-5 text-slate-300">
        {service.description}
      </p>
    </button>
  )
}
