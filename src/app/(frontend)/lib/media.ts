import type { Media } from '@/payload-types'

export function mediaUrl(media: number | Media | null | undefined): string {
  if (media && typeof media === 'object' && media.url) {
    return media.url
  }
  return ''
}

export function mediaAlt(media: number | Media | null | undefined, fallback = ''): string {
  if (media && typeof media === 'object' && media.alt) {
    return media.alt
  }
  return fallback
}
