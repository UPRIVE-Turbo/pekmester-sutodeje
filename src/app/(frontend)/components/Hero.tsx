import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

import type { HeroSection as HeroSectionType } from '@/payload-types'
import { mediaAlt, mediaUrl } from '../lib/media'

export default function Hero({ data }: { data: HeroSectionType }) {
  return (
    <header className="relative min-h-[100dvh] flex items-end md:items-center pt-32 pb-24 px-6 md:px-12 overflow-hidden">
      <div className="grain-overlay" />
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          id="hero-img"
          src={mediaUrl(data.backgroundImage)}
          alt={mediaAlt(data.backgroundImage, 'Frissen sült ropogós kenyerek')}
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-ink/90 via-ink/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full reveal">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[1px] w-12 bg-wheat rounded-full" />
            <span className="text-wheat font-medium tracking-widest uppercase text-xs md:text-sm">
              {data.badgeText}
            </span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream font-medium leading-[1.05] tracking-tight mb-8 drop-shadow-lg">
            {data.titleLine1}
            <br />
            <span className="italic font-light text-wheat">{data.titleHighlight}</span>
            <br />
            {data.titleLine2}
          </h1>
          <p className="text-cream/90 text-lg md:text-xl font-light max-w-xl mb-10 leading-relaxed">
            {data.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={data.ctaLink || '#kinalat'}
              className="btn-physics inline-flex items-center justify-center gap-2 bg-wheat text-ink font-semibold px-8 py-4 rounded-full transition-colors duration-300 hover:bg-[#c99530]"
            >
              {data.ctaText}
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
