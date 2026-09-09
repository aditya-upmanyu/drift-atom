# DRIFT — FINAL PRODUCTION REBUILD

## Reimagine Social — Next Generation of Social Interaction

You are a senior product designer, UX architect, creative developer, and frontend engineer.

You are working inside an EXISTING React/Vite/TypeScript/Tailwind/Framer Motion project called **DRIFT**.

Do not create a generic new website.
Do not create an Instagram clone.
Do not create a Discord clone.
Do not create a SaaS dashboard.
Do not preserve the existing UI merely by restyling it.

**Rebuild the product experience and frontend architecture around the concept below.**

---

# 1. CORE PRODUCT CONCEPT

DRIFT is a new type of social platform where people connect around a **shared feeling and temporary moment**, rather than:

* followers
* likes
* permanent posts
* infinite feeds
* algorithmic content feeds
* popularity metrics

The fundamental social loop is:

**FEEL → DRIFT FIELD → DISCOVER → ENTER CURRENT → RIPPLE → CONNECT → REMEMBER**

The central product idea:

> **People should meet around a shared feeling or moment, not around a follower graph.**

The platform should feel like entering a living social universe.

---

# 2. PROBLEM STATEMENT TO SOLVE

The challenge is:

**“REIMAGINE SOCIAL — Design the Next Generation of Social Interaction.”**

Existing social platforms are dominated by:

* infinite feeds
* likes
* followers
* short-form content
* algorithmic discovery
* conventional profiles
* comments and engagement counters

DRIFT must demonstrate:

1. An original social concept
2. A unique interaction model
3. A distinctive visual language
4. A thoughtful content system
5. A new way to connect and engage
6. A polished responsive frontend
7. An experience that goes beyond the conventional feed

Every major design decision must reinforce this.

---

# 3. EXISTING PROJECT

First inspect the entire existing repository.

Existing important areas include:

* src/pages/Onboarding.tsx
* src/pages/Home.tsx
* src/pages/CurrentRoom.tsx
* src/pages/MemoryTrail.tsx
* src/pages/Profile.tsx
* src/pages/Settings.tsx
* components
* data
* Zustand store
* routing
* Tailwind configuration

Reuse useful existing functionality and data where appropriate.

Do NOT destroy working functionality unnecessarily.

However, the current experience is too close to:

**mood → chat room → messages**

and must be transformed into:

**feeling → social landscape → temporary social moment → interaction → temporary connection → memory**

---

# 4. VISUAL DIRECTION

Create a premium, cinematic, futuristic, immersive 3D experience.

Visual references should combine the following design directions:

* MotionSites-style premium 3D website direction
* cinematic 3D environments
* 3D collectible-style hero composition
* dark cosmic / atmospheric visual language
* social-media interaction patterns reimagined spatially
* animated cards
* liquid glass
* particles
* constellation systems
* subtle shader effects
* depth
* parallax
* glassmorphism
* high-quality typography
* restrained neon accents

Do NOT directly copy any existing template.

Use the references only as visual inspiration.

The result must look like an original product.

---

# 5. DESIGN PRINCIPLE

The website should NOT look like:

“a dashboard with some 3D decoration.”

It should feel like:

> **a living social world.**

3D is not decoration.

3D represents:

* emotional space
* social presence
* temporary communities
* activity
* connection
* memory

---

# 6. COLOR SYSTEM

Use a premium dark base.

Primary:

* near-black
* deep charcoal
* midnight navy
* subtle blue-black

Accent colors should be generated from moods.

CALM:
soft blue / cyan

CURIOUS:
electric blue / violet

CREATIVE:
magenta / coral / orange

NOSTALGIC:
amber / warm rose

MOTIVATED:
orange / red / gold

REFLECTIVE:
indigo / soft purple

Do NOT use excessive rainbow gradients.

Colors must feel atmospheric, expensive and controlled.

Use glow sparingly.

---

# 7. TYPOGRAPHY

Use a modern premium sans-serif.

Recommended:

* Inter
* Geist
* Space Grotesk

Use:

* huge editorial headlines
* tight tracking for hero typography
* small uppercase metadata
* monospace for system/time/status information

Typography hierarchy:

Hero:
very large, approximately 72–120px desktop depending on viewport.

Section titles:
48–72px.

Body:
16–20px.

