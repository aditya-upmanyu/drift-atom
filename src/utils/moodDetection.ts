/**
 * AI-Powered Mood Detection System
 * Uses sentiment analysis and contextual understanding to suggest moods
 */

export type MoodType = 'calm' | 'curious' | 'creative' | 'nostalgic' | 'motivated' | 'reflective';

export interface MoodScore {
  mood: MoodType;
  confidence: number;
  reason: string;
}

// Sentiment keywords mapped to moods
const MOOD_KEYWORDS = {
  calm: [
    'peaceful', 'relax', 'chill', 'zen', 'serene', 'quiet', 'tranquil', 
    'meditation', 'breathe', 'slow', 'gentle', 'soft', 'calm', 'rest',
    'ease', 'peace', 'still', 'silent', 'soothe'
  ],
  curious: [
    'wonder', 'curious', 'explore', 'discover', 'question', 'learn', 
    'why', 'how', 'what', 'interesting', 'fascinating', 'intrigued',
    'search', 'investigate', 'research', 'mystery', 'unknown', 'new'
  ],
  creative: [
    'create', 'imagine', 'design', 'art', 'music', 'write', 'build',
    'innovative', 'original', 'unique', 'express', 'craft', 'make',
    'invent', 'compose', 'paint', 'draw', 'idea', 'inspiration'
  ],
  nostalgic: [
    'remember', 'memories', 'past', 'childhood', 'used to', 'miss',
    'nostalgia', 'throwback', 'old', 'before', 'once', 'reminisce',
    'recall', 'forget', 'yesterday', 'history', 'vintage', 'classic'
  ],
  motivated: [
    'goal', 'achieve', 'success', 'energy', 'drive', 'focus', 'hustle',
    'work', 'productive', 'ambitious', 'determined', 'push', 'grind',
    'accomplish', 'win', 'progress', 'forward', 'momentum', 'power'
  ],
  reflective: [
    'think', 'ponder', 'consider', 'reflect', 'contemplate', 'introspect',
    'philosophy', 'meaning', 'purpose', 'deep', 'thoughtful', 'wisdom',
    'understand', 'realize', 'insight', 'perspective', 'meditate', 'self'
  ]
};

// Contextual patterns for deeper analysis
const MOOD_PATTERNS = {
  calm: [
    /need.*peace/i, /want.*relax/i, /feeling.*tired/i, /too much.*stress/i,
    /overwhelm/i, /anxiety/i, /need.*break/i
  ],
  curious: [
    /\?$/i, /what if/i, /i wonder/i, /how does/i, /tell me about/i,
    /explain/i, /why do/i, /interested in/i
  ],
  creative: [
    /working on/i, /building/i, /making/i, /creating/i, /designing/i,
    /writing/i, /composing/i, /need inspiration/i
  ],
  nostalgic: [
    /remember when/i, /miss the/i, /back in/i, /used to/i, /those days/i,
    /good old/i, /wish.*could.*back/i
  ],
  motivated: [
    /let's go/i, /ready to/i, /gonna/i, /will.*achieve/i, /excited to/i,
    /pumped/i, /can't wait/i, /time to/i
  ],
  reflective: [
    /been thinking/i, /what does.*mean/i, /life/i, /realize/i, /understand/i,
    /point of/i, /why am i/i, /what's the/i
  ]
};

// Time-based mood suggestions
const TIME_BASED_MOODS = {
  morning: ['motivated', 'curious', 'creative'] as MoodType[],
  afternoon: ['creative', 'motivated', 'reflective'] as MoodType[],
  evening: ['calm', 'reflective', 'nostalgic'] as MoodType[],
  night: ['calm', 'nostalgic', 'reflective'] as MoodType[]
};

/**
 * Analyze text input and return mood suggestions with confidence scores
 */
export function detectMoodFromText(text: string): MoodScore[] {
  const scores: Record<MoodType, number> = {
    calm: 0,
    curious: 0,
    creative: 0,
    nostalgic: 0,
    motivated: 0,
    reflective: 0
  };

  const lowerText = text.toLowerCase();

  // Check keywords (1 point per match)
  Object.entries(MOOD_KEYWORDS).forEach(([mood, keywords]) => {
    keywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        scores[mood as MoodType] += 1;
      }
    });
  });

  // Check patterns (5 points per match - stronger signal)
  Object.entries(MOOD_PATTERNS).forEach(([mood, patterns]) => {
    patterns.forEach(pattern => {
      if (pattern.test(text)) {
        scores[mood as MoodType] += 5;
      }
    });
  });

  // Punctuation analysis
  if (text.includes('?')) scores.curious += 2;
  if (text.includes('!')) scores.motivated += 2;
  if (text.includes('...')) scores.reflective += 2;

  // Length analysis
  if (text.length > 200) {
    scores.reflective += 3; // Long text suggests deep thinking
  }

  // Convert to sorted array with confidence
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  
  const results: MoodScore[] = (Object.entries(scores) as [MoodType, number][])
    .filter(([_, score]) => score > 0)
    .map(([mood, score]) => ({
      mood,
      confidence: totalScore > 0 ? (score / totalScore) * 100 : 0,
      reason: getMoodReason(mood, score)
    }))
    .sort((a, b) => b.confidence - a.confidence);

  return results.length > 0 ? results : getTimeBasedMoods();
}

