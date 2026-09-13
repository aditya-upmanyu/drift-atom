import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Users, 
  Sparkles, 
  Bookmark, 
  Check 
} from 'lucide-react';
import { Scene, ParticleField } from '../components/3d';
import { MessageComposer } from '../components/message/MessageComposer';
import { RippleEffect } from '../components/ripple/RippleEffect';
import { MOODS } from '../lib/constants';
import { useStore } from '../store/useStore';
import { generateId } from '../lib/utils';
import type { MoodType } from '../types';

export interface ConversationMessage {
  id: string;
  author: string;
  authorName: string;
  text: string;
  timestamp: string;
  ripples: Record<string, number>;
}

export const MOOD_ICONS: Record<MoodType, string> = {
  CALM: '🌊',
  CURIOUS: '🔮',
  NOSTALGIC: '🍂',
  CREATIVE: '🎨',
  MOTIVATED: '🔥',
  REFLECTIVE: '🌌',
};

// Rich, nuanced conversation messages for the 3 core moods
const MOOD_CONVERSATIONS: Record<MoodType, ConversationMessage[]> = {
  CALM: [
    {
      id: 'calm-1',
      author: '🌙',
      authorName: 'Luna',
      text: 'Sometimes the most productive thing you can do is just close your eyes and let the world spin without your permission.',
      timestamp: '2m ago',
      ripples: { 'feel-this': 28, warmth: 19, resonate: 14 },
    },
    {
      id: 'calm-2',
      author: '🌊',
      authorName: 'River',
      text: 'There is a quiet magic in 6 AM silence. The morning feels like a fresh page that hasn\'t been scribbled on yet.',
      timestamp: '6m ago',
      ripples: { 'feel-this': 35, resonate: 29, warmth: 16 },
    },
    {
      id: 'calm-3',
      author: '🍃',
      authorName: 'Zephyr',
      text: 'Turned off all notifications for an hour and listened to the rain tapping the glass. We rush around so much for things that don\'t even matter.',
      timestamp: '11m ago',
      ripples: { resonate: 42, 'feel-this': 39, thinking: 18 },
    },
    {
      id: 'calm-4',
      author: '🍵',
      authorName: 'Milo',
      text: 'Not every thought requires a reaction or a plan. Some thoughts just need space to gently drift away like clouds.',
      timestamp: '18m ago',
      ripples: { thinking: 31, warmth: 25, resonate: 20 },
    },
    {
      id: 'calm-5',
      author: '🕊️',
      authorName: 'Seraph',
      text: 'Breathe in stillness. Breathe out whatever was heavy from yesterday. You are allowed to simply exist right here.',
      timestamp: '24m ago',
      ripples: { warmth: 63, resonate: 51, 'feel-this': 38 },
    },
  ],
  CURIOUS: [
    {
      id: 'curious-1',
      author: '⭐',
      authorName: 'Nova',
      text: 'What if dreams aren\'t just illusions, but brief glimpses into parallel timelines where our choices took a different turn?',
      timestamp: '1m ago',
      ripples: { thinking: 49, resonate: 41, energy: 32 },
    },
    {
      id: 'curious-2',
      author: '🔮',
      authorName: 'Mira',
      text: 'I wonder what would happen if we could perceive sounds as shifting colors and colors as musical chords in real time...',
      timestamp: '4m ago',
      ripples: { resonate: 54, thinking: 33, energy: 36 },
    },
    {
      id: 'curious-3',
      author: '🌌',
      authorName: 'Sol',
      text: 'Has anyone else realized that looking up at the night sky is literally looking backwards in time across billions of years? We are stargazing into the past.',
      timestamp: '8m ago',
      ripples: { thinking: 68, resonate: 45, energy: 31 },
    },
    {
      id: 'curious-4',
      author: '🧭',
      authorName: 'Orion',
      text: 'If conscious minds didn\'t exist to observe the universe, would wonder or beauty even exist? Or are we the universe creating meaning for itself?',
      timestamp: '14m ago',
      ripples: { thinking: 61, resonate: 39, 'feel-this': 27 },
    },
    {
      id: 'curious-5',
      author: '💫',
      authorName: 'Lyra',
      text: 'What is the deepest concept or rabbit hole you\'ve fallen into at 2 AM that completely reorganized how you see everyday life?',
      timestamp: '21m ago',
      ripples: { energy: 44, thinking: 39, resonate: 28 },
    },
  ],
  NOSTALGIC: [
    {
      id: 'nostalgic-1',
      author: '🍂',
      authorName: 'Rowan',
      text: 'Remember when we used to record mixtapes off the radio and pray the DJ wouldn\'t talk over the outro of our favorite song?',
      timestamp: '2m ago',
      ripples: { warmth: 65, resonate: 58, 'feel-this': 43 },
    },
    {
      id: 'nostalgic-2',
      author: '📼',
      authorName: 'Cass',
      text: 'I miss handwritten letters. Finding an old folded note in a winter jacket pocket from 2017 hit me right in the chest today.',
      timestamp: '5m ago',
      ripples: { 'feel-this': 57, warmth: 52, resonate: 40 },
    },
    {
      id: 'nostalgic-3',
      author: '🌅',
      authorName: 'Amber',
      text: 'Sometimes I wish I could step through a doorway and relive just one carefree summer dusk from childhood when the streetlights first turned on.',
      timestamp: '9m ago',
      ripples: { warmth: 72, 'feel-this': 63, resonate: 49 },
    },
    {
      id: 'nostalgic-4',
      author: '🎵',
      authorName: 'Echo',
      text: 'That uncanny feeling when a song you haven\'t heard in ten years plays randomly and instantly brings back the exact smell and weather of an entire year of your life.',
      timestamp: '16m ago',
      ripples: { resonate: 76, 'feel-this': 68, thinking: 31 },
    },
    {
      id: 'nostalgic-5',
      author: '☕',
      authorName: 'Julian',
      text: 'The scent of autumn leaves, damp asphalt, and old paperback books will forever feel like home to me.',
      timestamp: '27m ago',
      ripples: { warmth: 51, resonate: 43, 'feel-this': 39 },
    },
  ],
  CREATIVE: [
    {
      id: 'creative-1',
      author: '🎨',
      authorName: 'Palette',
      text: 'Just had an idea for a story where colors have distinct emotional personalities and conflicts.',
      timestamp: '3m ago',
      ripples: { resonate: 22, energy: 18 },
    },
  ],
  MOTIVATED: [
    {
      id: 'motivated-1',
      author: '🔥',
      authorName: 'Blaze',
      text: 'Small steps every day. That is how mountains get climbed.',
      timestamp: '1m ago',
      ripples: { energy: 35, resonate: 20 },
    },
  ],
  REFLECTIVE: [
    {
      id: 'reflective-1',
      author: '🌌',
      authorName: 'Kael',
      text: 'I think we miss versions of ourselves more than people.',
      timestamp: '3m ago',
      ripples: { thinking: 30, resonate: 24 },
    },
  ],
};

