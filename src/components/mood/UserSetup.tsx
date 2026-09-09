import { useState } from 'react';
import { motion } from 'framer-motion';
import type { MoodType } from '../../types';
import { MOODS } from '../../lib/constants';
import { Button } from '../common/Button';
import { Scene, FloatingOrb, ParticleField } from '../3d';

interface UserSetupProps {
  mood: MoodType;
  onComplete: (name: string, avatar: string) => void;
}

const avatarOptions = ['🌙', '⭐', '🌊', '🔮', '✨', '🌸', '🦋', '🎭', '🎨', '🌺', '🍃', '💫'];

export function UserSetup({ mood, onComplete }: UserSetupProps) {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);
  
  const moodData = MOODS[mood];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete(name.trim(), selectedAvatar);
    }
  };
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene cameraPosition={[0, 0, 10]} fog={true}>
          <ParticleField
            count={800}
            radius={12}
            color={moodData.color}
            size={0.025}
            speed={0.3}
          />
          <FloatingOrb
            position={[0, 0, 0]}
            color={moodData.color}
            size={1.5}
            speed={1}
            intensity={1.5}
          />
        </Scene>
      </div>
      
      {/* Atmospheric overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${moodData.color}, transparent 60%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl w-full"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-block mb-6"
            >
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${moodData.color}, ${moodData.color}cc)`,
                  boxShadow: `0 8px 32px ${moodData.color}60`,
                }}
              >
                <span className="text-5xl">{selectedAvatar}</span>
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Welcome to the drift
              </span>
            </h1>
            
            <p className="text-xl text-white/60">
              You're feeling <span style={{ color: moodData.color }} className="font-semibold">{moodData.label}</span>
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-3 uppercase tracking-wider">
                What should we call you?
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-6 py-4 rounded-2xl glass border border-white/10 bg-white/5 text-white text-lg placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                autoFocus
                maxLength={30}
              />
            </div>
            
            {/* Avatar Selection */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-3 uppercase tracking-wider">
                Choose your presence
              </label>
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-3">
                {avatarOptions.map((avatar) => (
                  <motion.button
                    key={avatar}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar)}
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      aspect-square rounded-2xl text-3xl flex items-center justify-center
                      transition-all duration-200
                      ${selectedAvatar === avatar
                        ? 'glass-strong ring-2 ring-white/40'
                        : 'glass hover:glass-strong'
                      }
                    `}
                    style={{
                      boxShadow: selectedAvatar === avatar 
                        ? `0 4px 16px ${moodData.color}40` 
                        : undefined,
                    }}
                  >
                    {avatar}
                  </motion.button>
                ))}
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={!name.trim()}
                className="w-full text-xl py-6"
              >
                Begin Drifting
              </Button>
            </div>
          </form>
          
          {/* Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-white/40 text-sm mt-8"
          >
            No profiles. No followers. Just moments.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
