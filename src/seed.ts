import { getPayload } from 'payload'

import config from './payload.config'

async function fetchImage(url: string, filename: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  const arrayBuffer = await res.arrayBuffer()
  return {
    data: Buffer.from(arrayBuffer),
    mimetype: 'image/jpeg',
    name: filename,
    size: arrayBuffer.byteLength,
  }
}

function relationId(value: unknown): number | undefined {
  if (value === null || value === undefined) return undefined
  if (typeof value === 'object' && 'id' in (value as Record<string, unknown>)) {
    return (value as { id: number }).id
  }
  return value as number
}

async function run() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const resetImages = process.argv.includes('--reset-images')

  const uploadImage = async (url: string, filename: string, alt: string) => {
    const file = await fetchImage(url, filename)
    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      file,
    })
    return doc.id
  }

  // Reset mode: figure out what's currently referenced so it can be deleted
  // *after* the globals/collections are repointed to freshly uploaded images
  // (deleting referenced media first would violate NOT NULL constraints).
  const oldMediaIds = new Set<number>()
  let galleryDocsToDelete: { id: number | string }[] = []

  if (resetImages) {
    const galleryDocs = await payload.find({ collection: 'gallery-images', limit: 100 })
    const heroBefore = await payload.findGlobal({ slug: 'hero-section' })
    const aboutBefore = await payload.findGlobal({ slug: 'about-section' })
    const settingsBefore = await payload.findGlobal({ slug: 'site-settings' })

    galleryDocsToDelete = galleryDocs.docs
    for (const item of galleryDocs.docs) {
      const id = relationId(item.image)
      if (id !== undefined) oldMediaIds.add(id)
    }
    const heroImageId = relationId(heroBefore?.backgroundImage)
    if (heroImageId !== undefined) oldMediaIds.add(heroImageId)
    const aboutImage1Id = relationId(aboutBefore?.image1)
    if (aboutImage1Id !== undefined) oldMediaIds.add(aboutImage1Id)
    const aboutImage2Id = relationId(aboutBefore?.image2)
    if (aboutImage2Id !== undefined) oldMediaIds.add(aboutImage2Id)
    const ogImageId = relationId(settingsBefore?.seo?.ogImage)
    if (ogImageId !== undefined) oldMediaIds.add(ogImageId)
  }

  console.log('Hero & Rólunk képek ellenőrzése...')

  const hero = await payload.findGlobal({ slug: 'hero-section' })
  const about = await payload.findGlobal({ slug: 'about-section' })

  let heroImage = resetImages ? undefined : relationId(hero?.backgroundImage)
  if (heroImage === undefined) {
    heroImage = await uploadImage(
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2400&auto=format&fit=crop',
      'hero-friss-kenyerek.jpg',
      'Frissen sült ropogós kenyerek',
    )
  }

  let aboutImage1 = resetImages ? undefined : relationId(about?.image1)
  if (aboutImage1 === undefined) {
    aboutImage1 = await uploadImage(
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=1400&auto=format&fit=crop',
      'rolunk-tesztagyuras.jpg',
      'Pékmester tésztát gyúr',
    )
  }

  let aboutImage2 = resetImages ? undefined : relationId(about?.image2)
  if (aboutImage2 === undefined) {
    aboutImage2 = await uploadImage(
      'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=1200&auto=format&fit=crop',
      'rolunk-kovasz-liszt.jpg',
      'Kovász és liszt',
    )
  }

  console.log('Hero szekció mentése...')
  await payload.updateGlobal({
    slug: 'hero-section',
    data: {
      badgeText: 'Hódmezővásárhely',
      titleLine1: 'Friss, ropogós,',
      titleHighlight: 'kézzel sütve',
      titleLine2: 'minden nap.',
      subtitle:
        'A Pékmester Sütödéje az igazi, hagyományos ízek és a megalkuvást nem tűrő minőség otthona. Kézműves pékáruink egyenesen a kemencéből.',
      ctaText: 'Nézd meg kínálatunkat',
      ctaLink: '#kinalat',
      backgroundImage: heroImage,
      marqueeItems: [
        { text: 'Frissen sütve' },
        { text: 'Hagyományos kovász' },
        { text: 'Házias ízvilág' },
        { text: 'Mesterséges adalékok nélkül' },
        { text: 'Helyi alapanyagok' },
      ],
    },
  })

  console.log('Rólunk szekció mentése...')
  await payload.updateGlobal({
    slug: 'about-section',
    data: {
      title: 'Hagyomány és szenvedély minden falatban.',
      paragraphs: [
        {
          text: 'A Pékmester Sütödéje nem csupán egy üzlet, hanem egy helyi intézmény Hódmezővásárhely szívében. Évtizedek óta hiszünk abban, hogy a jó kenyér elkészítéséhez nem kell más, csak kiváló minőségű liszt, tiszta víz, természetes kovász és rengeteg idő.',
        },
        {
          text: 'Minden éjjel, mikor a város még alszik, kemencéink már melegednek. Nincsenek mesterséges térfogatnövelők vagy siettetés. Kézműves pékjeink keze munkája nyomán születik meg az az utánozhatatlan illat és íz, amiért vásárlóink nap mint nap visszatérnek hozzánk.',
        },
      ],
      quote: 'A jó kenyér a lisztnél kezdődik, de a szívben érlelődik.',
      quoteAuthor: 'A Pékmester',
      image1: aboutImage1,
      image2: aboutImage2,
    },
  })

  console.log('Kapcsolat & elérhetőség mentése...')
  await payload.updateGlobal({
    slug: 'contact-info',
    data: {
      formTitle: 'Írj nekünk!',
      formDescription:
        'Kérdésed van, esetleg nagyobb rendelést adnál le? Küldj üzenetet, és hamarosan felvesszük veled a kapcsolatot.',
      formSuccessMessage: 'Köszönjük az üzenetet! Hamarosan válaszolunk.',
      phone: '+36 70 361 1028',
      email: 'vasarhelyicipo@gmail.com',
      facebookUrl: 'https://www.facebook.com/pekmester.sutodeje',
      mapEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2745.289139886259!2d20.3164993!3d46.4231804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47446f25db562725%3A0x6bba847c20c090be!2zSMOzZG1lesWRdsOhc8OhcmhlbHksIFRlbGVraSB1LiAxOCwgNjgwMA!5e0!3m2!1shu!2shu!4v1710000000000!5m2!1shu!2shu',
    },
  })

  console.log('Általános beállítások mentése...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Pékmester',
      navLinks: [
        { label: 'Kínálat', href: '#kinalat' },
        { label: 'Rólunk', href: '#rolunk' },
        { label: 'Üzleteink', href: '#uzletek' },
        { label: 'Kapcsolat', href: '#kapcsolat' },
      ],
      servicesTitle: 'Mindennapi kenyerünk',
      servicesDescription:
        'Pékmestereink hajnaltól dolgoznak, hogy a legjobb minőségű pékáru kerüljön a család asztalára. Válogass hagyományos és különleges termékeink közül.',
      servicesLinkText: 'Rendelés leadása',
      servicesLinkHref: '#kapcsolat',
      storesEyebrow: 'Hol találsz minket?',
      storesTitle: 'Üzleteink Hódmezővásárhelyen',
      galleryTitle: 'Képek a mindennapokból',
      galleryDescription:
        'Belepillantás a kulisszák mögé: ropogós héjak, foszlós bélzetek és szorgos kezek.',
      footerText: '© 2026 Pékmester Sütödéje. Hódmezővásárhely. Minden jog fenntartva.',
      seo: {
        metaTitle: 'Pékmester Sütödéje | Friss pékáru Hódmezővásárhelyen',
        metaDescription:
          'Friss, ropogós, kézzel sütött kenyér, péksütemény és sütemény Hódmezővásárhelyen. Három üzlet, mindennapi frissesség.',
        ogImage: heroImage,
      },
    },
  })

  if (resetImages && (galleryDocsToDelete.length > 0 || oldMediaIds.size > 0)) {
    console.log('Régi képek törlése...')
    for (const item of galleryDocsToDelete) {
      await payload.delete({ collection: 'gallery-images', id: item.id })
    }
    for (const id of oldMediaIds) {
      await payload.delete({ collection: 'media', id })
    }
  }

  console.log('Kínálat (Services) ellenőrzése...')
  const existingServices = await payload.find({ collection: 'services', limit: 1 })
  if (existingServices.totalDocs === 0) {
    const services = [
      {
        title: 'Kenyerek',
        description:
          'Kézműves, lassú érlelésű kovászos kenyerek, vastag, ropogós héjjal és puha, lyukacsos bélzettel.',
        icon: 'bread' as const,
        order: 1,
      },
      {
        title: 'Péksütemények',
        description:
          'Édes és sós reggeli finomságok. Vajas tészták, gazdag töltelékek, ahogy a nagymama is készítette.',
        icon: 'croissant' as const,
        order: 2,
      },
      {
        title: 'Sütemények',
        description:
          'Házias ízvilágú torták, piték és aprósütemények. Különleges alkalmakra vagy csak úgy, a kávé mellé.',
        icon: 'cake' as const,
        order: 3,
      },
      {
        title: 'Friss Pékáru',
        description:
          'Ropogós zsemlék, hagyományos vizes kiflik és teljes kiőrlésű alternatívák a mindennapi frissességért.',
        icon: 'heart' as const,
        order: 4,
      },
    ]
    for (const service of services) {
      await payload.create({ collection: 'services', data: service })
    }
  } else {
    console.log('Kínálat már létezik, kihagyva.')
  }

  console.log('Üzletek ellenőrzése...')
  const existingStores = await payload.find({ collection: 'stores', limit: 1 })
  if (existingStores.totalDocs === 0) {
    const stores = [
      {
        name: 'Teleki utcai Főüzlet',
        subtitle: 'Sütöde & Mintabolt',
        address: '6800 Hódmezővásárhely, Teleki u. 18.',
        openingHours: [
          { days: 'Hétfő - Péntek', hours: '05:30 - 18:00' },
          { days: 'Szombat', hours: '06:00 - 13:00' },
          { days: 'Vasárnap', hours: 'Zárva' },
        ],
        showOpenBadge: true,
        order: 1,
      },
      {
        name: 'Makói úti Péküzlet',
        subtitle: 'Frissen helyben sütve',
        address: '6800 Hódmezővásárhely, Makói út 23.',
        openingHours: [
          { days: 'Hétfő - Péntek', hours: '06:00 - 17:00' },
          { days: 'Szombat', hours: '06:00 - 12:00' },
          { days: 'Vasárnap', hours: 'Zárva' },
        ],
        showOpenBadge: false,
        order: 2,
      },
      {
        name: 'Szabadság téri Bolt',
        subtitle: 'Pékáru és Kávézó',
        address: '6800 Hódmezővásárhely, Szabadság tér 58.',
        openingHours: [
          { days: 'Hétfő - Péntek', hours: '06:30 - 18:00' },
          { days: 'Szombat', hours: '07:00 - 13:00' },
          { days: 'Vasárnap', hours: 'Zárva' },
        ],
        showOpenBadge: false,
        order: 3,
      },
    ]
    for (const store of stores) {
      await payload.create({ collection: 'stores', data: store })
    }
  } else {
    console.log('Üzletek már léteznek, kihagyva.')
  }

  console.log('Galéria ellenőrzése...')
  const existingGallery = await payload.find({ collection: 'gallery-images', limit: 1 })
  if (existingGallery.totalDocs === 0) {
    console.log('Galéria képek feltöltése...')
    const galleryImages = [
      {
        url: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=1400&auto=format&fit=crop',
        filename: 'galeria-kiflik.jpg',
        alt: 'Friss kiflik a tepsiben',
        order: 1,
      },
      {
        url: 'https://images.unsplash.com/photo-1557308536-ee471ef2c390?q=80&w=1000&auto=format&fit=crop',
        filename: 'galeria-csokis-sutemeny.jpg',
        alt: 'Csokis péksütemény',
        order: 2,
      },
      {
        url: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1000&auto=format&fit=crop',
        filename: 'galeria-bagettek.jpg',
        alt: 'Bagettek a kosárban',
        order: 3,
      },
      {
        url: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?q=80&w=1000&auto=format&fit=crop',
        filename: 'galeria-liszt-szoras.jpg',
        alt: 'Liszt szórása a tésztára',
        order: 4,
      },
      {
        url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1000&auto=format&fit=crop',
        filename: 'galeria-sutemeny.jpg',
        alt: 'Házi sütemény',
        order: 5,
      },
    ]
    for (const item of galleryImages) {
      const imageId = await uploadImage(item.url, item.filename, item.alt)
      await payload.create({
        collection: 'gallery-images',
        data: { image: imageId, alt: item.alt, order: item.order },
      })
    }
  } else {
    console.log('Galéria már létezik, kihagyva.')
  }

  console.log('Seed kész!')
}

try {
  await run()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exitCode = 1
  process.exit()
}