Metadata:
10–13px uppercase with letter spacing.

Mobile must scale intelligently.

Never make typography tiny merely to fit the design.

---

# 8. LANDING PAGE

The first screen must immediately communicate:

**This is not another social feed.**

Hero headline:

# DRIFT

Supporting headline:

> **Social, without the scroll.**

Alternative supporting copy:

> **Find people in the same moment.**

Primary CTA:

**Enter the Drift**

Secondary CTA:

**Explore how it works**

Do not use generic SaaS copy.

---

# 9. HERO — 3D WOW EXPERIENCE

Create a full-screen cinematic 3D environment.

Use Three.js / React Three Fiber if available.

If a heavy external 3D model is unavailable, create the scene procedurally using:

* particles
* glowing spheres
* transparent geometries
* floating nodes
* orbital lines
* subtle fog
* depth
* star particles
* shader-like gradients
* soft light sources

The hero should resemble a mysterious social universe.

Center:

A large glowing **DRIFT CORE**.

Around it:

floating social-presence particles.

Some particles should connect with thin glowing lines.

The scene must feel alive.

Animation:

* particles slowly orbit
* nodes breathe
* tiny positional movement
* subtle camera drift
* mouse movement creates parallax
* cursor movement slightly shifts the environment
* scroll changes camera depth
* hover causes nearby particles to react

Do not make the animation distracting.

---

# 10. HERO INTERACTION

Primary CTA:

**ENTER THE DRIFT**

Hover:

* button slightly expands
* magnetic cursor effect
* glow increases
* surrounding particles move toward it
* subtle scale 1.03
* 250–400ms easing

Click:

Transition into onboarding.

Use a cinematic transition:

* button glow expands
* particles accelerate
* background briefly blurs
* screen transitions into the mood space

Do NOT use a generic page reload.

---

# 11. MOOD ENTRY

Replace the basic mood-card experience with an immersive mood selector.

Headline:

> **What are you drifting through today?**

Moods:

* Calm
* Curious
* Creative
* Nostalgic
* Motivated
* Reflective

Each mood is represented as an atmospheric floating object/node rather than a basic rectangular card.

Hover:

* node enlarges
* atmosphere changes
* label appears
* surrounding particles react
* mood gradient becomes stronger

Selection:

The entire environment transitions into the selected emotional atmosphere.

Example:

CALM:
slow blue waves.

CURIOUS:
fast-moving particles and exploratory nodes.

CREATIVE:
organic colorful energy.

NOSTALGIC:
warm grain / soft amber particles.

MOTIVATED:
energetic directional particles.

REFLECTIVE:
deep indigo space.

---

# 12. DRIFT FIELD — THE NEW HOME

THIS IS THE MOST IMPORTANT SCREEN.

Do NOT build a conventional home feed.

No infinite scrolling feed.

No grid of ordinary social posts.

No “For You” feed.

No follower count.

Instead create:

# DRIFT FIELD

A large interactive social constellation.

The entire viewport represents an emotional/social landscape.

Currents appear as glowing spatial nodes.

Each node represents a temporary social moment.

Example:

**MIDNIGHT THOUGHTS**

23 drifting

01:42:18 remaining

Another:

**WHY DO WE REMEMBER RANDOM MOMENTS?**

11 drifting

00:43:22 remaining

Another:

**MAKE SOMETHING BEAUTIFUL**

42 drifting

02:13:09 remaining

---

# 13. DRIFT FIELD PHYSICS

Node size:

activity level.

Glow:

mood.

Movement:

social activity.

Distance:

emotional similarity.

Connections:

shared interests / overlapping reactions.

More active Current:

larger + brighter.

Quiet Current:

smaller + slower.

Ending Current:

slowly fading.

When two Currents become thematically connected:

draw a subtle animated line between them.

When the user changes mood:

the field rearranges.

This should feel like navigating a living constellation.

---

# 14. USER PRESENCE

Do not represent the user primarily as a profile card.

Represent the user as:

**YOU**

inside the Drift Field.

Use a glowing orb / presence ring / abstract avatar.

Nearby people should appear as subtle anonymous presence nodes.

Example:

**17 people are drifting here**

Do not expose follower-style metrics.

---

# 15. CURRENT DISCOVERY

Instead of:

“Here are some posts.”

