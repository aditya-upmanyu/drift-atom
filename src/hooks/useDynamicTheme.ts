import { useState, useEffect } from 'react';
import type { MoodType } from '../types';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

interface MoodHistory {
  mood: MoodType;
  timestamp: number;
  duration: number;
}

const MOOD_THEMES: Record<MoodType, ThemeColors> = {
  CALM: {
    primary: '#6366F1', // Indigo
    secondary: '#818CF8',
    accent: '#C7D2FE',
    background: '#1E1B4B',
    text: '#E0E7FF',
  },
  CURIOUS: {
    primary: '#8B5CF6', // Violet
    secondary: '#A78BFA',
    accent: '#DDD6FE',
    background: '#2E1065',
    text: '#EDE9FE',
  },
  CREATIVE: {
    primary: '#EC4899', // Pink
    secondary: '#F472B6',
    accent: '#FBCFE8',
    background: '#831843',
    text: '#FCE7F3',
  },
  NOSTALGIC: {
    primary: '#F59E0B', // Amber
    secondary: '#FBBF24',
    accent: '#FDE68A',
    background: '#78350F',
    text: '#FEF3C7',
  },
  MOTIVATED: {
    primary: '#EF4444', // Red
    secondary: '#F87171',
    accent: '#FCA5A5',
    background: '#7F1D1D',
    text: '#FEE2E2',
  },
  REFLECTIVE: {
    primary: '#3B82F6', // Blue
    secondary: '#60A5FA',
    accent: '#BFDBFE',
    background: '#1E3A8A',
    text: '#DBEAFE',
  },
};

/**
 * Dynamic theme that adapts to user's mood patterns over time
 */
export function useDynamicTheme() {
  const [currentTheme, setCurrentTheme] = useState<ThemeColors>(MOOD_THEMES.CALM);
  const [moodHistory, setMoodHistory] = useState<MoodHistory[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Load mood history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('drift-mood-history');
    if (saved) {
      try {
        const history = JSON.parse(saved) as MoodHistory[];
        setMoodHistory(history);
      } catch (e) {
        console.error('Failed to load mood history:', e);
      }
    }
  }, []);
  
  // Save mood history to localStorage
  useEffect(() => {
    if (moodHistory.length > 0) {
      localStorage.setItem('drift-mood-history', JSON.stringify(moodHistory));
    }
  }, [moodHistory]);
  
  /**
   * Track a mood selection and adapt theme
   */
  const trackMood = (mood: MoodType) => {
    const now = Date.now();
    
    setMoodHistory(prev => {
      const updated = [...prev, {
        mood,
        timestamp: now,
        duration: 0,
      }];
      
      // Keep only last 50 entries
      return updated.slice(-50);
    });
    
    // Transition to new theme
    transitionToTheme(MOOD_THEMES[mood]);
  };
  
  /**
   * Get predominant mood from recent history
   */
  const getPredominantMood = (timeWindow: number = 7 * 24 * 60 * 60 * 1000): MoodType | null => {
    const now = Date.now();
    const recentMoods = moodHistory.filter(
      m => now - m.timestamp < timeWindow
    );
    
    if (recentMoods.length === 0) return null;
    
    // Count mood occurrences
    const moodCounts: Partial<Record<MoodType, number>> = {};
    recentMoods.forEach(m => {
      moodCounts[m.mood] = (moodCounts[m.mood] || 0) + 1;
    });
    
    // Find most common mood
    let maxCount = 0;
    let predominantMood: MoodType | null = null;
    
    Object.entries(moodCounts).forEach(([mood, count]) => {
      if (count > maxCount) {
        maxCount = count;
        predominantMood = mood as MoodType;
      }
    });
    
    return predominantMood;
  };
  
  /**
   * Get adaptive theme based on mood patterns
   */
  const getAdaptiveTheme = (): ThemeColors => {
    const predominantMood = getPredominantMood();
    
    if (!predominantMood) {
      return MOOD_THEMES.CALM;
    }
    
    // Get base theme for predominant mood
    const baseTheme = MOOD_THEMES[predominantMood];
    
    // Check if user has diverse mood patterns
    const recentMoods = moodHistory.filter(
      m => Date.now() - m.timestamp < 7 * 24 * 60 * 60 * 1000
    );
    
    const uniqueMoods = new Set(recentMoods.map(m => m.mood)).size;
    
    // If diverse moods, blend themes slightly
    if (uniqueMoods >= 3) {
      return blendThemes([
        baseTheme,
        MOOD_THEMES.CURIOUS, // Add exploration accent
      ]);
    }
    
    return baseTheme;
  };
  
  /**
   * Blend multiple themes together
   */
  const blendThemes = (themes: ThemeColors[]): ThemeColors => {
    if (themes.length === 0) return MOOD_THEMES.CALM;
    if (themes.length === 1) return themes[0];
    
    const blended: ThemeColors = {
      primary: themes[0].primary,
      secondary: themes[0].secondary,
      accent: blendColors(themes.map(t => t.accent)),
      background: themes[0].background,
      text: themes[0].text,
    };
    
    return blended;
  };
  
  /**
   * Blend colors (simple average for demo)
   */
  const blendColors = (colors: string[]): string => {
    if (colors.length === 0) return '#8B5CF6';
    return colors[0]; // Simplified - use first color
  };
  
  /**
   * Smooth theme transition
   */
  const transitionToTheme = (newTheme: ThemeColors) => {
    setIsTransitioning(true);
    
    // Apply new theme after brief delay
    setTimeout(() => {
      setCurrentTheme(newTheme);
    }, 100);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };
  
  /**
   * Apply theme to CSS variables
   */
  useEffect(() => {
    const root = document.documentElement;
    
    root.style.setProperty('--color-primary', currentTheme.primary);
    root.style.setProperty('--color-secondary', currentTheme.secondary);
    root.style.setProperty('--color-accent', currentTheme.accent);
    root.style.setProperty('--color-background', currentTheme.background);
    root.style.setProperty('--color-text', currentTheme.text);
    
    // Set transition duration
    if (isTransitioning) {
      root.style.setProperty('--theme-transition', '0.8s');
    } else {
      root.style.setProperty('--theme-transition', '0s');
    }
  }, [currentTheme, isTransitioning]);
  
  return {
    currentTheme,
    trackMood,
    getPredominantMood,
    getAdaptiveTheme,
    moodHistory,
    isTransitioning,
  };
}

/**
 * Get time-of-day adaptive theme suggestions
 */
export function getTimeBasedTheme(): ThemeColors {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    // Morning - motivated/creative
    return MOOD_THEMES.MOTIVATED;
  } else if (hour >= 12 && hour < 17) {
    // Afternoon - curious/creative
    return MOOD_THEMES.CURIOUS;
  } else if (hour >= 17 && hour < 21) {
    // Evening - calm/reflective
    return MOOD_THEMES.CALM;
  } else {
    // Night - nostalgic/reflective
    return MOOD_THEMES.REFLECTIVE;
  }
}
