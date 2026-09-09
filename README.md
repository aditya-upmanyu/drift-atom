# DRIFT — Social, Without the Scroll

> A new social experience where people connect through shared feelings, temporary moments, and meaningful interactions.

## 🌌 Overview

DRIFT reimagines social connection. Instead of followers, feeds, and likes, DRIFT creates temporary social moments called **Currents** where people meet around shared feelings and experiences. When Currents end, meaningful moments become memories in your personal constellation.

## 🎯 Problem Statement

**"REIMAGINE SOCIAL — Design the Next Generation of Social Interaction."**

Existing social platforms are dominated by:
- Infinite feeds
- Likes and followers
- Algorithmic content
- Permanent posts
- Popularity metrics

DRIFT challenges this by creating a social universe built around **temporary presence, emotional connection, and meaningful interaction**.

## ✨ Key Innovations

### 1. **DRIFT FIELD** — A Living Social Universe
No infinite feed. Instead, explore a 3D constellation of active social moments. Currents appear as glowing spatial nodes that you can navigate and enter.

### 2. **CURRENTS** — Temporary Social Moments
Every Current is temporary (1-4 hours). When the countdown ends, the moment passes. No permanent posts, no lingering content.

### 3. **RIPPLES** — Emotional Reactions
Replace likes with meaningful reactions:
- **Resonate** — Deep connection
- **Feel This** — Emotional resonance
- **Thinking** — Thought-provoking
- **Warmth** — Comforting presence
- **Energy** — Motivating feeling

Each ripple creates a visual particle effect.

### 4. **MOMENT THREADS** — Connected Thoughts
Instead of flat comments, thoughts branch into connected threads that visualize the flow of conversation.

### 5. **DRIFT TOGETHER** — Temporary Connections
When two people repeatedly overlap through shared reactions and moods, they can form temporary connections. No permanent follower graph.

### 6. **MEMORY TRAIL** — Your Constellation
When Currents end, you can save meaningful moments. Your memories form a personal constellation timeline, not a public profile.

### 7. **DRIFT GUIDE** — AI Companion
A helpful orb assistant that guides you through the experience (with optional Gemini AI integration).

## 🎨 Design Philosophy

DRIFT combines:
- **Cinematic 3D environments** using Three.js / React Three Fiber
- **Premium dark aesthetic** with atmospheric particle systems
- **Mood-driven color system** (Calm, Curious, Creative, Nostalgic, Motivated, Reflective)
- **Spatial interaction design** — the interface IS the social universe
- **Spring physics and smooth transitions** for fluid navigation

The goal: Create an experience that feels like entering a living social world, not browsing a feed.

## 🛠 Technology Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Routing**: React Router v6
- **Icons**: Lucide React

## 🚀 Local Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend-hackathon-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env
   # Edit .env and add your Gemini API key if you want AI features
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## 🌐 Netlify Deployment

### Quick Deploy

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Netlify**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Build settings (auto-detected from `netlify.toml`):
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Click "Deploy site"

### Environment Variables on Netlify

If using AI Guide with Gemini:
1. Go to Site settings → Environment variables
2. Add `VITE_GEMINI_API_KEY` with your API key
3. Redeploy

**Note**: DRIFT works perfectly without API keys. The AI Guide automatically falls back to local responses.

## 🎮 User Journey

1. **Landing** — Cinematic 3D hero introduces the concept
2. **Mood Entry** — Choose your current emotional state
3. **DRIFT FIELD** — Explore the 3D constellation of active Currents
4. **Enter Current** — Join a temporary social moment
5. **Interact** — Leave Moments, send Ripples, create Threads
6. **Connect** — Form temporary connections with others
7. **Remember** — Save meaningful moments to your Memory Trail
8. **Constellation** — View your personal drift patterns

## 📁 Project Structure

```
src/
├── components/
│   ├── 3d/              # Three.js 3D components
│   ├── common/          # Shared UI components
│   ├── current/         # Current-specific components
│   ├── mood/            # Mood selection components
│   └── ripple/          # Ripple interaction system
├── pages/               # Main application pages
├── data/                # Demo seed data
├── hooks/               # Custom React hooks
├── store/               # Zustand state management
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## 🎯 Key Features Implemented

✅ Immersive 3D landing page with particle systems  
✅ Atmospheric mood selection experience  
✅ 3D DRIFT FIELD constellation navigation  
✅ Cinematic Current detail environments  
✅ Visual Ripple interaction system  
✅ Rich demo data with 12 unique Currents  
✅ Responsive design for desktop and mobile  
✅ Accessibility features (keyboard nav, ARIA labels)  
✅ Premium dark aesthetic with mood-driven colors  
✅ Smooth page transitions and micro-interactions  
✅ Memory Trail constellation timeline  
✅ Personal Constellation profile  
✅ Loading states and empty states  

## 🔮 Future Enhancements

- Backend integration for real-time presence
- WebSocket connections for live Current updates
- Advanced AI Guide with Gemini integration
- Create Current flow with release animation
- Drift Together temporary connection system
- Moment Thread branching visualization
- Advanced 3D shader effects
- Mobile app (React Native)
- Progressive Web App (PWA) support

## 🎨 Design References

DRIFT draws inspiration from:
- Premium 3D website design (Awwwards-level creativity)
- Cinematic UI/UX with spatial depth
- Constellation and cosmic visualization patterns
- Atmospheric particle systems
- Glassmorphism and premium dark aesthetics
- Experimental social interaction models

## 📝 License

This project is created for educational and hackathon purposes.

## 🙏 Acknowledgments

Built with passion for reimagining social connection. Special thanks to the open-source community for the incredible tools that made this possible.

---

**Ready to drift?** 🌊

[Enter the Drift →](https://your-netlify-url.netlify.app)
