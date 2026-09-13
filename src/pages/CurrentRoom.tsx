import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, Sparkles, Check } from 'lucide-react';
import { Scene, ParticleField, FloatingOrb } from '../components/3d';
import { MessageComposer } from '../components/message/MessageComposer';
import { MOCK_CURRENTS } from '../data/currents';
import { MOODS } from '../lib/constants';
import { PresenceRing } from '../components/presence/PresenceRing';
import { RippleReaction } from '../components/ripple/RippleReaction';
import { RippleSelector } from '../components/ripple/RippleSelector';
import { RippleEffect } from '../components/ripple/RippleEffect';
import { formatTimeRemaining } from '../lib/utils';
import { useStore } from '../store/useStore';
import type { RippleType } from '../types';

// Mock moments for demo - initial state
interface MomentItem {
  id: string;
  text: string;
  author: string;
  timestamp: string;
  ripples: Record<string, number>;
}

const INITIAL_MOMENTS: MomentItem[] = [
  {
    id: '1',
    text: 'I think we miss versions of ourselves more than people.',
    author: '🌙',
    timestamp: '2m ago',
    ripples: {
      'feel-this': 12,
      'thinking': 8,
      'warmth': 15,
    },
  },
  {
    id: '2',
    text: 'Maybe uncertainty is freedom.',
    author: '⭐',
    timestamp: '8m ago',
    ripples: {
      'resonate': 23,
      'thinking': 11,
    },
  },
  {
    id: '3',
    text: 'The best conversations happen after midnight.',
    author: '🌊',
    timestamp: '14m ago',
    ripples: {
      'feel-this': 31,
      'warmth': 19,
    },
  },
];

// User avatars for demo
const USER_AVATARS = ['🌸', '🌊', '⭐', '🌙', '💫', '🌺', '🔮', '✨'];

