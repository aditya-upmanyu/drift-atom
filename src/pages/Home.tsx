import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Scene, SpatialNode, ParticleField, ConnectionLine } from '../components/3d';
import { MOCK_CURRENTS } from '../data/currents';
import { useStore } from '../store/useStore';
import { Button } from '../components/common/Button';
import type { Current } from '../types';

export function Home() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const [hoveredCurrentId, setHoveredCurrentId] = useState<string | null>(null);
  
  // Generate 3D positions for nodes in spatial constellation
  const nodesWithPositions = useMemo(() => {
    return MOCK_CURRENTS.map((current, index) => {
      const angle = (index / MOCK_CURRENTS.length) * Math.PI * 2;
      const radius = 5 + Math.random() * 3;
      const height = (Math.random() - 0.5) * 4;
      
      return {
        current,
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius,
        ] as [number, number, number],
      };
    });
  }, []);
  
  // Find connections between Currents (same mood or high activity)
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
        
        // Connect if same mood and both are active/lively
        if (
          nodeA.current.mood === nodeB.current.mood &&
          (nodeA.current.activityLevel === 'active' || nodeA.current.activityLevel === 'lively') &&
          (nodeB.current.activityLevel === 'active' || nodeB.current.activityLevel === 'lively')
        ) {
          conns.push({
            start: nodeA.position,
            end: nodeB.position,
            color: '#8B5CF6',
          });
        }
      }
    }
    
    return conns;
  }, [nodesWithPositions]);
  
  const handleNodeClick = (current: Current) => {
    navigate(`/current/${current.id}`);
  };
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Scene 
          cameraPosition={[0, 0, 20]} 
          fog={true} 
          fogNear={15} 
          fogFar={40}
          orbitControls={true}
        >
          {/* Ambient particles */}
          <ParticleField
            count={1500}
            radius={20}
            color="#8B5CF6"
            size={0.02}
            speed={0.15}
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
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
                  <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Drift Field
                  </span>
                </h1>
                <p className="text-white/60 text-lg">
                  {user?.displayName} {user?.avatar} · {user?.currentMood}
                </p>
              </div>
              
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/create')}
                className="flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Current
              </Button>
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
            <div className="glass rounded-2xl px-6 py-4 inline-flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-violet-400">
                  {MOCK_CURRENTS.length}
                </div>
                <div className="text-xs text-white/60 uppercase tracking-wider">
                  Active Currents
                </div>
              </div>
              
              <div className="w-px h-8 bg-white/10" />
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {MOCK_CURRENTS.reduce((sum, c) => sum + c.presenceCount, 0)}
                </div>
                <div className="text-xs text-white/60 uppercase tracking-wider">
                  People Drifting
                </div>
              </div>
              
              <div className="w-px h-8 bg-white/10" />
              
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">
                  {MOCK_CURRENTS.filter(c => c.remainingTime < 3600).length}
                </div>
                <div className="text-xs text-white/60 uppercase tracking-wider">
                  Ending Soon
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Instructions */}
        <div className="flex-1 flex items-end justify-center pb-12 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <p className="text-white/40 text-sm mb-2">
              Navigate the field with your mouse
            </p>
            <p className="text-white/60 text-lg font-medium">
              Click a node to enter a Current
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Hovered Current Info */}
      {hoveredCurrentId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        >
          <div className="glass-strong rounded-2xl px-6 py-4 min-w-[300px] text-center">
            <div className="text-white/40 text-xs uppercase tracking-wider mb-1">
              Click to enter
            </div>
            <div className="text-white font-medium">
              Explore this moment
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