Show:

> **Moments happening now**

Examples:

* “People are sharing something they never said.”
* “12 people are thinking about starting over.”
* “A quiet conversation is forming.”
* “Someone just started a nostalgic memory thread.”
* “Creative energy is building.”

This creates social discovery without a feed.

---

# 16. CURRENT DETAIL

When the user selects a Current:

Do not immediately show a Discord-style chat room.

Create a cinematic Current environment.

Header:

CURRENT NAME

Mood

Presence

Countdown

Example:

# MIDNIGHT THOUGHTS

**37 people drifting**

01:42:18

The environment should have subtle particles and spatial movement.

---

# 17. CURRENT CONTENT

Inside a Current, show:

### MOMENTS

Not ordinary posts.

A Moment is a thought, feeling, question, image, short text, or observation.

Example:

> “I think we miss versions of ourselves more than people.”

Under it:

Ripple interactions.

---

# 18. RIPPLE SYSTEM

Replace Likes.

Never show:

❤️ 125 likes

Instead show:

**Feel This**
**Thinking**
**Warmth**
**Energy**
**Resonate**

When clicked:

Create a visible ripple animation.

Ripple should:

* expand from the interaction
* briefly illuminate nearby nodes
* update the reaction count
* create subtle particles
* produce a soft haptic-like visual pulse

The ripple is both an interaction and a visual metaphor.

---

# 19. MOMENT THREADS

Replace standard comments.

Instead of:

Comment 1
Comment 2
Comment 3

create:

# Moment Thread

A thought branches into related thoughts.

Example:

Original:

> “Maybe growing up is just becoming comfortable with uncertainty.”

Thread branches:

> “I used to fear uncertainty.”

↓

> “Now I think uncertainty is freedom.”

↓

> “That changed how I make decisions.”

Visually represent these as connected nodes or curved branches.

---

# 20. TEMPORARY SOCIAL CONNECTION

This is a key innovation.

If two users repeatedly overlap through:

* Ripple reactions
* Moment Threads
* shared moods
* shared themes

show:

# CONNECTION FOUND

Example:

> You and another person have been drifting through the same ideas.

Button:

**Drift Together**

This is NOT a Follow button.

No permanent follower graph.

The connection exists around the current moment.

---

# 21. DRIFT TOGETHER

Clicking:

**Drift Together**

creates a temporary shared space.

Show:

**You are drifting together**

The two presences become visually connected.

Allow them to exchange short thoughts.

Keep this lightweight.

Do not turn it into a normal DM inbox.

---

# 22. CURRENT COUNTDOWN

The countdown is part of the social experience.

Normal state:

**01:42:18**

At 10 minutes:

**The current is winding down**

At 5 minutes:

**Last words?**

At 60 seconds:

environment becomes warmer/slower.

At 0:

# THIS MOMENT HAS PASSED

Particles slowly disappear.

Nodes fade.

The environment quiets.

---

# 23. MEMORY SYSTEM

After a Current ends:

show:

# KEEP THIS MOMENT?

Buttons:

**Keep Memory**

**Let It Drift**

If saved:

create a Memory.

Example:

**MIDNIGHT THOUGHTS**

17 people were here.

4 moment threads formed.

You resonated with:

> “Maybe uncertainty is freedom.”

Date/time.

Mood.

---

# 24. MEMORY TRAIL

Do not make a standard saved-post grid.

Create:

# YOUR DRIFT TRAIL

A constellation/timeline of moments.

Nodes represent memories.

Connected by a subtle line.

Today
Yesterday
Earlier

Hovering a memory expands it.

Clicking a memory creates a cinematic zoom.

Use:

* 3D depth
* timeline movement
* glow
* subtle particles
* expandable memory cards

---

# 25. PROFILE

Do NOT build an Instagram-style profile.

No:

Followers
Following
Posts
Likes

Instead:

# YOUR CONSTELLATION

Show:

* moods explored
* favorite types of Currents
* moments remembered
* connection patterns
* presence style
* recent drift trail

Example:

**You drift toward:**

Reflective
Curious
Creative

**Your energy:**

Quiet explorer

**Moments remembered:**

24

Make this feel like a personal constellation rather than a profile page.

---

# 26. NAVIGATION

Use a premium minimal navigation.

Desktop:

DRIFT logo

