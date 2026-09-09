import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MoodType } from '../../types';
import { MOODS } from '../../lib/constants';
import { Button } from '../common/Button';
import { Scene, FloatingOrb, ParticleField } from '../3d';

interface MoodCompassProps {
  onSelectMood: (mood: MoodType) => void;
}

// 3D positions for mood orbs arranged in a circle
const moodPositions: Record<MoodType, [number, number, number]> = {
  CALM: [-3, 2, 0],
  CURIOUS: [3, 2, 0],
  CREATIVE: [0, 3, -2],
  NOSTALGIC: [-3, -1, 1],
  MOTIVATED: [3, -1, 1],
  REFLECTIVE: [0, -2, -1],
};

export function MoodCompass({ onSelectMood }: MoodCompassProps) {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [hoveredMood, setHoveredMood] = useState<MoodType | null>(null);
  
  const activeMood = hoveredMood || selectedMood;
  const activeMoodData = activeMood ? MOODS[activeMood] : null;
  
  const handleMoodClick = (moodId: MoodType) => {
    setSelectedMood(moodId);
  };
  
  const handleContinue = () => {
    if (selectedMood) {
      onSelectMood(selectedMood);
    }
  };
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <Scene cameraPosition={[0, 0, 12]} fog={true} fogNear={8} fogFar={25}>
          {/* Ambient particle field */}
          <ParticleField
            count={1000}
            radius={15}
            color={activeMoodData?.color || '#8B5CF6'}
            size={0.02}
            speed={0.2}
          />
          
          {/* Mood orbs in 3D space */}
          {Object.entries(MOODS).map(([moodId, mood]) => {
            const position = moodPositions[moodId as MoodType];
            const isHovered = hoveredMood === moodId;
            const isSelected = selectedMood === moodId;
            
            return (
              <FloatingOrb
                key={moodId}
                position={position}
                color={mood.color}
                size={isSelected ? 1.2 : isHovered ? 1.0 : 0.7}
                speed={isSelected ? 1.5 : 1}
                intensity={isSelected ? 2 : isHovered ? 1.5 : 1}
              />
            );
          })}
        </Scene>
      </div>
      
      {/* Atmospheric color overlay */}
      <AnimatePresence mode="wait">
        {activeMoodData && (
          <motion.div
            key={activeMood}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${activeMoodData.color}40, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="max-w-5xl w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                What are you drifting
                <br />
                through today?
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-light">
              Choose your emotional state
            </p>
          </motion.div>
          
          {/* Mood Selection Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12"
          >
            {Object.entries(MOODS).map(([moodId, mood], index) => {
              const isSelected = selectedMood === moodId;
              const isHovered = hoveredMood === moodId;
              
              return (
                <motion.button
                  key={moodId}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  onClick={() => handleMoodClick(moodId as MoodType)}
                  onMouseEnter={() => setHoveredMood(moodId as MoodType)}
                  onMouseLeave={() => setHoveredMood(null)}
                  whileHover={{ scale: 1.05, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    relative overflow-hidden rounded-3xl p-8
                    transition-all duration-300
                    ${isSelected 
                      ? 'glass-strong ring-2 ring-white/40' 
                      : isHovered
                      ? 'glass-strong'
                      : 'glass'
                    }
                  `}
                  style={{
                    boxShadow: isSelected || isHovered 
                      ? `0 8px 32px ${mood.color}40` 
                      : undefined,
                  }}
                >
                  {/* Colored background on hover/select */}
                  <div
                    className={`
                      absolute inset-0 opacity-0 transition-opacity duration-300
                      ${(isSelected || isHovered) && 'opacity-10'}
                    `}
                    style={{ backgroundColor: mood.color }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Color indicator */}
                    <div
                      className="w-16 h-16 rounded-2xl mb-4 transition-transform duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${mood.color}, ${mood.color}cc)`,
                        transform: isSelected ? 'scale(1.1)' : isHovered ? 'scale(1.05)' : 'scale(1)',
                        boxShadow: `0 4px 16px ${mood.color}60`,
                      }}
                    />
                    
                    <h3 className="text-2xl font-bold mb-2">{mood.label}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {mood.description}
                    </p>
                    
                    {/* Selection indicator */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute top-4 right-4"
                      >
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${mood.color}40` }}
                        >
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: mood.color }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
          
          {/* Continue Button */}
          <AnimatePresence>
            {selectedMood && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleContinue}
                  className="px-16 py-6 text-xl"
                >
                  Continue to Drift
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
