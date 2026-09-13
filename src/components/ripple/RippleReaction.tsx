import { motion } from 'framer-motion';
import { Sparkles, Waves, Heart, Zap, MessageCircle } from 'lucide-react';
import type { RippleType } from '../../types';

interface RippleReactionProps {
  type: RippleType;
  count: number;
  active?: boolean;
  onClick?: () => void;
}

const RIPPLE_CONFIG = {
  'resonate': { icon: Sparkles, label: 'Resonate', color: '#8B5CF6' },
  'feel-this': { icon: Waves, label: 'Feel This', color: '#06B6D4' },
  'thinking': { icon: MessageCircle, label: 'Thinking', color: '#A855F7' },
  'warmth': { icon: Heart, label: 'Warmth', color: '#FB923C' },
  'energy': { icon: Zap, label: 'Energy', color: '#F87171' },
};

export function RippleReaction({ type, count, active = false, onClick }: RippleReactionProps) {
  const config = RIPPLE_CONFIG[type];
  const Icon = config.icon;
  
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative overflow-hidden
        flex items-center gap-2 px-4 py-2 rounded-full
        transition-all duration-200
        ${active
          ? 'glass-strong ring-2 ring-white/40'
          : 'glass hover:glass-strong'
        }
      `}
      style={{
        boxShadow: active ? `0 4px 16px ${config.color}40` : undefined,
      }}
    >
      {/* Glow effect on hover/active */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        style={{
          background: `radial-gradient(circle at center, ${config.color}30, transparent 70%)`,
        }}
        animate={{
          opacity: active ? 0.5 : 0,
        }}
        whileHover={{
          opacity: 0.3,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Animated icon */}
      <motion.div
        animate={active ? {
          scale: [1, 1.2, 1],
        } : {}}
        transition={{
          duration: 0.6,
          repeat: active ? Infinity : 0,
          repeatDelay: 1,
        }}
      >
        <Icon
          className="w-4 h-4 relative z-10"
          style={{ color: active ? config.color : undefined }}
        />
      </motion.div>
      
      <span className="text-sm font-medium relative z-10">{config.label}</span>
      
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-xs font-bold px-2 py-0.5 rounded-full relative z-10"
          style={{
            backgroundColor: `${config.color}20`,
            color: config.color,
          }}
        >
          {count}
        </motion.span>
      )}
      
      {/* Subtle particle effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial="rest"
        whileHover="hover"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: config.color,
              left: `${30 + i * 20}%`,
              top: '50%',
            }}
            variants={{
              rest: {
                y: 0,
                opacity: 0,
              },
              hover: {
                y: [-5, -15, -5],
                opacity: [0, 0.6, 0],
              },
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </motion.button>
  );
}
