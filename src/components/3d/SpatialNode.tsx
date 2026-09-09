import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Current } from '../../types';
import { MOODS } from '../../lib/constants';

interface SpatialNodeProps {
  current: Current;
  position: [number, number, number];
  onClick?: () => void;
  onHover?: (hovered: boolean) => void;
}

export function SpatialNode({ current, position, onClick, onHover }: SpatialNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const mood = MOODS[current.mood];
  const color = mood.color;
  
  // Calculate size based on activity level
  const activityScale = {
    quiet: 0.5,
    moderate: 0.7,
    active: 1.0,
    lively: 1.3,
  };
  
  const baseScale = activityScale[current.activityLevel];
  const isEndingSoon = current.remainingTime < 3600; // Less than 1 hour
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Breathing animation
    const breathe = Math.sin(time * 2) * 0.05;
    const scale = hovered ? baseScale * 1.2 : baseScale;
    meshRef.current.scale.setScalar(scale + breathe);
    
    // Slow rotation
    meshRef.current.rotation.y = time * 0.2;
    
    // Float animation
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + position[0]) * 0.1;
    
    // Urgent pulsing if ending soon
    if (isEndingSoon) {
      const pulse = Math.sin(time * 3) * 0.1 + 0.9;
      meshRef.current.scale.multiplyScalar(pulse);
    }
  });
  
  const handlePointerOver = () => {
    setHovered(true);
    onHover?.(true);
    document.body.style.cursor = 'pointer';
  };
  
  const handlePointerOut = () => {
    setHovered(false);
    onHover?.(false);
    document.body.style.cursor = 'default';
  };
  
  return (
    <group position={position}>
      {/* Main node sphere */}
      <Sphere
        ref={meshRef}
        args={[1, 32, 32]}
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
      
      {/* Glow ring */}
      <Sphere args={[1.15, 32, 32]}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.3 : 0.15}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Point light */}
      <pointLight
        color={color}
        intensity={hovered ? 3 : 1.5}
        distance={5}
        decay={2}
      />
      
      {/* HTML Label on hover */}
      {hovered && (
        <Html
          center
          distanceFactor={10}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div className="glass rounded-2xl px-4 py-3 min-w-[200px] text-center">
            <div className="text-white font-bold text-lg mb-1">
              {current.title}
            </div>
            <div className="text-white/60 text-sm mb-2 line-clamp-2">
              {current.description}
            </div>
            <div className="flex items-center justify-center gap-4 text-xs">
              <span className="text-white/80">
                {current.presenceCount} drifting
              </span>
              <span className="text-white/60">•</span>
              <span className={isEndingSoon ? 'text-orange-400' : 'text-white/80'}>
                {Math.floor(current.remainingTime / 3600)}h {Math.floor((current.remainingTime % 3600) / 60)}m
              </span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
