import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient, ApiError } from '../lib/api'
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/cartStore'

export function Checkout() {
  const navigate = useNavigate(); const items = useCartStore((state) => state.items); const setSession = useAuthStore((state) => state.setSession)
  const [form, setForm] = useState({ fullName: '', email: '', password: '', phoneNumber: '', streetAddress: '', city: '', state: '', postalCode: '', country: 'Nigeria' })
  const [error, setError] = useState(''); const [loading, setLoading] = useState(false)
  const submit = async (event: FormEvent) => { event.preventDefault(); if (!items.length) return setError('Your cart is empty.'); setLoading(true); setError(''); try { const session = await apiClient.register({ fullName: form.fullName, email: form.email, password: form.password, phoneNumber: form.phoneNumber }); setSession(session.token, session.user); await apiClient.createAddress({ streetAddress: form.streetAddress, city: form.city, state: form.state, postalCode: form.postalCode, country: form.country, isDefault: true }); navigate('/checkout/shipping') } catch (cause) { setError(cause instanceof ApiError ? cause.message : 'Unable to save your details.') } finally { setLoading(false) } }
  const fields = [['fullName', 'Full name'], ['email', 'Email'], ['password', 'Password'], ['phoneNumber', 'Phone number'], ['streetAddress', 'Street address'], ['city', 'City'], ['state', 'State'], ['postalCode', 'Postal code'], ['country', 'Country']] as const
  return <main className="bg-cream px-5 py-12"><form onSubmit={submit} className="mx-auto max-w-2xl rounded-2xl bg-white p-7 shadow-sm"><h1 className="font-display text-4xl font-bold text-ink">Your Details</h1><p className="mt-2 text-ink/60">Create an account and save your delivery address.</p><div className="mt-7 grid gap-5 sm:grid-cols-2">{fields.map(([name, label]) => <label key={name} className="text-sm font-semibold text-ink">{label}<input required type={name === 'email' ? 'email' : name === 'password' ? 'password' : 'text'} value={form[name]} onChange={(event) => setForm({ ...form, [name]: event.target.value })} className="mt-2 w-full rounded-xl border p-3" /></label>)}</div>{error && <p className="mt-5 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}<button disabled={loading} className="mt-8 w-full rounded-xl bg-sage p-4 font-semibold text-white disabled:opacity-60">{loading ? 'Saving…' : 'Save & Continue'}</button></form></main>
}
