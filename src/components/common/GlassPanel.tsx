import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassPanelProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: React.ReactNode;
  intensity?: 'light' | 'medium' | 'strong';
}

export function GlassPanel({
  children,
  intensity = 'medium',
  className,
  ...props
}: GlassPanelProps) {
  const intensityStyles = {
    light: 'bg-white/5 backdrop-blur-md border-white/5',
    medium: 'glass',
    strong: 'glass-strong',
  };
  
  return (
    <motion.div
      className={cn(
        'rounded-2xl border p-6',
        intensityStyles[intensity],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
