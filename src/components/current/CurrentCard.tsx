import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, Sparkles } from 'lucide-react';
import type { Current } from '../../types';
import { PresenceRing } from '../presence/PresenceRing';
import { formatTimeRemaining } from '../../lib/utils';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';
import { MOODS } from '../../lib/constants';

interface CurrentCardProps {
  current: Current;
  index?: number;
}

export function CurrentCard({ current, index = 0 }: CurrentCardProps) {
  const navigate = useNavigate();
  const timeRemaining = formatTimeRemaining(current.remainingTime);
  const isEndingSoon = current.remainingTime < 3600; // Less than 1 hour
  const mood = MOODS[current.mood];
  
  const activityLabels = {
    quiet: '🌙 Quiet',
    moderate: '💫 Moderate',
    active: '⚡ Active',
    lively: '🔥 Lively',
  };
  
  const activityColors = {
    quiet: 'from-blue-500/20 to-cyan-500/20',
    moderate: 'from-green-500/20 to-emerald-500/20',
    active: 'from-yellow-500/20 to-amber-500/20',
    lively: 'from-red-500/20 to-orange-500/20',
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ 
        scale: 1.03, 
        y: -12,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.4,
        type: "spring"
      }}
      onClick={() => navigate(`/current/${current.id}`)}
      className="group relative cursor-pointer"
    >
      {/* Animated glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${mood.color}40, ${mood.color}20)`
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className={cn(
        'elevated-panel-strong rounded-3xl p-6 relative overflow-hidden',
        'border border-white/10 group-hover:border-white/30 transition-all duration-300',
        'backdrop-blur-2xl',
        isEndingSoon && 'ring-2 ring-orange-500/30 animate-[pulse-urgent_2s_ease-in-out_infinite]'
      )}>
        {/* Mood gradient overlay */}
        <div 
          className={cn(
            'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-30 transition-opacity duration-500',
            activityColors[current.activityLevel]
          )} 
        />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        
        {/* Corner accent */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10"
          style={{ backgroundColor: mood.color }}
        />
        
        <div className="relative z-10">
          {/* Header with badges */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex-1">
              {/* Activity badge */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 mb-3"
              >
                <span className="text-xs font-semibold text-white">
                  {activityLabels[current.activityLevel]}
                </span>
                <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono">
                  {current.mood}
                </span>
              </motion.div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold mb-3 leading-tight tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                {current.title}
              </h3>
              
              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed line-clamp-2 font-light">
                {current.description}
              </p>
            </div>
            
            {/* Arrow button */}
            <motion.div
              className="p-3 rounded-xl glass-strong border border-white/10 group-hover:bg-white/10 group-hover:border-white/30 transition-all ml-4"
              whileHover={{ scale: 1.15, rotate: -45 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </div>
          
          {/* Stats row */}
          <div className="flex items-center gap-4 mb-4 pt-4 border-t border-white/5">
            {/* Presence */}
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg glass border border-white/10">
                <Users className="w-4 h-4 text-violet-400" />
              </div>
              <div>
                <div className="text-xs text-white/50">Active</div>
                <div className="text-sm font-bold text-white">{current.presenceCount}</div>
              </div>
            </div>
            
            {/* Divider */}
            <div className="h-10 w-px bg-white/10" />
            
            {/* Presence Ring */}
            <div className="flex-1">
              <PresenceRing
                users={current.presentUsers}
                totalCount={current.presenceCount}
                size="sm"
              />
            </div>
          </div>
          
          {/* Time Remaining */}
          <div className={cn(
            'flex items-center justify-between p-3 rounded-xl glass border border-white/10',
            isEndingSoon && 'bg-orange-500/10 border-orange-500/30'
          )}>
            <div className="flex items-center gap-2">
              <Clock className={cn(
                "w-4 h-4",
                isEndingSoon ? "text-orange-400" : "text-white/60"
              )} />
              <span className={cn(
                "text-sm font-mono font-medium",
                isEndingSoon ? "text-orange-400" : "text-white/80"
              )}>
                {timeRemaining.formatted}
              </span>
            </div>
            
            {isEndingSoon && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 text-xs font-medium text-orange-400"
              >
                <Sparkles className="w-3 h-3" />
                <span>Ending soon!</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
