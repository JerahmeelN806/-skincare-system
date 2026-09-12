import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatNaira } from '../data/products'
import { CheckoutDetails, getCartSubtotal, useCartStore } from '../store/cartStore'

type Field = keyof CheckoutDetails | 'confirmPassword'
type FormValues = CheckoutDetails & { confirmPassword: string }
type Errors = Partial<Record<Field, string>>

const initialForm: FormValues = { fullName: '', email: '', password: '', confirmPassword: '', phone: '', streetAddress: '', city: '', state: '', postalCode: '', country: '' }
const inputClass = 'mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-sage focus:ring-2 focus:ring-sage/15'

function ArrowIcon() { return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg> }

export function Checkout() {
  const navigate = useNavigate()
  const { items, checkoutDetails, saveCheckoutDetails } = useCartStore()
  const [form, setForm] = useState<FormValues>(() => checkoutDetails ? { ...checkoutDetails, confirmPassword: checkoutDetails.password } : initialForm)
  const [errors, setErrors] = useState<Errors>({})
  const subtotal = getCartSubtotal(items)

  const update = (field: Field, value: string) => { setForm((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: undefined })) }
  const validate = () => {
    const next: Errors = {}
    ;(Object.keys(initialForm) as Field[]).forEach((field) => { if (!form[field]?.trim()) next[field] = 'This field is required.' })
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (form.password && !/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(form.password)) next.password = 'Use at least 8 characters, an uppercase letter, a number, and a special character.'
    if (form.confirmPassword && form.password !== form.confirmPassword) next.confirmPassword = 'Passwords do not match.'
    setErrors(next); return Object.keys(next).length === 0
  }
  const submit = (event: FormEvent) => {
    event.preventDefault(); if (!validate()) return
    const { confirmPassword: _, ...details } = form
    saveCheckoutDetails(details)
    console.info('Backend not ready — order details captured locally', details)
    navigate('/cart#payment')
  }
  const field = (label: string, name: Field, type = 'text', placeholder?: string) => <label className="block text-sm font-medium text-ink">{label}<input required type={type} value={form[name]} onChange={(event) => update(name, event.target.value)} placeholder={placeholder} aria-invalid={Boolean(errors[name])} className={`${inputClass} ${errors[name] ? 'border-red-500' : 'border-black/15'}`} />{errors[name] && <span className="mt-1.5 block text-xs text-red-600">{errors[name]}</span>}</label>

  return <main className="bg-cream px-5 py-12 sm:px-8 md:py-20"><div className="mx-auto grid max-w-[1120px] items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px]"><form onSubmit={submit} noValidate className="rounded-2xl bg-white p-6 shadow-sm sm:p-9"><h1 className="font-display text-4xl font-extrabold tracking-[-0.05em] text-ink">Your Details</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-ink/60">Create your account and enter your delivery address. You'll be able to sign in and track orders anytime after checkout.</p><section className="mt-9"><h2 className="text-xs font-bold tracking-[0.16em] text-sage">ACCOUNT</h2><div className="mt-5 space-y-5">{field('Full Name', 'fullName', 'text', 'John Doe')}{field('Email Address', 'email', 'email', 'you@example.com')}<div className="grid gap-5 sm:grid-cols-2">{field('Password', 'password', 'password')}{field('Confirm Password', 'confirmPassword', 'password')}</div><p className="-mt-2 text-xs text-ink/50">Min 8 chars • uppercase • number • special character</p></div></section><section className="mt-10 border-t border-black/[0.08] pt-9"><h2 className="text-xs font-bold tracking-[0.16em] text-sage">DELIVERY ADDRESS</h2><div className="mt-5 space-y-5">{field('Phone Number', 'phone', 'tel', '08012345678')}{field('Street Address', 'streetAddress', 'text', '12 Lagos Island')}<div className="grid gap-5 sm:grid-cols-2">{field('City', 'city', 'text', 'Lagos')}{field('State', 'state', 'text', 'Lagos State')}</div><div className="grid gap-5 sm:grid-cols-2">{field('Postal Code', 'postalCode', 'text', '100001')}{field('Country', 'country', 'text', 'Nigeria')}</div></div></section><button type="submit" className="mt-10 flex w-full items-center justify-center gap-2 rounded-xl bg-sage px-5 py-4 text-sm font-semibold text-white transition hover:bg-sage/90">Save &amp; Continue to Payment <ArrowIcon /></button><p className="mt-4 text-center text-xs leading-5 text-ink/50">After checkout you can sign in at any time with your email and password.</p></form><aside className="lg:sticky lg:top-6"><section className="rounded-2xl bg-white p-6 shadow-sm"><h2 className="font-display text-2xl font-bold text-ink">Order Summary</h2>{items.length ? <><div className="mt-6 space-y-5">{items.map((item, index) => <article key={item.id} className="flex items-center gap-3"><div className="relative shrink-0"><img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover" /><span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-sage px-1 text-[10px] font-bold text-white">{index + 1}</span></div><div className="min-w-0 flex-1"><h3 className="truncate font-display text-sm font-bold text-ink">{item.name}</h3><p className="mt-1 text-xs text-ink/50">Qty {item.quantity}</p></div><p className="text-sm font-semibold text-ink">{formatNaira(item.price * item.quantity)}</p></article>)}</div><div className="mt-6 space-y-3 border-t border-black/[0.08] pt-5 text-sm"><div className="flex justify-between text-ink/60"><span>Subtotal</span><span className="font-medium text-ink">{formatNaira(subtotal)}</span></div><div className="flex justify-between text-ink/60"><span>Delivery</span><span className="font-medium text-sage">Free</span></div><div className="flex justify-between border-t border-black/[0.08] pt-4 font-display text-lg font-bold text-ink"><span>Total</span><span>{formatNaira(subtotal)}</span></div></div></> : <p className="mt-5 text-sm leading-6 text-ink/55">Your cart is empty. Add products before completing checkout.</p>}</section></aside></div></main>
}