Field
Currents
Memories
Constellation

Right:

Presence
Profile

Do not overcrowd the navbar.

Mobile:

Use a compact floating bottom navigation.

Icons + labels.

Use glassmorphism.

---

# 27. CARDS

Cards must NOT look like generic Tailwind cards.

Use:

* translucent surfaces
* backdrop blur
* 1px subtle borders
* inner highlight
* soft glow
* radial gradients
* depth
* hover tilt
* animated border light
* slight 3D transform

On hover:

card moves upward 4–8px.

Background glow follows cursor.

Content shifts slightly.

Image/visual depth increases.

Use spring physics.

---

# 28. CAROUSELS

Where carousels are appropriate, create horizontal immersive carousels.

Use for:

* featured Currents
* memories
* mood exploration
* suggested moments

Do not use carousels everywhere.

Desktop:

drag / wheel interaction.

Mobile:

swipe.

Cards should partially reveal the next item to encourage exploration.

---

# 29. BACKGROUND SYSTEM

Never use a flat background everywhere.

Create multiple atmospheric layers:

Layer 1:
deep dark gradient.

Layer 2:
soft radial mood glow.

Layer 3:
floating particles.

Layer 4:
very subtle grain.

Layer 5:
interactive light responding to pointer.

Layer 6:
3D objects / constellation.

Keep GPU usage controlled.

---

# 30. 3D SYSTEM

Use React Three Fiber / Three.js if already available or if it can be integrated cleanly.

Use:

* PerspectiveCamera
* AmbientLight
* PointLight
* MeshPhysicalMaterial
* transparent materials
* particles
* instanced meshes where useful
* subtle fog
* tone mapping
* DPR limits

Important:

Apply tone mapping so GLB/3D objects do not render muddy or excessively dark.

Keep 3D optimized.

Desktop maximum DPR:

2.

Mobile:

1–1.5.

Pause expensive animations when the page is not visible.

Use IntersectionObserver where appropriate.

---

# 31. MOUSE INTERACTION

Desktop:

* subtle magnetic buttons
* cursor-following glow
* card tilt
* particle attraction
* parallax
* 3D camera movement

Do NOT overdo cursor effects.

They must feel premium.

---

# 32. SCROLL ANIMATION

Use scroll as storytelling.

Landing sequence:

SCENE 1:

DRIFT appears.

SCENE 2:

The user enters the emotional universe.

SCENE 3:

Moods appear.

SCENE 4:

Mood transforms into social nodes.

SCENE 5:

Nodes become Currents.

SCENE 6:

Currents connect.

SCENE 7:

Connection becomes Memory.

Text can reveal using:

* opacity
* translate
* blur
* scale
* clip-path

Use smooth spring/ease transitions.

Avoid excessive animation.

---

# 33. PAGE TRANSITIONS

Use Framer Motion.

Transitions:

Landing → Onboarding:

particle expansion.

Onboarding → Field:

environment morph.

Field → Current:

camera zoom toward selected Current.

Current → Memory:

slow fade / collapse.

Memory → Trail:

memory becomes a constellation node.

These transitions should make the application feel like one continuous world.

---

# 34. LOADING EXPERIENCE

Do not show:

“Loading...”

Create:

A small glowing DRIFT orb.

Text:

**Finding your current...**

Particles slowly converge.

Then transition into the interface.

---

# 35. EMPTY STATES

Never show boring empty states.

Example:

No active Currents:

> **The field is quiet.**
>
> Maybe start a moment.

Button:

**Create a Current**

No memories:

> **Nothing has stayed with you yet.**

Button:

**Explore the field**

---

# 36. CREATE CURRENT

Allow user to start a temporary Current.

Fields:

Current title

Mood

Short thought

Duration:

1 hour
2 hours
4 hours

Optional topic.

Button:

**Release Current**

When released:

the Current appears in the 3D Drift Field.

---

# 37. CREATE CURRENT ANIMATION

When publishing:

* input transforms into glowing orb
* orb rises
* particles appear
* node becomes visible in field
* other nodes react

This should feel like releasing a thought into the social universe.

---

# 38. DRIFT GUIDE AI

Include a small frontend AI companion called:

# DRIFT GUIDE

It should NOT dominate the platform.

It is a guide, not the social experience.

Visual:

small futuristic robot/orb assistant.

It can answer predefined product questions and guide users.

Example questions:

“What is Drift?”

“How do Currents work?”

“What should I join?”

“What is a Ripple?”

“How do I save a Memory?”

“What happens when a Current ends?”

“Why don't I see followers?”

“What is Drift Together?”

“What mood should I choose?”

“Help me find a Current.”

Use a curated local response dataset of approximately 100 useful responses.

If Gemini API is configured:

use Gemini through a secure serverless endpoint.

NEVER hardcode a private Gemini API key in client-side source.

Use:

VITE_GEMINI_API_KEY only if explicitly intended for public/demo use.

Prefer:

Netlify Function / serverless proxy:

netlify/functions/drift-guide

Environment variable:

GEMINI_API_KEY

If the API is unavailable, automatically fall back to the local predefined responses.

The app must work without Gemini.

---

# 39. AI GUIDE UI

Floating orb button.

Click:

glass chat panel expands.

Header:

DRIFT GUIDE

Status:

Here to help you drift.

Suggested prompts:

“What is happening here?”

“Find me something curious.”

“How does Ripple work?”

“Explain Memories.”

Chat animation:

* assistant orb pulses
* messages fade/slide in
* typing indicator uses three glowing particles

Never make this look like ChatGPT clone.

---

# 40. MICRO INTERACTIONS

Every interactive element must have proper states.

Buttons:

* default
* hover
* focus
* active
* disabled
* loading

Cards:

* idle
* hover
* selected
* active
* ending

Nodes:

* idle
* nearby
* hover
* selected
* fading
* connected

Use spring physics where appropriate.

---

# 41. ACCESSIBILITY

Maintain:

* keyboard navigation
* visible focus states
* semantic HTML
* aria labels
* sufficient contrast
* reduced-motion support

If prefers-reduced-motion is enabled:

disable heavy particle movement and parallax.

---

# 42. RESPONSIVE DESIGN

Desktop must be immersive.

Tablet must preserve the spatial experience.

Mobile must not become a tiny desktop layout.

Mobile Drift Field:

* reduce particle count
* use touch gestures
* simplify 3D
* maintain spatial discovery
* bottom navigation
* swipeable Current discovery
* readable typography
* touch targets at least approximately 44px

The product must feel intentionally designed for mobile.

---

# 43. PERFORMANCE

Do not sacrifice performance for visual effects.

Requirements:

* lazy load heavy 3D
* reduce particles on mobile
* use instancing where useful
* dispose Three.js resources
* avoid unnecessary React renders
* memoize expensive calculations
* use CSS transforms
* avoid layout thrashing
* pause offscreen animations
* optimize images
* do not ship massive unnecessary assets

Target:

smooth 60fps on modern desktop.

Graceful degradation on weaker devices.

---

# 44. DATA / STATE

Keep the existing Zustand architecture where useful.

Create clean state for:

* current mood
* active Current
* Current participants
* Ripples
* Moment Threads
* temporary connections
* Memories
* user profile
* Drift Field
* AI Guide

Use mock/demo data where backend functionality is not available.

The demo must feel realistic.

---

# 45. DEMO DATA

Seed the application with rich demo content.

At least:

12 Currents.

Example names:

* Midnight Thoughts
* Things We Never Say
* Make Something Beautiful
* Quietly Starting Over
* Why Do We Remember?
* Creative After Dark
* Small Wins
* The Future We Imagine
* Songs That Changed Us
* Somewhere Between
* Random 2AM Ideas
* A Place For Curiosity

Different moods.

Different activity levels.

Different countdowns.

Different participant counts.

Different Moment Threads.

Different Memories.

---

# 46. NO GENERIC SOCIAL UI

Strictly avoid:

* infinite feed
* like button
* follower count
* following count
* standard post grid
* Instagram-style profile
* Twitter-style timeline
* Reddit-style voting
* Discord-style chat-first interface
* generic dashboard sidebar
* generic SaaS cards
* excessive rounded rectangles
* excessive gradients
* AI purple slop
* stock photos
* random 3D objects without purpose

---

# 47. LANDING PAGE SECTIONS

After the hero, use a cinematic storytelling sequence.

SECTION:

## SOCIAL USED TO BE A FEED.

Show conventional social patterns visually fading away.

Then:

