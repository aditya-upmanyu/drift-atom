import type { Memory } from '../types';

export const SAMPLE_MEMORIES: Memory[] = [
  {
    id: 'memory-1',
    currentId: 'current-1',
    currentTitle: 'Late Night Thoughts',
    mood: 'REFLECTIVE',
    date: new Date().toISOString(),
    quote: 'Sometimes I think we don\'t miss people. We miss who we were around them.',
    messageId: 'msg-1',
    presenceCount: 7,
    isAnchored: false,
    gradient: 'from-indigo-600/20 via-purple-600/20 to-violet-600/20',
  },
  {
    id: 'memory-2',
    currentId: 'current-5',
    currentTitle: 'Songs That Raised Us',
    mood: 'NOSTALGIC',
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    quote: 'My dad used to play "Here Comes the Sun" every Sunday morning. I hear it differently now.',
    messageId: 'msg-12',
    presenceCount: 9,
    isAnchored: false,
    gradient: 'from-amber-500/20 via-orange-500/20 to-pink-500/20',
  },
  {
    id: 'memory-3',
    currentId: 'current-4',
    currentTitle: 'Creative Block',
    mood: 'CREATIVE',
    date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    quote: 'What if the "wrong" version is actually just a different version?',
    messageId: 'msg-9',
    presenceCount: 15,
    isAnchored: false,
    gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20',
  },
  {
    id: 'memory-4',
    currentId: 'current-3',
    currentTitle: 'Things We Almost Say',
    mood: 'REFLECTIVE',
    date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    quote: 'I almost said "I\'m proud of you" but didn\'t want to seem weird. Should have said it anyway.',
    messageId: 'msg-6',
    presenceCount: 5,
    isAnchored: false,
    gradient: 'from-indigo-600/20 via-purple-600/20 to-violet-600/20',
  },
  {
    id: 'memory-5',
    currentId: 'current-6',
    currentTitle: 'Small Wins',
    mood: 'MOTIVATED',
    date: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    quote: 'Finished that task I\'ve been putting off for three weeks. Feels lighter.',
    messageId: 'msg-13',
    presenceCount: 11,
    isAnchored: false,
    gradient: 'from-orange-500/20 via-red-500/20 to-pink-500/20',
  },
];
