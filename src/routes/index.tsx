import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { site } from '../site.config'
import { track } from '../lib/track'
import { EstimateForm } from '../components/EstimateForm'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [openId, setOpenId] = useState<string | null>(null)
  const accent = { color: site.accent }
  const accentBg = { backgroundColor: site.accent }

  function toggleService(id: string, title: string) {
    const opening = openId !== id
    setOpenId(opening ? id : null)
    if (opening) track('service_viewed', { service_id: id, service_name: title })
  }

  return (
    <main className="min-h-screen bg-white pb-20 text-slate-900 sm:pb-0">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <span className="text-lg font-bold" style={accent}>{site.company}</span>
          <nav className="hidden gap-6 text-sm text-slate-600 sm:flex">
            <a href="#services">Services</a>
            <a href="#area">Service area</a>
            <a href="#financing">Financing</a>
            <a href="#reviews">Reviews</a>
            <a href="#contact">Contact</a>
          </nav>
          <a href={`tel:${site.phone}`} className="text-sm font-semibold">{site.phone}</a>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">{site.tagline}</h1>
        <p className="mt-4 max-w-xl text-lg text-slate-600">
          Free estimates. Licensed and insured. Pay a small deposit to lock in your job.
        </p>
        <a href="#contact" className="mt-8 inline-block rounded-lg px-6 py-3 font-semibold text-white" style={accentBg}>
          Request an Estimate
        </a>
      </section>

      <section id="services" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-bold">Our services</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {site.services.map((s) => (
              <button
                key={s.id}
                onClick={() => toggleService(s.id, s.title)}
                className="rounded-xl border border-slate-200 bg-white p-5 text-left transition hover:shadow"
              >
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.blurb}</p>
                <span className="mt-3 inline-block text-sm font-medium" style={accent}>
                  {openId === s.id ? 'Hide details' : 'View details'}
                </span>
                {openId === s.id && (
                  <p className="mt-3 border-t border-slate-100 pt-3 text-sm text-slate-500">
                    Book online or request a free estimate below and we will confirm within one business day.
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

            <section id="book" className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-3xl font-bold">Book online</h2>
        <p className="mt-2 text-slate-600">Secure checkout. Financing options appear automatically when eligible.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {Object.entries(site.plans).map(([key, p]) => (
            <div key={key} className="flex flex-col rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="mt-2 text-3xl font-bold">${p.amountUsd}</p>
              <a
                href={`/checkout/${key}`}
                className="mt-5 rounded-lg px-4 py-2 text-center font-semibold text-white"
                style={accentBg}
              >
                {key === 'deposit' ? 'Pay deposit' : 'Book now'}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="area" className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-3xl font-bold">Service area</h2>
        <p className="mt-2 text-slate-600">{site.serviceArea.headline}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {site.serviceArea.places.map((p) => (
            <span key={p} className="rounded-full border border-slate-200 px-4 py-1.5 text-sm">{p}</span>
          ))}
        </div>
      </section>

      <section id="financing" className="py-12" style={accentBg}>
        <div className="mx-auto max-w-5xl px-6 text-white">
          <h2 className="text-2xl font-bold">{site.financing.headline}</h2>
          <p className="mt-2 max-w-2xl opacity-90">{site.financing.body}</p>
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-3xl font-bold">What homeowners say</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {site.reviews.map((r) => (
            <figure key={r.name} className="rounded-xl border border-slate-200 p-5">
              <div style={accent}>{'★'.repeat(r.stars)}</div>
              <blockquote className="mt-2 text-sm text-slate-700">{r.text}</blockquote>
              <figcaption className="mt-3 text-sm font-medium">{r.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

            <section id="contact" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-bold">Contact us</h2>
          <p className="mt-2 text-slate-600">
            Call <a className="font-semibold" href={`tel:${site.phone}`}>{site.phone}</a> or email{' '}
            <a className="font-semibold" href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
          <EstimateForm />
        </div>
      </section>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} {site.company}
      </footer>

      <a
        href="#contact"
        className="fixed inset-x-0 bottom-0 z-30 py-4 text-center font-semibold text-white sm:hidden"
        style={accentBg}
      >
        Request an Estimate
      </a>
    </main>
  )
}