## WHAT IF CONNECTION WAS A MOMENT?

Introduce DRIFT.

Then:

## FEEL

Mood interaction.

Then:

## FIND YOUR FIELD

3D constellation.

Then:

## ENTER A CURRENT

Temporary social world.

Then:

## LEAVE A RIPPLE

Moment interaction.

Then:

## DRIFT TOGETHER

Temporary connection.

Then:

## KEEP WHAT MATTERS

Memory.

Final CTA:

# READY TO DRIFT?

Button:

**Enter the Drift**

---

# 48. FINAL VISUAL STORY

The landing page must communicate this story without requiring the user to read a long explanation:

Traditional social:

PERSON → FOLLOW → FEED → LIKE

DRIFT:

FEEL → EXPLORE → MOMENT → CONNECT → REMEMBER

This should be visually obvious.

---

# 49. GITHUB QUALITY

The final project must be clean and production-ready.

Requirements:

* remove dead components
* remove unused imports
* remove obsolete mock UI
* remove console errors
* remove broken routes
* remove duplicate components
* organize components logically
* use reusable components
* use TypeScript properly
* no `any` unless absolutely necessary
* no hardcoded secret keys
* no broken asset paths
* no missing images
* no runtime warnings

Create/update:

README.md

Include:

* project overview
* problem statement
* solution
* innovation
* interaction model
* technology stack
* local setup
* environment variables
* Netlify deployment
* AI Guide configuration
* screenshots placeholder
* architecture overview

---

# 50. NETLIFY DEPLOYMENT

The project must deploy cleanly to Netlify.

Configure:

Build command:

npm run build

Publish directory:

dist

If required, create:

netlify.toml

Configure SPA redirects:

/* /index.html 200

If Gemini proxy is implemented:

netlify/functions/*

must work correctly.

Do not require a traditional backend server for the frontend demo.

---

# 51. ENVIRONMENT VARIABLES

Create:

.env.example

Example:

GEMINI_API_KEY=

Do not commit:

.env

Never expose secrets.

---

# 52. SEO / META

Add proper:

title:

DRIFT — Social, Without the Scroll

description:

A new social experience where people connect through shared feelings, temporary moments, and meaningful interactions.

Open Graph metadata.

Favicon.

Theme color.

---

# 53. FINAL QA

Before finishing:

Run:

npm install

npm run build

Check all routes.

Check browser console.

Check responsive layouts.

Check mobile.

Check desktop.

Check all buttons.

Check all hover states.

Check all transitions.

Check Current countdown.

Check Current expiry.

Check Ripple interaction.

Check Moment Threads.

Check Drift Together.

Check Memory creation.

Check Memory Trail.

Check Profile/Constellation.

Check AI Guide fallback.

Check AI Guide Gemini integration if configured.

Check refresh behavior.

Check direct route access.

Fix all errors before declaring completion.

---

# 54. MOST IMPORTANT CREATIVE RULE

Do not simply make DRIFT beautiful.

Make the interface itself explain the new social model.

The judge should open the site and think:

> “This isn't another social feed.”

Then:

> “People are actually represented as presence inside a shared environment.”

Then:

> “These are temporary social moments.”

Then:

> “Interactions create ripples.”

Then:

> “Connections form around shared moments.”

Then:

> “When the moment ends, it becomes a memory.”

That is the entire product story.

---

# 55. FINAL QUALITY BAR

The finished product should feel like:

**Awwwards-level creative website**
+
**premium 3D interactive experience**
+
**real social product**
+
**experimental interaction design**
+
**production-ready React application**

Not a template.

Not a concept mockup.

Not a generic AI-generated dashboard.

Not a clone.

It must feel like a genuinely new category of social platform.

---

# 56. FINAL BUILD COMMAND

After implementing everything:

Run the application.

Verify the complete journey:

Landing
→ Enter the Drift
→ Mood
→ Drift Field
→ Discover Current
→ Enter Current
→ Moment
→ Ripple
→ Moment Thread
→ Connection Found
→ Drift Together
→ Current Ends
→ Keep Memory
→ Drift Trail
→ Constellation
→ Drift Guide

Make every transition polished.

Do not stop after creating the landing page.

**Rebuild the complete frontend experience.**

The final result must be ready to push to GitHub and deploy to Netlify.
