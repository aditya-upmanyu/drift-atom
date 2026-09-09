import type { Mood, RippleType } from '../types';

// Mood definitions with gradients and colors
export const MOODS: Record<string, Mood> = {
  CALM: {
    id: 'CALM',
    label: 'Calm',
    description: 'Peaceful and centered',
    color: '#6366F1', // indigo
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    icon: 'wind',
  },
  CURIOUS: {
    id: 'CURIOUS',
    label: 'Curious',
    description: 'Ready to explore',
    color: '#06B6D4', // cyan - keeping cool
    gradient: 'from-cyan-400 via-blue-400 to-indigo-500',
    icon: 'compass',
  },
  CREATIVE: {
    id: 'CREATIVE',
    label: 'Creative',
    description: 'Inspired and imaginative',
    color: '#C084FC', // lighter purple for distinction
    gradient: 'from-purple-400 via-pink-400 to-rose-400',
    icon: 'sparkles',
  },
  NOSTALGIC: {
    id: 'NOSTALGIC',
    label: 'Nostalgic',
    description: 'Remembering warmly',
    color: '#FB923C', // warmer, more saturated orange
    gradient: 'from-amber-400 via-orange-400 to-rose-400',
    icon: 'clock',
  },
  MOTIVATED: {
    id: 'MOTIVATED',
    label: 'Motivated',
    description: 'Ready to take action',
    color: '#F87171', // warmer, more saturated red
    gradient: 'from-orange-400 via-red-400 to-pink-400',
    icon: 'zap',
  },
  REFLECTIVE: {
    id: 'REFLECTIVE',
    label: 'Reflective',
    description: 'Deep in thought',
    color: '#8B5CF6', // violet
    gradient: 'from-indigo-500 via-purple-500 to-violet-500',
    icon: 'moon',
  },
};

// Ripple type definitions
export const RIPPLE_TYPES: Record<RippleType, { label: string; emoji: string; color: string }> = {
  'resonate': {
    label: 'Resonate',
    emoji: '✨',
    color: '#A78BFA', // violet
  },
  'feel-this': {
    label: 'Feel This',
    emoji: '🌊',
    color: '#60A5FA', // blue
  },
  'thinking': {
    label: 'Thinking',
    emoji: '💭',
    color: '#C084FC', // purple
  },
  'warmth': {
    label: 'Warmth',
    emoji: '❤️',
    color: '#F87171', // red
  },
  'energy': {
    label: 'Energy',
    emoji: '⚡',
    color: '#FBBF24', // amber
  },
};

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
  MICRO: 150,
  SHORT: 250,
  MEDIUM: 400,
  LONG: 600,
  CINEMATIC: 1000,
};

// Maximum anchors allowed
export const MAX_ANCHORS = 5;

// Timer durations (in seconds)
export const CURRENT_LIFETIME = 86400; // 24 hours
export const MICRO_CIRCLE_LIFETIME = 900; // 15 minutes

// Activity level thresholds
export const ACTIVITY_THRESHOLDS = {
  quiet: 0,
  moderate: 3,
  active: 8,
  lively: 15,
};

// Presence ring display limits
export const PRESENCE_DISPLAY_LIMIT = 6;

// Local storage keys
export const STORAGE_KEYS = {
  USER: 'drift_user',
  PREFERENCES: 'drift_preferences',
  ANCHORS: 'drift_anchors',
  MEMORIES: 'drift_memories',
  CURRENT_PARTICIPATIONS: 'drift_current_participations',
  ONBOARDING: 'drift_onboarding',
};

// Default settings
export const DEFAULT_SETTINGS = {
  theme: 'dark' as const,
  ambientSound: false,
  accessibility: {
    reducedMotion: false,
    largeText: false,
    highContrast: false,
  },
};

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Z-index layers
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  navigation: 30,
  modal: 40,
  toast: 50,
  tooltip: 60,
};
