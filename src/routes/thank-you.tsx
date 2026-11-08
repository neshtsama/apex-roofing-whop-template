import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/thank-you')({
  validateSearch: (s: Record<string, unknown>) => ({
    status: typeof s.status === 'string' ? s.status : undefined,
  }),
  component: ThankYou,
})

function ThankYou() {
  const { status } = Route.useSearch()
  const ok = status === 'succeeded' || status === 'success' || status === 'success'
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center' }}>
      <div>
        <h1>{ok ? 'Payment received' : status ? 'Payment not completed' : 'Thank you'}</h1>
        <p>
          {ok
            ? 'Thank you for choosing Apex Roofing Co. A confirmation is on its way.'
            : status
              ? 'Your payment did not go through. You have not been charged. Please try again.'
              : 'Thanks for visiting Apex Roofing Co.'}
        </p>
        <Link to="/">Back to home</Link>
      </div>
    </main>
  )
}
