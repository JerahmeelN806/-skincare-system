import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiClient, ApiError, type Address } from '../lib/api'
import { useAuthStore } from '../store/authStore'
import { getCartSubtotal, useCartStore } from '../store/cartStore'
import { formatNaira } from '../data/products'

type Form = Omit<Address, 'id'>
const blank: Form = { streetAddress: '', city: '', state: '', postalCode: '', country: '', isDefault: true }

export function ShippingInfo() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const items = useCartStore((state) => state.items)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [form, setForm] = useState<Form>(blank)
  const [orderId, setOrderId] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => { if (!user) { navigate('/login'); return } apiClient.addresses().then(({ addresses }) => { setAddresses(addresses); const saved = addresses.find((address) => address.isDefault) || addresses[0]; if (saved) { setSelectedId(saved.id); setForm(saved) } }).catch((cause) => setError(cause instanceof ApiError ? cause.message : 'Unable to load saved addresses.')).finally(() => setLoading(false)) }, [navigate, user])
  const createOrder = async (event: FormEvent) => { event.preventDefault(); if (!items.length) return setError('Your cart is empty.'); setSubmitting(true); setError(''); try { let addressId = selectedId; if (!addressId) { const { address } = await apiClient.createAddress(form); addressId = address.id; setAddresses((current) => [address, ...current]) } const { order } = await apiClient.createOrder({ addressId, items: items.map((item) => ({ productId: item.id, quantity: item.quantity })) }); setOrderId(order.id) } catch (cause) { setError(cause instanceof ApiError ? cause.message : 'Unable to create your order.') } finally { setSubmitting(false) } }
  const pay = async () => { if (!orderId) return; setSubmitting(true); setError(''); try { const { checkoutLink } = await apiClient.initiatePayment(orderId, `${window.location.origin}/orders/${orderId}?payment=return`); window.location.assign(checkoutLink) } catch (cause) { setError(cause instanceof ApiError ? cause.message : 'Unable to start payment.') } finally { setSubmitting(false) } }
  if (loading) return <main className="grid min-h-[55vh] place-items-center bg-cream"><div className="h-16 w-16 animate-spin rounded-full border-4 border-sage border-t-transparent" /></main>
  return <main className="bg-cream px-5 py-12"><form onSubmit={createOrder} className="mx-auto max-w-2xl rounded-2xl bg-white p-7 shadow-sm"><h1 className="font-display text-4xl font-bold text-ink">Shipping Information</h1><p className="mt-2 text-ink/60">Delivering for {user?.fullName} ({user?.email})</p>{addresses.length > 0 && <label className="mt-7 block text-sm font-semibold text-ink">Use my saved address<select value={selectedId} onChange={(event) => { const address = addresses.find((item) => item.id === event.target.value); setSelectedId(event.target.value); if (address) setForm(address) }} className="mt-2 w-full rounded-xl border p-3"><option value="">Add a new address</option>{addresses.map((address) => <option key={address.id} value={address.id}>{address.streetAddress}, {address.city}</option>)}</select></label>} {!selectedId && <div className="mt-6 grid gap-4 sm:grid-cols-2">{(['streetAddress', 'city', 'state', 'postalCode', 'country'] as const).map((name) => <label key={name} className="text-sm font-semibold capitalize text-ink">{name.replace(/([A-Z])/g, ' $1')}<input required value={String(form[name])} onChange={(event) => setForm({ ...form, [name]: event.target.value })} className="mt-2 w-full rounded-xl border p-3" /></label>)}</div>}{error && <p className="mt-5 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}{orderId ? <><p className="mt-7 rounded-lg bg-sage/10 p-4 text-sage">Order created. Continue to secure payment.</p><button type="button" onClick={pay} disabled={submitting} className="mt-5 w-full rounded-xl bg-sage p-4 font-semibold text-white">{submitting ? 'Opening secure checkout…' : `Pay ${formatNaira(getCartSubtotal(items))} Securely`}</button></> : <button disabled={submitting || !items.length} className="mt-7 w-full rounded-xl bg-sage p-4 font-semibold text-white disabled:opacity-60">{submitting ? 'Creating order…' : 'Continue to Payment'}</button>}<Link to="/cart" className="mt-5 block text-center text-sm font-semibold text-sage">Back to cart</Link></form></main>
}
