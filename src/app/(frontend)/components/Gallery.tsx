import Image from 'next/image'

import type { GalleryImage } from '@/payload-types'
import { mediaAlt, mediaUrl } from '../lib/media'

const SPANS = [
  'md:col-span-2 md:row-span-1',
  '',
  '',
  'md:col-span-1',
  'md:col-span-1',
]
const DELAYS = ['delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500']

export default function Gallery({
  title,
  description,
  images,
}: {
  title: string
  description: string
  images: GalleryImage[]
}) {
  return (
    <section id="galeria" className="py-24 md:py-32 bg-ink text-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 reveal">
          <h2 className="font-serif text-4xl md:text-5xl text-wheat">{title}</h2>
          <p className="text-cream/60 font-light mt-4 md:mt-0 max-w-sm">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-[auto] md:h-[600px]">
          {images.map((img, i) => (
            <div
              key={img.id}
              className={`img-wrap rounded-none md:rounded-[1.5rem] reveal relative min-h-[250px] md:min-h-0 ${SPANS[i % SPANS.length]} ${DELAYS[i % DELAYS.length]}`}
            >
              <Image
                src={mediaUrl(img.image)}
                alt={mediaAlt(img.image, img.alt)}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
