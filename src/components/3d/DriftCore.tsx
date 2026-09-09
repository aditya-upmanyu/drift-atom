import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface DriftCoreProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  distort?: number;
  speed?: number;
}

export function DriftCore({
  position = [0, 0, 0],
  scale = 1,
  color = '#8B5CF6',
  distort = 0.3,
  speed = 1,
}: DriftCoreProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Gentle breathing animation
    const breathe = Math.sin(state.clock.elapsedTime * speed) * 0.1;
    meshRef.current.scale.setScalar(scale + breathe);
    
    // Slow rotation
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });
  
  return (
    <group position={position}>
      {/* Main core sphere */}
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={speed}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.9}
        />
      </Sphere>
      
      {/* Inner glow sphere */}
      <Sphere args={[0.95, 32, 32]}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
        />
      </Sphere>
      
      {/* Outer glow */}
      <Sphere args={[1.2, 32, 32]}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Point light for illumination */}
      <pointLight
        color={color}
        intensity={2}
        distance={10}
        decay={2}
      />
    </group>
  );
}
