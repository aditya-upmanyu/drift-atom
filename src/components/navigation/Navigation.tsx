import { motion } from 'framer-motion';
import { Home, User, Sparkles, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';

const navItems = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/memory', icon: Sparkles, label: 'Memory' },
  { path: '/profile', icon: User, label: 'Profile' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export function Navigation() {
  return (
    <>
      {/* Desktop Navigation - Floating */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden md:block fixed bottom-8 left-1/2 -translate-x-1/2 z-30"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="glass-strong rounded-full px-6 py-3 flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 px-4 py-2 rounded-full transition-all',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  )
                }
                aria-label={item.label}
              >
                {({ isActive }) => (
                  <>
                    <Icon className="w-5 h-5" aria-hidden="true" />
                    <motion.span
                      initial={false}
                      animate={{
                        width: isActive ? 'auto' : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      className="overflow-hidden whitespace-nowrap text-sm font-medium"
                    >
                      {item.label}
                    </motion.span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </motion.nav>

      {/* Mobile Navigation - Bottom Bar */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 backdrop-blur-xl border-t border-white/10 bg-black/20"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around px-4 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all',
                    isActive
                      ? 'text-white'
                      : 'text-white/60'
                  )
                }
                aria-label={item.label}
              >
                {({ isActive }) => (
                  <>
                    <Icon className="w-6 h-6" aria-hidden="true" />
                    <span className="text-xs font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="mobile-nav-indicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-violet-500 rounded-full"
                        aria-hidden="true"
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
