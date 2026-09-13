import { useState } from 'react'
import { motion } from 'framer-motion'
import { MobileMenu } from './MobileMenu'
import { Nav } from './Nav'
import { SearchBar } from './SearchBar'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'

export interface HeaderProps {
  navItems?: string[]
}

const defaultNavItems = ['Home', 'Shop', 'Categories', 'About', 'Blog', 'Contact']

const interaction = {
  whileHover: { scale: 1.035 },
  whileTap: { scale: 0.97 },
  transition: { type: 'spring' as const, stiffness: 430, damping: 18 }
}

function BottleMark() {
  return (
    <svg viewBox="0 0 36 42" className="h-9 w-8" fill="none" aria-hidden="true">
      <path
        d="M13 7.5h10M15 2.5h6v5H15zM10 12.5h16v25.5H10z"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
      <path
        d="M14 24c2.8-3.2 5.5-3.2 8 0M14 29c2.8-3.2 5.5-3.2 8 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

interface IconProps {
  name: 'menu' | 'bag' | 'user' | 'close'
  size?: number
}

function Icon({ name, size = 20 }: IconProps) {
  const paths = {
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    bag: (
      <>
        <path d="M5 8h14l-1 12H6L5 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="3.4" />
        <path d="M5.8 20c.8-3.1 3.1-4.7 6.2-4.7s5.4 1.6 6.2 4.7" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

export function Header({ navItems = defaultNavItems }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const totalItems = useCartStore((state) => state.totalItems)
  const { user, token, logout } = useAuthStore()
  const avatarInitial = token && user?.email ? user.email.trim().charAt(0).toUpperCase() : ''

  const cartButton = (mobile = false) => <Link to="/cart" className={`relative grid h-10 w-10 place-items-center rounded-full transition ${mobile ? '' : 'hover:bg-cream'}`} aria-label={`Shopping cart${totalItems ? `, ${totalItems} items` : ''}`}><Icon name="bag" />{totalItems > 0 && <span className="absolute -right-1 -top-1 grid min-w-5 h-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white">{totalItems > 99 ? '99+' : totalItems}</span>}</Link>
  const accountButton = (mobile = false) => <Link to={token ? '/orders' : '/login'} title={user?.email} className={`grid h-10 w-10 place-items-center rounded-full transition ${avatarInitial ? 'bg-sage text-sm font-bold text-white hover:bg-sage/90' : mobile ? '' : 'hover:bg-cream'}`} aria-label={token ? `Account for ${user?.email || user?.fullName || 'user'}` : 'Sign in'}>{avatarInitial ? <span aria-hidden="true">{avatarInitial}</span> : <Icon name="user" />}</Link>

  return (
    <header className="border-b border-black/[0.07] bg-white">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="flex h-[76px] items-center justify-between gap-3 md:h-[88px]">
          
          {/* Brand Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-2 text-sage" aria-label="Skincare System home">
            <BottleMark />
            <span className="hidden font-display text-[15px] font-bold leading-none tracking-[-0.05em] sm:block">
              SKINCARE<br />SYSTEM
            </span>
          </Link>

          {/* Action Call */}
          <motion.div
            {...interaction}
            className="order-2 rounded-full bg-sage px-4 py-2.5 text-sm font-semibold text-white shadow-sm sm:order-none sm:px-5"
          >
            {token ? <button onClick={logout} className="block">Sign Out</button> : <Link to="/login" className="block">Sign In</Link>}
          </motion.div>

          {/* Main Navigation */}
          <Nav items={navItems} />

          {/* Desktop Control Panel */}
          <div className="hidden items-center gap-3 md:flex">
            <SearchBar />
            {cartButton()}
            {accountButton()}
          </div>

          {/* Mobile Control Panel */}
          <div className="flex items-center gap-1 md:hidden">
            {cartButton(true)}
            {accountButton(true)}
            <button
              onClick={() => setMenuOpen((open) => !open)}
              className="grid h-10 w-10 place-items-center rounded-full bg-cream text-ink"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <Icon name="close" size={21} /> : <Icon name="menu" size={22} />}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar Expansion */}
        <div className="pb-4 md:hidden">
          <SearchBar mobile />
        </div>
      </div>

      {/* Expandable Navigation Drawer */}
      <MobileMenu isOpen={menuOpen} items={navItems} onNavigate={() => setMenuOpen(false)} />
    </header>
  )
}
