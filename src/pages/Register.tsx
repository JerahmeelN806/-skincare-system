import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiClient, ApiError } from '../lib/api'
import { useAuthStore } from '../store/authStore'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const setSession = useAuthStore((state) => state.setSession)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim()) return setError('Enter your full name.')
    if (!emailPattern.test(email)) return setError('Enter a valid email address.')
    if (password.length < 8) return setError('Your password must be at least 8 characters.')
    if (password !== confirmPassword) return setError('Passwords do not match.')
    setError('')
    setLoading(true)
    try { const session = await apiClient.register({ fullName: name, email, password, phoneNumber: '0000000' }); setSession(session.token, session.user); navigate('/') } catch (cause) { setError(cause instanceof ApiError ? cause.message : 'Unable to create your account.') } finally { setLoading(false) }
  }

  return <main className="grid min-h-[calc(100vh-76px)] place-items-center bg-cream px-5 py-14"><section className="w-full max-w-[400px] rounded-xl bg-white p-7 shadow-lg shadow-black/[0.06] sm:p-9"><h1 className="font-display text-3xl font-extrabold tracking-[-0.05em] text-ink">Create Your Account</h1><p className="mt-2 text-sm leading-6 text-ink/60">Save your favourites and make shopping easier.</p><form className="mt-7 space-y-5" onSubmit={handleSubmit} noValidate><label className="block text-sm font-semibold text-ink">Full Name<input value={name} onChange={(event) => setName(event.target.value)} type="text" autoComplete="name" required className="mt-2 h-12 w-full rounded-lg border border-black/10 px-4 text-sm outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20" placeholder="Your full name" /></label><label className="block text-sm font-semibold text-ink">Email<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" required className="mt-2 h-12 w-full rounded-lg border border-black/10 px-4 text-sm outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20" placeholder="you@example.com" /></label><label className="block text-sm font-semibold text-ink">Password<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="new-password" minLength={8} required className="mt-2 h-12 w-full rounded-lg border border-black/10 px-4 text-sm outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20" placeholder="At least 8 characters" /></label><label className="block text-sm font-semibold text-ink">Confirm Password<input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type="password" autoComplete="new-password" required className="mt-2 h-12 w-full rounded-lg border border-black/10 px-4 text-sm outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20" placeholder="Repeat your password" /></label>{error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{error}</p>}<button disabled={loading} type="submit" className="w-full rounded-lg bg-sage px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-sage/90 disabled:opacity-60">{loading ? 'Creating account…' : 'Create Account'}</button></form><p className="mt-7 text-center text-sm text-ink/60">Already have an account? <Link to="/login" className="font-semibold text-sage hover:underline">Sign in</Link></p></section></main>
}
