# 📚 DRIFT ATOM Documentation

Welcome to the complete documentation for DRIFT ATOM.

## 🚀 Getting Started

- **[START_HERE.md](START_HERE.md)** — Quick start guide (5 minutes)
- **[DEPLOYMENT.md](DEPLOYMENT.md)** — Deploy to GitHub & Netlify
- **[FINAL_CHECKLIST.md](FINAL_CHECKLIST.md)** — Pre-deployment verification

## 📖 Project Overview

- **[plan.md](plan.md)** — Original product specification (complete requirements)
- **[PROJECT_COMPLETE.md](PROJECT_COMPLETE.md)** — Detailed completion summary

## 🎨 Design & Development

- **[UI_UX_ENHANCEMENTS.md](UI_UX_ENHANCEMENTS.md)** — UI/UX improvements
- **[IMPROVEMENTS.md](IMPROVEMENTS.md)** — Feature enhancements log

## 📊 Development Logs

- **[PROGRESS_UPDATE.md](PROGRESS_UPDATE.md)** — Progress tracking
- **[REBUILD_STATUS.md](REBUILD_STATUS.md)** — Rebuild status
- **[GITHUB_PUSH_NOW.md](GITHUB_PUSH_NOW.md)** — GitHub setup instructions
- **[PUSH_TO_GITHUB.md](PUSH_TO_GITHUB.md)** — Push to GitHub guide

## 📋 Quick Links

### Configuration

Find all configuration files in `config/`:
- `vite.config.ts` — Vite build config
- `tailwind.config.js` — Tailwind CSS config
- `tsconfig.json` — TypeScript config
- `netlify.toml` — Netlify deployment config
- `.env.example` — Environment variables template

### Source Code

All source code in `src/`:
- `components/` — React components
- `pages/` — Page components
- `data/` — Demo seed data
- `store/` — State management
- `types/` — TypeScript types
- `index.css` — Global styles

### Build Output

Production build in `dist/`:
- `index.html` — Main HTML file
- `assets/` — Optimized CSS & JS bundles

## 🎯 Project Structure

```
drift-atom/
├── src/                      # Source code
│   ├── components/
│   │   ├── 3d/              # Three.js components
│   │   ├── common/          # Shared components
│   │   ├── mood/            # Mood selection
│   │   ├── current/         # Current components
│   │   ├── ripple/          # Ripple system
│   │   ├── navigation/      # Navigation
│   │   ├── presence/        # Presence indicators
│   │   └── ambient/         # Ambient effects
│   ├── pages/
│   │   ├── Landing.tsx      # Landing page
│   │   ├── Onboarding.tsx   # Mood selection
│   │   ├── Home.tsx         # DRIFT FIELD
│   │   ├── CurrentRoom.tsx  # Current detail
│   │   ├── MemoryTrail.tsx  # Memories
│   │   ├── Profile.tsx      # User profile
│   │   ├── Settings.tsx     # Settings
│   │   └── NotFound.tsx     # 404 page
│   ├── data/
│   │   ├── currents.ts      # 12 demo Currents
│   │   ├── users.ts         # 24 demo users
│   │   ├── messages.ts      # Demo messages
│   │   └── memories.ts      # Demo memories
│   ├── store/
│   │   └── useStore.ts      # Zustand state
│   ├── types/
│   │   └── index.ts         # TypeScript types
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   ├── lib/
│   │   ├── constants.ts
│   │   └── utils.ts
│   ├── App.tsx              # Main app
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── config/                   # Configuration
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── netlify.toml
│   └── .env.example
├── docs/                     # Documentation (this folder)
├── public/                   # Static assets
├── dist/                     # Production build
├── index.html                # HTML entry
├── package.json              # Dependencies
└── README.md                 # Main README
```

## 🚀 Quick Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5174)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🌐 Live Links

- **GitHub Repository**: https://github.com/aditya-upmanyu/DRIFT
- **Documentation**: See `docs/` folder

## 📊 Build Information

- **Framework**: React 19.2.8 + TypeScript 6.0.2
- **Build Tool**: Vite 8.2.2
- **3D Engine**: Three.js 0.186.0
- **Styling**: Tailwind CSS 4.3.3
- **Animations**: Framer Motion 13.2.0
- **State Management**: Zustand 5.0.15

**Build Size**:
- JavaScript: 408 KB (gzipped)
- CSS: 12 KB (gzipped)
- Total: ~420 KB (excellent!)

## 🔐 Security & Privacy

✅ No hardcoded secrets  
✅ Environment variables template provided  
✅ `.gitignore` configured properly  
✅ Safe for open source  
✅ Node modules not committed  

## 📞 Support

For issues or questions, refer to the documentation files in this folder.

---

**Happy drifting!** 🌊
