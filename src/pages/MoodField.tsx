import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Scene, SpatialNode, ParticleField, ConnectionLine } from '../components/3d';
import { CurrentPreview } from '../components/current/CurrentPreview';
import { MOCK_CURRENTS } from '../data/currents';
import { MOODS } from '../lib/constants';
import { useStore } from '../store/useStore';
import type { Current, MoodType } from '../types';

const MOOD_ICONS: Record<string, string> = {
  CALM: '🌊',
  CURIOUS: '🔮',
  NOSTALGIC: '🍂',
  CREATIVE: '🎨',
  MOTIVATED: '🔥',
  REFLECTIVE: '🌌',
};

export function MoodField() {
  const { mood } = useParams<{ mood: string }>();
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const [hoveredCurrentId, setHoveredCurrentId] = useState<string | null>(null);
  const [selectedCurrent, setSelectedCurrent] = useState<Current | null>(null);
  
  const moodType = mood?.toUpperCase() as MoodType;
  const moodData = MOODS[moodType];
  
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
  
  // Filter currents by selected mood
  const filteredCurrents = useMemo(() => {
    return MOCK_CURRENTS.filter(current => current.mood === moodType);
  }, [moodType]);
  
  // Generate 3D positions for mood-filtered nodes
  const nodesWithPositions = useMemo(() => {
    return filteredCurrents.map((current, index) => {
      const angle = (index / filteredCurrents.length) * Math.PI * 2;
      const radius = 4 + Math.random() * 2;
      const height = (Math.random() - 0.5) * 2.5;
      
      return {
        current,
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius,
        ] as [number, number, number],
      };
    });
  }, [filteredCurrents]);
  
  // Find connections between Currents with similar activity
  const connections = useMemo(() => {
    const conns: Array<{
      start: [number, number, number];
      end: [number, number, number];
      color: string;
    }> = [];
    
    for (let i = 0; i < nodesWithPositions.length; i++) {
      for (let j = i + 1; j < nodesWithPositions.length; j++) {
        const nodeA = nodesWithPositions[i];
        const nodeB = nodesWithPositions[j];
        
        // Connect if both are active/lively
        if (
          (nodeA.current.activityLevel === 'active' || nodeA.current.activityLevel === 'lively') &&
          (nodeB.current.activityLevel === 'active' || nodeB.current.activityLevel === 'lively')
        ) {
          conns.push({
            start: nodeA.position,
            end: nodeB.position,
            color: moodData?.color || '#8B5CF6',
          });
        }
      }
    }
    
    return conns;
  }, [nodesWithPositions, moodData]);
  
  const handleNodeClick = (current: Current) => {
    setSelectedCurrent(current);
  };
  
  const handleEnterCurrent = () => {
    if (selectedCurrent) {
      navigate(`/current/${selectedCurrent.id}`);
    }
  };
  
  if (!moodData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Mood not found</h1>
          <button
            onClick={() => navigate('/home')}
            className="text-violet-400 hover:text-violet-300"
          >
            Return to Drift Field
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Mood-specific colored background overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${moodData.color}, transparent 70%)`,
        }}
      />
      
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Scene 
          cameraPosition={[0, 0, 14]} 
          fog={true} 
          fogNear={18} 
          fogFar={45}
          orbitControls={true}
        >
          {/* Mood-colored particles */}
          <ParticleField
            count={2000}
            radius={18}
            color={moodData.color}
            size={0.025}
            speed={0.18}
          />
          
          {/* Connection lines between related Currents */}
          {connections.map((conn, i) => (
            <ConnectionLine
              key={i}
              start={conn.start}
              end={conn.end}
              color={conn.color}
            />
          ))}
          
          {/* Current nodes */}
          {nodesWithPositions.map(({ current, position }) => (
            <SpatialNode
              key={current.id}
              current={current}
              position={position}
              onClick={() => handleNodeClick(current)}
              onHover={(hovered) => setHoveredCurrentId(hovered ? current.id : null)}
            />
          ))}
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
                {/* Back button */}
                <motion.button
                  onClick={() => navigate('/home')}
                  className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
                  whileHover={{ x: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm font-medium">All Moods</span>
                </motion.button>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-4 mb-3"
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                    style={{
                      background: `linear-gradient(135deg, ${moodData.color}, ${moodData.color}cc)`,
                      boxShadow: `0 8px 24px -6px ${moodData.color}80`,
                    }}
                  >
                    {MOOD_ICONS[moodType] || moodData.icon}
                  </div>
                  <div>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                      <span 
                        className="bg-clip-text text-transparent"
                        style={{
                          backgroundImage: `linear-gradient(to right, ${moodData.color}, ${moodData.color}dd)`,
                        }}
                      >
                        {moodData.label}
                      </span>
                    </h1>
                    <p className="text-white/60 text-lg mt-1">
                      {moodData.description}
                    </p>
                  </div>
                </motion.div>
                
                <motion.p 
                  className="text-white/50 text-sm flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-xl">{user?.avatar}</span>
                  <span>{user?.displayName}</span>
                </motion.p>
              </div>

              {/* Enter live conversation button */}
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/conversation/${mood?.toLowerCase()}`)}
                className="group px-6 py-3.5 rounded-2xl font-bold text-white shadow-2xl flex items-center gap-2.5 transition-all cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${moodData.color}, ${moodData.color}cc)`,
                  boxShadow: `0 0 30px ${moodData.color}50`,
                }}
              >
                <Sparkles className="w-5 h-5" />
                <span>Enter {moodData.label} Conversation</span>
                <span>→</span>
              </motion.button>
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
          <div className="max-w-7xl mx-auto">
            <div 
              className="glass-strong rounded-3xl px-8 py-5 inline-flex items-center gap-10 border-2 shadow-2xl backdrop-blur-2xl"
              style={{
                borderColor: `${moodData.color}20`,
                boxShadow: `0 0 40px ${moodData.color}20`,
              }}
            >
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div 
                  className="text-3xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${moodData.color}, ${moodData.color}dd)`,
                  }}
                >
                  {filteredCurrents.length}
                </div>
                <div className="text-[10px] text-white/60 uppercase tracking-widest font-bold mt-1">
                  Active Currents
                </div>
              </motion.div>
              
              <div 
                className="w-px h-12 bg-gradient-to-b from-transparent to-transparent"
                style={{
                  background: `linear-gradient(to bottom, transparent, ${moodData.color}40, transparent)`,
                }}
              />
              
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div 
                  className="text-3xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${moodData.color}, ${moodData.color}dd)`,
                  }}
                >
                  {filteredCurrents.reduce((sum, c) => sum + c.presenceCount, 0)}
                </div>
                <div className="text-[10px] text-white/60 uppercase tracking-widest font-bold mt-1">
                  Drifters Here
                </div>
              </motion.div>
            </div>
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
              className="inline-block px-6 py-3 glass-strong rounded-2xl border-2 mb-4"
              style={{
                borderColor: `${moodData.color}30`,
                boxShadow: `0 0 30px ${moodData.color}20`,
              }}
            >
              <p className="text-white/50 text-sm font-mono mb-1">
                🖱️ Drag to explore • Click a sphere to enter
              </p>
              <p className="text-white font-bold text-lg">
                {filteredCurrents.length} {moodData.label.toLowerCase()} conversations
              </p>
            </motion.div>
            
            {/* Quick Access List - 2D Fallback */}
            {filteredCurrents.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                {filteredCurrents.slice(0, 4).map((current, idx) => (
                  <motion.button
                    key={current.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    onClick={() => handleNodeClick(current)}
                    className="glass-strong rounded-xl p-3 text-left hover:bg-white/10 transition-all hover:scale-105 border hover:border-white/30"
                    style={{
                      borderColor: `${moodData.color}20`,
                    }}
                  >
                    <div className="text-xs text-white/60 mb-1">{current.mood}</div>
                    <div className="text-white font-semibold text-sm line-clamp-1">{current.title}</div>
                    <div className="text-xs text-white/40 mt-1">{current.presenceCount} drifting</div>
                  </motion.button>
                ))}
              </div>
            )}
            
            {/* Empty state */}
            {filteredCurrents.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="glass-strong rounded-3xl p-12 border-2"
                style={{
                  borderColor: `${moodData.color}20`,
                }}
              >
                <div className="text-6xl mb-4">{moodData.icon}</div>
                <h3 className="text-2xl font-bold mb-3">No active {moodData.label.toLowerCase()} currents</h3>
                <p className="text-white/60 mb-6">
                  Be the first to start a {moodData.label.toLowerCase()} conversation
                </p>
                <button
                  onClick={() => navigate('/home')}
                  className="px-6 py-3 rounded-xl glass-strong border-2 hover:bg-white/10 transition-all"
                  style={{
                    borderColor: `${moodData.color}40`,
                  }}
                >
                  Explore other moods
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Hovered Current Info */}
      {hoveredCurrentId && !selectedCurrent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        >
          <div 
            className="glass-strong rounded-2xl px-6 py-4 min-w-[300px] text-center border-2"
            style={{
              borderColor: `${moodData.color}30`,
              boxShadow: `0 0 40px ${moodData.color}30`,
            }}
          >
            <div className="text-white/40 text-xs uppercase tracking-wider mb-1">
              Click to enter
            </div>
            <div className="text-white font-medium">
              Join this {moodData.label.toLowerCase()} moment
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Current Preview Modal */}
      <CurrentPreview
        current={selectedCurrent}
        onClose={() => setSelectedCurrent(null)}
        onEnter={handleEnterCurrent}
      />
    </div>
  );
}
