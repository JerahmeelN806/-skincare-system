import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apiClient, type User } from '../lib/api'

type AuthStore = { token: string | null; user: User | null; loading: boolean; setSession: (token: string, user: User) => void; hydrateUser: () => Promise<void>; logout: () => void }
export const useAuthStore = create<AuthStore>()(persist((set, get) => ({
  token: null, user: null, loading: false,
  setSession: (token, user) => { localStorage.setItem('skincare-auth', token); set({ token, user }) },
  hydrateUser: async () => { if (!get().token || get().loading) return; set({ loading: true }); try { const { user } = await apiClient.me(); set({ user }) } catch { localStorage.removeItem('skincare-auth'); set({ token: null, user: null }) } finally { set({ loading: false }) } },
  logout: () => { localStorage.removeItem('skincare-auth'); set({ token: null, user: null }) },
}), { name: 'skincare-auth-state', partialize: (state) => ({ token: state.token, user: state.user }) }))
