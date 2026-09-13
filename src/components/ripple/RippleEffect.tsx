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
  size: number;
  delay: number;
}

export function RippleEffect({ x, y, color, onComplete }: RippleEffectProps) {
  const [particles] = useState<Particle[]>(() => {
    // Generate 16 particles with varied properties for more organic feel
    return Array.from({ length: 16 }, (_, i) => ({
      id: `particle-${i}`,
      x: 0,
      y: 0,
      angle: (i / 16) * Math.PI * 2 + (Math.random() - 0.5) * 0.3,
      distance: 80 + Math.random() * 80,
      size: 4 + Math.random() * 4,
      delay: Math.random() * 0.2,
    }));
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 1500);
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
      {/* Wave rings - multiple for depth */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`ring-${i}`}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 5, opacity: 0 }}
          transition={{
            duration: 1.2,
            delay: i * 0.1,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: color,
            width: 80,
            height: 80,
            left: -40,
            top: -40,
            filter: 'blur(1px)',
          }}
        />
      ))}

      {/* Center flash with glow */}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="absolute rounded-full"
        style={{
          backgroundColor: color,
          width: 60,
          height: 60,
          left: -30,
          top: -30,
          boxShadow: `0 0 40px 20px ${color}80, 0 0 20px 10px ${color}`,
          filter: 'blur(8px)',
        }}
      />
      
      {/* Inner core pulse */}
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={{ 
          scale: [1, 1.5, 0],
          opacity: [1, 0.6, 0] 
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute rounded-full"
        style={{
          backgroundColor: color,
          width: 24,
          height: 24,
          left: -12,
          top: -12,
          boxShadow: `0 0 20px ${color}`,
        }}
      />

      {/* Particles - enhanced with varied animations */}
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
            scale: [0, 1.2, 0.8, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 1.2,
            delay: particle.delay,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="absolute rounded-full"
          style={{
            backgroundColor: color,
            width: particle.size,
            height: particle.size,
            boxShadow: `0 0 12px ${color}`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
      
      {/* Trail particles - smaller ones that follow */}
      {particles.slice(0, 8).map((particle) => (
        <motion.div
          key={`trail-${particle.id}`}
          initial={{
            x: 0,
            y: 0,
            scale: 0,
            opacity: 0.6,
          }}
          animate={{
            x: Math.cos(particle.angle) * (particle.distance * 0.6),
            y: Math.sin(particle.angle) * (particle.distance * 0.6),
            scale: [0, 0.8, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 1,
            delay: particle.delay + 0.15,
            ease: 'easeOut',
          }}
          className="absolute rounded-full"
          style={{
            backgroundColor: color,
            width: particle.size * 0.5,
            height: particle.size * 0.5,
            boxShadow: `0 0 8px ${color}`,
            filter: 'blur(1px)',
          }}
        />
      ))}
      
      {/* Sparkles - tiny accent particles */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const distance = 120 + Math.random() * 40;
        return (
          <motion.div
            key={`sparkle-${i}`}
            initial={{
              x: Math.cos(angle) * 40,
              y: Math.sin(angle) * 40,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              scale: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
              rotate: [0, 180],
            }}
            transition={{
              duration: 1,
              delay: 0.2 + i * 0.05,
              ease: 'easeOut',
            }}
            className="absolute"
            style={{
              width: 3,
              height: 3,
            }}
          >
            <div 
              className="w-full h-full rounded-full"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}`,
              }}
            />
          </motion.div>
        );
      })}
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
