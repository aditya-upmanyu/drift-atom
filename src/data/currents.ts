import type { Current } from '../types';

// Rich demo data with 12 unique Currents
export const MOCK_CURRENTS: Current[] = [
  {
    id: '1',
    title: 'MIDNIGHT THOUGHTS',
    description: 'Raw thoughts that surface when the world is quiet',
    mood: 'REFLECTIVE',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000 + 42 * 60 * 1000).toISOString(),
    remainingTime: 6120, // 1h 42m
    presenceCount: 37,
    activityLevel: 'lively',
    presentUsers: [
      { id: 'u1', displayName: 'Luna', avatar: '🌙', currentMood: 'REFLECTIVE' },
      { id: 'u2', displayName: 'Star', avatar: '⭐', currentMood: 'REFLECTIVE' },
      { id: 'u3', displayName: 'Wave', avatar: '🌊', currentMood: 'CALM' },
    ],
  },
  {
    id: '2',
    title: 'THINGS WE NEVER SAY',
    description: 'The words that stay unspoken',
    mood: 'NOSTALGIC',
    createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000 + 18 * 60 * 1000).toISOString(),
    remainingTime: 8280, // 2h 18m
    presenceCount: 23,
    activityLevel: 'active',
    presentUsers: [
      { id: 'u4', displayName: 'Amber', avatar: '🔮', currentMood: 'NOSTALGIC' },
      { id: 'u5', displayName: 'Rose', avatar: '🌸', currentMood: 'NOSTALGIC' },
    ],
  },
  {
    id: '3',
    title: 'MAKE SOMETHING BEAUTIFUL',
    description: 'Share what you are creating right now',
    mood: 'CREATIVE',
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000 + 15 * 60 * 1000).toISOString(),
    remainingTime: 11700, // 3h 15m
    presenceCount: 42,
    activityLevel: 'lively',
    presentUsers: [
      { id: 'u6', displayName: 'Spark', avatar: '✨', currentMood: 'CREATIVE' },
      { id: 'u7', displayName: 'Palette', avatar: '🎨', currentMood: 'CREATIVE' },
      { id: 'u8', displayName: 'Flow', avatar: '🦋', currentMood: 'CREATIVE' },
    ],
  },
  {
    id: '4',
    title: 'QUIETLY STARTING OVER',
    description: 'New beginnings without the noise',
    mood: 'CALM',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 48 * 60 * 1000).toISOString(),
    remainingTime: 2880, // 48m - ENDING SOON
    presenceCount: 11,
    activityLevel: 'moderate',
    presentUsers: [
      { id: 'u9', displayName: 'Ocean', avatar: '🌊', currentMood: 'CALM' },
    ],
  },
  {
    id: '5',
    title: 'WHY DO WE REMEMBER?',
    description: 'Exploring memory and meaning',
    mood: 'CURIOUS',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000 + 45 * 60 * 1000).toISOString(),
    remainingTime: 9900, // 2h 45m
    presenceCount: 28,
    activityLevel: 'active',
    presentUsers: [
      { id: 'u10', displayName: 'Quest', avatar: '🗺️', currentMood: 'CURIOUS' },
      { id: 'u11', displayName: 'Wonder', avatar: '💫', currentMood: 'CURIOUS' },
    ],
  },
  {
    id: '6',
    title: 'CREATIVE AFTER DARK',
    description: 'The best ideas come at night',
    mood: 'CREATIVE',
    createdAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
    remainingTime: 5400, // 1h 30m
    presenceCount: 19,
    activityLevel: 'active',
    presentUsers: [
      { id: 'u12', displayName: 'Night', avatar: '🎭', currentMood: 'CREATIVE' },
    ],
  },
  {
    id: '7',
    title: 'SMALL WINS',
    description: 'Celebrating tiny victories',
    mood: 'MOTIVATED',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
    remainingTime: 12600, // 3h 30m
    presenceCount: 56,
    activityLevel: 'lively',
    presentUsers: [
      { id: 'u13', displayName: 'Fire', avatar: '🔥', currentMood: 'MOTIVATED' },
      { id: 'u14', displayName: 'Bolt', avatar: '⚡', currentMood: 'MOTIVATED' },
      { id: 'u15', displayName: 'Bloom', avatar: '🌺', currentMood: 'MOTIVATED' },
    ],
  },
  {
    id: '8',
    title: 'THE FUTURE WE IMAGINE',
    description: 'Dreaming out loud together',
    mood: 'CURIOUS',
    createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000 + 40 * 60 * 1000).toISOString(),
    remainingTime: 13200, // 3h 40m
    presenceCount: 34,
    activityLevel: 'active',
    presentUsers: [
      { id: 'u16', displayName: 'Comet', avatar: '☄️', currentMood: 'CURIOUS' },
      { id: 'u17', displayName: 'Prism', avatar: '🔮', currentMood: 'CURIOUS' },
    ],
  },
  {
    id: '9',
    title: 'SONGS THAT CHANGED US',
    description: 'Music and memory intertwined',
    mood: 'NOSTALGIC',
    createdAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 25 * 60 * 1000).toISOString(),
    remainingTime: 1500, // 25m - ENDING VERY SOON
    presenceCount: 15,
    activityLevel: 'moderate',
    presentUsers: [
      { id: 'u18', displayName: 'Echo', avatar: '🎵', currentMood: 'NOSTALGIC' },
    ],
  },
  {
    id: '10',
    title: 'SOMEWHERE BETWEEN',
    description: 'Not here, not there, just drifting',
    mood: 'REFLECTIVE',
    createdAt: new Date(Date.now() - 1.8 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000 + 12 * 60 * 1000).toISOString(),
    remainingTime: 7920, // 2h 12m
    presenceCount: 21,
    activityLevel: 'moderate',
    presentUsers: [
      { id: 'u19', displayName: 'Mist', avatar: '🌫️', currentMood: 'REFLECTIVE' },
      { id: 'u20', displayName: 'Drift', avatar: '🍃', currentMood: 'CALM' },
    ],
  },
  {
    id: '11',
    title: 'RANDOM 2AM IDEAS',
    description: 'Unfiltered thoughts from the void',
    mood: 'CURIOUS',
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000 + 50 * 60 * 1000).toISOString(),
    remainingTime: 13800, // 3h 50m
    presenceCount: 44,
    activityLevel: 'lively',
    presentUsers: [
      { id: 'u21', displayName: 'Chaos', avatar: '🌀', currentMood: 'CURIOUS' },
      { id: 'u22', displayName: 'Spark', avatar: '✨', currentMood: 'CREATIVE' },
    ],
  },
  {
    id: '12',
    title: 'A PLACE FOR CURIOSITY',
    description: 'Questions without pressure for answers',
    mood: 'CURIOUS',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000 + 55 * 60 * 1000).toISOString(),
    remainingTime: 6900, // 1h 55m
    presenceCount: 31,
    activityLevel: 'active',
    presentUsers: [
      { id: 'u23', displayName: 'Explorer', avatar: '🧭', currentMood: 'CURIOUS' },
      { id: 'u24', displayName: 'Key', avatar: '🔑', currentMood: 'CURIOUS' },
    ],
  },
];