const MOOD_TITLES: Record<MoodType, string> = {
  CALM: 'Calm Sanctuary',
  CURIOUS: 'Curious Horizon',
  NOSTALGIC: 'Nostalgic Stream',
  CREATIVE: 'Creative Sparks',
  MOTIVATED: 'Moving Forward',
  REFLECTIVE: 'Deep Thoughts',
};

const MOOD_DESCRIPTIONS: Record<MoodType, string> = {
  CALM: 'A quiet, peaceful sanctuary for gentle thoughts and unhurried stillness.',
  CURIOUS: 'An open space for cosmic wonder, deep questions, and parallel thinking.',
  NOSTALGIC: 'A warm haven for cherished memories, old songs, and timeless feelings.',
  CREATIVE: 'Where imagination flows freely without boundaries.',
  MOTIVATED: 'Energy and forward momentum in motion.',
  REFLECTIVE: 'Contemplating life\'s deeper undercurrents.',
};

const PROMPT_STARTERS: Record<MoodType, string[]> = {
  CALM: [
    'Take a slow breath right now...',
    'Early morning silence feels like...',
    'Letting go of what I cannot control...',
    'A quiet moment that grounded me today...',
  ],
  CURIOUS: [
    'What if the universe is conscious?',
    'Why do our minds ponder at night?',
    'A mystery I can never stop thinking about...',
    'If we could communicate across time...',
  ],
  NOSTALGIC: [
    'A song that takes me right back...',
    'Summer evenings from childhood...',
    'The sound of rain against the window...',
    'Things from the past I miss the most...',
  ],
  CREATIVE: ['What if colors had voices?', 'Creating something from nothing...'],
  MOTIVATED: ['One small step today...', 'Focus on what matters...'],
  REFLECTIVE: ['Who I was five years ago...', 'Finding meaning in stillness...'],
};

