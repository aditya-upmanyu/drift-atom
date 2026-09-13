import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Scene, ParticleField } from '../components/3d';
import { CurrentPreview } from '../components/current/CurrentPreview';
import { MOCK_CURRENTS } from '../data/currents';
import { MOODS } from '../lib/constants';
import { useStore } from '../store/useStore';
import { Button } from '../components/common/Button';
import type { Current } from '../types';

export function Home() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const [selectedCurrent, setSelectedCurrent] = useState<Current | null>(null);
  
  // Handle ESC key to close preview
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedCurrent) {
        setSelectedCurrent(null);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCurrent]);
  
  const handleNodeClick = (current: Current) => {
    console.log('=== NAVIGATION DEBUG ===');
    console.log('Current clicked:', current.title);
    console.log('Current ID:', current.id);
    console.log('Opening preview modal');
    console.log('========================');
    setSelectedCurrent(current);
  };
  
  const handleEnterCurrent = () => {
    if (selectedCurrent) {
      navigate(`/current/${selectedCurrent.id}`);
    }
  };
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 3D Scene - Disabled to prevent clipping issues */}
      <div className="absolute inset-0">
        <Scene 
          cameraPosition={[0, 0, 15]} 
          fog={true} 
          fogNear={20} 
          fogFar={50}
          orbitControls={false}
        >
          {/* Only ambient particles */}
          <ParticleField
            count={1500}
            radius={20}
            color="#8B5CF6"
            size={0.02}
            speed={0.15}
          />
        </Scene>
      </div>
      
      {/* UI Overlay */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 md:p-8"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <motion.h1 
                  className="text-5xl md:text-6xl font-bold mb-3 tracking-tight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Drift Field
                  </span>
                </motion.h1>
                <motion.p 
                  className="text-white/70 text-lg flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-2xl">{user?.avatar}</span>
                  <span className="font-medium">{user?.displayName}</span>
                  <span className="text-white/40">·</span>
                  <span className="px-3 py-1 rounded-full glass text-sm border border-white/10">
                    {user?.currentMood}
                  </span>
                </motion.p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  variant="gradient"
                  size="md"
                  onClick={() => navigate(`/conversation/${(user?.currentMood || 'calm').toLowerCase()}`)}
                  className="shadow-2xl"
                >
                  <Plus className="w-5 h-5" />
                  <span>Start Conversation</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="px-6 md:px-8"
        >
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="glass-strong rounded-3xl px-8 py-5 inline-flex items-center gap-10 border-2 border-white/10 shadow-2xl backdrop-blur-2xl">
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  {MOCK_CURRENTS.length}
                </div>
                <div className="text-[10px] text-white/60 uppercase tracking-widest font-bold mt-1">
                  Active Currents
                </div>
              </motion.div>
              
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {MOCK_CURRENTS.reduce((sum, c) => sum + c.presenceCount, 0)}
                </div>
                <div className="text-[10px] text-white/60 uppercase tracking-widest font-bold mt-1">
                  People Drifting
                </div>
              </motion.div>
              
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                  {MOCK_CURRENTS.filter(c => c.remainingTime < 3600).length}
                </div>
                <div className="text-[10px] text-white/60 uppercase tracking-widest font-bold mt-1">
                  Ending Soon
                </div>
              </motion.div>
            </div>
            
            {/* Mood Filters */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2"
            >
              <div className="text-white/40 text-xs uppercase tracking-wider font-bold flex items-center mr-2">
                Filter by mood:
              </div>
              {Object.entries(MOODS).map(([moodId, mood], idx) => (
                <motion.button
                  key={moodId}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.05 }}
                  onClick={() => navigate(`/mood/${moodId.toLowerCase()}`)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass rounded-full px-4 py-2 text-sm font-medium border border-white/10 hover:border-white/30 transition-all flex items-center gap-2 hover:shadow-lg"
                  style={{
                    boxShadow: `0 0 0 0 ${mood.color}40`,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 20px ${mood.color}60`;
                    e.currentTarget.style.borderColor = `${mood.color}50`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 0 0 ${mood.color}40`;
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  <span className="text-lg">{mood.icon}</span>
                  <span className="text-white">{mood.label}</span>
                  <span 
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${mood.color}20`,
                      color: mood.color,
                    }}
                  >
                    {MOCK_CURRENTS.filter(c => c.mood === moodId).length}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>
        
        {/* Instructions */}
        <div className="flex-1 flex items-end justify-center pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center space-y-4 w-full max-w-5xl px-6"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block px-6 py-3 glass-strong rounded-2xl border-2 border-white/20 mb-4"
            >
              <p className="text-white font-bold text-lg">
                Click a card below to enter
              </p>
            </motion.div>
            
            {/* Quick Access Grid - 2D Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              {MOCK_CURRENTS.slice(0, 4).map((current, idx) => (
                <motion.button
                  key={current.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                  onClick={() => handleNodeClick(current)}
                  className="glass-strong rounded-xl p-3 text-left hover:bg-white/10 transition-all hover:scale-105 border border-white/10 hover:border-white/30"
                >
                  <div className="text-xs text-white/60 mb-1">{current.mood}</div>
                  <div className="text-white font-semibold text-sm line-clamp-1">{current.title}</div>
                  <div className="text-xs text-white/40 mt-1">{current.presenceCount} present</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Current Preview Modal */}
      <CurrentPreview
        current={selectedCurrent}
        onClose={() => setSelectedCurrent(null)}
        onEnter={handleEnterCurrent}
      />
    </div>
  );
}
