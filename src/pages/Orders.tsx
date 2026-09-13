import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiClient, ApiError, type Order } from '../lib/api'
import { formatNaira } from '../data/products'

export function Orders() {
  const { id } = useParams(); const [orders, setOrders] = useState<Order[]>([]); const [error, setError] = useState(''); const [loading, setLoading] = useState(true)
  useEffect(() => { const request = id ? apiClient.order(id).then(({ order }) => ({ orders: [order] })) : apiClient.orders(); request.then(({ orders }) => setOrders(orders)).catch((cause) => setError(cause instanceof ApiError ? cause.message : 'Unable to load orders.')).finally(() => setLoading(false)) }, [id])
  if (loading) return <main className="grid min-h-[55vh] place-items-center bg-cream">Loading orders…</main>
  return <main className="bg-cream px-5 py-12"><section className="mx-auto max-w-3xl"><h1 className="font-display text-4xl font-bold text-ink">{id ? 'Order confirmation' : 'My Orders'}</h1>{error ? <p className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">{error}</p> : orders.length ? <div className="mt-7 space-y-4">{orders.map((order) => <article key={order.id} className="rounded-2xl bg-white p-6 shadow-sm"><div className="flex justify-between gap-4"><div><p className="font-semibold text-ink">Order #{order.id.slice(-8)}</p><p className="mt-1 text-sm text-ink/60">{new Date(order.createdAt).toLocaleDateString()}</p></div><span className={`rounded-full px-3 py-1 text-xs font-bold ${order.status === 'PAID' ? 'bg-sage/15 text-sage' : 'bg-amber-50 text-amber-700'}`}>{order.status === 'PAID' ? 'Payment received' : 'Payment pending'}</span></div><p className="mt-4 text-sm text-ink/70">{order.items.map((item) => `${item.product.name} × ${item.quantity}`).join(', ')}</p><p className="mt-3 font-semibold text-ink">{formatNaira(order.total)}</p>{order.status !== 'PAID' && <p className="mt-3 text-sm text-ink/55">Your payment is being confirmed. Refresh shortly after completing checkout.</p>}</article>)}</div> : <p className="mt-6 text-ink/60">You have no orders yet. <Link className="text-sage" to="/products">Start shopping</Link>.</p>}</section></main>
}
