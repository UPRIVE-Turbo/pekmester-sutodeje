import { EnvelopeSimple, FacebookLogo, Phone } from '@phosphor-icons/react/dist/ssr'

import type { ContactInfo } from '@/payload-types'
import ContactForm from './ContactForm'

export default function ContactSection({ data }: { data: ContactInfo }) {
  const telHref = `tel:${(data.phone || '').replace(/\s+/g, '')}`

  return (
    <section id="kapcsolat" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="bg-white rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(122,78,45,0.05)] overflow-hidden flex flex-col lg:flex-row reveal border border-wood/5">
        <ContactForm
          title={data.formTitle || 'Írj nekünk!'}
          description={data.formDescription || ''}
          successMessage={data.formSuccessMessage || 'Köszönjük az üzenetet!'}
        />

        <div className="w-full lg:w-7/12 bg-wood text-cream flex flex-col map-container relative">
          <div className="p-10 md:p-16 flex flex-col md:flex-row gap-10 z-10 bg-wood/90 backdrop-blur-sm border-b border-white/10">
            <div className="flex-1">
              <h4 className="font-serif text-xl text-wheat mb-4">Elérhetőségek</h4>
              <ul className="space-y-4 font-light text-cream/90">
                <li className="flex items-center gap-3">
                  <Phone className="text-wheat text-xl" />
                  <a href={telHref} className="hover:text-white transition-colors">
                    {data.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <EnvelopeSimple className="text-wheat text-xl" />
                  <a href={`mailto:${data.email}`} className="hover:text-white transition-colors">
                    {data.email}
                  </a>
                </li>
                {data.facebookUrl && (
                  <li className="flex items-center gap-3">
                    <FacebookLogo className="text-wheat text-xl" />
                    <a
                      href={data.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      /pekmester.sutodeje
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {data.mapEmbedUrl && (
            <div className="flex-1 min-h-[300px] relative overflow-hidden bg-ink">
              <iframe
                src={data.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-filter"
                title="Térkép"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
