import { motion } from 'framer-motion';
import { Settings as SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { GlassPanel } from '../components/common/GlassPanel';
import { Button } from '../components/common/Button';
import { MOODS } from '../lib/constants';
import { formatDate } from '../lib/utils';

export function Profile() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const anchors = useStore((state) => state.anchors);
  
  if (!user) {
    return null;
  }
  
  const currentMood = MOODS[user.currentMood];
  
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between mb-12"
        >
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-3xl glass-strong flex items-center justify-center text-5xl">
              {user.avatar}
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{user.displayName}</h1>
              <p className="text-white/60 mb-3">{user.bio}</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentMood.gradient}`} />
                <span>{currentMood.label}</span>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/settings')}
          >
            <SettingsIcon className="w-5 h-5" />
          </Button>
        </motion.div>
        
        {/* Constellation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6">Your Constellation</h2>
          
          <GlassPanel className="min-h-[500px] relative overflow-hidden">
            {anchors.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">⭐</div>
                  <p className="text-white/40 text-lg mb-2">
                    No moments anchored yet
                  </p>
                  <p className="text-white/30 text-sm">
                    Keep the moments that deserve to stay
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {anchors.map((anchor, i) => {
                    const nextAnchor = anchors[(i + 1) % anchors.length];
                    return (
                      <motion.line
                        key={`line-${anchor.id}`}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.2 }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        x1={`${anchor.position.x}%`}
                        y1={`${anchor.position.y}%`}
                        x2={`${nextAnchor.position.x}%`}
                        y2={`${nextAnchor.position.y}%`}
                        stroke="rgba(255, 255, 255, 0.3)"
                        strokeWidth="1"
                      />
                    );
                  })}
                </svg>
                
                {/* Anchor Points */}
                {anchors.map((anchor, index) => {
                  const mood = MOODS[anchor.memory.mood];
                  
                  return (
                    <motion.div
                      key={anchor.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.2, type: 'spring' }}
                      className="absolute group cursor-pointer"
                      style={{
                        left: `${anchor.position.x}%`,
                        top: `${anchor.position.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {/* Glow effect */}
                      <div
                        className="absolute inset-0 rounded-full blur-xl opacity-50"
                        style={{ backgroundColor: mood.color }}
                      />
                      
                      {/* Star */}
                      <div
                        className="relative w-4 h-4 rounded-full border-2 border-white bg-gradient-to-br"
                        style={{
                          boxShadow: `0 0 20px ${mood.color}`,
                          background: `radial-gradient(circle, ${mood.color}, transparent)`,
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 rounded-full border-2"
                          style={{ borderColor: mood.color }}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3,
                          }}
                        />
                      </div>
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-64">
                        <div className="glass-strong rounded-xl p-4">
                          <div className="text-xs uppercase tracking-wider text-white/60 mb-1">
                            {anchor.memory.mood}
                          </div>
                          <div className="font-bold mb-2">{anchor.memory.currentTitle}</div>
                          <p className="text-sm text-white/80 italic mb-2">"{anchor.memory.quote}"</p>
                          <div className="text-xs text-white/40">
                            {formatDate(anchor.anchoredAt, 'long')}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </>
            )}
          </GlassPanel>
          
          <div className="text-center mt-4 text-sm text-white/60">
            {anchors.length} of 5 moments anchored
            {anchors.length === 5 && (
              <span className="block mt-1 text-white/40">
                Meaning becomes clearer when everything isn't permanent.
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
