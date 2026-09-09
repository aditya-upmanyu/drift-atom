import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Waves, Heart, Zap, MessageCircle } from 'lucide-react';
import type { RippleType } from '../../types';

interface RippleSelectorProps {
  onSelect: (type: RippleType, x: number, y: number) => void;
  momentId: string;
}

const RIPPLE_CONFIG = {
  'resonate': {
    icon: Sparkles,
    label: 'Resonate',
    color: '#8B5CF6',
    description: 'This resonates with me',
  },
  'feel-this': {
    icon: Waves,
    label: 'Feel This',
    color: '#06B6D4',
    description: 'I feel this deeply',
  },
  'thinking': {
    icon: MessageCircle,
    label: 'Thinking',
    color: '#A855F7',
    description: 'Makes me think',
  },
  'warmth': {
    icon: Heart,
    label: 'Warmth',
    color: '#FB923C',
    description: 'Sending warmth',
  },
  'energy': {
    icon: Zap,
    label: 'Energy',
    color: '#F87171',
    description: 'Energizing!',
  },
};

export function RippleSelector({ onSelect }: RippleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<RippleType | null>(null);

  const handleSelect = (type: RippleType, event: React.MouseEvent) => {
    setSelectedType(type);
    
    // Get click position for particle effect
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    onSelect(type, x, y);
    
    // Visual feedback
    setTimeout(() => {
      setIsOpen(false);
      setSelectedType(null);
    }, 600);
  };

  return (
    <div className="relative">
      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          px-6 py-3 rounded-full font-medium transition-all
          ${isOpen
            ? 'glass-strong ring-2 ring-violet-400'
            : 'glass hover:glass-strong'
          }
        `}
      >
        <span className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Send Ripple
        </span>
      </motion.button>

      {/* Ripple Type Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-3 left-0 min-w-[280px]"
          >
            <div className="glass-strong rounded-2xl p-3 space-y-2">
              {Object.entries(RIPPLE_CONFIG).map(([type, config]) => {
                const Icon = config.icon;
                const isSelected = selectedType === type;

                return (
                  <motion.button
                    key={type}
                    onClick={(e) => handleSelect(type as RippleType, e)}
                    whileHover={{ scale: 1.03, x: 4 }}
                    whileTap={{ scale: 0.97 }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl
                      transition-all
                      ${isSelected
                        ? 'bg-white/20'
                        : 'hover:bg-white/10'
                      }
                    `}
                    style={{
                      ...(isSelected && {
                        boxShadow: `0 0 0 2px ${config.color}`,
                      }),
                    }}
                  >
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        backgroundColor: `${config.color}20`,
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: config.color }}
                      />
                    </div>
                    
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-white">
                        {config.label}
                      </div>
                      <div className="text-xs text-white/60">
                        {config.description}
                      </div>
                    </div>

                    {/* Animated indicator on select */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${config.color}40` }}
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: config.color }}
                        />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Pointer arrow */}
            <div
              className="absolute top-full left-8 w-4 h-4 glass-strong rotate-45 -mt-2"
              style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
