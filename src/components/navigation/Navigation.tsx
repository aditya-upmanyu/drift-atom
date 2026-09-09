import { motion } from 'framer-motion';
import { Home, User, Sparkles, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';

const navItems = [
  { path: '/home', icon: Home, label: 'Field', gradient: 'from-violet-500 to-purple-500' },
  { path: '/memory', icon: Sparkles, label: 'Memories', gradient: 'from-purple-500 to-pink-500' },
  { path: '/profile', icon: User, label: 'Constellation', gradient: 'from-pink-500 to-rose-500' },
  { path: '/settings', icon: Settings, label: 'Settings', gradient: 'from-blue-500 to-cyan-500' },
];

export function Navigation() {
  return (
    <>
      {/* Desktop Navigation - Floating */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="hidden md:block fixed bottom-8 left-1/2 -translate-x-1/2 z-30"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="glass-strong rounded-full px-4 py-3 flex items-center gap-1 border-2 border-white/10 shadow-2xl backdrop-blur-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'relative flex items-center gap-3 px-5 py-3 rounded-full transition-all duration-300 group',
                    isActive
                      ? 'bg-gradient-to-r text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  )
                }
                style={({ isActive }) => isActive ? {
                  backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                  ['--tw-gradient-from' as any]: `var(--tw-gradient-stops, ${item.gradient.split(' ')[1]})`,
                  ['--tw-gradient-to' as any]: item.gradient.split(' ')[3],
                } : {}}
                aria-label={item.label}
              >
                {({ isActive }) => (
                  <>
                    {/* Icon glow */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-glow"
                        className="absolute inset-0 rounded-full blur-xl opacity-50"
                        style={{
                          background: `linear-gradient(135deg, ${item.gradient.split(' ')[1]}, ${item.gradient.split(' ')[3]})`
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    <Icon className={cn(
                      "w-5 h-5 relative z-10 transition-transform group-hover:scale-110",
                      isActive && "drop-shadow-lg"
                    )} aria-hidden="true" />
                    
                    <motion.span
                      initial={false}
                      animate={{
                        width: isActive ? 'auto' : 0,
                        opacity: isActive ? 1 : 0,
                        marginLeft: isActive ? 0 : -8,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="overflow-hidden whitespace-nowrap text-sm font-bold tracking-wide relative z-10"
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
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 backdrop-blur-2xl border-t-2 border-white/10 bg-drift-dark-900/80 shadow-2xl mobile-safe-bottom"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around px-2 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'relative flex flex-col items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-300 touch-target min-w-[70px]',
                    isActive
                      ? 'text-white'
                      : 'text-white/60'
                  )
                }
                aria-label={item.label}
              >
                {({ isActive }) => (
                  <>
                    {/* Active background */}
                    {isActive && (
                      <motion.div
                        layoutId="mobile-nav-bg"
                        className="absolute inset-0 rounded-2xl opacity-20"
                        style={{
                          background: `linear-gradient(135deg, ${item.gradient.split(' ')[1]}, ${item.gradient.split(' ')[3]})`
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    {/* Icon container */}
                    <motion.div
                      animate={{
                        scale: isActive ? 1.1 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="relative"
                    >
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-xl blur-lg opacity-60"
                          style={{
                            background: `linear-gradient(135deg, ${item.gradient.split(' ')[1]}, ${item.gradient.split(' ')[3]})`
                          }}
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                      <Icon className={cn(
                        "w-6 h-6 relative z-10",
                        isActive && "drop-shadow-lg"
                      )} aria-hidden="true" />
                    </motion.div>
                    
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider relative z-10",
                      isActive && "drop-shadow-lg"
                    )}>
                      {item.label}
                    </span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="mobile-nav-indicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full shadow-lg"
                        style={{
                          background: `linear-gradient(90deg, ${item.gradient.split(' ')[1]}, ${item.gradient.split(' ')[3]})`
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
