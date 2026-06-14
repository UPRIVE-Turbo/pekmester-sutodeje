import { SealCheck } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

import type { AboutSection as AboutSectionType } from '@/payload-types'
import { mediaAlt, mediaUrl } from '../lib/media'

export default function About({ data }: { data: AboutSectionType }) {
  return (
    <section id="rolunk" className="py-24 md:py-32 border-y border-wood/10 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <div className="w-full lg:w-1/2 relative reveal">
          <div className="img-wrap w-[85%] aspect-[3/4] relative z-10 shadow-2xl shadow-ink/10">
            <Image
              src={mediaUrl(data.image1)}
              alt={mediaAlt(data.image1, 'Pékmester tésztát gyúr')}
              fill
              sizes="(max-width: 1024px) 85vw, 42vw"
              className="object-cover"
            />
          </div>
          <div className="img-wrap absolute! bottom-[-10%] right-0 w-1/2 aspect-square z-20 shadow-xl border-8 border-white">
            <Image
              src={mediaUrl(data.image2)}
              alt={mediaAlt(data.image2, 'Kovász és liszt')}
              fill
              sizes="(max-width: 1024px) 42vw, 21vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 reveal delay-200 mt-12 lg:mt-0">
          <h2 className="font-serif text-4xl md:text-5xl text-wood mb-8 leading-tight">{data.title}</h2>

          <div className="space-y-6 text-dark/80 font-light text-lg leading-relaxed">
            {data.paragraphs?.map((p, i) => <p key={i}>{p.text}</p>)}
          </div>

          {data.quote && (
            <div className="mt-12 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center text-wood border border-wood/20">
                <SealCheck weight="fill" className="text-3xl" />
              </div>
              <div>
                <p className="font-serif italic text-wood text-xl">&quot;{data.quote}&quot;</p>
                {data.quoteAuthor && (
                  <span className="text-sm text-dark/50 uppercase tracking-widest mt-1 block">
                    {data.quoteAuthor}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
