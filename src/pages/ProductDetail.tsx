import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiClient, ApiError, type Product } from '../lib/api'
import { formatNaira } from '../data/products'
import { useCartStore } from '../store/cartStore'

export function ProductDetail() {
  const { id } = useParams()
  const addItem = useCartStore((state) => state.addItem)
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState('')
  useEffect(() => { if (!id) return; apiClient.product(id).then(({ product }) => setProduct(product)).catch((cause) => setError(cause instanceof ApiError ? cause.message : 'Unable to load product.')) }, [id])
  if (error) return <main className="grid min-h-[55vh] place-items-center bg-cream px-5 text-center"><p className="text-red-700">{error}</p></main>
  if (!product) return <main className="grid min-h-[55vh] place-items-center bg-cream"><div className="h-72 w-72 animate-pulse rounded-2xl bg-white" /></main>
  return <main className="bg-cream px-5 py-12 sm:px-8 md:py-20"><div className="mx-auto grid max-w-[1120px] items-center gap-10 md:grid-cols-2 md:gap-16"><img src={product.imageUrl} alt={product.name} className="aspect-square w-full rounded-2xl object-cover shadow-sm" /><div><p className="text-sm font-semibold uppercase tracking-[0.14em] text-sage">{product.category}</p><h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.05em] text-ink">{product.name}</h1><p className="mt-5 text-2xl font-semibold text-sage">{formatNaira(product.price)}</p><p className="mt-5 leading-7 text-ink/65">{product.description}</p><div className="mt-8 flex items-center gap-3"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="rounded-full bg-white px-4 py-2">−</button><span>{quantity}</span><button onClick={() => setQuantity((value) => value + 1)} className="rounded-full bg-white px-4 py-2">+</button></div><button onClick={() => addItem({ id: product.id, name: product.name, image: product.imageUrl, price: product.price }, quantity)} className="mt-5 rounded-full bg-sage px-6 py-4 text-sm font-semibold text-white">Add to Cart</button><Link to="/products" className="ml-3 text-sm font-semibold text-sage">Back to Products</Link></div></div></main>
}
