import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Waves, Heart, Zap, MessageCircle } from 'lucide-react';
import type { RippleType } from '../../types';
import { RIPPLE_TYPES } from '../../lib/constants';
import { cn } from '../../lib/utils';

interface RippleButtonProps {
  onRipple: (type: RippleType) => void;
  messageId: string;
}

export function RippleButton({ onRipple }: RippleButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const icons = {
    'resonate': Sparkles,
    'feel-this': Waves,
    'thinking': MessageCircle,
    'warmth': Heart,
    'energy': Zap,
  };

  const handleRipple = (type: RippleType) => {
    onRipple(type);
    setIsOpen(false);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
    }, 2000);
  };

  return (
    <div className="relative">
      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'px-4 py-2 rounded-full glass hover:bg-white/10 transition-all text-sm font-medium',
          isOpen && 'bg-white/10'
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Send Ripple
      </motion.button>

      {/* Ripple Type Selector */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute bottom-full mb-2 left-0 glass-strong rounded-2xl p-2 flex gap-2 z-10"
          >
            {(Object.keys(RIPPLE_TYPES) as RippleType[]).map((type) => {
              const Icon = icons[type];
              const rippleData = RIPPLE_TYPES[type];
              
              return (
                <motion.button
                  key={type}
                  onClick={() => handleRipple(type)}
                  className="p-3 rounded-xl hover:bg-white/10 transition-colors group relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title={rippleData.label}
                >
                  <Icon className="w-5 h-5" style={{ color: rippleData.color }} />
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-drift-dark-800 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {rippleData.emoji} {rippleData.label}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback Message */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 left-0 px-4 py-2 glass-strong rounded-lg text-sm whitespace-nowrap"
          >
            Your ripple traveled through the Current.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
