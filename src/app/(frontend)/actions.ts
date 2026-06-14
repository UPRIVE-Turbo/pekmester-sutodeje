'use server'

import { getPayload } from 'payload'

import config from '@/payload.config'

export type ContactFormResult = {
  success: boolean
  error?: string
}

export async function submitContactForm(formData: FormData): Promise<ContactFormResult> {
  const name = String(formData.get('name') || '').trim()
  const phone = String(formData.get('phone') || '').trim()
  const message = String(formData.get('message') || '').trim()

  if (!name || !phone || !message) {
    return { success: false, error: 'Kérjük, tölts ki minden mezőt.' }
  }

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  await payload.create({
    collection: 'form-submissions',
    data: { name, phone, message },
  })

  return { success: true }
}
