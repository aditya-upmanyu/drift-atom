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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="mb-6 relative"
    >
      <div className="glass rounded-2xl p-6 relative overflow-hidden hover:bg-white/5 transition-colors">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full glass-strong flex items-center justify-center text-xl">
            {message.user.avatar}
          </div>
          <div>
            <div className="font-medium">{message.user.displayName}</div>
            <div className="text-xs text-white/40">{timeAgo(message.timestamp)}</div>
          </div>
        </div>
        
        {/* Message Content */}
        <p className="text-white/90 leading-relaxed mb-4">
          {message.content}
        </p>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          <RippleButton onRipple={handleRipple} messageId={message.id} />
          
          {message.rippleCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-sm text-white/60"
            >
              <span className="inline-block mr-1">✨</span>
              {message.rippleCount} {message.rippleCount === 1 ? 'ripple' : 'ripples'}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
