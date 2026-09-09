import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Scene, DriftCore, ParticleField, FloatingOrb } from '../components/3d';

export function Landing() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  
  // Parallax effects based on scroll
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const section1Y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const section1Opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  
  const handleEnterDrift = () => {
    // Cinematic transition to onboarding
    navigate('/onboarding');
  };
  
  return (
    <div className="relative w-full">
      {/* HERO SECTION - Full screen 3D */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Scene cameraPosition={[0, 0, 15]} fog={true} fogNear={10} fogFar={40}>
            {/* Central Drift Core */}
            <DriftCore
              position={[0, 0, 0]}
              scale={2}
              color="#8B5CF6"
              distort={0.4}
              speed={0.8}
            />
            
            {/* Particle Field */}
            <ParticleField
              count={2000}
              radius={15}
              color="#8B5CF6"
              size={0.03}
              speed={0.3}
            />
            
            {/* Orbiting smaller orbs */}
            <FloatingOrb position={[3, 2, 0]} color="#6366F1" size={0.4} speed={0.8} />
            <FloatingOrb position={[-3, -1, 1]} color="#A855F7" size={0.3} speed={1.2} />
            <FloatingOrb position={[2, -2, -1]} color="#EC4899" size={0.35} speed={0.6} />
            <FloatingOrb position={[-2, 1.5, 2]} color="#06B6D4" size={0.3} speed={1.0} />
          </Scene>
        </div>
        
        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
        >
          {/* Logo/Title */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-8"
          >
            {/* DRIFT Logo with Premium Styling */}
            <motion.h1 
              className="text-8xl md:text-9xl font-black tracking-wider mb-6 relative"
              style={{
                textShadow: `
                  0 0 30px rgba(139, 92, 246, 0.4),
                  0 0 60px rgba(168, 85, 247, 0.3),
                  0 2px 10px rgba(0, 0, 0, 0.5)
                `,
                letterSpacing: '0.08em'
              }}
            >
              <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-pulse">
                DRIFT
              </span>
              {/* Animated shimmer effect overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-lg"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                style={{ width: '30%', filter: 'blur(20px)' }}
              />
            </motion.h1>
            
            {/* Main Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-3xl md:text-4xl font-semibold text-white mb-3 tracking-wide"
            >
              Social, without the scroll.
            </motion.div>
            
            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto tracking-tight"
              style={{ lineHeight: 1.4 }}
            >
              Find people in the same moment.
            </motion.p>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            {/* Primary Button - Premium Enhanced */}
            <motion.button
              onClick={handleEnterDrift}
              className="group relative px-10 py-5 text-lg font-bold rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 group-hover:from-violet-500 group-hover:via-purple-500 group-hover:to-indigo-500 transition-all duration-300" />
              
              {/* Inner highlight (glassy effect) */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 shadow-2xl shadow-violet-500/50 group-hover:shadow-violet-400/70 transition-shadow duration-300 rounded-2xl" />
              
              {/* Animated gradient sweep */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8 }}
              />
              
              {/* Border glow */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-white/20 via-white/10 to-white/20 bg-clip-border opacity-50 group-hover:opacity-100 transition-opacity" />
              
              {/* Content */}
              <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                Enter the Drift
                <motion.span
                  className="inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
            </motion.button>
            
            {/* Secondary Button - Frosted Glass Enhanced */}
            <motion.button
              onClick={() => {
                document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-10 py-5 text-lg font-bold rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {/* Frosted glass background */}
              <div className="absolute inset-0 glass-strong opacity-100 group-hover:opacity-110" />
              
              {/* Gradient border glow */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-violet-400/30 via-purple-400/20 to-pink-400/30 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Soft inner glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Subtle shadow glow */}
              <div className="absolute inset-0 shadow-xl shadow-white/10 group-hover:shadow-white/20 transition-shadow duration-300 rounded-2xl" />
              
              {/* Content */}
              <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                <motion.span
                  initial={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.span>
                Explore how it works
              </span>
            </motion.button>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-white/60 rounded-full"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      
      {/* STORYTELLING SECTIONS */}
      <div id="story" className="relative z-20 bg-gradient-to-b from-drift-dark-900 via-drift-dark-850 to-drift-dark-900">
        
        {/* Section 1: The Problem */}
        <motion.section
          style={{ y: section1Y, opacity: section1Opacity }}
          className="min-h-screen flex items-center justify-center px-6 py-32"
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl md:text-7xl font-bold mb-8 tracking-tight">
                Social used to be
                <br />
                <span className="text-white/40 line-through">a feed.</span>
              </h2>
              <p className="text-2xl md:text-3xl text-white/60 max-w-3xl mx-auto">
                Endless scrolling. Permanent posts. Follower counts. Algorithmic feeds.
              </p>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Section 2: The Solution */}
        <motion.section className="min-h-screen flex items-center justify-center px-6 py-32 relative overflow-hidden">
          {/* Ambient orbs */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          </div>
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl md:text-7xl font-bold mb-8 tracking-tight">
                What if connection
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  was a moment?
                </span>
              </h2>
              <p className="text-2xl md:text-3xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                DRIFT is where people connect around a shared feeling,
                <br />
                not around a follower graph.
              </p>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Section 3: Feel */}
        <motion.section className="min-h-screen flex items-center justify-center px-6 py-32">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <div className="inline-block px-6 py-2 rounded-full glass mb-6">
                <span className="text-violet-400 font-semibold uppercase tracking-wider text-sm">
                  Step 1
                </span>
              </div>
              <h2 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
                Feel
              </h2>
              <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto">
                Choose your emotional state. Calm, curious, creative, nostalgic, motivated, or reflective.
              </p>
            </motion.div>
            
            {/* Mood visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-6"
            >
              {[
                { name: 'Calm', color: 'from-blue-500 to-cyan-500' },
                { name: 'Curious', color: 'from-cyan-500 to-blue-600' },
                { name: 'Creative', color: 'from-purple-500 to-pink-500' },
                { name: 'Nostalgic', color: 'from-orange-500 to-amber-500' },
                { name: 'Motivated', color: 'from-red-500 to-orange-500' },
                { name: 'Reflective', color: 'from-indigo-500 to-purple-500' },
              ].map((mood, index) => (
                <motion.div
                  key={mood.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="glass rounded-3xl p-8 text-center group cursor-pointer"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${mood.color} shadow-lg group-hover:shadow-xl transition-shadow`} />
                  <h3 className="text-xl font-bold">{mood.name}</h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
        
        {/* Section 4: Find Your Field */}
        <motion.section className="min-h-screen flex items-center justify-center px-6 py-32 relative overflow-hidden">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-6 py-2 rounded-full glass mb-6">
                <span className="text-violet-400 font-semibold uppercase tracking-wider text-sm">
                  Step 2
                </span>
              </div>
              <h2 className="text-6xl md:text-7xl font-bold mb-8 tracking-tight">
                Find Your Field
              </h2>
              <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-12">
                Navigate a living constellation of moments. Each glowing node is a temporary conversation happening right now.
              </p>
              
              {/* Visual representation */}
              <div className="relative h-96 rounded-3xl overflow-hidden glass">
                <div className="absolute inset-0">
                  <Scene cameraPosition={[0, 0, 12]}>
                    <ParticleField count={800} radius={10} color="#8B5CF6" size={0.04} />
                    <FloatingOrb position={[0, 0, 0]} color="#8B5CF6" size={1} />
                    <FloatingOrb position={[4, 2, -2]} color="#6366F1" size={0.7} />
                    <FloatingOrb position={[-4, -1, 1]} color="#A855F7" size={0.8} />
                    <FloatingOrb position={[3, -3, 0]} color="#EC4899" size={0.6} />
                  </Scene>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Section 5: Enter a Current */}
        <motion.section className="min-h-screen flex items-center justify-center px-6 py-32">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-6 py-2 rounded-full glass mb-6">
                <span className="text-violet-400 font-semibold uppercase tracking-wider text-sm">
                  Step 3
                </span>
              </div>
              <h2 className="text-6xl md:text-7xl font-bold mb-8 tracking-tight">
                Enter a Current
              </h2>
              <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-12">
                Dive into temporary social spaces. Share thoughts. Leave ripples. Connect with others in the same emotional moment.
              </p>
              
              <div className="elevated-panel-strong rounded-3xl p-12 text-left max-w-2xl mx-auto">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">MIDNIGHT THOUGHTS</h3>
                    <p className="text-white/60">Reflective</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-violet-400">37</div>
                    <div className="text-sm text-white/60">drifting</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="glass rounded-2xl p-6">
                    <p className="text-white/80 italic">
                      "I think we miss versions of ourselves more than people."
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {['Feel This', 'Thinking', 'Warmth'].map((ripple) => (
                      <button
                        key={ripple}
                        className="px-4 py-2 rounded-full glass text-sm hover:bg-white/10 transition-colors"
                      >
                        {ripple}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Section 6: Drift Together */}
        <motion.section className="min-h-screen flex items-center justify-center px-6 py-32">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-6 py-2 rounded-full glass mb-6">
                <span className="text-violet-400 font-semibold uppercase tracking-wider text-sm">
                  Step 4
                </span>
              </div>
              <h2 className="text-6xl md:text-7xl font-bold mb-8 tracking-tight">
                Drift Together
              </h2>
              <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto">
                When you and another person keep crossing paths, you'll form a temporary connection.
                <br />
                <span className="text-white/40">No permanent followers. Just moments.</span>
              </p>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Section 7: Keep What Matters */}
        <motion.section className="min-h-screen flex items-center justify-center px-6 py-32">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-6 py-2 rounded-full glass mb-6">
                <span className="text-violet-400 font-semibold uppercase tracking-wider text-sm">
                  Step 5
                </span>
              </div>
              <h2 className="text-6xl md:text-7xl font-bold mb-8 tracking-tight">
                Keep What Matters
              </h2>
              <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto">
                When a Current ends, choose to remember it. Your drift trail becomes a constellation of moments that mattered.
              </p>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Final CTA */}
        <motion.section className="min-h-screen flex items-center justify-center px-6 py-32 relative overflow-hidden">
          {/* 3D Background */}
          <div className="absolute inset-0 z-0">
            <Scene cameraPosition={[0, 0, 15]}>
              <DriftCore position={[0, 0, 0]} scale={1.5} color="#8B5CF6" />
              <ParticleField count={1500} radius={12} color="#8B5CF6" size={0.03} />
            </Scene>
          </div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-7xl md:text-8xl font-black mb-12 tracking-tight">
                <span 
                  className="bg-gradient-to-r from-violet-300 via-purple-300 to-pink-300 bg-clip-text text-transparent"
                  style={{
                    textShadow: `
                      0 0 30px rgba(139, 92, 246, 0.3),
                      0 0 60px rgba(168, 85, 247, 0.2)
                    `,
                  }}
                >
                  Ready to Drift?
                </span>
              </h2>
              
              {/* Enhanced Premium Button */}
              <motion.button
                onClick={handleEnterDrift}
                className="group relative px-12 py-6 text-2xl font-bold rounded-2xl overflow-hidden mx-auto block"
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {/* Gradient background with depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-violet-600 to-purple-700 group-hover:from-violet-500 group-hover:to-purple-600 transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20 transition-all duration-300" />
                
                {/* Premium glow */}
                <div className="absolute inset-0 shadow-2xl shadow-purple-500/60 group-hover:shadow-purple-400/80 transition-shadow duration-300 rounded-2xl" />
                
                {/* Animated light sweep */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                />
                
                {/* Hover border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:border-white/40 transition-colors opacity-50 group-hover:opacity-100" />
                
                {/* Content with micro animations */}
                <span className="relative z-10 flex items-center justify-center gap-3 text-white">
                  Enter the Drift
                  <motion.span
                    className="inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
