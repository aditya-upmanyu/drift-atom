import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import type { Current } from '../../types';
import { PresenceRing } from '../presence/PresenceRing';
import { formatTimeRemaining } from '../../lib/utils';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';
import { MOODS } from '../../lib/constants';

interface CurrentCardProps {
  current: Current;
}

export function CurrentCard({ current }: CurrentCardProps) {
  const navigate = useNavigate();
  const timeRemaining = formatTimeRemaining(current.remainingTime);
  const isEndingSoon = current.remainingTime < 3600; // Less than 1 hour
  const mood = MOODS[current.mood];
  
  const activityLabels = {
    quiet: 'Quiet',
    moderate: 'Moderate',
    active: 'Active',
    lively: 'Lively',
  };
  
  const activityColors = {
    quiet: 'text-blue-400',
    moderate: 'text-green-400',
    active: 'text-yellow-400',
    lively: 'text-red-400',
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -8 }}
      transition={{ duration: 0.2 }}
      onClick={() => navigate(`/current/${current.id}`)}
      className={cn(
        'elevated-panel rounded-3xl p-6 cursor-pointer group relative overflow-hidden',
        'hover:ring-2 transition-all',
        isEndingSoon && 'animate-[pulse-urgent_2s_ease-in-out_infinite]'
      )}
      style={{
        ['--tw-ring-color' as any]: `${mood.color}40`,
      }}
    >
      {/* Gradient overlay with mood color tint */}
      <div 
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          current.gradient
        )} 
      />
      
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity blur-xl"
        style={{ backgroundColor: mood.color }}
      />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={cn('text-xs font-medium', activityColors[current.activityLevel])}>
                {activityLabels[current.activityLevel]}
              </span>
              <span className="text-xs text-white/40">•</span>
              <span className="text-xs text-white/60 uppercase tracking-wider">
                {current.mood}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold mb-2 group-hover:text-gradient from-white to-white/80">
              {current.title}
            </h3>
            
            <p className="text-white/60 text-sm line-clamp-2">
              {current.description}
            </p>
          </div>
          
          <motion.div
            className="p-2 rounded-full glass group-hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1, rotate: -45 }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </div>
        
        {/* Presence Ring */}
        <div className="mb-4">
          <PresenceRing
            users={current.presentUsers}
            totalCount={current.presenceCount}
            size="sm"
          />
        </div>
        
        {/* Time Remaining */}
        <div className={cn(
          'flex items-center gap-2 text-white/60 transition-colors',
          isEndingSoon && 'text-orange-400 font-medium'
        )}>
          <Clock className="w-4 h-4" />
          <span className="text-sm font-mono">{timeRemaining.formatted} remaining</span>
          {isEndingSoon && <span className="text-xs">⏰ Ending soon!</span>}
        </div>
      </div>
    </motion.div>
  );
}
