import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { MoodType } from '../types';
import { MoodCompass } from '../components/mood/MoodCompass';
import { UserSetup } from '../components/mood/UserSetup';
import { useStore } from '../store/useStore';
import { generateId } from '../lib/utils';

export function Onboarding() {
  const [step, setStep] = useState<'mood' | 'setup'>('mood');
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  
  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    setStep('setup');
  };
  
  const handleSetupComplete = (name: string, avatar: string) => {
    if (!selectedMood) return;
    
    const user = {
      id: generateId(),
      displayName: name,
      avatar,
      currentMood: selectedMood,
      bio: 'Collecting moments, not metrics',
      joinedAt: new Date().toISOString(),
    };
    
    setUser(user);
    
    // Navigate to home with a slight delay for smooth transition
    setTimeout(() => {
      navigate('/home');
    }, 300);
  };
  
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {step === 'mood' && (
          <motion.div
            key="mood"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <MoodCompass onSelectMood={handleMoodSelect} />
          </motion.div>
        )}
        
        {step === 'setup' && selectedMood && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <UserSetup mood={selectedMood} onComplete={handleSetupComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
