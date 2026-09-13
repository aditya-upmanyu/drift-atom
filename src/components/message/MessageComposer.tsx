import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import type { MoodType } from '../../types';

interface MessageComposerProps {
  mood: MoodType;
  moodColor: string;
  onSend: (message: string) => void;
}

const MOOD_PLACEHOLDERS: Record<MoodType, string> = {
  CALM: "Want to share a thought calmly...",
  CURIOUS: "What are you wondering about?",
  CREATIVE: "What idea is drifting through your mind?",
  NOSTALGIC: "What memory came back to you?",
  MOTIVATED: "What are you moving toward?",
  REFLECTIVE: "What's on your mind?",
};

export function MessageComposer({ mood, moodColor, onSend }: MessageComposerProps) {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-grow textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [message]);
  
  const handleSend = () => {
    const trimmed = message.trim();
    if (trimmed) {
      onSend(trimmed);
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const canSend = message.trim().length > 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky bottom-0 z-20 p-4 md:p-6"
      style={{
        background: 'linear-gradient(to top, rgba(7, 11, 20, 0.95), rgba(7, 11, 20, 0.8))',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="relative glass-strong rounded-3xl overflow-hidden border-2 transition-all duration-300"
          style={{
            borderColor: isFocused ? `${moodColor}60` : 'rgba(255,255,255,0.1)',
            boxShadow: isFocused 
              ? `0 0 40px ${moodColor}40, 0 8px 32px rgba(0,0,0,0.4)` 
              : '0 4px 24px rgba(0,0,0,0.3)',
          }}
          animate={{
            scale: isFocused ? 1.01 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Gradient accent */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1 opacity-0"
            animate={{
              opacity: isFocused ? 0.8 : 0,
            }}
            style={{
              background: `linear-gradient(to right, transparent, ${moodColor}, transparent)`,
            }}
          />
          
          <div className="flex items-end gap-3 p-4">
            {/* Textarea */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder={MOOD_PLACEHOLDERS[mood]}
                rows={1}
                className="w-full bg-transparent text-white placeholder-white/40 resize-none focus:outline-none text-base md:text-lg font-light leading-relaxed"
                style={{
                  minHeight: '44px',
                  maxHeight: '200px',
                }}
              />
              
              {/* Character count hint (optional) */}
              <AnimatePresence>
                {message.length > 200 && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute -top-6 right-0 text-xs text-white/40"
                  >
                    {message.length} characters
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Optional: Emoji/reaction picker button */}
              {/* <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-xl glass hover:bg-white/10 transition-colors"
                title="Add emoji"
              >
                <Sparkles className="w-5 h-5 text-white/60" />
              </motion.button> */}
              
              {/* Send button */}
              <motion.button
                onClick={handleSend}
                disabled={!canSend}
                className="group relative px-5 py-3 rounded-xl font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                whileHover={canSend ? { scale: 1.05 } : {}}
                whileTap={canSend ? { scale: 0.95 } : {}}
                style={{
                  background: canSend 
                    ? `linear-gradient(135deg, ${moodColor}, ${moodColor}dd)` 
                    : 'rgba(255,255,255,0.1)',
                }}
              >
                {/* Glow effect on hover */}
                {canSend && (
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-lg"
                    style={{ backgroundColor: moodColor }}
                  />
                )}
                
                {/* Content */}
                <span className="relative z-10 flex items-center gap-2 text-white">
                  <span className="hidden sm:inline font-semibold">SEND</span>
                  <Send className="w-5 h-5" />
                </span>
              </motion.button>
            </div>
          </div>
          
          {/* Hint text */}
          <AnimatePresence>
            {isFocused && !message && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 pb-3 text-xs text-white/40 flex items-center gap-4"
              >
                <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">Enter</kbd> to send</span>
                <span className="text-white/20">•</span>
                <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">Shift+Enter</kbd> for new line</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Additional hint for mobile */}
        {isFocused && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-xs text-white/30 mt-3 md:hidden"
          >
            Tap send or press Enter to share your thought
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
