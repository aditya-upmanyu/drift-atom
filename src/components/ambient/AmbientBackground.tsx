import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { getMoodBackgroundGradient } from '../../lib/utils';

export function AmbientBackground() {
  const user = useStore((state) => state.user);
  const mood = user?.currentMood || 'CALM';
  
  const gradient = getMoodBackgroundGradient(mood);
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-drift-dark-900" />
      
      {/* Animated gradient blobs */}
      <motion.div
        key={mood}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        {/* Blob 1 */}
        <motion.div
          className={`absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br ${gradient} blur-3xl opacity-30`}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Blob 2 */}
        <motion.div
          className={`absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br ${gradient} blur-3xl opacity-20`}
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        
        {/* Blob 3 */}
        <motion.div
          className={`absolute bottom-0 left-1/3 w-[450px] h-[450px] rounded-full bg-gradient-to-br ${gradient} blur-3xl opacity-25`}
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 5,
          }}
        />
      </motion.div>
      
      {/* Subtle grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
