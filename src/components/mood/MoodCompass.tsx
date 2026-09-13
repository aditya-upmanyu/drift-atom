import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import type { MoodType } from '../../types';
import { MOODS } from '../../lib/constants';
import { Scene, FloatingOrb, ParticleField } from '../3d';
import { detectMood, type MoodScore } from '../../utils/moodDetection';

interface MoodCompassProps {
  onSelectMood: (mood: MoodType) => void;
}

// Exactly the 3 requested moods
export const AVAILABLE_MOODS: MoodType[] = ['CALM', 'CURIOUS', 'NOSTALGIC'];

export const MOOD_ICONS: Record<MoodType, string> = {
  CALM: '🌊',
  CURIOUS: '🔮',
  NOSTALGIC: '🍂',
  CREATIVE: '🎨',
  MOTIVATED: '🔥',
  REFLECTIVE: '🌌',
};

// 3D positions for the 3 mood orbs in space
const moodPositions: Record<MoodType, [number, number, number]> = {
  CALM: [-4, 0.5, 0],
  CURIOUS: [0, 1.8, -1.5],
  NOSTALGIC: [4, 0.5, 0],
  CREATIVE: [0, 3, -2],
  MOTIVATED: [3, -1, 1],
  REFLECTIVE: [0, -2, -1],
};