export function MoodConversation() {
  const { mood: paramMood } = useParams<{ mood: string }>();
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const updateUserMood = useStore((state) => state.updateUserMood);
  const addMemory = useStore((state) => state.addMemory);

  // Normalize mood: priority to route param, then store user mood, default to CALM
  const rawMood = (paramMood || user?.currentMood || 'CALM').toUpperCase();
  const activeMood: MoodType = (['CALM', 'CURIOUS', 'NOSTALGIC'] as MoodType[]).includes(rawMood as MoodType)
    ? (rawMood as MoodType)
    : 'CALM';

  const mood = MOODS[activeMood];

  // Conversation state
  const [messages, setMessages] = useState<ConversationMessage[]>(() => MOOD_CONVERSATIONS[activeMood] || []);
  const [showWelcome, setShowWelcome] = useState(true);
  const [userReactions, setUserReactions] = useState<Record<string, Record<string, boolean>>>({});
  const [savedMemoryIds, setSavedMemoryIds] = useState<Record<string, boolean>>({});
  const [ripples, setRipples] = useState<Array<{ id: string; x: number; y: number; color: string }>>([]);

  // Sync state when activeMood changes
  useEffect(() => {
    setMessages(MOOD_CONVERSATIONS[activeMood] || []);
    setShowWelcome(true);
    const timer = setTimeout(() => setShowWelcome(false), 2200);

    // Sync with user in store
    if (!user) {
      setUser({
        id: generateId(),
        displayName: 'Drifter',
        avatar: MOOD_ICONS[activeMood] || '✨',
        currentMood: activeMood,
        bio: 'Drifting through shared feelings',
        joinedAt: new Date().toISOString(),
      });
    } else if (user.currentMood !== activeMood) {
      updateUserMood(activeMood);
    }
    useStore.getState().completeOnboarding();

    return () => clearTimeout(timer);
  }, [activeMood]);

  // Handle switching mood directly from the conversation
  const handleSwitchMood = (newMood: MoodType) => {
    navigate(`/conversation/${newMood.toLowerCase()}`);
  };

  // Handle sending a new message
  const handleSendMessage = (text: string) => {
    const newMessage: ConversationMessage = {
      id: `msg-${Date.now()}`,
      author: user?.avatar || MOOD_ICONS[activeMood] || '✨',
      authorName: user?.displayName || 'You',
      text,
      timestamp: 'Just now',
      ripples: { resonate: 1 },
    };
    setMessages((prev) => [newMessage, ...prev]);
  };

  // Handle ripple reactions
  const handleRipple = (messageId: string, rippleType: string, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const rippleColor = mood.color;
    const newRipple = {
      id: `${Date.now()}-${Math.random()}`,
      x,
      y,
      color: rippleColor,
    };
    setRipples((prev) => [...prev, newRipple]);

    // Update count and reaction state
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const currentCount = msg.ripples[rippleType] || 0;
          const hasReacted = userReactions[messageId]?.[rippleType];
          return {
            ...msg,
            ripples: {
              ...msg.ripples,
              [rippleType]: hasReacted ? Math.max(0, currentCount - 1) : currentCount + 1,
            },
          };
        }
        return msg;
      })
    );

    setUserReactions((prev) => ({
      ...prev,
      [messageId]: {
        ...prev[messageId],
        [rippleType]: !prev[messageId]?.[rippleType],
      },
    }));
  };

  // Handle saving a message to memory
  const handleSaveMemory = (msg: ConversationMessage) => {
    if (savedMemoryIds[msg.id]) return;

    addMemory({
      id: `mem-${Date.now()}`,
      currentId: activeMood.toLowerCase(),
      currentTitle: `${mood.label} Conversation`,
      mood: activeMood,
      quote: msg.text,
      messageId: msg.id,
      date: new Date().toISOString(),
      presenceCount: 34,
      isAnchored: false,
      gradient: mood.gradient,
    });

    setSavedMemoryIds((prev) => ({ ...prev, [msg.id]: true }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100 flex flex-col justify-between">
      {/* 3D Background Environment */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Mood-colored radial backdrop */}
        <div
          className="absolute inset-0 opacity-20 transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 50% 25%, ${mood.color}, transparent 70%)`,
          }}
        />

        <Scene cameraPosition={[0, 0, 12]} fog={true} fogNear={8} fogFar={25} orbitControls={false}>
          <ParticleField
            count={1400}
            radius={15}
            color={mood.color}
            size={0.024}
            speed={activeMood === 'CALM' ? 0.12 : activeMood === 'CURIOUS' ? 0.25 : 0.18}
          />
          {/* Removed FloatingOrb to prevent clipping */}
        </Scene>
      </div>

      {/* Floating Ripple Effects */}
      <AnimatePresence>
        {ripples.map((r) => (
          <RippleEffect
            key={r.id}
            x={r.x}
            y={r.y}
            color={r.color}
            onComplete={() => setRipples((prev) => prev.filter((item) => item.id !== r.id))}
          />
        ))}
      </AnimatePresence>

      {/* Welcome Mood Banner Overlay */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-md pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -15 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="text-center px-6 py-8 glass-strong rounded-3xl border-2 border-white/20 shadow-2xl max-w-lg mx-4"
              style={{
                boxShadow: `0 0 60px ${mood.color}60`,
              }}
            >
              <div className="text-6xl mb-4 animate-pulse">{MOOD_ICONS[activeMood]}</div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-2" style={{ color: mood.color }}>
                {MOOD_TITLES[activeMood]}
              </h2>
              <p className="text-lg text-white/80 font-light leading-relaxed">
                {MOOD_DESCRIPTIONS[activeMood]}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Sticky Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-30 backdrop-blur-2xl border-b border-white/10"
          style={{
            background: 'linear-gradient(to bottom, rgba(8, 12, 22, 0.85), rgba(8, 12, 22, 0.7))',
            borderBottomColor: `${mood.color}25`,
          }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5">
            <div className="flex items-center justify-between gap-4">
              {/* Back to Mood Compass & Current Mood Info */}
              <div className="flex items-center gap-3 md:gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, x: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/onboarding')}
                  className="p-2.5 rounded-xl glass border border-white/10 hover:border-white/30 text-white/80 hover:text-white transition-all cursor-pointer"
                  title="Return to Mood Selection"
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.button>

                {/* Mood Badge */}
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shadow-lg relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${mood.color}, ${mood.color}aa)`,
                    boxShadow: `0 4px 16px ${mood.color}50`,
                  }}
                >
                  <span className="relative z-10">{MOOD_ICONS[activeMood]}</span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                      {MOOD_TITLES[activeMood]}
                    </h1>
                    <span
                      className="text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${mood.color}25`,
                        color: mood.color,
                        border: `1px solid ${mood.color}40`,
                      }}
                    >
                      {mood.label}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 hidden sm:block">
                    {MOOD_DESCRIPTIONS[activeMood]}
                  </p>
                </div>
              </div>

              {/* Mood Switcher & Live Drifters Counter */}
              <div className="flex items-center gap-3">
                {/* Quick mood switcher tabs */}
                <div className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl glass border border-white/10">
                  {(['CALM', 'CURIOUS', 'NOSTALGIC'] as MoodType[]).map((mId) => {
                    const isActive = activeMood === mId;
                    const mData = MOODS[mId];
                    return (
                      <button
                        key={mId}
                        onClick={() => handleSwitchMood(mId)}
                        className={`
                          px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer
                          ${
                            isActive
                              ? 'bg-white/20 text-white shadow-md border border-white/30'
                              : 'text-white/60 hover:text-white hover:bg-white/5'
                          }
                        `}
                      >
                        <span>{MOOD_ICONS[mId]}</span>
                        <span>{mData.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Drifters presence indicator */}
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl glass border border-white/10 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <Users className="w-3.5 h-3.5 text-white/70" />
                  <span className="font-semibold text-white/90">34</span>
                  <span className="text-white/50 hidden sm:inline">live</span>
                </div>
              </div>
            </div>

            {/* Mobile Mood Switcher bar */}
            <div className="flex md:hidden items-center justify-center gap-2 pt-2.5 mt-2 border-t border-white/10">
              {(['CALM', 'CURIOUS', 'NOSTALGIC'] as MoodType[]).map((mId) => {
                const isActive = activeMood === mId;
                const mData = MOODS[mId];
                return (
                  <button
                    key={mId}
                    onClick={() => handleSwitchMood(mId)}
                    className={`
                      px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all
                      ${
                        isActive
                          ? 'bg-white/20 text-white shadow-md border border-white/30'
                          : 'text-white/60 hover:text-white'
                      }
                    `}
                  >
                    <span>{MOOD_ICONS[mId]}</span>
                    <span>{mData.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.header>

        {/* Conversation Stream */}
        <div className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 md:p-8 space-y-6">
          {/* Active Mood Intro Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-2xl p-5 border border-white/10 text-center relative overflow-hidden"
            style={{
              boxShadow: `0 4px 20px ${mood.color}15`,
            }}
          >
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${mood.color}, transparent 80%)`,
              }}
            />
            <span className="text-3xl mb-1 inline-block">{MOOD_ICONS[activeMood]}</span>
            <h3 className="text-lg font-bold text-white mb-1">
              You are in the {mood.label} Space
            </h3>
            <p className="text-sm text-white/70 max-w-xl mx-auto font-light">
              {MOOD_DESCRIPTIONS[activeMood]} Conversations here are temporary, thoughtful, and shared with fellow drifters feeling the same way.
            </p>
          </motion.div>

          {/* Messages List */}
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((message, index) => {
                const isUserMessage = message.authorName === (user?.displayName || 'You');
                const isSaved = savedMemoryIds[message.id];

                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className={`
                      glass-strong rounded-3xl p-5 md:p-6 border transition-all duration-300 relative
                      ${
                        isUserMessage
                          ? 'border-white/30 bg-white/10 ml-auto'
                          : 'border-white/10 hover:border-white/25'
                      }
                    `}
                    style={{
                      boxShadow: `0 4px 24px rgba(0,0,0,0.3)`,
                    }}
                  >
                    {/* Author Header */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-md"
                          style={{
                            background: `linear-gradient(135deg, ${mood.color}40, rgba(255,255,255,0.1))`,
                            border: `1px solid ${mood.color}40`,
                          }}
                        >
                          {message.author}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white text-base">
                              {message.authorName}
                            </span>
                            {isUserMessage && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-violet-500/30 text-violet-200 border border-violet-400/30">
                                You
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-white/45">{message.timestamp}</span>
                        </div>
                      </div>

                      {/* Save to Memory button */}
                      <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => handleSaveMemory(message)}
                        className={`
                          flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all cursor-pointer
                          ${
                            isSaved
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                              : 'glass border border-white/10 hover:border-white/30 text-white/60 hover:text-white'
                          }
                        `}
                        title="Save to your personal memories constellation"
                      >
                        {isSaved ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-amber-300" />
                            <span>Saved</span>
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-3.5 h-3.5" />
                            <span>Save</span>
                          </>
                        )}
                      </motion.button>
                    </div>

                    {/* Message Body */}
                    <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4 font-light">
                      {message.text}
                    </p>

                    {/* Ripple Reactions Bar */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                      {[
                        { type: 'resonate', label: 'Resonate', icon: '✨' },
                        { type: 'feel-this', label: 'Feel this', icon: '🌊' },
                        { type: 'thinking', label: 'Thinking', icon: '💭' },
                        { type: 'warmth', label: 'Warmth', icon: '❤️' },
                        { type: 'energy', label: 'Energy', icon: '⚡' },
                      ].map((rip) => {
                        const count = message.ripples[rip.type] || 0;
                        const isReacted = userReactions[message.id]?.[rip.type];

                        return (
                          <motion.button
                            key={rip.type}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={(e) => handleRipple(message.id, rip.type, e)}
                            className={`
                              flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer
                              ${
                                isReacted
                                  ? 'bg-white/25 text-white border border-white/40 shadow-sm'
                                  : 'glass hover:bg-white/15 text-white/70 border border-white/10'
                              }
                            `}
                          >
                            <span>{rip.icon}</span>
                            <span>{rip.label}</span>
                            {count > 0 && (
                              <span
                                className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold"
                                style={{
                                  backgroundColor: isReacted ? `${mood.color}` : 'rgba(255,255,255,0.1)',
                                }}
                              >
                                {count}
                              </span>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Quick Prompt Starters */}
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest text-white/50 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-violet-300" />
              <span>Inspiration for this moment:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {PROMPT_STARTERS[activeMood]?.map((starter, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(starter)}
                  className="glass px-3.5 py-1.5 rounded-full text-xs text-white/80 hover:text-white border border-white/10 hover:border-white/30 transition-all hover:scale-103 cursor-pointer text-left"
                >
                  💬 {starter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Area (MessageComposer) */}
        <div className="sticky bottom-0 z-20">
          <MessageComposer
            mood={activeMood}
            moodColor={mood.color}
            onSend={handleSendMessage}
          />
        </div>

        {/* Bottom Navigation & Drift Field Link */}
        <div className="p-4 text-center border-t border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: mood.color }} />
              <span>Active Mood: <strong>{mood.label}</strong></span>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate(`/mood/${activeMood.toLowerCase()}`)}
                className="glass px-4 py-2 rounded-xl text-white font-medium hover:border-white/30 transition-all cursor-pointer"
              >
                View {mood.label} Constellation
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/home')}
                className="group px-5 py-2 rounded-xl font-bold text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${mood.color}, ${mood.color}cc)`,
                }}
              >
                <span>Enter 3D Drift Field</span>
                <Sparkles className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
