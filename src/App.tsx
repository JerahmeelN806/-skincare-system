import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { PromoBanner } from './components/PromoBanner'
import { FeaturedProducts } from './components/FeaturedProducts'
import { PromoBanners } from './components/PromoBanners'
import { BrandMission } from './components/BrandMission'
import { Footer } from './components/Footer'
import { ProductDetail } from './pages/ProductDetail'
import { Products } from './pages/Products'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Cart } from './pages/Cart'
import { Checkout } from './pages/Checkout'
import { ShippingInfo } from './pages/ShippingInfo'
import { Orders } from './pages/Orders'
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'

function App() {
  const { token, hydrateUser } = useAuthStore()
  useEffect(() => { void hydrateUser() }, [hydrateUser])
  const isLoggedIn = Boolean(token)
  const checkoutPage = isLoggedIn ? <ShippingInfo /> : <Checkout />
  return <div className="min-h-screen overflow-hidden bg-cream"><PromoBanner /><Header /><Routes><Route path="/" element={<main><Hero /><FeaturedProducts /><PromoBanners /><BrandMission /></main>} /><Route path="/products" element={<Products />} /><Route path="/products/:id" element={<ProductDetail />} /><Route path="/cart" element={<Cart />} /><Route path="/checkout" element={checkoutPage} /><Route path="/checkout/shipping" element={<ShippingInfo />} /><Route path="/orders" element={<Orders />} /><Route path="/orders/:id" element={<Orders />} /><Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} /></Routes><Footer /></div>
}

export default App
