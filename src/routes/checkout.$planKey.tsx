import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { WhopElements, Checkout, CheckoutElement, ExpressCheckoutElement } from '@whop/elements-react'
import { loadWhop } from '@whop/elements'
import { site } from '../site.config'
import { track } from '../lib/track'

export const Route = createFileRoute('/checkout/$planKey')({ component: CheckoutPage })

type PlanInfo = { name: string; amountUsd: number; planId: string }

function CheckoutPage() {
  const { planKey } = Route.useParams()
  const plan = (site.plans as Record<string, PlanInfo>)[planKey]
  const [elements, setElements] = useState<ReturnType<typeof loadWhop> | null>(null)

  useEffect(() => {
    setElements(loadWhop())
  }, [])

  useEffect(() => {
    if (plan && planKey === 'deposit') {
      track('deposit_started', { plan_id: plan.planId, value: plan.amountUsd, currency: 'USD' })
    }
  }, [planKey])

  if (!plan) {
    return <main className="p-10">Unknown plan. <a href="/" className="underline">Back to home</a></main>
  }

  return (
    <main className="mx-auto min-h-screen max-w-xl bg-white px-6 py-10 text-slate-900">
      <a href="/" className="text-sm text-slate-500">← Back to {site.company}</a>
      <h1 className="mt-4 text-2xl font-bold">{plan.name}</h1>
      <p className="mb-6 text-slate-600">${plan.amountUsd}</p>
      {elements ? (
        <WhopElements elements={elements}>
         <Checkout plan={plan.planId} returnUrl={`${window.location.origin}/thank-you`}>
            <ExpressCheckoutElement />
          </Checkout>
          <p className="my-4 text-center text-sm text-slate-500">or pay by card</p>
          <Checkout plan={plan.planId} returnUrl={`${window.location.origin}/thank-you`}>
            <CheckoutElement />
          </Checkout>
        </WhopElements>
      ) : (
        <p className="text-slate-500">Loading checkout…</p>
      )}
    </main>
  )
}