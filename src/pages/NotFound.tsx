import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Scene, FloatingOrb, ParticleField } from '../components/3d';
import { Button } from '../components/common/Button';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene cameraPosition={[0, 0, 12]} fog={true}>
          <ParticleField count={800} radius={15} color="#8B5CF6" size={0.02} speed={0.2} />
          <FloatingOrb position={[0, 0, 0]} color="#8B5CF6" size={1.5} speed={0.8} />
        </Scene>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="text-9xl mb-8"
          >
            🌫️
          </motion.div>

          <h1 className="text-6xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Lost in the drift
            </span>
          </h1>

          <p className="text-xl text-white/60 mb-8">
            This current doesn't exist, or it's already faded away.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/home')}
              className="flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              Return to Field
            </Button>

            <Button
              variant="glass"
              size="lg"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
