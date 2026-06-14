import type { Metadata } from 'next'
import { Bitter, Outfit } from 'next/font/google'
import React from 'react'

import { getPayload } from 'payload'
import config from '@/payload.config'
import './styles.css'

const bitter = Bitter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-bitter',
  weight: ['300', '400', '500', '600', '700'],
})

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600'],
})

export async function generateMetadata(): Promise<Metadata> {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const settings = await payload.findGlobal({ slug: 'site-settings' })

  return {
    title: settings?.seo?.metaTitle || 'Pékmester Sütödéje | Hódmezővásárhely',
    description:
      settings?.seo?.metaDescription ||
      'Friss, ropogós, kézzel sütött pékáru Hódmezővásárhelyen. Kenyerek, péksütemények, sütemények.',
    openGraph: {
      title: settings?.seo?.metaTitle || 'Pékmester Sütödéje | Hódmezővásárhely',
      description: settings?.seo?.metaDescription || undefined,
      images: settings?.seo?.ogImage && typeof settings.seo.ogImage === 'object' && settings.seo.ogImage.url
        ? [{ url: settings.seo.ogImage.url }]
        : undefined,
      locale: 'hu_HU',
      type: 'website',
    },
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="hu" className={`${bitter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-dark bg-cream leading-relaxed selection:bg-wheat selection:text-dark">
        {children}
      </body>
    </html>
  )
}
