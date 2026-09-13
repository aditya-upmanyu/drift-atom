import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, MessageCircle, Clock, Sparkles } from 'lucide-react';
import type { Current } from '../../types';
import { MOODS } from '../../lib/constants';

interface CurrentPreviewProps {
  current: Current | null;
  onClose: () => void;
  onEnter: () => void;
}

export function CurrentPreview({ current, onClose, onEnter }: CurrentPreviewProps) {
  if (!current) return null;
  
  const mood = MOODS[current.mood];
  const hours = Math.floor(current.remainingTime / 3600);
  const minutes = Math.floor((current.remainingTime % 3600) / 60);
  const isEndingSoon = current.remainingTime < 3600;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl"
        >
          {/* Cosmic glow background */}
          <motion.div
            className="absolute -inset-8 rounded-full opacity-30 blur-3xl"
            style={{ backgroundColor: mood.color }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Main panel */}
          <div 
            className="relative glass-strong rounded-3xl overflow-hidden border-2 shadow-2xl"
            style={{
              borderColor: `${mood.color}40`,
              boxShadow: `0 0 60px ${mood.color}40, 0 20px 60px rgba(0,0,0,0.4)`,
            }}
          >
            {/* Gradient header overlay */}
            <div 
              className="absolute top-0 left-0 right-0 h-48 opacity-20"
              style={{
                background: `linear-gradient(to bottom, ${mood.color}, transparent)`,
              }}
            />
            
            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full glass-strong flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5 text-white/80" />
            </motion.button>
            
            {/* Content */}
            <div className="relative p-8 md:p-12">
              {/* Mood badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border mb-6"
                style={{
                  borderColor: `${mood.color}40`,
                  backgroundColor: `${mood.color}10`,
                }}
              >
                <span className="text-xl">{mood.icon}</span>
                <span 
                  className="font-semibold uppercase text-sm tracking-wider"
                  style={{ color: mood.color }}
                >
                  {mood.label}
                </span>
              </motion.div>
              
              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
              >
                {current.title}
              </motion.h2>
              
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed font-light italic"
              >
                "{current.description}"
              </motion.p>
              
              {/* Stats grid */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-3 gap-4 mb-8"
              >
                {/* Drifters */}
                <div className="glass rounded-2xl p-4 text-center border border-white/10">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-white/60" />
                    <span className="text-xs uppercase tracking-wider text-white/50 font-bold">
                      Drifters
                    </span>
                  </div>
                  <div 
                    className="text-3xl font-bold"
                    style={{ color: mood.color }}
                  >
                    {current.presenceCount}
                  </div>
                </div>
                
                {/* Thoughts */}
                <div className="glass rounded-2xl p-4 text-center border border-white/10">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <MessageCircle className="w-4 h-4 text-white/60" />
                    <span className="text-xs uppercase tracking-wider text-white/50 font-bold">
                      Thoughts
                    </span>
                  </div>
                  <div 
                    className="text-3xl font-bold"
                    style={{ color: mood.color }}
                  >
                    {current.messageCount ?? 12}
                  </div>
                </div>
                
                {/* Time remaining */}
                <div 
                  className="glass rounded-2xl p-4 text-center border"
                  style={{
                    borderColor: isEndingSoon ? '#F97316' : 'rgba(255,255,255,0.1)',
                    backgroundColor: isEndingSoon ? 'rgba(249, 115, 22, 0.1)' : undefined,
                  }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-white/60" />
                    <span className="text-xs uppercase tracking-wider text-white/50 font-bold">
                      {isEndingSoon ? 'Fading' : 'Drifts For'}
                    </span>
                  </div>
                  <div 
                    className="text-3xl font-bold"
                    style={{ 
                      color: isEndingSoon ? '#F97316' : mood.color 
                    }}
                  >
                    {hours > 0 ? `${hours}h` : `${minutes}m`}
                  </div>
                </div>
              </motion.div>
              
              {/* Energy level indicator */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/60 uppercase tracking-wider font-medium">
                    Current Energy
                  </span>
                  <span className="text-sm font-semibold capitalize" style={{ color: mood.color }}>
                    {current.activityLevel}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ 
                      width: current.activityLevel === 'lively' ? '100%' 
                        : current.activityLevel === 'active' ? '75%'
                        : current.activityLevel === 'moderate' ? '50%'
                        : '25%'
                    }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${mood.color}, ${mood.color}cc)`,
                      boxShadow: `0 0 10px ${mood.color}80`,
                    }}
                  />
                </div>
              </motion.div>
              
              {/* Enter button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={onEnter}
                className="group relative w-full px-8 py-5 rounded-2xl overflow-hidden text-lg font-bold"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Gradient background */}
                <div 
                  className="absolute inset-0 transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${mood.color}, ${mood.color}dd)`,
                  }}
                />
                
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Animated shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 rounded-2xl transition-shadow duration-300"
                  style={{
                    boxShadow: `0 0 0 0 ${mood.color}60`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 40px ${mood.color}80`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 0 0 ${mood.color}60`;
                  }}
                />
                
                {/* Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:border-white/40 transition-colors" />
                
                {/* Content */}
                <span className="relative z-10 flex items-center justify-center gap-3 text-white">
                  <Sparkles className="w-5 h-5" />
                  <span>ENTER THE CONVERSATION</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
              
              {/* Hint text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center text-xs text-white/40 mt-4"
              >
                Press ESC to close
              </motion.p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
