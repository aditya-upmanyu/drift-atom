# DRIFT - Deployment Guide

## 🚀 Quick Deploy to GitHub + Netlify

### Step 1: Push to GitHub

1. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Repository name: `drift-social-platform` (or your choice)
   - Description: "DRIFT - Social, Without the Scroll. A new social experience built with React, Three.js, and TypeScript"
   - Choose Public or Private
   - Do NOT initialize with README (we already have one)
   - Click "Create repository"

2. **Push your code**
   ```bash
   # Add your GitHub repository as remote
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Netlify

#### Option A: Deploy from GitHub (Recommended)

1. **Go to Netlify**
   - Visit https://app.netlify.com/
   - Log in or sign up (can use GitHub account)

2. **Add new site**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub
   - Select your repository

3. **Configure build settings**
   - The settings are auto-detected from `netlify.toml`:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
     - **Node version**: 18
   - Click "Deploy site"

4. **Wait for deployment**
   - First deploy takes 2-3 minutes
   - Watch the deploy log for any errors
   - You'll get a random URL like `https://random-name-123.netlify.app`

5. **Custom domain (optional)**
   - Go to Site settings → Domain management
   - Add custom domain or change site name
   - Example: `drift-social.netlify.app`

#### Option B: Deploy with Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### Step 3: Environment Variables (Optional - for AI Guide)

If you want to enable the AI Guide with Gemini:

1. **Get Gemini API Key**
   - Go to https://makersuite.google.com/app/apikey
   - Create new API key
   - Copy the key

2. **Add to Netlify**
   - Go to Site settings → Environment variables
   - Click "Add a variable"
   - Key: `VITE_GEMINI_API_KEY`
   - Value: Your API key
   - Click "Save"

3. **Redeploy**
   - Go to Deploys tab
   - Click "Trigger deploy" → "Deploy site"

**Note**: The AI Guide works perfectly without this - it falls back to local responses.

## 🔧 Build Verification

Before deploying, always verify locally:

```bash
# Clean build
npm run build

# Preview production build
npm run preview

# Check for errors
# Open http://localhost:4173 in browser
# Test all routes and features
```

## 📋 Deployment Checklist

Before going live:

- [ ] All routes work (Landing, Onboarding, Home, CurrentRoom, etc.)
- [ ] No console errors in browser
- [ ] Build completes successfully
- [ ] 3D scenes load properly
- [ ] Mobile responsive design works
- [ ] All buttons and interactions work
- [ ] Images and assets load
- [ ] Countdown timers work
- [ ] Ripple animations work
- [ ] Navigation between pages works
- [ ] Browser refresh on any route works (SPA redirects configured)

## 🌐 Post-Deployment

### Test your live site:

1. **Basic functionality**
   - Visit your Netlify URL
   - Complete onboarding flow
   - Navigate to DRIFT FIELD
   - Enter a Current
   - Test Ripple interactions
   - Check Memory Trail
   - View Profile/Constellation

2. **Mobile testing**
   - Open on mobile device
   - Test touch interactions
   - Check responsive layout
   - Verify 3D performance

3. **Performance**
   - Use Lighthouse in Chrome DevTools
   - Check load times
   - Verify 3D rendering performance

### Share your deployment:

```
🌌 DRIFT is live!
🔗 https://your-site.netlify.app

A new social experience where people connect through shared feelings 
and temporary moments. Built with React, Three.js, and TypeScript.

#DRIFT #React #ThreeJS #WebGL #SocialPlatform
```

## 🐛 Troubleshooting

### Build fails on Netlify

1. Check Node version is 18+ (set in netlify.toml)
2. Clear cache and retry: Deploys → Clear cache and deploy site
3. Check deploy log for specific errors

### 404 on page refresh

- Verify `netlify.toml` has SPA redirect rule
- Check publish directory is `dist`

### 3D scenes don't load

- Check browser console for WebGL errors
- Verify Three.js dependencies installed
- Test on different browsers

### Blank page on deployment

- Check browser console for errors
- Verify base path in vite.config.ts
- Check asset paths are relative

## 📊 Monitoring

After deployment:

1. **Netlify Analytics** (optional paid feature)
   - Track visitors
   - Monitor performance
   - View popular pages

2. **Browser DevTools**
   - Check Performance tab
   - Monitor Network requests
   - Verify no errors

## 🔄 Continuous Deployment

Once connected to GitHub:

- Every push to `main` branch auto-deploys
- Pull requests create deploy previews
- Failed builds don't affect live site

## 🎉 Success!

Your DRIFT platform is now live and accessible worldwide!

**Next steps:**
- Share with friends and testers
- Gather feedback
- Iterate and improve
- Consider adding backend for real-time features
- Expand to mobile app (React Native)

---

**Need help?**
- Netlify Docs: https://docs.netlify.com
- Netlify Community: https://answers.netlify.com