export function CurrentRoom() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addMemory = useStore((state) => state.addMemory);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isEndingSoon, setIsEndingSoon] = useState(false);
  const [hasExpired, setHasExpired] = useState(false);
  const [memorySaved, setMemorySaved] = useState(false);
  const [moments, setMoments] = useState(INITIAL_MOMENTS);
  const [ripples, setRipples] = useState<Array<{
    id: string;
    x: number;
    y: number;
    color: string;
  }>>([]);
  
  const current = MOCK_CURRENTS.find((c) => c.id === id);
  
  useEffect(() => {
    if (!current) return;
    
    setTimeRemaining(current.remainingTime);
    setIsEndingSoon(current.remainingTime < 3600);
    
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = Math.max(0, prev - 1);
        setIsEndingSoon(newTime < 3600);
        
        // Mark as expired when time runs out
        if (newTime === 0 && !hasExpired) {
          setHasExpired(true);
        }
        
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [current, hasExpired]);
  
  if (!current) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Current not found</h2>
          <button
            onClick={() => navigate('/home')}
            className="px-6 py-3 rounded-2xl glass hover:glass-strong transition-all"
          >
            Return to Field
          </button>
        </div>
      </div>
    );
  }
  
  const mood = MOODS[current.mood];
  const timeDisplay = formatTimeRemaining(timeRemaining);
  
  const handleRipple = (type: RippleType, x: number, y: number, momentId: string) => {
    const rippleColors = {
      'resonate': '#8B5CF6',
      'feel-this': '#06B6D4',
      'thinking': '#A855F7',
      'warmth': '#FB923C',
      'energy': '#F87171',
    };
    
    const newRipple = {
      id: `${Date.now()}-${Math.random()}`,
      x,
      y,
      color: rippleColors[type],
    };
    
    setRipples((prev) => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
    
    // In real app: send to backend
    console.log('Ripple sent:', { type, momentId });
  };
  
  const handleSendMessage = (message: string) => {
    // Create new moment
    const newMoment = {
      id: `moment-${Date.now()}`,
      text: message,
      author: USER_AVATARS[Math.floor(Math.random() * USER_AVATARS.length)],
      timestamp: 'Just now',
      ripples: {},
    };
    
    // Add to beginning of moments list
    setMoments((prev) => [newMoment, ...prev]);
    
    // In real app: send to backend via WebSocket/API
    console.log('Message sent:', message);
  };
  
  const handleSaveMemory = () => {
    if (!current || memorySaved) return;
    
    // Pick a memorable quote from the conversation
    const favoriteQuote = moments[Math.floor(Math.random() * Math.min(3, moments.length))].text;
    
    // Create memory
    const memory = {
      id: `memory-${Date.now()}`,
      currentId: current.id,
      currentTitle: current.title,
      mood: current.mood,
      quote: favoriteQuote,
      messageId: `msg-${Date.now()}`,
      date: new Date().toISOString(),
      presenceCount: current.presenceCount,
      isAnchored: false,
      gradient: current.gradient || 'from-violet-500 to-purple-500',
    };
    
    addMemory(memory);
    setMemorySaved(true);
    
    // Navigate to memory trail after a delay
    setTimeout(() => {
      navigate('/memory');
    }, 2000);
  };
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Background Environment */}
      <div className="absolute inset-0 z-0">
        <Scene cameraPosition={[0, 0, 12]} fog={true} fogNear={8} fogFar={25}>
          {/* Ambient particles in mood color */}
          <ParticleField
            count={1200}
            radius={15}
            color={mood.color}
            size={0.025}
            speed={isEndingSoon ? 0.5 : 0.25}
          />
          
          {/* Central floating orb */}
          <FloatingOrb
            position={[0, 0, -5]}
            color={mood.color}
            size={2}
            speed={isEndingSoon ? 1.5 : 0.8}
            intensity={isEndingSoon ? 2 : 1.2}
          />
          
          {/* Orbiting smaller orbs representing presence */}
          {current.presentUsers.slice(0, 5).map((_, i) => {
            const angle = (i / 5) * Math.PI * 2;
            const radius = 4;
            return (
              <FloatingOrb
                key={i}
                position={[
                  Math.cos(angle) * radius,
                  Math.sin(angle) * 2,
                  Math.sin(angle) * radius - 5,
                ]}
                color={mood.color}
                size={0.4}
                speed={0.6 + i * 0.1}
                intensity={0.8}
              />
            );
          })}
        </Scene>
      </div>
      
      {/* Atmospheric color overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${mood.color}, transparent 70%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Ripple Effects */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <RippleEffect
              key={ripple.id}
              x={ripple.x}
              y={ripple.y}
              color={ripple.color}
            />
          ))}
        </AnimatePresence>
        
        {/* Premium Glass Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-20 backdrop-blur-2xl"
          style={{
            background: `linear-gradient(to bottom, rgba(7, 11, 20, 0.8), rgba(7, 11, 20, 0.6))`,
            borderBottom: `1px solid ${mood.color}20`,
            boxShadow: `0 8px 32px ${mood.color}20, 0 1px 0 ${mood.color}10`,
          }}
        >
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Left: Exit */}
              <motion.button
                onClick={() => navigate('/home')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass-strong hover:bg-white/10 transition-all border border-white/10"
                whileHover={{ scale: 1.05, x: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">EXIT</span>
              </motion.button>
              
              {/* Center: Current Info */}
              <div className="flex-1 flex items-center justify-center gap-4">
                {/* Mood Icon */}
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{
                    background: `linear-gradient(135deg, ${mood.color}, ${mood.color}cc)`,
                    boxShadow: `0 4px 12px ${mood.color}60`,
                  }}
                >
                  {mood.icon}
                </div>
                
                <div className="text-center hidden md:block">
                  <h1 className="text-xl font-bold tracking-tight line-clamp-1">
                    {current.title}
                  </h1>
                  <div className="flex items-center justify-center gap-2 text-xs text-white/60 mt-0.5">
                    <span className="uppercase tracking-wider font-medium" style={{ color: mood.color }}>
                      {mood.label}
                    </span>
                  </div>
                </div>
                
                {/* LIVE indicator */}
                <motion.div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
                  style={{
                    backgroundColor: `${mood.color}10`,
                    borderColor: `${mood.color}30`,
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 0 0 ${mood.color}00`,
                      `0 0 20px 4px ${mood.color}40`,
                      `0 0 0 0 ${mood.color}00`,
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: mood.color }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: mood.color }}>
                    LIVE
                  </span>
                </motion.div>
              </div>
              
              {/* Right: Stats */}
              <div className="flex items-center gap-4">
                {/* Drifters */}
                <div className="text-right">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-white/60" />
                    <span className="text-lg font-bold">{current.presenceCount}</span>
                  </div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold hidden sm:block">
                    Drifters
                  </div>
                </div>
                
                {/* Timer */}
                <div 
                  className="px-3 py-2 rounded-xl glass border text-right"
                  style={{
                    borderColor: isEndingSoon ? '#F9731630' : `${mood.color}20`,
                    backgroundColor: isEndingSoon ? 'rgba(249, 115, 22, 0.1)' : `${mood.color}05`,
                  }}
                >
                  <div className={`text-lg font-mono font-bold ${isEndingSoon ? 'text-orange-400' : 'text-white'}`}>
                    {timeDisplay.formatted}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider font-bold" style={{
                    color: isEndingSoon ? '#F97316' : mood.color
                  }}>
                    {isEndingSoon ? 'FADING' : 'DRIFTS FOR'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile: Current Title */}
            <div className="mt-3 text-center md:hidden">
              <h1 className="text-lg font-bold tracking-tight">{current.title}</h1>
            </div>
          </div>
        </motion.div>
        
        {/* Presence Ring Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="p-6 flex justify-center"
        >
          <div className="glass-strong rounded-3xl px-8 py-6 border border-white/10">
            <PresenceRing
              users={current.presentUsers}
              totalCount={current.presenceCount}
              size="lg"
            />
          </div>
        </motion.div>
        
        {/* Moments Section */}
        <div className="flex-1 p-6 md:p-8 pt-0">
          <div className="max-w-4xl mx-auto space-y-8">
            <AnimatePresence mode="popLayout">
              {moments.map((moment, index) => (
                <motion.div
                  key={moment.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                  className="group relative"
                  layout
                >
                  {/* Subtle glow on hover */}
                  <motion.div
                    className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ backgroundColor: `${mood.color}20` }}
                  />
                  
                  <div
                    className="relative glass-strong rounded-3xl p-6 md:p-8 border border-white/10 group-hover:border-white/20 transition-all duration-300"
                    style={{
                      boxShadow: `0 4px 24px ${mood.color}10`,
                    }}
                  >
                    {/* Top gradient accent */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl opacity-30"
                      style={{
                        background: `linear-gradient(to right, transparent, ${mood.color}, transparent)`,
                      }}
                    />
                    
                    {/* Moment Author */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="text-3xl">{moment.author}</div>
                      <div className="h-1 flex-1 opacity-20" style={{ backgroundColor: mood.color }} />
                      <div className="text-white/30 text-xs font-medium tracking-wider uppercase">
                        {moment.timestamp}
                      </div>
                    </div>
                    
                    {/* Moment Text */}
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6 font-light">
                      <span className="text-white/40 text-2xl mr-1">"</span>
                      {moment.text}
                      <span className="text-white/40 text-2xl ml-1">"</span>
                    </p>
                    
                    {/* Ripple Reactions */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Object.entries(moment.ripples).map(([rippleType, count]) => (
                        <RippleReaction
                          key={rippleType}
                          type={rippleType as RippleType}
                          count={count as number}
                          active={false}
                          onClick={() => {}}
                        />
                      ))}
                    </div>
                    
                    {/* Send Ripple */}
                    <div className="pt-4 border-t border-white/5">
                      <RippleSelector
                        momentId={moment.id}
                        onSelect={(type, x, y) => handleRipple(type, x, y, moment.id)}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Ending Message */}
        {isEndingSoon && timeRemaining < 300 && timeRemaining > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 pb-12"
          >
            <div className="max-w-3xl mx-auto">
              <motion.div
                className="relative glass-strong rounded-3xl p-8 border-2 overflow-hidden"
                style={{
                  borderColor: '#F9731640',
                  boxShadow: '0 0 60px rgba(249, 115, 22, 0.3)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 60px rgba(249, 115, 22, 0.3)',
                    '0 0 80px rgba(249, 115, 22, 0.5)',
                    '0 0 60px rgba(249, 115, 22, 0.3)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, #F97316, transparent 70%)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <div className="relative text-center">
                  <motion.div
                    className="text-5xl mb-4"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    ⏳
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 text-orange-400">
                    {timeRemaining < 60 ? 'Final moments...' : 'The current is fading'}
                  </h3>
                  <p className="text-white/70 text-lg">
                    This conversation will drift away soon. Share your last thoughts.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {/* Expired - Save Memory */}
        {hasExpired && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 pb-12"
          >
            <div className="max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                {!memorySaved ? (
                  <motion.div
                    key="save"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative"
                  >
                    {/* Particle dissolve effect */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: mood.color,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            y: [-20, -100],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.1,
                            repeat: Infinity,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </div>
                    
                    <div
                      className="relative glass-strong rounded-3xl p-8 md:p-12 border-2 text-center"
                      style={{
                        borderColor: `${mood.color}40`,
                        boxShadow: `0 0 60px ${mood.color}30`,
                      }}
                    >
                      <motion.div
                        className="text-6xl mb-6"
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        💫
                      </motion.div>
                      
                      <h3 className="text-3xl md:text-4xl font-bold mb-4">
                        This moment has drifted away
                      </h3>
                      <p className="text-xl text-white/70 mb-8 max-w-lg mx-auto">
                        Would you like to save this conversation to your Memory Trail?
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                          onClick={handleSaveMemory}
                          className="group relative px-8 py-4 rounded-2xl font-bold text-lg overflow-hidden"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {/* Gradient background */}
                          <div 
                            className="absolute inset-0"
                            style={{
                              background: `linear-gradient(135deg, ${mood.color}, ${mood.color}dd)`,
                            }}
                          />
                          
                          {/* Glow */}
                          <motion.div
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                            style={{ backgroundColor: mood.color }}
                          />
                          
                          {/* Border */}
                          <div className="absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:border-white/40 transition-colors" />
                          
                          {/* Content */}
                          <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                            <Sparkles className="w-5 h-5" />
                            <span>SAVE TO MEMORY</span>
                          </span>
                        </motion.button>
                        
                        <motion.button
                          onClick={() => navigate('/home')}
                          className="px-8 py-4 rounded-2xl font-medium border-2 border-white/20 glass hover:bg-white/10 transition-all"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Let it drift away
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="saved"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative"
                  >
                    {/* Success particles */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(30)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: mood.color,
                            left: '50%',
                            top: '50%',
                          }}
                          initial={{
                            x: 0,
                            y: 0,
                            opacity: 0,
                          }}
                          animate={{
                            x: (Math.random() - 0.5) * 400,
                            y: (Math.random() - 0.5) * 400,
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            delay: i * 0.02,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </div>
                    
                    <div
                      className="relative glass-strong rounded-3xl p-12 border-2 text-center"
                      style={{
                        borderColor: `${mood.color}60`,
                        boxShadow: `0 0 80px ${mood.color}50`,
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                        style={{
                          background: `linear-gradient(135deg, ${mood.color}, ${mood.color}dd)`,
                          boxShadow: `0 0 40px ${mood.color}80`,
                        }}
                      >
                        <Check className="w-10 h-10 text-white" strokeWidth={3} />
                      </motion.div>
                      
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                      >
                        ✦ MEMORY CAPTURED
                      </motion.h3>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-white/70 mb-2"
                      >
                        "{current.title}"
                      </motion.p>
                      
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-sm text-white/50"
                      >
                        Saved to your Memory Trail
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
        
        {/* Message Composer - hide when expired */}
        {!hasExpired && (
          <MessageComposer
            mood={current.mood}
            moodColor={mood.color}
            onSend={handleSendMessage}
          />
        )}
      </div>
    </div>
  );
}
