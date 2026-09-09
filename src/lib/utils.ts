import { type ClassValue, clsx } from 'clsx';
import type { TimeRemaining } from '../types';

// Tailwind CSS class merger
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Format time remaining from seconds
export function formatTimeRemaining(seconds: number): TimeRemaining {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return {
    hours,
    minutes,
    seconds: secs,
    formatted,
  };
}

// Calculate time ago
export function timeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`;
  return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
}

// Format date for display
export function formatDate(date: string | Date, format: 'short' | 'long' = 'short'): string {
  const d = new Date(date);
  
  if (format === 'short') {
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }
  
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// Generate a random ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Safely parse JSON from localStorage
export function parseJSON<T>(value: string | null, defaultValue: T): T {
  if (!value) return defaultValue;
  
  try {
    return JSON.parse(value) as T;
  } catch {
    return defaultValue;
  }
}

// Get gradient classes for mood
export function getMoodGradient(moodId: string): string {
  const gradients: Record<string, string> = {
    CALM: 'from-blue-500/20 via-indigo-500/20 to-purple-500/20',
    CURIOUS: 'from-cyan-500/20 via-blue-500/20 to-indigo-500/20',
    CREATIVE: 'from-purple-500/20 via-pink-500/20 to-rose-500/20',
    NOSTALGIC: 'from-amber-500/20 via-orange-500/20 to-pink-500/20',
    MOTIVATED: 'from-orange-500/20 via-red-500/20 to-pink-500/20',
    REFLECTIVE: 'from-indigo-600/20 via-purple-600/20 to-violet-600/20',
  };
  
  return gradients[moodId] || gradients.CALM;
}

// Get background gradient for mood (stronger for backgrounds)
export function getMoodBackgroundGradient(moodId: string): string {
  const gradients: Record<string, string> = {
    CALM: 'from-blue-900/30 via-indigo-900/30 to-purple-900/30',
    CURIOUS: 'from-cyan-900/30 via-blue-900/30 to-indigo-900/30',
    CREATIVE: 'from-purple-900/30 via-pink-900/30 to-rose-900/30',
    NOSTALGIC: 'from-amber-900/30 via-orange-900/30 to-pink-900/30',
    MOTIVATED: 'from-orange-900/30 via-red-900/30 to-pink-900/30',
    REFLECTIVE: 'from-indigo-900/30 via-purple-900/30 to-violet-900/30',
  };
  
  return gradients[moodId] || gradients.CALM;
}

// Shuffle array (Fisher-Yates algorithm)
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Get random item from array
export function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Clamp number between min and max
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Linear interpolation
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

// Check if device is mobile
export function isMobile(): boolean {
  return window.innerWidth < 768;
}

// Check if device is tablet
export function isTablet(): boolean {
  return window.innerWidth >= 768 && window.innerWidth < 1024;
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
