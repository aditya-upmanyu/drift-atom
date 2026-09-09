import { motion } from 'framer-motion';
import type { User } from '../../types';
import { PRESENCE_DISPLAY_LIMIT } from '../../lib/constants';

interface PresenceRingProps {
  users: User[];
  totalCount: number;
  size?: 'sm' | 'md' | 'lg';
}

export function PresenceRing({ users, totalCount, size = 'md' }: PresenceRingProps) {
  const displayUsers = users.slice(0, PRESENCE_DISPLAY_LIMIT);
  const remainingCount = Math.max(0, totalCount - PRESENCE_DISPLAY_LIMIT);
  
  const sizes = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-10 h-10 text-xl',
    lg: 'w-12 h-12 text-2xl',
  };
  
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {displayUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`${sizes[size]} rounded-full glass-strong border-2 border-drift-dark-800 flex items-center justify-center relative group`}
            title={user.displayName}
          >
            <span>{user.avatar}</span>
            
            {/* Pulse animation for active presence */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-violet-400"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
            
            {/* Tooltip on hover */}
            <div className="absolute bottom-full mb-2 px-3 py-1 bg-drift-dark-800 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {user.displayName}
            </div>
          </motion.div>
        ))}
        
        {remainingCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: displayUsers.length * 0.05 }}
            className={`${sizes[size]} rounded-full glass-strong border-2 border-drift-dark-800 flex items-center justify-center`}
          >
            <span className="text-sm font-medium">+{remainingCount}</span>
          </motion.div>
        )}
      </div>
      
      <div className="ml-3 text-sm text-white/60">
        {totalCount === 1 ? '1 person here' : `${totalCount} people here`}
      </div>
    </div>
  );
}
