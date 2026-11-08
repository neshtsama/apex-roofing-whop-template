export function track(name: string, props?: Record<string, unknown>) {
  try {
    window.whop?.track(name, props)
  } catch {
    /* tracking must never break the page */
  }
}
