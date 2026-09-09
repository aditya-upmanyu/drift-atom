import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RippleEffectProps {
  x: number;
  y: number;
  color: string;
  onComplete?: () => void;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  angle: number;
  distance: number;
}

export function RippleEffect({ x, y, color, onComplete }: RippleEffectProps) {
  const [particles] = useState<Particle[]>(() => {
    // Generate 12 particles in a circle
    return Array.from({ length: 12 }, (_, i) => ({
      id: `particle-${i}`,
      x: 0,
      y: 0,
      angle: (i / 12) * Math.PI * 2,
      distance: 100 + Math.random() * 50,
    }));
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Wave rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`ring-${i}`}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{
            duration: 1,
            delay: i * 0.15,
            ease: 'easeOut',
          }}
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: color,
            width: 60,
            height: 60,
            left: -30,
            top: -30,
          }}
        />
      ))}

      {/* Center flash */}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="absolute rounded-full"
        style={{
          backgroundColor: color,
          width: 40,
          height: 40,
          left: -20,
          top: -20,
          boxShadow: `0 0 20px ${color}`,
        }}
      />

      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: 0,
            y: 0,
            scale: 0,
            opacity: 1,
          }}
          animate={{
            x: Math.cos(particle.angle) * particle.distance,
            y: Math.sin(particle.angle) * particle.distance,
            scale: [0, 1, 0.5],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      ))}
    </div>
  );
}

// Container component to manage multiple ripple effects
interface RippleContainerProps {
  children: React.ReactNode;
}

export function RippleContainer({ children }: RippleContainerProps) {
  const [ripples, setRipples] = useState<Array<{
    id: string;
    x: number;
    y: number;
    color: string;
  }>>([]);

  const removeRipple = (id: string) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="relative">
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <RippleEffect
            key={ripple.id}
            x={ripple.x}
            y={ripple.y}
            color={ripple.color}
            onComplete={() => removeRipple(ripple.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
