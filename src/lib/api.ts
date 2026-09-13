const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/$/, '')

export type User = { id: string; fullName: string; email: string; phoneNumber: string }
export type Product = { id: string; name: string; price: number; rating: number; imageUrl: string; description: string; category: string; stock: number }
export type Address = { id: string; streetAddress: string; city: string; state: string; postalCode: string; country: string; isDefault: boolean }
export type Order = { id: string; status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'; subtotal: number; deliveryFee: number; total: number; createdAt: string; address: Address; items: Array<{ id: string; quantity: number; priceAtPurchase: number; product: Product }> }

export class ApiError extends Error { constructor(message: string, public status?: number) { super(message) } }

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('skincare-auth')
  const headers = new Headers(options.headers)
  if (options.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`)
  let response: Response
  try { response = await fetch(`${API_URL}${path}`, { ...options, headers }) } catch { throw new ApiError('Unable to reach the server. Please try again.') }
  const payload = await response.json().catch(() => ({})) as { error?: string }
  if (!response.ok) throw new ApiError(payload.error || 'Something went wrong. Please try again.', response.status)
  return payload as T
}

export const apiClient = {
  register: (data: { fullName: string; email: string; password: string; phoneNumber: string }) => api<{ user: User; token: string }>('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data: { email: string; password: string }) => api<{ user: User; token: string }>('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  me: () => api<{ user: User }>('/api/auth/me'),
  products: (search?: string, category?: string) => api<{ products: Product[] }>(`/api/products?${new URLSearchParams({ ...(search ? { search } : {}), ...(category && category !== 'All' ? { category } : {}) })}`),
  product: (id: string) => api<{ product: Product }>(`/api/products/${id}`),
  addresses: () => api<{ addresses: Address[] }>('/api/addresses'),
  createAddress: (data: Omit<Address, 'id'>) => api<{ address: Address }>('/api/addresses', { method: 'POST', body: JSON.stringify(data) }),
  createOrder: (data: { addressId: string; items: Array<{ productId: string; quantity: number }> }) => api<{ order: Order }>('/api/orders', { method: 'POST', body: JSON.stringify(data) }),
  orders: () => api<{ orders: Order[] }>('/api/orders'),
  order: (id: string) => api<{ order: Order }>(`/api/orders/${id}`),
  initiatePayment: (orderId: string, redirectUrl: string) => api<{ checkoutLink: string; reference: string }>('/api/payments/initiate', { method: 'POST', body: JSON.stringify({ orderId, redirectUrl }) }),
}
