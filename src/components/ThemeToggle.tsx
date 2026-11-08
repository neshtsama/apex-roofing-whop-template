import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    let saved: string | null = null
    try {
      saved = localStorage.getItem('theme')
    } catch {
      /* storage can be unavailable */
    }
    if (saved === 'dark') document.documentElement.classList.add('dark')
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      /* storage can be unavailable */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="rounded-full border border-slate-300 px-3 py-1 text-sm"
    >
      {dark ? '☀ Light' : '☾ Dark'}
    </button>
  )
}