/**
 * Get mood suggestions based on current time of day
 */
export function detectMoodFromTime(): MoodScore[] {
  const hour = new Date().getHours();
  
  let timeOfDay: keyof typeof TIME_BASED_MOODS;
  if (hour >= 5 && hour < 12) timeOfDay = 'morning';
  else if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
  else if (hour >= 17 && hour < 21) timeOfDay = 'evening';
  else timeOfDay = 'night';

  const moods = TIME_BASED_MOODS[timeOfDay];
  
  return moods.map((mood, index) => ({
    mood,
    confidence: 100 - (index * 15), // Decreasing confidence
    reason: getTimeBasedReason(mood, timeOfDay)
  }));
}

/**
 * Combine text and time analysis for best suggestions
 */
export function detectMood(text?: string): MoodScore[] {
  if (!text || text.trim().length === 0) {
    return detectMoodFromTime();
  }

  const textMoods = detectMoodFromText(text);
  const timeMoods = detectMoodFromTime();

  // If text analysis found strong matches, use those
  if (textMoods.length > 0 && textMoods[0].confidence > 30) {
    return textMoods.slice(0, 3);
  }

  // Otherwise blend with time-based suggestions
  const blended = [...textMoods, ...timeMoods];
  
  // Deduplicate and merge scores
  const merged = new Map<MoodType, MoodScore>();
  blended.forEach(score => {
    const existing = merged.get(score.mood);
    if (existing) {
      merged.set(score.mood, {
        ...score,
        confidence: (existing.confidence + score.confidence) / 2
      });
    } else {
      merged.set(score.mood, score);
    }
  });

  return Array.from(merged.values())
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);
}

function getMoodReason(mood: MoodType, score: number): string {
  const reasons: Record<MoodType, string[]> = {
    calm: [
      'Your words suggest you need peace',
      'Sensing a desire for tranquility',
      'You seem to need some rest'
    ],
    curious: [
      'Your questions show curiosity',
      'Detected exploratory thinking',
      'You seem eager to learn'
    ],
    creative: [
      'Your language shows creative energy',
      'Detected artistic expression',
      'You seem inspired to create'
    ],
    nostalgic: [
      'Your words reflect on the past',
      'Sensing memories surfacing',
      'You seem to be reminiscing'
    ],
    motivated: [
      'Your energy shows determination',
      'Detected goal-oriented thinking',
      'You seem ready to take action'
    ],
    reflective: [
      'Your thoughts show deep contemplation',
      'Detected introspective thinking',
      'You seem to be pondering deeply'
    ]
  };

  const index = Math.min(Math.floor(score / 5), reasons[mood].length - 1);
  return reasons[mood][index] || reasons[mood][0];
}

function getTimeBasedReason(mood: MoodType, timeOfDay: string): string {
  const reasons: Record<string, Record<MoodType, string>> = {
    morning: {
      calm: 'Start your day with peace',
      curious: 'Perfect time for discovery',
      creative: 'Morning inspiration flows',
      nostalgic: 'Reflect on yesterday',
      motivated: 'Energized for the day ahead',
      reflective: 'Fresh perspective awaits'
    },
    afternoon: {
      calm: 'Midday reset needed',
      curious: 'Explore new ideas',
      creative: 'Peak creative hours',
      nostalgic: 'Afternoon memories',
      motivated: 'Maintain momentum',
      reflective: 'Time to ponder'
    },
    evening: {
      calm: 'Wind down peacefully',
      curious: 'Evening exploration',
      creative: 'Creative twilight',
      nostalgic: 'Evening reflections',
      motivated: 'Finish strong',
      reflective: 'Contemplate the day'
    },
    night: {
      calm: 'Find nighttime peace',
      curious: 'Late night curiosity',
      creative: 'Nocturnal creativity',
      nostalgic: 'Memories surface at night',
      motivated: 'Prepare for tomorrow',
      reflective: 'Deep night thoughts'
    }
  };

  return reasons[timeOfDay]?.[mood] || 'Suggested for this moment';
}

function getTimeBasedMoods(): MoodScore[] {
  return detectMoodFromTime();
}

/**
 * Get a single best mood suggestion
 */
export function getBestMood(text?: string): MoodScore {
  const moods = detectMood(text);
  return moods[0] || {
    mood: 'calm',
    confidence: 50,
    reason: 'Default suggestion'
  };
}
