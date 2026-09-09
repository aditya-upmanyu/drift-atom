import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users } from 'lucide-react';
import { Scene, ParticleField, FloatingOrb } from '../components/3d';
import { MOCK_CURRENTS } from '../data/currents';
import { MOODS } from '../lib/constants';
import { PresenceRing } from '../components/presence/PresenceRing';
import { RippleReaction } from '../components/ripple/RippleReaction';
import { RippleSelector } from '../components/ripple/RippleSelector';
import { RippleEffect } from '../components/ripple/RippleEffect';
import { formatTimeRemaining } from '../lib/utils';
import type { RippleType } from '../types';

// Mock moments for demo
const MOCK_MOMENTS = [
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

export function CurrentRoom() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isEndingSoon, setIsEndingSoon] = useState(false);
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
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [current]);
  
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 md:p-8"
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start justify-between mb-6">
              <button
                onClick={() => navigate('/home')}
                className="p-3 rounded-full glass hover:glass-strong transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              {/* Countdown Timer */}
              <div className="text-center">
                <div
                  className={`text-5xl md:text-6xl font-bold font-mono mb-2 ${
                    isEndingSoon ? 'text-orange-400 animate-pulse' : 'text-white'
                  }`}
                >
                  {timeDisplay.formatted}
                </div>
                <div className="text-white/60 text-sm uppercase tracking-wider">
                  {isEndingSoon ? '⏰ Winding down' : 'Remaining'}
                </div>
              </div>
              
              {/* Presence */}
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-white/60" />
                  <span className="text-2xl font-bold">{current.presenceCount}</span>
                </div>
                <div className="text-white/60 text-sm">drifting</div>
              </div>
            </div>
            
            {/* Current Title & Description */}
            <div className="text-center mb-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
                {current.title}
              </h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                {current.description}
              </p>
              
              {/* Mood Badge */}
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: mood.color }}
                />
                <span className="text-sm font-medium">{mood.label}</span>
              </div>
            </div>
            
            {/* Presence Ring */}
            <div className="flex justify-center">
              <PresenceRing
                users={current.presentUsers}
                totalCount={current.presenceCount}
                size="lg"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Moments Section */}
        <div className="flex-1 p-6 md:p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <AnimatePresence mode="popLayout">
              {MOCK_MOMENTS.map((moment, index) => (
                <motion.div
                  key={moment.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  className="elevated-panel-strong rounded-3xl p-8"
                  style={{
                    boxShadow: `0 4px 24px ${mood.color}20`,
                  }}
                >
                  {/* Moment Author */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{moment.author}</div>
                    <div className="text-white/40 text-sm">{moment.timestamp}</div>
                  </div>
                  
                  {/* Moment Text */}
                  <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-6 font-light italic">
                    "{moment.text}"
                  </p>
                  
                  {/* Ripple Reactions */}
                  <div className="flex flex-wrap gap-3 mb-4">
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
                  <RippleSelector
                    momentId={moment.id}
                    onSelect={(type, x, y) => handleRipple(type, x, y, moment.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Ending Message */}
        {isEndingSoon && timeRemaining < 300 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 text-center"
          >
            <div className="max-w-2xl mx-auto glass-strong rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-2 text-orange-400">
                {timeRemaining < 60 ? 'Last words?' : 'The current is winding down'}
              </h3>
              <p className="text-white/60">
                This moment will pass soon. Share your final thoughts.
              </p>
            </div>
          </motion.div>
        )}
        
        {/* Bottom Spacer */}
        <div className="h-32" />
      </div>
    </div>
  );
}
