import { Clock, MapPin } from '@phosphor-icons/react/dist/ssr'

import type { Store } from '@/payload-types'

const DELAYS = ['delay-100', 'delay-200', 'delay-300']

export default function Stores({
  eyebrow,
  title,
  stores,
}: {
  eyebrow: string
  title: string
  stores: Store[]
}) {
  return (
    <section id="uzletek" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16 reveal">
        <span className="text-wheat font-medium tracking-widest uppercase text-sm mb-2 block">{eyebrow}</span>
        <h2 className="font-serif text-4xl md:text-5xl text-wood mb-4">{title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stores.map((store, i) => (
          <div
            key={store.id}
            className={`bg-white rounded-[2rem] p-8 border border-wood/5 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(122,78,45,0.08)] transition-all duration-300 relative overflow-hidden group reveal ${DELAYS[i % DELAYS.length]}`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-wheat/5 rounded-bl-[100%] transition-transform group-hover:scale-110" />
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-serif text-2xl text-wood">{store.name}</h3>
                {store.subtitle && <p className="text-dark/60 font-light mt-1">{store.subtitle}</p>}
              </div>
              {store.showOpenBadge && (
                <span className="relative flex h-3 w-3 mt-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
              )}
            </div>

            <div className="space-y-4 font-light text-dark/80 relative z-10">
              <div className="flex items-start gap-3">
                <MapPin className="text-wood text-xl mt-0.5" />
                <span>{store.address}</span>
              </div>
              {store.openingHours && store.openingHours.length > 0 && (
                <div className="flex items-start gap-3">
                  <Clock className="text-wood text-xl mt-0.5" />
                  <div>
                    {store.openingHours.map((row, idx) => (
                      <span
                        key={idx}
                        className={`block ${row.hours.toLowerCase() === 'zárva' ? 'text-dark/50' : ''}`}
                      >
                        {row.days}: {row.hours}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
