import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import { formatNaira } from '../data/products'
import { useCartStore } from '../store/cartStore'

type ProductCardProps = { product: Product; compact?: boolean }

function Star({ filled }: { filled: boolean }) {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m12 3 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3L3 9.6l6.2-.9L12 3Z" /></svg>
}

function BagIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const [added, setAdded] = useState(false)
  const onAddToCart = () => {
    addItem({ id: product.id, name: product.name, image: product.imageUrl, price: product.price })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1500)
  }

  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <img src={product.imageUrl} alt={product.name} className={`w-full object-cover ${compact ? 'aspect-square' : 'aspect-[4/4.25]'}`} />
      <div className={compact ? 'p-4' : 'p-5'}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-bold tracking-[-0.03em] text-ink">{product.name}</h3>
          <span className="shrink-0 text-sm font-semibold text-sage">{formatNaira(product.price)}</span>
        </div>
        <div className="mt-3 flex gap-0.5 text-sage" aria-label={`${product.rating} out of 5 stars`}>
          {[1, 2, 3, 4, 5].map((star) => <Star key={star} filled={star <= product.rating} />)}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button onClick={onAddToCart} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-sage px-2 py-2.5 text-xs font-semibold text-white transition hover:bg-sage/90" aria-label={`Add ${product.name} to cart`}><BagIcon /> {added ? 'Added!' : 'Add to Cart'}</button>
          <Link to={`/products/${product.id}`} className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-white px-2 py-2.5 text-xs font-semibold text-ink transition hover:border-sage/30 hover:text-sage">View Details</Link>
        </div>
      </div>
    </article>
  )
}
