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
      <Icon
        className="w-4 h-4"
        style={{ color: active ? config.color : undefined }}
      />
      <span className="text-sm font-medium">{config.label}</span>
      {count > 0 && (
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: `${config.color}20`,
            color: config.color,
          }}
        >
          {count}
        </span>
      )}
    </motion.button>
  );
}
