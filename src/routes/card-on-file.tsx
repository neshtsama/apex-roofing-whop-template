import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { WhopElements, Checkout, CheckoutElement } from '@whop/elements-react'
import { loadWhop } from '@whop/elements'

const SETUP_CONFIG_ID = 'ch_LvY2sxPgnjJ98tQ'

export const Route = createFileRoute('/card-on-file')({ component: CardOnFile })

function CardOnFile() {
  const [elements, setElements] = useState<ReturnType<typeof loadWhop> | null>(null)
  useEffect(() => {
    setElements(loadWhop())
  }, [])

  return (
    <main className="mx-auto min-h-screen max-w-xl bg-white px-6 py-10 text-slate-900">
      <a href="/" className="text-sm text-slate-500">Back to home</a>
      <h1 className="mt-4 text-2xl font-bold">Save a payment method</h1>
      <p className="mb-6 text-slate-600">You will not be charged now. Your card is kept on file for the final balance.</p>
      {elements ? (
        <WhopElements elements={elements}>
          <Checkout checkoutConfiguration={SETUP_CONFIG_ID} returnUrl={`${window.location.origin}/thank-you`}>
            <CheckoutElement />
          </Checkout>
        </WhopElements>
      ) : (
        <p className="text-slate-500">Loading...</p>
      )}
    </main>
  )
}
