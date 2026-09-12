import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartProduct = {
  id: string
  name: string
  image: string
  price: number
}

export type CartItem = CartProduct & { quantity: number }

export type CheckoutDetails = {
  fullName: string; email: string; password: string; phone: string; streetAddress: string
  city: string; state: string; postalCode: string; country: string
}

type CartStore = {
  items: CartItem[]
  subtotal: number
  totalItems: number
  checkoutDetails: CheckoutDetails | null
  addItem: (product: CartProduct, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  saveCheckoutDetails: (details: CheckoutDetails) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      subtotal: 0,
      totalItems: 0,
      checkoutDetails: null,
      addItem: (product, quantity = 1) => set((state) => {
        const safeQuantity = Math.max(1, quantity)
        const existingItem = state.items.find((item) => item.id === product.id)
        const items = existingItem
          ? state.items.map((item) => item.id === product.id
            ? { ...item, quantity: item.quantity + safeQuantity }
            : item)
          : [...state.items, { ...product, quantity: safeQuantity }]

        return { items, subtotal: getCartSubtotal(items), totalItems: getCartTotalItems(items) }
      }),
      removeItem: (id) => set((state) => {
        const items = state.items.filter((item) => item.id !== id)
        return { items, subtotal: getCartSubtotal(items), totalItems: getCartTotalItems(items) }
      }),
      updateQuantity: (id, quantity) => set((state) => {
        const items = state.items.map((item) => item.id === id
          ? { ...item, quantity: Math.max(1, quantity) }
          : item)
        return { items, subtotal: getCartSubtotal(items), totalItems: getCartTotalItems(items) }
      }),
      saveCheckoutDetails: (checkoutDetails) => set({ checkoutDetails }),
    }),
    { name: 'skincare-cart', partialize: (state) => ({ items: state.items, subtotal: state.subtotal, totalItems: state.totalItems, checkoutDetails: state.checkoutDetails }) },
  ),
)

export const getCartSubtotal = (items: CartItem[]) => items.reduce((total, item) => total + item.price * item.quantity, 0)
export const getCartTotalItems = (items: CartItem[]) => items.reduce((total, item) => total + item.quantity, 0)
