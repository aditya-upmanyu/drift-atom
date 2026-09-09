// Core Types for DRIFT

export type MoodType = 'CALM' | 'CURIOUS' | 'CREATIVE' | 'NOSTALGIC' | 'MOTIVATED' | 'REFLECTIVE';

export interface Mood {
  id: MoodType;
  label: string;
  description: string;
  color: string;
  gradient: string;
  icon: string;
}

export interface User {
  id: string;
  displayName: string;
  avatar: string;
  currentMood: MoodType;
  bio?: string;
  joinedAt?: string;
}

export interface Current {
  id: string;
  title: string;
  description: string;
  mood: MoodType;
  createdAt: string;
  expiresAt: string;
  remainingTime: number; // in seconds
  presenceCount: number;
  presentUsers: User[];
  activityLevel: 'quiet' | 'moderate' | 'active' | 'lively';
  gradient?: string;
  isActive?: boolean;
}

export interface Message {
  id: string;
  currentId: string;
  userId: string;
  user: User;
  content: string;
  timestamp: string;
  ripples: Ripple[];
  rippleCount: number;
}

export type RippleType = 'resonate' | 'feel-this' | 'thinking' | 'warmth' | 'energy';

export interface Ripple {
  id: string;
  messageId: string;
  userId: string;
  type: RippleType;
  timestamp: string;
}

export interface Memory {
  id: string;
  currentId: string;
  currentTitle: string;
  mood: MoodType;
  date: string;
  quote: string;
  messageId: string;
  presenceCount: number;
  isAnchored: boolean;
  gradient: string;
}

export interface Anchor {
  id: string;
  memoryId: string;
  memory: Memory;
  anchoredAt: string;
  position: { x: number; y: number }; // for constellation
}

export interface MicroCircle {
  id: string;
  title: string;
  purpose: string;
  participants: User[];
  messages: Message[];
  createdAt: string;
  expiresAt: string;
  remainingTime: number;
  mood: MoodType;
}

export interface AccessibilitySettings {
  reducedMotion: boolean;
  largeText: boolean;
  highContrast: boolean;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  ambientSound: boolean;
  accessibility: AccessibilitySettings;
}

export interface UserState {
  user: User | null;
  onboardingComplete: boolean;
  settings: AppSettings;
  anchors: Anchor[];
  memories: Memory[];
  currentParticipations: string[]; // Current IDs user has joined
}

// Utility types
export interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
}

export interface PresenceRing {
  users: User[];
  totalCount: number;
  showCount: number;
}
