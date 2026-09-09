import { motion } from 'framer-motion';
import { Anchor as AnchorIcon, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { GlassPanel } from '../components/common/GlassPanel';
import { Button } from '../components/common/Button';
import { formatDate, getMoodGradient } from '../lib/utils';
import { MOODS } from '../lib/constants';

export function MemoryTrail() {
  const memories = useStore((state) => state.memories);
  const anchors = useStore((state) => state.anchors);
  const anchorMemory = useStore((state) => state.anchorMemory);
  const canAddAnchor = useStore((state) => state.canAddAnchor);
  
  const groupedMemories = memories.reduce((acc, memory) => {
    const date = new Date(memory.date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    let key = 'Earlier';
    if (date.toDateString() === today.toDateString()) {
      key = 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      key = 'Yesterday';
    }
    
    if (!acc[key]) acc[key] = [];
    acc[key].push(memory);
    return acc;
  }, {} as Record<string, typeof memories>);
  
  const handleAnchor = (memoryId: string) => {
    if (canAddAnchor()) {
      // Generate random position for constellation
      const position = {
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
      };
      anchorMemory(memoryId, position);
    }
  };
  
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-bold mb-4">
            Your Memory Trail
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Some moments fade.
            <br />
            Some are worth keeping.
          </p>
          
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-white/60">
            <AnchorIcon className="w-4 h-4" />
            <span>{anchors.length} / 5 moments anchored</span>
          </div>
        </motion.div>
        
        {/* Memories */}
        {memories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🌊</div>
            <p className="text-white/40 text-lg">
              Nothing has drifted here yet.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedMemories).map(([timeLabel, mems]) => (
              <div key={timeLabel}>
                <h2 className="text-2xl font-bold mb-6">{timeLabel}</h2>
                <div className="space-y-6">
                  {mems.map((memory, index) => {
                    const mood = MOODS[memory.mood];
                    const gradient = getMoodGradient(memory.mood);
                    const isAnchored = memory.isAnchored;
                    
                    return (
                      <motion.div
                        key={memory.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <GlassPanel className={`relative overflow-hidden bg-gradient-to-br ${gradient}`}>
                          {isAnchored && (
                            <div className="absolute top-4 right-4">
                              <div className="p-2 rounded-full bg-white/20">
                                <AnchorIcon className="w-4 h-4" />
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-start gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-white/10">
                              <Sparkles className="w-5 h-5" style={{ color: mood.color }} />
                            </div>
                            <div className="flex-1">
                              <div className="text-xs uppercase tracking-wider text-white/60 mb-1">
                                {memory.mood}
                              </div>
                              <h3 className="text-xl font-bold">{memory.currentTitle}</h3>
                            </div>
                          </div>
                          
                          <p className="text-white/80 leading-relaxed mb-4 italic">
                            "{memory.quote}"
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-white/60">
                              {formatDate(memory.date, 'long')} · {memory.presenceCount} {memory.presenceCount === 1 ? 'person' : 'people'} present
                            </div>
                            
                            {!isAnchored && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleAnchor(memory.id)}
                                disabled={!canAddAnchor()}
                              >
                                <AnchorIcon className="w-4 h-4 mr-2" />
                                Anchor
                              </Button>
                            )}
                          </div>
                        </GlassPanel>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
