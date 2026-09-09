import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingOrbProps {
  position?: [number, number, number];
  color?: string;
  size?: number;
  speed?: number;
  intensity?: number;
}

export function FloatingOrb({
  position = [0, 0, 0],
  color = '#60A5FA',
  size = 0.3,
  speed = 1,
  intensity = 1,
}: FloatingOrbProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return;
    
    const time = state.clock.elapsedTime * speed;
    
    // Float animation
    groupRef.current.position.y = position[1] + Math.sin(time) * 0.2;
    
    // Gentle rotation
    meshRef.current.rotation.x = time * 0.3;
    meshRef.current.rotation.y = time * 0.5;
    
    // Breathing scale
    const breathe = Math.sin(time * 2) * 0.1 + 1;
    meshRef.current.scale.setScalar(breathe);
  });
  
  return (
    <group ref={groupRef} position={position}>
      {/* Core sphere */}
      <Sphere ref={meshRef} args={[size, 32, 32]}>
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={intensity}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
          clearcoat={1}
        />
      </Sphere>
      
      {/* Inner glow */}
      <Sphere args={[size * 0.9, 32, 32]}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.4}
        />
      </Sphere>
      
      {/* Outer glow */}
      <Sphere args={[size * 1.3, 32, 32]}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Point light */}
      <pointLight
        color={color}
        intensity={intensity * 2}
        distance={3}
        decay={2}
      />
    </group>
  );
}
