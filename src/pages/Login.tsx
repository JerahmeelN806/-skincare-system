import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(false)
    if (!emailPattern.test(email)) return setError('Enter a valid email address.')
    if (!password) return setError('Enter your password.')
    setError('')
    setSubmitted(true)
  }

  return <main className="grid min-h-[calc(100vh-76px)] place-items-center bg-cream px-5 py-14"><section className="w-full max-w-[400px] rounded-xl bg-white p-7 shadow-lg shadow-black/[0.06] sm:p-9"><h1 className="font-display text-3xl font-extrabold tracking-[-0.05em] text-ink">Welcome Back</h1><p className="mt-2 text-sm leading-6 text-ink/60">Sign in to continue your skincare routine.</p><form className="mt-7 space-y-5" onSubmit={handleSubmit} noValidate><label className="block text-sm font-semibold text-ink">Email<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" required className="mt-2 h-12 w-full rounded-lg border border-black/10 px-4 text-sm outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20" placeholder="you@example.com" /></label><label className="block text-sm font-semibold text-ink">Password<span className="relative mt-2 block"><input value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? 'text' : 'password'} autoComplete="current-password" required className="h-12 w-full rounded-lg border border-black/10 px-4 pr-16 text-sm outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20" placeholder="Enter your password" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute inset-y-0 right-3 text-xs font-semibold text-sage hover:text-ink" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button></span></label><div className="text-right"><Link to="/forgot-password" className="text-sm font-semibold text-sage hover:underline">Forgot password?</Link></div>{error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{error}</p>}{submitted && <p className="rounded-lg bg-sage/10 px-3 py-2 text-sm text-sage" role="status">Login functionality will connect once the backend is ready.</p>}<button type="submit" className="w-full rounded-lg bg-sage px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-sage/90">Sign In</button></form><p className="mt-7 text-center text-sm text-ink/60">Don&apos;t have an account? <Link to="/register" className="font-semibold text-sage hover:underline">Sign up</Link></p></section></main>
}
