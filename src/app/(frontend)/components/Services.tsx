import { ArrowRight, Bread, Cake, Coffee, Cookie, Grains, HandHeart } from '@phosphor-icons/react/dist/ssr'

import type { Service } from '@/payload-types'

const ICON_MAP: Record<Service['icon'], React.ComponentType<{ className?: string }>> = {
  bread: Bread,
  croissant: Cookie,
  cake: Cake,
  heart: HandHeart,
  wheat: Grains,
  coffee: Coffee,
}

const DELAYS = ['delay-100', 'delay-200', 'delay-300', 'delay-400']

export default function Services({
  title,
  description,
  linkText,
  linkHref,
  services,
}: {
  title: string
  description: string
  linkText: string
  linkHref: string
  services: Service[]
}) {
  return (
    <section id="kinalat" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 reveal">
        <div className="max-w-2xl">
          <h2 className="font-serif text-4xl md:text-5xl text-wood mb-4">{title}</h2>
          <p className="text-dark/70 text-lg font-light leading-relaxed">{description}</p>
        </div>
        <a href={linkHref} className="inline-flex items-center gap-2 text-wood font-medium hover:text-wheat transition-colors group">
          {linkText} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, i) => {
          const Icon = ICON_MAP[service.icon]
          return (
            <div
              key={service.id}
              className={`group flex flex-col bg-transparent border border-wood/10 p-8 rounded-[2rem] hover:bg-white hover:border-wood/0 hover:shadow-[0_20px_40px_-15px_rgba(122,78,45,0.1)] transition-all duration-500 reveal cursor-default ${DELAYS[i % DELAYS.length]}`}
            >
              <div className="w-14 h-14 rounded-full bg-cream border border-wood/20 flex items-center justify-center mb-6 text-wood group-hover:bg-wheat group-hover:text-ink group-hover:border-transparent transition-colors duration-300">
                <Icon className="text-2xl" />
              </div>
              <h3 className="font-serif text-2xl text-wood mb-3">{service.title}</h3>
              <p className="text-dark/70 font-light text-sm flex-1">{service.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
