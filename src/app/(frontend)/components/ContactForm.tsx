'use client'

import { useRef, useState, useTransition } from 'react'

import { submitContactForm } from '../actions'

export default function ContactForm({
  title,
  description,
  successMessage,
}: {
  title: string
  description: string
  successMessage: string
}) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await submitContactForm(formData)
      if (result.success) {
        setStatus('success')
        formRef.current?.reset()
      } else {
        setStatus('error')
        setErrorMessage(result.error || 'Hiba történt. Próbáld újra később.')
      }
    })
  }

  return (
    <div className="w-full lg:w-5/12 p-10 md:p-16 flex flex-col justify-center bg-cream/30">
      <h2 className="font-serif text-3xl md:text-4xl text-wood mb-4">{title}</h2>
      <p className="text-dark/70 font-light mb-10">{description}</p>

      <form ref={formRef} action={handleSubmit} className="space-y-8">
        <div className="relative">
          <input type="text" name="name" id="name" className="input-line peer" placeholder=" " required />
          <label
            htmlFor="name"
            className="absolute left-0 top-3 text-dark/50 transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-wood peer-valid:-top-4 peer-valid:text-xs font-light pointer-events-none"
          >
            Teljes név
          </label>
        </div>

        <div className="relative">
          <input type="tel" name="phone" id="phone" className="input-line peer" placeholder=" " required />
          <label
            htmlFor="phone"
            className="absolute left-0 top-3 text-dark/50 transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-wood peer-valid:-top-4 peer-valid:text-xs font-light pointer-events-none"
          >
            Telefonszám (+36...)
          </label>
        </div>

        <div className="relative">
          <textarea
            name="message"
            id="message"
            rows={3}
            className="input-line peer resize-none"
            placeholder=" "
            required
          />
          <label
            htmlFor="message"
            className="absolute left-0 top-3 text-dark/50 transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-wood peer-valid:-top-4 peer-valid:text-xs font-light pointer-events-none"
          >
            Üzenet (Érdeklődés vagy rendelés)
          </label>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="btn-physics w-full bg-wood text-cream font-medium py-4 rounded-full mt-4 hover:bg-[#5e3c22] transition-colors focus:ring-4 focus:ring-wood/20 outline-none disabled:opacity-60"
        >
          {isPending ? 'Küldés...' : 'Üzenet küldése'}
        </button>

        {status === 'success' && (
          <p className="text-emerald-700 font-medium text-sm">{successMessage}</p>
        )}
        {status === 'error' && <p className="text-red-700 font-medium text-sm">{errorMessage}</p>}
      </form>
    </div>
  )
}
