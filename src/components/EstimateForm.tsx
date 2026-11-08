import { useState } from 'react'
import { site } from '../site.config'
import { track } from '../lib/track'

export function EstimateForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = (await res.json()) as { ok?: boolean; error?: string }
      if (!res.ok || !json.ok) throw new Error(json.error || 'Something went wrong')
      track('estimate_requested', { service: String(data.service || ''), source: 'estimate_form' })
      form.reset()
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
    }
  }

  const input = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900'

  if (status === 'done') {
    return (
      <p className="mt-6 rounded-lg bg-green-50 p-4 text-green-800">
        Thanks! We received your request and will contact you within one business day.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid max-w-xl gap-3">
      <h3 className="text-xl font-semibold">Request an Estimate</h3>
      <input name="name" required placeholder="Full name" className={input} />
      <input name="email" type="email" required placeholder="Email" className={input} />
      <input name="phone" type="tel" placeholder="Phone" className={input} />
      <input name="address" placeholder="Property address" className={input} />
      <select name="service" className={input} defaultValue={site.services[0].id}>
        {site.services.map((s) => (
          <option key={s.id} value={s.id}>{s.title}</option>
        ))}
      </select>
      <textarea name="message" rows={3} placeholder="Tell us about your roof" className={input} />
      {status === 'error' && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-lg px-6 py-3 font-semibold text-white disabled:opacity-60"
        style={{ backgroundColor: site.accent }}
      >
        {status === 'sending' ? 'Sending…' : 'Request an Estimate'}
      </button>
    </form>
  )
}