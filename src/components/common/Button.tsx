import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  isLoading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-bold rounded-2xl transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-drift-dark-900 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden inline-flex items-center justify-center gap-2 group';
  
  const variants = {
    primary: 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white shadow-xl shadow-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/50 border border-white/10',
    secondary: 'bg-white/10 hover:bg-white/20 backdrop-blur-xl border-2 border-white/20 hover:border-white/40 text-white shadow-xl hover:shadow-2xl',
    ghost: 'hover:bg-white/10 text-white/90 hover:text-white border-2 border-transparent hover:border-white/20',
    glass: 'glass-strong hover:bg-white/15 text-white border-2 border-white/10 hover:border-white/30 shadow-xl backdrop-blur-2xl',
    gradient: 'bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 hover:from-violet-400 hover:via-purple-400 hover:to-pink-400 text-white shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 border border-white/20',
  };
  
  const sizes = {
    sm: 'px-5 py-2.5 text-sm min-h-[40px]',
    md: 'px-8 py-4 text-base min-h-[52px]',
    lg: 'px-10 py-5 text-lg min-h-[60px]',
    xl: 'px-12 py-6 text-xl min-h-[68px]',
  };
  
  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.05, y: disabled || isLoading ? 0 : -2 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Shimmer effect */}
      {!disabled && !isLoading && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      )}
      
      {/* Loading animation */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-white/10"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}
      
      {/* Content */}
      <span className={cn(
        'relative z-10 font-bold tracking-wide',
        isLoading && 'opacity-0'
      )}>
        {children}
      </span>
      
      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      )}
      
      {/* Pulse effect on hover */}
      {!disabled && !isLoading && (
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)',
          }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}
