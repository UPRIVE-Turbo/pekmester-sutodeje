import { EnvelopeSimple, FacebookLogo, Grains } from '@phosphor-icons/react/dist/ssr'

import type { ContactInfo } from '@/payload-types'

export default function Footer({
  siteName,
  footerText,
  contact,
}: {
  siteName: string
  footerText: string
  contact: ContactInfo
}) {
  return (
    <footer className="border-t border-wood/20 py-12 px-6 md:px-12 bg-cream">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-serif font-bold text-2xl text-wood flex items-center gap-2">
          <Grains weight="fill" className="text-wheat" />
          {siteName}
        </div>

        <div className="text-dark/50 text-sm font-light text-center md:text-left">{footerText}</div>

        <div className="flex gap-4">
          {contact.facebookUrl && (
            <a
              href={contact.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-wood/20 flex items-center justify-center text-wood hover:bg-wood hover:text-cream transition-colors duration-300"
            >
              <FacebookLogo className="text-xl" />
            </a>
          )}
          <a
            href={`mailto:${contact.email}`}
            className="w-10 h-10 rounded-full border border-wood/20 flex items-center justify-center text-wood hover:bg-wood hover:text-cream transition-colors duration-300"
          >
            <EnvelopeSimple className="text-xl" />
          </a>
        </div>
      </div>
    </footer>
  )
}