export function MoodCompass({ onSelectMood }: MoodCompassProps) {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [hoveredMood, setHoveredMood] = useState<MoodType | null>(null);
  const [userInput, setUserInput] = useState('');
  const [suggestions, setSuggestions] = useState<MoodScore[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const activeMood = hoveredMood || selectedMood;
  const activeMoodData = activeMood ? MOODS[activeMood] : null;
  
  // AI-powered mood detection filtered to available moods
  useEffect(() => {
    if (userInput.trim().length > 3) {
      const detected = detectMood(userInput);
      const filtered = detected.filter((s) =>
        AVAILABLE_MOODS.includes(s.mood.toUpperCase() as MoodType)
      );
      setSuggestions(filtered.length > 0 ? filtered : detected.slice(0, 2));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [userInput]);
  
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
        <Scene 
          cameraPosition={[0, 0, 12]} 
          fog={true} 
          fogNear={8} 
          fogFar={25}
          orbitControls={false}
        >
          {/* Ambient particle field */}
          <ParticleField
            count={1000}
            radius={15}
            color={activeMoodData?.color || '#8B5CF6'}
            size={0.02}
            speed={0.2}
          />
          
          {/* Mood orbs in 3D space for the 3 available moods */}
          {AVAILABLE_MOODS.map((moodId) => {
            const mood = MOODS[moodId];
            const position = moodPositions[moodId];
            const isHovered = hoveredMood === moodId;
            const isSelected = selectedMood === moodId;
            
            return (
              <group
                key={moodId}
                onClick={() => handleMoodClick(moodId)}
                onPointerEnter={() => setHoveredMood(moodId)}
                onPointerLeave={() => setHoveredMood(null)}
              >
                <FloatingOrb
                  position={position}
                  color={mood.color}
                  size={isSelected ? 1.3 : isHovered ? 1.05 : 0.75}
                  speed={isSelected ? 1.5 : 1}
                  intensity={isSelected ? 2 : isHovered ? 1.5 : 1}
                />
              </group>
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
            className="text-center mb-12"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                What are you drifting
                <br />
                through today?
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-light">
              Tell me how you're feeling, or choose below
            </p>
          </motion.div>
          
          {/* AI-Powered Mood Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl mx-auto mb-12 relative"
          >
            <div className="relative glass-strong backdrop-blur-2xl rounded-3xl border-2 border-white/20 p-2 shadow-2xl">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type how you're feeling... (e.g., 'feeling creative today' or 'need to relax')"
                className="w-full bg-transparent text-white placeholder-white/40 px-6 py-4 text-lg font-light resize-none focus:outline-none min-h-[80px] rounded-2xl"
                rows={2}
              />
              
              {/* AI indicator */}
              {userInput.length > 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 backdrop-blur-sm border border-violet-400/30"
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-violet-400"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-xs font-medium text-violet-300">AI analyzing</span>
                </motion.div>
              )}
            </div>
            
            {/* AI Suggestions */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-4 glass-strong backdrop-blur-2xl rounded-2xl border border-white/20"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-violet-300">🧠 AI Suggestions</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.slice(0, 3).map((suggestion) => {
                      const moodData = MOODS[suggestion.mood.toUpperCase() as MoodType];
                      if (!moodData) return null;
                      
                      return (
                        <motion.button
                          key={suggestion.mood}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedMood(suggestion.mood.toUpperCase() as MoodType);
                            setUserInput('');
                            setSuggestions([]);
                          }}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/20 hover:border-white/40 transition-all group"
                        >
                          <span className="text-lg">{moodData.icon}</span>
                          <div className="text-left">
                            <div className="text-sm font-medium text-white">{moodData.label}</div>
                            <div className="text-xs text-white/60">
                              {Math.round(suggestion.confidence)}% match
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                  <div className="mt-3 text-xs text-white/50 font-light italic">
                    {suggestions[0]?.reason}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Mood Selection Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {AVAILABLE_MOODS.map((moodId, index) => {
              const mood = MOODS[moodId];
              const isSelected = selectedMood === moodId;
              const isHovered = hoveredMood === moodId;
              
              return (
                <motion.button
                  key={moodId}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    delay: 0.5 + index * 0.1, 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100
                  }}
                  onClick={() => handleMoodClick(moodId as MoodType)}
                  onMouseEnter={() => setHoveredMood(moodId as MoodType)}
                  onMouseLeave={() => setHoveredMood(null)}
                  whileHover={{ scale: 1.08, y: -12 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    relative overflow-hidden rounded-3xl p-8 text-left
                    transition-all duration-500 group
                    ${isSelected 
                      ? 'glass-strong ring-4 ring-white/50 shadow-2xl' 
                      : isHovered
                      ? 'glass-strong shadow-2xl'
                      : 'glass shadow-xl'
                    }
                    backdrop-blur-2xl border-2
                    ${isSelected || isHovered ? 'border-white/30' : 'border-white/10'}
                  `}
                  style={{
                    boxShadow: isSelected || isHovered 
                      ? `0 20px 60px -15px ${mood.color}60, 0 0 0 1px ${mood.color}20` 
                      : undefined,
                  }}
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500"
                    animate={{
                      opacity: (isSelected || isHovered) ? 0.15 : 0,
                    }}
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${mood.color}60, transparent 70%)`,
                    }}
                  />
                  
                  {/* Glow effect */}
                  {(isSelected || isHovered) && (
                    <motion.div
                      className="absolute -inset-1 rounded-3xl blur-2xl opacity-30"
                      style={{ backgroundColor: mood.color }}
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                  
                  {/* Top corner decoration */}
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10 transition-opacity duration-500"
                    style={{ 
                      backgroundColor: mood.color,
                      opacity: (isSelected || isHovered) ? 0.2 : 0.05
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon/Color indicator with mood-specific animations */}
                    <motion.div
                      className="relative mb-6"
                      animate={{
                        scale: isSelected ? 1.1 : isHovered ? 1.05 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {/* CALM - Breathing glow */}
                      {moodId === 'CALM' && (
                        <motion.div
                          className="absolute -inset-2 rounded-3xl"
                          style={{
                            background: `radial-gradient(circle, ${mood.color}40, transparent 70%)`,
                          }}
                          animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.4, 0.7, 0.4],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                      
                      {/* CURIOUS - Orbiting particles */}
                      {moodId === 'CURIOUS' && (isHovered || isSelected) && (
                        <>
                          {[...Array(4)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: mood.color }}
                              animate={{
                                x: [
                                  Math.cos((i / 4) * Math.PI * 2) * 40,
                                  Math.cos((i / 4) * Math.PI * 2 + Math.PI) * 40,
                                  Math.cos((i / 4) * Math.PI * 2) * 40,
                                ],
                                y: [
                                  Math.sin((i / 4) * Math.PI * 2) * 40,
                                  Math.sin((i / 4) * Math.PI * 2 + Math.PI) * 40,
                                  Math.sin((i / 4) * Math.PI * 2) * 40,
                                ],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                                delay: i * 0.25,
                              }}
                            />
                          ))}
                        </>
                      )}
                      
                      {/* CREATIVE - Flowing energy */}
                      {moodId === 'CREATIVE' && (
                        <motion.div
                          className="absolute -inset-3 rounded-3xl opacity-50"
                          style={{
                            background: `linear-gradient(90deg, ${mood.color}00, ${mood.color}80, ${mood.color}00)`,
                          }}
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      )}
                      
                      {/* NOSTALGIC - Fading particles */}
                      {moodId === 'NOSTALGIC' && (isHovered || isSelected) && (
                        <>
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 rounded-full"
                              style={{ 
                                backgroundColor: mood.color,
                                left: '50%',
                                top: '50%'
                              }}
                              animate={{
                                x: [0, (Math.random() - 0.5) * 60],
                                y: [0, (Math.random() - 0.5) * 60],
                                opacity: [1, 0],
                                scale: [1, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.4,
                                ease: "easeOut"
                              }}
                            />
                          ))}
                        </>
                      )}
                      
                      {/* MOTIVATED - Energetic pulse */}
                      {moodId === 'MOTIVATED' && (
                        <motion.div
                          className="absolute -inset-1 rounded-2xl"
                          style={{
                            backgroundColor: mood.color,
                          }}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0, 0.6, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeOut"
                          }}
                        />
                      )}
                      
                      {/* REFLECTIVE - Slow rotating ring */}
                      {moodId === 'REFLECTIVE' && (
                        <motion.div
                          className="absolute -inset-4 rounded-full border-2 opacity-50"
                          style={{
                            borderColor: mood.color,
                          }}
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            rotate: {
                              duration: 6,
                              repeat: Infinity,
                              ease: "linear"
                            },
                            scale: {
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }
                          }}
                        />
                      )}
                      
                      <motion.div
                        className="w-20 h-20 rounded-2xl relative overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${mood.color}, ${mood.color}cc)`,
                          boxShadow: `0 8px 24px -6px ${mood.color}80`,
                        }}
                      >
                        {/* Inner glow */}
                        <div 
                          className="absolute inset-0 rounded-2xl"
                          style={{
                            background: `radial-gradient(circle at 40% 40%, rgba(255,255,255,0.3), transparent 60%)`,
                          }}
                        />
                        
                        {/* Animated shine */}
                        {(isSelected || isHovered) && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent"
                            animate={{
                              x: ['-100%', '100%'],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                              repeatDelay: 1
                            }}
                          />
                        )}
                        
                        {/* Icon */}
                        <div className="absolute inset-0 flex items-center justify-center text-4xl">
                          {MOOD_ICONS[moodId] || mood.icon}
                        </div>
                      </motion.div>
                    </motion.div>
                    
                    {/* Text content */}
                    <div className="space-y-3">
                      <h3 className="text-3xl font-bold tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all">
                        {mood.label}
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed font-light min-h-[40px]">
                        {mood.description}
                      </p>
                    </div>
                    
                    {/* Selection indicator */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0, rotate: -180 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        className="absolute top-6 right-6"
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      >
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center ring-4 ring-white/20"
                          style={{ 
                            backgroundColor: `${mood.color}60`,
                            boxShadow: `0 0 20px ${mood.color}60`
                          }}
                        >
                          <motion.div 
                            className="w-5 h-5 rounded-full"
                            style={{ backgroundColor: mood.color }}
                            animate={{
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Hover indicator */}
                    {isHovered && !isSelected && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute bottom-6 right-6 text-xs text-white/60 font-medium"
                      >
                        Click to select
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
          
          {/* Action Area: Selected Mood & Enter the Conversation */}
          <div className="max-w-md mx-auto text-center min-h-[140px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {selectedMood ? (
                <motion.div
                  key={selectedMood}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="flex flex-col items-center justify-center space-y-3 w-full"
                >
                  {/* Selected Mood Name clearly displayed near/above the button */}
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 px-6 py-2 rounded-full glass-strong border border-white/20 shadow-xl"
                  >
                    <span className="text-2xl">{MOOD_ICONS[selectedMood]}</span>
                    <span
                      className="text-2xl md:text-3xl font-extrabold tracking-wide text-white"
                    >
                      {MOODS[selectedMood]?.label}
                    </span>
                    <span 
                      className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full"
                      style={{ 
                        backgroundColor: `${MOODS[selectedMood]?.color}30`,
                        color: MOODS[selectedMood]?.color,
                      }}
                    >
                      Selected
                    </span>
                  </motion.div>

                  {/* Enter the Conversation Button */}
                  <motion.button
                    onClick={handleContinue}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="group relative px-10 py-5 rounded-2xl font-extrabold text-lg md:text-xl text-white overflow-hidden shadow-2xl min-w-[300px] md:min-w-[340px] cursor-pointer"
                    style={{
                      boxShadow: `0 0 45px ${MOODS[selectedMood]?.color}60, 0 10px 30px rgba(0,0,0,0.5)`,
                    }}
                  >
                    {/* Gradient background */}
                    <div
                      className="absolute inset-0 transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${MOODS[selectedMood]?.color}, ${MOODS[selectedMood]?.color}dd)`,
                      }}
                    />

                    {/* Shimmer sweep */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        repeatDelay: 0.8,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* Border highlight */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-white/30 group-hover:border-white/60 transition-colors" />

                    {/* Text and icons */}
                    <span className="relative z-10 flex items-center justify-center gap-3 tracking-wide">
                      <Sparkles className="w-5 h-5 text-white/90" />
                      <span>Enter the Conversation</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.span>
                    </span>
                  </motion.button>

                  <p className="text-xs text-white/50 tracking-wider">
                    Opens the live {MOODS[selectedMood]?.label.toLowerCase()} conversation space
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="unselected"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-3"
                >
                  <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass border border-white/10 text-white/60 text-sm shadow-md">
                    <Sparkles className="w-4 h-4 text-violet-300 animate-pulse" />
                    <span>Select <strong>Calm</strong>, <strong>Curious</strong>, or <strong>Nostalgic</strong> above to enter</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
