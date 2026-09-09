import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { atmosphereVertexShader, atmosphereFragmentShader } from './shaders/atmosphereShader';

interface AtmosphericOrbProps {
  position?: [number, number, number];
  color?: string;
  size?: number;
  intensity?: number;
  pulseSpeed?: number;
  glowStrength?: number;
}

export function AtmosphericOrb({
  position = [0, 0, 0],
  color = '#8B5CF6',
  size = 1,
  intensity = 1,
  pulseSpeed = 1,
  glowStrength = 2,
}: AtmosphericOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Custom shader material
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) },
        intensity: { value: intensity },
        pulseSpeed: { value: pulseSpeed },
        glowStrength: { value: glowStrength },
      },
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [color, intensity, pulseSpeed, glowStrength]);
  
  // Animate shader uniforms
  useFrame((state) => {
    if (meshRef.current && shaderMaterial) {
      shaderMaterial.uniforms.time.value = state.clock.elapsedTime;
      
      // Subtle rotation
      meshRef.current.rotation.y += 0.001;
      meshRef.current.rotation.z += 0.0005;
    }
  });
  
  return (
    <group position={position}>
      {/* Core sphere */}
      <mesh ref={meshRef} material={shaderMaterial}>
        <sphereGeometry args={[size, 64, 64]} />
      </mesh>
      
      {/* Inner glow layer */}
      <mesh scale={size * 0.8}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Outer atmosphere layer */}
      <mesh scale={size * 1.4}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
