import { motion } from 'framer-motion';
import type { Message, RippleType } from '../../types';
import { RippleButton } from '../ripple/RippleButton';
import { timeAgo } from '../../lib/utils';

interface MessageBubbleProps {
  message: Message;
  index: number;
}

export function MessageBubble({ message, index }: MessageBubbleProps) {
  const handleRipple = (type: RippleType) => {
    // Here you would normally update the ripple count in your state
    console.log('Ripple sent:', type, 'to message:', message.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.08,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
      className="mb-6 relative group"
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-violet-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 rounded-2xl blur-xl transition-all duration-300" />
      
      <div className="elevated-panel rounded-2xl p-6 relative overflow-hidden backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-all duration-300">
        {/* Subtle gradient overlay */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* User Info */}
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 rounded-full glass-strong flex items-center justify-center text-2xl border-2 border-white/10 shadow-lg"
          >
            {message.user.avatar}
          </motion.div>
          <div className="flex-1">
            <div className="font-semibold text-white">{message.user.displayName}</div>
            <div className="text-xs text-white/50 font-mono">{timeAgo(message.timestamp)}</div>
          </div>
          {/* Mood badge */}
          <div className="text-xs px-3 py-1 rounded-full glass border border-white/10">
            <span className="text-white/60">{message.user.currentMood}</span>
          </div>
        </div>
        
        {/* Message Content - Enhanced typography */}
        <blockquote className="text-white/95 text-lg leading-relaxed mb-5 italic font-light relative pl-4 border-l-2 border-violet-500/30">
          "{message.content}"
        </blockquote>
        
        {/* Actions */}
        <div className="flex items-center gap-4 relative z-10">
          <RippleButton onRipple={handleRipple} messageId={message.id} />
          
          {message.rippleCount > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-sm text-white/70 px-3 py-1.5 rounded-full glass border border-white/10"
            >
              <span className="text-base">✨</span>
              <span className="font-medium">{message.rippleCount}</span>
              <span className="text-white/50">{message.rippleCount === 1 ? 'ripple' : 'ripples'}</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
