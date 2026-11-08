declare global {
  interface Window {
    whop?: { track: (name: string, props?: Record<string, unknown>) => void }
  }
}
export {}