import { getPayload } from 'payload'

import config from '@/payload.config'
import About from './components/About'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Navbar from './components/Navbar'
import ScrollAnimations from './components/ScrollAnimations'
import Services from './components/Services'
import Stores from './components/Stores'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [hero, about, contact, settings, services, stores, gallery] = await Promise.all([
    payload.findGlobal({ slug: 'hero-section' }),
    payload.findGlobal({ slug: 'about-section' }),
    payload.findGlobal({ slug: 'contact-info' }),
    payload.findGlobal({ slug: 'site-settings' }),
    payload.find({ collection: 'services', sort: 'order', limit: 100 }),
    payload.find({ collection: 'stores', sort: 'order', limit: 100 }),
    payload.find({ collection: 'gallery-images', sort: 'order', limit: 100 }),
  ])

  return (
    <>
      <ScrollAnimations />
      <Navbar siteName={settings.siteName} navLinks={settings.navLinks || []} />
      <Hero data={hero} />
      <Marquee items={(hero.marqueeItems || []).map((item) => item.text)} />
      <Services
        title={settings.servicesTitle || ''}
        description={settings.servicesDescription || ''}
        linkText={settings.servicesLinkText || ''}
        linkHref={settings.servicesLinkHref || '#kapcsolat'}
        services={services.docs}
      />
      <About data={about} />
      <Stores
        eyebrow={settings.storesEyebrow || ''}
        title={settings.storesTitle || ''}
        stores={stores.docs}
      />
      <Gallery
        title={settings.galleryTitle || ''}
        description={settings.galleryDescription || ''}
        images={gallery.docs}
      />
      <ContactSection data={contact} />
      <Footer siteName={settings.siteName} footerText={settings.footerText || ''} contact={contact} />
    </>
  )
}

export const dynamic = 'force-dynamic'