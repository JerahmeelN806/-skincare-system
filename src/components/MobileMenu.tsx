import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

export interface MobileMenuProps {
  isOpen: boolean
  items: string[]
  onNavigate: () => void
}

const navRoutes: Record<string, string> = {
  Home: '/',
  Shop: '/products',
  Categories: '/categories',
  About: '/about',
  Blog: '/blog',
  Contact: '/contact',
}

export function MobileMenu({ isOpen, items, onNavigate }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="border-t border-black/[0.07] bg-white px-5 py-5 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-x-4 gap-y-1">
            {items.map((item) => (
              <NavLink
                key={item}
                to={navRoutes[item] ?? '/'}
                end={item === 'Home'}
                onClick={onNavigate}
                className={({ isActive }) => `rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-cream ${isActive ? 'bg-cream text-ink' : 'text-ink/80'}`}
              >
                {item}
              </NavLink>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
