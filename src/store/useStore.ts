import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Anchor, Memory, AppSettings, MoodType } from '../types';
import { DEFAULT_SETTINGS, STORAGE_KEYS } from '../lib/constants';
import { SAMPLE_MEMORIES } from '../data/memories';

interface AppState {
  // User state
  user: User | null;
  onboardingComplete: boolean;
  currentParticipations: string[];
  
  // Anchors and memories
  anchors: Anchor[];
  memories: Memory[];
  
  // Settings
  settings: AppSettings;
  
  // Demo initialization flag
  demoInitialized: boolean;
  
  // Actions
  setUser: (user: User) => void;
  updateUserMood: (mood: MoodType) => void;
  completeOnboarding: () => void;
  
  // Current participations
  joinCurrent: (currentId: string) => void;
  leaveCurrent: (currentId: string) => void;
  
  // Memory actions
  addMemory: (memory: Memory) => void;
  removeMemory: (memoryId: string) => void;
  
  // Anchor actions
  anchorMemory: (memoryId: string, position: { x: number; y: number }) => void;
  removeAnchor: (anchorId: string) => void;
  canAddAnchor: () => boolean;
  
  // Settings actions
  updateSettings: (settings: Partial<AppSettings>) => void;
  
  // Reset
  resetApp: () => void;
  
  // Demo
  initializeDemo: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      onboardingComplete: false,
      currentParticipations: [],
      anchors: [],
      memories: [],
      settings: DEFAULT_SETTINGS,
      demoInitialized: false,
      
      // User actions
      setUser: (user) => {
        set({ user, onboardingComplete: true });
        // Initialize demo data on first user creation
        if (!get().demoInitialized) {
          get().initializeDemo();
        }
      },
      
      updateUserMood: (mood) =>
        set((state) => ({
          user: state.user ? { ...state.user, currentMood: mood } : null,
        })),
      
      completeOnboarding: () => set({ onboardingComplete: true }),
      
      // Current participation actions
      joinCurrent: (currentId) =>
        set((state) => ({
          currentParticipations: [...state.currentParticipations, currentId],
        })),
      
      leaveCurrent: (currentId) =>
        set((state) => ({
          currentParticipations: state.currentParticipations.filter(
            (id) => id !== currentId
          ),
        })),
      
      // Memory actions
      addMemory: (memory) =>
        set((state) => ({
          memories: [memory, ...state.memories],
        })),
      
      removeMemory: (memoryId) =>
        set((state) => ({
          memories: state.memories.filter((m) => m.id !== memoryId),
        })),
      
      // Anchor actions
      anchorMemory: (memoryId, position) =>
        set((state) => {
          const memory = state.memories.find((m) => m.id === memoryId);
          if (!memory || state.anchors.length >= 5) return state;
          
          const anchor: Anchor = {
            id: `anchor-${Date.now()}`,
            memoryId,
            memory: { ...memory, isAnchored: true },
            anchoredAt: new Date().toISOString(),
            position,
          };
          
          return {
            anchors: [...state.anchors, anchor],
            memories: state.memories.map((m) =>
              m.id === memoryId ? { ...m, isAnchored: true } : m
            ),
          };
        }),
      
      removeAnchor: (anchorId) =>
        set((state) => {
          const anchor = state.anchors.find((a) => a.id === anchorId);
          if (!anchor) return state;
          
          return {
            anchors: state.anchors.filter((a) => a.id !== anchorId),
            memories: state.memories.map((m) =>
              m.id === anchor.memoryId ? { ...m, isAnchored: false } : m
            ),
          };
        }),
      
      canAddAnchor: () => {
        const state = get();
        return state.anchors.length < 5;
      },
      
      // Settings actions
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      
      // Reset
      resetApp: () =>
        set({
          user: null,
          onboardingComplete: false,
          currentParticipations: [],
          anchors: [],
          memories: [],
          settings: DEFAULT_SETTINGS,
          demoInitialized: false,
        }),
      
      // Demo initialization
      initializeDemo: () =>
        set({
          memories: SAMPLE_MEMORIES,
          demoInitialized: true,
        }),
    }),
    {
      name: STORAGE_KEYS.USER,
      partialize: (state) => ({
        user: state.user,
        onboardingComplete: state.onboardingComplete,
        currentParticipations: state.currentParticipations,
        anchors: state.anchors,
        memories: state.memories,
        settings: state.settings,
        demoInitialized: state.demoInitialized,
      }),
    }
  )
);
