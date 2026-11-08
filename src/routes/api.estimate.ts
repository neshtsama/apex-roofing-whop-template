import { createFileRoute } from '@tanstack/react-router'
import { env } from 'cloudflare:workers'
import { site } from '../site.config'

const API = 'https://api.whop.com/api/v1/leads'
const KEEP = 10
const clean = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max)

type LeadRow = { user?: { id?: string }; metadata?: Record<string, unknown> | null }

async function previousMeta(key: string): Promise<Record<string, string>> {
  try {
    const res = await fetch(`${API}?account_id=${site.accountId}&first=50`, {
      headers: { Authorization: `Bearer ${key}` },
    })
    if (!res.ok) return {}
    const json = (await res.json()) as { data?: LeadRow[] }
    const mine = json.data?.find((l) => l.user?.id === site.ownerUserId)
    const out: Record<string, string> = {}
    for (const [k, v] of Object.entries(mine?.metadata ?? {})) {
      if ((k.startsWith('req_') || k === 'total') && typeof v === 'string') out[k] = v
    }
    return out
  } catch {
    return {}
  }
}

export const Route = createFileRoute('/api/estimate')({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const key = env.WHOP_LEADS_KEY
        if (!key) return Response.json({ error: 'Server not configured' }, { status: 500 })

        let b: Record<string, unknown>
        try {
          b = await request.json()
        } catch {
          return Response.json({ error: 'Invalid request' }, { status: 400 })
        }

        const name = clean(b.name, 60)
        const email = clean(b.email, 100)
        if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
          return Response.json({ error: 'Name and a valid email are required' }, { status: 400 })
        }

        // [receivedAt, name, email, phone, address, service, message]
        const entry = [
          new Date().toISOString(),
          name,
          email,
          clean(b.phone, 25),
          clean(b.address, 70),
          clean(b.service, 30),
          clean(b.message, 120),
        ]
        while (JSON.stringify(entry).length > 480 && entry[6].length > 0) {
          entry[6] = entry[6].slice(0, -20)
        }

        const prev = await previousMeta(key)
        const n = (parseInt(prev.total ?? '0', 10) || 0) + 1
        const slot = `req_${((n - 1) % KEEP) + 1}`

        const res = await fetch(API, {
          method: 'POST',
          headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            account_id: site.accountId,
            user_id: site.ownerUserId,
            referrer: request.headers.get('referer') ?? undefined,
            metadata: {
              ...prev,
              source: 'estimate_form',
              total: String(n),
              latest_name: name,
              latest_email: email,
              latest_service: entry[5],
              [slot]: JSON.stringify(entry),
            },
          }),
        })

        if (!res.ok) {
          return Response.json(
            { error: 'Could not save your request', detail: (await res.text()).slice(0, 300) },
            { status: 502 },
          )
        }
        const lead = (await res.json()) as { id?: string }
        return Response.json({ ok: true, id: lead.id })
      },
    },
  },
})
